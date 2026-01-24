document.addEventListener("DOMContentLoaded", () => {
    // Breathing Guide
    const circle = document.getElementById("breathing-circle");
    const breathingText = document.getElementById("breathing-text");
    
    let inhale = true;
    let breathingInterval = setInterval(() => {
        if (inhale) {
            circle.style.transform = "scale(1.4)";
            breathingText.textContent = "Breathe In...";
            breathingText.style.color = "#0077ff";
        } else {
            circle.style.transform = "scale(1)";
            breathingText.textContent = "Breathe Out...";
            breathingText.style.color = "#f97316";
        }
        inhale = !inhale;
    }, 4000);

    // Timer
    const timerDisplay = document.getElementById("timer-display");
    const startButton = document.getElementById("start-timer");
    const timerMessage = document.getElementById("timer-message");
    const progressFill = document.getElementById("progress-fill");
    
    let timerInterval;
    let isRunning = false;

    startButton.addEventListener("click", () => {
        if (isRunning) return;
        
        isRunning = true;
        startButton.disabled = true;
        startButton.textContent = "Running...";
        startButton.style.opacity = "0.7";
        timerMessage.textContent = "Focus on relaxing...";
        progressFill.style.width = "0%";
        
        let time = 120; // 2 minutes
        const totalTime = time;
        
        timerInterval = setInterval(() => {
            let minutes = String(Math.floor(time / 60)).padStart(2, "0");
            let seconds = String(time % 60).padStart(2, "0");
            timerDisplay.textContent = `${minutes}:${seconds}`;
            
            // Update progress bar
            let progress = ((totalTime - time) / totalTime) * 100;
            progressFill.style.width = `${progress}%`;
            
            time--;
            
            // Color change based on time
            if (time < 30) {
                timerDisplay.style.color = "#f97316";
            }
            
            if (time < 0) {
                clearInterval(timerInterval);
                timerMessage.textContent = "🎉 Time's up! Great job relaxing!";
                timerDisplay.style.color = "#0077ff";
                progressFill.style.width = "100%";
                
                // Animation effects
                circle.style.animation = "bounce 1s, pulse 2s infinite";
                circle.style.backgroundColor = "#f9f871";
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    startButton.disabled = false;
                    startButton.textContent = "Start Again";
                    startButton.style.opacity = "1";
                    circle.style.animation = "";
                    circle.style.backgroundColor = "#ffcc99";
                    timerDisplay.style.color = "#f97316";
                    isRunning = false;
                }, 3000);
            }
        }, 1000);
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            hamburger.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
                navMenu.classList.remove('show');
                hamburger.textContent = '☰';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                hamburger.textContent = '☰';
            });
        });
    }

    // Add touch support for mobile
    document.addEventListener('touchstart', function() {}, {passive: true});
});