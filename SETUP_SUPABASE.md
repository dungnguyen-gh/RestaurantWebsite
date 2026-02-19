# Supabase Setup Guide

Complete step-by-step guide to set up Supabase for your Restaurant E-commerce Website.

---

## Table of Contents

1. [Create Supabase Project](#1-create-supabase-project)
2. [Get Database Connection String](#2-get-database-connection-string)
3. [Get API Keys](#3-get-api-keys)
4. [Create Storage Bucket](#4-create-storage-bucket-for-images)
5. [Configure CORS](#5-configure-cors-optional)
6. [Test Connection](#6-test-connection)

---

## 1. Create Supabase Project

### Step 1: Sign Up / Log In
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. You can sign up with:
   - GitHub
   - Email/password

### Step 2: Create New Project
1. Click "New Project" button
2. Fill in the details:
   - **Organization**: Select or create one
   - **Project name**: `restaurant-website` (or any name)
   - **Database Password**: 
     - Click "Generate a password" 
     - **SAVE THIS PASSWORD!** You'll need it later
   - **Region**: Choose closest to your audience
     - US West (Oregon) - for US West Coast
     - US East (N. Virginia) - for US East Coast  
     - Europe (Frankfurt) - for Europe
     - Singapore - for Asia
   - **Pricing Plan**: Free tier ( sufficient for starting)

3. Click "Create new project"
4. Wait 2-3 minutes for project to be created

---

## 2. Get Database Connection String

The database connection string is needed for Prisma to connect to your database.

> ⚠️ **CRITICAL**: For Vercel deployment, you **MUST** use port **6543** (Connection Pooler).  
> 💡 **Good news**: Port 6543 works for **BOTH** local development (`npm run dev`) AND Vercel! Use the same URL everywhere.  
> See [SERVERLESS_DATABASE.md](./SERVERLESS_DATABASE.md) for complete details.

### Step 1: Go to Database Settings
1. In your Supabase Dashboard, click on the **gear icon** (Settings) in left sidebar
2. Click **Database**
3. Scroll down to **Connection string** section

### Step 2: Choose Connection Type

#### For Local Development (Port 5432 - Direct Connection)
1. Select **URI** tab
2. You'll see something like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.abcdefgh12345678.supabase.co:5432/postgres
   ```
3. Click **Copy**
4. **IMPORTANT**: Replace `[YOUR-PASSWORD]` with your actual database password

#### For Vercel Deployment (Port 6543 - Connection Pooler) ⚠️ REQUIRED
1. Click **Connect** button (top right of dashboard) OR find "Transaction pooler" section
2. Copy the connection string with port **6543**:
   ```
   postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
3. **CRITICAL**: This uses port 6543 and has `.pooler.` in the hostname

### Step 3: Update Your .env File

#### Option 1: Use Port 6543 for Everything (Recommended) ✅

**Same URL works for BOTH local development AND Vercel:**

```env
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:6543/postgres"
```

**Example:**
```env
DATABASE_URL="postgresql://postgres.abcdefghijklm:MySecurePassword123!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Why this is recommended:**
- ✅ Works with `npm run dev` (local development)
- ✅ Works on Vercel (production)
- ✅ One URL for all environments (simpler)
- ✅ Consistent behavior everywhere

#### Option 2: Use Different URLs for Different Environments

**Local Development (Port 5432):**
```env
DATABASE_URL="postgresql://postgres:MySecurePassword123!@db.abcdefghijklm.supabase.co:5432/postgres"
```

**Vercel Deployment (Port 6543 - Required!):**
```env
DATABASE_URL="postgresql://postgres.abcdefghijklm:MySecurePassword123!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

**Key differences between ports:**
| Feature | Port 5432 | Port 6543 |
|---------|-----------|-----------|
| Local dev | ✅ Yes | ✅ Yes |
| Vercel | ❌ No (will fail!) | ✅ Yes (required) |
| Connection limit | ~60 | Thousands |
| Offline use | ✅ Yes | ❌ No |
| Latency | Lower | ~1-2ms higher |

**Recommendation**: Use port 6543 for everything to keep it simple!

---

## 3. Get API Keys

You need two API keys for Supabase integration.

### Step 1: Go to API Settings
1. In Supabase Dashboard, click **Settings** (gear icon)
2. Click **API**
3. You'll see "Project API keys" section

### Step 2: Copy Keys

#### Anonymous Key (Public)
- Label: `anon public`
- Use for: Client-side code (frontend)
- Copy this key

#### Service Role Key (Secret)
- Label: `service_role secret`
- Use for: Server-side code (API routes, admin operations)
- **⚠️ WARNING**: Never expose this in client-side code!
- Copy this key

### Step 3: Update Your .env File
```env
# From Project Settings → API
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs...your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs...your-service-role-key"
```

---

## 4. Create Storage Bucket (For Images)

Your restaurant website needs to store food images.

### Step 1: Navigate to Storage
1. In Supabase Dashboard, click **Storage** in left sidebar
2. Click **New bucket** button

### Step 2: Create Bucket
1. **Name**: `restaurant-images`
2. **Public bucket**: ✅ CHECK THIS BOX
   - This allows images to be viewed without authentication
3. Click **Create bucket**

### Step 3: Set Up Bucket Policies
1. Click on your newly created `restaurant-images` bucket
2. Click **Policies** tab
3. Click **New Policy**

#### Create SELECT Policy (Read Images)
1. Template: `For full customization`
2. Policy Name: `Allow public read`
3. Allowed Operation: `SELECT`
4. Target Roles: `anon, authenticated` (check both)
5. Policy Definition: `true`
6. Click **Review** → **Save Policy**

#### Create INSERT Policy (Upload Images)
1. Click **New Policy** again
2. Policy Name: `Allow authenticated uploads`
3. Allowed Operation: `INSERT`
4. Target Roles: `authenticated`
5. Policy Definition: `true`
6. Click **Review** → **Save Policy**

#### Create DELETE Policy (Delete Images)
1. Click **New Policy**
2. Policy Name: `Allow authenticated delete`
3. Allowed Operation: `DELETE`
4. Target Roles: `authenticated`
5. Policy Definition: `true`
6. Click **Review** → **Save Policy**

---

## 5. Configure CORS (Optional)

If you encounter CORS errors when uploading images, configure this:

### Step 1: Go to Storage Settings
1. In Supabase Dashboard, click **Storage** in left sidebar
2. Click **Policies** tab at top
3. Click **CORS Configuration**

### Step 2: Add CORS Rules
Add these origins:
```
http://localhost:3000
https://your-domain.vercel.app
*
```

Or set it to `*` to allow all origins (less secure but easier for development).

---

## 6. Test Connection

### Step 1: Update Environment Variables
Make sure your `my-app/.env` file has:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Step 2: Generate Prisma Client
```bash
cd my-app
npx prisma generate
```

### Step 3: Push Schema to Database
```bash
npx prisma db push
```

You should see output like:
```
🚀  Your database is now in sync with your Prisma schema.
```

### Step 4: Seed Database
```bash
npm run seed
```

Or make a POST request to:
```
POST http://localhost:3000/api/admin/seed
```

---

## Troubleshooting

### Error: "Connection refused" or "ECONNREFUSED"
**Solution**: 
- Check if your password is correct
- Make sure you're using the connection pooler URL for serverless environments
- For Prisma with Supabase, use the Transaction pooler (port 6543) instead of direct connection (port 5432)

**Updated connection string format:**
```env
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"
```

### Error: "Invalid API key"
**Solution**:
- Make sure you're using the correct keys:
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` for client-side
  - `SUPABASE_SERVICE_ROLE_KEY` for server-side
- Keys are in Settings → API

### Error: "Bucket not found" when uploading images
**Solution**:
- Make sure bucket name is exactly `restaurant-images`
- Check that the bucket is public
- Verify policies are set correctly

### Error: "Row level security violation"
**Solution**:
- You need to create policies for your storage bucket (Step 4 above)
- Or temporarily disable RLS (not recommended for production)

---

## Quick Reference

| What You Need | Where to Find It |
|---------------|------------------|
| Database Password | Settings → Database (or the one you created) |
| Project Reference | In the URL: `https://supabase.com/dashboard/project/YOUR_REF` |
| Connection String | Settings → Database → Connection string |
| Anon Key | Settings → API → Project API keys |
| Service Role Key | Settings → API → Project API keys |

---

## Next Steps

After completing Supabase setup:

1. ✅ [Test locally](../README.md#running-locally)
2. 🚀 [Deploy to Vercel](./DEPLOY_VERCEL.md)

---

## Support

- Supabase Docs: https://supabase.com/docs
- Prisma + Supabase: https://www.prisma.io/docs/guides/database/supabase
- Connection Pooling: https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler
