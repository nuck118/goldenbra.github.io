// script.js - Main JavaScript for GOLDENBRA Website

// ===== Global Variables =====
const authToken = localStorage.getItem('authToken'); // For admin session management
const contentCache = {}; // Cache for loaded content

// ===== Navigation Functions =====
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    // Close Mobile Menu on Outside Click
    document.addEventListener('click', (e) => {
        if (!mobileNav?.contains(e.target) && !mobileToggle?.contains(e.target)) {
            mobileNav?.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Load Dynamic Content
    loadPageContent();
});

// ===== Content Loading Functions =====
function loadPageContent() {
    // Home Page Content
    if (document.querySelector('.hero-section')) {
        loadTextContent('.hero-section h1', 'home.heroTitle', 'Building Zambia\'s Future');
        loadTextContent('.hero-section p', 'home.heroSubtitle', 'Quality construction solutions since 2015');
        loadImage('hero-image', 'home.heroImage', 'images/hero-default.jpg');

        // Highlights
        const highlights = [
            localStorage.getItem('home.highlight1') || '150+ Projects Completed',
            localStorage.getItem('home.highlight2') || '98% Client Satisfaction',
            localStorage.getItem('home.highlight3') || 'Certified Professionals'
        ];
        document.querySelectorAll('.highlight-card h3').forEach((card, index) => {
            card.textContent = highlights[index];
        });
    }

    // Mission Page Content
    if (document.querySelector('.mission-content')) {
        loadTextContent('.mission-content .highlight', 'mission.statement', 
            `At <strong>GOLDENBRA</strong>, our mission is to deliver exceptional construction services...`);

        // Core Values
        const coreValues = [
            localStorage.getItem('mission.value1') || 'Quality Assurance',
            localStorage.getItem('mission.value2') || 'Client-Centric Approach',
            localStorage.getItem('mission.value3') || 'Sustainable Practices'
        ];
        document.querySelectorAll('.mission-item h3').forEach((item, index) => {
            item.textContent = coreValues[index];
        });
    }

    // Services Page Content
    if (document.querySelector('.services-grid')) {
        const services = [
            localStorage.getItem('services.service1') || 'Civil Engineering',
            localStorage.getItem('services.service2') || 'Mechanical Engineering',
            localStorage.getItem('services.service3') || 'Electrical Engineering'
        ];
        document.querySelectorAll('.service-item h3').forEach((item, index) => {
            item.textContent = services[index];
        });
    }

    // Contact Page Content
    if (document.querySelector('.contact-info')) {
        const contactData = {
            address: localStorage.getItem('contact.address') || 'Plot 48 Weighbridge Area, Solwezi, Zambia',
            phone: localStorage.getItem('contact.phone') || '+260 966 994 956',
            email: localStorage.getItem('contact.email') || 'info@goldenbra.com'
        };
        document.querySelectorAll('.contact-info p').forEach(item => {
            if (item.textContent.includes('Plot')) item.textContent = contactData.address;
            if (item.textContent.includes('+260')) item.textContent = contactData.phone;
            if (item.textContent.includes('@')) item.textContent = contactData.email;
        });
    }

    // Profile Page Content
    if (document.querySelector('.profile-content')) {
        const profileData = {
            history: localStorage.getItem('profile.history') || 'Founded in Solwezi...',
            achievements: localStorage.getItem('profile.achievements') || '150+ successful projects...',
            team: localStorage.getItem('profile.team') || 'Experienced professionals...'
        };
        document.querySelectorAll('.profile-item p').forEach((item, index) => {
            const values = Object.values(profileData);
            if (values[index]) item.textContent = values[index];
        });
    }
}

// ===== Helper Functions =====
function loadTextContent(selector, storageKey, defaultValue) {
    const element = document.querySelector(selector);
    if (element) {
        const storedContent = localStorage.getItem(storageKey);
        if (storedContent) {
            element.innerHTML = storedContent;
        } else if (defaultValue) {
            element.innerHTML = defaultValue;
        }
    }
}

function loadImage(elementId, storageKey, defaultImage) {
    const element = document.getElementById(elementId);
    if (element) {
        const storedImage = localStorage.getItem(storageKey);
        if (storedImage) {
            element.src = storedImage;
        } else if (defaultImage) {
            element.src = defaultImage;
        }
    }
}

// ===== Admin Session Management =====
if (window.location.pathname.includes('admin')) {
    if (!authToken) {
        window.location.href = 'login.html';
    }

    // Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('authToken');
            window.location.href = '../index.html';
        });
    }
}

// ===== Event Listeners =====
document.addEventListener('click', (e) => {
    // Handle external links
    if (e.target.tagName === 'A' && e.target.href.startsWith('http')) {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    }
});




/* // Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});