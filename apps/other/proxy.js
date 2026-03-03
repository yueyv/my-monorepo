/**
 * 实现两个对象的双向代理（A变B同步，B变A同步）
 * @param {Object} targetA - 目标对象A
 * @param {Object} targetB - 目标对象B
 * @returns {Object} 包含代理后的A和B
 */
function createTwoWayProxy(targetA, targetB) {
    // 标记是否正在同步，避免循环触发
    let isSyncing = false;

    // 代理A：A变化时同步到B
    const proxyA = new Proxy(targetA, {
        set(target, key, value) {
            if (isSyncing) return true;
            // 1. 修改A本身的值
            target[key] = value;
            // 2. 同步到B（标记正在同步，防止B的set触发循环）
            isSyncing = true;
            targetB[key] = value;
            isSyncing = false;
            return true;
        }
    });

    // 代理B：B变化时同步到A
    const proxyB = new Proxy(targetB, {
        set(target, key, value) {
            if (isSyncing) return true;
            // 1. 修改B本身的值
            target[key] = value;
            // 2. 同步到A
            isSyncing = true;
            targetA[key] = value;
            isSyncing = false;
            return true;
        }
    });

    return { proxyA, proxyB };
}

// 测试示例（模拟EMS配置同步场景）
const configPC = { brightness: 50, timeout: 30 }; // 桌面端配置
const configTouch = { brightness: 50, timeout: 30 }; // 触摸屏配置

// 创建双向代理
const { proxyA: pcConfig, proxyB: touchConfig } = createTwoWayProxy(configPC, configTouch);

// 测试1：修改桌面端配置 → 触摸屏同步
pcConfig.brightness = 80;
console.log('触摸屏配置同步后：', touchConfig.brightness); // 输出80

// 测试2：修改触摸屏配置 → 桌面端同步
touchConfig.timeout = 60;
console.log('桌面端配置同步后：', pcConfig.timeout); // 输出60