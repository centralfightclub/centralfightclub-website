// Modern JavaScript for Central Fight Club Website

document.addEventListener('DOMContentLoaded', function() {
    // Load sports content
    loadSportsContent();
    
    // Debug navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Navigation link clicked:', href);
            
            // If it's a relative link to another page, ensure it works
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                console.log('Attempting to navigate to:', href);
            }
        });
    });
    
    // Mobile menu toggle
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Ensure no borders at any scroll position
        header.style.border = 'none';
        header.style.outline = 'none';
        
        lastScrollTop = scrollTop;
    });
    
    // Enhanced Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animation classes based on element type
                if (entry.target.classList.contains('about-card')) {
                    entry.target.classList.add('scale-in');
                } else if (entry.target.classList.contains('gallery-preview-item')) {
                    entry.target.classList.add('fade-in-up');
                } else if (entry.target.classList.contains('contact-item')) {
                    entry.target.classList.add('fade-in-left');
                } else if (entry.target.classList.contains('section-header')) {
                    entry.target.classList.add('fade-in-up');
                } else if (entry.target.classList.contains('footer-section')) {
                    entry.target.classList.add('fade-in-up');
                } else if (entry.target.classList.contains('gallery-item')) {
                    entry.target.classList.add('fade-in-up');
                } else {
                    entry.target.classList.add('fade-in-up');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .gallery-item, .contact-item, .section-header, .footer-section, .gallery-preview-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Mobile-specific animations
    if (window.innerWidth <= 768) {
        // Enhanced button hover effects for mobile
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.3)';
            });
            
            btn.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
        
        // Card hover effects for mobile
        const cards = document.querySelectorAll('.about-card, .gallery-preview-item');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                if (this.classList.contains('about-card')) {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                } else {
                    this.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt, index);
        });
    });
    
    // Enhanced Lightbox functionality with navigation
    let currentImageIndex = 0;
    let galleryImages = [];
    
    function openLightbox(src, alt, clickedIndex = 0) {
        // Get all gallery images from localStorage first, then fallback to DOM elements
        const savedImages = localStorage.getItem('galleryImages');
        if (savedImages) {
            const allImages = JSON.parse(savedImages);
            const validImages = allImages.filter(item => 
                item && 
                (item.url || item.image) && 
                (item.url || item.image).trim() !== '' && 
                (item.name || item.title) && 
                (item.name || item.title).trim() !== ''
            );
            
            // Sort by order
            validImages.sort((a, b) => {
                return (a.order || 0) - (b.order || 0);
            });
            
            galleryImages = validImages.map(img => ({
                src: img.url || img.image,
                alt: img.name || img.title || 'Training'
            }));
        } else {
            // Fallback to DOM elements
            const galleryItems = document.querySelectorAll('.gallery-item img');
            galleryImages = Array.from(galleryItems).map(img => ({
                src: img.src,
                alt: img.alt
            }));
        }
        
        currentImageIndex = clickedIndex;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-nav lightbox-prev">&lt;</button>
                <img src="${src}" alt="${alt}">
                <button class="lightbox-nav lightbox-next">&gt;</button>
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-counter">${currentImageIndex + 1} / ${galleryImages.length}</div>
            </div>
        `;
        
        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .lightbox.active {
                opacity: 1;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 8px;
                transition: opacity 0.3s ease;
            }
            .lightbox-nav {
                position: fixed;
                bottom: 20px;
                background: rgba(0, 0, 0, 0.8);
                border: none;
                color: white;
                font-size: 1.8rem;
                cursor: pointer;
                padding: 15px 20px;
                border-radius: 8px;
                transition: all 0.3s ease;
                z-index: 10001;
                backdrop-filter: blur(5px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            .lightbox-nav:hover {
                background: rgba(220, 38, 38, 0.9);
                transform: scale(1.05);
            }
            .lightbox-prev {
                left: calc(50% - 60px);
            }
            .lightbox-next {
                right: calc(50% - 60px);
            }
            .lightbox-close {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 10px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }
            .lightbox-close:hover {
                background: rgba(220, 38, 38, 0.9);
                transform: scale(1.1);
            }
            .lightbox-counter {
                position: fixed;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 0.9rem;
                font-weight: 500;
                background: rgba(0, 0, 0, 0.8);
                padding: 8px 16px;
                border-radius: 25px;
                backdrop-filter: blur(5px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            }
            @media (max-width: 768px) {
                .lightbox-nav {
                    padding: 12px 16px;
                    font-size: 1.5rem;
                    bottom: 15px;
                }
                .lightbox-prev {
                    left: calc(50% - 50px);
                }
                .lightbox-next {
                    right: calc(50% - 50px);
                }
                .lightbox-close {
                    top: 15px;
                    right: 15px;
                    width: 35px;
                    height: 35px;
                    font-size: 1.2rem;
                }
                .lightbox-counter {
                    bottom: 70px;
                    font-size: 0.8rem;
                    padding: 6px 12px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(lightbox);
        
        // Animate in
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        // Navigation functionality
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const img = lightbox.querySelector('img');
        const counter = lightbox.querySelector('.lightbox-counter');
        
        function showImage(index) {
            if (index >= 0 && index < galleryImages.length) {
                currentImageIndex = index;
                img.src = galleryImages[index].src;
                img.alt = galleryImages[index].alt;
                counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
                
                // Show/hide navigation buttons
                prevBtn.style.display = index === 0 ? 'none' : 'block';
                nextBtn.style.display = index === galleryImages.length - 1 ? 'none' : 'block';
            }
        }
        
        // Navigation event listeners
        prevBtn.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentImageIndex < galleryImages.length - 1) {
                showImage(currentImageIndex + 1);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight' && currentImageIndex < galleryImages.length - 1) {
                showImage(currentImageIndex + 1);
            }
        });
        
        // Close functionality
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.head.removeChild(style);
            }, 300);
        }
        
        // Initialize navigation buttons
        showImage(currentImageIndex);
    }
    
    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            }
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.active {
                transform: translateX(0);
            }
            .notification-info {
                background: #3b82f6;
            }
            .notification-success {
                background: #10b981;
            }
            .notification-error {
                background: #ef4444;
            }
            .notification-warning {
                background: #f59e0b;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('active'), 10);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(notification);
                document.head.removeChild(style);
            }, 300);
        }, 5000);
    }
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Any scroll-based functionality can go here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Service Worker registration (for PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Accessibility improvements
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Zum Hauptinhalt springen';
    skipLink.className = 'skip-link';
    
    const skipStyle = document.createElement('style');
    skipStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #dc2626;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10002;
        }
        .skip-link:focus {
            top: 6px;
        }
    `;
    
    document.head.appendChild(skipStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
    
    // Keyboard navigation for gallery
    galleryItems.forEach((img, index) => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Galerie Bild ${index + 1} öffnen`);
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(this.src, this.alt);
            }
        });
    });
    
    // Console welcome message
    console.log(`
    🥊 Central Fight Club Hamburg
    
    Willkommen auf unserer modernen Website!
    
    Features:
    - Responsive Design
    - Moderne Animationen
    - Barrierefreiheit
    - Performance optimiert
    
    Kontakt: cfchamburg@outlook.com
    `);
});

// Sportarten Information Management
const sportInfo = {
    'muay-thai': {
        title: 'Muay Thai–K1–Kickboxen',
        description: 'Ein dynamisches Kampfsporttraining, das die kraftvollen Techniken des Muay Thai – Knie, Ellbogen, Clinch – mit den schnellen Schlag- und Kickkombinationen des K1 Kickboxens vereint. Perfekt, um Kraft, Ausdauer, Koordination und Reaktionsfähigkeit zu steigern, während du gleichzeitig die richtige Technik und Selbstverteidigung lernst.'
    },
    'mma': {
        title: 'MMA (Mixed Martial Arts)',
        description: 'Mixed Martial Arts (MMA) vereint Techniken aus Muay Thai, Kickboxen, Ringen, Judo und Brazilian Jiu-Jitsu. Im Training lernst du vielseitige Schlag-, Tritt-, Wurf- und Bodentechniken. MMA fördert Kraft, Beweglichkeit und Strategie – perfekt für alle, die einen abwechslungsreichen Kampfsport suchen.'
    },
    'bjj': {
        title: 'Brazilian Jiu-Jitsu',
        description: 'Brazilian Jiu-Jitsu (BJJ) ist eine technisch anspruchsvolle Kampfkunst, die sich auf Bodenkampf und Hebeltechniken konzentriert. Hier lernst du, deinen Gegner durch Griff- und Haltetechniken zu kontrollieren – perfekt für Selbstverteidigung, Kraftaufbau und strategisches Denken.'
    },
    'lady-kickboxen': {
        title: 'Lady-Kickboxen',
        description: 'Lady-Kickboxen ist speziell auf Frauen zugeschnitten. Hier werden Kick- und Schlagtechniken mit Fitnessübungen kombiniert – für mehr Kraft, Ausdauer und Selbstbewusstsein. Ein motivierendes Training, das Spaß macht und dir ein sicheres Auftreten vermittelt.'
    },
    'kinder-jugend': {
        title: 'Kinder- & Jugend-Kickboxen',
        description: 'In unseren Kursen für Kinder und Jugendliche vermitteln wir Kickboxen altersgerecht und spielerisch. Neben Technik und Koordination stehen Disziplin, Respekt und Teamgeist im Mittelpunkt. Das Training stärkt Körper, Selbstvertrauen und Konzentrationsfähigkeit.'
    }
};

function showSportInfo(sportKey) {
    const info = sportInfo[sportKey];
    if (info) {
        // Create modal or expand card with detailed information
        const modal = document.createElement('div');
        modal.className = 'sport-modal';
        modal.innerHTML = `
            <div class="sport-modal-content">
                <button class="sport-modal-close" onclick="closeSportModal()">&times;</button>
                <h2>${info.title}</h2>
                <p>${info.description}</p>
                <button class="btn btn-primary" onclick="closeSportModal()">Schließen</button>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .sport-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .sport-modal-content {
                background: #1a1a1a;
                border: 2px solid #dc2626;
                border-radius: 15px;
                padding: 40px;
                max-width: 600px;
                width: 100%;
                text-align: center;
                position: relative;
                animation: popupSlideIn 0.3s ease-out;
            }
            .sport-modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                color: #ffffff;
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
                line-height: 1;
            }
            .sport-modal-close:hover {
                color: #dc2626;
            }
            .sport-modal-content h2 {
                color: #dc2626;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .sport-modal-content p {
                color: #cccccc;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
    }
}

function closeSportModal() {
    const modal = document.querySelector('.sport-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Simple Admin Data Loading
function loadAdminData() {
    // Load opening hours
    loadOpeningHours();
    
    // Load gallery images
    loadGalleryImages();
    
    // Load prices
    loadPricesData();
}

async function loadOpeningHours() {
    try {
        // Load from JSON file first
        const response = await fetch('data/opening-hours.json');
        if (response.ok) {
            const hours = await response.json();
            
            // Auto-update old Saturday hours (14:00) to new hours (15:00)
            if (hours.saturday && (hours.saturday.includes('14:00') || hours.saturday.includes('14–00'))) {
                hours.saturday = hours.saturday.replace(/14[–:]00/g, '15:00');
            }
            
            updateOpeningHoursOnPage(hours);
            return;
        }
    } catch (error) {
        console.log('Loading from localStorage fallback');
    }
    
    // Fallback to localStorage
    const saved = localStorage.getItem('openingHours');
    if (saved) {
        const hours = JSON.parse(saved);
        
        // Auto-update old Saturday hours (14:00) to new hours (15:00)
        if (hours.saturday && (hours.saturday.includes('14:00') || hours.saturday.includes('14–00'))) {
            hours.saturday = hours.saturday.replace(/14[–:]00/g, '15:00');
            localStorage.setItem('openingHours', JSON.stringify(hours));
        }
        
        updateOpeningHoursOnPage(hours);
    }
}

function updateOpeningHoursOnPage(hours) {
    // Update popup opening hours
    const popupHours = document.querySelector('.probetraining-hours');
    if (popupHours) {
        popupHours.innerHTML = `
            <h3><i class="fas fa-clock"></i> Öffnungszeiten</h3>
            <p><strong>Montag - Freitag:</strong> ${hours.weekday}</p>
            <p><strong>Samstag:</strong> ${hours.saturday}</p>
            <p><strong>Sonntag:</strong> ${hours.sunday}</p>
        `;
    }
    
    // Update footer opening hours
    updateFooterOpeningHours(hours);
}

function updateFooterOpeningHours(hours) {
    // Find all footer opening hours sections
    const footerHours = document.querySelectorAll('.contact-details h3');
    
    footerHours.forEach(header => {
        if (header.textContent.includes('Öffnungszeiten')) {
            const parentDiv = header.parentElement;
            const hoursParagraph = parentDiv.querySelector('p');
            if (hoursParagraph) {
                // Format hours for footer display
                const weekdaysFormatted = hours.weekday.replace(' Uhr', '');
                const saturdayFormatted = hours.saturday.replace(' Uhr', '');
                const sundayFormatted = hours.sunday.replace(' Uhr', '');
                
                hoursParagraph.innerHTML = `Mo-Fr: ${weekdaysFormatted}<br>Sa: ${saturdayFormatted}<br>So: ${sundayFormatted}`;
            }
        }
    });
}

// Central function to get ordered images from localStorage
function getOrderedImages() {
    const saved = localStorage.getItem('galleryImages');
    let images = saved ? JSON.parse(saved) : [];
    
    // If no saved images, load default images
    if (images.length === 0) {
        images = [
            {
                name: "Fight Victory 1",
                url: "https://www.centralfightclub.de/s/cc_images/cache_19365611.JPG",
                order: 1
            },
            {
                name: "Fight Victory 2", 
                url: "https://www.centralfightclub.de/s/cc_images/cache_19365612.JPG",
                order: 2
            },
            {
                name: "Hamburg Underground Fights Poster",
                url: "https://www.centralfightclub.de/s/cc_images/cache_19288383.JPG",
                order: 3
            },
            {
                name: "Fight Victory 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_19288384.jpg",
                order: 4
            },
            {
                name: "Group Selfie",
                url: "https://www.centralfightclub.de/s/cc_images/cache_19288385.JPG",
                order: 5
            },
            {
                name: "Group Photo with Banner",
                url: "https://www.centralfightclub.de/s/cc_images/cache_19288386.JPG",
                order: 6
            },
            {
                name: "Training Session",
                url: "https://www.centralfightclub.de/s/cc_images/cache_18034166.jpeg",
                order: 7
            },
            {
                name: "Trainer bei der Arbeit",
                url: "https://www.centralfightclub.de/s/cc_images/cache_18034167.jpeg",
                order: 8
            },
            {
                name: "Technik Training 2",
                url: "https://www.centralfightclub.de/s/cc_images/cache_18034168.jpeg",
                order: 9
            },
            {
                name: "Sparring Session 2",
                url: "https://www.centralfightclub.de/s/cc_images/cache_18034165.jpeg",
                order: 10
            },
            {
                name: "Fitness Training 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17986572.jpg",
                order: 11
            },
            {
                name: "Central Fight Club 2",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17986573.jpg",
                order: 12
            },
            {
                name: "Training Session 2",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17986574.jpg",
                order: 13
            },
            {
                name: "Trainer bei der Arbeit 2",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17986575.jpg",
                order: 14
            },
            {
                name: "Technik Training 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17997373.jpeg",
                order: 15
            },
            {
                name: "Sparring Session 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17997374.jpeg",
                order: 16
            },
            {
                name: "Fitness Training 4",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17827066.jpeg",
                order: 17
            },
            {
                name: "Central Fight Club 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17827067.jpeg",
                order: 18
            },
            {
                name: "Training Session 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17827070.jpeg",
                order: 19
            },
            {
                name: "Trainer bei der Arbeit 3",
                url: "https://www.centralfightclub.de/s/cc_images/cache_17827071.jpeg",
                order: 20
            }
        ];
        // Save default images to localStorage for consistency with admin
        localStorage.setItem('galleryImages', JSON.stringify(images));
    }
    
    // Filter out invalid images and sort by order
    const validImages = images.filter(item => 
        item && 
        (item.url || item.image) && 
        (item.url || item.image).trim() !== '' && 
        (item.name || item.title) && 
        (item.name || item.title).trim() !== ''
    );
    
    // Sort by order (ascending) - same as admin
    validImages.sort((a, b) => {
        return (a.order || 0) - (b.order || 0);
    });
    
    return validImages;
}

function loadGalleryImages() {
    const images = getOrderedImages();
    displayGalleryPreview(images);
}

function displayGalleryPreview(galleryData) {
    const galleryContainer = document.getElementById('gallery-preview');
    if (!galleryContainer) {
        return;
    }
    
    if (galleryData.length === 0) {
        galleryContainer.innerHTML = '<p style="text-align: center; color: #cccccc;">Galerie wird bald gefüllt.</p>';
        return;
    }
    
    // Display only first 6 images as preview for homepage (galleryData is already ordered by getOrderedImages)
    const previewImages = galleryData.slice(0, 6);
    const html = previewImages.map((item, index) => `
        <div class="gallery-preview-item" data-index="${index}">
            <img src="${item.url || item.image}" alt="${item.name || item.title || 'Training'}" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
    `).join('');
    galleryContainer.innerHTML = html;
    
    // Add click events to preview items for lightbox
    const previewItems = galleryContainer.querySelectorAll('.gallery-preview-item');
    previewItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            
            // Get all images from localStorage for full lightbox navigation
            const allImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
            const validAllImages = allImages.filter(item => 
                item && 
                (item.url || item.image) && 
                (item.url || item.image).trim() !== '' && 
                (item.name || item.title) && 
                (item.name || item.title).trim() !== ''
            );
            
            // Sort by order
            validAllImages.sort((a, b) => {
                return (a.order || 0) - (b.order || 0);
            });
            
            // Find the index of the clicked image in the full gallery
            const clickedImageUrl = img.src;
            const fullIndex = validAllImages.findIndex(img => (img.url || img.image) === clickedImageUrl);
            
            openLightbox(img.src, img.alt, fullIndex >= 0 ? fullIndex : index);
        });
    });

    // Load and display homepage popup
    loadHomepagePopup();
}

