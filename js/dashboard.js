/*document.addEventListener("DOMContentLoaded", () => {
    const circle = document.getElementById("progressCircle");
    const percent = 67;

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
});*/

const slider = document.getElementById("moodSlider");
const emojis = document.querySelectorAll(".emoji");
const label = document.querySelector(".emotion-label");

slider.addEventListener("input", () => {
    const value = slider.value;

    emojis.forEach((emoji, i) => {
        if (i + 1 === parseInt(value)) {
            emoji.style.transform = "scale(1.5)";
        } else {
            emoji.style.transform = "scale(1)";
        }
    });

    // Update label text based on value
    const labels = ["Feeling down 😔", "Meh 😐", "Feeling good 😊", "Great 😄", "Fantastic 🌟"];
    label.textContent = labels[value - 1];
});
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

