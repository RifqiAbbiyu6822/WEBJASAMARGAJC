// Enhanced Professional JJC Website JavaScript

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ============================================================================
// LOADING ANIMATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
    `;
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);
    });
});

// ============================================================================
// ENHANCED NAVBAR SCROLL EFFECTS - FIXED STICKY
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class with smooth animation
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Keep header always visible (sticky)
        header.style.transform = 'translateY(0)';
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Ensure header is visible on page load
    header.style.transform = 'translateY(0)';
});

// ============================================================================
// ENHANCED MOBILE MENU
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const createMobileMenu = () => {
        const navMenu = document.querySelector('.nav-menu');
        const header = document.querySelector('.header');
        
        if (!navMenu || !header) return;
        
        // Create hamburger menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Add hamburger styles
        const hamburgerStyles = document.createElement('style');
        hamburgerStyles.textContent = `
            .mobile-menu-btn {
                display: none;
                flex-direction: column;
                gap: 4px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 12px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                z-index: 1001;
            }

            .hamburger-line {
                width: 20px;
                height: 2px;
                background: white;
                border-radius: 1px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                transform-origin: center;
            }

            .mobile-menu-btn.active .hamburger-line:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }

            .mobile-menu-btn.active .hamburger-line:nth-child(2) {
                opacity: 0;
                transform: scaleX(0);
            }

            .mobile-menu-btn.active .hamburger-line:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }

            .mobile-menu-btn:hover {
                background: rgba(251, 191, 36, 0.2);
                border-color: rgba(251, 191, 36, 0.3);
                transform: scale(1.05);
            }

            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: flex;
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                
                .nav-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(30, 58, 138, 0.98);
                    backdrop-filter: blur(20px);
                    flex-direction: column;
                    padding: 2rem;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                    border-radius: 0 0 12px 12px;
                    animation: slideDownMenu 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    gap: 1rem;
                    margin-top: 0.5rem;
                    max-height: 0;
                    overflow: hidden;
                    opacity: 0;
                }
                
                .nav-menu.active {
                    display: flex;
                    max-height: 500px;
                    opacity: 1;
                }
                
                .nav-menu a {
                    opacity: 0;
                    transform: translateY(-20px);
                    animation: fadeInMenuItem 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .nav-menu.active a:nth-child(1) { animation-delay: 0.1s; }
                .nav-menu.active a:nth-child(2) { animation-delay: 0.2s; }
                .nav-menu.active a:nth-child(3) { animation-delay: 0.3s; }
                .nav-menu.active a:nth-child(4) { animation-delay: 0.4s; }
                .nav-menu.active a:nth-child(5) { animation-delay: 0.5s; }
            }

            @keyframes slideDownMenu {
                from {
                    transform: translateY(-20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes fadeInMenuItem {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(hamburgerStyles);
        
        // Insert mobile menu button
        const logo = document.querySelector('.logo');
        if (logo && navMenu) {
            logo.parentNode.insertBefore(mobileMenuBtn, navMenu);
            
            // Toggle menu functionality
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = mobileMenuBtn.classList.contains('active');
                
                mobileMenuBtn.classList.toggle('active');
                navMenu.classList.toggle('active');
                mobileMenuBtn.setAttribute('aria-expanded', !isActive);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isActive ? '' : 'hidden';
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!header.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking on menu items
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }
    };
    
    createMobileMenu();
});

// ============================================================================
// ENHANCED SMOOTH SCROLLING
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Smooth scroll with easing
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active class with delay
                setTimeout(() => {
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }, 300);
            }
        });
    });
});

// ============================================================================
// ENHANCED ACTIVE NAVIGATION HIGHLIGHTING
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    const highlightNav = throttle(() => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, 100);
    
    window.addEventListener('scroll', highlightNav, { passive: true });
});

