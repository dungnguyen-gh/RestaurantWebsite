# Restaurant E-commerce Website - Project Summary

## Overview
A full-featured restaurant e-commerce website built with Next.js 15, Tailwind CSS, PostgreSQL (via Supabase), and secure JWT authentication.

## Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── admin/
│   │   ├── dashboard/page.tsx    # Admin dashboard with menu & order management
│   │   └── login/page.tsx        # Admin login page
│   ├── api/
│   │   ├── admin/                # Admin API routes
│   │   │   ├── login/route.ts    # JWT login with HTTP-only cookies
│   │   │   ├── logout/route.ts   # Cookie clearing
│   │   │   ├── me/route.ts       # Auth verification
│   │   │   └── seed/route.ts     # Database seeding (protected)
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form API
│   │   ├── menu/                 # Menu API routes (protected mutations)
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── orders/               # Orders API routes (protected mutations)
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── upload/route.ts       # Image upload (protected)
│   ├── cart/page.tsx             # Shopping cart page
│   ├── checkout/page.tsx         # Checkout form page
│   ├── contact/page.tsx          # Contact page with form
│   ├── menu/page.tsx             # Menu browsing page
│   ├── error.tsx                 # Error boundary
│   ├── global-error.tsx          # Global error handler
│   ├── not-found.tsx             # 404 page
│   ├── loading.tsx               # Global loading UI
│   ├── globals.css               # Global styles with dark theme
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── CartSheet.tsx             # Cart slide-out component
│   ├── Footer.tsx                # Site footer
│   ├── MenuCard.tsx              # Menu item card (memoized)
│   ├── Navbar.tsx                # Site navigation
│   └── ui/skeleton.tsx           # Loading skeletons
├── contexts/                     # React contexts
│   ├── AuthContext.tsx           # Admin authentication (JWT + cookies)
│   └── CartContext.tsx           # Shopping cart context
├── lib/                          # Utility functions
│   ├── auth.ts                   # JWT creation/verification
│   ├── cart-utils.ts             # Cart calculation utilities
│   ├── db.ts                     # Prisma client configuration
│   ├── prisma.ts                 # Prisma export
│   ├── serialization.ts          # Decimal/Date serialization
│   ├── supabase.ts               # Supabase client setup
│   ├── types.ts                  # TypeScript type definitions
│   ├── utils.ts                  # Helper functions
│   └── validation.ts             # Zod validation schemas
├── middleware.ts                 # Next.js middleware (auth protection)
├── prisma/
│   ├── schema.prisma             # Database schema with indexes
│   └── config.ts                 # Prisma configuration
├── scripts/
│   └── seed.ts                   # Database seeding script
├── .env                          # Environment variables
├── .env.example                  # Environment template
├── next.config.ts                # Next.js configuration
└── package.json                  # Project dependencies
```

## Features Implemented

### Public Pages
1. **Home Page** (`/`)
   - Hero section with CTA buttons
   - Features section (Premium Quality, Fast Delivery, Free Delivery)
   - Featured dishes carousel
   - About section with statistics
   - Call-to-action section

2. **Menu Page** (`/menu`)
   - Category tabs (Appetizers, Main Courses, Desserts, Beverages, Specials)
   - Menu item cards with images, prices, and descriptions
   - Add to cart functionality
   - Skeleton loading states

3. **Cart Page** (`/cart`)
   - List of cart items with quantities
   - Quantity adjustment controls
   - Remove item functionality
   - Order summary with consistent calculations
   - Free delivery progress indicator

4. **Checkout Page** (`/checkout`)
   - Customer information form with validation
   - Phone number format validation
   - Order notes field
   - Order summary using shared cart utilities
   - Success state after order placement

5. **Contact Page** (`/contact`)
   - Contact information cards
   - Google Maps integration
   - Working contact form with validation
   - Success confirmation

### Admin Features
1. **Login Page** (`/admin/login`)
   - Secure JWT authentication
   - HTTP-only cookies
   - Form validation
   - Auto-redirect if already authenticated

2. **Dashboard** (`/admin/dashboard`)
   - Protected by middleware + client-side auth check
   - Statistics cards (total items, orders, pending orders, revenue)
   - Menu management tab
     - Add new menu items
     - Edit existing items
     - Delete items
     - Image upload with preview
   - Orders management tab
     - View all orders
     - Update order status
     - View order details
     - Delete orders
   - Search functionality
   - Error handling and retry

### API Routes
| Route | Method | Auth Required | Description |
|-------|--------|---------------|-------------|
| `/api/menu` | GET | No | List all menu items |
| `/api/menu` | POST | Yes | Create new menu item |
| `/api/menu/[id]` | GET | No | Get single menu item |
| `/api/menu/[id]` | PUT | Yes | Update menu item |
| `/api/menu/[id]` | DELETE | Yes | Delete menu item |
| `/api/orders` | GET | No | List all orders |
| `/api/orders` | POST | No | Create new order |
| `/api/orders/[id]` | GET | No | Get single order |
| `/api/orders/[id]` | PUT | Yes | Update order status |
| `/api/orders/[id]` | DELETE | Yes | Delete order |
| `/api/admin/login` | POST | No | Admin login (sets JWT cookie) |
| `/api/admin/logout` | POST | No | Admin logout (clears cookie) |
| `/api/admin/me` | GET | No | Check auth status |
| `/api/admin/seed` | POST | Yes | Seed database |
| `/api/upload` | POST | Yes | Upload image to Supabase |
| `/api/contact` | POST | No | Submit contact form |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma 7
- **Storage**: Supabase Storage
- **Icons**: Lucide React
- **State Management**: React Context API
- **Authentication**: JWT + HTTP-only Cookies (jose library)
- **Validation**: Zod
- **Notifications**: Sonner (toast notifications)

## Database Schema

### MenuItem
- `id`: UUID (PK)
- `name`: String
- `description`: String
- `price`: Decimal
- `image`: String (optional)
- `category`: Enum (APPETIZER, MAIN_COURSE, DESSERT, BEVERAGE, SPECIAL)
- `isAvailable`: Boolean
- `createdAt`: DateTime
- `updatedAt`: DateTime
- **Indexes**: category, isAvailable, createdAt

### Order
- `id`: UUID (PK)
- `customerName`: String
- `phone`: String
- `address`: String
- `notes`: String (optional)
- `total`: Decimal
- `status`: Enum (PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- **Indexes**: status, createdAt, phone

### OrderItem
- `id`: UUID (PK)
- `orderId`: UUID (FK)
- `menuItemId`: UUID (FK)
- `quantity`: Int
- `price`: Decimal
- **Indexes**: orderId, menuItemId

### Admin
- `id`: UUID (PK)
- `email`: String (unique)
- `password`: String (hashed)
- `name`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime
- **Indexes**: email

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Security (REQUIRED)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
```

