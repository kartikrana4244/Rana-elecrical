# 🚀 Quick Start - Admin Dashboard

## Method 1: Using the Start Script (Easiest)

Just double-click or run:
```bash
./START_ADMIN_DASHBOARD.sh
```

This will:
- ✅ Install dependencies automatically
- ✅ Create .env file if missing
- ✅ Start the server

Then open: **http://localhost:3000/admin**

---

## Method 2: Manual Steps

### Step 1: Install Dependencies
```bash
cd "admin-dashboard/backend"
npm install
```

### Step 2: Create .env File
Create a file named `.env` in `admin-dashboard/backend/` folder with:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rana_electrical
JWT_SECRET=rana_electrical_secret_key_2024
ADMIN_EMAIL=admin@ranaelectrical.com
ADMIN_PASSWORD=admin123
```

### Step 3: Start MongoDB
```bash
# Check if running
brew services list | grep mongodb

# Start if not running
brew services start mongodb-community
```

**OR use MongoDB Atlas (Cloud - No installation needed):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Step 4: Start Server
```bash
cd "admin-dashboard/backend"
npm start
```

### Step 5: Open Browser
Go to: **http://localhost:3000/admin**

**Login:**
- Email: `admin@ranaelectrical.com`
- Password: `admin123`

---

## ✅ What You Should See

1. **Login Page** → Enter credentials
2. **Dashboard** → See statistics
3. **Manage Services** → View all services
4. **Add New Service** → Create services

---

## 🐛 Common Issues

**"Cannot find module"**
→ Run `npm install` in backend folder

**"MongoDB connection failed"**
→ Start MongoDB or use MongoDB Atlas

**"Port 3000 in use"**
→ Change PORT in .env to 3001

**"Cannot access localhost:3000"**
→ Make sure server is running (check terminal)

---

## 📞 Need Help?

Check `admin-dashboard/HOW_TO_ACCESS.md` for detailed guide.
