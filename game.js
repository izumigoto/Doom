// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up player movement
let player = {
  x: 0,
  y: 0,
  z: 0,
  rotation: 0
};

// Set up a simple floor
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Set up basic lighting
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(0, 50, 0);
scene.add(light);

// Set up player controls
document.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    player.x += Math.sin(player.rotation) * 0.1;
    player.z += Math.cos(player.rotation) * 0.1;
  } else if (event.key === 's') {
    player.x -= Math.sin(player.rotation) * 0.1;
    player.z -= Math.cos(player.rotation) * 0.1;
  } else if (event.key === 'a') {
    player.rotation -= 0.1;
  } else if (event.key === 'd') {
    player.rotation += 0.1;
  }
});

// Set the camera to follow the player
function updateCamera() {
  camera.position.set(player.x, 1, player.z + 5);
  camera.lookAt(player.x, 1, player.z);
}

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  updateCamera();
  renderer.render(scene, camera);
}

animate();
