# Restaurant Website - Complete Setup Guide

A comprehensive guide to set up this restaurant e-commerce website from scratch.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Clone the Repository](#2-clone-the-repository)
3. [Install Dependencies](#3-install-dependencies)
4. [Environment Variables](#4-environment-variables)
5. [Database Setup (Supabase)](#5-database-setup-supabase)
6. [Prisma Setup](#6-prisma-setup)
7. [Seed the Database](#7-seed-the-database)
8. [Run the Application](#8-run-the-application)
9. [Admin Access](#9-admin-access)
10. [Deploy to Netlify](#10-deploy-to-netlify)

---

## 1. Prerequisites

Before starting, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **npm** (comes with Node.js) or **yarn**
- A **Supabase** account (free) - [Sign up](https://supabase.com/)
- A **Netlify** account (optional, for deployment) - [Sign up](https://www.netlify.com/)

Verify your installations:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
git --version     # Should show 2.x.x or higher
```

---

## 2. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/dungnguyen-gh/RestaurantWebsite.git

# Navigate to project directory
cd RestaurantWebsite

# Navigate to the app folder (if needed)
cd my-app
```

---

## 3. Install Dependencies

```bash
# Install all required packages
npm install
```

This will install:
- Next.js 16
- React & React DOM
- Prisma ORM
- Supabase client
- Tailwind CSS
- shadcn/ui components
- jose (JWT library)
- Zod (validation)
- And other dependencies

---

## 4. Environment Variables

Create a `.env` file in the root of the `my-app` folder:

```bash
# Copy the example file
cp .env.example .env

# Or create it manually
# Windows:
notepad .env
# Mac/Linux:
nano .env
```

Add the following variables (you'll get the actual values in the next steps):

```env
# Database (from Supabase - Step 5)
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR_REGION.pooler.supabase.com:6543/postgres"

# Supabase (from Supabase Dashboard - Step 5)
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR_SERVICE_ROLE_KEY]"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# JWT Secret (generate a strong random string)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
```

**⚠️ IMPORTANT:** Never commit the `.env` file to git! It's already in `.gitignore`.

### Generate a JWT Secret

For production, generate a secure random string:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use any random string generator (minimum 32 characters)
```

---

## 5. Database Setup (Supabase)

### Step 5.1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Organization:** Your organization
   - **Project name:** `restaurant-website`
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to be created

### Step 5.2: Get Database Connection String

1. In your Supabase Dashboard, click **Settings** (gear icon)
2. Click **Database**
3. Scroll to **"Connection string"** section
4. Select **URI** tab
5. Copy the connection string
6. **Replace** `[YOUR-PASSWORD]` with your actual database password

It should look like:
```
postgresql://postgres.abcdefghijklmnop:YourPassword123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Paste this into your `.env` file as `DATABASE_URL`.

### Step 5.3: Get API Keys

1. In Supabase Dashboard, click **Settings** → **API**
2. Copy these values:

| Setting | Value to Copy |
|---------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL under "Project URL" |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role secret` key |

Paste these into your `.env` file.

### Step 5.4: Create Storage Bucket for Images

1. In Supabase Dashboard, click **Storage** in left sidebar
2. Click **"New bucket"**
3. **Name:** `restaurant-images`
4. ✅ Check **"Public bucket"**
5. Click **"Create bucket"**

#### Set Bucket Policies:

Click on the `restaurant-images` bucket → **Policies** tab

Create these 3 policies:

| Policy Name | Operation | Target Roles | Policy Definition |
|-------------|-----------|--------------|-------------------|
| Allow public read | SELECT | anon, authenticated | `true` |
| Allow uploads | INSERT | authenticated | `true` |
| Allow delete | DELETE | authenticated | `true` |

**To create each policy:**
1. Click **"New Policy"**
2. Select **"For full customization"**
3. Fill in the details from the table above
4. Click **Review** → **Save Policy**

---

## 6. Prisma Setup

### Step 6.1: Generate Prisma Client

```bash
# Generate the Prisma client
npx prisma generate
```

### Step 6.2: Push Schema to Database

```bash
# Push the database schema to Supabase
npx prisma db push
```

You should see:
```
🚀  Your database is now in sync with your Prisma schema.
```

### Step 6.3: (Optional) Open Prisma Studio

```bash
# Visual database editor
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can view/edit data.

---

## 7. Seed the Database

Add sample menu items and admin user:

### Option 1: Start server first, then seed via API

```bash
# Terminal 1: Start the dev server
npm run dev

# Terminal 2: Seed using curl (after server is ready)
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Content-Type: application/json"
```

### Option 2: Using the seed script

```bash
# Run the seed script
npm run seed
```

**This creates:**
- Sample menu items (Truffle Mushroom Soup, Grilled Ribeye Steak, etc.)
- Admin user with:
  - Email: `admin@restaurant.com`
  - Password: `admin123`

---

## 8. Run the Application

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with featured dishes |
| Menu | `/menu` | Full menu with categories |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Place orders |
| Contact | `/contact` | Contact form with map |
| Admin Login | `/admin/login` | Secure admin authentication |
| Admin Dashboard | `/admin/dashboard` | Manage menu & orders |

---

## 9. Admin Access

1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - **Email:** `admin@restaurant.com`
   - **Password:** `admin123`
3. You can now:
   - Add/Edit/Delete menu items
   - Upload food images
   - View and manage orders
   - Update order status

### How Authentication Works

- After login, a secure HTTP-only cookie is set with a JWT token
- The token expires after 24 hours
- Protected routes check for valid token via middleware
- API mutations require the token to be present

---

## 10. Deploy to Netlify

### Step 10.1: Prepare for Deployment

Make sure your code is committed:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 10.2: Deploy to Netlify

1. Go to [https://app.netlify.com/start](https://app.netlify.com/start)
2. Connect GitHub and select your repository
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Click **"Show advanced"** → **"New variable"**
5. Add all 5 environment variables from your `.env` file:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET` (generate new secret for production)
6. Click **"Deploy site"**

Wait 3-5 minutes for the build to complete!

Your site will be live at `https://restaurant-website-xxx.netlify.app`

---

## Troubleshooting

### Error: "Database connection failed"
- Check your `DATABASE_URL` in `.env`
- Make sure password is correct
- Verify you're using the connection pooler (port 6543)

### Error: "JWT_SECRET is not set"
- Add `JWT_SECRET` to your environment variables
- Generate a secure random string (minimum 32 characters)

### Error: "Bucket not found" when uploading images
- Check bucket name is exactly `restaurant-images`
- Verify bucket is public
- Check bucket policies are set correctly

### Error: "Authentication required" on API calls
- Check that you're logged in as admin
- Verify cookies are enabled in browser
- Check that `credentials: "include"` is set in fetch requests

### Images not showing
- Check browser console for 404 errors
- Verify placeholder exists at `/public/images/food-placeholder.svg`
- Check if image URLs are valid

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

---

## Project Structure

```
my-app/
├── app/                    # Next.js app router
│   ├── admin/             # Admin pages
│   ├── api/               # API routes
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── contact/           # Contact page
│   ├── menu/              # Menu page
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading UI
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── CartSheet.tsx
│   ├── MenuCard.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # JWT authentication
│   └── CartContext.tsx   # Shopping cart
├── lib/                  # Utilities
│   ├── auth.ts          # JWT utilities
│   ├── cart-utils.ts    # Cart calculations
│   ├── db.ts            # Prisma client
│   ├── serialization.ts # Data serialization
│   ├── supabase.ts      # Supabase client
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # Helper functions
│   └── validation.ts    # Zod validation schemas
├── middleware.ts        # Auth middleware
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static files
│   └── images/
├── scripts/
│   └── seed.ts          # Database seeding
├── .env                 # Environment variables
├── next.config.ts
├── package.json
└── README.md
```

---

## Next Steps

After setup, you can:

1. **Customize the design** - Edit `app/globals.css` and Tailwind config
2. **Add more menu items** - Use the admin dashboard
3. **Configure payment** - Integrate Stripe or other payment providers
4. **Add email notifications** - Use SendGrid or Resend
5. **Set up analytics** - Add Google Analytics

---

## Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Generate a strong JWT_SECRET for production
- [ ] Enable Row Level Security (RLS) in Supabase if needed
- [ ] Set up proper CORS policies
- [ ] Configure rate limiting for API routes
- [ ] Enable HTTPS (Netlify provides this by default)
- [ ] Review and tighten storage bucket policies

---

## Support

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Zod:** https://zod.dev

---

## License

This project is open source. Feel free to use it for your restaurant!
