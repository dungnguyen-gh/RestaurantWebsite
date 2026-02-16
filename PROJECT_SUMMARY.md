# Restaurant E-commerce Website - Project Summary

## Overview
A full-featured restaurant e-commerce website built with Next.js 15, Tailwind CSS, and PostgreSQL (via Supabase).

## Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── admin/
│   │   ├── dashboard/page.tsx    # Admin dashboard with menu & order management
│   │   └── login/page.tsx        # Admin login page
│   ├── api/
│   │   ├── admin/                # Admin API routes
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── seed/route.ts     # Database seeding endpoint
│   │   ├── menu/                 # Menu API routes
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── orders/               # Orders API routes
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── upload/route.ts       # Image upload to Supabase
│   ├── cart/page.tsx             # Shopping cart page
│   ├── checkout/page.tsx         # Checkout form page
│   ├── contact/page.tsx          # Contact page with Google Maps
│   ├── menu/page.tsx             # Menu browsing page
│   ├── globals.css               # Global styles with dark theme
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Home page (hero, features, etc.)
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── CartSheet.tsx             # Cart slide-out component
│   ├── Footer.tsx                # Site footer
│   ├── MenuCard.tsx              # Menu item card component
│   └── Navbar.tsx                # Site navigation
├── contexts/                     # React contexts
│   ├── AuthContext.tsx           # Admin authentication context
│   └── CartContext.tsx           # Shopping cart context
├── lib/                          # Utility functions
│   ├── db.ts                     # Prisma client configuration
│   ├── supabase.ts               # Supabase client setup
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Helper functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── config.ts                 # Prisma configuration
├── scripts/
│   └── seed.ts                   # Database seeding script
├── .env                          # Environment variables (not committed)
├── .env.example                  # Environment variables template
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies
├── README.md                     # Project documentation
└── vercel.json                   # Vercel deployment configuration
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

3. **Cart Page** (`/cart`)
   - List of cart items with quantities
   - Quantity adjustment controls
   - Remove item functionality
   - Order summary with total calculation
   - Proceed to checkout button

4. **Checkout Page** (`/checkout`)
   - Customer information form (name, phone, address)
   - Order notes field
   - Order summary
   - Place order functionality

5. **Contact Page** (`/contact`)
   - Contact information cards
   - Google Maps integration
   - Contact form

### Admin Features
1. **Login Page** (`/admin/login`)
   - Secure admin authentication
   - Form validation

2. **Dashboard** (`/admin/dashboard`)
   - Statistics cards (total items, orders, pending orders, revenue)
   - Menu management tab
     - Add new menu items
     - Edit existing items
     - Delete items
     - Image upload
   - Orders management tab
     - View all orders
     - Update order status
     - View order details
     - Delete orders

### API Routes
- `GET /api/menu` - List all menu items
- `POST /api/menu` - Create new menu item
- `GET /api/menu/[id]` - Get single menu item
- `PUT /api/menu/[id]` - Update menu item
- `DELETE /api/menu/[id]` - Delete menu item
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order
- `PUT /api/orders/[id]` - Update order status
- `DELETE /api/orders/[id]` - Delete order
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin
- `POST /api/admin/seed` - Seed database
- `POST /api/upload` - Upload images to Supabase

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
- **Form Handling**: Native React forms
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

### OrderItem
- `id`: UUID (PK)
- `orderId`: UUID (FK)
- `menuItemId`: UUID (FK)
- `quantity`: Int
- `price`: Decimal

### Admin
- `id`: UUID (PK)
- `email`: String (unique)
- `password`: String (hashed)
- `name`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

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
```

## Default Credentials

- **Email**: admin@restaurant.com
- **Password**: admin123

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   npm run seed
   # Or visit http://localhost:3000/api/admin/seed (POST)
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

1. Push code to GitHub

2. Import project on [Vercel](https://vercel.com/)

3. Add environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Key Design Decisions

1. **Dark Theme**: The website uses a dark theme with amber/orange accent colors for a warm restaurant feel.

2. **Server Components**: Most pages use React Server Components for better performance.

3. **Dynamic Rendering**: Pages that fetch data use `export const dynamic = "force-dynamic"` to ensure fresh data.

4. **Local Storage Cart**: Cart state is persisted in localStorage for a seamless user experience.

5. **Image Upload**: Images are uploaded to Supabase Storage with public URLs stored in the database.

6. **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop.

## Customization

### Changing Colors
Edit `app/globals.css` to customize the color scheme:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Adding Categories
1. Update the `Category` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update `categoryLabels` in `lib/types.ts`

## Troubleshooting

### Build Errors
- Ensure `DATABASE_URL` is set in `.env`
- Run `npx prisma generate` before building

### Database Connection Issues
- Check that your database is running
- Verify the `DATABASE_URL` format
- For Supabase, use the connection pooler URL for serverless environments

### Image Upload Issues
- Verify Supabase storage bucket is public
- Check CORS settings in Supabase
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is correct

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions, please open an issue on GitHub.
