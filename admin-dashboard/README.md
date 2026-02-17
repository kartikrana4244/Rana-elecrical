# Rana Electrical - Admin Dashboard

Complete Admin Dashboard for managing services on the Rana Electrical website.

## 🚀 Features

- **Admin Authentication**: Secure login with JWT tokens
- **Service Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Image Upload**: Local file upload for service images
- **Search Functionality**: Real-time search across services
- **Responsive Design**: Mobile-friendly admin interface
- **API Integration**: RESTful API for frontend website

## 📁 Project Structure

```
admin-dashboard/
├── backend/
│   ├── models/
│   │   ├── Admin.js          # Admin user model
│   │   └── Service.js        # Service model
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── services.js      # Service CRUD routes
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── uploads/              # Service images storage
│   ├── server.js             # Express server
│   └── package.json          # Dependencies
├── frontend/
│   ├── css/
│   │   └── style.css         # Admin dashboard styles
│   ├── js/
│   │   └── app.js            # Admin dashboard JavaScript
│   └── index.html            # Admin dashboard UI
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Install Backend Dependencies

```bash
cd admin-dashboard/backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd admin-dashboard/backend
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rana_electrical
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_EMAIL=admin@ranaelectrical.com
ADMIN_PASSWORD=admin123
```

**⚠️ Important**: Change `JWT_SECRET` and `ADMIN_PASSWORD` in production!

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
# On macOS (if installed via Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

**MongoDB Atlas (Cloud):**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### Step 4: Start the Server

```bash
cd admin-dashboard/backend
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Step 5: Access Admin Dashboard

Open your browser and navigate to:
```
http://localhost:3000/admin
```

**Default Login Credentials:**
- Email: `admin@ranaelectrical.com`
- Password: `admin123`

**⚠️ Change these credentials immediately after first login!**

## 📡 API Endpoints

### Authentication

- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify JWT token

### Services (Protected - Requires JWT Token)

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Public API (No Authentication)

- `GET /api/public/services` - Get all available services (for frontend website)

## 🔐 Authentication

All service endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is automatically stored in localStorage after login and expires after 7 days.

## 📝 Usage Guide

### Adding a New Service

1. Login to admin dashboard
2. Click "Add New Service"
3. Fill in the form:
   - Service Name (required)
   - Category (required)
   - Description (required)
   - Price
   - Status (Available/Not Available)
   - Keywords (comma-separated)
   - Upload Image
   - Features (one per line)
4. Click "Save Service"

### Editing a Service

1. Go to "Manage Services"
2. Click "Edit" on any service
3. Update the fields
4. Click "Save Service"

### Deleting a Service

1. Go to "Manage Services"
2. Click "Delete" on any service
3. Confirm deletion

### Searching Services

- Use the search bar in the top navigation
- Search by name, description, category, or keywords
- Results update in real-time

## 🔗 Connecting with Frontend Website

The frontend website can fetch services from the API:

```javascript
// Fetch all available services
fetch('http://localhost:3000/api/public/services')
  .then(res => res.json())
  .then(data => {
    const services = data.services;
    // Render services on your website
  });
```

## 🗄️ Database Schema

### Admin Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (default: 'admin')
}
```

### Service Model

```javascript
{
  name: String,
  description: String,
  category: String,
  price: String,
  image: String (URL),
  images: [String],
  keywords: String,
  productTypes: [{
    name: String,
    price: String,
    description: String
  }],
  features: [String],
  status: String ('available' | 'unavailable')
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity (for Atlas)

### Image Upload Not Working

- Check `uploads/` directory exists and is writable
- Verify file size is under 5MB
- Ensure file is a valid image format (jpg, png, gif, webp)

### Login Not Working

- Verify default admin was created (check server logs)
- Try resetting password by deleting admin from database
- Check JWT_SECRET is set in `.env`

### CORS Errors

- Ensure backend server is running
- Check API_BASE_URL in frontend JavaScript
- Verify CORS is enabled in server.js

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, etc.)

1. Set environment variables in your hosting platform
2. Ensure MongoDB Atlas connection string is set
3. Deploy the `backend` folder
4. Update `API_BASE_URL` in frontend

### Frontend Deployment

- Deploy `frontend` folder to any static hosting (Netlify, Vercel, etc.)
- Update API endpoint URLs in `app.js`

## 📞 Support

For issues or questions, check:
- Server logs for errors
- Browser console for frontend errors
- MongoDB connection status

## 📄 License

This project is proprietary software for Rana Electrical.

---

**Built with ❤️ for Rana Electrical**