// ============================================================================
// ADVANCED INTERSECTION OBSERVER ANIMATIONS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Intersection Observer with different animation types
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add appropriate animation class
                if (element.classList.contains('fade-in-up')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('fade-in-left')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('fade-in-right')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scale-in')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('stagger-children')) {
                    element.classList.add('animate');
                }
                
                // Unobserve after animation
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Apply animations to elements
    const animatedElements = document.querySelectorAll(`
        .service-card, 
        .news-card, 
        .about-text, 
        .about-image,
        .section-header,
        .contact-info-column,
        .map-column,
        .akhlak-item,
        .shareholder-card,
        .timeline-item
    `);
    
    animatedElements.forEach((el, index) => {
        // Add different animation classes based on position and type
        if (el.classList.contains('about-text') || el.classList.contains('contact-info-column')) {
            el.classList.add('fade-in-left');
        } else if (el.classList.contains('about-image') || el.classList.contains('map-column')) {
            el.classList.add('fade-in-right');
        } else if (el.classList.contains('section-header')) {
            el.classList.add('fade-in-up');
        } else {
            el.classList.add('scale-in');
        }
        
        animationObserver.observe(el);
    });

    // Special handling for service and news grids
    const serviceGrid = document.querySelector('.services-grid');
    const newsGrid = document.querySelector('.news-grid');
    
    if (serviceGrid) {
        serviceGrid.classList.add('stagger-children');
        animationObserver.observe(serviceGrid);
    }
    
    if (newsGrid) {
        newsGrid.classList.add('stagger-children');
        animationObserver.observe(newsGrid);
    }
});

// ============================================================================
// ENHANCED COUNTER ANIMATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter, .stat-item h3');
    
    const animateCounter = (counter) => {
        const finalValue = parseInt(counter.textContent.replace(/\D/g, ''));
        const hasPlus = counter.textContent.includes('+');
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        let currentValue = 0;
        
        const updateCounter = () => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                counter.textContent = finalValue + (hasPlus ? '+' : '');
            } else {
                counter.textContent = Math.floor(currentValue) + (hasPlus ? '+' : '');
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        if (counter.textContent.match(/\d+/)) {
            counterObserver.observe(counter);
        }
    });
});

// ============================================================================
// ENHANCED FORM HANDLING
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced form validation
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        let isValid = true;
        
        // Remove previous errors
        fieldGroup.classList.remove('error');
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(fieldGroup, 'Field ini wajib diisi');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldGroup, 'Format email tidak valid');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.id === 'phone' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(fieldGroup, 'Format nomor telepon tidak valid');
                isValid = false;
            }
        }
        
        // Message length validation
        if (field.id === 'message' && value && value.length < 10) {
            showFieldError(fieldGroup, 'Pesan minimal 10 karakter');
            isValid = false;
        }
        
        return isValid;
    };
    
    const showFieldError = (fieldGroup, message) => {
        fieldGroup.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        fieldGroup.appendChild(errorDiv);
        
        // Animate error message
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorDiv.style.transition = 'all 0.3s ease';
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }, 10);
    };
    
    // Enhanced form submission with better UX
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', debounce(() => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            }, 300));
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                // Show loading state
                const submitBtn = form.querySelector('[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                submitBtn.disabled = true;
                
                // Simulate form processing
                setTimeout(() => {
                    // Handle different form types
                    if (form.id === 'commentForm') {
                        handleCommentForm(form);
                    } else {
                        handleContactForm(form);
                    }
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                // Shake form on error
                form.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    form.style.animation = '';
                }, 500);
            }
        });
    });
    
    const handleCommentForm = (form) => {
        const formData = new FormData(form);
        const emailContent = `
Nama: ${formData.get('name')}
Email: ${formData.get('email')}
Telepon: ${formData.get('phone') || 'Tidak diisi'}
Subjek: ${formData.get('subject')}
Pesan: ${formData.get('message')}

---
Laporan dari website JJC
        `;
        
        const mailtoLink = `mailto:armasuka11@gmail.com?subject=Laporan JJC - ${formData.get('subject')}&body=${encodeURIComponent(emailContent)}`;
        window.open(mailtoLink);
        
        showSuccessMessage(form, 'Laporan Anda telah berhasil dikirim! Email client akan terbuka untuk konfirmasi pengiriman.');
        form.reset();
    };
    
    const handleContactForm = (form) => {
        showSuccessMessage(form, 'Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
        form.reset();
    };
    
    const showSuccessMessage = (form, message) => {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        form.appendChild(successDiv);
        
        // Animate success message
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            successDiv.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            successDiv.style.opacity = '1';
            successDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
        
        // Scroll to success message
        successDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    };
});

