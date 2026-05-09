// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const heroVideo = document.getElementById('hero-video');
const quoteForm = document.getElementById('quote-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Video autoplay with fallback
function initVideo() {
    if (heroVideo) {
        // Try to play the video
        heroVideo.play().catch(error => {
            console.log('Autoplay was prevented:', error);
            // No play button overlay - video will just not autoplay
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you for your inquiry! We will contact you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : '#ff6b6b'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize video
    initVideo();
    
    // Observe equipment cards
    document.querySelectorAll('.equipment-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    // Observe testimonials
    document.querySelectorAll('.testimonial').forEach(testimonial => {
        testimonial.style.opacity = '0';
        observer.observe(testimonial);
    });
    
    // Add hover effects to equipment cards
    document.querySelectorAll('.equipment-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for analytics (placeholder)
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            console.log(`Link clicked: ${linkText}`);
            // Add actual analytics tracking here
        });
    });
});

// Phone number formatting
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
});

// Date validation - prevent past dates
document.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
    
    input.addEventListener('change', function() {
        if (this.value < today) {
            this.value = today;
            showNotification('Please select a future date for your event.', 'error');
        }
    });
});

// Equipment detail modal (placeholder functionality)
document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const equipmentName = this.closest('.equipment-card').querySelector('h3').textContent;
        showNotification(`More details about ${equipmentName} coming soon!`, 'info');
    });
});

// Lazy loading for images (if needed)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization - throttle scroll events
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
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Add any scroll-based animations here
}, 100));

// Keyboard hire specific functionality
function initKeyboardHireFeatures() {
    // Add keyboard-specific search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search keyboards...';
    searchInput.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 10px 15px;
        border: 2px solid #ff6b6b;
        border-radius: 25px;
        background: white;
        z-index: 999;
        display: none;
    `;
    
    document.body.appendChild(searchInput);
    
    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.equipment-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initKeyboardHireFeatures();
    lazyLoadImages();
    initFAQAccordion();
});

// Emergency contact button
function addEmergencyButton() {
    const emergencyBtn = document.createElement('div');
    emergencyBtn.innerHTML = '🚨 Emergency';
    emergencyBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        transition: all 0.3s ease;
        font-weight: 600;
    `;
    
    emergencyBtn.addEventListener('click', () => {
        showNotification('Emergency Hotline: +212 6XX-XXX-XXX (Available 24/7)', 'success');
    });
    
    emergencyBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    emergencyBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(emergencyBtn);
}

// Add emergency button on load
window.addEventListener('load', () => {
    addEmergencyButton();
});

// Console branding
console.log('%c🎹 Keyboard Hire Marrakech', 'font-size: 20px; color: #ff6b6b; font-weight: bold;');
console.log('%cPremium Keyboard Rental Services in Marrakech', 'font-size: 14px; color: #333;');
