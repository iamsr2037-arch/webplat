import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  generateTransactionId,
  generateDownloadToken,
  calculateTokenExpiry,
  initiateSslcommerzPayment,
} from "@/lib/payment";
import { z } from "zod";

const paymentSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  installationService: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = paymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const { productId, userId, installationService } = validation.data;

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Calculate amount
    let amount = product.price;
    if (installationService && product.installationService) {
      amount += 99.99; // Installation service fee
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();
    const downloadToken = generateDownloadToken();

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        productId,
        type: "READY_SCRIPT",
        amount,
        paymentStatus: "PENDING",
        downloadToken,
        expiresAt: calculateTokenExpiry(30),
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Prepare SSLCommerz parameters
    const paymentUrl = initiateSslcommerzPayment({
      store_id: process.env.SSLCOMMERZ_STORE_ID || "",
      store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD || "",
      total_amount: amount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${appUrl}/api/payment/callback?status=success`,
      fail_url: `${appUrl}/api/payment/callback?status=failed`,
      cancel_url: `${appUrl}/checkout?cancelled=true`,
      ipn_url: `${appUrl}/api/payment/callback`,
      cus_name: user.name || "Customer",
      cus_email: user.email,
      product_name: product.title,
    });

    // Store transaction ID in order for verification
    await prisma.order.update({
      where: { id: order.id },
      data: { ssLcommerzTransactionId: transactionId },
    });

    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId: order.id,
      transactionId,
    });
  } catch (error) {
    console.error("[v0] Payment initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate payment" },
      { status: 500 }
    );
  }
}
