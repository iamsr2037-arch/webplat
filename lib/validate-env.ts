// Environment variable validation utility
// Run this on application startup to ensure all required variables are set

export function validateEnvironment(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required variables
  if (!process.env.DATABASE_URL) {
    errors.push("DATABASE_URL is not set - database operations will fail");
  }

  // Validate DATABASE_URL format if set
  if (process.env.DATABASE_URL) {
    if (!process.env.DATABASE_URL.startsWith("postgresql://")) {
      errors.push("DATABASE_URL must start with postgresql://");
    }
    if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL.includes("sslmode=require")) {
      warnings.push("DATABASE_URL in production should include sslmode=require for security");
    }
  }

  // Optional but recommended in production
  if (process.env.NODE_ENV === "production") {
    if (!process.env.SESSION_SECRET) {
      warnings.push("SESSION_SECRET is not set - using default (not secure for production)");
    }
  }

  // Log validation results
  console.log("[v0] Environment Validation:", {
    NODE_ENV: process.env.NODE_ENV,
    hasDatabase: !!process.env.DATABASE_URL,
    hasSessionSecret: !!process.env.SESSION_SECRET,
    errorsCount: errors.length,
    warningsCount: warnings.length,
  });

  if (errors.length > 0) {
    console.error("[v0] Environment Errors:");
    errors.forEach((error) => console.error("[v0]   - " + error));
  }

  if (warnings.length > 0) {
    console.warn("[v0] Environment Warnings:");
    warnings.forEach((warning) => console.warn("[v0]   - " + warning));
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Helper function to safely log environment without exposing secrets
export function logEnvironmentSummary(): void {
  console.log("[v0] ========================================");
  console.log("[v0] Environment Configuration Summary");
  console.log("[v0] ========================================");
  console.log("[v0] NODE_ENV:", process.env.NODE_ENV);
  console.log("[v0] DATABASE_URL:", process.env.DATABASE_URL ? "SET (***)" : "NOT SET");
  console.log("[v0] SESSION_SECRET:", process.env.SESSION_SECRET ? "SET (***)" : "NOT SET");
  console.log("[v0] NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
  console.log("[v0] ========================================");
}
