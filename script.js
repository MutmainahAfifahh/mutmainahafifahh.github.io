// ================= HAMBURGER MENU =================
function toggleMenu() {
    document.querySelector(".menu")?.classList.toggle("active");
}

// ================= PROJECT SLIDER (Reusable) =================
function initProjectSlider() {
    const container = document.querySelector(".main-image");
    if (!container) return;

    const preview = document.getElementById("preview");
    if (!preview) return;

    let images = [];
    let currentIndex = 0;

    // Ambil gambar dari data-images
    if (container.dataset.images) {
        try {
            images = JSON.parse(container.dataset.images);
        } catch (e) {
            console.error("Error parsing data-images:", e);
        }
    }

    function updateImage() {
        if (images.length > 0) {
            preview.src = images[currentIndex];
        }
    }

    // Fungsi global agar bisa dipanggil dari onclick
    window.nextImage = function () {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    };

    window.prevImage = function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    };

    window.changeImage = function (index) {
        currentIndex = index;
        updateImage();
    };

    // Generate Thumbnail Otomatis
    const thumbContainer = document.querySelector(".thumbnail-container");
    if (thumbContainer && images.length > 0) {
        thumbContainer.innerHTML = ''; // bersihkan dulu

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Thumbnail ${index + 1}`;
            img.onclick = () => changeImage(index);
            thumbContainer.appendChild(img);
        });
    }

    // Tampilkan gambar pertama
    if (images.length > 0) {
        updateImage();
    }
}

// Jalankan saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    initProjectSlider();
    
    // Hamburger menu
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }
});

