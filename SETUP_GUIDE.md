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
10. [Deploy to Vercel](#10-deploy-to-vercel)

---

## 1. Prerequisites

Before starting, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **npm** (comes with Node.js) or **yarn**
- A **Supabase** account (free) - [Sign up](https://supabase.com/)
- A **Vercel** account (optional, for deployment) - [Sign up](https://vercel.com/)

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
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres"

# Supabase (from Supabase Dashboard - Step 5)
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR_ANON_KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR_SERVICE_ROLE_KEY]"
```

**⚠️ IMPORTANT:** Never commit the `.env` file to git! It's already in `.gitignore`.

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

### Option 1: Using the API endpoint

```bash
# Start the dev server first (in another terminal)
npm run dev

# Then seed using curl or a tool like Postman
curl -X POST http://localhost:3000/api/admin/seed
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
| Contact | `/contact` | Contact form |
| Admin Login | `/admin/login` | Admin authentication |
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

---

## 10. Deploy to Vercel

### Step 10.1: Prepare for Deployment

Make sure your code is committed:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 10.2: Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `dungnguyen-gh/RestaurantWebsite`
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `my-app` (if your repo has this structure)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Step 10.3: Add Environment Variables

In Vercel project settings, add all environment variables from your `.env` file:

```
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Step 10.4: Deploy

Click **"Deploy"** and wait for the build to complete!

Your site will be live at `https://your-project.vercel.app`

---

## Troubleshooting

### Error: "Database connection failed"
- Check your `DATABASE_URL` in `.env`
- Make sure password is correct
- Verify you're using the connection pooler (port 6543)

### Error: "Bucket not found" when uploading images
- Check bucket name is exactly `restaurant-images`
- Verify bucket is public
- Check bucket policies are set correctly

### Error: "Failed to update menu item"
- Check browser console for more details
- Verify Supabase keys are correct
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is set (not just the anon key)

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
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/                  # Utilities
│   ├── db.ts            # Prisma client
│   ├── supabase.ts      # Supabase client
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper functions
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
5. **Set up analytics** - Add Google Analytics or Vercel Analytics

---

## Support

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

---

## License

This project is open source. Feel free to use it for your restaurant!
