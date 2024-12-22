// Variabel model dan loader
const loader = new THREE.GLTFLoader();
const containers = document.querySelectorAll('.model-container');


// Fungsi untuk inisialisasi Three.js di setiap container
function initThreeJS(containerId, modelURL) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Tambahkan cahaya
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    light.position.set(0, 1, 0);
    scene.add(light);

    // Load model
    loader.load(`assest/models/${modelURL}`, (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.1, 0.1, 0.1);
        model.position.set(0, 0, -6);
        scene.add(model);

        // Mengatur pusat putaran objek dengan merubah geometri
        model.traverse(function(child) {
            if (child.isMesh) {
                const geometry = child.geometry;
                geometry.center();
                //child.scale.set(0.9, 0.9, 0.9);

            }
        });

        // Animasi model
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01;
            renderer.render(scene, camera);

        }
        animate();
    });

    camera.position.set(0, 1, 3);
}

// Load model di setiap container
initThreeJS('model1-container', 'rak.glb');
initThreeJS('model2-container', 'mejakerja.glb');
initThreeJS('model3-container', 'mediumbed5.glb');
initThreeJS('model4-container', 'kursi.glb');

const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get('model');
    //set model viewer
    
//qr
const qrModal = document.getElementById('qr-modal');
const qrContainer = document.getElementById('qrcode');
const closeBtn = document.getElementById('close-btn');

function showQRCode(modelURL) {
    qrContainer.innerHTML = ""; // Bersihkan QR sebelumnya
    const modelViewerURL = `${window.location.origin}/viewer.html?model=${modelURL}`;
    const qrCode = new QRCode(qrContainer, {
        text: modelViewerURL,
        width: 200,
        height: 200
    });
    qrModal.style.display = "flex";
}
document.querySelectorAll('.ar-button').forEach(button => {
    button.addEventListener('click', () => {
        const modelURL = button.getAttribute('data-model');
        showQRCode(modelURL);
    }
    if (model) {
      document.getElementById('modelViewer').src = `assest/models/${model}`;
    } else {
      document.body.innerHTML = "<h1>Model Not Found!</h1>"
    });
});
closeBtn.addEventListener('click', () => {
    qrModal.style.display = "none";
});
