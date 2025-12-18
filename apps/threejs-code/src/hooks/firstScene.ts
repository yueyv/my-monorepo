import * as THREE from 'three';
import * as dat from 'dat.gui';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { useBaseGui } from './baseGui';

export const useFirstScene = (canvas: HTMLCanvasElement) => {
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#b7bab7');
  // 渲染器
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 软阴影
  // 相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  // 控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 材质
  const material = new THREE.MeshBasicMaterial({ color: 0xfff222 });
  // 物体
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true; // 投射阴影
  mesh.receiveShadow = true; // 接收阴影
  mesh.position.set(1, 1, 1);
  scene.add(mesh);
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // 颜色，强度
  scene.add(ambientLight);
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);
  // 点光
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  // 聚光灯
  const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.1, 1);
  spotLight.position.set(10, 10, 10);
  scene.add(spotLight);
  const gui = new dat.GUI();
  // 控制显示隐藏
  useBaseGui(gui, 'Cube', mesh, material);
  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  return { animate };
};
