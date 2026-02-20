# Savory & Sage - Restaurant E-commerce Website

A full-featured restaurant e-commerce website built with Next.js, Tailwind CSS, Prisma with PostgreSQL (via Supabase), and secure JWT authentication.

![Restaurant Website](https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=400&fit=crop)

## Features

### Public Features
- 🏠 **Home Page** - Hero section, restaurant intro, featured dishes
- 📋 **Menu Page** - Browse food items by category with loading skeletons
- 🛒 **Cart System** - Add/remove items, update quantities, persistent storage
- 💳 **Checkout** - Customer details form with validation and order placement
- 📞 **Contact Page** - Working contact form with Google Maps integration
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Dark theme with warm restaurant colors

### Admin Features
- 🔐 **Secure Admin Login** - JWT authentication with HTTP-only cookies
- 📊 **Dashboard** - Statistics and overview with error handling
- 🍽️ **Menu Management** - Add, edit, delete menu items with image upload
- 📦 **Order Management** - View and manage customer orders
- 🔒 **Protected Routes** - Middleware-based authentication

### Security Features
- 🔑 **JWT Authentication** - Secure, stateless authentication
- 🍪 **HTTP-only Cookies** - XSS-resistant token storage
- ✅ **Input Validation** - Zod schemas for all inputs
- 🔒 **Password Hashing** - bcrypt with salt rounds
- 🛡️ **CSRF Protection** - SameSite cookie attributes
- 🔍 **Type Safety** - Full TypeScript coverage

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [jose](https://github.com/panva/jose) (JWT library)
- **Validation**: [Zod](https://zod.dev/)
- **Storage**: [Supabase Storage](https://supabase.com/storage)
- **Deployment**: [Netlify](https://www.netlify.com/)

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)
- Netlify account (free tier works)

## Quick Start

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
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Security (Required)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters-long"
```

> ⚠️ **Important**: Generate a strong `JWT_SECRET` (at least 32 characters) for production!

### 3. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com/)
2. Get your database connection string from Settings > Database (Connection Pooler with port 6543)
3. Get your API keys from Settings > API
4. Create a storage bucket called `restaurant-images` (public)

### 4. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with sample data
npm run seed
# Or visit: http://localhost:3000/api/admin/seed (POST request with auth)
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
│   ├── error.tsx          # Error boundary
│   ├── global-error.tsx   # Global error handler
│   ├── not-found.tsx      # 404 page
│   ├── loading.tsx        # Loading UI
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
│   ├── AuthContext.tsx   # JWT authentication
│   └── CartContext.tsx   # Shopping cart
├── lib/                  # Utility functions
│   ├── auth.ts          # JWT utilities
│   ├── cart-utils.ts    # Cart calculations
│   ├── db.ts            # Prisma client
│   ├── serialization.ts # Data serialization
│   ├── supabase.ts      # Supabase client
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # Helper functions
│   └── validation.ts    # Zod schemas
├── middleware.ts        # Auth middleware
├── prisma/              # Database schema
│   └── schema.prisma
├── public/              # Static assets
├── .env                 # Environment variables
├── next.config.ts
├── package.json
└── *.md                 # Documentation files
```

## API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/menu` | GET | No | Get all menu items |
| `/api/menu` | POST | Yes | Create new menu item |
| `/api/menu/[id]` | GET | No | Get single menu item |
| `/api/menu/[id]` | PUT | Yes | Update menu item |
| `/api/menu/[id]` | DELETE | Yes | Delete menu item |
| `/api/orders` | GET | No | Get all orders |
| `/api/orders` | POST | No | Create new order |
| `/api/orders/[id]` | GET | No | Get single order |
| `/api/orders/[id]` | PUT | Yes | Update order status |
| `/api/orders/[id]` | DELETE | Yes | Delete order |
| `/api/admin/login` | POST | No | Admin login (sets JWT cookie) |
| `/api/admin/logout` | POST | No | Admin logout |
| `/api/admin/me` | GET | No | Check auth status |
| `/api/admin/seed` | POST | Yes | Seed database |
| `/api/upload` | POST | Yes | Upload image |
| `/api/contact` | POST | No | Submit contact form |

## Authentication

The application uses JWT-based authentication with HTTP-only cookies:

1. **Login**: Admin credentials are verified with bcrypt
2. **JWT Creation**: A signed JWT is created with 24h expiration
3. **Cookie Storage**: Token stored in HTTP-only, Secure, SameSite=strict cookie
4. **Middleware Check**: Protected routes verify JWT via middleware
5. **API Protection**: Mutations require valid JWT in cookie

### Protected Resources
- `/admin/dashboard` - Requires valid JWT
- POST/PUT/DELETE `/api/menu/*` - Requires valid JWT
- POST/PUT/DELETE `/api/orders/*` - Requires valid JWT
- POST `/api/upload` - Requires valid JWT

## Default Credentials

- **Email**: admin@restaurant.com
- **Password**: admin123

> ⚠️ **Change the default password after first login in production!**

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to https://app.netlify.com/start
3. Connect GitHub and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables (including `JWT_SECRET`)
6. Deploy!

**Required Environment Variables:**
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET` (generate a strong random string)

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Customization

### Change Colors

Edit `app/globals.css`:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... more variables */
}
```

### Add New Menu Categories

1. Update `Category` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update `categoryLabels` in `lib/types.ts`
4. Update `categoryColors` in `components/MenuCard.tsx`

## Documentation

| File | Description |
|------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Get running in 15 minutes |
| [DEPLOY.md](./DEPLOY.md) | Deployment guide |
| [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) | Supabase setup |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Code architecture |
| [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) | All documentation |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Complete setup guide |

## Troubleshooting

### Images not loading
- Check that Supabase storage bucket is public
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check browser console for CORS errors

### Database connection errors
- Verify `DATABASE_URL` format is correct (use port 6543)
- Check that IP is allowed in Supabase settings
- Ensure database is not in pause mode

### Build errors
- Run `npx prisma generate` before building
- Ensure all environment variables are set
- Check for TypeScript errors: `npx tsc --noEmit`

### Authentication issues
- Verify `JWT_SECRET` is set (minimum 32 characters)
- Check cookies are being set in browser DevTools
- Ensure `credentials: "include"` is used in fetch requests
- Check middleware matcher in `middleware.ts`

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and shadcn/ui
