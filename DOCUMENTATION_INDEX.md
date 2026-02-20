# Documentation Index

Complete documentation for your Restaurant E-commerce Website.

---

## 📚 Documentation Files

| File | Description | Read When |
|------|-------------|-----------|
| [QUICKSTART.md](./QUICKSTART.md) | **Start here!** Get running in 15 mins | 🚀 Just starting |
| [README.md](./README.md) | Full project documentation | 📖 Want complete overview |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Complete setup instructions | 🔧 Setting up from scratch |
| [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) | Step-by-step Supabase setup | 🗄️ Setting up database |
| [DEPLOY.md](./DEPLOY.md) | Deploy to Netlify guide | 🌐 Going live |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Code architecture & structure | 💻 Understanding the code |

---

## 🎯 Recommended Reading Order

### For Beginners (Just Starting)
1. **QUICKSTART.md** - Get it running locally
2. **SETUP_SUPABASE.md** - Set up your database
3. **DEPLOY.md** - Go live on Netlify

### For Developers (Want to Customize)
1. **README.md** - Full feature list
2. **PROJECT_SUMMARY.md** - Understand the code structure
3. **SETUP_SUPABASE.md** - Database configuration
4. **DEPLOY.md** - Production deployment

### For Troubleshooting
- Build errors → **DEPLOY.md**
- Database issues → **SETUP_SUPABASE.md**
- Authentication issues → **PROJECT_SUMMARY.md**
- Code questions → **PROJECT_SUMMARY.md**

---

## 📖 What's in Each File

### QUICKSTART.md (Start Here!)
- 15-minute setup guide
- Essential commands only
- Get from zero to deployed
- **Best for**: First-time setup

### README.md
- Complete feature list
- Tech stack details
- File structure
- API documentation
- Security features
- Local development guide
- **Best for**: Comprehensive reference

### SETUP_GUIDE.md
- Complete step-by-step setup
- All prerequisites
- Detailed environment configuration
- Database setup
- Security checklist
- **Best for**: Thorough setup understanding

### SETUP_SUPABASE.md
- Create Supabase project
- Database connection setup
- Storage bucket configuration
- API keys configuration
- Troubleshooting database issues
- **Best for**: Database setup

### DEPLOY.md
- Netlify deployment via web UI
- Netlify CLI deployment
- Environment variables configuration
- Post-deployment checklist
- Security hardening
- Production troubleshooting
- **Best for**: Going live

### PROJECT_SUMMARY.md
- Project structure diagram
- Feature implementation status
- Database schema with indexes
- Authentication flow
- Component list
- API routes reference
- Security features
- **Best for**: Understanding the codebase

---

## 🔧 Quick Command Reference

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create and apply migration
npm run seed             # Seed database with sample data

# Security
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
                         # Generate JWT secret

# Deployment (Netlify CLI)
netlify deploy --prod    # Deploy to production
netlify open            # Open site in browser

