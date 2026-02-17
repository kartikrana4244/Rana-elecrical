#!/bin/bash

# Quick Start Script for Admin Dashboard
# Run this script to start the admin dashboard

echo "🚀 Starting Rana Electrical Admin Dashboard..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/admin-dashboard/backend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating default .env file..."
    cat > .env << EOF
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rana_electrical
JWT_SECRET=rana_electrical_secret_key_2024_change_in_production
ADMIN_EMAIL=admin@ranaelectrical.com
ADMIN_PASSWORD=admin123
EOF
    echo "✅ .env file created"
    echo ""
fi

# Check MongoDB connection
echo "🔍 Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB found"
    # Try to start MongoDB if not running (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start mongodb-community 2>/dev/null || echo "⚠️  MongoDB may already be running or not installed via Homebrew"
    fi
else
    echo "⚠️  MongoDB not found locally"
    echo "💡 Tip: Use MongoDB Atlas (cloud) - update MONGODB_URI in .env"
fi
echo ""

# Start server
echo "🚀 Starting server..."
echo "📊 Admin Dashboard will be available at: http://localhost:3000/admin"
echo "🔑 Login: admin@ranaelectrical.com / admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
