/*document.addEventListener("DOMContentLoaded", () => {
    const circle = document.getElementById("progressCircle");
    const percent = 67;

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
});

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

*/
document.addEventListener("DOMContentLoaded", () => {
    // Mood Slider with Emoji Interaction
    const slider = document.getElementById("moodSlider");
    const emojis = document.querySelectorAll(".emoji");
    const label = document.querySelector(".emotion-label");
    const historyList = document.getElementById("historyList");
    
    // Mood data with descriptions
    const moodData = [
        { emoji: "😔", label: "Feeling down", color: "#ff6b6b", message: "It's okay to have tough days. Try our stress relief tools." },
        { emoji: "😐", label: "Meh", color: "#ffd93d", message: "A neutral day. Maybe try something new?" },
        { emoji: "😊", label: "Feeling good", color: "#6bcf7f", message: "Great! Keep up the positive energy!" },
        { emoji: "😄", label: "Great", color: "#4d96ff", message: "Fantastic! Your energy is contagious!" },
        { emoji: "🌟", label: "Fantastic", color: "#9d4edd", message: "Amazing! You're shining bright today!" }
    ];
    
    // Initialize mood
    updateMood(3); // Default to "Feeling good"
    
    // Slider change event
    slider.addEventListener("input", (e) => {
        updateMood(e.target.value);
    });
    
    // Emoji click events
    emojis.forEach((emoji, index) => {
        emoji.addEventListener("click", () => {
            slider.value = index + 1;
            updateMood(index + 1);
        });
    });
    
    function updateMood(value) {
        const moodIndex = value - 1;
        const mood = moodData[moodIndex];
        
        // Update emojis
        emojis.forEach((emoji, i) => {
            if (i === moodIndex) {
                emoji.classList.add("active");
                emoji.style.transform = "scale(1.5)";
            } else {
                emoji.classList.remove("active");
                emoji.style.transform = "scale(1)";
            }
        });
        
        // Update label with color
        label.innerHTML = `<span style="color: ${mood.color}; font-weight: 600">${mood.label}</span> - ${mood.message}`;
        
        // Save to history
        saveMoodToHistory(mood);
        
        // Update slider color
        updateSliderColor(value);
    }
    
    function updateSliderColor(value) {
        const percent = ((value - 1) / 4) * 100;
        slider.style.background = `linear-gradient(90deg, #ff6b6b ${percent}%, #ffd93d ${percent}%, #6bcf7f ${percent}%, #4d96ff ${percent}%, #9d4edd ${percent}%)`;
    }
    
    function saveMoodToHistory(mood) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString();
        
        const historyItem = document.createElement("li");
        historyItem.className = "history-item";
        historyItem.innerHTML = `
            <strong>${mood.emoji} ${mood.label}</strong>
            <small style="color: #666; margin-left: 10px;">${dateString} ${timeString}</small>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #777">${mood.message}</p>
        `;
        
        // Add to beginning of list
        historyList.insertBefore(historyItem, historyList.firstChild);
        
        // Keep only last 5 entries
        if (historyList.children.length > 5) {
            historyList.removeChild(historyList.lastChild);
        }
    }
    
    // Task List Interactions
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskText = this.parentElement.querySelector('.task-text');
            if (this.checked) {
                taskText.classList.add('completed');
                
                // Add celebration for completing all tasks
                const remainingTasks = document.querySelectorAll('.task-item input[type="checkbox"]:not(:checked)').length;
                if (remainingTasks === 0) {
                    showConfetti();
                }
            } else {
                taskText.classList.remove('completed');
            }
        });
    });
    
    // Join Button Animations
    const joinButtons = document.querySelectorAll('.join-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Joined!';
                this.style.background = 'linear-gradient(135deg, #6bcf7f, #4CAF50)';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.style.transform = '';
                    if (this.classList.contains('primary')) {
                        this.innerHTML = '<i class="fas fa-plus-circle"></i> Create Session';
                    } else if (this.textContent.includes('RSVP')) {
                        this.innerHTML = '<i class="fas fa-calendar-plus"></i> RSVP';
                    } else {
                        this.innerHTML = '<i class="fas fa-video"></i> Join Now';
                    }
                    this.style.background = 'linear-gradient(135deg, var(--blue-dark), #4d96ff)';
                }, 2000);
            }, 1000);
        });
    });
    
    // Tool Button Interactions
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('onclick')) {
                e.preventDefault();
                
                // Visual feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.style.pointerEvents = 'none';
                
                // Simulate loading
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                    
                    // Show notification
                    showNotification(`Opening ${this.querySelector('span').textContent}...`);
                }, 800);
            }
        });
    });
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--blue-dark);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Confetti effect for task completion
    function showConfetti() {
        const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#9d4edd'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}vw;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: fall ${1 + Math.random() * 2}s linear forwards;
                z-index: 9999;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(${360 * Math.random()}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Hamburger menu functionality (keep your existing)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar ul");
    
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
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
});