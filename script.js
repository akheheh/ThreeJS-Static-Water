import {OrbitControls} from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
const assetPath = "./Assets/";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.set(0, 0, 8);

//scene.background = new THREE.Color(0x0000ff);
const cubeMap = new THREE.CubeTextureLoader()
                            .setPath(`${assetPath}`)
                            .load(
                                [
                                'posx.jpg', 'negx.jpg',
                                'posy.jpg', 'negy.jpg',
                                'posz.jpg', 'negz.jpg' 
                                ]
);

const waterTexture = new THREE.TextureLoader().load(`${assetPath}waterTexture.jpg`);

scene.background = cubeMap;
const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({
    //color: '#097aff',
    metalness: 0.5,
    roughness: 0.1,
    envMap: cubeMap
});

const box = new THREE.Mesh(geometry, material);
box.position.set(0, -1, 0)
const sphere = new THREE.SphereBufferGeometry(1, 30, 30);

const ball = new THREE.Mesh(sphere, material);
ball.position.set(-5, -1, 0);
const plane = new THREE.PlaneBufferGeometry(1000, 1000);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#dbecff',
    metalness: 0.7,
    roughness: 0.1,
    envMap: cubeMap,
    bumpMap: waterTexture,
    bumpScale: 0.5
});
const floor = new THREE.Mesh(plane, planeMaterial);
floor.position.set(0, -1, 0);
floor.rotation.set(-1 * Math.PI/2, 0, 0);

const light = new THREE.DirectionalLight();
light.position.set(-17, 1, 8);
//light.rotation.set(0, -1 * Math.PI / 2)

scene.add(box);
scene.add(light);
scene.add(floor);
scene.add(ball);

const renderer = new THREE.WebGLRenderer({antialias: true});
//renderer.setClearColor('skyblue');
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

const controlProperties = {
    minDistance: 8,
    maxDistance: 50,
    maxPolarAngle: Math.PI/2,
}

Object.assign(controls, controlProperties);
const animate = () => {
    requestAnimationFrame(animate);
    //box.rotation.set(0, box.rotation.y + 0.02, 0);
    
    renderer.render(scene, camera);
};

animate();


window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.rotation.y += 0.01;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);