# Utilities
npx shadcn add [component] # Add shadcn UI component
```

---

## 🌐 Key URLs (After Deployment)

| Environment | URL |
|-------------|-----|
| Local Development | http://localhost:3000 |
| Admin Panel (Local) | http://localhost:3000/admin/login |
| Production | https://your-domain.netlify.app |
| Admin Panel (Production) | https://your-domain.netlify.app/admin/login |

---

## 🔑 Default Credentials

**Admin Login:**
- Email: `admin@restaurant.com`
- Password: `admin123`

**⚠️ Change this immediately after first login!**

---

## 🔒 Security Overview

### Authentication
- JWT-based authentication with HTTP-only cookies
- Secure, SameSite=strict cookie attributes
- 24-hour token expiration
- Middleware-based route protection

### Input Validation
- Zod schemas for all API inputs
- Type-safe validation with TypeScript
- File upload type and size restrictions

### Database Security
- Prisma ORM prevents SQL injection
- Row Level Security (RLS) ready in Supabase
- Database indexes for performance

### Deployment Security
- HTTPS enforced by Netlify
- Environment variables securely stored
- No sensitive data in client bundles

---

## 📋 Setup Checklist

Use this to track your progress:

### Phase 1: Local Development
- [ ] Install Node.js 18+
- [ ] Clone/download this project
- [ ] Run `npm install`
- [ ] Create Supabase project
- [ ] Set up `.env` file
- [ ] Generate JWT_SECRET
- [ ] Run `npx prisma db push`
- [ ] Run `npm run seed`
- [ ] Run `npm run dev`
- [ ] Test all pages locally

### Phase 2: Production Deployment
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Generate new JWT_SECRET for production
- [ ] Import project to Netlify
- [ ] Add all 5 environment variables in Netlify
- [ ] Deploy to production
- [ ] Test live website
- [ ] Update NEXT_PUBLIC_APP_URL

### Phase 3: Security Hardening
- [ ] Change default admin password
- [ ] Delete or disable default admin account
- [ ] Review Supabase storage bucket policies
- [ ] Enable additional Netlify security headers (optional)
- [ ] Configure CORS in Supabase (if needed)

### Phase 4: Content & Launch
- [ ] Upload real food images
- [ ] Update restaurant information
- [ ] Update contact details
- [ ] Test order placement
- [ ] Test contact form
- [ ] Add custom domain (optional)
- [ ] Share website with customers!

---

## 🆘 Getting Help

### Common Issues

| Problem | Solution | File |
|---------|----------|------|
| Can't connect to database | Check connection string format | SETUP_SUPABASE.md |
| Build fails on Netlify | Check build settings | DEPLOY.md |
| Images won't upload | Check storage bucket policies | SETUP_SUPABASE.md |
| Admin login not working | Check JWT_SECRET env var | PROJECT_SUMMARY.md |
| Auth not working after deploy | Check cookies and HTTPS | DEPLOY.md |
| Prisma errors | Run `npx prisma generate` | README.md |

### External Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Netlify Docs**: https://docs.netlify.com
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Zod Docs**: https://zod.dev
- **jose (JWT)**: https://github.com/panva/jose

---

## 🎨 Customization Guides

### Change Colors
Edit `app/globals.css`:
```css
.dark {
  --background: oklch(0.145 0 0);
  --primary: oklch(0.922 0 0);
  /* Modify these values */
}
```

### Add New Menu Categories
1. Update `Category` enum in `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update `categoryLabels` in `lib/types.ts`
4. Update `categoryColors` in `components/MenuCard.tsx`

### Change Restaurant Name
1. Edit `app/layout.tsx` - metadata title
2. Edit `app/page.tsx` - hero section
3. Edit `components/Navbar.tsx` - logo text
4. Edit `components/Footer.tsx` - brand name

### Customize Authentication
- Change JWT expiration: Edit `JWT_EXPIRES_IN` in `lib/auth.ts`
- Modify cookie settings: Edit cookie options in `api/admin/login/route.ts`
- Add more admin roles: Extend JWT payload in `lib/auth.ts`

---

## 📁 Project Structure Quick Reference

```
my-app/
├── app/                    # Next.js pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── cart/page.tsx      # Shopping cart
│   ├── checkout/page.tsx  # Checkout form
│   ├── contact/page.tsx   # Contact page
│   ├── menu/page.tsx      # Menu browsing
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading UI
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
├── contexts/             # State management
├── lib/                  # Utilities & database
│   ├── auth.ts          # JWT utilities
│   ├── validation.ts    # Zod schemas
│   └── cart-utils.ts    # Cart calculations
├── middleware.ts        # Auth middleware
├── prisma/              # Database schema
├── public/              # Static assets
├── *.md                 # Documentation files
└── package.json         # Dependencies
```

---

## 📞 Support

For issues not covered in the documentation:

1. Check the troubleshooting sections in relevant docs
2. Search the external documentation links
3. Check GitHub issues (if applicable)
4. Ask in community forums (Stack Overflow, Discord, etc.)

---

## 📝 License

This project is open source. Feel free to use it for personal or commercial projects.

---

**Happy coding! Your restaurant website is ready to serve customers! 🍽️🚀**
