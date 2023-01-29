import * as THREE from 'three';
import { Car } from './vehicles';

const scene = new THREE.Scene();

// add car
const playerCar = Car();
scene.add(playerCar);

// lights
const ambientLights = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLights);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 400);
scene.add(dirLight);

// camera
const aspectRadio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRadio;

const camera = new THREE.OrthographicCamera(
	cameraWidth / -2, // left
	cameraWidth / 2, // right
	cameraHeight / 2, // top
	cameraHeight / -2, // bottom
	0, // near plane
	1000 // far plane
);
camera.position.set(200, -200, 300);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
