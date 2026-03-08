# Deployment Checklist

## Pre-Deployment Tasks

### Phase 1: Testing (Local Development)
- [ ] Run `npm install` successfully
- [ ] Database migrations run without errors
- [ ] Seed script creates test data
- [ ] Can register new user
- [ ] Can login with test credentials
- [ ] Can view products listing
- [ ] Can view product details
- [ ] Can view service request form
- [ ] Dashboard loads without errors
- [ ] All navigation links work

### Phase 2: Environment Setup
- [ ] Create `.env.local` with all required variables:
  - [ ] `DATABASE_URL` - PostgreSQL connection
  - [ ] `SSLCOMMERZ_STORE_ID` - Sandbox credentials
  - [ ] `SSLCOMMERZ_STORE_PASSWORD` - Sandbox credentials
  - [ ] `SSLCOMMERZ_API_URL` - Sandbox URL
  - [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
  - [ ] `NEXT_PUBLIC_APP_URL` - Your application URL

### Phase 3: Database Preparation
- [ ] PostgreSQL database created on hosting provider
- [ ] Connection string added to `.env.local`
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Seed data loaded: `npx ts-node scripts/seed.ts`
- [ ] Database backups configured
- [ ] Database user permissions secured

### Phase 4: SSLCommerz Integration
- [ ] SSLCommerz merchant account created
- [ ] Store ID obtained
- [ ] Store password obtained
- [ ] Sandbox API URL tested
- [ ] Payment gateway loads without errors
- [ ] Test transaction completed successfully
- [ ] IPN callback verified

### Phase 5: Email Service Setup
- [ ] Email service provider selected (SendGrid/Nodemailer)
- [ ] API keys/credentials obtained
- [ ] Email templates created
- [ ] Test email sent successfully
- [ ] Email configuration in environment variables

### Phase 6: File Storage Setup
- [ ] Storage solution selected (Vercel Blob/AWS S3)
- [ ] Storage configured
- [ ] Sample file upload tested
- [ ] File download verified
- [ ] File expiration working

### Phase 7: Security Hardening
- [ ] Admin authentication middleware implemented
  - [ ] Protect `/admin` routes
  - [ ] Protect product creation/edit/delete
  - [ ] Protect service request management
- [ ] Rate limiting added to API routes
- [ ] Input validation on all endpoints
- [ ] CORS configured properly
- [ ] Environment variables secured
- [ ] Database credentials not exposed
- [ ] API keys encrypted

### Phase 8: Frontend Setup
- [ ] Update `NEXT_PUBLIC_APP_URL` in metadata
- [ ] Update branding (logo, colors, text)
- [ ] Update footer links
- [ ] Create About page
- [ ] Create Contact page
- [ ] Create Terms of Service page
- [ ] Create Privacy Policy page
- [ ] Mobile responsive testing on multiple devices

### Phase 9: Performance & Optimization
- [ ] Build successful: `npm run build`
- [ ] No build warnings or errors
- [ ] Images optimized
- [ ] Bundle size acceptable
- [ ] Database queries optimized
- [ ] API response times < 500ms

### Phase 10: Testing Checklist
- [ ] **User Journey:**
  - [ ] Register → Login → Browse → Purchase → Download
  - [ ] Register → Service Request → Submission → Confirmation
  - [ ] Admin Login → Manage Orders → Approve → Email sent
- [ ] **Payment Flow:**
  - [ ] Payment initiation works
  - [ ] Redirects to SSLCommerz correctly
  - [ ] IPN callback processes correctly
  - [ ] Order status updates correctly
- [ ] **Edge Cases:**
  - [ ] Expired download tokens rejected
  - [ ] Invalid tokens rejected
  - [ ] Incomplete payments handled
  - [ ] Error pages display correctly

### Phase 11: Documentation
- [ ] README updated with current info
- [ ] API documentation created
- [ ] Database schema documented
- [ ] Deployment instructions written
- [ ] Troubleshooting guide created
- [ ] Admin dashboard instructions documented

---

## Deployment Steps

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial marketplace platform commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Deploy to Vercel
```bash
# Option A: Using Vercel CLI
npm i -g vercel
vercel

# Option B: Connect via Vercel Dashboard
# - Go to vercel.com
# - Connect GitHub repository
# - Configure environment variables
# - Deploy
```

### Step 3: Set Up Database
```bash
# On Railway/Neon/DigitalOcean
# Create PostgreSQL database
# Get connection string
# Add to Vercel environment variables as DATABASE_URL
```

### Step 4: Run Migrations
```bash
# SSH into production or use Vercel CLI
vercel env pull
npx prisma migrate deploy
npx prisma db seed
```

### Step 5: Configure Environment
In Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=postgresql://...
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_password
SSLCOMMERZ_API_URL=https://sandbox.sslcommerz.com (or live)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@yoursite.com
NEXT_PUBLIC_APP_URL=https://yoursite.com
```

### Step 6: Test Live
- [ ] Visit your production URL
- [ ] Test user registration
- [ ] Test login
- [ ] Test product browsing
- [ ] Test payment flow (use sandbox credentials)
- [ ] Verify email sends
- [ ] Test download link

---

## Post-Deployment Tasks

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (Vercel Analytics)
- [ ] Set up log aggregation (LogRocket)
- [ ] Monitor database performance

### Maintenance
- [ ] Daily: Check for errors
- [ ] Weekly: Review user feedback
- [ ] Monthly: Performance optimization
- [ ] Quarterly: Security audit

### Future Phases
- [ ] Phase 2: Admin Dashboard implementation
- [ ] Phase 3: Email notification system
- [ ] Phase 4: Advanced analytics
- [ ] Phase 5: Coupon/discount system
- [ ] Phase 6: Customer support system

---

## Rollback Plan

If deployment fails:
1. Revert to previous commit on GitHub
2. Trigger Vercel redeployment of previous version
3. Check database - may need to rollback migrations
4. Verify SSL/payment gateway connections
5. Contact support if critical issues

---

## Support Contacts

- **Vercel Support:** vercel.com/support
- **Prisma Docs:** prisma.io
- **SSLCommerz Support:** sslcommerz.com/support
- **PostgreSQL Docs:** postgresql.org/docs

---

## Success Criteria

Your deployment is successful when:
- ✅ Site is live and accessible
- ✅ User registration works
- ✅ Payment processing works (sandbox)
- ✅ Emails are sent successfully
- ✅ Downloads are delivered correctly
- ✅ No critical errors in logs
- ✅ Response times are acceptable
- ✅ Mobile experience is good

---

**Last Updated:** 2026-02-28
**Status:** Ready for Initial Testing
