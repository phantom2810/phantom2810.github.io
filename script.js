// Modern Portfolio JavaScript - GitHub Pages Compatible

class PortfolioApp {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        this.setupLoader();
        this.setupTheme();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.updateYear();
    }

    // Loading Screen
    setupLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
                // Start animations after loader
                this.triggerAnimations();
            }, 1000);
        });
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);

        themeToggle?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Navigation
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            this.toggleHamburger(navToggle);
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                this.resetHamburger(navToggle);
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        });
    }

    toggleHamburger(button) {
        const spans = button.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }

    resetHamburger(button) {
        const spans = button.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Scroll Effects
    setupScrollEffects() {
        this.setupActiveNavigation();
        this.setupScrollAnimations();
        this.setupScrollToTop();
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.section-header, .about-content, .experience-item, .project-card, .contact-content'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        
        // Add styles
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background-color: var(--color-primary);
            color: var(--color-background);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(scrollToTopBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animations
    setupAnimations() {
        this.setupTypewriter();
        this.setupParallax();
    }

    setupTypewriter() {
        const text = "AI Researcher & ML Engineer";
        const element = document.querySelector('.hero-title');
        
        if (element) {
            element.innerHTML = '';
            let index = 0;
            
            const typeWriter = () => {
                if (index < text.length) {
                    element.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Add blinking cursor
                    element.innerHTML += '<span class="cursor">|</span>';
                    this.animateCursor();
                }
            };
            
            setTimeout(typeWriter, 1500);
        }
    }

    animateCursor() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.cssText = `
                animation: blink 1s infinite;
            `;
            
            // Add blink animation to CSS
            if (!document.querySelector('#cursor-style')) {
                const style = document.createElement('style');
                style.id = 'cursor-style';
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    setupParallax() {
        const shapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.2;
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    triggerAnimations() {
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-description, .hero-actions');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 200);
        });
    }

    updateYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Project Interactions
class ProjectInteractions {
    constructor() {
        this.setupProjectHovers();
        this.setupProjectModals();
    }

    setupProjectHovers() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupProjectModals() {
        // Add click handlers for project links
        const projectLinks = document.querySelectorAll('.project-link');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow the default link behavior to work (navigate to GitHub)
                // Add any additional tracking or animations if needed
                console.log('Project link clicked:', link.closest('.project-card').querySelector('h3').textContent);
                
                // Add a subtle click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        });
    }
}

// Contact Form Enhancement
class ContactEnhancement {
    constructor() {
        this.setupEmailAnimation();
    }

    setupEmailAnimation() {
        const emailBtn = document.querySelector('a[href^="mailto:"]');
        
        if (emailBtn) {
            emailBtn.addEventListener('click', () => {
                // Add a subtle animation when email is clicked
                emailBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    emailBtn.style.transform = 'scale(1)';
                }, 150);
            });
        }
    }
}

// Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.setupLazyLoading();
        this.setupPreloadCriticalResources();
    }

    setupLazyLoading() {
        // Implement lazy loading for images when you add them
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupPreloadCriticalResources() {
        // Preload critical fonts and resources
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);
    }
}

// Accessibility Enhancements
class AccessibilityEnhancer {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.querySelector('.portfolio-app').resetHamburger(navToggle);
                }
            }
        });
    }

    setupAriaLabels() {
        // Ensure all interactive elements have proper aria labels
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (button.id === 'theme-toggle') {
                button.setAttribute('aria-label', 'Toggle dark/light theme');
            }
        });
    }

    setupFocusManagement() {
        // Improved focus management for better accessibility
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--color-primary)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    window.portfolioApp = new PortfolioApp();
    
    // Initialize additional features
    new ProjectInteractions();
    new ContactEnhancement();
    new PerformanceOptimizer();
    new AccessibilityEnhancer();
    
    console.log('🚀 Portfolio loaded successfully!');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
