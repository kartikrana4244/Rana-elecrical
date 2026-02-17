# How to Access Admin Dashboard - Step by Step Guide

## 🚀 Quick Steps to Access Admin Dashboard

### Step 1: Install Dependencies (First Time Only)

Open terminal and run:

```bash
cd "/Users/rajesh/Rana elecrical/admin-dashboard/backend"
npm install
```

This will install all required packages (Express, MongoDB, etc.)

### Step 2: Setup Environment File

Create a `.env` file in the `backend` folder:

```bash
cd "/Users/rajesh/Rana elecrical/admin-dashboard/backend"
```

Create `.env` file with this content:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rana_electrical
JWT_SECRET=rana_electrical_secret_key_2024
ADMIN_EMAIL=admin@ranaelectrical.com
ADMIN_PASSWORD=admin123
```

**Or use MongoDB Atlas (Cloud - Recommended):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Replace `MONGODB_URI` with your Atlas connection string

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# If not running, start it:
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
- No need to start anything, it's in the cloud!

### Step 4: Start the Server

```bash
cd "/Users/rajesh/Rana elecrical/admin-dashboard/backend"
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:3000
📊 Admin Dashboard: http://localhost:3000/admin
```

### Step 5: Open Admin Dashboard in Browser

Open your web browser and go to:

```
http://localhost:3000/admin
```

### Step 6: Login

**Default Login Credentials:**
- **Email:** `admin@ranaelectrical.com`
- **Password:** `admin123`

---

## ✅ Verify Everything Works

After logging in, you should see:
1. ✅ Dashboard with statistics
2. ✅ "Manage Services" page
3. ✅ "Add New Service" page
4. ✅ Search functionality

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
**Solution:** Run `npm install` in the backend folder

### Error: "MongoDB connection failed"
**Solutions:**
- Check if MongoDB is running: `brew services list`
- For local MongoDB: `brew services start mongodb-community`
- For Atlas: Check connection string in `.env`

### Error: "Port 3000 already in use"
**Solution:** Change PORT in `.env` to 3001 or another port

### Cannot access `http://localhost:3000/admin`
**Solutions:**
- Make sure server is running (check terminal)
- Try `http://127.0.0.1:3000/admin`
- Check firewall settings

### Login not working
**Solutions:**
- Check server terminal for errors
- Verify `.env` file exists
- Try restarting the server

---

## 📝 Quick Commands Reference

```bash
# Navigate to backend
cd "/Users/rajesh/Rana elecrical/admin-dashboard/backend"

# Install dependencies (first time)
npm install

# Start server
npm start

# Start with auto-reload (development)
npm run dev
```

---

## 🎯 What You'll See After Login

1. **Dashboard Home**
   - Total Services count
   - Available Services count
   - Unavailable Services count
   - Categories count

2. **Manage Services**
   - Table with all services
   - Edit and Delete buttons
   - Search bar

3. **Add New Service**
   - Form to create new services
   - Image upload
   - All service details

---

**Need Help?** Check the main `README.md` for detailed documentation.
