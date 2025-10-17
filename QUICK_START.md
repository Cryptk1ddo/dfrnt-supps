# 🚀 Quick Start Guide - DFRNT E-Commerce

## Get Up and Running in 3 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, GSAP, Zustand, React Query, and more.

### Step 2: Run the Development Server

```bash
npm run dev
```

### Step 3: Open Your Browser

Navigate to **http://localhost:3000**

That's it! 🎉 The store is now running with 8 pre-configured products.

## What You'll See

### Homepage (/)
- Hero section with DFRNT branding
- Feature highlights (Science-Backed, Peak Performance, etc.)
- Product category cards
- Call-to-action sections

### Products Page (/products)
- Grid of all 8 products
- Category filters (Supplements, Blue-Light Glasses, etc.)
- Product cards with images, prices, and add-to-cart

### Product Detail (/products/[slug])
- Full product information
- Multiple images
- Benefits and ingredients
- Add to cart with quantity selector

### Shopping Cart
- Click the cart icon in the header
- Sliding sidebar from the right
- Add/remove items
- Quantity adjustments
- View totals with tax and shipping

## 🎨 Try These Features

1. **Browse Products**
   - Go to /products
   - Filter by category (click the category buttons)
   - Click any product to see details

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Cart sidebar slides in automatically
   - See real-time cart updates

3. **Manage Cart**
   - Increase/decrease quantities
   - Remove items
   - See subtotal, tax, and shipping calculations
   - Free shipping over $75!

4. **Animations**
   - Hover over product cards (scale effect)
   - Page transitions (fade in)
   - Cart sidebar (slide from right)
   - Smooth micro-interactions throughout

## 📝 Customize Your Store

### Change Product Data
Edit `src/lib/mock-data.ts` to modify products:
- Update names, descriptions, prices
- Change images (use Unsplash URLs)
- Add/remove products
- Modify categories

### Update Branding
Edit `tailwind.config.ts`:
- Change colors (primary, accent, dark)
- Update fonts
- Modify spacing, borders, etc.

Edit `src/components/layout/Header.tsx`:
- Change "DFRNT" to your brand name
- Update navigation links

### Adjust Pricing
Edit `src/domains/cart/stores/useCartStore.ts`:
- Tax rate (default: 8%)
- Shipping cost (default: $9.99)
- Free shipping threshold (default: $75)

## 🛠️ Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## 📦 Project Structure Quick Reference

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── products/
│   │   ├── page.tsx          # Product listing
│   │   └── [slug]/page.tsx   # Product detail
│   └── layout.tsx            # Site layout
├── components/
│   ├── ui/                   # Button, Card, Input, Badge
│   └── layout/               # Header, Footer
├── domains/
│   ├── cart/                 # Shopping cart
│   └── catalog/              # Product catalog
├── hooks/
│   └── useGsap.ts           # Animation hooks
├── lib/
│   ├── mock-data.ts         # 8 products
│   └── utils.ts             # Helper functions
└── types/
    └── index.ts             # TypeScript types
```

## 🎯 What Works Out of the Box

✅ Product browsing and filtering  
✅ Product detail pages  
✅ Shopping cart with persistence  
✅ Real-time cart calculations  
✅ Responsive design (mobile, tablet, desktop)  
✅ GSAP animations  
✅ Type-safe throughout  
✅ Mock data (no backend needed)  

## 🔮 What's Next?

### To Add Real Backend:
1. Set up Strapi CMS for products
2. Configure Supabase for user accounts
3. Add Stripe for payments

### To Extend Features:
1. Build checkout flow
2. Add user authentication
3. Create account pages
4. Add product search
5. Implement reviews

## 💡 Tips

- **Cart persists** in localStorage - refresh the page and your cart remains!
- **All animations** are customizable in `src/hooks/useGsap.ts`
- **Type errors?** Run `npm install` to ensure all packages are installed
- **Need help?** Check `SETUP.md` for detailed documentation

## 🎨 Brand Customization Checklist

- [ ] Update "DFRNT" to your brand name in Header
- [ ] Change primary/accent colors in `tailwind.config.ts`
- [ ] Replace logo and favicon
- [ ] Update product images to your own
- [ ] Modify product data in `mock-data.ts`
- [ ] Customize footer links and social media
- [ ] Update meta tags in `layout.tsx`

## 📞 Need Help?

- See `SETUP.md` for full setup guide
- See `PROJECT_SUMMARY.md` for feature overview
- Check Next.js docs: https://nextjs.org/docs
- Check Tailwind docs: https://tailwindcss.com/docs

---

**Happy building! 🚀**
