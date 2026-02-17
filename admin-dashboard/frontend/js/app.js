/* ============================================
   Admin Dashboard JavaScript
   Handles Authentication, CRUD Operations, UI
   ============================================ */

// API Configuration
const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:3000/api' 
    : '/api';

// State Management
let currentUser = null;
let currentEditingServiceId = null;
let allServices = [];

// ============================================
// Initialize App
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
});

// ============================================
// Authentication
// ============================================

function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        verifyToken(token);
    } else {
        showLoginPage();
    }
}

async function verifyToken(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.admin;
            showDashboard();
        } else {
            localStorage.removeItem('adminToken');
            showLoginPage();
        }
    } catch (error) {
        console.error('Token verification error:', error);
        localStorage.removeItem('adminToken');
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('dashboardPage').classList.remove('active');
}

function showDashboard() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    
    if (currentUser) {
        document.getElementById('adminName').textContent = currentUser.name || 'Admin';
    }
    
    loadDashboardStats();
    showPage('dashboard');
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Navigation
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Global Search
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', handleGlobalSearch);
    }
    
    // Service Form
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleServiceSubmit);
    }
    
    // Image Preview
    const serviceImage = document.getElementById('serviceImage');
    if (serviceImage) {
        serviceImage.addEventListener('change', handleImagePreview);
    }
}

// ============================================
// Login Handler
// ============================================

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('adminToken', data.token);
            currentUser = data.admin;
            showDashboard();
        } else {
            errorDiv.textContent = data.message || 'Login failed';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.classList.add('show');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminToken');
        currentUser = null;
        showLoginPage();
    }
}

// ============================================
// Page Navigation
// ============================================

function showPage(pageName) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    const pageMap = {
        'dashboard': 'dashboardHome',
        'services': 'servicesPage',
        'addService': 'addServicePage'
    };
    
    const sectionId = pageMap[pageName];
    if (sectionId) {
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-page="${pageName}"]`)?.classList.add('active');
        
        // Load data for specific pages
        if (pageName === 'services') {
            loadServices();
        } else if (pageName === 'dashboard') {
            loadDashboardStats();
        } else if (pageName === 'addService') {
            resetServiceForm();
        }
    }
}

// ============================================
// Dashboard Stats
// ============================================

async function loadDashboardStats() {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/services`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const services = data.services || [];
            
            const total = services.length;
            const available = services.filter(s => s.status === 'available').length;
            const unavailable = services.filter(s => s.status === 'unavailable').length;
            const categories = new Set(services.map(s => s.category)).size;
            
            document.getElementById('totalServices').textContent = total;
            document.getElementById('availableServices').textContent = available;
            document.getElementById('unavailableServices').textContent = unavailable;
            document.getElementById('totalCategories').textContent = categories;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ============================================
// Services Management
// ============================================

async function loadServices() {
    const tbody = document.getElementById('servicesTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="loading">Loading services...</td></tr>';
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/services`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            allServices = data.services || [];
            renderServicesTable(allServices);
        } else {
            tbody.innerHTML = '<tr><td colspan="6" class="loading">Error loading services</td></tr>';
        }
    } catch (error) {
        console.error('Error loading services:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="loading">Network error. Please try again.</td></tr>';
    }
}

function renderServicesTable(services) {
    const tbody = document.getElementById('servicesTableBody');
    
    if (services.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">No services found</td></tr>';
        return;
    }
    
    tbody.innerHTML = services.map(service => `
        <tr>
            <td class="service-image-cell">
                ${service.image ? `<img src="${API_BASE_URL.replace('/api', '')}${service.image}" alt="${service.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23e2e8f0%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 text-anchor=%22middle%22 fill=%22%2364748b%22 font-size=%2212%22%3ENo Image%3C/text%3E%3C/svg%3E'">` : '<div style="width:60px;height:60px;background:#e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#64748b">No Image</div>'}
            </td>
            <td><strong>${service.name}</strong></td>
            <td>${service.category}</td>
            <td>${service.price}</td>
            <td>
                <span class="status-badge status-${service.status}">
                    ${service.status === 'available' ? 'Available' : 'Not Available'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="editService('${service._id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteService('${service._id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// Search Functionality
// ============================================

function handleGlobalSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderServicesTable(allServices);
        return;
    }
    
    const filtered = allServices.filter(service => {
        return service.name.toLowerCase().includes(searchTerm) ||
               service.description.toLowerCase().includes(searchTerm) ||
               service.category.toLowerCase().includes(searchTerm) ||
               (service.keywords && service.keywords.toLowerCase().includes(searchTerm));
    });
    
    renderServicesTable(filtered);
}

// ============================================
// Service Form Handling
// ============================================

function resetServiceForm() {
    currentEditingServiceId = null;
    document.getElementById('serviceFormTitle').textContent = 'Add New Service';
    document.getElementById('serviceForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('serviceFormError').classList.remove('show');
    document.getElementById('serviceFormSuccess').classList.remove('show');
}

function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

async function handleServiceSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const errorDiv = document.getElementById('serviceFormError');
    const successDiv = document.getElementById('serviceFormSuccess');
    
    errorDiv.classList.remove('show');
    successDiv.classList.remove('show');
    
    // Get features from textarea
    const featuresText = document.getElementById('serviceFeatures').value;
    const features = featuresText.split('\n').filter(f => f.trim() !== '').map(f => f.trim());
    formData.append('features', JSON.stringify(features));
    
    // Add empty productTypes for now (can be extended later)
    formData.append('productTypes', JSON.stringify([]));
    
    try {
        const token = localStorage.getItem('adminToken');
        const url = currentEditingServiceId 
            ? `${API_BASE_URL}/services/${currentEditingServiceId}`
            : `${API_BASE_URL}/services`;
        
        const method = currentEditingServiceId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            successDiv.textContent = currentEditingServiceId 
                ? 'Service updated successfully!' 
                : 'Service created successfully!';
            successDiv.classList.add('show');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                resetServiceForm();
                if (currentEditingServiceId) {
                    showPage('services');
                }
            }, 2000);
            
            // Reload services list
            loadServices();
            loadDashboardStats();
        } else {
            errorDiv.textContent = data.message || 'Error saving service';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.classList.add('show');
    }
}

// ============================================
// Edit Service
// ============================================

async function editService(serviceId) {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const service = data.service;
            
            currentEditingServiceId = service._id;
            document.getElementById('serviceFormTitle').textContent = 'Edit Service';
            
            // Populate form
            document.getElementById('serviceName').value = service.name || '';
            document.getElementById('serviceCategory').value = service.category || '';
            document.getElementById('serviceDescription').value = service.description || '';
            document.getElementById('servicePrice').value = service.price || '';
            document.getElementById('serviceStatus').value = service.status || 'available';
            document.getElementById('serviceKeywords').value = service.keywords || '';
            document.getElementById('serviceFeatures').value = (service.features || []).join('\n');
            
            // Show image preview if exists
            const preview = document.getElementById('imagePreview');
            if (service.image) {
                preview.innerHTML = `<img src="${API_BASE_URL.replace('/api', '')}${service.image}" alt="${service.name}">`;
            } else {
                preview.innerHTML = '';
            }
            
            // Show add service page
            showPage('addService');
        }
    } catch (error) {
        alert('Error loading service details');
        console.error(error);
    }
}

// ============================================
// Delete Service
// ============================================

async function deleteService(serviceId) {
    if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
        return;
    }
    
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Service deleted successfully');
            loadServices();
            loadDashboardStats();
        } else {
            alert('Error deleting service: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        alert('Network error. Please try again.');
        console.error(error);
    }
}
