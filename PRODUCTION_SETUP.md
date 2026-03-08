# Production-Ready Setup Guide

## Overview
This guide covers deployment and production configuration for the Script Marketplace with:
- Real PostgreSQL database (local development or Neon for production)
- Secure authentication with bcrypt password hashing
- Database connection verification and proper error handling
- No demo mode - real data only

---

## Development Setup (Local PostgreSQL)

### 1. Start PostgreSQL
```bash
# Using Docker
docker run --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=script_market \
  -p 5432:5432 \
  -d postgres:15
```

### 2. Create `.env.local`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/script_market?schema=public"
SESSION_SECRET="dev-secret-key-change-in-production"
NODE_ENV="development"
```

### 3. Run Migrations
```bash
# Install dependencies
npm install

# Run migrations
npx prisma migrate dev --name init

# View database (optional)
npx prisma studio
```

### 4. Seed Database (Optional)
```bash
npx ts-node scripts/seed.ts
```

### 5. Start Development Server
```bash
npm run dev
```

Access at `http://localhost:3000`

---

## Production Setup (Neon PostgreSQL)

### 1. Set Up Neon Database
1. Go to [neon.tech](https://neon.tech)
2. Create account and project
3. Copy connection string with SSL:
   ```
   postgresql://user:password@ep-xyz.neon.tech/script_market?sslmode=require&schema=public
   ```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to connect GitHub repo
```

### 3. Set Environment Variables on Vercel
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add:
   ```
   DATABASE_URL = postgresql://user:password@ep-xyz.neon.tech/script_market?sslmode=require&schema=public
   SESSION_SECRET = <generate-secure-random-secret>
   NODE_ENV = production
   ```

Generate secure secret:
```bash
openssl rand -base64 32
```

### 4. Deploy Migrations
```bash
# From local machine
npx prisma migrate deploy
```

### 5. Verify Deployment
- Visit your Vercel URL
- Test registration with a new email
- Verify data is stored in Neon database:
  ```bash
  npx prisma studio
  ```

---

## Security Features Implemented

### Authentication
- ✓ Bcrypt password hashing (not plain text)
- ✓ Secure session cookies (httpOnly, sameSite=lax)
- ✓ SSL/TLS for database connections (sslmode=require)

### Database
- ✓ Unique email constraint (duplicate prevention)
- ✓ Database connection verification
- ✓ Proper error logging and handling
- ✓ No demo mode - real data only

### Production Cookies
```javascript
{
  httpOnly: true,      // Not accessible via JavaScript
  secure: true,        // HTTPS only
  sameSite: 'lax',     // CSRF protection
  maxAge: 604800000    // 7 days
}
```

---

## Database Connection Requirements

### Development
- Local PostgreSQL running on port 5432
- Uses `.env.local` (git-ignored)
- SSL mode: `prefer`

### Production
- Neon PostgreSQL (or similar cloud provider)
- Uses `.env` (Vercel environment variables)
- SSL mode: `require`
- Connection pooling recommended

### Verification
The application will fail to start if:
- DATABASE_URL is not set
- Database connection cannot be established
- Migrations have not been run

---

## Troubleshooting

### "Database connection failed"
- Verify DATABASE_URL is correct
- Check PostgreSQL is running (development)
- Verify network access (production)

### "Unique constraint failed on email"
- Email is already registered
- User must use different email or login

### "Password hashing error"
- Verify bcryptjs is installed
- Check Node.js version (v14+)

### "SSL certificate problem"
- For Neon: Add `?sslmode=require` to connection string
- For local: Use `?sslmode=prefer` or remove SSL check

---

## Production Monitoring

### Logging
All authentication attempts are logged:
```
[v0] === REGISTRATION REQUEST ===
[v0] Timestamp: 2024-01-15T10:30:45Z
[v0] Database connection verified
[v0] Registration attempt for email: user@example.com
[v0] ✓ User registered successfully - ID: clx...
```

### Database Backups
- Neon automatically backs up data
- Configure backup retention in Neon dashboard
- Test restore procedures regularly

### Connection Pooling
Production deployments should use connection pooling:
```env
DATABASE_URL="postgresql://user:pass@host/db?schema=public&connection_limit=5"
```

---

## Scaling

### Phase 1: Current
- Single Vercel instance
- Neon PostgreSQL
- Up to 1,000 concurrent users

### Phase 2: Scale Up
- Vercel automatic scaling
- Connection pooling on Neon
- Redis caching (optional)

### Phase 3: High Traffic
- CDN for static assets
- Database read replicas
- Session store (Redis)

---

## Rollback Procedures

### Database Rollback
```bash
# List migrations
npx prisma migrate status

# Rollback to specific migration
npx prisma migrate resolve --rolled-back "migration_name"
```

### Code Rollback
1. In Vercel: Select previous deployment
2. Verify environment variables are correct
3. Monitor logs for errors

---

## Next Steps

1. ✓ Create Neon account and database
2. ✓ Deploy to Vercel
3. ✓ Set environment variables
4. ✓ Run migrations in production
5. ✓ Test registration and login
6. ✓ Monitor logs in Vercel dashboard
7. ✓ Set up automated backups
