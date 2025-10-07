# Quick Render Deployment Guide

## 🚀 Deploy to Render.com (Completely Free!)

This guide will help you deploy your full-stack Todo app to Render in less than 10 minutes.

### Prerequisites
- GitHub account
- Render account (sign up at [render.com](https://render.com))

---

## Step 1: Deploy Backend to Render

### Option A: Using render.yaml (Recommended - Easiest!)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**: `mayankharer/simpleTodo`
4. **Select branch**: `deployment-branch`
5. **Render will automatically detect `render.yaml` and create:**
   - ✅ Web Service (todo-backend)
   - ✅ PostgreSQL Database (todo-database)
6. **Add Environment Variable**:
   - Go to your web service settings
   - Add: `FRONTEND_URL` = `https://your-app-name.vercel.app` (we'll get this in Step 2)
7. **Wait for deployment** (5-10 minutes for first deploy)
8. **Copy your backend URL**: `https://todo-backend.onrender.com`

### Option B: Manual Setup (Alternative)

1. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `todo-database`
   - Region: Oregon (Free)
   - Plan: Free
   - Click "Create Database"
   - Copy the **Internal Database URL**

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub: `mayankharer/simpleTodo`
   - Branch: `deployment-branch`
   - Name: `todo-backend`
   - Region: Oregon (Free)
   - Branch: `deployment-branch`
   - Root Directory: Leave empty
   - Environment: `Java`
   - Build Command: `cd backend && chmod +x mvnw && ./mvnw clean package -DskipTests`
   - Start Command: `cd backend && java -Dserver.port=$PORT -jar target/*.jar`
   - Plan: Free
   
3. **Add Environment Variables**:
   ```
   SPRING_PROFILES_ACTIVE=render
   DATABASE_URL=<paste-internal-database-url>
   FRONTEND_URL=https://your-app-name.vercel.app
   JAVA_VERSION=17
   ```

---

## Step 2: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Click "Add New" → "Project"**
3. **Import GitHub Repository**: `mayankharer/simpleTodo`
4. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variable**:
   ```
   VITE_API_URL=https://todo-backend.onrender.com/api
   ```
   *(Replace with your actual Render backend URL)*

6. **Deploy!** Click "Deploy"

7. **Copy your Vercel URL**: `https://your-app-name.vercel.app`

---

## Step 3: Update CORS Configuration

1. **Go back to Render Dashboard**
2. **Open your web service** (todo-backend)
3. **Go to "Environment"**
4. **Update `FRONTEND_URL`** with your actual Vercel URL:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
5. **Save Changes** (this will trigger a redeploy)

---

## Step 4: Test Your Deployment

1. **Visit your Vercel URL**: `https://your-app-name.vercel.app`
2. **Try creating a todo** - it should work!
3. **Check backend health**: `https://todo-backend.onrender.com/api/test`

---

## 🎉 You're Done!

Your app is now live and completely free!

### Important Notes:

⚠️ **Free tier services sleep after 15 minutes of inactivity**
- First request after sleep takes ~30 seconds to wake up
- Subsequent requests are fast

💡 **To keep your service awake (optional)**:
- Use a service like [cron-job.org](https://cron-job.org) to ping your backend every 10 minutes
- Add a job to ping: `https://todo-backend.onrender.com/api/test`

---

## Troubleshooting

### Build fails on Render
- **Issue**: Maven permission denied
- **Solution**: The build command includes `chmod +x mvnw` - this should fix it automatically

### CORS errors
- **Issue**: Frontend can't connect to backend
- **Solution**: Make sure `FRONTEND_URL` in Render exactly matches your Vercel URL (no trailing slash)

### Backend returns 404
- **Issue**: API endpoints not found
- **Solution**: Make sure you're accessing `/api/todos` not just `/todos`

### Database connection errors
- **Issue**: Can't connect to database
- **Solution**: Use the **Internal Database URL** from Render PostgreSQL (not external)

### First load is slow
- **Issue**: Service takes 30+ seconds to respond
- **Solution**: This is normal for free tier - the service was sleeping

---

## Useful URLs

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Backend**: `https://todo-backend.onrender.com`
- **Your Frontend**: `https://your-app-name.vercel.app`
- **Backend Health Check**: `https://todo-backend.onrender.com/api/test`

---

## What's Included (Free Tier)

✅ **Render Web Service**: 750 hours/month  
✅ **Render PostgreSQL**: 1GB storage, 97 connections  
✅ **Vercel Hosting**: Unlimited deployments  
✅ **Automatic HTTPS**: Free SSL certificates  
✅ **Auto-deploy**: Push to GitHub = automatic deployment  
✅ **100GB bandwidth** per month on both platforms

---

## Need Help?

Check the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) for more options and troubleshooting tips.
