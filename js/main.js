document.addEventListener("DOMContentLoaded", function () {
    // === Hamburger menu toggle ===
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar ul");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });

        // Close menu when clicking a link (optional, nice UX)
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
            });
        });
    }

    // === User type / grade visibility (keep your existing code) ===
    const userType = document.getElementById("usertype");
    const gradeField = document.getElementById("grade");

    if (userType && gradeField) {
        function updateGradeVisibility() {
            if (userType.value === "highschool") {
                gradeField.parentElement.style.display = "block";
            } else {
                gradeField.parentElement.style.display = "none";
                gradeField.value = "";
            }
        }
        userType.addEventListener("change", updateGradeVisibility);
        updateGradeVisibility();
    }

    // ========== PROGRESS INDICATOR FOR SCROLL ==========
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #007bff, #00b4ff);
            width: 0%;
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Create scroll progress bar
    createScrollProgress();
});
