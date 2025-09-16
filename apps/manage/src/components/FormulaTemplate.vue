<template>
  <div ref="HtCanvas" class="w-full h-full relative"></div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, PropType } from 'vue';
import { useDebounceFn, useResizeObserver } from '@vueuse/core';
import { formula, param, root } from '@/assets/ts/htParams';
import '@/assets/lib/dzAyRgyLAtFk.js';
import '@/assets/lib/swOTQztTrXKB.js';
import '@/assets/lib/ht.js';
import '@/assets/lib/buckle.js';
import '@/assets/lib/ht-autolayout.js';
import '@/assets/lib/ht-edgetype.js';
import '@/assets/lib/ht-forcelayout.js';
// @ts-ignore
// const ht = window.rawWindow.ht;

ht.Default.setImage('formula', formula);
ht.Default.setImage('param', param);
ht.Default.setImage('root', root);
const maxlength = (str1: string, str2: string) => {
  if (str1.length > str2.length) {
    return str1.length;
  } else {
    return str2.length;
  }
};
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    default: {},
  },
});
const HtCanvas = ref<HTMLElement>();
const dm = new ht.DataModel();
const gv = new ht.graph.GraphView(dm);
const autoLayout = new ht.layout.AutoLayout(gv, {});
function reLayout(animate: any) {
  autoLayout.setAnimate(animate);
  autoLayout.layout('towardsouth', function () {
    gv.fitContent(animate);
  });
}
//添加边
const addEdge = (source: any, target: any) => {
  let edge = new ht.Edge(source, target);
  // 图元设置为不可移动，不可编辑
  edge.s('2d.editable', false);
  edge.s('select.color', 'rgba(0,0,0,0)');
  edge.s({
    'edge.color': '#0d47a1',
    'edge.width': 3,
    // 'edge.type': 'h.v',
    'edge.corner.radius': 1,
    'edge.center': true,
    interactive: true,
  });
  //设置线型
  dm.add(edge);
  return edge;
};
//添加节点
const rootNode = (label: string, formula: string) => {
  let node = new ht.Node();
  node.setImage('root');
  node.a('title', label);
  node.a('value', formula);
  let length = maxlength(label, formula);
  if (length > 14) {
    node.a('width', 13 * length);
    node.a('rect', [0, 0, 13 * length, 50]);
    node.a('text_rect1', [0, 0, 13 * length, 25]);
    node.a('text_rect2', [0, 15, 13 * length, 40]);
  }
  node.s({
    '2d.editable': false,
    pixelPerfect: true,
    interactive: false,
  });

  dm.add(node);
  return node;
};
const formulaNode = (label: string, formula: string) => {
  let node = new ht.Node();
  node.setImage('formula');
  node.a('title', label);
  node.a('value', formula);
  let length = maxlength(label, formula);
  if (length > 14) {
    node.a('width', 13 * length);
    node.a('rect', [0, 0, 13 * length, 50]);
    node.a('text_rect1', [0, 0, 13 * length, 25]);
    node.a('text_rect2', [0, 15, 13 * length, 40]);
  }
  node.s({
    '2d.editable': false,
    pixelPerfect: true,
    interactive: false,
  });
  dm.add(node);
  return node;
};
const addNode = (label: string) => {
  let node = new ht.Node();
  node.setImage('param');
  node.a('title', label);
  if (label.length > 14) {
    node.a('width', 13 * label.length);
    node.a('rect', [0, 0, 13 * label.length, 40]);
    node.a('text_rect1', [0, 10, 13 * label.length, 20]);
  }
  node.s({
    '2d.editable': false,
    pixelPerfect: true,
    interactive: false,
  });
  dm.add(node);
  return node;
};
function initdm() {
  let root = rootNode(props.data?.label, props.data?.formula);
  for (let item of props.data?.children) {
    let formula = formulaNode(item?.label, item?.formula);
    addEdge(root, formula);
    for (let child of item?.children) {
      let node = addNode(child?.label);
      addEdge(formula, node);
    }
  }
}

const clear = () => {
  dm.clear();
};
onMounted(async () => {
  //禁止滚动
  gv.setScrollBarVisible(false);
  //禁止平移
  gv.setPannable(true);
  gv.setEditable(false);
  await nextTick();
  gv.addToDOM(HtCanvas.value);
  initdm();
  useResizeObserver(
    HtCanvas.value,
    useDebounceFn(() => {
      reLayout(true);
    }, 500)
  );
});
onUnmounted(() => {
  clear();
});
</script>

<style scoped lang="scss"></style>
