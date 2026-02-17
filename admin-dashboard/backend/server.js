/* ============================================
   Rana Electrical - Admin Dashboard Server
   Node.js + Express + MongoDB Backend
   ============================================ */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve admin dashboard frontend
app.use('/admin', express.static(path.join(__dirname, '../frontend')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rana_electrical';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB Connected Successfully');
    // Initialize default admin after connection
    initializeDefaultAdmin();
})
.catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️  Using JSON file fallback for development');
});

// Import Routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/services', serviceRoutes);

// Public API - Get all services (for frontend website)
app.get('/api/public/services', async (req, res) => {
    try {
        const Service = require('./models/Service');
        const services = await Service.find({ status: 'available' }).sort({ createdAt: -1 });
        res.json({ success: true, services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Serve admin dashboard
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Rana Electrical Admin API', 
        version: '1.0.0',
        endpoints: {
            admin: '/admin',
            api: '/api'
        }
    });
});

// Initialize Default Admin
async function initializeDefaultAdmin() {
    try {
        const Admin = require('./models/Admin');
        const bcrypt = require('bcryptjs');
        
        const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@ranaelectrical.com' });
        
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
            await Admin.create({
                email: process.env.ADMIN_EMAIL || 'admin@ranaelectrical.com',
                password: hashedPassword,
                name: 'Admin'
            });
            console.log('✅ Default admin created');
            console.log('📧 Email:', process.env.ADMIN_EMAIL || 'admin@ranaelectrical.com');
            console.log('🔑 Password:', process.env.ADMIN_PASSWORD || 'admin123');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        success: false, 
        message: err.message || 'Internal Server Error' 
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`🔌 API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;
