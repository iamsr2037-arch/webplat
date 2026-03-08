import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: "Download token is required" },
        { status: 400 }
      );
    }

    // Find order by download token
    const order = await prisma.order.findUnique({
      where: { downloadToken: token },
      include: { product: true, user: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Invalid download token" },
        { status: 404 }
      );
    }

    // Check if token is expired
    if (order.expiresAt && new Date() > order.expiresAt) {
      return NextResponse.json(
        { error: "Download token has expired" },
        { status: 401 }
      );
    }

    // Check if payment is completed
    if (order.paymentStatus !== "COMPLETED") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    // Check if product has a file URL
    if (!order.product?.fileUrl) {
      return NextResponse.json(
        { error: "Product file not available" },
        { status: 404 }
      );
    }

    // Try to get file from public/uploads
    const filePath = path.join(
      process.cwd(),
      "public",
      order.product.fileUrl
    );

    if (!fs.existsSync(filePath)) {
      console.warn("[v0] File not found at:", filePath);
      return NextResponse.json(
        { error: "File not found on server" },
        { status: 404 }
      );
    }

    // Log download
    await prisma.download.create({
      data: {
        orderId: order.id,
        userId: order.userId,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || undefined,
      },
    });

    // Read file
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    // Return file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[v0] Download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
