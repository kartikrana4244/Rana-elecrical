/* ============================================
   API Integration for Frontend Website
   Fetches services from Admin Dashboard API
   ============================================ */

// API Configuration
const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:3000/api' 
    : '/api';

// Cache for services
let cachedServices = null;

/**
 * Fetch all available services from API
 * @returns {Promise<Array>} Array of service objects
 */
async function fetchServicesFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/public/services`);
        const data = await response.json();
        
        if (data.success && data.services) {
            cachedServices = data.services;
            return data.services;
        } else {
            console.warn('API returned no services, using fallback');
            return [];
        }
    } catch (error) {
        console.error('Error fetching services from API:', error);
        // Return empty array on error - will use static fallback
        return [];
    }
}

/**
 * Render service cards dynamically from API data
 * @param {Array} services - Array of service objects
 */
function renderServicesFromAPI(services) {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) return;
    
    if (services.length === 0) {
        servicesContainer.innerHTML = `
            <div class="service-detail-card">
                <p>No services available at the moment. Please check back later.</p>
            </div>
        `;
        return;
    }
    
    // Map category to icon
    const categoryIcons = {
        'AC Repair': 'fa-wrench',
        'AC Installation': 'fa-home',
        'AC Gas Refilling': 'fa-gas-pump',
        'AC Maintenance': 'fa-cog',
        'Electrical': 'fa-bolt',
        'Wiring': 'fa-plug',
        'Fan Repair': 'fa-fan',
        'Inverter Service': 'fa-battery-half',
        'Other': 'fa-tools'
    };
    
    servicesContainer.innerHTML = services.map(service => {
        const icon = categoryIcons[service.category] || 'fa-tools';
        const image = service.image || service.images?.[0] || '';
        const images = service.images && service.images.length > 0 
            ? service.images 
            : (image ? [image] : []);
        const productTypes = service.productTypes || [];
        const features = service.features || [];
        
        // Build features list HTML
        const featuresHTML = features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        return `
            <div class="service-detail-card clickable-service" 
                 data-service="${escapeHtml(service.name)}" 
                 data-keywords="${escapeHtml(service.keywords || '')}"
                 data-price="${escapeHtml(service.price || 'Contact for pricing')}"
                 data-image="${escapeHtml(image)}"
                 data-images='${JSON.stringify(images)}'
                 data-product-types='${JSON.stringify(productTypes)}'>
                <div class="service-icon-wrapper">
                    <i class="fas ${icon}"></i>
                </div>
                <h2>${escapeHtml(service.name)}</h2>
                <p>${escapeHtml(service.description || '')}</p>
                ${features.length > 0 ? `
                <ul class="service-features">
                    ${featuresHTML}
                </ul>
                ` : ''}
                <div class="service-card-footer">
                    <span class="service-price-preview">${escapeHtml(service.price || 'Contact for pricing')}</span>
                    <button class="btn-view-service">View Details</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Re-initialize event listeners for the new cards
    initializeServiceCards();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Initialize event listeners for service cards
 */
function initializeServiceCards() {
    // This will be called after services are rendered
    // The existing script.js will handle the click events
    const clickableServices = document.querySelectorAll('.clickable-service');
    const viewButtons = document.querySelectorAll('.btn-view-service');
    
    // Trigger a custom event to let script.js know services are loaded
    if (clickableServices.length > 0) {
        document.dispatchEvent(new CustomEvent('servicesLoaded'));
    }
}

/**
 * Load and render services on page load
 */
async function loadServicesOnPageLoad() {
    // Only run on services page
    if (!document.getElementById('servicesContainer')) {
        return;
    }
    
    // Show loading state
    const container = document.getElementById('servicesContainer');
    const originalHTML = container.innerHTML;
    container.innerHTML = '<div class="service-detail-card"><p>Loading services...</p></div>';
    
    try {
        // Try to fetch from API
        const services = await fetchServicesFromAPI();
        
        if (services.length > 0) {
            // Render services from API
            renderServicesFromAPI(services);
        } else {
            // Fallback to static HTML if API fails or returns no services
            console.log('Using static services as fallback');
            container.innerHTML = originalHTML;
        }
    } catch (error) {
        console.error('Error loading services:', error);
        // Fallback to static HTML
        container.innerHTML = originalHTML;
    }
}

// Auto-load services when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadServicesOnPageLoad);
} else {
    loadServicesOnPageLoad();
}

// Export for use in other scripts
window.APIService = {
    fetchServices: fetchServicesFromAPI,
    renderServices: renderServicesFromAPI,
    loadServices: loadServicesOnPageLoad
};
