
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("active");
    });

});
// ================== RESPONSIVE NAVIGATION ==================//
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar ul");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show"); // toggles menu
        });
        // Optional: close menu when clicking a link
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => navMenu.classList.remove("show"));
        });
    }
});
