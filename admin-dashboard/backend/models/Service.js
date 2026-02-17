/* ============================================
   Service Model - MongoDB Schema
   ============================================ */

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['AC Repair', 'AC Installation', 'AC Gas Refilling', 'AC Maintenance', 'Electrical', 'Wiring', 'Fan Repair', 'Inverter Service', 'Other'],
        default: 'Other'
    },
    price: {
        type: String,
        required: true,
        default: 'Contact for pricing'
    },
    image: {
        type: String,
        default: ''
    },
    images: {
        type: [String],
        default: []
    },
    keywords: {
        type: String,
        default: ''
    },
    productTypes: {
        type: [{
            name: String,
            price: String,
            description: String
        }],
        default: []
    },
    features: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available'
    }
}, {
    timestamps: true
});

// Index for search functionality
serviceSchema.index({ name: 'text', description: 'text', keywords: 'text' });

module.exports = mongoose.models.Service || mongoose.model('Service', serviceSchema);
