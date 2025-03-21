import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('canvas-container');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10); // Move the camera further back

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increase intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Increase intensity
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load GLTF Model
const loader = new GLTFLoader();
loader.load(
  './assets/models/mongkey.glb', // Ensure the path is correct
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale if needed
    model.position.set(0, 0, 0); // Ensure the model is centered
    model.rotation.set(0, Math.PI, 0); // Rotate if necessary
    scene.add(model);
    console.log('Model successfully loaded');
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();