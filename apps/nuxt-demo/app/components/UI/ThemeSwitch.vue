<template>
  <client-only>
    <el-switch :model-value="systemStore.theme === SYSTEM_THEME_DARK" @change="handleThemeChange" />
  </client-only>
</template>

<script setup lang="ts">
import { SYSTEM_THEME_DARK, SYSTEM_THEME_LIGHT } from '../../constant';
import { useSystemStore } from '../../store';
import 'element-plus/theme-chalk/dark/css-vars.css';
const systemStore = useSystemStore();

onMounted(() => {
  if (import.meta.client) {
    systemStore.initTheme();
  }
});

const handleThemeChange = (value: string | number | boolean) => {
  systemStore.setTheme(value ? SYSTEM_THEME_DARK : SYSTEM_THEME_LIGHT);
};
</script>
<style lang="scss" scoped>
.theme-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;
  user-select: none;
}

.theme-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.slider-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;

  svg {
    width: 100%;
    height: 100%;
  }
}

.theme-checkbox:checked + .switch-slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  &::before {
    transform: translateX(30px);
  }

  .slider-icon {
    left: 34px;
  }
}

.theme-checkbox:not(:checked) + .switch-slider {
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
}

.moon-icon {
  animation: rotate 0.4s ease-in-out;
}

.sun-icon {
  animation: rotate 0.4s ease-in-out;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 添加悬停效果
.theme-switch:hover .switch-slider::before {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}
</style>
