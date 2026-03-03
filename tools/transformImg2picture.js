/**
 * jscodeshift 脚本：将 .vue 中「正向」列表内的 `<img src="xxx.png">` 转为 `<picture>`（AVIF 优先，PNG 兜底）。
 * - 固定扫描目录：仅处理该目录下的 .vue
 * - 仅转换 convertPng2Avif-report.json 中「正向」的 PNG（压缩有效的才转）
 *
 * 使用方式一（直接运行）：
 *   node tools/transformImg2picture.js          # 处理固定目录下所有 .vue
 *   node tools/transformImg2picture.js --dry    # 仅打印将修改的文件，不写入
 *
 * 使用方式二（jscodeshift）：
 *   jscodeshift -t tools/transformImg2picture.js "..." --extensions=vue
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { parse: parseSFC } = require('@vue/compiler-sfc');
const { baseParse, NodeTypes } = require('@vue/compiler-dom');

// ===================== 配置 =====================
const CONFIG = {
    // 报告路径（正向 = 压缩有效的 PNG 列表）
    reportPath: path.join(__dirname, 'convertPng2Avif-report.json'),
    // 固定扫描目录（只处理该目录及其子目录下的 .vue）
    scanDir: 'C:/Users/yueyv/Desktop/code/vpp-frontend/apps/vpp-screen/src/',
};

/**
 * 加载报告中「正向」的 PNG 文件名集合（basename，如 "modal.png"）
 * @returns {Set<string>}
 */
function loadPositivePngSet() {
    const reportPath = path.isAbsolute(CONFIG.reportPath)
        ? CONFIG.reportPath
        : path.join(__dirname, CONFIG.reportPath);
    if (!fs.existsSync(reportPath)) {
        throw new Error(`报告不存在: ${reportPath}`);
    }
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const list = report.正向 && report.正向.列表;
    if (!Array.isArray(list)) {
        throw new Error('报告中未找到 正向.列表');
    }
    const set = new Set();
    for (const item of list) {
        const base = path.basename(item.pngPath);
        if (base.toLowerCase().endsWith('.png')) {
            set.add(base);
        }
    }
    return set;
}

// 模块加载时读取一次正向列表
let positivePngSet = null;
function getPositivePngSet() {
    if (positivePngSet === null) {
        positivePngSet = loadPositivePngSet();
    }
    return positivePngSet;
}

/**
 * 从 AST 中收集需要替换的 <img> 节点（仅 src 在「正向」列表内的）
 * @param {import('@vue/compiler-dom').RootNode} root
 * @param {Set<string>} allowedPngSet 正向 PNG 的 basename 集合
 * @returns {{ start: number, end: number, original: string, src: string }[]}
 */
function collectImgReplacements(root, allowedPngSet) {
    const targets = [];

    function walk(node) {
        if (!node || typeof node !== 'object') return;

        if (node.type === NodeTypes.ELEMENT && node.tag === 'img') {
            const srcAttr = node.props.find(
                (p) =>
                    p.type === NodeTypes.ATTRIBUTE &&
                    p.name === 'src' &&
                    p.value &&
                    typeof p.value.content === 'string' &&
                    /\.png$/i.test(p.value.content)
            );

            if (srcAttr && node.loc && typeof node.loc.source === 'string') {
                const src = srcAttr.value.content;
                const basename = path.basename(src.replace(/\\/g, '/'));
                if (!allowedPngSet.has(basename)) return;

                targets.push({
                    start: node.loc.start.offset,
                    end: node.loc.end.offset,
                    original: node.loc.source,
                    src,
                });
            }
        }

        if (Array.isArray(node.children)) {
            node.children.forEach(walk);
        }
    }

    walk(root);
    return targets;
}

module.exports = function transformer(file /*, api */) {
    if (!file.path.endsWith('.vue')) {
        return file.source;
    }

    const normalizedScanDir = path.resolve(CONFIG.scanDir).replace(/\\/g, '/');
    const normalizedFilePath = path.resolve(file.path).replace(/\\/g, '/');
    if (!normalizedFilePath.startsWith(normalizedScanDir)) {
        return file.source;
    }

    const source = file.source;
    const { descriptor } = parseSFC(source);

    if (!descriptor || !descriptor.template || !descriptor.template.content) {
        return source;
    }

    const templateBlock = descriptor.template;
    const templateContent = templateBlock.content;
    const ast = baseParse(templateContent);
    const allowedSet = getPositivePngSet();
    const targets = collectImgReplacements(ast, allowedSet);

    if (!targets.length) {
        return source;
    }

    let newTemplateContent = templateContent;

    targets
        .sort((a, b) => b.start - a.start)
        .forEach(({ start, end, original, src }) => {
            const avifSrc = src.replace(/\.png$/i, '.avif');
            const replacement = [
                '<picture>',
                `  <source srcset="${avifSrc}" type="image/avif">`,
                `  ${original}`,
                '</picture>',
            ].join('\n');

            newTemplateContent =
                newTemplateContent.slice(0, start) +
                replacement +
                newTemplateContent.slice(end);
        });

    const contentIndex = source.indexOf(templateContent, templateBlock.loc.start.offset);
    if (contentIndex === -1) {
        return source;
    }

    const before = source.slice(0, contentIndex);
    const after = source.slice(contentIndex + templateContent.length);
    return before + newTemplateContent + after;
};

// 直接运行：扫描固定目录（含子目录）并执行转换
if (require.main === module) {
    const dryRun = process.argv.includes('--dry');
    const scanDir = path.resolve(CONFIG.scanDir);

    if (!fs.existsSync(scanDir)) {
        console.error('⚠️ 扫描目录不存在:', scanDir);
        process.exit(1);
    }

    getPositivePngSet();
    console.log('📄 报告:', CONFIG.reportPath);
    console.log('✅ 正向 PNG 数量:', positivePngSet.size);
    console.log('🔍 扫描目录（含子目录）:', scanDir);

    const opts = { ignore: ['**/node_modules/**', '**/dist/**'], nocase: true };
    let vueFiles = [
        ...glob.sync(path.join(scanDir, '*.vue'), opts),
        ...glob.sync(path.join(scanDir, '**/*.vue'), opts),
    ];
    vueFiles = [...new Set(vueFiles)];

    if (vueFiles.length === 0) {
        function collectVue(dir, list = []) {
            const names = fs.readdirSync(dir, { withFileTypes: true });
            for (const ent of names) {
                const full = path.join(dir, ent.name);
                if (ent.isDirectory()) {
                    if (ent.name === 'node_modules' || ent.name === 'dist') continue;
                    collectVue(full, list);
                } else if (ent.isFile() && /\.vue$/i.test(ent.name)) {
                    list.push(full);
                }
            }
            return list;
        }
        vueFiles = collectVue(scanDir);
        if (vueFiles.length > 0) console.log('🔍 使用 fs 递归找到 .vue:', vueFiles.length, '个');
    }

    console.log('🔍 .vue 文件数:', vueFiles.length);

    let changedCount = 0;
    vueFiles.forEach((filePath) => {
        const source = fs.readFileSync(filePath, 'utf8');
        const result = module.exports({ path: filePath, source });
        if (result !== source) {
            changedCount++;
            const rel = path.relative(scanDir, filePath);
            console.log('  ✓', rel, dryRun ? '[dry]' : '');
            if (!dryRun) {
                fs.writeFileSync(filePath, result, 'utf8');
            }
        }
    });

    console.log('\n📊 已转换', changedCount, '个文件');
    if (dryRun && changedCount > 0) {
        console.log('💡 去掉 --dry 将实际写入');
    }
}
