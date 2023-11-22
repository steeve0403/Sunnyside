let burger = document.getElementById("burger");
let nav = document.getElementById("nav");

burger.addEventListener("click", function(){
    if (nav.classList.contains("display")) {
        nav.classList.remove("display");
    } else {
        nav.classList.add("display");
    }
});
function toggleDarkMode() {
    let body = document.body;
    let header = document.querySelector('header');

    // Basculez entre les classes pour activer/désactiver le mode sombre
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
}