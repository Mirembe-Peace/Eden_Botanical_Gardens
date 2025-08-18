import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('.canvas');

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1,100);
camera.position.set(0, 0, 0);
scene.add(camera);

//lights
const lights = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lights);

//load model
const loader = new GLTFLoader();
loader.load('./assets/models/plant_model.glb', function(gltf){
    const plant = gltf.scene;
    scene.add(plant);
    },
    function (error) {
            console.log('an error occured while loading museum model');
});

//renderer
const renderer = new THREE.WebGLRenderer({canvas : canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);
controls.enableDamping = true;

//animation loop
function animate(){
    renderer(scene, camera);
    requestAnimationFrame(animate);
}

animate();
