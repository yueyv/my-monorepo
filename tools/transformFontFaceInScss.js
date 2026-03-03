/**
 * 读取 SCSS 文件，找到 @font-face 中的 TTF 字体 URL，
 * 仅对能成功读取到字体文件的块：用 ttf2woff2 生成 woff2，在 src 前插入 woff2，其余不改。
 * - 不复制/移动原字体文件，只新增 .woff2 文件（本地 TTF 时写入同目录，远程时写入 --fonts-dir）。
 * - 若原来使用 @/ 路径，新插入的 woff2 url 也使用 @/，保持风格一致。
 *
 * 路径解析：
 * - url('@/...') 会在 SCSS 文件所在目录的上级中查找名为 src 的目录，并以此为根解析
 * - 相对路径、绝对路径、http(s) 按原逻辑处理
 *
 * 用法: node transformFontFaceInScss.js <scss文件路径> [--fonts-dir=相对路径] [--in-place]
 * --fonts-dir: 仅远程 TTF 时字体输出目录；本地 TTF 时 woff2 写在原 TTF 同目录
 * --in-place:  直接修改 SCSS 文件；不传则输出到 stdout
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

let ttf2woff2;
try {
    const mod = require('ttf2woff2');
    ttf2woff2 = typeof mod === 'function' ? mod : mod.default;
} catch (e) {
    console.error('请先在 tools 目录执行 pnpm install 安装 ttf2woff2');
    process.exit(1);
}

const DEFAULT_FONTS_DIR = 'fonts';

function parseArgs() {
    const args = process.argv.slice(2);
    const scssPath = args.find((a) => !a.startsWith('--'));
    const fontsDir =
        args.find((a) => a.startsWith('--fonts-dir='))?.slice('--fonts-dir='.length) ?? DEFAULT_FONTS_DIR;
    const inPlace = args.includes('--in-place');
    return { scssPath, fontsDir, inPlace };
}

function isAbsoluteUrl(url) {
    return /^https?:\/\//i.test(url);
}

/** 从 SCSS 所在目录向上查找名为 src 的目录，作为 @/ 的解析根目录 */
function findSrcRoot(scssDir) {
    let dir = scssDir;
    const root = path.parse(dir).root;
    while (dir !== root) {
        if (path.basename(dir) === 'src') return dir;
        dir = path.dirname(dir);
    }
    return null;
}

function getFontBasename(url) {
    const decoded = decodeURIComponent(url);
    const filename = path.basename(decoded).replace(/\?.*$/, '');
    return path.basename(filename, path.extname(filename));
}

async function fetchBuffer(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, (res) => {
            if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
                reject(new Error(`HTTP ${res.statusCode}`));
                return;
            }
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        });
        req.on('error', reject);
    });
}

