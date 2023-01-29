import * as THREE from 'three';

const vehicleColors = [0xa52523, 0xbdb638, 0x78b14b];

const chooseRandom = array => array[Math.floor(Math.random() * array.length)];

/**
 * Create wheels
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

	// create and add cabin of car
	const cabin = new THREE.Mesh(
		new THREE.BoxGeometry(33, 24, 12),
		new THREE.MeshLambertMaterial({ color: 0xffffff })
	);
	cabin.position.x = -6;
	cabin.position.z = 25.5;
	car.add(cabin);

	return car;
};
