// Enhanced JJC Website JavaScript - UI/UX Improvements
// Maintaining existing functionality while adding modern interactions

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Navbar Scroll Effect - Updated for new design
    const enhanceNavbarScrollEffect = () => {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    };

    // Enhanced Mobile Menu Toggle - Updated for new design
    const enhanceMobileMenuToggle = () => {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileMenuToggle || !navMenu) return;

        // Remove any existing event listeners to prevent conflicts
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);

        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu toggle clicked - preventDefault and stopPropagation called');
            
            const isActive = this.classList.contains('active');
            
            // Toggle menu state
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu state toggled. Active:', !isActive);
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });

        // Close menu when clicking on nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            // Remove existing listeners
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                newToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
                
                // Navigate to the link after closing menu
                setTimeout(() => {
                    window.location.href = newLink.href;
                }, 100);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!newToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                console.log('Outside click detected - closing mobile menu');
                newToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                newToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });
    };

    // Initialize new navbar functions
    enhanceNavbarScrollEffect();
    enhanceMobileMenuToggle();

    // Enhanced Mobile Menu with Better UX - COMPLETELY DISABLED to prevent conflicts
    const createEnhancedMobileMenu = () => {
        // Function completely disabled to prevent conflicts with enhanceMobileMenuToggle
        return { closeMobileMenu: () => {} };
    };
    
    // const { closeMobileMenu } = createEnhancedMobileMenu(); // Disabled to prevent conflicts
    
    // Global closeMobileMenu function to replace the disabled one
    const closeMobileMenu = () => {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    };

    // Enhanced Logo Interactions
    const enhanceLogoInteractions = () => {
        const logoLinks = document.querySelectorAll('.logo a');
        logoLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const logo = this.querySelector('.logo-img');
                if (logo) {
                    logo.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    logo.style.transform = 'scale(0.95) rotate(-2deg)';
                    setTimeout(() => {
                        logo.style.transform = 'scale(1) rotate(0deg)';
                    }, 200);
                }
            });
            
            // Add hover effect with cursor
            link.addEventListener('mouseenter', function() {
                this.style.cursor = 'pointer';
                const logo = this.querySelector('.logo-img');
                if (logo) {
                    logo.style.transition = 'transform 0.3s ease';
                    logo.style.transform = 'scale(1.02)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                const logo = this.querySelector('.logo-img');
                if (logo) {
                    logo.style.transform = 'scale(1)';
                }
            });
        });
    };
    
    enhanceLogoInteractions();

    // Enhanced Header Scroll Effects with Performance Optimization
    const enhanceHeaderScrollEffects = () => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScrollTop = 0;
        let ticking = false;
        let scrollTimeout;

        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = Math.abs(scrollTop - lastScrollTop);
            
            // Determine if it's home page
            const isHomePage = document.body.classList.contains('home-page') || 
                              window.location.pathname === '/' || 
                              window.location.pathname.includes('index.html');
            
            if (isHomePage) {
                // Home page behavior: transparent when at top, blue when scrolled
                if (scrollTop > 80) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            } else {
                // Sub-pages: always blue background
                header.classList.add('scrolled');
            }
            
            // Add scroll direction classes for additional styling
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('scroll-down');
                header.classList.remove('scroll-up');
            } else if (scrollTop < lastScrollTop) {
                header.classList.add('scroll-up');
                header.classList.remove('scroll-down');
            }
            
            // Add scroll speed class for dynamic effects
            if (scrollDelta > 10) {
                header.classList.add('fast-scroll');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    header.classList.remove('fast-scroll');
                }, 150);
            }
            
            lastScrollTop = scrollTop;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Initial call
        updateHeader();
    };
    
    enhanceHeaderScrollEffects();

    // Enhanced Navigation Active State Management
    const enhanceNavigationActiveStates = () => {
        const sections = document.querySelectorAll('section[id], main section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        const updateActiveNav = () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 200;
            
            const isHomePage = window.location.pathname === '/' || 
                              window.location.pathname.includes('index.html');
            
            if (isHomePage) {
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && 
                        scrollPosition < sectionTop + sectionHeight && 
                        sectionId) {
                        current = sectionId;
                    }
                });
            }
            
            // Update active states with smooth transitions
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                if (isHomePage && current && link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                } else if (!isHomePage) {
                    const currentPath = window.location.pathname;
                    const linkPath = link.getAttribute('href');
                    
                    if ((currentPath.includes('tentang') && linkPath.includes('tentang')) ||
                        (currentPath.includes('layanan') && linkPath.includes('layanan')) ||
                        (currentPath.includes('berita') && linkPath.includes('berita')) ||
                        (currentPath.includes('kontak') && linkPath.includes('kontak'))) {
                        link.classList.add('active');
                    }
                }
            });
        };
        
        // Throttled scroll listener for better performance
        let scrollTimer;
        const throttledUpdateActiveNav = () => {
            if (scrollTimer) return;
            scrollTimer = setTimeout(() => {
                updateActiveNav();
                scrollTimer = null;
            }, 100);
        };
        
        window.addEventListener('scroll', throttledUpdateActiveNav, { passive: true });
        updateActiveNav(); // Initial call
    };
    
    enhanceNavigationActiveStates();

    // Enhanced Smooth Scrolling with Easing
    const enhanceSmoothScrolling = () => {
        const homeNavLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        homeNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 30;
                    
                    // Add loading state to clicked link
                    this.classList.add('loading-state');
                    
                    // Enhanced smooth scroll with custom easing
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let start = null;
                    
                    const easeInOutCubic = (t) => {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    };
                    
                    const animateScroll = (timestamp) => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const progressPercent = Math.min(progress / duration, 1);
                        const easedProgress = easeInOutCubic(progressPercent);
                        
                        window.scrollTo(0, startPosition + distance * easedProgress);
                        
                        if (progress < duration) {
                            requestAnimationFrame(animateScroll);
                        } else {
                            // Remove loading state and add active class
                            setTimeout(() => {
                                navLinks.forEach(l => l.classList.remove('active', 'loading-state'));
                                this.classList.add('active');
                                this.classList.remove('loading-state');
                            }, 100);
                        }
                    };
                    
                    requestAnimationFrame(animateScroll);
                }
            });
        });
    };
    
    enhanceSmoothScrolling();

    // Enhanced Intersection Observer for Animations
    const enhanceScrollAnimations = () => {
        const observerOptions = {
            threshold: [0.1, 0.2, 0.3],
            rootMargin: '0px 0px -30px 0px'
        };
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('animate-in');
                    
                    // Add modern card entrance animation
                    if (target.classList.contains('service-card') || 
                        target.classList.contains('news-card') ||
                        target.classList.contains('shareholder-card') ||
                        target.classList.contains('akhlak-item') ||
                        target.classList.contains('vision-box') ||
                        target.classList.contains('mission-box')) {
                        
                        target.style.opacity = '0';
                        target.style.transform = 'translateY(40px) scale(0.95)';
                        
                        // Smooth entrance animation
                        setTimeout(() => {
                            target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }
                    
                    // Add stagger animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-children > *');
                    children.forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            child.style.transition = 'all 0.4s ease-out';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 80 + 100);
                    });
                    
                    // Unobserve after animation to improve performance
                    cardObserver.unobserve(target);
                }
            });
        }, observerOptions);
        
        // Enhanced section observer for larger elements
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    
                    // Animate section headers
                    const header = entry.target.querySelector('.section-header');
                    if (header) {
                        header.style.opacity = '0';
                        header.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            header.style.transition = 'all 0.5s ease-out';
                            header.style.opacity = '1';
                            header.style.transform = 'translateY(0)';
                        }, 100);
                    }
                    
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all cards and sections
        const cardsToObserve = document.querySelectorAll(`
            .service-card,
            .news-card,
            .shareholder-card,
            .akhlak-item,
            .vision-box,
            .mission-box,
            .emergency-card,
            .certification-card,
            .stat-card,
            .testimonial-card
        `);
        
        const sectionsToObserve = document.querySelectorAll(`
            .about-section,
            .services-section,
            .news-section,
            .vision-mission-section,
            .values-section,
            .shareholders-section,
            .contact-section,
            .about-overview,
            .strategy-section
        `);
        
        cardsToObserve.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            cardObserver.observe(card);
        });
        
        sectionsToObserve.forEach(section => sectionObserver.observe(section));
        
        // Enhanced parallax effect for hero sections
        const parallaxElements = document.querySelectorAll('.hero-background, .page-header');
        if (parallaxElements.length > 0 && window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach(element => {
                    element.style.transform = `translateY(${rate}px)`;
                });
            }, { passive: true });
        }
    };
    
    enhanceScrollAnimations();

    // Enhanced Card Hover Effects
    const enhanceCardInteractions = () => {
        const cards = document.querySelectorAll('.service-card, .news-card, .emergency-card, .shareholder-card');
        
        cards.forEach(card => {
            // Add mouse tracking for subtle tilt effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
            
            // Add touch feedback for mobile
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    };
    
    enhanceCardInteractions();

    // Enhanced Form Interactions
    const enhanceFormExperience = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Add floating label effect
                const addFloatingLabel = () => {
                    const label = form.querySelector(`label[for="${input.id}"]`);
                    if (label && input.value) {
                        label.classList.add('floating');
                    } else if (label) {
                        label.classList.remove('floating');
                    }
                };
                
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                    addFloatingLabel();
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    addFloatingLabel();
                });
                
                input.addEventListener('input', addFloatingLabel);
                
                // Initial check
                addFloatingLabel();
                
                // Enhanced validation feedback
                input.addEventListener('invalid', function() {
                    this.parentElement.classList.add('error');
                    
                    // Remove error class after user starts typing
                    const removeError = () => {
                        this.parentElement.classList.remove('error');
                        this.removeEventListener('input', removeError);
                    };
                    this.addEventListener('input', removeError);
                });
            });
            
            // Enhanced form submission
            form.addEventListener('submit', function(e) {
                const submitBtn = this.querySelector('[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading-state');
                    submitBtn.disabled = true;
                    
                    // Re-enable after 3 seconds (adjust based on your needs)
                    setTimeout(() => {
                        submitBtn.classList.remove('loading-state');
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        });
    };
    
    enhanceFormExperience();

    // Enhanced Button Interactions
    const enhanceButtonInteractions = () => {
        const buttons = document.querySelectorAll('.cta-btn, .read-more-btn, .detail-btn, .more-news-btn, .submit-btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Add magnetic effect on hover (for desktop)
            if (window.innerWidth > 768) {
                button.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0)';
                });
            }
        });
    };
    
    enhanceButtonInteractions();

    // Enhanced Keyboard Navigation
    const enhanceKeyboardNavigation = () => {
        let isTabbing = false;
        
        // Detect tab key usage
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                isTabbing = true;
                document.body.classList.add('user-is-tabbing');
            }
            
            // ESC key functionality
            if (e.key === 'Escape') {
                // Close mobile menu
                if (closeMobileMenu) {
                    closeMobileMenu();
                }
                
                // Close any open modals or dropdowns
                const openElements = document.querySelectorAll('.active, .open');
                openElements.forEach(el => {
                    el.classList.remove('active', 'open');
                });
            }
            
            // Enhanced arrow key navigation for menus
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                const focusedElement = document.activeElement;
                const navLinks = Array.from(document.querySelectorAll('.nav-menu a'));
                const currentIndex = navLinks.indexOf(focusedElement);
                
                if (currentIndex !== -1) {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowDown' 
                        ? (currentIndex + 1) % navLinks.length 
                        : (currentIndex - 1 + navLinks.length) % navLinks.length;
                    navLinks[nextIndex].focus();
                }
            }
        });
        
        document.addEventListener('mousedown', () => {
            isTabbing = false;
            document.body.classList.remove('user-is-tabbing');
        });
        
        // Focus trap for mobile menu
        const mobileMenu = document.querySelector('.nav-menu');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                setTimeout(() => {
                    if (mobileMenu.classList.contains('active')) {
                        const firstLink = mobileMenu.querySelector('a');
                        if (firstLink) firstLink.focus();
                    }
                }, 100);
            });
        }
    };
    
    enhanceKeyboardNavigation();

    // Enhanced Performance Optimizations
    const enhancePerformance = () => {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Preload critical resources on hover
        const importantLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        
        importantLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const linkHref = link.href;
                if (linkHref && !document.querySelector(`link[href="${linkHref}"]`)) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = linkHref;
                    document.head.appendChild(prefetchLink);
                }
            }, { once: true });
        });
        
        // Optimize scroll listeners with passive flag
        window.addEventListener('scroll', () => {
            // Update scroll progress indicator if exists
            const scrollProgress = document.querySelector('.scroll-progress');
            if (scrollProgress) {
                const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                scrollProgress.style.width = scrollPercent + '%';
            }
        }, { passive: true });
    };
    
    enhancePerformance();

    // Enhanced Accessibility Features
    const enhanceAccessibility = () => {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Enhance focus indicators
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.setAttribute('data-focused', 'true');
            });
            
            element.addEventListener('blur', function() {
                this.removeAttribute('data-focused');
            });
        });
        
        // Add ARIA labels where missing
        const socialLinks = document.querySelectorAll('.social-icons a');
        socialLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const icon = link.querySelector('i');
                if (icon) {
                    const platform = icon.className.includes('instagram') ? 'Instagram' :
                                   icon.className.includes('tiktok') ? 'TikTok' :
                                   icon.className.includes('youtube') ? 'YouTube' : 'Social Media';
                    link.setAttribute('aria-label', `Visit our ${platform} page`);
                }
            }
        });
        
        // Enhanced screen reader announcements
        const announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };
        
        // Announce page changes
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                announceToScreenReader('Navigating to new page');
            });
        });
    };
    
    enhanceAccessibility();

    // Enhanced Window Resize Handler
    const enhanceResizeHandler = () => {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Close mobile menu on desktop resize
                if (window.innerWidth > 768 && closeMobileMenu) {
                    closeMobileMenu();
                }
                
                // Recalculate any position-dependent elements
                const stickyElements = document.querySelectorAll('.sticky, [data-sticky]');
                stickyElements.forEach(el => {
                    el.style.top = document.querySelector('.header').offsetHeight + 'px';
                });
                
                // Update any chart or visual elements
                const charts = document.querySelectorAll('.chart, .graph');
                charts.forEach(chart => {
                    // Trigger chart resize if using chart libraries
                    if (chart.chart && typeof chart.chart.resize === 'function') {
                        chart.chart.resize();
                    }
                });
            }, 250);
        });
    };
    
    enhanceResizeHandler();

    // Enhanced Error Handling
    const enhanceErrorHandling = () => {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            
            // Show user-friendly error message for critical errors
            if (e.error && e.error.stack && e.error.stack.includes('critical')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-notification';
                errorMessage.innerHTML = `
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Something went wrong. Please refresh the page.</span>
                        <button onclick="location.reload()" class="btn-small">Refresh</button>
                    </div>
                `;
                document.body.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
        
        // Network error handling
        window.addEventListener('offline', () => {
            const offlineMessage = document.createElement('div');
            offlineMessage.className = 'offline-notification';
            offlineMessage.innerHTML = `
                <div class="offline-content">
                    <i class="fas fa-wifi-slash"></i>
                    <span>You're currently offline</span>
                </div>
            `;
            document.body.appendChild(offlineMessage);
        });
        
        window.addEventListener('online', () => {
            const offlineMessage = document.querySelector('.offline-notification');
            if (offlineMessage) {
                offlineMessage.remove();
            }
        });
    };
    
    enhanceErrorHandling();

    // Enhanced Loading States
    const enhanceLoadingStates = () => {
        // Add loading states to navigation links
        const navLinks = document.querySelectorAll('.nav-menu a:not([href^="#"])');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.getAttribute('href').startsWith('#')) {
                    this.classList.add('loading-state');
                    
                    // Add loading spinner
                    const spinner = document.createElement('div');
                    spinner.className = 'link-spinner';
                    this.appendChild(spinner);
                    
                    // Reset after navigation (fallback)
                    setTimeout(() => {
                        this.classList.remove('loading-state');
                        if (spinner.parentNode) {
                            spinner.remove();
                        }
                    }, 3000);
                }
            });
        });
        
        // Page load completion
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            
            // Remove any loading overlays
            const loadingOverlay = document.querySelector('.loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.classList.add('fade-out');
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 500);
            }
        });
    };
    
    enhanceLoadingStates();

    // Enhanced Social Media Interactions
    const enhanceSocialMediaInteractions = () => {
        const socialIcons = document.querySelectorAll('.social-icons a');
        
        socialIcons.forEach((icon, index) => {
            // Add animation delay for cascade effect
            icon.style.setProperty('--animation-delay', `${index * 0.1}s`);
            
            // Add pulse animation on hover
            icon.addEventListener('mouseenter', function() {
                this.style.animationDelay = `${index * 0.1}s`;
                this.style.animation = 'socialPulse 0.6s ease-out';
            });
            
            icon.addEventListener('animationend', function() {
                this.style.animation = '';
            });
            
            // Add click tracking (for analytics)
            icon.addEventListener('click', function() {
                const platform = this.querySelector('i').className.includes('instagram') ? 'Instagram' :
                               this.querySelector('i').className.includes('tiktok') ? 'TikTok' :
                               this.querySelector('i').className.includes('youtube') ? 'YouTube' : 'Social';
                
                // Analytics tracking would go here
                console.log(`Social media click: ${platform}`);
            });
        });
    };
    
    enhanceSocialMediaInteractions();

    // Initialize all enhancements
    console.log('🚀 Enhanced JJC Website Loaded Successfully!');
    console.log('✨ UI/UX Enhancements Active:');
    console.log('  - Enhanced mobile menu with animations');
    console.log('  - Smooth scrolling with easing');
    console.log('  - Interactive card hover effects');
    console.log('  - Improved accessibility features');
    console.log('  - Performance optimizations');
    console.log('  - Enhanced form interactions');
    console.log('  - Keyboard navigation support');
    console.log('  - Loading states and error handling');
    
    // Force show all content after page load
    setTimeout(() => {
        const allContent = document.querySelectorAll('.about-section, .services-section, .news-section, .vision-mission-section, .values-section, .shareholders-section, .contact-section, .about-overview, .strategy-section, .service-card, .news-card, .akhlak-item, .shareholder-card, .vision-box, .mission-box');
        allContent.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'translateY(0)';
        });
    }, 500);

    // Dynamic News Loader for kegiatan/berita listing page
    const initializeDynamicNewsListing = () => {
        const isNewsListingPage = window.location.pathname.includes('berita.html');
        if (!isNewsListingPage) return;

        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        // Clear existing static content (if any)
        newsGrid.innerHTML = '';

        const slugs = ['berita-a', 'berita-b', 'berita-c', 'berita-d', 'berita-e', 'berita-f'];

        const createCardHtml = ({ href, date, title, summary, imageSrc, iconClass }) => {
            const imageHtml = imageSrc
                ? `<img src="${imageSrc}" alt="${title}" loading="lazy">`
                : `<i class="${iconClass || 'fas fa-newspaper'}"></i>`;

            return `
                <article class="news-card">
                    <div class="news-image">${imageHtml}</div>
                    <div class="news-content">
                        <div class="news-date">${date || ''}</div>
                        <h3>${title || ''}</h3>
                        <p>${summary || ''}</p>
                        <a href="${href}" class="read-more-btn">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            `;
        };

        const extractFirstParagraph = (root) => {
            const p = root.querySelector('.news-content-full p');
            if (p && p.textContent) {
                const text = p.textContent.trim();
                return text.length > 180 ? text.slice(0, 177) + '…' : text;
            }
            return '';
        };

        const mapFallbackIcon = (doc) => {
            const icon = doc.querySelector('.news-image-large i');
            return icon ? icon.className : 'fas fa-newspaper';
        };

        const tryGetImageSrc = (doc) => {
            const img = doc.querySelector('.news-image-large img');
            if (img && img.getAttribute('src')) {
                return img.getAttribute('src');
            }
            return '';
        };

        const fetchOne = async (slug) => {
            const href = `${slug}.html`;
            try {
                const res = await fetch(href, { credentials: 'same-origin' });
                if (!res.ok) throw new Error(`Gagal memuat ${href}`);
                const html = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const title = (doc.querySelector('.page-header .page-title') || doc.querySelector('h1'))?.textContent?.trim() || '';
                const date = doc.querySelector('.news-date')?.textContent?.trim() || '';
                const summary = extractFirstParagraph(doc);
                const imageSrc = tryGetImageSrc(doc);
                const iconClass = imageSrc ? '' : mapFallbackIcon(doc);

                return { href, date, title, summary, imageSrc, iconClass };
            } catch (e) {
                console.warn(e);
                return { href, date: '', title: slug.replace(/-/g, ' ').toUpperCase(), summary: '', imageSrc: '', iconClass: 'fas fa-newspaper' };
            }
        };

        (async () => {
            const results = await Promise.all(slugs.map(fetchOne));
            const htmlCards = results.map(createCardHtml).join('');
            newsGrid.innerHTML = htmlCards;
        })();
    };

    initializeDynamicNewsListing();
});

