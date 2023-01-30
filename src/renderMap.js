import * as THREE from 'three';
import {
	arcAngle1,
	arcAngle2,
	arcAngle3,
	arcAngle4,
	arcCenterX,
	innerTrackRadius,
	outerTrackRadius,
	trackRadius,
} from './utils';

const trackColor = '#546E90';
const lawnGreen = '#67C240';

const getLineMarkings = (mapWidth, mapHeight) => {
	const canvas = document.createElement('canvas');
	canvas.width = mapWidth;
	canvas.height = mapHeight;
	const context = canvas.getContext('2d');

	context.fillStyle = trackColor;
	context.fillRect(0, 0, mapWidth, mapHeight);

	context.lineWidth = 2;
	context.strokeStyle = '#E0FFFF';
	context.setLineDash([10, 14]);

	// left circle
	context.beginPath();
	context.arc(
		mapWidth / 2 - arcCenterX,
		mapHeight / 2,
		trackRadius,
		0,
		Math.PI * 2
	);
	context.stroke();
	// right circle
	context.beginPath();
	context.arc(
		mapWidth / 2 + arcCenterX,
		mapHeight / 2,
		trackRadius,
		0,
		Math.PI * 2
	);
	context.stroke();

	return new THREE.CanvasTexture(canvas);
};

const getLeftIsland = () => {
	const islandLeft = new THREE.Shape();

	islandLeft.absarc(
		-arcCenterX,
		0,
		innerTrackRadius,
		arcAngle1,
		-arcAngle1,
		false
	);

	islandLeft.absarc(
		arcCenterX,
		0,
		outerTrackRadius,
		Math.PI + arcAngle2,
		Math.PI - arcAngle2,
		true
	);

	return islandLeft;
};

const gerRightIsland = () => {
	const islandRight = new THREE.Shape();

	islandRight.absarc(
		arcCenterX,
		0,
		innerTrackRadius,
		Math.PI - arcAngle1,
		Math.PI + arcAngle1,
		true
	);

	islandRight.absarc(
		-arcCenterX,
		0,
		outerTrackRadius,
		-arcAngle2,
		arcAngle2,
		false
	);

	return islandRight;
};

const getMiddleIsland = () => {
	const islandMiddle = new THREE.Shape();

	islandMiddle.absarc(
		-arcCenterX,
		0,
		innerTrackRadius,
		arcAngle3,
		-arcAngle3,
		true
	);

	islandMiddle.absarc(
		arcCenterX,
		0,
		innerTrackRadius,
		Math.PI + arcAngle3,
		Math.PI - arcAngle3,
		true
	);

	return islandMiddle;
};

const getOuterField = (mapWidth, mapHeight) => {
	const field = new THREE.Shape();

	field.moveTo(-mapWidth / 2, -mapHeight / 2);
	field.lineTo(0, -mapHeight / 2);

	field.absarc(-arcCenterX, 0, outerTrackRadius, -arcAngle4, arcAngle4, true);

	field.absarc(
		arcCenterX,
		0,
		outerTrackRadius,
		Math.PI - arcAngle4,
		Math.PI + arcAngle4,
		true
	);

	field.lineTo(0, -mapHeight / 2);
	field.lineTo(mapWidth / 2, -mapHeight / 2);
	field.lineTo(mapWidth / 2, mapHeight / 2);
	field.lineTo(-mapWidth / 2, mapHeight / 2);

	return field;
};

export const renderMap = (mapWidth, mapHeight) => {
	const lineMarkingsTexture = getLineMarkings(mapWidth, mapHeight);

	const planeGeometry = new THREE.PlaneGeometry(mapWidth, mapHeight);
	const planeMaterial = new THREE.MeshLambertMaterial({
		map: lineMarkingsTexture,
	});
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.matrixAutoUpdate = false;

	const islandLeft = getLeftIsland();
	const islandRight = gerRightIsland();
	const islandMiddle = getMiddleIsland();
	const outerField = getOuterField(mapWidth, mapHeight);

	const fieldGeometry = new THREE.ExtrudeGeometry(
		[islandLeft, islandRight, islandMiddle, outerField],
		{ depth: 6, bevelEnabled: false }
	);

	const fieldMesh = new THREE.Mesh(fieldGeometry, [
		new THREE.MeshLambertMaterial({ color: lawnGreen }),
		new THREE.MeshLambertMaterial({ color: 0x23311c }),
	]);
	fieldMesh.receiveShadow = true;
	fieldMesh.matrixAutoUpdate = false;

	return { plane, fieldMesh };
};
