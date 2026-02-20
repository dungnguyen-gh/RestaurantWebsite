# Deploy to Railway (Best for Full-Stack)

Railway is great for full-stack apps with databases. It has a generous free tier.

---

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub

---

## Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select: `dungnguyen-gh/RestaurantWebsite`

---

## Step 3: Configure Deployment

Railway should auto-detect Next.js. If not:

### Option A: Using Railway Dashboard

1. Select your project
2. Go to **Settings** tab
3. Under **Build & Deploy**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

### Option B: Using `railway.json` Config

Create `railway.json` in your project root:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## Step 4: Add Environment Variables

1. Go to your project in Railway dashboard
2. Click **Variables** tab
3. Click **"New Variable"** for each:

```
DATABASE_URL=postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://djsnrrlsleslgrizmhso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg
```

---

## Step 5: Deploy

1. Go to **Deployments** tab
2. Click **"Deploy"** (if not auto-deploying)
3. Wait for build to complete

Your site will be at: `https://restaurant-website-production.up.railway.app`

---

## Using Railway CLI

### Install CLI
```bash
npm install -g @railway/cli
```

### Login
```bash
railway login
```

### Initialize Project
```bash
cd D:\Unity\WebDevelopment\RestaurantWeb\my-app
railway init
```

### Add Environment Variables
```bash
railway variables set DATABASE_URL="postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

railway variables set NEXT_PUBLIC_SUPABASE_URL="https://djsnrrlsleslgrizmhso.supabase.co"

railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ"

railway variables set SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg"
```

### Deploy
```bash
railway up
```

---

## Railway Pricing (Free Tier)

- **$5 free credit** every month
- **512 MB RAM**
- **1 GB Disk**
- **100 GB egress**
- Good for small to medium traffic

---

## Troubleshooting Railway

### Build Fails
Add `nixpacks.toml` in project root:

```toml
[phases.build]
cmds = ["npm run build"]

[phases.setup]
nixPkgs = ['nodejs_18']
```

### App Won't Start
Check logs in Railway dashboard → Deployments → Click deployment → Logs

### Database Connection Failed
Verify `DATABASE_URL` uses port **6543** (connection pooler)

---

## Railway vs Vercel/Netlify

| Feature | Railway | Vercel | Netlify |
|---------|---------|--------|---------|
| Free Tier | $5 credit/mo | Generous | Generous |
| Database | ✅ Built-in PostgreSQL | ❌ External | ❌ External |
| Docker Support | ✅ Yes | ❌ No | ❌ No |
| Best For | Full-stack apps | Frontend | Static sites |

---

## Recommendation

If you want **simple deployment**: Use **Netlify**
If you want **more control/resources**: Use **Railway**

Both work great with your Next.js app!
