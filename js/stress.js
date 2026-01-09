document.addEventListener("DOMContentLoaded", () => {
    // Breathing Guide
    const circle = document.getElementById("breathing-circle");
    const breathingText = document.getElementById("breathing-text");

    let inhale = true;
    setInterval(() => {
        if (inhale) {
            circle.style.transform = "scale(1.5)";
            breathingText.textContent = "Inhale...";
        } else {
            circle.style.transform = "scale(1)";
            breathingText.textContent = "Exhale...";
        }
        inhale = !inhale;
    }, 4000);

    // Timer
    const timerDisplay = document.getElementById("timer-display");
    const startButton = document.getElementById("start-timer");
    const timerMessage = document.getElementById("timer-message");

    startButton.addEventListener("click", () => {
        let time = 120; // 2 minutes
        timerMessage.textContent = "";
        const interval = setInterval(() => {
            let minutes = String(Math.floor(time / 60)).padStart(2, "0");
            let seconds = String(time % 60).padStart(2, "0");
            timerDisplay.textContent = `${minutes}:${seconds}`;
            time--;

            if (time < 0) {
                clearInterval(interval);
                timerMessage.textContent = "Time's up! Great job relaxing! 🎉";

                // Fun twist: bounce and flash
                circle.style.animation = "bounce 1s";
                circle.style.backgroundColor = "#f9f871";

                setTimeout(() => {
                    circle.style.animation = "";
                    circle.style.backgroundColor = "#ffcc99";
                }, 1000);
            }
        }, 1000);
    });
});
