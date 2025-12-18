import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const useSecondScene = (canvas: HTMLCanvasElement) => {
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#cecece');
  scene.fog = new THREE.Fog('#cecece', 10, 100);
  const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#cecece' });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // 旋转为水平地面
  ground.receiveShadow = true;
  scene.add(ground);
  // 渲染器
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // 开启阴影
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 软阴影
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // 相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 1;
  camera.position.x = 1;
  //
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const colors = ['#a6a6a6', '#e1d5d5', '#d5d5d5', '#ffffff', '#000000', '#023f23'];
  for (let i = 0; i < 30; i++) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 从colors中随机选一种颜色
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const material = new THREE.MeshStandardMaterial({ color: randomColor });
    const mesh = new THREE.Mesh(geometry, material);
    // 将 y 轴位置调整为非负数，确保立方体在地面上
    mesh.position.set(Math.random() * 10 - 5, Math.random() * 5, Math.random() * 10 - 5);
    mesh.castShadow = true; // 产生阴影
    mesh.receiveShadow = true; // 接收阴影
    scene.add(mesh);
  }

  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  mainLight.intensity = 2;
  scene.add(mainLight);

  const mainLightHelper = new THREE.DirectionalLightHelper(mainLight);
  scene.add(mainLightHelper);

  const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.3);
  secondaryLight.position.set(-5, 5, -5);
  scene.add(secondaryLight);

  const secondaryLightHelper = new THREE.DirectionalLightHelper(secondaryLight);
  scene.add(secondaryLightHelper);

  //   mainLightHelper.visible = false;
  //   secondaryLightHelper.visible = false;
  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 渲染循环
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  // 窗口大小改变时，更新渲染器和相机
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  return { animate };
};
