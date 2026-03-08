let prismaClient: any = null;

// Lazy load Prisma client to avoid import errors when not generated
async function getPrismaClient() {
  if (prismaClient) return prismaClient;
  
  try {
    const { PrismaClient } = await import("@prisma/client");
    const globalForPrisma = global as unknown as { prisma: any };
    
    prismaClient =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: process.env.NODE_ENV === "production" 
          ? ["error"] 
          : ["warn", "error"],
        errorFormat: "pretty",
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClient;
    }
    
    return prismaClient;
  } catch (error: any) {
    if (error.code === "MODULE_NOT_FOUND" || error.message.includes(".prisma/client")) {
      console.error(
        "[v0] Prisma client not generated. Run 'npx prisma generate' to create it."
      );
      throw new Error("Database connection unavailable - Prisma client not generated");
    }
    throw error;
  }
}

// Export both sync and async versions for compatibility
export { getPrismaClient };

// Try to initialize synchronously for backward compatibility
let initializedPrisma: any;
try {
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = global as unknown as { prisma: any };
  initializedPrisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === "production" 
        ? ["error"] 
        : ["warn", "error"],
      errorFormat: "pretty",
    });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = initializedPrisma;
  }
} catch (error) {
  // Prisma not yet generated, will use async version
  console.warn("[v0] Prisma client not yet available - using fallback mode");
  initializedPrisma = null;
}

export const prisma = initializedPrisma;
