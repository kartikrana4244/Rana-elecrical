/* ============================================
   Service Routes - CRUD Operations
   GET    /api/services - Get all services
   GET    /api/services/:id - Get single service
   POST   /api/services - Create new service
   PUT    /api/services/:id - Update service
   DELETE /api/services/:id - Delete service
   ============================================ */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const Service = require('../models/Service');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'service-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Get all services (Protected - Admin only)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { search, category, status } = req.query;
        let query = {};
        
        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { keywords: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Filter by category
        if (category) {
            query.category = category;
        }
        
        // Filter by status
        if (status) {
            query.status = status;
        }
        
        const services = await Service.find(query).sort({ createdAt: -1 });
        res.json({ success: true, services, count: services.length });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single service
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new service
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, description, category, price, keywords, status, features, productTypes } = req.body;
        
        // Validation
        if (!name || !description || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, description, and category'
            });
        }
        
        // Parse JSON fields if they're strings
        let parsedFeatures = [];
        let parsedProductTypes = [];
        
        if (features) {
            parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
        }
        
        if (productTypes) {
            parsedProductTypes = typeof productTypes === 'string' ? JSON.parse(productTypes) : productTypes;
        }
        
        // Handle image upload
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
        
        const service = await Service.create({
            name,
            description,
            category,
            price: price || 'Contact for pricing',
            image: imageUrl,
            keywords: keywords || '',
            features: parsedFeatures,
            productTypes: parsedProductTypes,
            status: status || 'available'
        });
        
        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            service
        });
    } catch (error) {
        // Delete uploaded file if service creation fails
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update service
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, description, category, price, keywords, status, features, productTypes, image } = req.body;
        
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        
        // Parse JSON fields
        let parsedFeatures = service.features;
        let parsedProductTypes = service.productTypes;
        
        if (features) {
            parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
        }
        
        if (productTypes) {
            parsedProductTypes = typeof productTypes === 'string' ? JSON.parse(productTypes) : productTypes;
        }
        
        // Handle image update
        let imageUrl = service.image;
        if (req.file) {
            // Delete old image if exists
            if (service.image) {
                const oldImagePath = path.join(__dirname, '..', service.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imageUrl = `/uploads/${req.file.filename}`;
        } else if (image === '') {
            // If image is explicitly set to empty, delete old image
            if (service.image) {
                const oldImagePath = path.join(__dirname, '..', service.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imageUrl = '';
        }
        
        // Update service
        service.name = name || service.name;
        service.description = description || service.description;
        service.category = category || service.category;
        service.price = price || service.price;
        service.keywords = keywords !== undefined ? keywords : service.keywords;
        service.status = status || service.status;
        service.features = parsedFeatures;
        service.productTypes = parsedProductTypes;
        service.image = imageUrl;
        
        await service.save();
        
        res.json({
            success: true,
            message: 'Service updated successfully',
            service
        });
    } catch (error) {
        // Delete uploaded file if update fails
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete service
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        
        // Delete associated image
        if (service.image) {
            const imagePath = path.join(__dirname, '..', service.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        await Service.findByIdAndDelete(req.params.id);
        
        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
