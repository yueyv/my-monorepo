/**
 * 对「正向」列表中的 PNG 的 import 增加对应的 AVIF import。
 * 例如：import Icon1 from '@/assets/images/聚合资源规模.png';
 * 会在其后增加：import AvifIcon1 from '@/assets/images/聚合资源规模.avif';
 *
 * 用法: node addAvifImport.js [--dir=path] [--dry]
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ===================== 配置 =====================
const CONFIG = {
    reportPath: path.join(__dirname, 'convertPng2Avif-report.json'),
    scanDirs: ['C:/Users/yueyv/Desktop/code/vpp-frontend/apps/vpp-screen/src/'],
    dryRun: process.argv.includes('--dry'),
};

const dirArg = process.argv.find(a => a.startsWith('--dir='));
if (dirArg) {
    CONFIG.scanDirs = [dirArg.slice('--dir='.length)];
}

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

// 匹配 import Name from '...png' 或 import Name from "...png"
const IMPORT_PNG_REGEX = /^(\s*)import\s+(\w+)\s+from\s+(["'])([^"']+\.png)\3\s*;?\s*$/m;

/**
 * 在文件内容中，为「正向」的 PNG import 后增加对应的 AvifXxx import
 */
function addAvifImports(content, pngBasenames) {
    const lines = content.split(/\r?\n/);
    const toInsertAfter = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(IMPORT_PNG_REGEX);
        if (!match) continue;

        const indent = match[1];
        const name = match[2];
        const quote = match[3];
        const pngPath = match[4];

        const basename = path.basename(pngPath.replace(/\\/g, '/'));
        if (!pngBasenames.has(basename)) continue;

        const avifPath = pngPath.replace(/\.png$/i, '.avif');
        const avifName = `Avif${name}`;

        const nextLine = lines[i + 1];
        if (nextLine != null) {
            const nextMatch = nextLine.match(/^\s*import\s+(\w+)\s+from\s+["'][^"']+\.avif["']\s*;?\s*$/m);
            if (nextMatch && nextMatch[1] === avifName) continue;
        }

        const newLine = `${indent}import ${avifName} from ${quote}${avifPath}${quote};`;
        toInsertAfter[i] = newLine;
    }

    if (Object.keys(toInsertAfter).length === 0) return null;

    const out = [];
    for (let i = 0; i < lines.length; i++) {
        out.push(lines[i]);
        if (toInsertAfter[i]) out.push(toInsertAfter[i]);
    }
    return out.join('\n');
}

function processFile(filePath, pngBasenames) {
    if (!fs.existsSync(filePath)) return { changed: false };
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = addAvifImports(content, pngBasenames);
    if (newContent === null) return { file: filePath, changed: false };

    if (!CONFIG.dryRun) {
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
    return { file: filePath, changed: true };
}

function main() {
    console.log('📄 加载报告:', CONFIG.reportPath);
    const pngBasenames = loadPositivePngSet();
    console.log('✅ 正向 PNG 数量:', pngBasenames.size);

    const repoRoot = path.resolve(__dirname, '..');
    const allFiles = [];
    for (const dir of CONFIG.scanDirs) {
        const resolvedDir = path.isAbsolute(dir) ? path.resolve(dir) : path.join(repoRoot, dir);
        const normalizedDir = path.normalize(resolvedDir);
        if (!fs.existsSync(normalizedDir)) {
            console.warn('⚠️ 目录不存在，已跳过:', normalizedDir);
            continue;
        }
        const opts = { ignore: ['**/node_modules/**', '**/dist/**'], nocase: true };
        allFiles.push(
            ...glob.sync(path.join(normalizedDir, '*.vue'), opts),
            ...glob.sync(path.join(normalizedDir, '**/*.vue'), opts),
            ...glob.sync(path.join(normalizedDir, '*.ts'), opts),
            ...glob.sync(path.join(normalizedDir, '**/*.ts'), opts),
            ...glob.sync(path.join(normalizedDir, '*.js'), opts),
            ...glob.sync(path.join(normalizedDir, '**/*.js'), opts)
        );
    }
    let uniqueFiles = [...new Set(allFiles)];

    if (uniqueFiles.length === 0) {
        function collect(dir, list = []) {
            if (!fs.existsSync(dir)) return list;
            const names = fs.readdirSync(dir, { withFileTypes: true });
            for (const ent of names) {
                const full = path.join(dir, ent.name);
                if (ent.isDirectory()) {
                    if (ent.name === 'node_modules' || ent.name === 'dist') continue;
                    collect(full, list);
                } else if (ent.isFile() && /\.(vue|ts|js)$/i.test(ent.name)) {
                    list.push(full);
                }
            }
            return list;
        }
        const fallback = [];
        for (const dir of CONFIG.scanDirs) {
            const resolvedDir = path.isAbsolute(dir) ? path.resolve(dir) : path.join(repoRoot, dir);
            fallback.push(...collect(path.normalize(resolvedDir)));
        }
        uniqueFiles = fallback;
    }

    const scanned = [...new Set(uniqueFiles)];
    console.log('🔍 扫描目录:', CONFIG.scanDirs.join(', '));
    console.log('🔍 扫描 .vue/.ts/.js 文件数:', scanned.length);

    const results = scanned.map((f) => processFile(f, pngBasenames));
    const changed = results.filter((r) => r.changed);

    console.log('\n📊 已增加 AvifXxx import 的文件:');
    if (changed.length === 0) {
        console.log('  （无匹配或均已存在）');
    } else {
        changed.forEach((r) => {
            const rel = path.relative(repoRoot, r.file);
            console.log('  ', rel.startsWith('..') ? r.file : rel, CONFIG.dryRun ? ' [dry]' : '');
        });
    }
    if (CONFIG.dryRun && changed.length > 0) {
        console.log('\n💡 去掉 --dry 将实际写入');
    }
}

main();
