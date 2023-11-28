let burger = document.getElementById("burger");
let nav = document.getElementById("nav");

burger.addEventListener("click", function(){
    if (nav.classList.contains("display")) {
        nav.classList.remove("display");
    } else {
        nav.classList.add("display");
    }
});

/*
let darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function() {
    let body = document.body;
    let header = document.querySelector('header');
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
});
*/
window.addEventListener('DOMContentLoaded', (event) => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const images = document.querySelectorAll('.lozad');
    const overlay = document.getElementById('overlay');
    const loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    const observer = lozad(images, {
        load: function(el) {
            el.src = document.body.classList.contains('dark-mode') ? el.getAttribute('data-src-dark') : el.getAttribute('data-src');
        },
        loaded: function(el) {
            el.classList.add('faded-in');
        }
    });

    observer.observe();

    const switchButton = document.getElementById('dark-mode-toggle');
    switchButton.addEventListener('click', function() {
        showLoader();

        setTimeout(() => {
            hideLoader();
            const isDarkMode = document.body.classList.toggle('dark-mode');
            updateImages(isDarkMode);
            localStorage.setItem('darkMode', isDarkMode.toString());
        }, 1000);
    });

    function showLoader() {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        loader.style.opacity = '1';
        loader.style.visibility = 'visible';
    }

    function hideLoader() {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }

    function updateImages(isDarkMode) {
        images.forEach(img => {
            img.src = isDarkMode ? img.getAttribute('data-src-dark') : img.getAttribute('data-src');
            observer.triggerLoad(img);
        });
    }
});


