# Savory & Sage - Restaurant E-commerce Website

A full-featured restaurant e-commerce website built with Next.js, Tailwind CSS, and Prisma with PostgreSQL (via Supabase).

![Restaurant Website](https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=400&fit=crop)

## Features

### Public Features
- 🏠 **Home Page** - Hero section, restaurant intro, featured dishes
- 📋 **Menu Page** - Browse food items by category
- 🛒 **Cart System** - Add/remove items, update quantities
- 💳 **Checkout** - Customer details form with order placement
- 📞 **Contact Page** - Contact form with Google Maps integration
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Dark theme with warm restaurant colors

### Admin Features
- 🔐 **Admin Login** - Secure authentication
- 📊 **Dashboard** - Statistics and overview
- 🍽️ **Menu Management** - Add, edit, delete menu items
- 📤 **Image Upload** - Upload food images to cloud storage
- 📦 **Order Management** - View and manage customer orders

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Storage**: [Supabase Storage](https://supabase.com/storage)
- **Deployment**: [Vercel](https://vercel.com/)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd my-app
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database (PostgreSQL via Supabase)
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com/)
2. Get your database connection string from Settings > Database
3. Get your API keys from Settings > API
4. Create a storage bucket called `restaurant-images` (public)

### 4. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npx tsx scripts/seed.ts
# Or visit: http://localhost:3000/api/admin/seed (POST request)
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Page routes
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── menu/              # Menu page
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MenuCard.tsx
│   └── CartSheet.tsx
├── contexts/             # React contexts
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/                  # Utility functions
│   ├── db.ts            # Prisma client
│   ├── supabase.ts      # Supabase client
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper functions
├── prisma/              # Database schema
│   └── schema.prisma
├── public/              # Static assets
├── .env                 # Environment variables
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import project on [Vercel](https://vercel.com/)

3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL`

4. Deploy!

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Default Credentials

- **Email**: admin@restaurant.com
- **Password**: admin123

> ⚠️ Change the default password after first login in production!

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/menu` | GET | Get all menu items |
| `/api/menu` | POST | Create new menu item |
| `/api/menu/[id]` | GET | Get single menu item |
| `/api/menu/[id]` | PUT | Update menu item |
| `/api/menu/[id]` | DELETE | Delete menu item |
| `/api/orders` | GET | Get all orders |
| `/api/orders` | POST | Create new order |
| `/api/orders/[id]` | GET | Get single order |
| `/api/orders/[id]` | PUT | Update order status |
| `/api/orders/[id]` | DELETE | Delete order |
| `/api/admin/login` | POST | Admin login |
| `/api/admin/seed` | POST | Seed database |
| `/api/upload` | POST | Upload image |

## Customization

### Change Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 20 14.3% 4.1%;
  /* ... more variables */
}
```

### Add New Menu Categories

1. Update `Category` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update `categoryLabels` in `lib/types.ts`

## Troubleshooting

### Images not loading
- Check that Supabase storage bucket is public
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check browser console for CORS errors

### Database connection errors
- Verify `DATABASE_URL` format is correct
- Check that IP is allowed in Supabase settings
- Ensure database is not in pause mode

### Build errors
- Run `npx prisma generate` before building
- Clear `.next` folder and try again

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and shadcn/ui
