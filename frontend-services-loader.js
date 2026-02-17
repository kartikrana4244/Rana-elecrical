/* ============================================
   Frontend Services Loader
   Loads services from localStorage and updates in real-time
   ============================================ */

const SERVICES_STORAGE_KEY = 'ranaElectricalServices';

/**
 * Get default services (fallback)
 */
function getDefaultServices() {
    return [
        {
            name: 'AC Repair',
            category: 'AC Repair',
            price: 'Starting from ₹500',
            description: 'Is your AC not cooling properly? Making strange noises? Or completely not working? Our expert technicians can diagnose and fix any AC problem quickly and efficiently.',
            keywords: 'ac repair fix diagnose troubleshooting cooling problem noise',
            image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
            features: [
                'Comprehensive AC diagnostics',
                'Quick and reliable repairs',
                'All AC brands and models',
                'Same-day service available'
            ],
            productTypes: [
                { name: 'Basic AC Repair', price: '₹500', description: 'Diagnosis and basic repair' },
                { name: 'Advanced AC Repair', price: '₹1,200', description: 'Complex repairs with parts replacement' },
                { name: 'Emergency AC Repair', price: '₹1,500', description: 'Same-day emergency service' }
            ]
        },
        {
            name: 'AC Installation',
            category: 'AC Installation',
            price: 'Starting from ₹1,500',
            description: 'Planning to install a new AC? We provide professional installation services for both split and window AC units, ensuring optimal performance and energy efficiency.',
            keywords: 'ac installation install setup new ac split window unit',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
            features: [
                'Split AC installation',
                'Window AC installation',
                'Proper sizing and placement',
                'Post-installation support'
            ],
            productTypes: [
                { name: 'Split AC Installation', price: '₹1,500', description: 'Professional split AC installation' },
                { name: 'Window AC Installation', price: '₹1,200', description: 'Window AC unit installation' },
                { name: 'Premium Installation', price: '₹2,500', description: 'Installation with extended warranty' }
            ]
        },
        {
            name: 'AC Gas Refilling',
            category: 'AC Gas Refilling',
            price: 'Starting from ₹800',
            description: 'Low on refrigerant? Our certified technicians provide safe and efficient AC gas refilling services using genuine refrigerant to restore your AC\'s cooling performance.',
            keywords: 'ac gas refilling refrigerant gas charge refill leak',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            features: [
                'All refrigerant types',
                'Leak detection and repair',
                'Proper gas charging',
                'Performance testing'
            ],
            productTypes: [
                { name: 'Standard Gas Refill', price: '₹800', description: 'Standard refrigerant refilling' },
                { name: 'Premium Gas Refill', price: '₹1,200', description: 'Premium refrigerant with leak check' },
                { name: 'Complete Gas Service', price: '₹1,500', description: 'Gas refill + leak repair + testing' }
            ]
        }
    ];
}

/**
 * Get services from localStorage
 */
function getServicesFromStorage() {
    const servicesJson = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (servicesJson) {
        try {
            const services = JSON.parse(servicesJson);
            if (services && services.length > 0) {
                return services;
            }
        } catch (e) {
            console.error('Error parsing services:', e);
        }
    }
    
    // If no services in localStorage, initialize with defaults
    const defaultServices = getDefaultServices();
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(defaultServices));
    return defaultServices;
}

/**
 * Map category to icon
 */
function getCategoryIcon(category) {
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
    return categoryIcons[category] || 'fa-tools';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Render services on the frontend
 */
function renderServicesOnFrontend() {
    const servicesContainer = document.getElementById('servicesContainer');
    if (!servicesContainer) {
        console.error('servicesContainer not found!');
        return;
    }
    
    const services = getServicesFromStorage();
    console.log('Loading services:', services.length, 'services found');
    
    if (services.length === 0) {
        servicesContainer.innerHTML = `
            <div class="service-detail-card">
                <p>No services available at the moment. Please check back later.</p>
            </div>
        `;
        return;
    }
    
    try {
        servicesContainer.innerHTML = services.map(service => {
            if (!service || !service.name) {
                console.warn('Invalid service:', service);
                return '';
            }
            
            const icon = getCategoryIcon(service.category);
            const image = service.image || '';
            const images = service.images && service.images.length > 0 
                ? service.images 
                : (image ? [image] : []);
            const productTypes = service.productTypes || [];
            const features = service.features || [];
            
            // Build features list HTML
            const featuresHTML = features.map(feature => 
                `<li>${escapeHtml(feature)}</li>`
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
        }).filter(html => html !== '').join('');
    } catch (e) {
        console.error('Error rendering services:', e);
        servicesContainer.innerHTML = `
            <div class="service-detail-card">
                <p>Error loading services. Please refresh the page.</p>
            </div>
        `;
    }
    
    // Re-initialize event listeners
    if (typeof initializeServiceCards === 'function') {
        initializeServiceCards();
    }
    
    // Trigger custom event for script.js
    document.dispatchEvent(new CustomEvent('servicesLoaded'));
}

/**
 * Listen for storage changes (real-time updates)
 */
function setupStorageListener() {
    // Listen for storage events (cross-tab updates)
    window.addEventListener('storage', function(e) {
        if (e.key === SERVICES_STORAGE_KEY) {
            console.log('Services updated! Refreshing frontend...');
            renderServicesOnFrontend();
        }
    });
    
    // Listen for custom events (same-tab updates)
    window.addEventListener('servicesUpdated', function() {
        console.log('Services updated via custom event! Refreshing frontend...');
        renderServicesOnFrontend();
    });
    
    // Also check localStorage directly (for same-tab updates)
    let lastServicesHash = '';
    setInterval(function() {
        const services = getServicesFromStorage();
        const currentHash = JSON.stringify(services);
        if (currentHash !== lastServicesHash) {
            lastServicesHash = currentHash;
            console.log('Services changed! Refreshing frontend...');
            renderServicesOnFrontend();
        }
    }, 1000); // Check every second
}

/**
 * Initialize services loader
 */
function initializeServicesLoader() {
    // Only run on services page
    const container = document.getElementById('servicesContainer');
    if (!container) {
        return;
    }
    
    // Ensure services are initialized
    getServicesFromStorage();
    
    // Load services immediately
    renderServicesOnFrontend();
    
    // Setup real-time updates
    setupStorageListener();
}

// Auto-initialize when DOM is ready
(function() {
    function init() {
        try {
            initializeServicesLoader();
        } catch (e) {
            console.error('Error initializing services loader:', e);
            // Fallback: try again after a delay
            setTimeout(init, 500);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 100);
        });
    } else {
        setTimeout(init, 100);
    }
})();

// Export for manual refresh
window.refreshServices = renderServicesOnFrontend;
