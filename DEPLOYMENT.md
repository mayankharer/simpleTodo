# Deployment Guide

This is a full-stack Todo application with Spring Boot backend and React frontend that can be deployed completely free using multiple cloud providers.

## Free Deployment Options

### Option 1: Render + Vercel (Recommended)
- **Backend**: Spring Boot with PostgreSQL (deployed on Render)
- **Frontend**: React with Vite (deployed on Vercel)
- **Database**: PostgreSQL (provided by Render)
- **Cost**: Completely free (750 hours/month for backend)

### Option 2: Railway + Vercel
- **Backend**: Spring Boot with PostgreSQL (deployed on Railway)
- **Frontend**: React with Vite (deployed on Vercel)
- **Database**: PostgreSQL (provided by Railway)
- **Cost**: Completely free (500 hours/month for backend)

### Option 3: Supabase + Vercel
- **Backend**: Supabase (Database + API)
- **Frontend**: React with Vite (deployed on Vercel)
- **Database**: PostgreSQL (provided by Supabase)
- **Cost**: Completely free with generous limits

## Deployment Steps

## Option 1: Render.com Deployment (Recommended)

### 1. Backend Deployment (Render)

1. **Sign up for Render**: Go to [render.com](https://render.com) and sign up with GitHub
2. **Create a Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose this repository
3. **Configure the service**:
   - **Name**: `todo-backend`
   - **Environment**: `Docker` or `Java`
   - **Build Command**: `cd backend && ./mvnw clean package -DskipTests`
   - **Start Command**: `cd backend && java -jar target/*.jar`
   - **Instance Type**: Free
4. **Environment Variables**:
   ```
   SPRING_PROFILES_ACTIVE=prod
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=8080
   ```
5. **Add PostgreSQL Database**:
   - In Render dashboard, click "New +" → "PostgreSQL"
   - **Name**: `todo-database`
   - **Database**: `todo`
   - **User**: `todo_user`
   - Copy the connection details and add to your web service:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

### Alternative: Railway Deployment

1. **Sign up for Railway**: Go to [railway.app](https://railway.app) and sign up with GitHub
2. **Connect your repository**: 
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository
3. **Configure the service**:
   - Railway will auto-detect it's a Java project
   - Set the following environment variables in Railway:
     ```
     SPRING_PROFILES_ACTIVE=railway
     FRONTEND_URL=https://your-vercel-app.vercel.app
     ```
4. **Add PostgreSQL database**:
   - In your Railway project, click "New Service"
   - Select "PostgreSQL"
   - Railway will automatically provide DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD

### 2. Frontend Deployment (Vercel)

1. **Sign up for Vercel**: Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. **Deploy the frontend**:
   - Click "New Project"
   - Import this repository
   - Vercel will auto-detect it's a React project
3. **Configure environment variables**:
   - In your Vercel project settings, add:
     ```
     VITE_API_URL=https://your-render-app.onrender.com/api
     ```
     (Or use your Railway URL: `https://your-railway-app.railway.app/api`)
4. **Update build settings** (if needed):
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`

### 3. Final Configuration

1. **Update CORS in Railway**:
   - Go to your Railway service environment variables
   - Update `FRONTEND_URL` to your actual Vercel URL: `https://your-vercel-app.vercel.app`

2. **Update API URL in Vercel**:
   - Go to your Vercel project environment variables
   - Update `VITE_API_URL` to your actual Railway URL: `https://your-railway-app.railway.app/api`

3. **Redeploy both services** after updating environment variables

## Local Development

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables Summary

### Render (Backend)
- `SPRING_PROFILES_ACTIVE=render` (or `prod` for generic production)
- `FRONTEND_URL=https://your-vercel-app.vercel.app`
- `DATABASE_URL=postgresql://user:password@host:port/database` (provided by Render PostgreSQL)
- `PORT=8080` (auto-provided by Render)

### Railway (Backend - Alternative)
- `SPRING_PROFILES_ACTIVE=railway`
- `FRONTEND_URL=https://your-vercel-app.vercel.app`
- `DATABASE_URL` (auto-provided by Railway PostgreSQL)
- `DATABASE_USERNAME` (auto-provided by Railway PostgreSQL)
- `DATABASE_PASSWORD` (auto-provided by Railway PostgreSQL)
- `PORT` (auto-provided by Railway, defaults to 8080)

### Vercel (Frontend)
- `VITE_API_URL=https://your-render-app.onrender.com/api` (or Railway URL)

## Free Tier Limits

### Render.com
- **Web Service**: 750 hours per month (sleeps after 15 min of inactivity)
- **PostgreSQL**: 1GB storage, 97 connections max
- **Bandwidth**: 100GB/month

### Railway
- **Usage**: 500 hours per month (plenty for hobby projects)
- **PostgreSQL**: 1GB storage, 100 connections

### Vercel
- **Hosting**: Unlimited for personal projects
- **Bandwidth**: 100GB/month
- **Serverless Functions**: 100GB-hours execution time

### Other Free Alternatives

#### Option 3: Supabase + Vercel
1. **Supabase Setup**:
   - Sign up at [supabase.com](https://supabase.com)
   - Create a new project with PostgreSQL database
   - Use Supabase's auto-generated REST API instead of Spring Boot
   - Or use Supabase as database only with your Spring Boot backend

2. **Benefits**:
   - 500MB database storage
   - 2GB bandwidth per month
   - Real-time subscriptions
   - Built-in authentication

#### Option 4: PlanetScale + Vercel Functions
1. **PlanetScale**: Free MySQL database (5GB storage)
2. **Vercel Functions**: Deploy backend as serverless functions
3. **Benefits**: Serverless scaling, branching database schema

#### Option 5: Fly.io + ElephantSQL
1. **Fly.io**: 3 shared-cpu-1x VMs with 256MB RAM each
2. **ElephantSQL**: Free PostgreSQL (20MB storage)
3. **Benefits**: More control over deployment, Docker-based

## Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure FRONTEND_URL in your backend service matches your Vercel URL exactly
2. **API not found**: Ensure VITE_API_URL in Vercel points to your backend URL with `/api` suffix
3. **Database connection issues**: Check that PostgreSQL service is running and DATABASE_URL is set correctly
4. **Build failures**: 
   - Render: Check Java version (should be 17+)
   - Railway: Ensure proper build commands
   - Maven: Run `./mvnw clean package` locally first
5. **Service sleeping**: Free tier services sleep after inactivity
   - Render: 15 minutes
   - Railway: Based on usage hours

### Logs and Debugging:
- **Render**: Check build logs and runtime logs in service dashboard
- **Railway**: Check deployment logs in Railway dashboard  
- **Vercel**: Check function logs and build logs in Vercel dashboard
- **Supabase**: Check logs in Supabase dashboard

### Quick Deployment Commands:

Run the deployment helper:
```bash
# Linux/Mac
./deploy.sh

# Windows PowerShell  
./deploy.ps1
```

Or manually check your setup:
```bash
# Test backend locally
cd backend && ./mvnw spring-boot:run

# Test frontend locally
cd frontend && npm run dev
```

### Cost Comparison:

| Platform | Backend Hours | Database Storage | Bandwidth | Best For |
|----------|---------------|------------------|-----------|----------|
| Render | 750 hrs/month | 1GB PostgreSQL | 100GB | Full-stack apps |
| Railway | 500 hrs/month | 1GB PostgreSQL | 100GB | Simple deployment |
| Supabase | Always on | 500MB PostgreSQL | 2GB | Real-time features |
| Vercel + PlanetScale | Serverless | 5GB MySQL | 100GB | Serverless architecture |

**Recommendation**: Start with **Render + Vercel** for the most generous free tier and easy setup.