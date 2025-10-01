// Agency Website App JavaScript
// Handles mobile menu, smooth scrolling, and form interactions

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for anchor links with active state management
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Remove active from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active to clicked link and its counterparts
                if (this.classList.contains('nav-link')) {
                    const href = this.getAttribute('href');
                    document.querySelectorAll(`.nav-link[href="${href}"]`).forEach(link => {
                        link.classList.add('active');
                    });
                    console.log('Menu clicked:', href, '- Active class added');
                }

                // Calculate offset for sticky header (offer bar + nav = ~112px)
                const headerOffset = 112;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Se trimite...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Mesajul a fost trimis cu succes! Vă vom contacta în curând.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Pricing card click handlers
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation highlighting based on scroll position
    function updateNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0) {
            return;
        }

        const scrollPosition = window.scrollY + 250;
        let currentSection = '';

        // Find which section we're currently in
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // If at the very top, set home as current
        if (window.scrollY < 300) {
            currentSection = 'home';
        }

        console.log('Current section:', currentSection);

        // Update navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Skip links to other pages
            if (!href || href.includes('.html') || !href.startsWith('#')) {
                return;
            }

            // Remove active class
            link.classList.remove('active');

            // Add active class if this link matches current section
            const linkSection = href.replace('#', '');
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Debounced scroll handler
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            updateNavigation();
        }, 150);
    });

    // Initialize navigation on page load
    setTimeout(updateNavigation, 300);

    // Cookie consent (simple implementation)
    const cookieBar = document.getElementById('cookie-bar');

    // Check if cookie preference is already set
    const cookiesAccepted = localStorage.getItem('cookies-accepted');

    if (cookieBar) {
        // Show cookie bar if no preference is set
        if (cookiesAccepted === null) {
            cookieBar.style.display = 'flex';
        } else {
            cookieBar.style.display = 'none';
        }

        const acceptButton = document.getElementById('accept-cookies');
        const rejectButton = document.getElementById('reject-cookies');

        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                localStorage.setItem('cookies-accepted', 'true');
                cookieBar.style.display = 'none';
                console.log('Cookies accepted');
            });
        }

        if (rejectButton) {
            rejectButton.addEventListener('click', function() {
                localStorage.setItem('cookies-accepted', 'false');
                cookieBar.style.display = 'none';
                console.log('Only essential cookies');
            });
        }
    }
});

// Handle Flowbite theme toggle errors gracefully
window.addEventListener('error', function(e) {
    if (e.message.includes('themeToggleDarkIcon') || e.message.includes('themeToggleLightIcon')) {
        console.log('Theme toggle elements not found - this is expected for this design');
        e.preventDefault();
        return true;
    }
});

// Disable Flowbite dark mode functionality since we don't use it
if (typeof window !== 'undefined') {
    // Override the dark mode functions to prevent errors
    window.toggleDarkMode = function() {
        console.log('Dark mode not implemented in this design');
    };

    // Helper function to reset cookie consent (for testing)
    // Can be called from console: resetCookieConsent()
    window.resetCookieConsent = function() {
        localStorage.removeItem('cookies-accepted');
        location.reload();
    };

    // FAQ Toggle Function
    window.toggleFAQ = function(button) {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('i');

        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
                item.classList.add('hidden');
            }
        });

        document.querySelectorAll('.faq-question i').forEach(item => {
            if (item !== icon) {
                item.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current FAQ
        answer.classList.toggle('hidden');

        if (answer.classList.contains('hidden')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    };
}