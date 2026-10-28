import * as THREE from 'three';

import { createScene } from './scene';

const canvas = document.querySelector('canvas');

if (!canvas) {
  throw new Error('Game canvas not found');
}

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
const { scene, camera, cube } = createScene();

// hide spinner when loaded
document.getElementById('spinner')?.remove();

function animate(time: number) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  renderer.render(scene, camera);
}

// helpers for development
if (import.meta.env.DEV) {
  scene.add(new THREE.AxesHelper(2));
  scene.add(new THREE.GridHelper(10, 10));
  scene.add(new THREE.CameraHelper(camera));
}

// pause when tab is hidden
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    renderer.setAnimationLoop(null);
  } else {
    renderer.setAnimationLoop(animate);
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
