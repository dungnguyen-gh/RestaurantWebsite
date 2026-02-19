# Troubleshooting Port 6543 Connection Issues

If you're using port 6543 (Connection Pooler) and `npm run dev` doesn't work, here are the common causes and solutions.

---

## Quick Diagnostic Checklist

- [ ] Username format is correct: `postgres.PROJECT_REF` (not just `postgres`)
- [ ] Password is correct
- [ ] Supabase project is active (not paused)
- [ ] Internet connection is working
- [ ] URL has `.pooler.` in the hostname
- [ ] Port is `6543` (not `5432`)

---

## Common Issues & Solutions

### Issue 1: Wrong Username Format (Most Common!)

**Problem**: Using `postgres` as username instead of `postgres.PROJECT_REF`

**❌ WRONG:**
```env
DATABASE_URL="postgresql://postgres:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**✅ CORRECT:**
```env
DATABASE_URL="postgresql://postgres.abcdefghijklm:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**How to Fix:**
1. Go to Supabase Dashboard → Connect → Transaction pooler
2. Look at the connection string carefully
3. The username should be `postgres.[PROJECT_REF]`
4. Copy the entire string exactly as shown

---

### Issue 2: Supabase Project is Paused

**Problem**: Free tier Supabase projects pause after 7 days of inactivity

**Symptoms:**
- Connection timeout
- "Project not found" errors
- Website was working before but stopped

**How to Fix:**
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Find your project
3. If you see "Project paused" banner, click **Restore Project**
4. Wait 1-2 minutes for restoration
5. Try `npm run dev` again

**Prevention:**
- Visit your Supabase dashboard periodically
- Set up a ping to keep it active
- Or upgrade to Pro tier (never pauses)

---

### Issue 3: Wrong Password

**Problem**: Password doesn't match what Supabase expects

**Symptoms:**
- "Authentication failed"
- "Password authentication failed"

**How to Fix:**
1. Reset your database password:
   - Supabase Dashboard → Settings → Database
   - Scroll to "Database password"
   - Click **Reset password**
   - Save the new password
2. Update your `.env` file with the new password
3. Restart your dev server: `npm run dev`

---

### Issue 4: Internet Connection Required

**Problem**: Port 6543 requires internet (unlike port 5432)

**Symptoms:**
- "Connection refused"
- "Network is unreachable"
- Works when online, fails when offline

**How to Fix:**
- Ensure you have an active internet connection
- Check if firewall is blocking port 6543
- Try accessing other websites to verify connectivity

**Alternative for Offline Development:**
If you need to work offline, use port 5432 for local only:
```env
# Use port 5432 for offline local development
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

---

### Issue 5: Wrong Region in URL

**Problem**: Using wrong AWS region in the connection URL

**❌ WRONG (mismatched region):**
```env
# Project is in us-east-1 but URL says eu-west-1
DATABASE_URL="postgresql://postgres.project:pass@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
```

**How to Fix:**
1. Check your project region in Supabase Dashboard
2. Look at the URL in the top bar: `https://supabase.com/dashboard/project/xxx`
3. Or check Settings → General → Region
4. Make sure the region in your URL matches

**Common Regions:**
- `us-east-1` (N. Virginia)
- `us-west-1` (Oregon)
- `eu-west-1` (Ireland)
- `eu-west-2` (London)
- `ap-southeast-1` (Singapore)

---

### Issue 6: Environment Variables Not Loaded

**Problem**: `.env` file changes not picked up

**Symptoms:**
- Changes to `.env` don't seem to take effect
- Still seeing old connection errors

**How to Fix:**
```bash
# 1. Stop the dev server (Ctrl+C)

# 2. Restart fresh
npm run dev
```

Or if using Next.js with Turbopack:
```bash
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

---

### Issue 7: Database Schema Not Pushed

**Problem**: Database tables don't exist yet

**Symptoms:**
- "Relation does not exist"
- "Table not found"
- Other database errors

**How to Fix:**
```bash
# Push schema to database
cd my-app
npx prisma db push

# Seed with sample data
npm run seed
```

---

## How to Get the CORRECT Connection String

### Step-by-Step:

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Click your project

2. **Click "Connect" Button**
   - Top right of the dashboard
   - Looks like a plug icon 🔌

3. **Select "Transaction pooler"**
   - Look for the section labeled "Transaction pooler"
   - Make sure it says port `6543`

4. **Copy the URI**
   - Should look like:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

5. **Paste into .env**
   ```env
   DATABASE_URL="postgresql://postgres.abcdefghijklm:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
   ```

---

## Testing Your Connection

### Test 1: Check if URL is correct format
```bash
# Should contain ALL of these:
echo $DATABASE_URL | grep "postgres."      # Check for project ref
echo $DATABASE_URL | grep "pooler"         # Check for pooler
echo $DATABASE_URL | grep "6543"           # Check for port 6543
```

### Test 2: Check if Supabase is reachable
```bash
# Replace with your actual pooler hostname
ping aws-0-us-east-1.pooler.supabase.com
```

### Test 3: Check Prisma connection
```bash
cd my-app
npx prisma db pull
```
If this works, your connection string is correct!

---

## Working Example

Here's a complete working example:

### .env file:
```env
DATABASE_URL="postgresql://postgres.abcdefghijklm:MySecurePassword123!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijklm.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Breakdown:
| Component | Example | Your Value |
|-----------|---------|------------|
| Username | `postgres.abcdefghijklm` | `postgres.YOUR_PROJECT_REF` |
| Password | `MySecurePassword123!` | Your actual password |
| Host | `aws-0-us-east-1.pooler.supabase.com` | Your region's pooler |
| Port | `6543` | Must be `6543` |
| Database | `postgres` | Usually `postgres` |

---

## Still Not Working?

### Debug Steps:

1. **Check Supabase Project Status:**
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_REF
   ```
   - Is it showing "Active" or "Paused"?

2. **Test with Direct Connection (Port 5432):**
   ```env
   # Try this temporarily
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
   ```
   - If this works but 6543 doesn't → Username or region issue
   - If neither works → Password or project paused

3. **Check Vercel Logs (if deployed):**
   - Sometimes works locally but not on Vercel
   - Check Vercel Dashboard → Your Project → Functions tab

4. **Regenerate Connection String:**
   - Go to Supabase → Connect → Transaction pooler
   - Copy fresh (don't type manually!)
   - Paste into .env

---

## Emergency Fallback

If you can't get port 6543 working locally, use this setup:

### Local Development (Port 5432):
```env
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

### Vercel Production (Port 6543):
Set this in Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=postgresql://postgres.project:password@aws-0-region.pooler.supabase.com:6543/postgres
```

This way you can keep developing locally while Vercel uses the correct pooler URL.

---

## Need More Help?

If you're still stuck:

1. Check [SERVERLESS_DATABASE.md](./SERVERLESS_DATABASE.md) for detailed explanation
2. Check [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) for setup steps
3. Visit Supabase Discord: https://discord.gg/supabase
4. Check Supabase Status: https://status.supabase.com

---

## Quick Fix Summary

| Issue | Quick Fix |
|-------|-----------|
| Wrong username | Use `postgres.PROJECT_REF` not `postgres` |
| Project paused | Go to Supabase Dashboard → Restore Project |
| Wrong password | Reset in Settings → Database |
| No internet | Connect to WiFi or use port 5432 locally |
| Wrong region | Match your project's actual region |
| Env not loaded | Restart `npm run dev` |
