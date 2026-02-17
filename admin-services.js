/* ============================================
   Service Management - LocalStorage Based
   ============================================ */

const SERVICES_STORAGE_KEY = 'ranaElectricalServices';

/**
 * Get all services from localStorage
 */
function getServices() {
    const servicesJson = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (servicesJson) {
        try {
            const parsed = JSON.parse(servicesJson);
            if (parsed && parsed.length > 0) {
                return parsed;
            }
        } catch (e) {
            console.error('Error parsing services:', e);
        }
    }
    
    // Initialize and return default services if none exist
    const defaults = getDefaultServices();
    saveServices(defaults);
    return defaults;
}

/**
 * Save services to localStorage
 */
function saveServices(services) {
    // Save to localStorage
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    
    // Set timestamp to track updates (do this first)
    const timestamp = Date.now().toString();
    localStorage.setItem(SERVICES_STORAGE_KEY + '_updated', timestamp);
    
    // Trigger custom event for real-time updates (same tab)
    if (typeof window !== 'undefined') {
        // Dispatch on window
        window.dispatchEvent(new CustomEvent('servicesUpdated', {
            detail: { services: services, count: services.length, timestamp: timestamp }
        }));
        
        // Also dispatch on document for better compatibility
        document.dispatchEvent(new CustomEvent('servicesUpdated', {
            detail: { services: services, count: services.length, timestamp: timestamp }
        }));
        
        console.log('Services updated event dispatched!', services.length, 'services');
    }
    
    // Force a storage event for cross-tab updates
    // Note: StorageEvent only fires in OTHER tabs, not the current one
    // So we manually trigger it for same-tab updates
    if (typeof window !== 'undefined' && window.dispatchEvent) {
        try {
            // Create a proper StorageEvent-like object
            const event = new StorageEvent('storage', {
                key: SERVICES_STORAGE_KEY,
                newValue: JSON.stringify(services),
                oldValue: localStorage.getItem(SERVICES_STORAGE_KEY),
                storageArea: localStorage
            });
            window.dispatchEvent(event);
        } catch (e) {
            // Fallback: try with regular Event
            try {
                const event = new Event('storage');
                event.key = SERVICES_STORAGE_KEY;
                event.newValue = JSON.stringify(services);
                event.oldValue = localStorage.getItem(SERVICES_STORAGE_KEY);
                window.dispatchEvent(event);
            } catch (e2) {
                console.log('Services saved:', services.length, 'services');
            }
        }
    }
    
    // Force a page reload trigger for other tabs (if needed)
    // This ensures cross-tab updates work
    try {
        const triggerKey = SERVICES_STORAGE_KEY + '_trigger';
        localStorage.setItem(triggerKey, timestamp);
        localStorage.removeItem(triggerKey);
    } catch (e) {
        // Ignore errors
    }
}

/**
 * Get default services (initial data) - ALL 6 SERVICES
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
        },
        {
            name: 'AC Maintenance',
            category: 'AC Maintenance',
            price: 'Starting from ₹600',
            description: 'Regular maintenance keeps your AC running efficiently and extends its lifespan. Our maintenance service includes cleaning, inspection, and tune-ups.',
            keywords: 'ac maintenance cleaning service tune-up filter replacement',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
            features: [
                'Deep cleaning of AC units',
                'Filter replacement',
                'Performance optimization',
                'Preventive maintenance plans'
            ],
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
            features: [
                'Split AC service and repair',
                'Window AC service and repair',
                'All brands supported',
                'Expert troubleshooting'
            ],
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
            features: [
                'Electrical troubleshooting',
                'Wiring and rewiring',
                'Switch and socket installation',
                'Electrical safety inspections'
            ],
            productTypes: [
                { name: 'Basic Electrical Repair', price: '₹400', description: 'Minor electrical repairs' },
                { name: 'Wiring Installation', price: '₹1,500', description: 'Complete wiring installation' },
                { name: 'Electrical Safety Inspection', price: '₹800', description: 'Complete safety inspection' }
            ]
        }
    ];
}

/**
 * Initialize default services if none exist OR if less than 6 services
 */
function initializeServices() {
    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
    let shouldInitialize = false;
    
    if (!stored) {
        shouldInitialize = true;
    } else {
        try {
            const parsed = JSON.parse(stored);
            if (!parsed || parsed.length === 0 || parsed.length < 6) {
                shouldInitialize = true;
            }
        } catch (e) {
            console.error('Error checking services, re-initializing:', e);
            shouldInitialize = true;
        }
    }
    
    if (shouldInitialize) {
        const defaultServices = getDefaultServices();
        saveServices(defaultServices);
        console.log('Initialized default services:', defaultServices.length, 'services');
    }
}

// Auto-initialize on load - FORCE IT
if (typeof window !== 'undefined') {
    // Run immediately
    initializeServices();
    
    // Also run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeServices);
    } else {
        setTimeout(initializeServices, 100);
    }
}
