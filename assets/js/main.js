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
    const overlay = document.querySelector('#overlay');

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
        // Show the overlay
        overlay.style.display = 'block';

        // Start the fade in animation
        setTimeout(() => { overlay.style.opacity = 1 }, 0);

        setTimeout(() => {
            const isDarkMode = document.body.classList.toggle('dark-mode');

            // Update image src for the current mode and reload lozad
            images.forEach(img => {
                img.src = isDarkMode ? img.getAttribute('data-src-dark') : img.getAttribute('data-src');
                observer.triggerLoad(img);
            });

// Store mode

            let points;
            let stepsPerFrame;

            function setup() {
                stepsPerFrame = 5;
                createCanvas(windowWidth, windowHeight);
                noFill();
                strokeWeight(3);
                reset();
            }

            function draw() {
                for (let i = 0; i < stepsPerFrame; i++) {
                    stroke(0, 255 - i * 255 / stepsPerFrame);
                    drawLine();
                }
            }

            function reset() {
                background("white");
                resetPoints();
            }

            function resetPoints() {
                points = [];
                for (let i = 0; i < windowWidth; i++) {
                    points.push([i, 0]);
                }
            }

            function drawLine() {
                beginShape();
                let atLeastOneOnScreen = false;
                points.forEach(p => {
                    vertex(p[0], p[1]);
                    p[1] += noise(frameCount / 100 + p[0] / 25);
                    if (p[1] < windowHeight * 1.1) {
                        atLeastOneOnScreen = true;
                    }
                });
                endShape();

                if (!atLeastOneOnScreen) {
                    reset();
                }
            }

            function windowResized() {
                resizeCanvas(windowWidth, windowHeight);
            }
