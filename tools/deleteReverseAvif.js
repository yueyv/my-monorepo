/**
 * 根据 convertPng2Avif-report.json 中「反向」列表，删除对应的 .avif 文件（体积未减小或变大的）。
 *
 * 用法: node deleteReverseAvif.js [--dry]
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
    reportPath: path.join(__dirname, 'convertPng2Avif-report.json'),
    dryRun: process.argv.includes('--dry'),
};

function main() {
    const reportPath = path.isAbsolute(CONFIG.reportPath)
        ? CONFIG.reportPath
        : path.join(__dirname, CONFIG.reportPath);

    if (!fs.existsSync(reportPath)) {
        console.error('❌ 报告不存在:', reportPath);
        process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const list = report.反向 && report.反向.列表;

    if (!Array.isArray(list)) {
        console.error('❌ 报告中未找到 反向.列表');
        process.exit(1);
    }

    console.log('📄 报告:', reportPath);
    console.log('📌 反向（体积增加或不变）数量:', list.length);
    console.log('');

    let deleted = 0;
    let notFound = 0;

    for (const item of list) {
        const avifPath = path.normalize(item.avifPath || '');
        if (!avifPath || !avifPath.toLowerCase().endsWith('.avif')) continue;

        if (!fs.existsSync(avifPath)) {
            notFound++;
            if (CONFIG.dryRun) console.log('  [不存在]', avifPath);
            continue;
        }

        if (CONFIG.dryRun) {
            console.log('  将删除:', avifPath);
        } else {
            fs.unlinkSync(avifPath);
            console.log('  ✓ 已删除:', avifPath);
        }
        deleted++;
    }

    console.log('');
    console.log('📊 统计: 已处理', deleted, '个文件', notFound > 0 ? `，${notFound} 个不存在` : '');
    if (CONFIG.dryRun && deleted > 0) {
        console.log('💡 去掉 --dry 将实际删除文件');
    }
}

main();
