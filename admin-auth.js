/* ============================================
   Admin Authentication - Simple LocalStorage Based
   ============================================ */

// Default admin credentials (change these!)
const DEFAULT_ADMIN_EMAIL = 'admin@ranaelectrical.com';
const DEFAULT_ADMIN_PASSWORD = 'rana@4244';

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

/**
 * Login function
 */
function login(email, password) {
    // Simple authentication (in production, use proper backend)
    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        return true;
    }
    return false;
}

/**
 * Logout function
 */
function logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
}

/**
 * Get current admin email
 */
function getAdminEmail() {
    return localStorage.getItem('adminEmail') || '';
}

// Auto-handle login form if on login page
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('errorMessage');
        
        if (login(email, password)) {
            window.location.href = 'dashboard.html';
        } else {
            errorDiv.textContent = 'Invalid email or password';
            errorDiv.classList.add('show');
        }
    });
}
