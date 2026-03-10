/* =========================================================================
   Smart School Bell System - Main JavaScript
   Handles Mobile Navigation, Dropdowns, FAQs, and Interactivity
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation Toggle --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle Icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* --- Mobile Dropdown Handling --- */
    // Prevent default linking on mobile if clicking the dropdown parent
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    /* --- Close Menu on Click Outside (Mobile) --- */
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    /* --- FAQ Accordion --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                // Toggle current item active state to rotate the chevron arrow
                item.classList.toggle('active');
            });
        }
    });

    /* --- Lazy Loading Animations (Simple Intersection Observer) --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation starting state to elements you want to animate later via adding classes in HTML if needed.
    // E.g., .fade-in-up class.
    const animatableElements = document.querySelectorAll('.feature-card, .product-card, .timeline-item');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

});
