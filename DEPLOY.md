# Deploy to Netlify

This guide explains how to deploy your Restaurant Website to Netlify with secure JWT authentication.

---

## Prerequisites

Before deploying:
1. Code is pushed to GitHub
2. Supabase project is set up
3. You have your environment variables ready
4. You've generated a strong JWT_SECRET

---

## Generate Production JWT Secret

Before deploying, generate a secure JWT secret for production:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or online: https://generate-secret.vercel.app/32
```

Copy this value - you'll need it for the `JWT_SECRET` environment variable.

---

## Option 1: Deploy via Web UI (Recommended)

### Step 1: Create Netlify Account
1. Go to https://app.netlify.com/signup
2. Sign up with GitHub

### Step 2: Import Your Repository
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect to GitHub
3. Select your repository
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

Add these 5 variables:

```
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-generated-secret-from-above
```

**⚠️ Important:** 
- Use the **connection pooler URL** (port 6543) for `DATABASE_URL`
- Generate a **new JWT_SECRET** for production (don't reuse local development secret)
- The JWT_SECRET should be at least 32 characters long

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
netlify env:set JWT_SECRET "your-generated-secret"
```

### Step 6: Deploy
```bash
netlify deploy --prod
```

---

## Post-Deployment Checklist

### Immediate (Required)

1. **Update NEXT_PUBLIC_APP_URL**
   - In Netlify Dashboard → Site settings → Environment variables
   - Add `NEXT_PUBLIC_APP_URL` with your actual Netlify URL
   - Example: `https://restaurant-website-abc123.netlify.app`
   - Trigger a new deploy

2. **Test Authentication**
   - Visit `https://your-domain.netlify.app/admin/login`
   - Login with default credentials
   - Verify you can access the dashboard
   - Test logout functionality

3. **Change Default Password**
   - Go to Supabase Dashboard → Table Editor → `admins` table
   - Update the password hash (or create new admin and delete default)
   - **Never keep `admin123` in production!**

4. **Test All Features**
   - [ ] Homepage loads correctly
   - [ ] Menu items display
   - [ ] Can add items to cart
   - [ ] Checkout works (place test order)
   - [ ] Images upload successfully
   - [ ] Contact form submits

### Security Hardening

1. **Enable Netlify Security Headers** (optional)
   Create `netlify.toml` in project root:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
   ```

2. **Configure CORS in Supabase** (if needed)
   - Go to Supabase Dashboard → API → Settings
   - Add your Netlify domain to CORS origins

3. **Enable RLS (Row Level Security)** in Supabase
   - Review which tables need RLS policies
   - Currently, authentication is handled at the application level

---

## Troubleshooting

### Error: "Command failed with exit code 1"
**Solution**: Check build settings:
- Build command must be: `npm run build`
- Publish directory must be: `.next`

### Error: "Module not found"
**Solution**: The `postinstall` script in `package.json` runs `prisma generate` automatically. If it fails:
1. Check build logs for specific errors
2. Try updating build command to: `npm run postinstall && npm run build`

### Error: "JWT_SECRET is not set"
**Solution**: 
- Add `JWT_SECRET` environment variable in Netlify
- Generate a secure random string (minimum 32 characters)
- Redeploy after adding the variable

### Images not loading
**Solution**: Check `next.config.ts`:

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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

### "DATABASE_URL is not set"
Add the environment variable in Netlify Dashboard → Site settings → Environment variables.

### Authentication not working after deployment
- Check browser console for cookie errors
- Verify `JWT_SECRET` is set and matches between environments
- Ensure cookies are being set (check Application tab in DevTools)
- Check that `credentials: "include"` is used in all fetch requests

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

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key | `eyJhbG...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role | `eyJhbG...` |
| `JWT_SECRET` | Yes | JWT signing secret | `abc123...` (min 32 chars) |
| `NEXT_PUBLIC_APP_URL` | Yes | Your site URL | `https://...netlify.app` |

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Next.js on Netlify: https://docs.netlify.com/integrations/frameworks/next-js
- JWT Authentication: See PROJECT_SUMMARY.md
- Database Issues: See SETUP_SUPABASE.md
