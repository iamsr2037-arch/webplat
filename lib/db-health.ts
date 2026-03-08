import { prisma } from './db';

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('[v0] Database connection verified');
    return true;
  } catch (error) {
    console.error('[v0] Database connection failed:', error);
    return false;
  }
}

export async function requireDatabaseConnection(): Promise<void> {
  const isConnected = await checkDatabaseConnection();
  if (!isConnected) {
    throw new Error('Database connection failed. Cannot proceed without database.');
  }
}
