# Script Marketplace - Setup Guide

## Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- **DATABASE_URL**: Your PostgreSQL connection string
- **SSLCOMMERZ_STORE_ID**: Your SSLCommerz store ID
- **SSLCOMMERZ_STORE_PASSWORD**: Your SSLCommerz password
- **SSLCOMMERZ_API_URL**: SSLCommerz API endpoint (sandbox or live)
- **SMTP_***: Email service credentials

### 2. Database Setup

```bash
# Install Prisma
npm install

# Run migrations
npx prisma migrate dev --name init

# Seed initial data (admin user + sample products)
npx ts-node scripts/seed.ts
```

**Admin Credentials (from seed):**
- Email: `admin@marketplace.com`
- Password: `admin123456`

**Sample Customer:**
- Email: `customer@example.com`
- Password: `customer123456`

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Project Structure

### Pages
- `/` - Homepage with hero section and features
- `/products` - Product listing with filters and search
- `/products/[id]` - Product detail page with demo and purchase
- `/login` - Customer login
- `/register` - Customer registration
- `/checkout` - Payment page
- `/checkout/success` - Order confirmation
- `/services/request` - Custom development request form
- `/dashboard` - User dashboard (coming next)
- `/admin` - Admin panel (coming next)

### API Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/products` - Get all products (with filters)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)
- `POST /api/payment/initiate` - Start payment process
- `POST /api/payment/callback` - Handle SSLCommerz IPN
- `GET /api/download/[token]` - Download purchased file
- `POST /api/services/request` - Submit service request
- `GET /api/services/request` - Get all requests (admin)

### Components
- `Header.tsx` - Navigation header
- `Footer.tsx` - Footer with links
- `ProductCard.tsx` - Product card component
- `LoginForm.tsx` - Login form (ready for import)

### Utilities
- `lib/db.ts` - Prisma client
- `lib/auth.ts` - Authentication functions
- `lib/payment.ts` - Payment utilities
- `prisma/schema.prisma` - Database schema

---

## Database Schema

### Tables
1. **users** - Customers and admins
2. **products** - Website templates/scripts
3. **orders** - Purchase records
4. **service_requests** - Custom development requests
5. **downloads** - Download activity tracking

---

## Features Status

✅ **Completed:**
- Database setup with Prisma
- User authentication (register/login)
- Product catalog with filtering
- Product detail pages
- Payment integration scaffolding
- Download token generation
- Service request form
- Dribbble-inspired design system

⏳ **Next Phase:**
- User dashboard with order history
- Admin dashboard with order management
- Product management interface
- File upload system
- Email notifications
- Payment verification
- Admin authentication middleware

---

## Payment Flow (SSLCommerz)

1. User clicks "Buy Now" on product
2. System creates order with download token
3. User redirected to SSLCommerz gateway
4. After payment, SSLCommerz sends IPN callback
5. System updates order status
6. Download link sent via email
7. User can access download from dashboard

---

## Important Notes

### Security
- Passwords are hashed with bcrypt
- Download tokens are unique and time-limited (30 days)
- API routes need admin authentication middleware (TODO)
- File downloads verified by token validation

### Future Enhancements
- Email notifications system
- Product reviews/ratings
- Admin authentication middleware
- File upload/storage integration
- Analytics dashboard
- Coupon/discount system
- Customer support tickets
- Affiliate program

---

## Troubleshooting

### Database connection fails
- Check DATABASE_URL in .env.local
- Ensure PostgreSQL is running
- Verify credentials

### Payment not working
- Verify SSLCommerz credentials
- Check API URL (sandbox vs live)
- Review payment callback logs

### Files not downloading
- Confirm file path in `public/uploads/`
- Check download token validity
- Verify payment status is COMPLETED

---

## Support

For issues or questions, contact: `support@scriptmarket.com`
