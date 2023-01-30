import * as THREE from 'three';
import { chooseRandom } from './utils';

const vehicleColors = [0xa52523, 0xbdb638, 0x78b14b];

/**
 * Create wheel
 * @returns
 */
const Wheel = () => {
	const wheelGeometry = new THREE.BoxGeometry(12, 33, 12);
	const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
	const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
	wheel.position.z = 6;
	wheel.castShadow = false;
	wheel.receiveShadow = false;

	return wheel;
};

/**
 * create front car texture
 * @returns
 */
const getCarFrontTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 32;
	const context = canvas.getContext('2d');

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, 64, 32);

	context.fillStyle = '#666666';
	context.fillRect(8, 8, 48, 24);

	return new THREE.CanvasTexture(canvas);
};

/**
 * create side car texture
 * @returns
 */
const getCarSideTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 128;
	canvas.height = 32;
	const context = canvas.getContext('2d');

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, 128, 32);

	context.fillStyle = '#666666';
	context.fillRect(10, 8, 38, 24);
	context.fillRect(58, 8, 60, 24);

	return new THREE.CanvasTexture(canvas);
};

/**
 * create car
 * @returns
 */
export const Car = () => {
	const car = new THREE.Group();
	const color = chooseRandom(vehicleColors);

	// add wheels
	const backWheel = Wheel();
	backWheel.position.x = -18;
	car.add(backWheel);

	const frontWheel = Wheel();
	frontWheel.position.x = 18;
	car.add(frontWheel);

	// create and add main of car
	const main = new THREE.Mesh(
		new THREE.BoxGeometry(60, 30, 15),
		new THREE.MeshLambertMaterial({ color })
	);
	main.position.z = 12;
	main.castShadow = true;
	main.receiveShadow = true;
	car.add(main);

	const carFrontTexture = getCarFrontTexture();
	carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
	carFrontTexture.rotation = Math.PI / 2;

	const carBackTexture = getCarFrontTexture();
	carBackTexture.center = new THREE.Vector2(0.5, 0.5);
	carBackTexture.rotation = -Math.PI / 2;

	const carRightSideTexture = getCarSideTexture();

	const carLeftSideTexture = getCarSideTexture();
	carLeftSideTexture.flipY = false;

	// create and add cabin of car
	const cabin = new THREE.Mesh(new THREE.BoxGeometry(33, 24, 12), [
		new THREE.MeshLambertMaterial({ map: carFrontTexture }),
		new THREE.MeshLambertMaterial({ map: carBackTexture }),
		new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
		new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
		new THREE.MeshLambertMaterial({ color: 0xffffff }),
		new THREE.MeshLambertMaterial({ color: 0xffffff }),
	]);
	cabin.position.x = -6;
	cabin.position.z = 25.5;
	car.add(cabin);

	return car;
};

const getTruckFrontTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 32;
	canvas.height = 32;
	const context = canvas.getContext('2d');

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, 32, 32);

	context.fillStyle = '#666666';
	context.fillRect(0, 5, 32, 10);

	return new THREE.CanvasTexture(canvas);
};

const getTruckSideTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 32;
	canvas.height = 32;
	const context = canvas.getContext('2d');

	context.fillStyle = '#ffffff';
	context.fillRect(0, 0, 32, 32);

	context.fillStyle = '#666666';
	context.fillRect(17, 5, 15, 10);

	return new THREE.CanvasTexture(canvas);
};

export const Truck = () => {
	const truck = new THREE.Group();
	const color = chooseRandom(vehicleColors);

	const base = new THREE.Mesh(
		new THREE.BoxGeometry(100, 25, 5),
		new THREE.MeshLambertMaterial({ color: 0xb4c6fc })
	);
	base.position.z = 10;
	truck.add(base);

	const cargo = new THREE.Mesh(
		new THREE.BoxGeometry(75, 35, 40),
		new THREE.MeshLambertMaterial({ color: 0xffffff })
	);
	cargo.position.x = -15;
	cargo.position.z = 30;
	cargo.castShadow = true;
	cargo.receiveShadow = true;
	truck.add(cargo);

	const truckFrontTexture = getTruckFrontTexture();
	truckFrontTexture.center = new THREE.Vector2(0.5, 0.5);
	truckFrontTexture.rotation = Math.PI / 2;

	const truckLeftTexture = getTruckSideTexture();
	truckLeftTexture.flipY = false;

	const truckRightTexture = getTruckSideTexture();

	const cabin = new THREE.Mesh(new THREE.BoxGeometry(25, 30, 30), [
		new THREE.MeshLambertMaterial({ color, map: truckFrontTexture }),
		new THREE.MeshLambertMaterial({ color }), // back
		new THREE.MeshLambertMaterial({ color, map: truckLeftTexture }),
		new THREE.MeshLambertMaterial({ color, map: truckRightTexture }),
		new THREE.MeshLambertMaterial({ color }), // top
		new THREE.MeshLambertMaterial({ color }), // bottom
	]);
	cabin.position.x = 40;
	cabin.position.z = 20;
	cabin.castShadow = true;
	cabin.receiveShadow = true;
	truck.add(cabin);

	const backWheel = Wheel();
	backWheel.position.x = -30;
	truck.add(backWheel);

	const middleWheel = Wheel();
	middleWheel.position.x = 10;
	truck.add(middleWheel);

	const frontWheel = Wheel();
	frontWheel.position.x = 38;
	truck.add(frontWheel);

	return truck;
};
