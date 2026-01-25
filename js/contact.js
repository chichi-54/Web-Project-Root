// Contact Page Specific JavaScript
document.addEventListener("DOMContentLoaded", function() {
    console.log("Contact page JS loaded");

    // === Form Submission Handling ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());

            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                try {
                    // Simulate API call
                    await simulateAPICall(formObject);

                    // Show success message
                    showMessage('success', 'Message sent successfully! We\'ll get back to you soon.');

                    // Reset form
                    this.reset();

                } catch (error) {
                    // Show error message
                    showMessage('error', 'Failed to send message. Please try again or email us directly.');
                    console.error('Form submission error:', error);
                } finally {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // === Real-time Form Validation ===
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Clear error state on typing
            if (this.value.trim()) {
                this.style.borderColor = "";
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
    });

    // === Auto-expand textarea ===
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Trigger initial resize
        setTimeout(() => {
            textarea.dispatchEvent(new Event('input'));
        }, 100);
    }

    // === Contact Method Cards Hover Effects ===
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // === Email Copy Functionality ===
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(element => {
        element.addEventListener('click', async function() {
            const email = this.textContent.trim() || this.dataset.email;

            try {
                await navigator.clipboard.writeText(email);

                // Show copied notification
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    animation: fadeInOut 2s ease;
                `;

                document.body.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.remove();
                }, 2000);

            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        });
    });

    // === Validation Functions ===
    function validateForm(data) {
        let isValid = true;

        // Required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'message', 'usertype', 'reason'];
        requiredFields.forEach(field => {
            if (!data[field]?.trim()) {
                const fieldElement = document.getElementById(field) || document.querySelector(`[name="${field}"]`);
                if (fieldElement) {
                    markInvalid(fieldElement);
                    showFieldError(field, 'This field is required');
                }
                isValid = false;
            }
        });

        // Email format validation
        if (data.email && !isValidEmail(data.email)) {
            const emailField = document.getElementById('email');
            markInvalid(emailField);
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;

        // Clear previous errors
        field.style.borderColor = "";
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Required validation
        if (field.hasAttribute('required') && !value) {
            markInvalid(field);
            showFieldError(fieldName, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email' && value && !isValidEmail(value)) {
            markInvalid(field);
            showFieldError(fieldName, 'Please enter a valid email address');
            return false;
        }

        return true;
    }

    function markInvalid(field) {
        field.style.borderColor = '#ff4757';
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        field.focus();
    }

    function showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = `
                color: #ff4757;
                font-size: 0.85rem;
                margin-top: 5px;
                display: block;
            `;
            field.parentElement.appendChild(errorDiv);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // === Message Display Function ===
    function showMessage(type, text) {
        // Remove existing messages
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.cssText = `
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
            text-align: center;
            animation: slideDown 0.3s ease;
        `;

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }
        
        messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> <span style="margin-left: 10px;">${text}</span>`;
        
        // Insert after form or at top of form section
        const form = document.querySelector('#contactForm');
        if (form) {
            form.insertBefore(messageDiv, form.firstChild);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                messageDiv.style.transform = 'translateY(-10px)';
                messageDiv.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }, 5000);
        }
    }

    // === Simulate API Call ===
    function simulateAPICall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 90% chance of success for simulation
                if (Math.random() < 0.9) {
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }

    // === Add CSS animations ===
    const contactStyle = document.createElement('style');
    contactStyle.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .form-message {
            font-size: 1rem;
        }
        
        .fa-spin {
            margin-right: 8px;
        }
        
        .contact-card {
            transition: all 0.3s ease !important;
        }
        
        .contact-card:hover {
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15) !important;
        }
        
        @media (max-width: 768px) {
            .form-message {
                margin: 10px 0;
                padding: 15px;
            }
        }
    `;
    document.head.appendChild(contactStyle);
});