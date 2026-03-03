const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// ===================== 配置项（根据你的项目调整） =====================
const CONFIG = {
    // 要转换的 PNG 目录（支持多个，递归查找所有 PNG）
    sourceDirs: [
        'C:/Users/yueyv/Desktop/code/vpp-frontend/apps/vpp-screen/src/components/noPermission/', // 你的图片目录1
        // 你的图片目录2
    ],
    // AVIF 画质（1-100，80-90 视觉无损且压缩比最高）
    avifQuality: 85,
    // 是否保留透明通道（PNG 带透明必开）
    preserveAlpha: true,
    // 是否跳过已存在的 AVIF 文件（避免重复转换）
    skipExisting: true,
    // 是否删除原 PNG 文件（建议先测试，再改为 true）
    deleteOriginal: false,
    // 压缩报告 JSON 输出路径（按压缩率分类）
    reportPath: path.join(__dirname, 'convertPng2Avif-report.json')
};

// ===================== 核心转换逻辑 =====================
/**
 * 单个 PNG 文件转 AVIF
 * @param {string} pngPath PNG 文件路径
 */
async function convertPngToAvif(pngPath, stats) {
    try {
        // 生成 AVIF 文件路径（和原 PNG 同目录，后缀改为 .avif）
        const avifPath = pngPath.replace(/\.png$/i, '.avif');

        // 跳过已存在的 AVIF 文件
        if (CONFIG.skipExisting && fs.existsSync(avifPath)) {
            console.log(`✅ 跳过已转换：${avifPath}`);
            return;
        }

        // 读取 PNG 并转换为 AVIF
        const pngBuffer = fs.readFileSync(pngPath);
        const avifBuffer = await sharp(pngBuffer)
            .avif({
                quality: CONFIG.avifQuality,
                alphaQuality: CONFIG.preserveAlpha ? CONFIG.avifQuality : 100, // 透明通道画质
                lossless: false // 无损模式（开启后压缩比降低，建议关闭）
            })
            .toBuffer();

        // 写入 AVIF 文件
        fs.writeFileSync(avifPath, avifBuffer);

        // 计算体积减少比例
        const pngSize = fs.statSync(pngPath).size / 1024; // KB
        const avifSize = fs.statSync(avifPath).size / 1024; // KB
        const reduceRatio = (pngSize - avifSize) / pngSize * 100;

        // 累加总体统计 & 记录单条结果（用于生成 JSON 报告）
        if (stats) {
            stats.totalPngSizeKb += pngSize;
            stats.totalAvifSizeKb += avifSize;
            stats.convertedCount += 1;
            stats.results.push({
                pngPath,
                avifPath,
                pngSizeKb: Math.round(pngSize * 100) / 100,
                avifSizeKb: Math.round(avifSize * 100) / 100,
                reduceRatioPercent: Math.round(reduceRatio * 100) / 100
            });
        }

        console.log(`✅ 转换成功：
      原文件：${pngPath} (${pngSize.toFixed(2)} KB)
      新文件：${avifPath} (${avifSize.toFixed(2)} KB)
      减少体积：${reduceRatio.toFixed(2)}%
    `);

        // 删除原 PNG（测试通过后再开启）
        if (CONFIG.deleteOriginal) {
            fs.unlinkSync(pngPath);
            console.log(`🗑️ 删除原文件：${pngPath}`);
        }

    } catch (error) {
        console.error(`❌ 转换失败 ${pngPath}：`, error.message);
    }
}

/**
 * 递归查找并转换所有 PNG 文件
 */
async function batchConvert() {
    console.log('🚀 开始批量转换 PNG → AVIF...');
    console.log(`📌 配置：画质=${CONFIG.avifQuality}，保留透明=${CONFIG.preserveAlpha}`);

    // 全局统计信息（含每条转换结果，用于按压缩率分类写 JSON）
    const stats = {
        totalPngSizeKb: 0,
        totalAvifSizeKb: 0,
        convertedCount: 0,
        results: []
    };

    // 遍历所有指定目录
    for (const dir of CONFIG.sourceDirs) {
        if (!fs.existsSync(dir)) {
            console.warn(`⚠️ 目录不存在：${dir}`);
            continue;
        }

        // 递归查找所有 PNG 文件（包括子目录，忽略大小写）
        const normalizedDir = dir.replace(/\\/g, '/');
        const pattern = `${normalizedDir}/**/*.png`;

        console.log(`🧩 使用匹配模式：${pattern}`);

        const pngFiles = glob.sync(pattern, {
            ignore: ['**/node_modules/**', '**/dist/**'], // 忽略不需要的目录
            nocase: true
        });

        console.log(`🔍 目录 ${dir} 扫描到 PNG 数量：${pngFiles.length}`);

        if (pngFiles.length === 0) {
            console.log(`ℹ️ 目录 ${dir} 中未找到 PNG 文件`);
            continue;
        }

        // 批量转换
        for (const pngFile of pngFiles) {
            await convertPngToAvif(pngFile, stats);
        }
    }

    if (stats.convertedCount > 0) {
        const savedKb = stats.totalPngSizeKb - stats.totalAvifSizeKb;
        const savedRatio = (savedKb / stats.totalPngSizeKb * 100).toFixed(2);

        console.log(`\n📊 总体统计：
  转换文件数：${stats.convertedCount} 个
  原始总体积：${stats.totalPngSizeKb.toFixed(2)} KB
  AVIF 总体积：${stats.totalAvifSizeKb.toFixed(2)} KB
  共减少体积：${savedKb.toFixed(2)} KB（${savedRatio}%）
`);

        // 按压缩率分类：正向 = 体积减少，反向 = 体积增加或不变
        const 正向 = stats.results.filter(r => r.reduceRatioPercent > 0);
        const 反向 = stats.results.filter(r => r.reduceRatioPercent <= 0);

        const report = {
            正向: {
                描述: '体积减少（压缩有效）',
                数量: 正向.length,
                列表: 正向.sort((a, b) => b.reduceRatioPercent - a.reduceRatioPercent)
            },
            反向: {
                描述: '体积增加或不变（未压缩或变大）',
                数量: 反向.length,
                列表: 反向.sort((a, b) => a.reduceRatioPercent - b.reduceRatioPercent)
            },
            汇总: {
                转换总数: stats.convertedCount,
                原始总体积KB: Math.round(stats.totalPngSizeKb * 100) / 100,
                AVIF总体积KB: Math.round(stats.totalAvifSizeKb * 100) / 100,
                共减少体积KB: Math.round(savedKb * 100) / 100,
                总体压缩率百分比: parseFloat(savedRatio)
            }
        };

        const reportStr = JSON.stringify(report, null, 2);
        fs.writeFileSync(CONFIG.reportPath, reportStr, 'utf8');
        console.log(`\n📄 已生成压缩报告（按压缩率分类）：${CONFIG.reportPath}`);
    } else {
        console.log('\n📊 没有任何文件被转换。');
    }

    console.log('🎉 所有 PNG 文件转换完成！');
}

// 执行批量转换
batchConvert();