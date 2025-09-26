<template>
  <div class="w-full h-full">
    <canvas id="mapCanvas" :width="width" :height="height"></canvas>
    <div id="infoTip"></div>
  </div>
</template>

<script setup lang="ts">
// 1. 获取DOM元素
import { onMounted } from 'vue';
import mapJson from '@/assets/map/100000_full.json';
import { ElMessage } from 'element-plus';
const width = window.innerWidth;
const height = window.innerHeight;

// Define types for GeoJSON data
interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

interface MapBounds {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}

interface MapConfig {
  scale: number;
  offsetX: number;
  offsetY: number;
  defaultFill: string;
  hoverFill: string;
  strokeColor: string;
  strokeWidth: number;
}

onMounted(() => {
  const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement | null;
  const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D | null;
  const infoTip = document.getElementById('infoTip') as HTMLDivElement | null;

  if (!canvas || !ctx) {
    console.error('Canvas 或 Context 初始化失败');
    return;
  }

  // 2. 地图配置（将在计算边界后动态设置）
  let mapConfig: MapConfig = {
    scale: 1, // 缩放比例（将自动计算）
    offsetX: 0, // X轴偏移（将自动计算）
    offsetY: 0, // Y轴偏移（将自动计算）
    defaultFill: '#e0f3ff', // 区域默认填充色
    hoverFill: '#409eff', // 鼠标hover填充色
    strokeColor: '#fff', // 区域边框色
    strokeWidth: 1, // 区域边框宽度
  };

  // 3. 存储地图数据和状态
  let geoData: GeoJSON | null = null; // 解析后的GeoJSON数据
  let hoverProvince: string | null = null; // 当前hover的省份
  let mapBounds: MapBounds | null = null; // 地图边界

  // 4. 计算地图边界
  function calculateBounds(data: GeoJSON): MapBounds {
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    data.features.forEach((feature) => {
      const { type, coordinates } = feature.geometry;

      // 处理不同的几何类型
      const processCoordinates = (coords: number[][][]) => {
        coords.forEach((ring) => {
          ring.forEach(([lng, lat]) => {
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
          });
        });
      };

      if (type === 'Polygon') {
        processCoordinates(coordinates as number[][][]);
      } else if (type === 'MultiPolygon') {
        (coordinates as number[][][][]).forEach((polygon) => {
          processCoordinates(polygon);
        });
      }
    });

    return { minLng, maxLng, minLat, maxLat };
  }

  // 5. 计算最佳的缩放和偏移参数
  function calculateMapConfig(bounds: MapBounds): MapConfig {
    const canvasWidth = canvas!.width;
    const canvasHeight = canvas!.height;
    const padding = 50; // 边距

    const lngRange = bounds.maxLng - bounds.minLng;
    const latRange = bounds.maxLat - bounds.minLat;

    // 计算缩放比例，确保地图完全显示在画布内
    const scaleX = (canvasWidth - 2 * padding) / lngRange;
    const scaleY = (canvasHeight - 2 * padding) / latRange;
    const scale = Math.min(scaleX, scaleY);

    // 计算偏移量，使地图居中
    const offsetX = (canvasWidth - lngRange * scale) / 2 - bounds.minLng * scale;
    const offsetY = (canvasHeight - latRange * scale) / 2 - bounds.minLat * scale;

    return {
      scale,
      offsetX,
      offsetY,
      defaultFill: '#e0f3f1',
      hoverFill: '#409eff',
      strokeColor: '#fff',
      strokeWidth: 1,
    };
  }

  // 6. 加载GeoJSON数据
  async function loadGeoData() {
    try {
      geoData = mapJson as GeoJSON;
      if (!geoData.features || geoData.features.length === 0) {
        console.error('GeoJSON 数据为空或格式不正确');
        return;
      }
      // 计算地图边界
      mapBounds = calculateBounds(geoData);
      // 计算最佳的地图配置
      mapConfig = calculateMapConfig(mapBounds);
      // 数据加载完成后绘制地图
      drawMap();
      // 绑定鼠标交互事件
      bindMouseEvents();
    } catch (error) {
      console.error('加载GeoJSON失败：', error);
    }
  }

  // 7. 坐标转换：将GeoJSON的[经度,纬度]转为Canvas像素坐标
  function convertCoord(lng: number, lat: number): { x: number; y: number } {
    const x = lng * mapConfig.scale + mapConfig.offsetX;
    // 纬度反转（Canvas Y轴向下为正，地理纬度向上为正）
    const y = canvas!.height - (lat * mapConfig.scale + mapConfig.offsetY);
    return { x, y };
  }

  // 6. 绘制地图核心函数
  function drawMap() {
    if (!geoData || !ctx) return;

    // 清空画布（每次重绘前清空）
    ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);

    // 遍历GeoJSON中的每个省份（Feature）
    geoData.features.forEach((province: GeoJSONFeature) => {
      const { name } = province.properties;
      const { type, coordinates } = province.geometry;

      // 开始绘制路径
      ctx.beginPath();

      // 处理Polygon（单一多边形）和MultiPolygon（多个多边形，如含岛屿的区域）
      const paths = type === 'Polygon' ? [coordinates[0]] : coordinates.flat();
      // 遍历每个多边形的坐标点
      paths.forEach((path) => {
        path.forEach((item, index) => {
          const [lng, lat] = item as [number, number];
          const { x, y } = convertCoord(lng, lat);
          // 第一个点用moveTo，后续用lineTo
          index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
      });

      // 设置样式并绘制
      ctx.fillStyle = hoverProvince === name ? mapConfig.hoverFill : mapConfig.defaultFill;
      ctx.strokeStyle = mapConfig.strokeColor;
      ctx.lineWidth = mapConfig.strokeWidth;
      ctx.fill(); // 填充区域
      ctx.stroke(); // 绘制边框
    });
  }

  // 7. 绑定鼠标交互事件（hover高亮、信息提示）
  function bindMouseEvents() {
    // 鼠标移动事件：判断是否hover在省份上
    canvas?.addEventListener('mousemove', (e: MouseEvent) => {
      if (!geoData || !ctx) return;

      // 获取鼠标在Canvas内的坐标（相对于画布左上角）
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let currentHover: string | null = null;

      // 遍历所有省份，判断鼠标是否在该区域内
      geoData.features.forEach((province: GeoJSONFeature) => {
        const { name } = province.properties;
        const { type, coordinates } = province.geometry;
        const paths = type === 'Polygon' ? [coordinates[0]] : coordinates.flat();

        // 重新绘制该省份的路径（仅用于判断，不渲染）
        ctx.beginPath();
        paths.forEach((path) => {
          path.forEach((item, index) => {
            const [lng, lat] = item as [number, number];
            const { x, y } = convertCoord(lng, lat);
            index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          });
        });

        // 判断鼠标是否在当前省份路径内
        if (ctx.isPointInPath(mouseX, mouseY)) {
          currentHover = name;
        }
      });

      // 更新hover状态并重新绘制（高亮效果）
      if (hoverProvince !== currentHover) {
        hoverProvince = currentHover;
        drawMap(); // 重绘地图以更新颜色
      }

      // 显示/隐藏信息提示框
      if (hoverProvince) {
        infoTip!.textContent = hoverProvince;
        infoTip!.style.opacity = '1';
        infoTip!.style.left = `${e.clientX + 10}px`;
        infoTip!.style.top = `${e.clientY + 10}px`;
      } else {
        infoTip!.style.opacity = '0';
      }
    });

    // 鼠标离开画布：清除hover状态
    canvas?.addEventListener('mouseleave', () => {
      hoverProvince = null;
      drawMap();
      infoTip!.style.opacity = '0';
    });

    // 可选：点击事件（获取点击的省份信息）
    canvas?.addEventListener('click', () => {
      if (hoverProvince) {
        ElMessage.info(hoverProvince);
      }
    });
    canvas?.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault(); // 阻止页面滚动

      // 获取鼠标在Canvas内的坐标
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;

      // 计算缩放前鼠标位置对应的世界坐标
      const worldX = (mouseX - mapConfig.offsetX) / mapConfig.scale;
      const worldY = (mouseY - mapConfig.offsetY) / mapConfig.scale;

      // 设置缩放参数
      const zoomFactor = 0.1;
      const minScale = 0.5;
      const maxScale = 100;

      let newScale = mapConfig.scale;

      // 根据滚轮方向调整缩放
      if (e.deltaY > 0) {
        // 缩小
        newScale = Math.max(minScale, mapConfig.scale - zoomFactor);
      } else {
        // 放大
        newScale = Math.min(maxScale, mapConfig.scale + zoomFactor);
      }

      // 如果缩放值没有变化，直接返回
      if (newScale === mapConfig.scale) return;

      // 计算新的偏移量，使鼠标位置保持不变
      const newOffsetX = mouseX - worldX * newScale;
      const newOffsetY = mouseY - worldY * newScale;

      // 更新地图配置
      mapConfig.scale = newScale;
      mapConfig.offsetX = newOffsetX;
      mapConfig.offsetY = newOffsetY;
      console.log(e);
      // 重绘地图
      drawMap();
    });
  } // 8. 初始化：加载数据

  loadGeoData();
});
</script>

<style scoped lang="scss">
/* 画布样式：居中显示，添加边框 */
#mapCanvas {
  display: block;
  background: #515e5d;
}
/* 信息提示框：鼠标hover时显示区域名称 */
#infoTip {
  position: absolute;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  pointer-events: none; /* 避免遮挡鼠标事件 */
  opacity: 0;
  transition: opacity 0.2s;
}
</style>