// ============================================================================
// ENHANCED BACK TO TOP BUTTON
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const createBackToTopBtn = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        
        // Enhanced styles
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(backToTopBtn);

        // Show/hide with smooth animation
        const toggleButton = throttle(() => {
            if (window.scrollY > 400) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
                backToTopBtn.style.transform = 'scale(1)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.transform = 'scale(0.8)';
            }
        }, 100);

        window.addEventListener('scroll', toggleButton, { passive: true });

        // Smooth scroll to top with progress indication
        backToTopBtn.addEventListener('click', () => {
            const scrollTop = window.pageYOffset;
            const scrollStep = scrollTop / 25;
            
            const scrollInterval = setInterval(() => {
                if (window.pageYOffset > 0) {
                    window.scrollBy(0, -scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        });

        // Enhanced hover effects
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'scale(1.1) rotate(-5deg)';
            backToTopBtn.style.background = 'linear-gradient(135deg, var(--secondary-blue), var(--accent-yellow))';
        });

        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = 'scale(1) rotate(0deg)';
            backToTopBtn.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--secondary-blue))';
        });
    };

    createBackToTopBtn();
});

// ============================================================================
// ENHANCED VIDEO OPTIMIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Preload and optimize video
        heroVideo.preload = 'metadata';
        
        // Enhanced video loading
        const handleVideoLoad = () => {
            heroVideo.style.transition = 'opacity 1s ease-in-out';
            heroVideo.style.opacity = '1';
        };
        
        // Error handling
        const handleVideoError = () => {
            console.log('Video failed to load, using fallback');
            heroVideo.style.display = 'none';
            // Add fallback background image if needed
        };
        
        heroVideo.addEventListener('loadedmetadata', handleVideoLoad);
        heroVideo.addEventListener('error', handleVideoError);
        
        // Intersection Observer for video performance
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(handleVideoError);
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.25 });
        
        videoObserver.observe(heroVideo);
        
        // Pause video when page is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                heroVideo.pause();
            } else if (heroVideo.getBoundingClientRect().top < window.innerHeight) {
                heroVideo.play().catch(handleVideoError);
            }
        });
    }
});

// ============================================================================
// ENHANCED PERFORMANCE OPTIMIZATIONS
// ============================================================================

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
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
});

// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload next page resources on hover
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const linkHref = link.href;
            if (linkHref && !document.querySelector(`link[href="${linkHref}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = linkHref;
                document.head.appendChild(prefetchLink);
            }
        });
    });
});

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenuBtn && navMenu && navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Focus management for mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            setTimeout(() => {
                if (navMenu.classList.contains('active')) {
                    const firstLink = navMenu.querySelector('a');
                    if (firstLink) firstLink.focus();
                }
            }, 100);
        });
    }
});

// ============================================================================
// CONSOLE WELCOME & DEVELOPMENT INFO
// ============================================================================

console.log('%c🚀 JJC Website Enhanced!', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%c✨ Professional animations and interactions loaded', 'color: #10b981; font-size: 14px;');
console.log('%c🎯 Developed with modern JavaScript and performance optimization', 'color: #64748b; font-size: 12px;');

// ============================================================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0';
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                    answer.style.maxHeight = '0';
                }
            });
        }
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    });
}