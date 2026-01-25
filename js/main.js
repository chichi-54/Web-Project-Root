// FAQ Page Specific JavaScript
document.addEventListener("DOMContentLoaded", function() {
    console.log("FAQ page JS loaded");
    
    // === FAQ Accordion Functionality ===
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach((question, index) => {
            // Add data attribute for filtering
            const category = question.closest('.faq-item').dataset.category || 'general';
            question.closest('.faq-item').setAttribute('data-category', category);
            
            // Add toggle icon if not present
            if (!question.querySelector('.toggle-icon')) {
                const icon = document.createElement('span');
                icon.className = 'toggle-icon';
                icon.textContent = '+';
                icon.style.cssText = `
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    transition: transform 0.3s ease;
                    margin-left: 10px;
                `;
                question.appendChild(icon);
            }
            
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                
                // Toggle current
                answer.classList.toggle('active');
                
                // Animate icon
                if (answer.classList.contains('active')) {
                    icon.textContent = '−';
                    icon.style.transform = 'rotate(180deg)';
                    
                    // Auto-scroll to question if it's partially off-screen
                    const questionRect = this.getBoundingClientRect();
                    if (questionRect.top < 100 || questionRect.bottom > window.innerHeight - 100) {
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    icon.textContent = '+';
                    icon.style.transform = 'rotate(0deg)';
                }
                
                // Optional: Close other FAQs when opening one
                // faqQuestions.forEach((otherQ, otherIndex) => {
                //     if (otherIndex !== index) {
                //         const otherAnswer = otherQ.nextElementSibling;
                //         const otherIcon = otherQ.querySelector('.toggle-icon');
                //         otherAnswer.classList.remove('active');
                //         otherIcon.textContent = '+';
                //         otherIcon.style.transform = 'rotate(0deg)';
                //     }
                // });
            });
            
            // Open first FAQ by default
            if (index === 0) {
                question.click();
            }
        });
    }
    
    // === FAQ Search Functionality ===
    const searchInput = document.querySelector('.faq-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            let visibleCount = 0;
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (searchTerm === '' || question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    visibleCount++;
                    
                    // Highlight matching text
                    if (searchTerm) {
                        highlightText(item, searchTerm);
                    } else {
                        removeHighlights(item);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show "no results" message
            let noResults = document.querySelector('.no-results');
            if (visibleCount === 0 && searchTerm) {
                if (!noResults) {
                    noResults = document.createElement('div');
                    noResults.className = 'no-results';
                    noResults.style.cssText = `
                        text-align: center;
                        padding: 40px;
                        color: #666;
                        font-size: 1.1rem;
                        background: #f8f9fa;
                        border-radius: 10px;
                        margin: 20px 0;
                    `;
                    noResults.innerHTML = `
                        <p>No FAQs found for "<strong>${searchTerm}</strong>"</p>
                        <p style="margin-top: 10px; font-size: 0.9rem;">Try different keywords or browse by category.</p>
                    `;
                    document.querySelector('.faq-container').appendChild(noResults);
                }
            } else if (noResults) {
                noResults.remove();
            }
        });
        
        // Clear search on Escape
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // === FAQ Category Filter ===
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                const faqItems = document.querySelectorAll('.faq-item');
                let visibleCount = 0;
                
                faqItems.forEach(item => {
                    const itemCategory = item.dataset.category;
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Clear search if active
                if (searchInput) {
                    searchInput.value = '';
                }
                
                // Scroll to FAQ section
                document.querySelector('.faq-container').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });
        });
    }
    
    // === Helper Functions ===
    function highlightText(element, searchTerm) {
        removeHighlights(element);
        
        const textNodes = getTextNodes(element);
        textNodes.forEach(node => {
            const text = node.textContent;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const highlighted = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            
            if (highlighted !== text) {
                const span = document.createElement('span');
                span.innerHTML = highlighted;
                node.parentNode.replaceChild(span, node);
            }
        });
    }
    
    function removeHighlights(element) {
        const highlights = element.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            while (highlight.firstChild) {
                parent.insertBefore(highlight.firstChild, highlight);
            }
            parent.removeChild(highlight);
            parent.normalize();
        });
    }
    
    function getTextNodes(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        return textNodes;
    }
    
    // === Add CSS for FAQ features ===
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s ease;
            padding: 0 20px;
        }
        
        .faq-answer.active {
            max-height: 1000px;
            padding: 20px;
        }
        
        .search-highlight {
            background-color: #fff3cd;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: bold;
            color: #856404;
        }
        
        .faq-item {
            margin-bottom: 15px;
            transition: all 0.3s ease;
        }
        
        .category-btn {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .category-btn:hover {
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .faq-question {
                font-size: 1.1rem;
                padding: 20px;
            }
            
            .faq-answer {
                font-size: 0.95rem;
            }
        }
    `;
    document.head.appendChild(faqStyle);
});