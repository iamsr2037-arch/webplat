import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data: Record<string, string> = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    console.log("[v0] Payment callback received:", data);

    // Get the transaction ID
    const transactionId = data.tran_id;
    const status = data.status;

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID missing" },
        { status: 400 }
      );
    }

    // Find order by transaction ID
    const order = await prisma.order.findFirst({
      where: { ssLcommerzTransactionId: transactionId },
    });

    if (!order) {
      console.warn("[v0] Order not found for transaction:", transactionId);
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Update order status based on payment status
    if (status === "VALID" || status === "success") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "COMPLETED",
          deliveryStatus: "PENDING",
        },
      });

      // Send confirmation email here (implementation later)
      console.log("[v0] Order confirmed:", order.id);

      // Redirect to success page
      return NextResponse.redirect(
        new URL(
          `/checkout/success?orderId=${order.id}`,
          request.url
        )
      );
    } else if (status === "FAILED" || status === "failed") {
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentStatus: "FAILED" },
      });

      return NextResponse.redirect(
        new URL(
          `/checkout?failed=true&orderId=${order.id}`,
          request.url
        )
      );
    } else {
      return NextResponse.json(
        { error: "Unknown payment status" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[v0] Payment callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    if (status === "success") {
      return NextResponse.redirect(new URL("/checkout/success", request.url));
    } else if (status === "failed") {
      return NextResponse.redirect(new URL("/checkout", request.url));
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("[v0] Payment callback GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
