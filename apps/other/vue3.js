// 1. 依赖收集容器：存储「属性」和「对应的更新函数」
const targetMap = new WeakMap(); // 键：响应式对象；值：Map（属性→Set<更新函数>）
let activeEffect = null; // 当前正在执行的更新函数

// 2. 收集依赖：记录「哪个属性」被「哪个更新函数」使用
function track(target, key) {
    if (!activeEffect) return;
    // 层级1：获取对象对应的依赖Map
    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, (depsMap = new Map()));
    // 层级2：获取属性对应的更新函数Set
    let dep = depsMap.get(key);
    if (!dep) depsMap.set(key, (dep = new Set()));
    // 收集当前更新函数
    dep.add(activeEffect);
}

// 3. 触发依赖：执行属性对应的所有更新函数
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (dep) dep.forEach(effect => effect());
}

// 4. 核心：创建响应式对象（Vue3 reactive 的极简版）
function reactive(target) {
    return new Proxy(target, {
        // 拦截「读取属性」操作（如 obj.xxx）
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver); // 等价于 target[key]，更规范
            track(target, key); // 读取时收集依赖
            return res;
        },
        // 拦截「修改/新增属性」操作（如 obj.xxx = 123）
        set(target, key, value, receiver) {
            const oldValue = Reflect.get(target, key, receiver);
            const result = Reflect.set(target, key, value, receiver); // 等价于 target[key] = value
            if (oldValue !== value) { // 值变化时才触发更新
                trigger(target, key); // 修改时触发依赖
            }
            return result;
        }
    });
}

// 5. 执行更新函数并收集依赖（Vue3 effect 的极简版）
function effect(fn) {
    activeEffect = fn; // 标记当前更新函数
    fn(); // 执行函数，触发 get 拦截，收集依赖
    activeEffect = null; // 重置
}

// ---------------- 测试 ----------------
// 模拟Vue组件的data
const data = reactive({ name: "Vue3", age: 3 });

// 模拟视图更新函数（组件渲染逻辑）
effect(() => {
    console.log(`视图更新：name=${data.name}, age=${data.age}`);
});

// 测试1：修改属性 → 触发视图更新
data.name = "Vue3 Proxy"; // 输出：视图更新：name=Vue3 Proxy, age=3
// 测试2：新增属性（Vue2不支持，Vue3支持）
data.gender = "male"; // 输出：视图更新：name=Vue3 Proxy, age=3, gender=male
// 测试3：修改数组（Vue2需特殊处理，Vue3原生支持）const arr = reactive([1, 2, 3]);
effect(() => {
    console.log(`数组视图：${arr.join(",")}`);
});
arr.push(4); // 输出：数组视图：1,2,3,4
arr[0] = 10; // 输出：数组视图：10,2,3,4