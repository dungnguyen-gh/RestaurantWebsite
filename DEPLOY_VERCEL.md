# Vercel Deployment Guide

Complete guide to deploy your Restaurant E-commerce Website to Vercel and get a public URL.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Prepare Your Project](#2-prepare-your-project)
3. [Deploy via Vercel CLI](#3-deploy-via-vercel-cli-quick)
4. [Deploy via GitHub (Recommended)](#4-deploy-via-github-recommended)
5. [Configure Environment Variables](#5-configure-environment-variables)
6. [Verify Deployment](#6-verify-deployment)
7. [Custom Domain (Optional)](#7-custom-domain-optional)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites

Before deploying, make sure you have:

- ✅ [Supabase project set up](./SETUP_SUPABASE.md)
- ✅ Database schema pushed (`npx prisma db push`)
- ✅ Database seeded with sample data
- ✅ Website working locally (`npm run dev`)
- ✅ Vercel account (free tier works)

> ⚠️ **CRITICAL**: Make sure your `DATABASE_URL` uses **port 6543** (Connection Pooler), NOT port 5432. Vercel is serverless and requires connection pooling.
> 
> 💡 **You can test locally with port 6543!** It works with `npm run dev` so you can use the same URL everywhere. See [SERVERLESS_DATABASE.md](./SERVERLESS_DATABASE.md) for details.

---

## 2. Prepare Your Project

### Step 1: Update Build Configuration
Your `vercel.json` should already have:
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Step 2: Update next.config.ts
Make sure it has:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
```

### Step 3: Update .gitignore
Make sure `.env` and sensitive files are not committed:
```gitignore
.env
.env.local
.env.production
/node_modules
/.next
```

---

## 3. Deploy via Vercel CLI (Quick)

Fastest way to deploy, but less ideal for continuous deployment.

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
- This opens a browser window
- Authorize the CLI
- Return to terminal

### Step 3: Deploy
```bash
cd my-app
vercel --prod
```

The CLI will ask:
- **Set up "~/my-app"?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `restaurant-website` (or your choice)
- **Directory?** → ./ (current)

### Step 4: Add Environment Variables
After first deploy, add environment variables:
```bash
vercel env add DATABASE_URL
# Paste your connection string

vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://your-project.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste your service role key

vercel env add NEXT_PUBLIC_APP_URL
# Paste your Vercel URL (e.g., https://restaurant-website.vercel.app)
```

Or do it in the Vercel Dashboard (see Method 2).

### Step 5: Redeploy
```bash
vercel --prod
```

---

## 4. Deploy via GitHub (Recommended)

This method gives you automatic deployments on every git push.

### Step 1: Create GitHub Repository

#### Option A: Create New Repo on GitHub
1. Go to https://github.com/new
2. Repository name: `restaurant-website`
3. Make it Public or Private
4. Don't initialize with README (we have one)
5. Click **Create repository**

#### Option B: Use Existing Repo
Skip to Step 2 if you already have a repository.

### Step 2: Push Your Code
```bash
cd my-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Restaurant website ready for deployment"

# Rename branch to main
git branch -M main

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/restaurant-website.git

# Push
git push -u origin main
```

### Step 3: Import to Vercel

1. Go to https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. Find and select your `restaurant-website` repository
4. Click **Import**

### Step 4: Configure Project

On the configuration screen:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | ./ |
| Build Command | `prisma generate && next build` |
| Output Directory | .next |
| Install Command | npm install |

Click **Deploy** (we'll add env vars after).

### Step 5: Add Environment Variables

After the first build (which will fail due to missing env vars):

1. In Vercel Dashboard, click your project
2. Go to **Settings** tab
3. Click **Environment Variables** in left sidebar
4. Add each variable:

#### Required Environment Variables

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | Your Supabase connection string | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_URL` | https://your-project.supabase.co | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | https://your-domain.vercel.app | Production, Preview, Development |

> ⚠️ **CRITICAL - DATABASE_URL Format for Vercel:**
> 
> You MUST use port **6543** (Connection Pooler), NOT port 5432:
> ```
> postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
> ```
> 
> See [SERVERLESS_DATABASE.md](./SERVERLESS_DATABASE.md) for why this is required.

**How to add:**
1. Click **Add** button
2. Enter **Name** (e.g., `DATABASE_URL`)
3. Enter **Value** (paste the connection string with port 6543)
4. Check all environments: ☑️ Production ☑️ Preview ☑️ Development
5. Click **Save**
6. Repeat for all 5 variables

### Step 6: Redeploy

1. Go to your project in Vercel Dashboard
2. Click **Deployments** tab
3. Find the latest deployment
4. Click the **...** menu → **Redeploy**
5. Check "Use existing Build Cache" → **Redeploy**

Or push a new commit:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

## 5. Configure Environment Variables

### Complete Environment Variables Reference

Here's the full list of environment variables you need:

```bash
# Database (PostgreSQL via Supabase)
# ⚠️ CRITICAL: Use port 6543 for Vercel (Connection Pooler)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."

# Application URL (your Vercel URL)
NEXT_PUBLIC_APP_URL="https://[YOUR_PROJECT_NAME].vercel.app"
```

> 📖 **Note**: Port 6543 is required for serverless environments like Vercel. See [SERVERLESS_DATABASE.md](./SERVERLESS_DATABASE.md) for detailed explanation.

### Getting Your Vercel URL

After first deployment (even if it fails):
1. Look at the deployment URL in Vercel Dashboard
2. Copy it (e.g., `https://restaurant-website-abc123.vercel.app`)
3. Add it as `NEXT_PUBLIC_APP_URL`
4. Redeploy

---

## 6. Verify Deployment

### Checklist After Deployment

#### Public Pages
- [ ] **Homepage** loads: `https://your-site.vercel.app/`
- [ ] **Menu page** loads: `https://your-site.vercel.app/menu`
- [ ] **Cart** works: Add items, adjust quantities
- [ ] **Checkout** works: Submit test order
- [ ] **Contact page** loads: `https://your-site.vercel.app/contact`

#### Admin Panel
- [ ] **Login page** loads: `https://your-site.vercel.app/admin/login`
- [ ] Login works with default credentials
- [ ] **Dashboard** loads with statistics
- [ ] Can **add menu items**
- [ ] Can **upload images**
- [ ] Can **view orders**

#### Database
- [ ] Orders are saved to Supabase
- [ ] Menu items display correctly

### Testing the Live Site

```bash
# Visit these URLs and verify:
https://your-domain.vercel.app/           # Homepage
https://your-domain.vercel.app/menu       # Menu
https://your-domain.vercel.app/cart       # Cart
https://your-domain.vercel.app/checkout   # Checkout
https://your-domain.vercel.app/contact    # Contact
https://your-domain.vercel.app/admin/login # Admin login
```

---

## 7. Custom Domain (Optional)

### Add Your Own Domain

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Domains**
3. Enter your domain (e.g., `myrestaurant.com`)
4. Click **Add**
5. Follow DNS configuration instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use A records if using apex domain

### Update Environment Variables

After adding custom domain:
1. Update `NEXT_PUBLIC_APP_URL` to your custom domain
2. Redeploy

---

## 8. Troubleshooting

### 🔴 CRITICAL: Using Port 5432 Instead of 6543

**Problem**: Website works locally but fails on Vercel with connection errors.

**Error Messages**:
- "Too many connections"
- "Connection terminated unexpectedly"
- "Timeout acquiring connection"

**Solution**: **Use port 6543 (Connection Pooler) for Vercel!**

```bash
# ❌ WRONG - Port 5432 (Direct Connection)
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"

# ✅ CORRECT - Port 6543 (Connection Pooler)
DATABASE_URL="postgresql://postgres.project:password@aws-0-region.pooler.supabase.com:6543/postgres"
```

See [SERVERLESS_DATABASE.md](./SERVERLESS_DATABASE.md) for complete explanation.

### Build Failed: "DATABASE_URL is not set"
**Solution**: Add the environment variable in Vercel Dashboard → Settings → Environment Variables

### Build Failed: "Prisma schema validation error"
**Solution**: Run `npx prisma generate` locally, commit `prisma/client`, or update build command to include it.

### Images Not Loading
**Solution**: 
1. Check Supabase storage bucket is public
2. Verify `next.config.ts` has correct image domains
3. Check CORS settings in Supabase

### Error: "Connection refused" to database
**Solution**: Use Supabase Transaction Pooler URL instead of direct connection:
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### Admin Login Not Working
**Solution**: 
1. Make sure database is seeded: `/api/admin/seed` (POST)
2. Check that `Admin` table exists in Supabase
3. Verify default credentials: `admin@restaurant.com` / `admin123`

### 500 Internal Server Error
**Solution**: 
1. Check Vercel Logs: Dashboard → Your Project → View Function Logs
2. Common causes:
   - Missing environment variables
   - Database connection issues
   - Missing `prisma generate` in build step

---

## Post-Deployment Checklist

### Security
- [ ] Change default admin password (`admin@restaurant.com` / `admin123`)
- [ ] Delete test orders from database
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Verify Supabase RLS policies are correct

### Content
- [ ] Replace Unsplash placeholder images with real food photos
- [ ] Update restaurant name and description
- [ ] Update contact information
- [ ] Verify menu items and prices

### SEO
- [ ] Update metadata in `app/layout.tsx`
- [ ] Add restaurant description
- [ ] Set up Google Analytics (optional)

---

## Useful Commands

```bash
# Deploy to production
vercel --prod

# View deployment logs
vercel logs --all

# Open project in browser
vercel open

# List deployments
vercel list

# Remove project
vercel remove

# Pull environment variables to local
vercel env pull .env.local
```

---

## Resources

- Vercel Docs: https://vercel.com/docs
- Next.js on Vercel: https://nextjs.org/docs/deployment
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
- Custom Domains: https://vercel.com/docs/concepts/projects/custom-domains

---

## Your Public URL

After successful deployment, your website will be available at:

```
https://[YOUR_PROJECT_NAME].vercel.app
```

**Example:**
```
https://restaurant-website-abc123.vercel.app
```

Or if you added a custom domain:
```
https://your-domain.com
```

---

## Next Steps

1. ✅ Share your URL with customers
2. ✅ Set up payment processing (Stripe, PayPal)
3. ✅ Add Google Analytics
4. ✅ Create social media accounts
5. ✅ Start accepting orders!

**Congratulations! Your restaurant website is now live! 🎉**
