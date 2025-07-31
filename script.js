// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Add staggered animation for cards
            if (entry.target.classList.contains('service-card') || entry.target.classList.contains('benefit-item')) {
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                entry.target.style.animationDelay = `${delay}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .stat, .about-content, .contact-content, .contact-method');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add floating animation to service icons
    document.querySelectorAll('.service-icon').forEach(icon => {
        icon.classList.add('float');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.service) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
        this.reset();
        
        // In a real application, you would send the data to your server here
        console.log('Form data:', data);
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 
                    'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
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
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: transform 0.3s ease;
        }
        .notification-close:hover {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Enhanced service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Enhanced benefit items hover effect
document.querySelectorAll('.benefit-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(15deg)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
        font-weight: 700;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced partner logos interaction
document.querySelectorAll('.partner').forEach(partner => {
    partner.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08) translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.25)';
    });
    
    partner.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// Contact method hover effects
document.querySelectorAll('.contact-method').forEach(method => {
    method.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    method.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add loading animation for form submission
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const target = parseInt(statNumber.textContent);
                statNumber.textContent = '0';
                statNumber.classList.add('animated');
                animateCounter(statNumber, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Services Carousel Functionality
function initServicesCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let autoSlideInterval;

    if (!carouselTrack) return;

    const totalSlides = Math.ceil(carouselTrack.children.length / 2);
    const slideWidth = 100 / totalSlides;

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * slideWidth;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function startAutoSlide() {
        // Clear any existing interval first
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Initialize first slide
    goToSlide(0);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    });

    // Pause auto-slide on hover
    carouselTrack.addEventListener('mouseenter', stopAutoSlide);
    carouselTrack.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });

    carouselTrack.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    carouselTrack.addEventListener('touchend', () => {
        const diffX = startX - endX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(currentSlide);
            }
        }
        
        startAutoSlide(); // Restart auto-slide
    });

    // Start auto-slide immediately
    startAutoSlide();

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Debug logging
    console.log('Carousel initialized with', totalSlides, 'slides');
    console.log('Auto-slide interval set to 3 seconds');
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are properly loaded
    setTimeout(() => {
        initServicesCarousel();
        initGalleryCarousel();
    }, 100);
});

// Gallery Carousel Functionality
function initGalleryCarousel() {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;

    let currentPosition = 0;
    const itemWidth = 100; // 100% width for one image per slide
    const totalItems = galleryTrack.children.length;
    const maxPosition = -(totalItems - 1) * itemWidth; // Show 1 item at a time

    function slideGallery() {
        currentPosition -= itemWidth;
        if (currentPosition < maxPosition) {
            currentPosition = 0;
        }
        galleryTrack.style.transform = `translateX(${currentPosition}%)`;
    }

    // Auto-slide every 3 seconds
    setInterval(slideGallery, 3000);
}

// Also initialize on window load as backup
window.addEventListener('load', () => {
    if (!document.querySelector('.carousel-track').style.transform) {
        initServicesCarousel();
    }
});

// Quote Popup Functionality
const quotePopup = document.getElementById('quote-popup');
const getQuoteBtn = document.getElementById('get-quote-btn');
const closeQuotePopup = document.getElementById('close-quote-popup');
const quoteForm = document.querySelector('.quote-form');

// Multi-step form functionality
let currentStep = 1;
const totalSteps = 5;

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    
    // Show current step
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    
    // Update progress
    updateProgress(step);
    
    // Update navigation buttons
    updateNavigation(step);
}

function updateProgress(step) {
    const progressFill = document.getElementById('progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Update progress bar
    const progress = (step / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update step indicators
    progressSteps.forEach((stepEl, index) => {
        const stepNumber = index + 1;
        stepEl.classList.remove('active', 'completed');
        
        if (stepNumber === step) {
            stepEl.classList.add('active');
        } else if (stepNumber < step) {
            stepEl.classList.add('completed');
        }
    });
}

function updateNavigation(step) {
    const prevBtn = document.querySelector('.prev-step-btn');
    const nextBtn = document.querySelector('.next-step-btn');
    
    if (prevBtn) {
        prevBtn.style.display = step === 1 ? 'none' : 'block';
    }
    
    if (nextBtn) {
        nextBtn.textContent = step === totalSteps ? 'Submit' : 'Next';
    }
}

function validateStep(step) {
    const currentStepEl = document.querySelector(`[data-step="${step}"]`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            return false;
        }
    }
    
    return true;
}

function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            
            // If moving to review step, populate summary
            if (currentStep === totalSteps) {
                populateReviewSummary();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function populateReviewSummary() {
    const summary = document.getElementById('review-summary');
    const formData = new FormData(quoteForm);
    
    const reviewData = {
        'Full Name': formData.get('full-name'),
        'Email': formData.get('email'),
        'Phone': formData.get('phone'),
        'Service Type': formData.get('service-type'),
        'Project Scale': formData.get('project-size'),
        'Project Details': formData.get('project-details'),
        'Budget': formData.get('budget') || 'Not specified',
        'Timeline': formData.get('timeline') || 'Not specified'
    };
    
    summary.innerHTML = Object.entries(reviewData)
        .map(([label, value]) => `
            <div class="review-item">
                <span class="review-label">${label}:</span>
                <span class="review-value">${value}</span>
            </div>
        `).join('');
}

// Event listeners for form navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form
    showStep(1);
    
    // Next step buttons
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', nextStep);
    });
    
    // Previous step buttons
    document.querySelectorAll('.prev-step-btn').forEach(btn => {
        btn.addEventListener('click', prevStep);
    });
    
    // Form submission
    quoteForm.addEventListener('submit', (e) => {
        if (!validateStep(currentStep)) {
            e.preventDefault();
        }
    });
});

// Get Quote button handlers
const heroGetQuoteBtn = document.getElementById('hero-get-quote-btn');

function openQuotePopup() {
    quotePopup.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form to first step
    currentStep = 1;
    showStep(1);
    quoteForm.reset();
}

getQuoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openQuotePopup();
});

heroGetQuoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openQuotePopup();
});

closeQuotePopup.addEventListener('click', () => {
    quotePopup.classList.remove('active');
    document.body.style.overflow = 'auto';
});

quotePopup.addEventListener('click', (e) => {
    if (e.target === quotePopup) {
        quotePopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input-field');
const sendMessageBtn = document.getElementById('send-message-btn');

// Chatbot responses
const chatbotResponses = {
    greetings: [
        "Hello! How can I help you with your supply needs today?",
        "Hi there! I'm here to assist you with sourcing and procurement.",
        "Welcome! What can I help you find today?"
    ],
    services: [
        "We offer construction materials, solar & electrical products, vehicle importation, and industrial components. Which service interests you?",
        "Our main services include building supplies, solar solutions, vehicle imports, and industrial parts. What are you looking for?",
        "We specialize in construction, solar, automotive, and industrial supplies. Which area do you need help with?"
    ],
    quote: [
        "Great! I can help you get a quote. Please click the 'Get Quote' button in the navigation or tell me more about your project.",
        "I'd be happy to help you get a quote. You can use our quote form or share your requirements with me.",
        "Perfect! For a detailed quote, please use our quote form or let me know your specific needs."
    ],
    contact: [
        "You can reach us at +254 XXX XXX XXX or email us at info@shockwave.com. We're available 24/7!",
        "Contact us anytime at +254 XXX XXX XXX or info@shockwave.com. We're here to help!",
        "We're available 24/7 at +254 XXX XXX XXX or info@shockwave.com. How can we assist you?"
    ],
    pricing: [
        "Our pricing varies based on your specific needs and quantities. Would you like to get a custom quote?",
        "We offer competitive pricing for all our services. Let me help you get a detailed quote.",
        "Pricing depends on your requirements. I can connect you with our team for a personalized quote."
    ],
    pricing: [
        "Our pricing varies based on your specific needs and quantities. Would you like to get a custom quote?",
        "We offer competitive pricing for all our services. Let me help you get a detailed quote.",
        "Pricing depends on your requirements. I can connect you with our team for a personalized quote."
    ],
    default: [
        "I'm here to help with your supply needs. Could you tell me more about what you're looking for?",
        "I'd be happy to assist you. What specific products or services are you interested in?",
        "Let me help you find what you need. What type of supplies are you looking for?"
    ]
};

function getRandomResponse(category) {
    const responses = chatbotResponses[category] || chatbotResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

function addMessage(message, isUser = false, options = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let optionsHTML = '';
    if (options && !isUser) {
        optionsHTML = `
            <div class="chatbot-options">
                ${options.map(option => `<button class="chatbot-option" data-option="${option.value}">${option.label}</button>`).join('')}
            </div>
        `;
    }
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            ${optionsHTML}
        </div>
        <div class="message-time">${timeString}</div>
    `;
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Add event listeners to option buttons
    if (options && !isUser) {
        messageDiv.querySelectorAll('.chatbot-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const optionValue = btn.getAttribute('data-option');
                handleOptionClick(optionValue);
            });
        });
    }
}