/** 解析 url 得到本地绝对路径，并返回「与原始写法一致的路径前缀」（如 @/assets/fonts 或 ./fonts） */
function resolveUrlAndPrefix(urlOrPath, scssDir, srcRoot) {
    const normalized = urlOrPath.replace(/^['"]|['"]$/g, '').trim();
    if (isAbsoluteUrl(normalized)) {
        return { fullPath: null, prefix: null, remote: true };
    }
    if (path.isAbsolute(normalized)) {
        return { fullPath: normalized, prefix: path.dirname(normalized).replace(/\\/g, '/'), remote: false };
    }
    const usedAt = normalized.startsWith('@/');
    let fullPath;
    let prefix;
    if (normalized.startsWith('@/')) {
        const rel = normalized.slice(2).replace(/^\//, '');
        fullPath = srcRoot ? path.join(srcRoot, rel) : path.join(scssDir, rel);
        const dir = path.dirname(normalized);
        prefix = dir === '.' ? '@/' : dir.replace(/\\/g, '/');
    } else {
        const withDot = normalized.startsWith('./') ? normalized : './' + normalized;
        fullPath = path.join(scssDir, normalized.replace(/^\.\//, ''));
        const dir = path.dirname(withDot);
        prefix = dir === '.' ? '.' : dir;
    }
    return { fullPath, prefix, remote: false };
}

function readTtfBuffer(urlOrPath, scssDir, srcRoot) {
    if (isAbsoluteUrl(urlOrPath)) {
        return fetchBuffer(urlOrPath);
    }
    const { fullPath, remote } = resolveUrlAndPrefix(urlOrPath, scssDir, srcRoot);
    if (remote || !fullPath) return fetchBuffer(urlOrPath);
    return Promise.resolve(fs.readFileSync(fullPath));
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function convertTtfToWoff2(ttfBuffer) {
    const input = Buffer.isBuffer(ttfBuffer) ? new Uint8Array(ttfBuffer) : ttfBuffer;
    return Buffer.from(ttf2woff2(input));
}

// 匹配 @font-face { ... }，支持嵌套大括号（简单处理：匹配到成对括号）
function findFontFaceBlocks(content) {
    const blocks = [];
    const re = /@font-face\s*\{/g;
    let m;
    while ((m = re.exec(content)) !== null) {
        const open = m.index + m[0].length - 1;
        let depth = 1;
        let i = open + 1;
        while (i < content.length && depth > 0) {
            if (content[i] === '{') depth++;
            else if (content[i] === '}') depth--;
            i++;
        }
        const end = i;
        blocks.push({ start: m.index, end, full: content.slice(m.index, end) });
    }
    return blocks;
}

// 从 @font-face 块中提取 src 的完整内容，以及所有 url()；若有 .ttf 则用其作为处理目标
function parseFontFaceBlock(blockContent) {
    const srcMatch = blockContent.match(/src\s*:\s*([^;]+);/);
    if (!srcMatch) return null;
    const srcValue = srcMatch[1];
    const urls = [];
    const urlRe = /url\s*\(\s*['"]?([^'")]+)['"]?\s*\)/g;
    let urlM;
    while ((urlM = urlRe.exec(srcValue)) !== null) {
        urls.push(urlM[1].trim());
    }
    if (urls.length === 0) return null;
    const ttfUrl = urls.find((u) => /\.ttf$/i.test(u.replace(/^['"]|['"]$/g, '')));
    return { url: ttfUrl, urls, srcValue, fullBlock: blockContent };
}

function buildNewSrc(woff2UrlFirst, originalSrcValue) {
    return `src: ${woff2UrlFirst},\n       ${originalSrcValue.trim()};`;
}

async function processBlock(block, scssDir, srcRoot, fontsDirAbs, fontsDirRel) {
    const parsed = parseFontFaceBlock(block.full);
    if (!parsed || !parsed.url) return { replacement: block.full, modified: false };
    const { url, srcValue: originalSrcValue, fullBlock } = parsed;
    const normalizedUrl = url.replace(/^['"]|['"]$/g, '').trim();

    if (isAbsoluteUrl(normalizedUrl)) return { replacement: block.full, modified: false };

    const basename = getFontBasename(normalizedUrl);
    const { fullPath, prefix, remote } = resolveUrlAndPrefix(normalizedUrl, scssDir, srcRoot);

    let ttfBuffer;
    try {
        ttfBuffer = await readTtfBuffer(normalizedUrl, scssDir, srcRoot);
    } catch (e) {
        return { replacement: block.full, modified: false };
    }

    const woff2Buffer = convertTtfToWoff2(ttfBuffer);
    const woff2UrlFirst = remote
        ? `url('${fontsDirRel}/${basename}.woff2') format('woff2')`
        : `url('${prefix}/${basename}.woff2') format('woff2')`;

    if (remote) {
        ensureDir(fontsDirAbs);
        fs.writeFileSync(path.join(fontsDirAbs, `${basename}.woff2`), woff2Buffer);
    } else {
        ensureDir(path.dirname(fullPath));
        fs.writeFileSync(path.join(path.dirname(fullPath), `${basename}.woff2`), woff2Buffer);
    }

    const newSrc = buildNewSrc(woff2UrlFirst, originalSrcValue);
    const newBlock = fullBlock.replace(/src\s*:\s*[^;]+;/, newSrc);
    return { replacement: newBlock, modified: true };
}

async function main() {
    const { scssPath, fontsDir, inPlace } = parseArgs();
    if (!scssPath) {
        console.error('用法: node transformFontFaceInScss.js <scss文件路径> [--fonts-dir=fonts] [--in-place]');
        process.exit(1);
    }
    const scssAbs = path.resolve(process.cwd(), scssPath);
    if (!fs.existsSync(scssAbs)) {
        console.error('文件不存在:', scssAbs);
        process.exit(1);
    }
    const scssDir = path.dirname(scssAbs);
    const srcRoot = findSrcRoot(scssDir);
    const fontsDirTrimmed = fontsDir.replace(/[/\\]$/, '');
    const fontsDirAbs = path.isAbsolute(fontsDirTrimmed)
        ? path.resolve(fontsDirTrimmed)
        : path.join(scssDir, fontsDirTrimmed);
    // 写入 CSS 的 url() 使用相对 SCSS 的路径，便于构建解析
    const fontsDirRel = path.isAbsolute(fontsDirTrimmed)
        ? path.relative(scssDir, fontsDirAbs).replace(/\\/g, '/')
        : fontsDirTrimmed.replace(/\\/g, '/');

    let content = fs.readFileSync(scssAbs, 'utf8');
    const blocks = findFontFaceBlocks(content);
    if (blocks.length === 0) {
        console.log('未找到 @font-face 块');
        if (!inPlace) console.log(content);
        else console.log('未做修改');
        return;
    }

    let result = '';
    let lastEnd = 0;
    let modifiedCount = 0;
    for (const block of blocks) {
        result += content.slice(lastEnd, block.start);
        const { replacement, modified } = await processBlock(block, scssDir, srcRoot, fontsDirAbs, fontsDirRel);
        result += replacement;
        if (modified) modifiedCount++;
        lastEnd = block.end;
    }
    result += content.slice(lastEnd);

    if (inPlace) {
        fs.writeFileSync(scssAbs, result, 'utf8');
        console.log(`已修改 ${scssAbs}，共处理 ${blocks.length} 个 @font-face，更新 ${modifiedCount} 个（仅新增 woff2，未改动原字体文件）。`);
    } else {
        process.stdout.write(result);
        if (modifiedCount > 0) {
            console.error(`（已生成 ${modifiedCount} 个 woff2 文件）`);
        }
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
