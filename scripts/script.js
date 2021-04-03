let slideIndex = 0;
const totalSlidesAmount = document.getElementsByClassName('new-collection-item').length;


function getItemsPerSlide() {
    return window.innerWidth > 1024 ? 3 : 2;
}

function moveLeft() {
    if (slideIndex > 0) {
        slideIndex -= 1;
        showSlides(slideIndex);
    }
}


function moveRight() {
    if (slideIndex < totalSlidesAmount - getItemsPerSlide()) {
        slideIndex += 1;
        showSlides(slideIndex);
    }
}


function showSlides(n) {
    const itemsPerSlide = getItemsPerSlide();
    console.log(itemsPerSlide);
    const slides = document.getElementsByClassName('new-collection-item');
    Object.values(slides).map((item, index) => {
        if (index >= n && index < n + itemsPerSlide) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


window.addEventListener('resize', () => {
    slideIndex = 0;
    showSlides(slideIndex);
});