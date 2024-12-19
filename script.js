/* // Setup Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.7), 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container = document.getElementById('canvas-container');
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Pencahayaan
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
light.position.set(0, 1, 0);
scene.add(light);

// Variabel model dan loader
const loader = new THREE.GLTFLoader();
let currentModel = null; // Model yang saat ini ditampilkan
let selectedModelURL = null; // URL model yang dipilih

// Fungsi untuk memuat model 3D
function loadModel(modelURL) {
    if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
    }

    loader.load(`assest/models/${modelURL}`, (gltf) => {
        currentModel = gltf.scene;
        currentModel.scale.set(0.1, 0.1, 0.1); // Atur skala
        scene.add(currentModel);
    });

    selectedModelURL = modelURL; // Simpan model yang dipilih
    document.getElementById('ar-button').disabled = false; // Aktifkan tombol AR
}

// Event listener untuk tombol model
document.querySelectorAll('#model-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const modelURL = button.getAttribute('data-model');
        loadModel(modelURL);
    });
});

// Tombol untuk masuk AR
document.getElementById('ar-button').addEventListener('click', () => {
    if (/Android/i.test(navigator.userAgent)) {
        if (selectedModelURL) {
            // URL model yang akan dimuat dalam AR
            const modelPath = `assest/models/${selectedModelURL}`;

            // Buka model dalam AR menggunakan <a rel="ar">
            const anchor = document.createElement('a');
            anchor.setAttribute('rel', 'ar');
            anchor.setAttribute('href', modelPath);
            anchor.click();
        } else {
            alert('Pilih model terlebih dahulu!');
        }
    } else {
        alert('Fitur AR hanya dapat digunakan di perangkat Android.');
    }
});

// Posisi kamera
camera.position.set(0, 1, 3);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    if (currentModel) currentModel.rotation.y += 0.01; // Rotasi model
    renderer.render(scene, camera);
}
animate();*/

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

// Tombol AR
/*document.querySelectorAll('.ar-button').forEach(button => {
    button.addEventListener('click', () => {
        if (/Android/i.test(navigator.userAgent)) {
            const modelPath = `assest/models/${button.getAttribute('data-model')}`;
            const anchor = document.createElement('a');
            anchor.setAttribute('rel', 'ar');
            anchor.setAttribute('href', modelPath);
            anchor.click();
        } else {
            alert('Fitur AR ini hanya tersedia di perangkat Android.');
        }
    });
});*/

//qr
const qrModal = document.getElementById('qr-modal');
const qrContainer = document.getElementById('qrcode');
const closeBtn = document.getElementById('close-btn');

function showQRCode(modelURL) {
    qrContainer.innerHTML = ""; // Bersihkan QR sebelumnya
    const qrCode = new QRCode(qrContainer, {
        text: window.location.origin + `/assest/models/${modelURL}`,
        width: 200,
        height: 200
    });
    qrModal.style.display = "flex";
}
document.querySelectorAll('.ar-button').forEach(button => {
    button.addEventListener('click', () => {
        const modelURL = button.getAttribute('data-model');
        showQRCode(modelURL);
    });
});
closeBtn.addEventListener('click', () => {
    qrModal.style.display = "none";
});