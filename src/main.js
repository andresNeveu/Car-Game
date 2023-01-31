import * as THREE from 'three';
import { renderMap } from './renderMap';
import { arcCenterX, chooseRandom, trackRadius } from './utils';
import { Car, Truck } from './vehicles';

// html elements
const scoreElement = document.getElementById('score');
const buttonsElement = document.getElementById('buttons');
const instructionsElement = document.getElementById('instructions');
const resultsElement = document.getElementById('results');
const accelerateButton = document.getElementById('accelerate');
const decelerateButton = document.getElementById('decelerate');

// const to game logic
const playerAngleInitial = Math.PI;
const speed = 0.0017;
const config = {
	showHitZones: false,
	shadows: true, // Use shadow
	trees: true, // Add trees to the map
	curbs: true, // Show texture on the extruded geometry
	grid: false, // Show grid helper
};

// let to game logic

let ready;
let playerAngleMoved;
let score;
let otherVehicles = [];
let lastTimestamp;
let accelerate = false; // Is the player accelerating
let decelerate = false; // Is the player decelerating

const scene = new THREE.Scene();

// add car
const playerCar = Car();
scene.add(playerCar);

// lights
const ambientLights = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLights);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 300);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.left = -400;
dirLight.shadow.camera.right = 350;
dirLight.shadow.camera.top = 400;
dirLight.shadow.camera.bottom = -300;
dirLight.shadow.camera.near = 100;
dirLight.shadow.camera.far = 800;
scene.add(dirLight);

// camera
const aspectRadio = window.innerWidth / window.innerHeight;
const cameraWidth = 960;
const cameraHeight = cameraWidth / aspectRadio;

const camera = new THREE.OrthographicCamera(
	cameraWidth / -2, // left
	cameraWidth / 2, // right
	cameraHeight / 2, // top
	cameraHeight / -2, // bottom
	50, // near plane
	700 // far plane
);
camera.position.set(0, -210, 300);
camera.lookAt(0, 0, 0);

// map
const { plane, fieldMesh } = renderMap(cameraWidth, cameraHeight * 2);
scene.add(plane);
scene.add(fieldMesh);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
if (config.shadows) renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
