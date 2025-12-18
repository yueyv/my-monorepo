import * as dat from 'dat.gui';
import * as THREE from 'three';

export const useBaseGui = (
  gui: dat.GUI,
  name: string,
  mesh: THREE.Mesh,
  material: THREE.MeshBasicMaterial
) => {
  const cubeFolder = gui.addFolder(name);
  cubeFolder.add(mesh, 'visible').name('显示/隐藏');

  // 添加位置控制
  cubeFolder.add(mesh.position, 'x', -5, 5).name('X 位置');
  cubeFolder.add(mesh.position, 'y', -5, 5).name('Y 位置');
  cubeFolder.add(mesh.position, 'z', -5, 5).name('Z 位置');

  // 添加缩放控制
  cubeFolder.add(mesh.scale, 'x', 0.1, 5).name('X 缩放');
  cubeFolder.add(mesh.scale, 'y', 0.1, 5).name('Y 缩放');
  cubeFolder.add(mesh.scale, 'z', 0.1, 5).name('Z 缩放');

  // 添加角度和颜色控制参数
  const params = {
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    color: '#00ff00',
  };
  // 添加旋转控制（使用角度）
  cubeFolder
    .add(params, 'rotationX', 0, 180)
    .name('X 旋转(度)')
    .onChange((value) => {
      mesh.rotation.x = THREE.MathUtils.degToRad(value);
    });
  cubeFolder
    .add(params, 'rotationY', 0, 180)
    .name('Y 旋转(度)')
    .onChange((value) => {
      mesh.rotation.y = THREE.MathUtils.degToRad(value);
    });
  cubeFolder
    .add(params, 'rotationZ', 0, 180)
    .name('Z 旋转(度)')
    .onChange((value) => {
      mesh.rotation.z = THREE.MathUtils.degToRad(value);
    });

  // 添加颜色控制
  cubeFolder
    .addColor(params, 'color')
    .name('颜色')
    .onChange((value) => {
      material.color.set(value);
    });
  // 默认展开文件夹
  cubeFolder.open();
};
