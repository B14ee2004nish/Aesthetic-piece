# Aesthetic Piece — Curated Living & Style

A minimalist, premium editorial home decor e-commerce catalog web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** powered by **SQLite**.

---

## ✦ Key Features

- **Editorial Home Decor Aesthetic**: Cream backdrop (`#fcfbf9`), deep charcoal typography (`#1a1a1a`), and warm tactile borders (`#e5e5e5`).
- **Typography**: Editorial serif headings (*Playfair Display*) paired with clean functional sans-serif body (*Inter*).
- **Header**: "Aesthetic Piece" logo, tagline *"Curated Living & Style"*, Search modal, Wishlist, and *"Admin & Manage"* link.
- **Hero Section**: High-resolution home decor background with gradient overlay for text legibility, curated headline, and dual CTA buttons (*Explore Products* & *Discover Trending Finds*).
- **Dynamic Category Atmosphere Pages (`app/category/[slug]/page.tsx`)**:
  - Fetches category details (Name and Description) from SQLite database.
  - Displays products belonging to that category in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`).
  - Each product card presents: Product Image, Name, Guide Price, Short Description, and a prominent **"Shop Now"** button linking to the product's `affiliateLink`.
- **Product Detail Pages (`app/product/[id]/page.tsx`)**:
  - Displays high-resolution photography, price guide, curator story, and outbound retailer CTA.
  - Features a **"You May Also Like"** section displaying similar products from the same category.
- **Admin Dashboard (`app/admin/page.tsx`)**:
  - **Manage Categories**: Form to create new categories (Name, Description, `<input type="file" />` direct cover image upload saved to `public/uploads`, optional Amazon link). List to view, Edit, and Delete categories.
  - **Manage Products**: Form to create products with `<select>` category dropdown, `<input type="file" />` image upload (saved directly to `public/uploads`), Title, Price, Description, Affiliate link. List to view, Edit, and Delete products.
  - **Auto-Sync**: Any product added or updated via the Admin panel automatically appears on its assigned category page.
- **Local File Uploads**: Handles `multipart/form-data` uploads in API routes and stores images in `public/uploads/` with unique filenames.

---

## ✦ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14 (App Router)** | Full-stack React framework with server components and streaming |
| **TypeScript** | Strict static typing across schema, components, and API routes |
| **Prisma ORM** | Type-safe database queries and migrations |
| **SQLite** | Zero-configuration relational database file (`prisma/dev.db`) |
| **Tailwind CSS** | Minimalist editorial styling system |
| **Lucide Icons** | Clean vector iconography (`lucide-react`) |

---

## ✦ Quick Start & Terminal Commands

Run the following commands in your terminal to set up the database, push schema, seed data, and launch the development server:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variable for SQLite database
# Create .env with DATABASE_URL:
echo 'DATABASE_URL="file:./dev.db"' > .env

# 3. Generate Prisma client types
npx prisma generate

# 4. Push Prisma schema to your SQLite database
npx prisma db push

# 5. Seed the database with "Home Décor" and the 5 required products
npx tsx prisma/seed.ts

# 6. Start the Next.js development server
npm run dev
```

The application will be live at:
```
http://localhost:3000
```

---

## ✦ Database Schema (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id            String    @id @default(cuid())
  name          String
  category      String
  description   String
  imageUrl      String
  affiliateLink String
  price         Float?    @default(0.0)
  featured      Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relation to Category
  categoryRel   Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  categoryId    String?
}

model Category {
  id            String    @id @default(cuid())
  name          String    @unique
  slug          String    @unique
  description   String?
  imageUrl      String?
  affiliateLink String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  products      Product[]
}
```

---

## ✦ Seeded "Home Décor" Products (`prisma/seed.ts`)

The database seed populates the primary **"Home Décor"** category with the 5 required items:

1. **Decorative Vases** — Sculptural fluted ceramic vessel with a matte chalk finish ($68.00).
2. **Tabletop Fountains** — Handcrafted natural basalt stone indoor water fountain with gentle cascading stream ($145.00).
3. **Decorative Lamps** — Mid-century modern dome table luminaire with warm ambient diffused LED illumination ($110.00).
4. **Wall Decorations** — Hand-sculpted textured plaster relief canvas and slim arched brass mantle accent ($185.00).
5. **Artificial Flowers** — Naturally dried neutral pampas plumes and lifelike silk botanical stems ($38.00).

---

## ✦ API Endpoints

### Products (`/api/products`)
- `GET /api/products`: Retrieve products with optional filters (`?category=slug-or-name`, `?featured=true`, `?search=query`).
- `POST /api/products`: Create a product. Supports `multipart/form-data` with direct image file upload saved to `public/uploads/` and links to `categoryId`.
- `PATCH /api/products`: Update an existing product (Name, Price, Category, Affiliate link, Description).
- `DELETE /api/products?id=...`: Delete a product from the database.

### Categories (`/api/categories`)
- `GET /api/categories`: Retrieve all categories.
- `POST /api/categories`: Create a new category. Supports `multipart/form-data` for category cover image uploads to `public/uploads/`.
- `PATCH /api/categories`: Update category details or Amazon affiliate link.
- `DELETE /api/categories?id=...`: Delete a category from the database.
