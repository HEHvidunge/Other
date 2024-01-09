import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';
import { HDRIManager } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/HDRIManager.js';

let camera, scene, renderer, object, sphere, controls;

init();
animate();

function init() {
  // Set up camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Set up scene
  scene = new THREE.Scene();

  // Load HDRI environment
  const hdriManager = new HDRIManager();
  hdriManager.load('resources/abandoned_pathway_2k.exr', hdr => {
    scene.background = hdr;
    scene.environment = hdr;
  });

  // Load 3D object
  const loader = new GLTFLoader();
  loader.load('resources/scene.gltf', gltf => {
    object = gltf.scene;
    object.rotation.y = Math.PI; // Adjust rotation if needed
    scene.add(object);
  });

  // Create sphere for background
  const sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  // Set up renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Set up controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;

  // Handle window resize
  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
