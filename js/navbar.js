document.addEventListener('DOMContentLoaded', function() {
    // Create navigation structure
    const header = document.createElement('header');
    header.className = 'bg-gray-900 text-white py-4 shadow-md';
    header.innerHTML = `
        <div class="container mx-auto flex justify-between items-center px-6">
            <h1 class="text-2xl font-bold">GOLDENBRA</h1>
            <nav class="hidden md:flex space-x-6">
                ${createNavLinks()}
                <li class="relative">
                    <a href="login.html" class="flex items-center space-x-2 hover:text-blue-400">
                        <i class="fas fa-lock"></i>
                        <span>Admin</span>
                    </a>
                </li>
            </nav>
            <button class="md:hidden text-2xl" id="mobile-menu-toggle" aria-label="Open menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        
        <div id="mobile-nav" class="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-6 text-xl hidden">
            <button id="mobile-nav-close" class="absolute top-6 right-6 text-3xl text-white" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
            <ul class="text-center space-y-4">
                ${createNavLinks()}
                <li>
                    <a href="admin/login.html" class="flex items-center space-x-2">
                        <i class="fas fa-lock"></i>
                        <span>Admin Login</span>
                    </a>
                </li>
            </ul>
        </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // Select elements after insertion
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-nav-close');

    // Mobile menu functionality
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    });

    mobileClose.addEventListener('click', () => {
        closeMobileMenu();
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    function createNavLinks() {
        return `
            <li><a href="../index.html" class="hover:text-blue-400">Home</a></li>
            <li><a href="pagesmission.html" class="hover:text-blue-400">Mission</a></li>
            <li><a href="profile.html" class="hover:text-blue-400">Profile</a></li>
            <li><a href="services.html" class="hover:text-blue-400">Services</a></li>
            <li><a href="details.html" class="hover:text-blue-400">Details</a></li>
            <li><a href="contact.html" class="hover:text-blue-400">Contact</a></li>
        `;
    }

    function closeMobileMenu() {
        mobileNav.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
});



/*document.addEventListener('DOMContentLoaded', function() {
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
