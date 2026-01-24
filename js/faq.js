
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {
        item.classList.toggle("active");
    });

});

    // Mobile menu toggle
    document.addEventListener('DOMContentLoaded', function() {
        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');
        
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                navbar.classList.toggle('show');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.navbar') && !event.target.closest('.hamburger')) {
                    navbar.classList.remove('show');
                }
            });
            
            // Close menu when clicking a link
            const navLinks = document.querySelectorAll('.navbar a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbar.classList.remove('show');
                });
            });
        }
    });
