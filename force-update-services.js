/* Force Update Services to 6 - Run this once */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'ranaElectricalServices';
    
    // Get all 6 services
    const allServices = [
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
    
    // Force update
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allServices));
    console.log('✅ Updated services to', allServices.length, 'services');
    
    // Trigger update event
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('servicesUpdated'));
    }
})();
