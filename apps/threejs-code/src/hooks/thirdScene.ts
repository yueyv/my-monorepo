import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loadModel = (url: string, scene: THREE.Scene, position: THREE.Vector3) => {
  const loader = new GLTFLoader();
  loader.load(url, (gltf) => {
    const model = gltf.scene;
    model.position.set(position.x, position.y, position.z);

    // 遍历模型的所有子对象，为网格添加阴影
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(model);
  });
};

export const useThirdScene = (canvas: HTMLCanvasElement) => {
  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#cecece');
  scene.fog = new THREE.Fog('#cecece', 10, 100);
  const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
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
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.03,
    1000
  );
  camera.position.z = 1;
  camera.position.y = 1;
  camera.position.x = 1;
  //光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

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

  loadModel(
    new URL('../assets/ABeautifulGame.glb', import.meta.url).href,
    scene,
    new THREE.Vector3(0, 0, 0)
  );

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
