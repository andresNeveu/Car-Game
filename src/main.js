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

// map and render
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

// listeners

window.addEventListener('keydown', function (event) {
	if (event.key === 'ArrowUp') {
		// startGame();
		accelerate = true;
		return;
	}
	if (event.key === 'ArrowDown') {
		decelerate = true;
		return;
	}
	if (event.key === 'R' || event.key === 'r') {
		// reset();
	}
});
window.addEventListener('keyup', function (event) {
	if (event.key === 'ArrowUp') {
		accelerate = false;
		return;
	}
	if (event.key === 'ArrowDown') {
		decelerate = false;
	}
});

// speeds

const getPlayerSpeed = () => {
	if (accelerate) return speed * 2;
	if (decelerate) return speed * 0.5;
	return speed;
};

const getVehicleSpeed = type => {
	if (type === 'car') {
		const minimumSpeed = 1;
		const maximumSpeed = 2;
		return minimumSpeed + Math.random() * (maximumSpeed - minimumSpeed);
	}
	if (type === 'truck') {
		const minimumSpeed = 0.6;
		const maximumSpeed = 1.5;
		return minimumSpeed + Math.random() * (maximumSpeed - minimumSpeed);
	}
};

// movements

const movePlayerCar = timeDelta => {
	const playerSpeed = getPlayerSpeed();
	playerAngleMoved -= playerSpeed * timeDelta;

	const totalPlayerAngle = playerAngleInitial + playerAngleMoved;

	const playerX = Math.cos(totalPlayerAngle) * trackRadius - arcCenterX;
	const playerY = Math.sin(totalPlayerAngle) * trackRadius;

	playerCar.position.x = playerX;
	playerCar.position.y = playerY;

	playerCar.rotation.z = totalPlayerAngle - Math.PI / 2;
};

const moveOtherVehicles = timeDelta => {
	otherVehicles.forEach(vehicle => {
		if (vehicle.clockwise) {
			vehicle.angle -= speed * timeDelta * vehicle.speed;
		} else {
			vehicle.angle += speed * timeDelta * vehicle.speed;
		}

		const vehicleX = Math.cos(vehicle.angle) * trackRadius + arcCenterX;
		const vehicleY = Math.sin(vehicle.angle) * trackRadius;
		const rotation =
			vehicle.angle + (vehicle.clockwise ? -Math.PI / 2 : Math.PI / 2);
		vehicle.mesh.position.x = vehicleX;
		vehicle.mesh.position.y = vehicleY;
		vehicle.mesh.rotation.z = rotation;
	});
};
