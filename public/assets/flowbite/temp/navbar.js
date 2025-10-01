function toggleStickyNavbar() {
    if (window.scrollY > 0) {
        navbar.setAttribute('data-sticky', 'true');
    } else {
        navbar.setAttribute('data-sticky', 'false');
    }
}

const navbar = document.querySelector("#mainNavbar");

toggleStickyNavbar();
window.addEventListener("scroll", function () {
    toggleStickyNavbar();
});
