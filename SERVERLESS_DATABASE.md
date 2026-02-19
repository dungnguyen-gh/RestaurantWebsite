# Serverless Database Connection Guide

## ⚠️ CRITICAL: Port 5432 vs 6543 for Vercel

When deploying to Vercel (or any serverless platform), **you MUST use port 6543**, not port 5432.

---

## Quick Answer: Can I Use Port 6543 Locally?

**YES!** You can use port 6543 for:
- ✅ Local development (`npm run dev`)
- ✅ Vercel deployment
- ✅ Any environment

The connection pooler (port 6543) works from **anywhere** with internet access.

---

## Why Port 6543?

### The Problem with Port 5432 (Direct Connection)

```
❌ postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

| Issue | Explanation |
|-------|-------------|
| Connection Limits | Direct connections (5432) have a limit of ~60 concurrent connections |
| Serverless Nature | Vercel functions can create hundreds of connections simultaneously |
| Connection Exhaustion | Your database will reject connections when limit is reached |
| Cold Starts | New function instances = new connections = quick limit hit |

### The Solution: Port 6543 (Connection Pooler)

```
✅ postgresql://postgres.project:password@aws-0-region.pooler.supabase.com:6543/postgres
```

| Benefit | Explanation |
|---------|-------------|
| Connection Pooling | Reuses connections efficiently |
| Higher Limits | Supports thousands of concurrent requests |
| Serverless Optimized | Designed for ephemeral function connections |
| Better Performance | Reduces connection overhead |
| Works Everywhere | Use same URL for local AND production |

---

## Recommended Approach: Use Port 6543 for Everything

You can use the **same** `DATABASE_URL` for both local development AND Vercel:

```env
# .env - Works for BOTH local and Vercel!
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:6543/postgres"
```

### Benefits of Using 6543 Everywhere:
- ✅ **One URL** for all environments (simpler)
- ✅ **No switching** between local and production configs
- ✅ **Consistent behavior** - what you test locally is what runs on Vercel
- ✅ **Slight latency** (~1-2ms more) but negligible for development

### Trade-off:
- ⚠️ Connection goes through Supabase's pooler (slightly more latency)
- ⚠️ Requires internet connection (can't work offline)

---

## Connection String Formats

### ❌ Port 5432 (Direct Connection - Use for local only if needed)

Use this for:
- Local development with no internet
- Long-running processes
- Traditional servers

```env
# Local only - direct connection
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
```

### ✅ Port 6543 (Connection Pooler - RECOMMENDED)

Use this for:
- **Local development** ✅
- **Vercel deployment** ✅ (required)
- **Any environment** ✅

```env
# Universal - works everywhere!
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

---

## How to Get the Connection String

### Step 1: Go to Supabase Dashboard
1. Open your project at [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **Connect** (top right button)

### Step 2: Select Transaction Pooler
1. Look for **Transaction pooler** or **Connection pooler** section
2. This gives you the port 6543 connection string

### Step 3: Copy the URI
It will look like:
```
postgresql://postgres.abcdefghijklm:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note the differences:**
- Port: `6543` (not `5432`)
- Host: Contains `.pooler.` in the domain
- Username format: `postgres.[PROJECT_REF]` (includes project reference)

---

## Setup for Different Scenarios

### Scenario 1: Use 6543 for Everything (Recommended)

**Simplest approach - one URL works everywhere:**

```env
# my-app/.env - Same for local AND Vercel
DATABASE_URL="postgresql://postgres.abcdefghijklm:MyPassword123!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Pros:**
- Same database URL everywhere
- No environment switching
- Consistent behavior

**Cons:**
- Requires internet (can't develop offline)
- Slight latency (1-2ms, negligible)

### Scenario 2: Different URLs for Different Environments

**Use 5432 locally, 6543 for Vercel:**

#### Local Development (.env)
```env
# Local .env
DATABASE_URL="postgresql://postgres:MyPassword123!@db.abcdefghijklm.supabase.co:5432/postgres"
```

#### Vercel Production
```env
# Vercel Environment Variables
DATABASE_URL="postgresql://postgres.abcdefghijklm:MyPassword123!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Pros:**
- Slightly faster local development
- Can work offline (if using local PostgreSQL)

**Cons:**
- Two different URLs to manage
- Potential differences between local and production

---

## Testing Locally with Port 6543

### Step 1: Update .env with Pooler URL

```env
# my-app/.env
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:6543/postgres"
```

### Step 2: Run Development Server

```bash
cd my-app
npm run dev
```

### Step 3: Test Everything

Visit:
- http://localhost:3000 - Homepage
- http://localhost:3000/menu - Menu page
- http://localhost:3000/admin/login - Admin panel

**Everything should work exactly the same!**

---

## Updating Your Vercel Deployment

### If You're Switching from 5432 to 6543

1. **Get your pooler URL** from Supabase Dashboard → Connect
2. **Update Vercel environment variable:**
   - Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Click your project
   - Settings → Environment Variables
   - Edit `DATABASE_URL` with port 6543 URL
3. **Redeploy:**
   - Deployments tab → Redeploy latest

---

## Common Errors

### Error: "Too many connections" on Vercel
**Cause**: Using port 5432 on Vercel  
**Solution**: Switch to port 6543

### Error: "Connection refused" with port 6543
**Cause**: Wrong password or project reference  
**Solution**: 
- Check password is correct
- Make sure username format is `postgres.[PROJECT_REF]`
- Verify the URL has `.pooler.` in hostname

### Error: "timeout" with port 6543 locally
**Cause**: Internet connection issue  
**Solution**: Check internet connection or switch to port 5432 for local

---

## FAQ

### Q: Will port 6543 work with `npm run dev`?
**A:** **YES!** It works perfectly for local development. The pooler accepts connections from anywhere.

### Q: Should I use 5432 or 6543 for local?
**A:** Either works. Recommend 6543 for consistency, but 5432 is fine if you prefer.

### Q: Can I develop offline with port 6543?
**A:** No, port 6543 requires internet. Use port 5432 or local PostgreSQL for offline work.

### Q: Is there a performance difference?
**A:** Minimal. Port 6543 adds ~1-2ms latency (negligible for most apps).

### Q: What if I'm already using 5432 locally?
**A:** You can keep using it! Just make sure to use 6543 in Vercel environment variables.

### Q: Do I need to change my code?
**A:** **No.** Only change the `DATABASE_URL` environment variable. Code stays the same.

---

## Summary

| Question | Answer |
|----------|--------|
| Can I use 6543 locally? | ✅ **YES** |
| Can I use 5432 on Vercel? | ❌ **NO** (will fail under load) |
| Should I use same port for both? | ✅ **Recommended** - use 6543 for simplicity |
| Will 6543 work offline? | ❌ **NO** - requires internet |
| Is there a performance hit? | ⚠️ **Minimal** (~1-2ms) |

---

## Recommended Setup

```env
# Use this ONE URL for both local and Vercel:
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

**Benefits:**
- ✅ Simple - one URL everywhere
- ✅ Works locally with `npm run dev`
- ✅ Required for Vercel deployment
- ✅ Consistent behavior

---

## Resources

- [Supabase Connection Pooler Docs](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma Serverless Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#serverless-environments-faas)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

---

**Remember: Port 6543 works EVERYWHERE - local development AND Vercel!** ✅
