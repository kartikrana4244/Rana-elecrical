# Quick Setup Guide - Admin Dashboard

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
cd admin-dashboard/backend
npm install
```

### 2. Setup Environment

Create `.env` file in `admin-dashboard/backend/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rana_electrical
JWT_SECRET=change_this_to_random_string_in_production
ADMIN_EMAIL=admin@ranaelectrical.com
ADMIN_PASSWORD=admin123
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### 4. Start Server

```bash
cd admin-dashboard/backend
npm start
```

### 5. Access Dashboard

Open browser: `http://localhost:3000/admin`

**Login:**
- Email: `admin@ranaelectrical.com`
- Password: `admin123`

## ✅ Verify Installation

1. ✅ Server starts without errors
2. ✅ Can access `http://localhost:3000/admin`
3. ✅ Can login with default credentials
4. ✅ Can see dashboard with stats
5. ✅ Can add/edit/delete services

## 🔗 Connect Frontend Website

The frontend website will automatically fetch services from the API when:
- Backend server is running on `http://localhost:3000`
- `api-integration.js` is included in `services.html`

## 📝 Next Steps

1. **Change Default Password** - Update admin password in database
2. **Add Services** - Use admin dashboard to add your services
3. **Upload Images** - Add service images when creating services
4. **Test Frontend** - Verify services appear on your website

## 🐛 Common Issues

**MongoDB Connection Error:**
- Check MongoDB is running
- Verify `MONGODB_URI` in `.env`
- For Atlas: Check IP whitelist and connection string

**Port Already in Use:**
- Change `PORT` in `.env` to different port (e.g., 3001)
- Update `API_BASE_URL` in frontend if needed

**Cannot Login:**
- Check server logs for admin creation
- Verify `.env` file exists
- Try restarting server

## 📞 Need Help?

Check the main `README.md` for detailed documentation.
