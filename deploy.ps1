Write-Host "🚀 Todo App Deployment Helper" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choose your deployment option:" -ForegroundColor Yellow
Write-Host "1. Render.com + Vercel (Recommended)" -ForegroundColor Green
Write-Host "2. Railway + Vercel" -ForegroundColor Green
Write-Host "3. Supabase + Vercel" -ForegroundColor Green
Write-Host "4. Manual setup" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "📋 Setting up for Render.com + Vercel..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ Backend Deployment (Render.com):" -ForegroundColor Green
        Write-Host "1. Go to https://render.com and sign up with GitHub"
        Write-Host "2. Click 'New +' → 'Web Service'"
        Write-Host "3. Connect this repository"
        Write-Host "4. Use these settings:"
        Write-Host "   - Name: todo-backend"
        Write-Host "   - Build Command: cd backend && ./mvnw clean package -DskipTests"
        Write-Host "   - Start Command: cd backend && java -jar target/*.jar"
        Write-Host "   - Environment: Docker or Java"
        Write-Host "5. Add PostgreSQL database: 'New +' → 'PostgreSQL'"
        Write-Host "6. Set environment variables:"
        Write-Host "   - SPRING_PROFILES_ACTIVE=render"
        Write-Host "   - FRONTEND_URL=https://your-vercel-app.vercel.app"
        Write-Host "   - DATABASE_URL=(from PostgreSQL service)"
        Write-Host ""
        Write-Host "✅ Frontend Deployment (Vercel):" -ForegroundColor Green
        Write-Host "1. Go to https://vercel.com and sign up with GitHub"
        Write-Host "2. Import this repository"
        Write-Host "3. Set build settings:"
        Write-Host "   - Framework: Vite"
        Write-Host "   - Root Directory: frontend"
        Write-Host "   - Build Command: npm run build"
        Write-Host "   - Output Directory: dist"
        Write-Host "4. Add environment variable:"
        Write-Host "   - VITE_API_URL=https://your-render-app.onrender.com/api"
    }
    "2" {
        Write-Host "📋 Setting up for Railway + Vercel..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ Backend Deployment (Railway):" -ForegroundColor Green
        Write-Host "1. Go to https://railway.app and sign up with GitHub"
        Write-Host "2. Click 'New Project' → 'Deploy from GitHub repo'"
        Write-Host "3. Select this repository"
        Write-Host "4. Add PostgreSQL: 'New Service' → 'PostgreSQL'"
        Write-Host "5. Set environment variables:"
        Write-Host "   - SPRING_PROFILES_ACTIVE=railway"
        Write-Host "   - FRONTEND_URL=https://your-vercel-app.vercel.app"
        Write-Host ""
        Write-Host "✅ Frontend Deployment (Vercel): Same as option 1, but use:" -ForegroundColor Green
        Write-Host "   - VITE_API_URL=https://your-railway-app.railway.app/api"
    }
    "3" {
        Write-Host "📋 Setting up for Supabase + Vercel..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ Database Setup (Supabase):" -ForegroundColor Green
        Write-Host "1. Go to https://supabase.com and sign up"
        Write-Host "2. Create a new project"
        Write-Host "3. Note your project URL and API key"
        Write-Host "4. You can either:"
        Write-Host "   - Use Supabase's auto-generated REST API (recommended)"
        Write-Host "   - Or use Supabase as database only with Spring Boot backend"
        Write-Host ""
        Write-Host "✅ Frontend Deployment (Vercel):" -ForegroundColor Green
        Write-Host "If using Supabase REST API directly:"
        Write-Host "   - VITE_API_URL=https://your-project.supabase.co/rest/v1"
        Write-Host "   - Add Supabase client to your React app"
    }
    "4" {
        Write-Host "📋 Manual Setup:" -ForegroundColor Cyan
        Write-Host "Check DEPLOYMENT.md for detailed instructions on all options"
    }
    default {
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📚 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host "🔗 Repository: https://github.com/mayankharer/simpleTodo" -ForegroundColor Yellow