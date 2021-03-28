let slideIndex = 0;
const itemsPerSlide = 3;
const totalSlidesAmount = document.getElementsByClassName('new-collection-item').length;

function moveLeft() {
    if (slideIndex > 0) {
        slideIndex -= 1;
        showSlides(slideIndex);
    }
}


function moveRight() {
    if (slideIndex < totalSlidesAmount - itemsPerSlide) {
        slideIndex += 1;
        showSlides(slideIndex);
    }
}


function showSlides(n) {
    const slides = document.getElementsByClassName('new-collection-item');
    Object.values(slides).map((item, index) => {
        if (index >= n && index < n + itemsPerSlide) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }   
    });
}