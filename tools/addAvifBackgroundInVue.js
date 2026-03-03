/**
 * 根据 convertPng2Avif-report.json 中「正向」列表，
 * 在 .vue 文件的 SCSS 中为匹配的 PNG 增加 background-image: url("xxx.avif");
 * 用法: node addAvifBackgroundInVue.js [--dir=apps/vpp-screen] [--dry]
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ===================== 配置 =====================
const CONFIG = {
    // 报告路径（正向 = 压缩有效的 PNG 列表）
    reportPath: path.join(__dirname, 'convertPng2Avif-report.json'),
    // 要扫描的 .vue 目录（绝对路径或相对仓库根）
    scanDirs: ['C:/Users/yueyv/Desktop/code/vpp-frontend/apps/vpp-screen/src/'],
    // 是否只打印不写文件
    dryRun: process.argv.includes('--dry'),
};

// 从命令行覆盖扫描目录，例如 --dir=apps/foo
const dirArg = process.argv.find(a => a.startsWith('--dir='));
if (dirArg) {
    CONFIG.scanDirs = [dirArg.slice('--dir='.length)];
}

// ===================== 加载正向 PNG 列表 =====================
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
    const pngBasenames = new Set();
    for (const item of list) {
        const base = path.basename(item.pngPath);
        if (base.toLowerCase().endsWith('.png')) {
            pngBasenames.add(base);
        }
    }
    return pngBasenames;
}

// ===================== 解析 .vue 中的 style 块 =====================
/**
 * 提取 <style lang="scss"> 或 <style lang="sass"> 或 <style> 的内容
 */
function extractStyleBlocks(vueContent) {
    const blocks = [];
    const styleRegex = /<style(\s[^>]*)?>([\s\S]*?)<\/style>/gi;
    let match;
    while ((match = styleRegex.exec(vueContent)) !== null) {
        const fullMatch = match[0];
        const attrs = (match[1] || '').toLowerCase();
        const content = match[2];
        const lang = attrs.includes('lang="scss"') || attrs.includes("lang='scss'") || attrs.includes('lang="sass"') || attrs.includes("lang='sass'")
            ? 'scss'
            : (attrs.includes('lang=') ? null : 'plain');
        blocks.push({
            start: match.index,
            end: match.index + fullMatch.length,
            lang,
            content,
            fullMatch,
            openTag: match[1] != null ? `<style${match[1]}>` : '<style>',
        });
    }
    return blocks;
}

/**
 * 在 SCSS 内容中：在「当前行」的下一行插入 avif（兼容写法：旧 png 在前，新 avif 在后）。
 * - background-image：下一行增加 background-image: url("...avif");
 * - background 简写：下一行增加同参数的一行，仅把 url 改为 avif。
 */
function addAvifLineInScss(scssContent, pngBasenames) {
    const lines = scssContent.split(/\r?\n/);
    const positiveSet = pngBasenames;
    const toInsertAfter = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const bgImageMatch = line.match(/^\s*(background-image)\s*:\s*url\s*\(\s*(["'])([^"']*?)([^/\\"']+\.png)\s*\2\s*\)\s*;?\s*$/i);
        const bgShortMatch = line.match(/^\s*(background)\s*:\s*url\s*\(\s*(["'])([^"']*?)([^/\\"']+\.png)\s*\2\s*\)\s*([^;]*;?\s*)$/i);

        let pngBasename = null;
        let quote = null;
        let pathPrefix = null;
        let isBackgroundShort = false;
        let restParams = '';

        if (bgImageMatch) {
            pngBasename = bgImageMatch[4];
            quote = bgImageMatch[2];
            pathPrefix = bgImageMatch[3];
        } else if (bgShortMatch) {
            pngBasename = bgShortMatch[4];
            quote = bgShortMatch[2];
            pathPrefix = bgShortMatch[3];
            restParams = bgShortMatch[5].trim(); // e.g. "no-repeat center;"
            isBackgroundShort = true;
        }

        if (!pngBasename || !positiveSet.has(pngBasename)) continue;

        const avifBasename = pngBasename.replace(/\.png$/i, '.avif');
        const avifUrl = `url(${quote}${pathPrefix}${avifBasename}${quote})`;

        if (/\.avif\s*\)/i.test(line)) continue;
        const nextLine = lines[i + 1];
        if (nextLine != null && /\.avif\s*\)/i.test(nextLine) && /(background-image|background)\s*:/i.test(nextLine)) continue;

        const indent = line.match(/^(\s*)/)[1];
        const newLine = isBackgroundShort
            ? `${indent}background: ${avifUrl}${restParams || ';'}`
            : `${indent}background-image: ${avifUrl};`;
        if (!toInsertAfter[i]) toInsertAfter[i] = [];
        toInsertAfter[i].push(newLine);
    }

    if (Object.keys(toInsertAfter).length === 0) return null;

    const out = [];
    for (let i = 0; i < lines.length; i++) {
        out.push(lines[i]);
        const toAdd = toInsertAfter[i];
        if (toAdd) toAdd.forEach(l => out.push(l));
    }
    return out.join('\n');
}

