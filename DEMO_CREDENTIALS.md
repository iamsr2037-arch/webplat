# Script Marketplace - Demo Credentials & Setup Guide

## Demo Login Credentials

### Admin Account
- **Email**: `admin@scriptmarket.com`
- **Password**: `admin123456`
- **Access**: Admin Dashboard, Product Management, Order Management, User Management

### Customer Account
- **Email**: `customer@example.com`
- **Password**: `customer123456`
- **Access**: Product Browsing, Shopping, Dashboard, Service Requests

## How to Use the Platform

### For Regular Users (Customers)
1. Click "Register" to create a new account with your email and password
2. Browse products by category (E-Commerce, Dashboards, etc.)
3. Click "View Demo" to see a live product demonstration
4. Click "Purchase" to buy a product
5. Complete payment via SSLCommerz
6. Access your downloads from the Dashboard

### For Admin Users
1. Login with admin credentials above
2. Go to `/admin` (or click "Admin" in the menu after login)
3. Access management tools:
   - **Products**: Add new products, edit pricing, manage inventory
   - **Orders**: View customer orders, update status
   - **Users**: Manage user accounts and roles

## Key Features

### Marketplace
- Browse and search products by category
- View detailed product information
- See live demos of products
- Purchase products with secure payment

### Services
- Custom development services
- Installation services with support
- Priority support packages
- Service request form for custom quotes

### Admin Dashboard
- Real-time statistics and analytics
- Product management (CRUD operations)
- Order tracking and status updates
- User management and role assignment

## Demo Mode
The platform runs in "demo mode" when the database is not connected:
- All registrations are stored in browser's localStorage
- Products use built-in demo data
- Orders are tracked in-memory
- Features work fully without a production database

## Production Setup
To connect to a real database:
1. Set up PostgreSQL database
2. Configure `.env` file with database URL
3. Run migrations: `npx prisma migrate dev`
4. Seed data: `npx ts-node scripts/seed.ts`
5. Restart the application

## Troubleshooting

### Registration Error
- Check browser console (F12) for detailed error messages
- Ensure email format is valid
- Try a different email address
- Clear browser cache and try again

### Admin Access
- Use demo admin credentials above
- Or register a new account and manually set role to ADMIN in browser console

### Payment Testing
- Currently configured for SSLCommerz (Bangladesh payment gateway)
- In demo mode, payment processing is simulated
- For production, configure SSLCommerz API credentials in `.env`

## Next Steps
1. Customize branding and colors in `app/globals.css`
2. Connect a real database (PostgreSQL)
3. Configure email notifications (Nodemailer/SendGrid)
4. Add your own products and services
5. Deploy to Vercel or your own server
