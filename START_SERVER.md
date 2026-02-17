# 🚀 How to Start Admin Dashboard Server

## The Error You're Seeing

**"This site can't be reached - localhost refused to connect"**

This means the backend server is not running. You need to start it first!

---

## ✅ Step-by-Step Solution

### Step 1: Install Node.js (If Not Installed)

**Check if Node.js is installed:**
```bash
node --version
npm --version
```

**If not installed, install Node.js:**

**On macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from: https://nodejs.org/
```

**On Windows:**
- Download from: https://nodejs.org/
- Install the LTS version

**On Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Step 2: Install Dependencies

Open Terminal and run:

```bash
cd "/Users/rajesh/Rana elecrical/admin-dashboard/backend"
npm install
```

This will install all required packages (takes 1-2 minutes).

### Step 3: Start MongoDB (If Using Local MongoDB)

**Check if MongoDB is running:**
```bash
brew services list | grep mongodb
```

**Start MongoDB:**
```bash
brew services start mongodb-community
```

**OR use MongoDB Atlas (Cloud - No installation needed):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Get connection string
4. Update `MONGODB_URI` in `admin-dashboard/backend/.env`

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

### Step 5: Keep Terminal Open

**IMPORTANT:** Keep the terminal window open while using the admin dashboard. The server needs to keep running.

**To stop the server:** Press `Ctrl + C` in the terminal.

---

## 🎯 Quick Start (After Installation)

Once everything is installed, you can start the server anytime with:

```bash
cd "/Users/rajesh/Rana elecrical/admin-dashboard/backend"
npm start
```

Then click "Admin Login" button on your website!

---

## 🔄 Alternative: Use the Start Script

If you have the start script:

```bash
cd "/Users/rajesh/Rana elecrical"
./START_ADMIN_DASHBOARD.sh
```

---

## 📝 What Should Happen

1. ✅ Terminal shows "Server running on http://localhost:3000"
2. ✅ No errors in terminal
3. ✅ Click "Admin Login" button
4. ✅ Admin dashboard opens in browser
5. ✅ Login page appears

---

## 🐛 Still Having Issues?

**"npm: command not found"**
→ Install Node.js first (Step 1)

**"MongoDB connection failed"**
→ Start MongoDB or use MongoDB Atlas

**"Port 3000 already in use"**
→ Change PORT in `.env` file to 3001

**"Cannot find module"**
→ Run `npm install` again

---

## 💡 Pro Tip

Keep the server running in a separate terminal window so you can:
- See server logs
- Keep the dashboard accessible
- Easily restart if needed

---

**Need more help?** Check `admin-dashboard/README.md` for detailed documentation.