## Authentication Flow

1. **Login**: `/api/admin/login`
   - Validates credentials with bcrypt
   - Creates JWT with 24h expiration
   - Sets HTTP-only cookie (`admin-token`)

2. **Auth Check**: `/api/admin/me`
   - Reads cookie from request
   - Verifies JWT signature
   - Returns admin info if valid

3. **Protected Routes**: `middleware.ts`
   - Intercepts requests to `/admin/dashboard`
   - Verifies JWT from cookie
   - Redirects to login if invalid/missing

4. **API Protection**: `middleware.ts`
   - GET requests: Public access
   - POST/PUT/DELETE: Requires valid JWT
   - Returns 401 if unauthorized

5. **Logout**: `/api/admin/logout`
   - Clears the `admin-token` cookie

## Security Features

- **HTTP-only Cookies**: JWT stored in secure, httpOnly cookies
- **CSRF Protection**: SameSite=strict cookie attribute
- **Secure in Production**: Secure flag on cookies in production
- **Input Validation**: All inputs validated with Zod schemas
- **Password Hashing**: bcrypt with salt rounds
- **UUID Validation**: Route params validated as UUID format
- **File Upload Security**: File type and size validation
- **SQL Injection Prevention**: Prisma ORM parameterized queries

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Seed the database:
   ```bash
   npm run seed
   # Or: POST http://localhost:3000/api/admin/seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Default Credentials

- **Email**: admin@restaurant.com
- **Password**: admin123

> ⚠️ Change the default password after first login in production!

## Key Design Decisions

1. **JWT Authentication**: Stateless auth with HTTP-only cookies for security
2. **Middleware Protection**: Centralized auth logic in Next.js middleware
3. **Zod Validation**: Type-safe input validation across all APIs
4. **Shared Utilities**: DRY cart calculations and serialization
5. **Error Boundaries**: Graceful error handling with user-friendly UI
6. **Loading States**: Skeleton UI for better perceived performance
7. **React.memo**: Optimized re-renders for list items
8. **Memory Leak Prevention**: Proper cleanup of timers and URLs

## Customization

### Changing Colors
Edit `app/globals.css`:
```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Adding Categories
1. Update `Category` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update `categoryLabels` in `lib/types.ts`
4. Update `categoryColors` in `components/MenuCard.tsx`

### Adding Form Fields
1. Update Zod schema in `lib/validation.ts`
2. Update API route to handle new field
3. Update frontend form component
4. Update types in `lib/types.ts` if needed

## Troubleshooting

### Build Errors
- Ensure `DATABASE_URL` is set in `.env`
- Run `npx prisma generate` before building
- Check TypeScript errors: `npx tsc --noEmit`

### Database Connection Issues
- Check connection string format (use port 6543 for Supabase)
- Verify database is running and accessible
- Check IP allowlist in Supabase settings

### Authentication Issues
- Verify `JWT_SECRET` is set and at least 32 characters
- Check cookies are being set (browser DevTools)
- Ensure `credentials: "include"` is used in fetch requests
- Check middleware matcher pattern in `middleware.ts`

### Image Upload Issues
- Verify Supabase storage bucket is public
- Check bucket policies allow authenticated uploads
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check file size and type validation

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions, please open an issue on GitHub.
