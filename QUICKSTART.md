# Quick Start Guide

Get your Restaurant E-commerce Website running in 15 minutes.

---

## Overview

This guide walks you through:
1. Setting up Supabase (database + storage)
2. Configuring environment variables
3. Testing locally
4. Deploying to Netlify

**Estimated time**: 15-30 minutes

---

## Step 1: Set Up Supabase (10 mins)

### 1.1 Create Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click **New Project**
4. Name: `restaurant-website`
5. **SAVE YOUR DATABASE PASSWORD!**
6. Choose region closest to you
7. Wait for project to create (2-3 mins)

### 1.2 Get Connection Details
In Supabase Dashboard:

**Database URL (use Connection Pooler - port 6543):**
1. Settings → Database
2. Find **Connection pooler** section (NOT the direct connection)
3. Copy the connection string with port **6543**
4. Replace `[YOUR-PASSWORD]` with your actual password

**API Keys:**
1. Settings → API
2. Copy `anon public` key
3. Copy `service_role secret` key
4. Copy Project URL

**Save these 4 values!**

### 1.3 Create Storage Bucket
1. Storage → New bucket
2. Name: `restaurant-images`
3. ✅ Check "Public bucket"
4. Click Create
5. Click on bucket → Policies
6. Add policies:
   - `Allow public read` (SELECT) - roles: anon, authenticated
   - `Allow authenticated uploads` (INSERT) - roles: authenticated
   - `Allow authenticated delete` (DELETE) - roles: authenticated

---

## Step 2: Configure Environment (5 mins)

Create `my-app/.env`:

```env
# Database (Use port 6543)
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:6543/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Replace:
- `YOUR_PROJECT_REF` → From Supabase URL (e.g., `abcdefghijklm`)
- `YOUR_PASSWORD` → Your database password
- `YOUR_REGION` → Your Supabase region (e.g., `us-east-1`, `ap-southeast-1`)
- `your-anon-key-here` → From Supabase API settings
- `your-service-role-key-here` → From Supabase API settings

---

## Step 3: Initialize Database (3 mins)

Open terminal in `my-app` folder:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run seed
```

You should see:
```
🌱 Starting database seed...
👤 Creating default admin...
✅ Admin created:
   Email: admin@restaurant.com
   Password: admin123
🍽️ Creating sample menu items...
✅ Created 10 menu items
🎉 Database seed completed successfully!
```

---

## Step 4: Test Locally (5 mins)

```bash
npm run dev
```

Open browser:
- **Website**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login
  - Email: `admin@restaurant.com`
  - Password: `admin123`

**Test these:**
- [ ] Homepage loads
- [ ] Menu shows food items
- [ ] Can add to cart
- [ ] Can checkout
- [ ] Admin login works
- [ ] Can add menu items
- [ ] Can upload images

---

## Step 5: Deploy to Netlify (10 mins)

### Push to GitHub

```bash
cd my-app
git add .
git commit -m "Initial commit"
git push origin main
```

### Deploy on Netlify

1. Go to https://app.netlify.com/start
2. Connect GitHub and select your repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Click **"Show advanced"** → **"New variable"**
5. Add all 4 environment variables (same values from your `.env` file)
6. Click **"Deploy site"**

Wait 3-5 minutes for the build to complete.

---

## Step 6: Get Your Public URL

After deployment, Netlify gives you a URL:

```
https://restaurant-website-abc123.netlify.app
```

**Update environment variable:**
1. In Netlify Dashboard → Site settings → Environment variables
2. Add `NEXT_PUBLIC_APP_URL` with your actual URL
3. Trigger a new deploy (Deploys → Trigger deploy)

---

## Done! 🎉

Your restaurant website is now live and accessible worldwide!

**Website**: `https://your-domain.netlify.app`  
**Admin**: `https://your-domain.netlify.app/admin/login`

---

## Next Steps

### Immediate (Required)
- [ ] Change default admin password (`admin123`)
- [ ] Upload real food images
- [ ] Update restaurant name and description
- [ ] Update contact information

### Soon (Recommended)
- [ ] Connect custom domain
- [ ] Set up payment processing (Stripe)
- [ ] Add Google Analytics
- [ ] Create social media accounts

### Later (Optional)
- [ ] Enable email notifications
- [ ] Add reservation system
- [ ] Multi-language support
- [ ] Customer reviews feature

---

## Common Issues

### "DATABASE_URL is not set"
Add the environment variable in Netlify Dashboard → Site settings → Environment variables.

### "Cannot find module '@prisma/client'"
The `postinstall` script in `package.json` should handle this. If not, update build command to: `npm run postinstall && npm run build`

### Images not uploading
Check Supabase storage bucket is public and policies are set.

### Admin login not working
Run `npm run seed` again or visit `/api/admin/seed` (POST).

---

## Need Help?

| Issue | See File |
|-------|----------|
| Database setup | [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) |
| Deployment | [DEPLOY.md](./DEPLOY.md) |
| Full documentation | [README.md](./README.md) |
| Project structure | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) |

---

## Summary of Files

| File | Purpose |
|------|---------|
| `README.md` | Full project documentation |
| `SETUP_SUPABASE.md` | Detailed Supabase setup guide |
| `DEPLOY.md` | Detailed Netlify deployment guide |
| `QUICKSTART.md` | This file - quick reference |
| `PROJECT_SUMMARY.md` | Code architecture overview |

---

**Good luck with your restaurant website! 🍽️**
