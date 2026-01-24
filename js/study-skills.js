// Study Skills Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== TOGGLE BUTTON FUNCTIONALITY ==========
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current content
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                content.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
            
            // Optional: Close other open sections
            toggleButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('i');
                    otherContent.style.display = 'none';
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                }
            });
        });
    });
    
    // ========== HAMBURGER MENU FUNCTIONALITY ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            hamburger.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                hamburger.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && !event.target.closest('.hamburger')) {
                navMenu.classList.remove('show');
                hamburger.textContent = '☰';
            }
        });
    }
    
    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== CARD HOVER ANIMATION ENHANCEMENT ==========
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ========== AUTO-COLLAPSE AFTER DELAY ==========
    let openTimeout;
    
    toggleButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            clearTimeout(openTimeout);
        });
        
        const content = button.nextElementSibling;
        content.addEventListener('mouseenter', function() {
            clearTimeout(openTimeout);
        });
        
        button.addEventListener('mouseleave', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                openTimeout = setTimeout(() => {
                    content.style.display = 'none';
                    const icon = this.querySelector('i');
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }, 5000); // Auto-collapse after 5 seconds of inactivity
            }
        });
    });
    
    // ========== ADD VISUAL FEEDBACK FOR INTERACTIVE ELEMENTS ==========
    const interactiveElements = document.querySelectorAll('button, a, .method-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
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
    
    // ========== LAZY LOAD IMAGES ==========
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
});