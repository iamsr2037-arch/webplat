import { NextRequest, NextResponse } from 'next/server';
import { prisma, getPrismaClient } from '@/lib/db';
import { z } from 'zod';

const serviceRequestSchema = z.object({
  userId: z.string(),
  businessType: z.string(),
  budget: z.string(),
  timeline: z.string(),
  featuresNeeded: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const client = !prisma ? await getPrismaClient() : prisma;
    
    if (!client) {
      return NextResponse.json(
        { error: 'Database unavailable' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const validation = serviceRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const { userId, businessType, budget, timeline, featuresNeeded } = validation.data;

    // Verify user exists
    const user = await client.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create service request
    const serviceRequest = await client.serviceRequest.create({
      data: {
        userId,
        businessType,
        budget,
        timeline,
        featuresNeeded,
        status: 'PENDING',
      },
    });

    // TODO: Send email notification to admin

    return NextResponse.json(
      {
        message: 'Service request submitted successfully',
        serviceRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Service request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit service request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    const client = !prisma ? await getPrismaClient() : prisma;
    
    if (!client) {
      return NextResponse.json(
        { error: 'Database unavailable' },
        { status: 503 }
      );
    }

    const requests = await client.serviceRequest.findMany({
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      requests,
    });
  } catch (error) {
    console.error('[v0] Get service requests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}