function showThinkingBubble() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking-bubble';
    thinkingDiv.innerHTML = `
        <span>Thinking</span>
        <div class="thinking-dots">
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
        </div>
    `;
    
    chatbotMessages.appendChild(thinkingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    return thinkingDiv;
}

function handleOptionClick(option) {
    addMessage(option, true);
    
    const thinkingBubble = showThinkingBubble();
    
    setTimeout(() => {
        thinkingBubble.remove();
        
        let response, options;
        
        switch(option) {
            case 'construction':
                response = "Great choice! We offer premium construction materials including steel, roofing, plumbing, and electrical components. Would you like to know more about:";
                options = [
                    { value: 'steel', label: '🏗️ Steel & Roofing' },
                    { value: 'plumbing', label: '🔧 Plumbing Systems' },
                    { value: 'electrical', label: '⚡ Electrical Components' },
                    { value: 'quote', label: '💰 Get Quote' }
                ];
                break;
            case 'solar':
                response = "Excellent! We provide solar panels, inverters, batteries, and lighting solutions. What interests you most?";
                options = [
                    { value: 'panels', label: '☀️ Solar Panels' },
                    { value: 'batteries', label: '🔋 Battery Storage' },
                    { value: 'lighting', label: '💡 Lighting Solutions' },
                    { value: 'quote', label: '💰 Get Quote' }
                ];
                break;
            case 'vehicles':
                response = "Perfect! We handle vehicle importation for both personal and commercial use. What type of vehicle do you need?";
                options = [
                    { value: 'personal', label: '🚗 Personal Vehicle' },
                    { value: 'commercial', label: '🚛 Commercial Vehicle' },
                    { value: 'process', label: '📋 Import Process' },
                    { value: 'quote', label: '💰 Get Quote' }
                ];
                break;
            case 'industrial':
                response = "Smart choice! We supply industrial components like oil seals, bearings, and mechanical parts. What do you need?";
                options = [
                    { value: 'seals', label: '🔧 Oil Seals' },
                    { value: 'bearings', label: '⚙️ Bearings' },
                    { value: 'parts', label: '🔩 Mechanical Parts' },
                    { value: 'quote', label: '💰 Get Quote' }
                ];
                break;
            default:
                response = processUserMessage(option);
                options = null;
        }
        
        addMessage(response, false, options);
    }, 1500);
}

