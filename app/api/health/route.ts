import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/db-health';

export async function GET() {
  try {
    console.log('[v0] Health check initiated');
    
    const dbConnected = await checkDatabaseConnection();
    
    if (!dbConnected) {
      console.error('[v0] Health check failed: Database unavailable');
      return NextResponse.json(
        {
          status: 'unhealthy',
          timestamp: new Date().toISOString(),
          database: 'unavailable',
          message: 'Database connection failed',
        },
        { status: 503 }
      );
    }

    console.log('[v0] ✓ Health check passed');
    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        uptime: process.uptime(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
