// @ts-ignore
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: any;
};

export const prisma: any =
  globalForPrisma.prisma ??
  (typeof PrismaClient !== 'undefined'
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    : {
        product: { findMany: async () => [], findFirst: async () => null, create: async (d: any) => d },
        category: { findMany: async () => [], findFirst: async () => null, upsert: async (d: any) => d },
        $connect: async () => {},
        $disconnect: async () => {},
      });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

