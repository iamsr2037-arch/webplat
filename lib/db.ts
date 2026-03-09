let prismaClient: any = null;
let dbInitialized = false;

// Lazy load Prisma client to avoid import errors when not generated
async function getPrismaClient() {
  if (prismaClient) return prismaClient;
  
  try {
    const { PrismaClient } = await import("@prisma/client");
    const { neonConfig } = await import("@neondatabase/serverless");
    const globalForPrisma = global as unknown as { prisma: any };
    
    // Configure Neon adapter if available
    let config: any = {
      log: process.env.NODE_ENV === "production" 
        ? ["error"] 
        : ["warn", "error"],
      errorFormat: "pretty",
    };
    
    // Use Neon adapter if DATABASE_URL points to Neon
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes("neon")) {
      try {
        const { PrismaNeon } = await import("@prisma/adapter-neon");
        const { Pool } = await import("@neondatabase/serverless");
        
        neonConfig.webSocketConstructor = WebSocket;
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaNeon(pool);
        
        config.adapter = adapter;
      } catch (e) {
        console.warn("[v0] Neon adapter not available, using default adapter");
      }
    }
    
    prismaClient = globalForPrisma.prisma || new PrismaClient(config);

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaClient;
    }
    
    // Try to initialize database if not already done
    if (!dbInitialized && process.env.NODE_ENV !== "production") {
      try {
        await initializeDatabase(prismaClient);
        dbInitialized = true;
      } catch (initError: any) {
        console.warn("[v0] Database initialization failed:", initError.message);
      }
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

// Initialize database with migrations
async function initializeDatabase(client: any) {
  try {
    console.log("[v0] Attempting to initialize database...");
    
    // Try to run a simple query to check if database is ready
    await client.$queryRaw`SELECT 1`;
    console.log("[v0] Database is ready");
    return true;
  } catch (error: any) {
    // Check if the error is due to missing tables
    if (error.message && error.message.includes("does not exist")) {
      console.log("[v0] Database tables missing. Run 'npm run db:migrate' to create them.");
      return false;
    }
    console.warn("[v0] Database initialization warning:", error.message);
    return false;
  }
}

// Export both sync and async versions for compatibility
export { getPrismaClient };

// Try to initialize synchronously for backward compatibility
let initializedPrisma: any;
try {
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = global as unknown as { prisma: any };
  
  let config: any = {
    log: process.env.NODE_ENV === "production" 
      ? ["error"] 
      : ["warn", "error"],
    errorFormat: "pretty",
  };
  
  // Note: Neon adapter requires async initialization, so for sync fallback we use default
  initializedPrisma = globalForPrisma.prisma || new PrismaClient(config);
  
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = initializedPrisma;
  }
} catch (error) {
  // Prisma not yet generated, will use async version
  console.warn("[v0] Prisma client not yet available - using fallback mode");
  initializedPrisma = null;
}

export const prisma = initializedPrisma;