// Enhanced CSS animations and utilities to be added via JavaScript
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Enhanced Animation Keyframes */
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes socialPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes linkSpinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Enhanced Utility Classes */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    .link-spinner {
        position: absolute;
        right: -25px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: linkSpinner 1s linear infinite;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .user-is-tabbing *:focus {
        outline: 3px solid var(--secondary-blue) !important;
        outline-offset: 2px;
    }
    
    .error-notification,
    .offline-notification {
        position: fixed;
        top: calc(var(--header-height) + 1rem);
        right: 1rem;
        background: var(--bg-white);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        border-left: 4px solid #ef4444;
        animation: slideInRight 0.3s ease-out;
    }
    
    .offline-notification {
        border-left-color: #f59e0b;
    }
    
    .error-content,
    .offline-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--text-primary);
    }
    
    .btn-small {
        padding: 0.25rem 0.75rem;
        font-size: 0.8rem;
        background: var(--primary-blue);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 0.5rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    /* Enhanced Form States */
    .form-group.focused label {
        color: var(--secondary-blue);
        transform: translateY(-2px);
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-group label.floating {
        transform: translateY(-1.5rem) scale(0.85);
        color: var(--secondary-blue);
    }
    
    /* Enhanced Scroll Progress */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--accent-yellow));
        z-index: 10001;
        transition: width 0.1s ease;
    }
    
    /* Enhanced Loading States */
    .page-loaded .fade-in-up {
        animation-play-state: running;
    }
    
    .loading-overlay.fade-out {
        opacity: 0;
        pointer-events: none;
    }
    
    /* Mobile Enhancements */
    @media (max-width: 768px) {
        .error-notification,
        .offline-notification {
            left: 1rem;
            right: 1rem;
            top: calc(var(--header-height) + 0.5rem);
        }
    }
`;

document.head.appendChild(enhancedStyles);