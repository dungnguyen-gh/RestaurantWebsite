# Deploy to Netlify (Alternative to Vercel)

Netlify is a great alternative to Vercel and often works when Vercel has issues.

---

## Option 1: Deploy via Web UI (Easiest)

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
| **Base directory** | (leave empty - your code is in root) |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |

### Step 4: Add Environment Variables

Click **"Show advanced"** → **"New variable"**

Add these 4 variables:

```
DATABASE_URL=postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://djsnrrlsleslgrizmhso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg
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
cd D:\Unity\WebDevelopment\RestaurantWeb\my-app

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
netlify env:set DATABASE_URL "postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://djsnrrlsleslgrizmhso.supabase.co"

netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ"

netlify env:set SUPABASE_SERVICE_ROLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg"
```

### Step 6: Deploy
```bash
netlify deploy --prod
```

---

## Troubleshooting Netlify

### Error: "Command failed with exit code 1"
**Solution**: Check build settings:
- Build command must be: `npm run build`
- Publish directory must be: `.next`

### Error: "Module not found"
**Solution**: Add `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Then install the plugin:
```bash
npm install -D @netlify/plugin-nextjs
```

### Images not loading
**Solution**: Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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

---

## Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Next.js Support | ✅ Good | ✅ Excellent |
| Free Tier | ✅ Generous | ✅ Generous |
| Build Time | ⏱️ 300 min/month | ⏱️ 6000 min/month |
| Bandwidth | ✅ 100GB/month | ✅ 100GB/month |
| Serverless Functions | ✅ Supported | ✅ Supported |

---

## Next Steps After Deployment

1. **Test the website**: Visit the deployed URL
2. **Test admin login**: Go to `/admin/login`
3. **Test database**: Add an item in admin, check if it appears on the menu
4. **Custom domain** (optional): Go to Site settings → Domain management

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js
