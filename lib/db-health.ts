import { getPrismaClient } from './db';

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = await getPrismaClient();
    if (!client) {
      console.warn('[v0] Prisma client not available');
      return false;
    }
    
    try {
      await client.$queryRaw`SELECT 1`;
      console.log('[v0] Database connection verified');
      return true;
    } catch (error: any) {
      if (error.message?.includes('does not exist')) {
        console.warn('[v0] Database tables not set up. Run "npm run db:migrate" to initialize.');
        return false;
      }
      throw error;
    }
  } catch (error: any) {
    console.warn('[v0] Database connection check failed:', error?.message || error);
    return false;
  }
}

export async function requireDatabaseConnection(): Promise<void> {
  const isConnected = await checkDatabaseConnection();
  if (!isConnected) {
    throw new Error('Database not ready. Please run "npm run db:migrate" to initialize the database.');
  }
}
