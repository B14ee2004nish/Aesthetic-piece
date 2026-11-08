// Prisma client type declarations for local development and build
declare module '@prisma/client' {
  export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    imageUrl: string;
    affiliateLink: string;
    price: number | null;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId?: string | null;
  }

  export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }

  export class PrismaClient {
    constructor(options?: any);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    product: {
      findMany(args?: any): Promise<Product[]>;
      findFirst(args?: any): Promise<Product | null>;
      findUnique(args?: any): Promise<Product | null>;
      create(args: any): Promise<Product>;
      upsert(args: any): Promise<Product>;
      delete(args: any): Promise<Product>;
    };
    category: {
      findMany(args?: any): Promise<Category[]>;
      findFirst(args?: any): Promise<Category | null>;
      findUnique(args?: any): Promise<Category | null>;
      create(args: any): Promise<Category>;
      upsert(args: any): Promise<Category>;
    };
    [key: string]: any;
  }
}