function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return getRandomResponse('greetings');
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what') || lowerMessage.includes('offer')) {
        return getRandomResponse('services');
    } else if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return getRandomResponse('quote');
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        return getRandomResponse('contact');
    } else {
        return getRandomResponse('default');
    }
}

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.add('active');
});

closeChatbot.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Add event listeners for initial option buttons
document.addEventListener('DOMContentLoaded', () => {
    const initialOptions = document.querySelectorAll('.chatbot-option');
    initialOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const optionValue = btn.getAttribute('data-option');
            handleOptionClick(optionValue);
        });
    });
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Show thinking bubble
        const thinkingBubble = showThinkingBubble();
        
        // Simulate typing delay with thinking bubble
        setTimeout(() => {
            thinkingBubble.remove();
            const response = processUserMessage(message);
            
            // Add options for certain responses
            let options = null;
            if (message.toLowerCase().includes('service') || message.toLowerCase().includes('what') || message.toLowerCase().includes('offer')) {
                options = [
                    { value: 'construction', label: '🏗️ Construction Materials' },
                    { value: 'solar', label: '🔌 Solar & Electrical' },
                    { value: 'vehicles', label: '🚗 Vehicle Importation' },
                    { value: 'industrial', label: '⚙️ Industrial Components' }
                ];
            }
            
            addMessage(response, false, options);
        }, 1500);
    }
}

