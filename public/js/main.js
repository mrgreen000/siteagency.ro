// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links and set active state on click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Remove active from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active to clicked link (both desktop and mobile versions)
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                    console.log('Clicked nav link, added active class to:', this);

                    // Find and activate the corresponding link in mobile menu
                    const href = this.getAttribute('href');
                    document.querySelectorAll(`.nav-link[href="${href}"]`).forEach(link => {
                        link.classList.add('active');
                    });
                }

                const headerOffset = 150;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                // Update navigation after scrolling completes (with longer delay)
                setTimeout(updateNavigation, 800);
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !message) {
                alert('Te rugăm să completezi toate câmpurile.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Te rugăm să introduci o adresă de email validă.');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Se trimite...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Mulțumim! Mesajul tău a fost trimis. Te vom contacta în curând.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Function to update navigation active state based on scroll position
    function updateNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0) {
            return; // No sections on this page
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

        // If we're at the very top, set home as current
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
                console.log('Activated:', linkSection);
            }
        });
    }

    // Debounced scroll handler for better performance
    let scrollTimer = null;
    let isScrollingProgrammatically = false;

    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            updateNavigation();
        }, 150);
    });

    // Run on page load
    window.addEventListener('load', function() {
        setTimeout(updateNavigation, 300);
    });

    // Run immediately as well
    setTimeout(updateNavigation, 100);

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    document.querySelectorAll('.portfolio-item, .service-card, .pricing-card, .premium-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Removed premium hover effects - handled by CSS now

    // Scroll-triggered animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special animations for different elements
                if (entry.target.classList.contains('animate-fade-in-up')) {
                    entry.target.style.animationDelay = '0.1s';
                }

                if (entry.target.classList.contains('animate-scale-in')) {
                    entry.target.style.animationDelay = '0.3s';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in, .animate-rotate-in').forEach(el => {
        animateOnScroll.observe(el);
    });

    // Removed number counting animation - too distracting

    // CTA button click tracking (for analytics)
    document.querySelectorAll('a[href="#contact"], button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('CTA clicked:', buttonText);
            // Add analytics tracking here if needed
        });
    });

    // Phone number formatting (Romanian format)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('40')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+40' + value.substring(1);
            } else if (!value.startsWith('+40') && value.length > 0) {
                value = '+40' + value;
            }
            e.target.value = value;
        });
    }

});

// WhatsApp link with pre-filled message
function openWhatsApp() {
    const message = encodeURIComponent('Salut! Sunt interesat de serviciile voastre de web design și marketing digital. Aș dori să discutăm despre un proiect.');
    const whatsappURL = `https://wa.me/40721123456?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Add click event to WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });
});

// Cookie Bar Functions
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookieBar = document.getElementById('cookie-bar');

    if (!cookieConsent && cookieBar) {
        // Show cookie bar if no consent is stored
        cookieBar.style.display = 'block';
    } else if (cookieBar) {
        // Hide cookie bar if consent exists
        cookieBar.style.display = 'none';
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBar();
    // Here you can enable analytics, marketing cookies, etc.
    console.log('All cookies accepted');
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'essential');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBar();
    // Here you can disable non-essential cookies
    console.log('Only essential cookies accepted');
}

function closeCookieBar() {
    // Just hide the bar without saving preference (will show again on next visit)
    hideCookieBar();
}

function hideCookieBar() {
    const cookieBar = document.getElementById('cookie-bar');
    if (cookieBar) {
        cookieBar.style.transform = 'translateY(100%)';
        setTimeout(() => {
            cookieBar.style.display = 'none';
        }, 300);
    }
}

// Check cookie consent on page load
document.addEventListener('DOMContentLoaded', function() {
    checkCookieConsent();
});