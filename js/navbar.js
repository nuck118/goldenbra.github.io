document.addEventListener('DOMContentLoaded', function() {
    // Create navigation structure
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div class="container">
            <h1 class="logo">GOLDENBRA</h1>
            <nav class="desktop-nav">
                <ul class="nav-menu">
                    ${createNavLinks()}
                </ul>
            </nav>
            <button class="mobile-menu-toggle" aria-label="Open menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <div class="mobile-nav">
            <div class="mobile-nav-content">
                <button class="mobile-nav-close" aria-label="Close menu">
                    <i class="fas fa-times"></i>
                </button>
                <ul class="mobile-nav-menu">
                    ${createNavLinks()}
                </ul>
            </div>
        </div>
    `;

    // Insert header at top of body
    document.body.insertBefore(header, document.body.firstChild);

    // Add mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-nav-close');

    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileClose.addEventListener('click', () => {
        closeMobileMenu();
    });

    // Close mobile menu if clicking outside of it
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Add active class to current page link
    setActiveLink();

    function createNavLinks() {
        return `
            <li><a href="../index.html">Home</a></li>
            <li><a href="mission.html">Mission</a></li>
            <li><a href="profile.html">Profile</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="details.html">Details</a></li>
            <li><a href="contact.html">Contact</a></li>
        `;
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const links = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');
        
        links.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
});
