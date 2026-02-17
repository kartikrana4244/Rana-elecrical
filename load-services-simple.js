/* Simple Services Loader - Guaranteed to Work */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'ranaElectricalServices';
    
    // Default services
    const defaultServices = [
        {
            name: 'AC Repair',
            category: 'AC Repair',
            price: 'Starting from ₹500',
            description: 'Is your AC not cooling properly? Making strange noises? Or completely not working? Our expert technicians can diagnose and fix any AC problem quickly and efficiently.',
            keywords: 'ac repair fix diagnose troubleshooting cooling problem noise',
            image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
            features: ['Comprehensive AC diagnostics', 'Quick and reliable repairs', 'All AC brands and models', 'Same-day service available'],
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
            features: ['Split AC installation', 'Window AC installation', 'Proper sizing and placement', 'Post-installation support'],
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
            features: ['All refrigerant types', 'Leak detection and repair', 'Proper gas charging', 'Performance testing'],
            productTypes: [
                { name: 'Standard Gas Refill', price: '₹800', description: 'Standard refrigerant refilling' },
                { name: 'Premium Gas Refill', price: '₹1,200', description: 'Premium refrigerant with leak check' },
                { name: 'Complete Gas Service', price: '₹1,500', description: 'Gas refill + leak repair + testing' }
            ]
        },
        {
            name: 'AC Maintenance',
            category: 'AC Maintenance',
            price: 'Starting from ₹600',
            description: 'Regular maintenance keeps your AC running efficiently and extends its lifespan. Our maintenance service includes cleaning, inspection, and tune-ups.',
            keywords: 'ac maintenance cleaning service tune-up filter replacement',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
            features: ['Deep cleaning of AC units', 'Filter replacement', 'Performance optimization', 'Preventive maintenance plans'],
            productTypes: [
                { name: 'Basic Maintenance', price: '₹600', description: 'Cleaning and basic checkup' },
                { name: 'Deep Cleaning Service', price: '₹1,000', description: 'Deep cleaning with filter replacement' },
                { name: 'Annual Maintenance Plan', price: '₹3,000', description: '4 visits per year maintenance plan' }
            ]
        },
        {
            name: 'Split & Window AC Service',
            category: 'AC Repair',
            price: 'Starting from ₹700',
            description: 'We provide comprehensive service for all types of AC units - split ACs, window ACs, and more. Our technicians are trained to handle any AC model or brand.',
            keywords: 'split ac window ac service repair all types brands',
            image: 'https://images.unsplash.com/photo-1631540575402-8c5a0a0b0b0a?w=800&q=80',
            features: ['Split AC service and repair', 'Window AC service and repair', 'All brands supported', 'Expert troubleshooting'],
            productTypes: [
                { name: 'Split AC Service', price: '₹700', description: 'Complete split AC service' },
                { name: 'Window AC Service', price: '₹650', description: 'Window AC cleaning and service' },
                { name: 'Combo Service', price: '₹1,200', description: 'Service for both split and window AC' }
            ]
        },
        {
            name: 'Electrical Repair Services',
            category: 'Electrical',
            price: 'Starting from ₹400',
            description: 'From minor electrical repairs to major installations, our licensed electricians provide safe and reliable electrical services for your home and business.',
            keywords: 'electrical repair wiring installation switch socket electrician',
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
            features: ['Electrical troubleshooting', 'Wiring and rewiring', 'Switch and socket installation', 'Electrical safety inspections'],
            productTypes: [
                { name: 'Basic Electrical Repair', price: '₹400', description: 'Minor electrical repairs' },
                { name: 'Wiring Installation', price: '₹1,500', description: 'Complete wiring installation' },
                { name: 'Electrical Safety Inspection', price: '₹800', description: 'Complete safety inspection' }
            ]
        }
    ];
    
    // Get services from storage or use defaults
    function getServices() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('Error reading services:', e);
        }
        
        // Initialize with defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices));
        return defaultServices;
    }
    
    // Icon mapping
    function getIcon(category) {
        const icons = {
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
        return icons[category] || 'fa-tools';
    }
    
    // Escape HTML
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Render services
    function renderServices() {
        const container = document.getElementById('servicesContainer');
        if (!container) {
            console.error('servicesContainer not found!');
            return;
        }
        
        const services = getServices();
        console.log('Rendering', services.length, 'services');
        
        if (services.length === 0) {
            container.innerHTML = '<div class="service-detail-card"><p>No services available.</p></div>';
            return;
        }
        
        container.innerHTML = services.map(function(service) {
            if (!service || !service.name) return '';
            
            const icon = getIcon(service.category);
            const image = service.image || '';
            const images = service.images && service.images.length > 0 ? service.images : (image ? [image] : []);
            const productTypes = service.productTypes || [];
            const features = service.features || [];
            
            const featuresHTML = features.map(function(f) {
                return '<li>' + escapeHtml(f) + '</li>';
            }).join('');
            
            return '<div class="service-detail-card clickable-service" ' +
                'data-service="' + escapeHtml(service.name) + '" ' +
                'data-keywords="' + escapeHtml(service.keywords || '') + '" ' +
                'data-price="' + escapeHtml(service.price || 'Contact for pricing') + '" ' +
                'data-image="' + escapeHtml(image) + '" ' +
                'data-images=\'' + JSON.stringify(images) + '\' ' +
                'data-product-types=\'' + JSON.stringify(productTypes) + '\'>' +
                '<div class="service-icon-wrapper"><i class="fas ' + icon + '"></i></div>' +
                '<h2>' + escapeHtml(service.name) + '</h2>' +
                '<p>' + escapeHtml(service.description || '') + '</p>' +
                (features.length > 0 ? '<ul class="service-features">' + featuresHTML + '</ul>' : '') +
                '<div class="service-card-footer">' +
                '<span class="service-price-preview">' + escapeHtml(service.price || 'Contact for pricing') + '</span>' +
                '<button class="btn-view-service">View Details</button>' +
                '</div></div>';
        }).filter(function(html) { return html !== ''; }).join('');
        
        // Trigger event for script.js
        if (typeof document.dispatchEvent === 'function') {
            document.dispatchEvent(new CustomEvent('servicesLoaded'));
        }
        
        // Re-initialize service detail handlers if function exists
        setTimeout(function() {
            if (typeof window.initializeServiceDetailHandlers === 'function') {
                window.initializeServiceDetailHandlers();
            }
        }, 300);
    }
    
    // Initialize
    function init() {
        const container = document.getElementById('servicesContainer');
        if (!container) {
            return;
        }
        
        renderServices();
        
        // Listen for custom update events (same tab) - on both window and document
        function handleServicesUpdate(e) {
            console.log('Services updated event received! Refreshing...', e.detail);
            renderServices();
        }
        
        window.addEventListener('servicesUpdated', handleServicesUpdate);
        document.addEventListener('servicesUpdated', handleServicesUpdate);
        
        // Listen for storage events (cross-tab updates)
        window.addEventListener('storage', function(e) {
            if (e.key === STORAGE_KEY || e.key === STORAGE_KEY + '_updated' || e.key === STORAGE_KEY + '_trigger') {
                console.log('Storage changed! Refreshing services...', e.key);
                renderServices();
            }
        });
        
        // Poll for changes every 500ms (faster updates)
        let lastHash = '';
        let lastUpdateTime = '';
        
        setInterval(function() {
            // Check if services changed
            try {
                const services = getServices();
                const hash = JSON.stringify(services);
                const updateTime = localStorage.getItem(STORAGE_KEY + '_updated') || '';
                
                if (hash !== lastHash || updateTime !== lastUpdateTime) {
                    lastHash = hash;
                    lastUpdateTime = updateTime;
                    console.log('Services changed detected via polling! Updating...', services.length, 'services');
                    renderServices();
                }
            } catch (e) {
                console.error('Error in polling:', e);
            }
        }, 500); // Check every 500ms for faster updates
    }
    
    // Run when ready - MULTIPLE ATTEMPTS TO ENSURE IT WORKS
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also try with delays
    setTimeout(init, 100);
    setTimeout(init, 500);
    setTimeout(init, 1000);
    setTimeout(init, 2000);
    
    // Force render after 3 seconds
    setTimeout(function() {
        const container = document.getElementById('servicesContainer');
        if (container && container.innerHTML.includes('Loading')) {
            console.log('Force rendering services after timeout...');
            init();
        }
    }, 3000);
})();
