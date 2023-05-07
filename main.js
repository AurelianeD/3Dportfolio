import './style.css'
import *	as THREE from 'three'
import {	OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);


renderer.render(scene, camera);

//	Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//	Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//	Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
//
// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

//	Background

const skyTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = skyTexture;

//	Avatar
const aurelianeTexture = new THREE.TextureLoader().load('aureliane.jpeg');
const aureliane = new THREE.Mesh(
		new THREE.BoxGeometry(3, 3, 3),
		new THREE.MeshBasicMaterial({ map: aurelianeTexture })
);
scene.add(aureliane);


//Sun

const sunTexture = new THREE.TextureLoader().load('sun.jpeg');
const normalTexture = new THREE.TextureLoader().load('reliefMoon.jpeg');
const sun = new THREE.Mesh(
		new THREE.SphereGeometry(3, 32, 32),
		new THREE.MeshBasicMaterial({ map: sunTexture, normalMap: normalTexture})
);
scene.add(sun);

sun.position.z = 30;
sun.position.setX(-10);

aureliane.position.z = -5;
aureliane.position.x = 2;

// Scroll Animation
function moveCamera(){
	const top = document.body.getBoundingClientRect().top;
	sun.rotation.x += 0.05;
	sun.rotation.y += 0.075;
	sun.rotation.z += 0.05;

	aureliane.rotation.y += 0.01;
	aureliane.rotation.z += 0.01;

	camera.position.z = top * -0.01;
	camera.position.x = top * -0.0002;
	camera.rotation.y = top * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//	Animation Loop
function animate() {
	requestAnimationFrame(animate);
	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;
	// controls.update();
	renderer.render(scene, camera);
}

animate();