function loadHomepagePopup() {
    const popupSettings = JSON.parse(localStorage.getItem('homepagePopup') || '{}');

    if (!popupSettings.enabled) {
        return; // Popup is disabled
    }

    const popup = document.getElementById('homepage-popup');
    const popupImg = document.getElementById('popup-img');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');

    if (!popup || !popupImg || !popupTitle || !popupDescription) {
        return;
    }

    // Set popup content
    popupImg.src = popupSettings.image || '';
    popupImg.alt = popupSettings.title || 'Popup Image';
    popupTitle.textContent = popupSettings.title || '';
    popupDescription.innerHTML = popupSettings.description ? popupSettings.description.replace(/\n/g, '<br>') : '';

    // Show popup
    popup.style.display = 'flex';

    // Add close functionality for both desktop and mobile
    const closeBtnDesktop = popup.querySelector('.popup-close-desktop');
    const closeBtnMobile = popup.querySelector('.popup-close-mobile');

    if (closeBtnDesktop) {
        closeBtnDesktop.onclick = function() {
            popup.style.display = 'none';
        };
    }

    if (closeBtnMobile) {
        closeBtnMobile.onclick = function() {
            popup.style.display = 'none';
        };
    }

    // Close on background click
    popup.onclick = function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    };

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    });
}

