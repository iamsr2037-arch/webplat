// Production-ready environment configuration

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Database configuration
export const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Security configuration
export const sessionSecret = process.env.SESSION_SECRET || 'dev-secret-change-in-production';

// Cookie configuration - secure in production
export const cookieConfig = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ('lax' as const) : ('lax' as const),
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

// SSL mode for PostgreSQL
export const postgresSSLMode = isProduction ? 'require' : 'prefer';

console.log('[v0] Environment loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: databaseUrl ? '***' : 'NOT SET',
  isProduction,
  isDevelopment,
});
