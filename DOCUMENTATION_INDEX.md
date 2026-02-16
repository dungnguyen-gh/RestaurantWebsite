# Documentation Index

Complete documentation for your Restaurant E-commerce Website.

---

## 📚 Documentation Files

| File | Description | Read When |
|------|-------------|-----------|
| [QUICKSTART.md](./QUICKSTART.md) | **Start here!** Get running in 15 mins | 🚀 Just starting |
| [README.md](./README.md) | Full project documentation | 📖 Want complete overview |
| [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) | Step-by-step Supabase setup | 🗄️ Setting up database |
| [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) | Deploy to Vercel guide | 🌐 Going live |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Code architecture & structure | 💻 Understanding the code |

---

## 🎯 Recommended Reading Order

### For Beginners (Just Starting)
1. **QUICKSTART.md** - Get it running locally
2. **SETUP_SUPABASE.md** - Set up your database
3. **DEPLOY_VERCEL.md** - Go live

### For Developers (Want to Customize)
1. **README.md** - Full feature list
2. **PROJECT_SUMMARY.md** - Understand the code structure
3. **SETUP_SUPABASE.md** - Database configuration
4. **DEPLOY_VERCEL.md** - Production deployment

### For Troubleshooting
- Build errors → **DEPLOY_VERCEL.md** (Section 8)
- Database issues → **SETUP_SUPABASE.md** (Section 6)
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
- Local development guide
- **Best for**: Comprehensive reference

### SETUP_SUPABASE.md
- Create Supabase project
- Database connection setup
- Storage bucket configuration
- API keys configuration
- Troubleshooting database issues
- **Best for**: Database setup

### DEPLOY_VERCEL.md
- CLI deployment method
- GitHub + Vercel Dashboard method
- Environment variables configuration
- Custom domain setup
- Production troubleshooting
- **Best for**: Going live

### PROJECT_SUMMARY.md
- Project structure diagram
- Feature implementation status
- Database schema
- Component list
- API routes reference
- **Best for**: Understanding the codebase

---

## 🔧 Quick Command Reference

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
npx prisma studio        # Open database GUI
npm run seed             # Seed database with sample data

# Deployment
vercel --prod            # Deploy to production
vercel logs --all        # View deployment logs

# Utilities
npx shadcn add [component] # Add shadcn UI component
```

---

## 🌐 Key URLs (After Deployment)

| Environment | URL |
|-------------|-----|
| Local Development | http://localhost:3000 |
| Admin Panel (Local) | http://localhost:3000/admin/login |
| Production | https://your-domain.vercel.app |
| Admin Panel (Production) | https://your-domain.vercel.app/admin/login |

---

## 🔑 Default Credentials

**Admin Login:**
- Email: `admin@restaurant.com`
- Password: `admin123`

**⚠️ Change this immediately after first login!**

---

## 📋 Setup Checklist

Use this to track your progress:

### Phase 1: Local Development
- [ ] Install Node.js 18+
- [ ] Clone/download this project
- [ ] Run `npm install`
- [ ] Create Supabase project
- [ ] Set up `.env` file
- [ ] Run `npx prisma db push`
- [ ] Run `npm run seed`
- [ ] Run `npm run dev`
- [ ] Test all pages locally

### Phase 2: Production Deployment
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Import project to Vercel
- [ ] Add environment variables in Vercel
- [ ] Deploy to production
- [ ] Test live website
- [ ] Change default admin password

### Phase 3: Content & Launch
- [ ] Upload real food images
- [ ] Update restaurant information
- [ ] Update contact details
- [ ] Test order placement
- [ ] Add custom domain (optional)
- [ ] Share website with customers!

---

## 🆘 Getting Help

### Common Issues

| Problem | Solution | File |
|---------|----------|------|
| Can't connect to database | Check connection string format | SETUP_SUPABASE.md |
| Build fails on Vercel | Add environment variables | DEPLOY_VERCEL.md |
| Images won't upload | Check storage bucket policies | SETUP_SUPABASE.md |
| Admin login not working | Re-seed database | QUICKSTART.md |
| Prisma errors | Run `npx prisma generate` | README.md |

### External Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Docs**: https://ui.shadcn.com

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

### Change Restaurant Name
1. Edit `app/layout.tsx` - metadata title
2. Edit `app/page.tsx` - hero section
3. Edit `components/Navbar.tsx` - logo text
4. Edit `components/Footer.tsx` - brand name

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
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
├── contexts/             # State management
├── lib/                  # Utilities & database
├── prisma/               # Database schema
├── scripts/              # Seed script
├── *.md                  # Documentation files
└── package.json          # Dependencies
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
