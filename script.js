// ================= HAMBURGER MENU =================
function toggleMenu() {
    document.querySelector(".menu")?.classList.toggle("active");
}

// ================= PROJECT SLIDER (Reusable) =================
function initProjectSlider() {
    // 1. Deklarasikan fungsi global di awal dengan fungsi kosong (fallback)
    window.nextImage = () => {};
    window.prevImage = () => {};
    window.changeImage = () => {};

    const container = document.querySelector(".main-image");
    if (!container) return;

    const preview = document.getElementById("preview");
    if (!preview) return;

    // PINDAH KE ATAS: Deklarasi thumbContainer agar bisa diakses oleh updateImage()
    const thumbContainer = document.querySelector(".thumbnail-container");

    let images = [];
    let currentIndex = 0;

    // Ambil gambar dari data-images
    if (container.dataset.images) {
        try {
            images = JSON.parse(container.dataset.images);
        } catch (e) {
            console.error("Error parsing data-images:", e);
            return; 
        }
    }

    if (images.length === 0) return; 

    function updateImage() {
        if (images[currentIndex]) {
            preview.src = images[currentIndex];
            
            // Sekarang baris ini aman karena thumbContainer sudah dideklarasikan di atas
            const thumbs = thumbContainer?.querySelectorAll('img');
            thumbs?.forEach((thumb, idx) => {
                if (idx === currentIndex) {
                    thumb.classList.add('active'); 
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
    }

    // 2. Isi fungsi global dengan logika asli setelah dipastikan elemennya ada
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
    if (thumbContainer) {
        thumbContainer.innerHTML = ''; 

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Thumbnail ${index + 1}`;
            img.onclick = () => changeImage(index);
            thumbContainer.appendChild(img);
        });
    }

    // Tampilkan gambar pertama secara inisial
    updateImage();
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