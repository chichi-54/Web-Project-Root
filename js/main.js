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
});