sendMessageBtn.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Know Us Carousel Functionality
function initKnowUsCarousel() {
    const track = document.querySelector('.know-us-track');
    const dots = document.querySelectorAll('.know-us-dot');
    const prevBtn = document.querySelector('.know-us-prev');
    const nextBtn = document.querySelector('.know-us-next');
    const carousel = document.querySelector('.know-us-carousel');
    let currentSlide = 0;
    const totalSlides = 5;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 20;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }

    // Touch/Swipe support for mobile
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const translateX = -currentSlide * 20 + (diff / carousel.offsetWidth) * 20;
        track.style.transform = `translateX(${translateX}%)`;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        
        const diff = currentX - startX;
        const threshold = carousel.offsetWidth * 0.3;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            goToSlide(currentSlide);
        }
    }

    // Mouse drag support for desktop
    function handleMouseDown(e) {
        startX = e.clientX;
        isDragging = true;
        track.style.transition = 'none';
        carousel.style.cursor = 'grabbing';
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX;
        const diff = currentX - startX;
        const translateX = -currentSlide * 20 + (diff / carousel.offsetWidth) * 20;
        track.style.transform = `translateX(${translateX}%)`;
    }

    function handleMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.cursor = 'grab';
        
        const diff = currentX - startX;
        const threshold = carousel.offsetWidth * 0.3;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        } else {
            goToSlide(currentSlide);
        }
    }

    // Event listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch events for mobile
    carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd);

    // Mouse events for desktop
    carousel.addEventListener('mousedown', handleMouseDown);
    carousel.addEventListener('mousemove', handleMouseMove);
    carousel.addEventListener('mouseup', handleMouseUp);
    carousel.addEventListener('mouseleave', handleMouseUp);

    // Prevent context menu on right click
    carousel.addEventListener('contextmenu', (e) => e.preventDefault());

    // Auto-slide every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on interaction
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Pause auto-slide on touch
    carousel.addEventListener('touchstart', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('touchend', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initKnowUsCarousel();
});

// Cookie Consent Functionality
function showCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookieBanner();
    showNotification('Cookies accepted! Thank you for your preference.', 'success');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    hideCookieBanner();
    showNotification('Cookies declined. Some features may be limited.', 'info');
}

function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.classList.remove('show');
    }
}

// Shop functionality (for main page)
function goToShop(category) {
    const shopPages = {
        'automotive': 'automotive-shop.html',
        'building': 'building-shop.html',
        'renewable': 'renewable-shop.html'
    };
    
    if (shopPages[category]) {
        window.location.href = shopPages[category];
    }
}

// Initialize cookie banner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initKnowUsCarousel();
    showCookieBanner();
});

console.log('Shockwave website loaded successfully with enhanced features, carousel, chatbot, quote form, shop, and cookie consent!'); 