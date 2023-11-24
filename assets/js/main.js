let burger = document.getElementById("burger");
let nav = document.getElementById("nav");

burger.addEventListener("click", function(){
    if (nav.classList.contains("display")) {
        nav.classList.remove("display");
    } else {
        nav.classList.add("display");
    }
});

/*let darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function() {
    let body = document.body;
    let header = document.querySelector('header');
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
});*/

window.addEventListener('DOMContentLoaded', (event) => {
    // Check if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const images = document.querySelectorAll('.lozad');

    // Apply dark mode if it was enabled
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Initialize lozad
    const observer = lozad(images, {
        load: function(el) {
            el.src = document.body.classList.contains('dark-mode') ? el.getAttribute('data-src-dark') : el.getAttribute('data-src');
        },
        loaded: function(el) {
            el.classList.add('faded-in');
        }
    });

    // Start observing images
    observer.observe();

    // Code to switch modes
    const switchButton = document.getElementById('dark-mode-toggle');
    switchButton.addEventListener('click', function() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        // Update image src for current mode and reload lozad
        images.forEach(img => {
            img.src = isDarkMode ? img.getAttribute('data-src-dark') : img.getAttribute('data-src');
            observer.triggerLoad(img);
        });
        // Store mode in localStorage
        localStorage.setItem('darkMode', isDarkMode.toString());
    });
});

