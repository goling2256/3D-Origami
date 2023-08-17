import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';


//Initializing renderer
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


//Creating the scene
const scene = new THREE.Scene();
renderer.setClearColor(0xffffff); // Set clear color to white


//Setting up Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(-10, 30, 30);


// Axes when  needed
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//Setting up mouse controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

// Setting up paper geoemtry (Box geometry)
const paperWidth = 10;
const paperThickness = 0.01;
const paperDepth = 10;
const paperGeometry = new THREE.BoxGeometry(paperWidth, paperThickness, paperDepth);

// Materials
const red = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
const blue = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const materials = [red, red, red, blue, red, red]; // Face: front, back, top, bottom, left, right

//Initializing Paper Mesh
const paper = new THREE.Mesh(paperGeometry, materials);
scene.add(paper);

function animate(time) {
    paper.rotation.copy(targetRotation);  //Update folding transformations of paper 
    //paper.rotation.x = time/1000;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }


// Handling window resize
window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
});


animate();