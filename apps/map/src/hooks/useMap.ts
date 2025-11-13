import { Ref } from 'vue';
export interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: {
    type: string | 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}
export interface MapBounds {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}

export interface MapConfig {
  scale: number;
  maxScale: number;
  minScale: number;
  // 摩擦系数
  factor: number;
  offsetX: number;
  offsetY: number;
  defaultFill: string;
  hoverFill: string;
  strokeColor: string;
  strokeWidth: number;
  padding: number;
}

const defaultConfig: MapConfig = {
  scale: 1,
  maxScale: 1000,
  minScale: 0.01,
  padding: 50,
  factor: 0.1,
  offsetX: 0,
  offsetY: 0,
  defaultFill: '#e0f3ff',
  hoverFill: '#409eff',
  strokeColor: '#fff',
  strokeWidth: 1,
};

export function useMap(
  mapJson: GeoJSON,
  canvas: Ref<HTMLCanvasElement | null | undefined>,
  config: Partial<MapConfig> = {}
) {
  const state = {
    bounds: {
      minLng: Infinity,
      maxLng: -Infinity,
      minLat: Infinity,
      maxLat: -Infinity,
    },
    mapConfig: { ...defaultConfig, ...config },
    dragState: {
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      animationFrameId: null as number | null,
    },
  };

  let ctx: CanvasRenderingContext2D | null = null;

  // 计算地图边界
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

  // 计算地图配置
  function calculateMapConfig(bounds: MapBounds): MapConfig {
    const canvasWidth = canvas.value!.width;
    const canvasHeight = canvas.value!.height;
    const padding = config?.padding || defaultConfig.padding;

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
      maxScale: config?.maxScale || defaultConfig.maxScale,
      minScale: config?.minScale || defaultConfig.minScale,
      factor: config?.factor || defaultConfig.factor,
      defaultFill: config?.defaultFill || defaultConfig.defaultFill,
      hoverFill: config?.hoverFill || defaultConfig.hoverFill,
      strokeColor: config?.strokeColor || defaultConfig.strokeColor,
      strokeWidth: config?.strokeWidth || defaultConfig.strokeWidth,
      padding: config?.padding || defaultConfig.padding,
    };
  }
  // 坐标转换
  function convertCoord(lng: number, lat: number): { x: number; y: number } {
    const x = lng * state.mapConfig.scale + state.mapConfig.offsetX;
    // 纬度反转（Canvas Y轴向下为正，地理纬度向上为正）
    const y = canvas.value!.height - (lat * state.mapConfig.scale + state.mapConfig.offsetY);
    return { x, y };
  }

  function initMap() {
    if (!canvas.value) {
      console.error('Canvas element not found');
      return;
    }

    ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) {
      console.error('Failed to get 2D context');
      return;
    }

    // 重新计算边界和配置
    state.bounds = calculateBounds(mapJson);
    state.mapConfig = calculateMapConfig(state.bounds);

    drawMap();

    // 设置默认鼠标样式
    canvas.value.style.cursor = 'grab';

    // 绑定滚轮事件（先移除再添加，避免重复绑定）
    canvas.value.removeEventListener('wheel', zoom);
    canvas.value.addEventListener('wheel', zoom);

    // 绑定拖拽事件
    canvas.value.removeEventListener('mousedown', onMouseDown);
    canvas.value.removeEventListener('mousemove', onMouseMove);
    canvas.value.removeEventListener('mouseup', onMouseUp);
    canvas.value.removeEventListener('mouseleave', onMouseLeave);

    canvas.value.addEventListener('mousedown', onMouseDown);
    canvas.value.addEventListener('mousemove', onMouseMove);
    canvas.value.addEventListener('mouseup', onMouseUp);
    canvas.value.addEventListener('mouseleave', onMouseLeave);
  }

  async function drawMap(callback?: (ctx: CanvasRenderingContext2D, name: string) => void) {
    console.log(state.mapConfig);

    if (!mapJson || !ctx) return;
    ctx!.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
    for (const feature of mapJson.features) {
      const { name } = feature.properties;
      const { type, coordinates } = feature.geometry;
      ctx!.beginPath();
      const paths = type === 'Polygon' ? [coordinates[0]] : coordinates.flat();
      for (const path of paths) {
        path.forEach((item, index) => {
          const [lng, lat] = item as [number, number];
          const { x, y } = convertCoord(lng, lat);
          index === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        });
        if (callback) {
          callback(ctx!, name);
        } else {
          ctx!.fillStyle = state.mapConfig.defaultFill;
          ctx!.strokeStyle = state.mapConfig.strokeColor;
          ctx!.lineWidth = state.mapConfig.strokeWidth;
        }
        ctx!.fill();
        ctx!.stroke();
      }
    }
  }

  // 滚轮缩放 - 以鼠标位置为中心
  function zoom(e: WheelEvent) {
    e.preventDefault(); // 阻止页面滚动

    if (!canvas.value) return;

    // 获取鼠标在Canvas内的坐标
    const rect = canvas.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 计算缩放前鼠标位置对应的世界坐标
    const worldX = (mouseX - state.mapConfig.offsetX) / state.mapConfig.scale;
    const worldY = (mouseY - state.mapConfig.offsetY) / state.mapConfig.scale;

    // 计算新的缩放比例
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // 向下滚动缩小，向上滚动放大
    const newScale = state.mapConfig.scale * zoomFactor;

    // 限制缩放范围
    const clampedScale = Math.min(
      Math.max(newScale, state.mapConfig.minScale),
      state.mapConfig.maxScale
    );

    // 如果缩放值没有变化，直接返回
    if (clampedScale === state.mapConfig.scale) return;

    // 计算新的偏移量，使鼠标位置保持不变
    const newOffsetX = mouseX - worldX * clampedScale;
    const newOffsetY = mouseY - worldY * clampedScale;

    // 更新地图配置
    state.mapConfig.scale = clampedScale;
    state.mapConfig.offsetX = newOffsetX;
    state.mapConfig.offsetY = newOffsetY;

    // 重绘地图
    drawMap();
  }

  // 鼠标按下事件 - 开始拖拽
  function onMouseDown(e: MouseEvent) {
    if (!canvas.value) return;

    state.dragState.isDragging = true;
    const rect = canvas.value.getBoundingClientRect();
    state.dragState.lastMouseX = e.clientX - rect.left;
    state.dragState.lastMouseY = e.clientY - rect.top;

    // 改变鼠标样式
    canvas.value.style.cursor = 'grabbing';
  }

  // 鼠标移动事件 - 执行拖拽
  function onMouseMove(e: MouseEvent) {
    if (!canvas.value || !state.dragState.isDragging) return;
    e.preventDefault();

    const rect = canvas.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 计算鼠标移动的距离
    const deltaX = mouseX - state.dragState.lastMouseX;
    const deltaY = mouseY - state.dragState.lastMouseY;

    // 更新地图偏移量
    state.mapConfig.offsetX += deltaX;
    state.mapConfig.offsetY -= deltaY;

    // 更新上次鼠标位置
    state.dragState.lastMouseX = mouseX;
    state.dragState.lastMouseY = mouseY;

    // 使用 requestAnimationFrame 优化性能
    if (state.dragState.animationFrameId) {
      cancelAnimationFrame(state.dragState.animationFrameId);
    }
    state.dragState.animationFrameId = requestAnimationFrame(() => {
      drawMap();
      state.dragState.animationFrameId = null;
    });
  }

  // 鼠标抬起事件 - 结束拖拽
  function onMouseUp() {
    if (!canvas.value) return;
    state.dragState.isDragging = false;
    canvas.value.style.cursor = 'grab';
  }

  // 鼠标离开画布 - 结束拖拽
  function onMouseLeave() {
    if (!canvas.value) return;
    state.dragState.isDragging = false;
  }

  // 清理函数 - 移除事件监听器
  function cleanup() {
    if (!canvas.value) return;

    // 取消待处理的动画帧
    if (state.dragState.animationFrameId) {
      cancelAnimationFrame(state.dragState.animationFrameId);
      state.dragState.animationFrameId = null;
    }

    // 移除滚轮事件
    canvas.value.removeEventListener('wheel', zoom);

    // 移除拖拽事件
    canvas.value.removeEventListener('mousedown', onMouseDown);
    canvas.value.removeEventListener('mousemove', onMouseMove);
    canvas.value.removeEventListener('mouseup', onMouseUp);
    canvas.value.removeEventListener('mouseleave', onMouseLeave);

    // 重置拖拽状态
    state.dragState.isDragging = false;

    // 重置鼠标样式
    canvas.value.style.cursor = 'default';
  }

  return { initMap, drawMap, convertCoord, cleanup };
}
