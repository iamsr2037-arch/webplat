import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";
import { requireDatabaseConnection } from "@/lib/db-health";
import { cookieConfig } from "@/lib/env";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] === LOGIN REQUEST ===");
    console.log("[v0] Timestamp:", new Date().toISOString());

    // Require database connection - fail fast if DB is down
    await requireDatabaseConnection();
    console.log("[v0] Database connection verified");

    const body = await request.json();
    console.log("[v0] Login attempt for email:", body.email);

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.errors[0].message;
      console.error("[v0] Login validation error:", errorMsg);
      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    console.log("[v0] Input validation passed");

    // Verify credentials against database
    console.log("[v0] Verifying credentials for email:", email);
    const user = await verifyCredentials(email, password);

    if (!user) {
      console.warn("[v0] Login failed: invalid credentials for email -", email);
      return NextResponse.json(
        { error: "Invalid email or password. Please check and try again." },
        { status: 401 }
      );
    }

    console.log("[v0] ✓ Login successful - User ID:", user.id);

    // Create response with user data
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie using production config
    response.cookies.set({
      name: "auth-token",
      value: user.id,
      ...cookieConfig,
    });

    console.log("[v0] Auth cookie set with secure config");
    return response;
  } catch (error) {
    console.error("[v0] ✗ Login error:", error);

    // Handle database connection errors
    if (error instanceof Error && error.message.includes("Database connection failed")) {
      console.error("[v0] Database unavailable - cannot proceed");
      return NextResponse.json(
        { error: "Authentication service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Login failed. Please try again later." },
      { status: 500 }
    );
  }
}
