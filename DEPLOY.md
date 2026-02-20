# Deploy to Netlify

This guide explains how to deploy your Restaurant Website to Netlify.

---

## Prerequisites

Before deploying:
1. Code is pushed to GitHub
2. Supabase project is set up
3. You have your environment variables ready

---

## Option 1: Deploy via Web UI (Recommended)

### Step 1: Create Netlify Account
1. Go to https://app.netlify.com/signup
2. Sign up with GitHub

### Step 2: Import Your Repository
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect to GitHub
3. Select your repository: `dungnguyen-gh/RestaurantWebsite`
4. Click **"Install"** if prompted

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | (leave empty) |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |

### Step 4: Add Environment Variables

Click **"Show advanced"** → **"New variable"**

Add these 4 variables (get values from your `.env` file):

```
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 5: Deploy
Click **"Deploy site"**

Wait 3-5 minutes for the build to complete.

Your site will be at: `https://restaurant-website-xxx.netlify.app`

---

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```
(A browser will open - authorize Netlify)

### Step 3: Initialize Project
```bash
cd my-app
netlify init
```

Select:
- **Create & configure a new site**
- **Your team**
- **Site name**: `restaurant-website`

### Step 4: Set Build Settings
When prompted:
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### Step 5: Add Environment Variables
```bash
netlify env:set DATABASE_URL "your-database-url"
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your-supabase-url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your-service-key"
```

### Step 6: Deploy
```bash
netlify deploy --prod
```

---

## Troubleshooting

### Error: "Command failed with exit code 1"
**Solution**: Check build settings:
- Build command must be: `npm run build`
- Publish directory must be: `.next`

### Error: "Module not found"
**Solution**: The `postinstall` script in `package.json` runs `prisma generate` automatically. If it fails, check the build logs.

### Images not loading
**Solution**: Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

### "DATABASE_URL is not set"
Add the environment variable in Netlify Dashboard → Site settings → Environment variables.

---

## After Deployment

1. **Test the website**: Visit the deployed URL
2. **Test admin login**: Go to `/admin/login`
3. **Test database**: Add an item in admin, check if it appears on the menu
4. **Custom domain** (optional): Go to Site settings → Domain management

---

## Updating Your Site

After making changes:
1. Commit and push to GitHub: `git push origin main`
2. Netlify automatically redeploys

Or trigger manual deploy:
- Netlify Dashboard → Deploys → Trigger deploy

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js
