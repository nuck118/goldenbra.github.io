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
                    <li class="admin-link">
                        <a href="login.html" class="admin-login">
                            <i class="fas fa-lock"></i>
                            <span>Admin</span>
                        </a>
                        <!--<div class="admin-dropdown">
                            <form id="adminLoginForm">
                                <div class="form-group">
                                    <label for="username">Username:</label>
                                    <input type="text" id="username" required>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password:</label>
                                    <input type="password" id="password" required>
                                </div>
                                <button type="submit" class="btn">Login</button>
                            </form>
                        </div>-->
                    </li>
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
                    <li>
                        <a href="admin/login.html" <!--class="admin-login-mobile"-->>
                            <i class="fas fa-lock"></i>
                            Admin Login
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Insert header at top of body
    document.body.insertBefore(header, document.body.firstChild);

    // Select elements after insertion
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-nav-close');
    const adminLink = document.querySelector('.admin-link');
    const adminDropdown = document.querySelector('.admin-dropdown');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const mobileAdminLink = document.querySelector('.admin-login-mobile');

    // Mobile menu functionality
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileClose.addEventListener('click', () => {
        closeMobileMenu();
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
        if (!adminLink.contains(e.target) && !adminDropdown.contains(e.target)) {
            adminDropdown.classList.remove('active');
        }
    });

    // Admin login functionality
    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        adminDropdown.classList.toggle('active');
    });

    mobileAdminLink.addEventListener('click', (e) => {
        e.preventDefault();
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');
        handleAdminLogin(username, password);
    });

    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        handleAdminLogin(username, password);
    });

    // Set active link based on current page
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

    function handleAdminLogin(username, password) {
        if (username === 'admin' && password === 'securepassword') {
            window.location.href = "admin/dashboard.html";
        } else {
            alert('Invalid credentials');
        }
    }
});