// Listen for popup setting updates from admin
window.addEventListener('popupSettingsUpdated', function() {
    loadHomepagePopup();
});

function loadPricesData() {
    const saved = localStorage.getItem('prices');
    if (saved) {
        const prices = JSON.parse(saved);
        displayPrices(prices);
    }
}


function displayPrices(pricesData) {
    // This function can be used to display prices dynamically
    // For now, the static prices page will be used
    console.log('Prices loaded:', pricesData);
}

// Load admin data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
});

// Listen for gallery updates from admin
window.addEventListener('galleryUpdated', function() {
    loadGalleryImages();
});

// Listen for opening hours updates from admin
window.addEventListener('openingHoursUpdated', function() {
    loadOpeningHours();
});

// Listen for sports content updates from admin
window.addEventListener('sportsContentUpdated', function() {
    loadSportsContent();
});

// Sports Content Management
function loadSportsContent() {
    const savedSports = JSON.parse(localStorage.getItem('sportsContent') || '{}');
    
    // Update Muay Thai card
    const muayThaiCard = document.querySelector('.sport-card[onclick*="muay-thai"]');
    if (muayThaiCard) {
        const title = muayThaiCard.querySelector('h3');
        const desc = muayThaiCard.querySelector('p');
        if (title) title.textContent = savedSports['muay-thai-title'] || 'Muay Thai–K1–Kickboxen';
        if (desc) desc.textContent = savedSports['muay-thai-desc'] || 'Dynamisches Kampfsporttraining mit kraftvollen Techniken';
    }
    
    // Update MMA card
    const mmaCard = document.querySelector('.sport-card[onclick*="mma"]');
    if (mmaCard) {
        const title = mmaCard.querySelector('h3');
        const desc = mmaCard.querySelector('p');
        if (title) title.textContent = savedSports['mma-title'] || 'MMA';
        if (desc) desc.textContent = savedSports['mma-desc'] || 'Mixed Martial Arts - Vielseitige Kampftechniken';
    }
    
    // Update BJJ card
    const bjjCard = document.querySelector('.sport-card[onclick*="bjj"]');
    if (bjjCard) {
        const title = bjjCard.querySelector('h3');
        const desc = bjjCard.querySelector('p');
        if (title) title.textContent = savedSports['bjj-title'] || 'Brazilian Jiu-Jitsu';
        if (desc) desc.textContent = savedSports['bjj-desc'] || 'Technisch anspruchsvolle Bodenkampf-Kunst';
    }
    
    // Update Lady Kickboxen card
    const ladyCard = document.querySelector('.sport-card[onclick*="lady-kickboxen"]');
    if (ladyCard) {
        const title = ladyCard.querySelector('h3');
        const desc = ladyCard.querySelector('p');
        if (title) title.textContent = savedSports['lady-title'] || 'Lady Kickboxen';
        if (desc) desc.textContent = savedSports['lady-desc'] || 'Speziell für Frauen zugeschnittenes Training';
    }
    
    // Update Kinder & Jugend card
    const kinderCard = document.querySelector('.sport-card[onclick*="kinder-jugend"]');
    if (kinderCard) {
        const title = kinderCard.querySelector('h3');
        const desc = kinderCard.querySelector('p');
        if (title) title.textContent = savedSports['kinder-title'] || 'Kinder- & Jugend-Kickboxen';
        if (desc) desc.textContent = savedSports['kinder-desc'] || 'Altersgerechtes Training für die Kleinen';
    }
    
    // Update sportInfo object for popups
    if (window.sportInfo) {
        window.sportInfo['muay-thai'] = savedSports['muay-thai-popup'] || window.sportInfo['muay-thai'];
        window.sportInfo['mma'] = savedSports['mma-popup'] || window.sportInfo['mma'];
        window.sportInfo['bjj'] = savedSports['bjj-popup'] || window.sportInfo['bjj'];
        window.sportInfo['lady-kickboxen'] = savedSports['lady-popup'] || window.sportInfo['lady-kickboxen'];
        window.sportInfo['kinder-jugend'] = savedSports['kinder-popup'] || window.sportInfo['kinder-jugend'];
    }
}

// Probetraining Popup Management
function openProbetrainingPopup() {
    const popup = document.getElementById('probetraining-popup');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeProbetrainingPopup() {
    const popup = document.getElementById('probetraining-popup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('probetraining-popup');
    if (popup && event.target === popup) {
        closeProbetrainingPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProbetrainingPopup();
    }
});

// Cookie Banner Management
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (!cookieChoice) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }
    
    // Accept cookies
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieBanner.classList.remove('show');
        
        // Load Google Fonts (if not already loaded)
        if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    });
    
    // Decline cookies
    declineBtn.addEventListener('click', function() {
        localStorage.setItem('cookieChoice', 'declined');
        cookieBanner.classList.remove('show');
        
        // Remove Google Fonts if loaded
        const googleFonts = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (googleFonts) {
            googleFonts.remove();
        }
    });
});

// Utility functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatPhoneNumber(phone) {
    return phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getRandomInt,
        formatPhoneNumber
    };
} 