/**
 * 处理单个 .vue 文件
 */
function processVueFile(vuePath, pngBasenames) {
    const absPath = path.isAbsolute(vuePath) ? vuePath : path.join(__dirname, '..', vuePath);
    if (!fs.existsSync(absPath)) return { file: vuePath, changed: false, reason: 'not_found' };

    let content = fs.readFileSync(absPath, 'utf8');
    const blocks = extractStyleBlocks(content);

    const replaceRanges = [];

    for (const block of blocks) {
        if (block.lang !== 'scss' && block.lang !== 'plain') continue;

        const newContent = addAvifLineInScss(block.content, pngBasenames);
        if (newContent === null) continue;

        const newBlock = block.openTag + newContent + '</style>';
        replaceRanges.push({ start: block.start, end: block.end, newText: newBlock });
    }

    if (replaceRanges.length === 0) return { file: absPath, changed: false };

    replaceRanges.sort((a, b) => b.start - a.start);
    for (const r of replaceRanges) {
        content = content.slice(0, r.start) + r.newText + content.slice(r.end);
    }

    if (!CONFIG.dryRun) {
        fs.writeFileSync(absPath, content, 'utf8');
    }

    return { file: absPath, changed: true, dryRun: CONFIG.dryRun };
}

// ===================== 主流程 =====================
/**
 * 递归用 fs 收集目录及子目录下所有 .vue 路径（不依赖 glob，避免 Windows 路径问题）
 */
function collectVueFilesRecursive(dir, list = []) {
    if (!fs.existsSync(dir)) return list;
    const names = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of names) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            if (ent.name === 'node_modules' || ent.name === 'dist') continue;
            collectVueFilesRecursive(full, list);
        } else if (ent.isFile() && /\.vue$/i.test(ent.name)) {
            list.push(full);
        }
    }
    return list;
}

function main() {
    console.log('📄 加载报告:', CONFIG.reportPath);
    const pngBasenames = loadPositivePngSet();
    console.log('✅ 正向 PNG 数量:', pngBasenames.size);

    const repoRoot = path.resolve(__dirname, '..');
    const allVue = [];
    for (const dir of CONFIG.scanDirs) {
        const resolvedDir = path.isAbsolute(dir) ? path.resolve(dir) : path.join(repoRoot, dir);
        const normalizedDir = path.normalize(resolvedDir);

        if (!fs.existsSync(normalizedDir)) {
            console.warn('⚠️ 目录不存在，已跳过:', normalizedDir);
            continue;
        }

        const opts = { ignore: ['**/node_modules/**', '**/dist/**'], nocase: true };
        let files = glob.sync(path.join(normalizedDir, '*.vue'), opts)
            .concat(glob.sync(path.join(normalizedDir, '**/*.vue'), opts));
        files = [...new Set(files)];

        if (files.length === 0) {
            files = collectVueFilesRecursive(normalizedDir);
            if (files.length > 0) {
                console.log('🔍 使用 fs 递归找到 .vue:', files.length, '个');
            }
        }

        allVue.push(...files);
    }
    const uniqueVue = [...new Set(allVue)];
    console.log('🔍 扫描目录:', CONFIG.scanDirs.join(', '));
    console.log('🔍 扫描 .vue 数量:', uniqueVue.length);

    const results = [];
    for (const vuePath of uniqueVue) {
        const rel = path.relative(repoRoot, vuePath);
        const result = processVueFile(vuePath, pngBasenames);
        result.relativePath = rel.startsWith('..') ? vuePath : rel;
        results.push(result);
    }

    const changed = results.filter(r => r.changed);
    console.log('\n📊 已为以下文件增加 AVIF background-image:');
    if (changed.length === 0) {
        console.log('  （无匹配或均已存在）');
    } else {
        changed.forEach(r => {
            console.log('  ', r.relativePath || r.file, CONFIG.dryRun ? ' [dry-run]' : '');
        });
    }
    if (CONFIG.dryRun && changed.length > 0) {
        console.log('\n💡 去掉 --dry 将实际写入文件');
    }
}

main();
