// Simple authentication (for demonstration - implement proper auth in production)
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Replace with proper authentication
    if(username === 'admin' && password === 'securepassword') {
        localStorage.setItem('authenticated', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
});

// Content editing functionality
if(localStorage.getItem('authenticated') === 'true') {
    // Enable editable content
    document.querySelectorAll('[data-editable]').forEach(element => {
        element.contentEditable = true;
        element.addEventListener('blur', () => {
            // Save changes to localStorage or backend
        });
    });
} else {
    window.location.href = 'login.html';
}