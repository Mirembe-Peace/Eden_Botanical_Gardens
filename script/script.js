import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('.canvas');
const width = canvas.clientWidth;
const height = canvas.clientHeight;

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
scene.add(camera);

//lights
const lights = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lights);

//load model
const loader = new GLTFLoader();
loader.load('./assets/models/plant_model.glb', function(gltf){
    const plant = gltf.scene;
    plant.position.set(0, 0, 0);
    scene.add(plant);
    },
    function (error) {
            console.log('an error occured while loading plant model');
});

//renderer
const renderer = new THREE.WebGLRenderer({alpha : true});
renderer.setSize(width, height, false);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);
controls.enableDamping = true;

//animation loop
function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
