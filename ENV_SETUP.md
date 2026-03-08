# Environment Configuration Guide

## Quick Start

### Development (Local PostgreSQL)

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS with Homebrew
   brew install postgresql

   # Or use Docker
   docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:latest
   ```

2. **Create .env.local file** in the project root:
   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/script_market?schema=public"
   NODE_ENV="development"
   SESSION_SECRET="dev-secret-change-in-production"
   ```

3. **Run migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed database** (optional):
   ```bash
   npx ts-node scripts/seed.ts
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

### Production (Neon PostgreSQL on Vercel)

1. **Set up Neon database**:
   - Go to https://neon.tech
   - Create a new PostgreSQL database
   - Copy the connection string (includes SSL by default)

2. **Set Vercel environment variables**:
   - Go to Vercel Project Settings → Environment Variables
   - Add `DATABASE_URL` with your Neon connection string
   - Add `SESSION_SECRET` with a secure random value
   - Set `NODE_ENV` to `production`

3. **Deploy migrations**:
   ```bash
   npx prisma migrate deploy
   ```

4. **Deploy to Vercel**:
   ```bash
   git push origin main
   ```

## Environment Variables

### Required

| Variable | Development | Production | Example |
|----------|-------------|-----------|---------|
| `DATABASE_URL` | `.env.local` | `.env` (Vercel) | `postgresql://user:pass@localhost:5432/db` |
| `NODE_ENV` | `development` | `production` | ✓ |

### Optional but Recommended

| Variable | Purpose | Example |
|----------|---------|---------|
| `SESSION_SECRET` | Session encryption key | `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` |

## Database URL Formats

### Local Development (PostgreSQL)
```
postgresql://postgres:password@localhost:5432/script_market?schema=public
```

### Neon Production (with SSL)
```
postgresql://user:password@ep-xyz.neon.tech/dbname?sslmode=require&schema=public
```

**Note**: The `sslmode=require` is critical for production security.

## Validation & Startup

The application automatically validates environment variables on startup:

- **DATABASE_URL**: Required - app fails to start without it
- **SSL Mode**: Verified in production (must include `sslmode=require`)
- **SESSION_SECRET**: Warning if not set in production

View startup logs:
```bash
npm run dev
# Look for "[v0]" prefixed messages in console
```

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running
```bash
# macOS
brew services start postgresql

# Docker
docker start postgres
```

### DATABASE_URL Not Set
```
[v0] FATAL: DATABASE_URL environment variable is not set
```
**Solution**: Create `.env.local` with DATABASE_URL

### SSL Error in Production
```
SSL Error: sslmode required
```
**Solution**: Ensure DATABASE_URL includes `sslmode=require`

### Migration Failed
```bash
# Rollback last migration
npx prisma migrate resolve --rolled-back

# Run fresh migration
npx prisma migrate dev
```

## Security Best Practices

1. **Never commit .env files**:
   ```bash
   echo ".env.local" >> .gitignore
   ```

2. **Use strong SESSION_SECRET** (production):
   ```bash
   openssl rand -base64 32
   ```

3. **Enable SSL for all database connections**:
   - Development: Optional (`sslmode=prefer`)
   - Production: Required (`sslmode=require`)

4. **Rotate SESSION_SECRET regularly** in production

5. **Use Vercel Environment Variables** instead of `.env` files for production

## Environment File Checklist

### Development (.env.local)
- [ ] DATABASE_URL set to local PostgreSQL
- [ ] NODE_ENV set to "development"
- [ ] .env.local added to .gitignore
- [ ] Migrations run successfully

### Production (Vercel)
- [ ] DATABASE_URL set in Vercel Environment Variables
- [ ] NODE_ENV set to "production"
- [ ] SESSION_SECRET set to secure random value
- [ ] SSL mode enabled in DATABASE_URL
- [ ] Migrations deployed with `prisma migrate deploy`
- [ ] No .env file in git repository

## Monitoring & Logs

Check application logs for configuration issues:

```bash
# Development
npm run dev
# Watch for "[v0]" prefixed messages

# Production (Vercel)
# Deployments → Select build → Logs tab
```

Key log messages:
- `[v0] Environment loaded` - Configuration successful
- `[v0] Database connection verified` - Database is accessible
- `[v0] ✓ Application initialized successfully` - App ready
