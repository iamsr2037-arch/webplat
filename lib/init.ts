// Application initialization - runs once on startup
// Validates environment, database connection, and logs configuration

import { validateEnvironment, logEnvironmentSummary } from "./validate-env";
import { prisma } from "./db";

let initialized = false;

export async function initializeApp(): Promise<boolean> {
  if (initialized) {
    return true;
  }

  console.log("[v0] ========================================");
  console.log("[v0] Initializing Application");
  console.log("[v0] ========================================");

  // Validate environment variables
  const envValidation = validateEnvironment();
  logEnvironmentSummary();

  if (!envValidation.valid) {
    console.error("[v0] ✗ Environment validation failed");
    console.error("[v0] Fatal errors:");
    envValidation.errors.forEach((error) => console.error("[v0]   - " + error));
    return false;
  }

  // Test database connection
  try {
    console.log("[v0] Testing database connection...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("[v0] ✓ Database connection successful");
  } catch (error) {
    console.error("[v0] ✗ Database connection failed:", error);
    return false;
  }

  initialized = true;
  console.log("[v0] ✓ Application initialized successfully");
  console.log("[v0] ========================================");

  return true;
}

// Export initialization status
export function isInitialized(): boolean {
  return initialized;
}
