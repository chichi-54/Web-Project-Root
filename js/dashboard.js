document.addEventListener("DOMContentLoaded", () => {
    const circle = document.getElementById("progressCircle");
    const percent = 67;

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
});
