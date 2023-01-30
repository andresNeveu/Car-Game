import * as THREE from 'three';

const vehicleColors = [0xa52523, 0xbdb638, 0x78b14b];

const chooseRandom = array => array[Math.floor(Math.random() * array.length)];

/**
 * Create wheel
 * @returns
 */
const Wheel = () => {
	const wheel = new THREE.Mesh(
		new THREE.BoxGeometry(12, 33, 12),
		new THREE.MeshLambertMaterial({ color: 0x333333 })
	);
	wheel.position.z = 6;

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
		new THREE.MeshLambertMaterial({ color: chooseRandom(vehicleColors) })
	);
	main.position.z = 12;
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
