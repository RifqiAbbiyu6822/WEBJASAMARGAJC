// Enhanced Mobile Menu for New Navbar Structure
document.addEventListener('DOMContentLoaded', function() {
    const createMobileMenu = () => {
        const navMenu = document.querySelector('.nav-menu');
        const header = document.querySelector('.header');
        const navContainer = document.querySelector('.nav-container');
        
        if (!navMenu || !header || !navContainer) return;
        
        // Find existing mobile menu button or create one
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!mobileMenuBtn) {
            // Create hamburger menu button if it doesn't exist
            mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `;
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            // Add to nav container
            navContainer.appendChild(mobileMenuBtn);
        }
        
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
    };
    
    createMobileMenu();

    // Enhanced logo click handling with animation
    const logoLinks = document.querySelectorAll('.logo a');
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add subtle animation on logo click
            const logo = this.querySelector('.logo-img');
            if (logo) {
                logo.style.transition = 'transform 0.2s ease';
                logo.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    logo.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Enhanced navbar scroll effects
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
    if (header) {
        header.style.transform = 'translateY(0)';
    }

    // Enhanced active navigation highlighting
    const sections = document.querySelectorAll('section[id], main section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;
        
        // Check if we're on home page
        const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
        
        if (isHomePage) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
                    current = sectionId;
                }
            });
        }
        
        // Update active states
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (isHomePage && current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            } else if (!isHomePage) {
                // Highlight current page in navigation
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
    }
    
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
    
    const throttledUpdateActiveNav = throttle(updateActiveNav, 100);
    window.addEventListener('scroll', throttledUpdateActiveNav, { passive: true });
    
    // Initial call to set active state on page load
    updateActiveNav();

    // Enhanced smooth scrolling for home page links
    const homeNavLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    homeNavLinks.forEach(link => {
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

    // Handle logo hover effects
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        const logoLink = logoImg.closest('a');
        
        if (logoLink) {
            logoLink.addEventListener('mouseenter', () => {
                logoImg.style.transition = 'transform 0.3s ease';
                logoImg.style.transform = 'scale(1.05)';
            });
            
            logoLink.addEventListener('mouseleave', () => {
                logoImg.style.transform = 'scale(1)';
            });
        }
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenuBtn && navMenu && navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
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

    // Handle window resize to close mobile menu if needed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileMenuBtn && navMenu) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });

    // Add animation for social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Performance optimization: Preload next page resources on hover
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

    // Add loading states to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't add loading state for hash links (home page navigation)
            if (!this.getAttribute('href').startsWith('#')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Create loading indicator
                const originalText = this.innerHTML;
                const loadingDot = document.createElement('span');
                loadingDot.className = 'loading-dot';
                loadingDot.innerHTML = '...';
                loadingDot.style.animation = 'pulse 1s infinite';
                
                // Reset after a delay (in case navigation is slow)
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.innerHTML = originalText;
                }, 2000);
            }
        });
    });

    // Enhanced header background transition
    function updateHeaderBackground() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (header) {
            const opacity = Math.min(scrollTop / 100, 0.98);
            const blurAmount = Math.min(scrollTop / 10, 20);
            
            if (scrollTop > 50) {
                header.style.background = `rgba(30, 58, 138, ${opacity})`;
                header.style.backdropFilter = `blur(${blurAmount}px)`;
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
        }
    }

    const throttledUpdateHeaderBg = throttle(updateHeaderBackground, 16);
    window.addEventListener('scroll', throttledUpdateHeaderBg, { passive: true });

    // Initialize header background on load
    updateHeaderBackground();

    // Add intersection observer for hero content animation
    const heroContent = document.querySelector('.hero-content, .page-header-content');
    if (heroContent) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });

        observer.observe(heroContent);
    }

    // Add smooth reveal animation for navigation items
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500);
    });

    // Add pulse animation to social icons
    const socialIconsContainer = document.querySelector('.social-icons');
    if (socialIconsContainer) {
        socialIconsContainer.addEventListener('mouseenter', () => {
            const icons = socialIconsContainer.querySelectorAll('a');
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        });
    }

    console.log('🚀 Enhanced JJC Navbar Loaded Successfully!');
});

// CSS animations for loading states
const navStyles = document.createElement('style');
navStyles.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes fadeInNav {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu li {
        animation: fadeInNav 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;
    }
    
    .nav-menu li:nth-child(1) { animation-delay: 0.1s; }
    .nav-menu li:nth-child(2) { animation-delay: 0.2s; }
    .nav-menu li:nth-child(3) { animation-delay: 0.3s; }
    .nav-menu li:nth-child(4) { animation-delay: 0.4s; }
    .nav-menu li:nth-child(5) { animation-delay: 0.5s; }
    
    .loading-dot {
        font-size: 0.8em;
        color: var(--accent-yellow);
    }
`;

document.head.appendChild(navStyles);