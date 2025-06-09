// Main JavaScript file for the website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Example of a simple function to handle menu interactions
    const menuItems = document.querySelectorAll('nav a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // For demonstration purposes only
            console.log('Menu item clicked:', this.textContent);
            
            // If this is just a demo without actual page navigation
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
});

// Example of lazy loading images (if any were to be added later)
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
}

// Call lazy loading when window is loaded
window.addEventListener('load', lazyLoadImages);