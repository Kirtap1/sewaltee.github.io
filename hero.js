const hero = document.getElementById("hero-section");
const imageContainer = document.querySelector('.image-container');
const images = [
    'assets/theGloob.jpg',
    'assets/theStern.jpg',
    'assets/theIndiqa.jpg',
];

let currentImageIndex = 0;

    function preloadImages() {
        images.forEach((imageSrc) => {
            const img = new Image();
            img.src = imageSrc;
        });
    }
    
    function changeHeroImage() {
        imageContainer.style.backgroundImage = `url(${images[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    // New smooth scroll functionality
    function initExploreButton() {
        const exploreButton = document.querySelector('.explore-button');
        
        if (exploreButton) {
            exploreButton.addEventListener('click', (e) => {
                e.preventDefault();
                const lampsSection = document.getElementById('lamps');
                
                if (lampsSection) {
                    lampsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Initialize all functionality
    preloadImages();
    changeHeroImage();
    initExploreButton(); // Initialize the scroll functionality
    setInterval(changeHeroImage, 5000);