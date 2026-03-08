import { prisma, getPrismaClient } from './db';

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    // Try to use the initialized prisma first
    if (prisma) {
      await prisma.$queryRaw`SELECT 1`;
      console.log('[v0] Database connection verified');
      return true;
    }
    
    // If prisma is null, try async initialization
    const client = await getPrismaClient();
    if (!client) {
      console.warn('[v0] Prisma client not available');
      return false;
    }
    
    await client.$queryRaw`SELECT 1`;
    console.log('[v0] Database connection verified');
    return true;
  } catch (error: any) {
    console.error('[v0] Database connection failed:', error?.message || error);
    return false;
  }
}

export async function requireDatabaseConnection(): Promise<void> {
  const isConnected = await checkDatabaseConnection();
  if (!isConnected) {
    throw new Error('Database connection failed. Cannot proceed without database.');
  }
}
