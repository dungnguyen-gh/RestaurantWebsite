# Deploy to Render (Free Alternative)

Render has a generous free tier and is simple to use.

---

## Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub

---

## Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account
3. Select repository: `dungnguyen-gh/RestaurantWebsite`
4. Click **"Connect"**

---

## Step 3: Configure Service

Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `restaurant-website` |
| **Region** | Choose closest (Singapore for Asia) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install; npm run build` |
| **Start Command** | `npm start` |

---

## Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add all 4 variables:

```
DATABASE_URL=postgresql://postgres.djsnrrlsleslgrizmhso:Manhdung%23123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://djsnrrlsleslgrizmhso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjkxNjMsImV4cCI6MjA4NjgwNTE2M30.D5uvHttwtqRGEln8WUoWteOYD7a_lKiqelszKxCcPNQ
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqc25ycmxzbGVzbGdyaXptaHNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIyOTE2MywiZXhwIjoyMDg2ODA1MTYzfQ.MHY2-eqNn_AOZWOgQ-btt_I-mwRR9wARugPA2Use7Zg
```

---

## Step 5: Deploy

Click **"Create Web Service"**

Wait for the build to complete (5-10 minutes for first deploy).

Your site will be at: `https://restaurant-website.onrender.com`

---

## Free Tier Limits

- **Web Services**: 512 MB RAM, shared CPU
- **Bandwidth**: 100 GB/month
- **Build minutes**: 500 minutes/month
- **Sleeping**: Free web services sleep after 15 min inactivity (wakes up on next request)

---

## Keep Service Awake (Optional)

Since free tier sleeps after 15 min, you can use a ping service:

1. Go to https://uptimerobot.com
2. Create free account
3. Add monitor:
   - Type: HTTP(s)
   - URL: Your Render URL
   - Interval: Every 5 minutes

This keeps your site awake 24/7.

---

## Troubleshooting Render

### Build fails with "Out of memory"
**Solution**: Add `NODE_OPTIONS` environment variable:
```
NODE_OPTIONS=--max-old-space-size=4096
```

### "Cannot find module"
**Solution**: Make sure `npm install` is in build command

### Images not loading
**Solution**: Update `next.config.ts`:
```typescript
images: {
  unoptimized: true,
}
```

---

## Quick Comparison

| Platform | Free Tier | Best For | Difficulty |
|----------|-----------|----------|------------|
| **Vercel** | Generous | Next.js | Easy |
| **Netlify** | Generous | Static/Jamstack | Easy |
| **Railway** | $5 credit | Full-stack | Medium |
| **Render** | Good | General apps | Easy |

---

## My Recommendation

Try **Netlify first** - it's the easiest alternative to Vercel and works great with Next.js!

If that fails too, try **Render** - very reliable free tier.
