#!/bin/bash

echo "🚀 Todo App Deployment Helper"
echo "=============================="
echo ""
echo "Choose your deployment option:"
echo "1. Render.com + Vercel (Recommended)"
echo "2. Railway + Vercel"
echo "3. Supabase + Vercel"
echo "4. Manual setup"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo "📋 Setting up for Render.com + Vercel..."
    echo ""
    echo "✅ Backend Deployment (Render.com):"
    echo "1. Go to https://render.com and sign up with GitHub"
    echo "2. Click 'New +' → 'Web Service'"
    echo "3. Connect this repository"
    echo "4. Use these settings:"
    echo "   - Name: todo-backend"
    echo "   - Build Command: cd backend && ./mvnw clean package -DskipTests"
    echo "   - Start Command: cd backend && java -jar target/*.jar"
    echo "   - Environment: Docker or Java"
    echo "5. Add PostgreSQL database: 'New +' → 'PostgreSQL'"
    echo "6. Set environment variables:"
    echo "   - SPRING_PROFILES_ACTIVE=render"
    echo "   - FRONTEND_URL=https://your-vercel-app.vercel.app"
    echo "   - DATABASE_URL=(from PostgreSQL service)"
    echo ""
    echo "✅ Frontend Deployment (Vercel):"
    echo "1. Go to https://vercel.com and sign up with GitHub"
    echo "2. Import this repository"
    echo "3. Set build settings:"
    echo "   - Framework: Vite"
    echo "   - Root Directory: frontend"
    echo "   - Build Command: npm run build"
    echo "   - Output Directory: dist"
    echo "4. Add environment variable:"
    echo "   - VITE_API_URL=https://your-render-app.onrender.com/api"
    ;;
  2)
    echo "📋 Setting up for Railway + Vercel..."
    echo ""
    echo "✅ Backend Deployment (Railway):"
    echo "1. Go to https://railway.app and sign up with GitHub"
    echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
    echo "3. Select this repository"
    echo "4. Add PostgreSQL: 'New Service' → 'PostgreSQL'"
    echo "5. Set environment variables:"
    echo "   - SPRING_PROFILES_ACTIVE=railway"
    echo "   - FRONTEND_URL=https://your-vercel-app.vercel.app"
    echo ""
    echo "✅ Frontend Deployment (Vercel): Same as option 1, but use:"
    echo "   - VITE_API_URL=https://your-railway-app.railway.app/api"
    ;;
  3)
    echo "📋 Setting up for Supabase + Vercel..."
    echo ""
    echo "✅ Database Setup (Supabase):"
    echo "1. Go to https://supabase.com and sign up"
    echo "2. Create a new project"
    echo "3. Note your project URL and API key"
    echo "4. You can either:"
    echo "   - Use Supabase's auto-generated REST API (recommended)"
    echo "   - Or use Supabase as database only with Spring Boot backend"
    echo ""
    echo "✅ Frontend Deployment (Vercel):"
    echo "If using Supabase REST API directly:"
    echo "   - VITE_API_URL=https://your-project.supabase.co/rest/v1"
    echo "   - Add Supabase client to your React app"
    ;;
  4)
    echo "📋 Manual Setup:"
    echo "Check DEPLOYMENT.md for detailed instructions on all options"
    ;;
  *)
    echo "❌ Invalid choice. Please run the script again."
    ;;
esac

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo "🔗 Repository: https://github.com/mayankharer/simpleTodo"