const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        content.style.display =
            content.style.display === "block" ? "none" : "block";
    });
});

// Optional: Close other sections when one is opened
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(otherBtn => {
            if (otherBtn !== btn) {
                const otherContent = otherBtn.nextElementSibling;
                otherContent.style.display = "none";
            }
        });
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar ul');
hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('show');
});
