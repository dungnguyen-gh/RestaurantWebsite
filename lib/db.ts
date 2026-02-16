import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Create Prisma client with PostgreSQL adapter
const createPrismaClient = () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not set");
    // Return a mock client for build time
    return new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://placeholder:placeholder@localhost:5432/placeholder",
        },
      },
    });
  }

  try {
    const pool =
      globalForPrisma.pool ??
      new Pool({
        connectionString: process.env.DATABASE_URL,
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.pool = pool;
    }

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Failed to create Prisma client with adapter:", error);
    // Fallback to regular client
    return new PrismaClient();
  }
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
