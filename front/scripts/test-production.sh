#!/bin/bash

# Production Performance Testing Script
set -e

echo "🚀 Starting production performance test..."

# Kill any existing processes on port 3000
echo "🔌 Stopping any existing servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Build production version
echo "📦 Building production version..."
pnpm build

# Start production server in background
echo "🌟 Starting production server..."
pnpm start &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Check if server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Production server is running!"
    echo "🔗 Visit: http://localhost:3000"
    echo "📊 Run Lighthouse: pnpm run performance:test"
    echo ""
    echo "🎯 Performance Testing URLs:"
    echo "   • Homepage: http://localhost:3000"
    echo "   • Catalogue: http://localhost:3000/catalogue"
    echo "   • About: http://localhost:3000/about"
    echo ""
    echo "💡 To stop the server: kill $SERVER_PID"
    echo "💡 Server PID: $SERVER_PID"
else
    echo "❌ Failed to start production server"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi