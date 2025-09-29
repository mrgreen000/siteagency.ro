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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
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

    // Add active state to navigation based on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

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

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-20 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 z-40 opacity-0 invisible';
    scrollToTopBtn.id = 'scrollToTop';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });
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