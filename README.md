# Aesthetic Piece — Curated Living & Style

A minimalist, premium editorial home decor web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** powered by **SQLite**.

---

## ✦ Key Features

- **Editorial Home Decor Aesthetic**: Cream backdrop (`#fcfbf9`), deep charcoal typography (`#1a1a1a`), and warm tactile borders (`#e5e5e5`).
- **Typography**: Editorial serif headings (*Playfair Display*) paired with clean functional sans-serif body (*Inter*).
- **Hero Atmosphere**: Warm home decor backdrop with soft gradients, curated subheadlines, and dual-action buttons (*Explore Products* & *Discover Trending Finds*).
- **Category Browsing**: Dynamic atmosphere routes (`app/category/[slug]/page.tsx`) with instant navigation.
- **Responsive 1/2/3 Column Grid**: Seamless layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`) showcasing curated decor items with affiliate outbound links and wishlist toggling.
- **Admin Dashboard**: Full product ingestion dashboard (`app/admin/page.tsx`) with image preview, category assignment, price guides, and featured promotion.
- **Database Architecture**: SQLite with Prisma schema and pre-configured seed script with the 12 home decor essentials.
- **Next.js 14 API Routes**: RESTful `/api/products` endpoint supporting `GET` (with category/featured filters) and `POST` for ingestion.

---

## ✦ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14 (App Router)** | Full-stack React framework with server components and streaming |
| **TypeScript** | Strict static typing across schema, components, and API routes |
| **Prisma ORM** | Type-safe database queries and migrations |
| **SQLite** | Zero-configuration relational database file (`prisma/dev.db`) |
| **Tailwind CSS** | Minimalist editorial styling system |
| **Lucide Icons** | Clean vector iconography |

---

## ✦ Quick Start & Terminal Commands

Run the following commands in your terminal to set up the database and launch the development server:

```bash
# 1. Install all dependencies
npm install

# 2. Configure environment variable for SQLite database
# Create a .env file with:
# DATABASE_URL="file:./dev.db"
echo 'DATABASE_URL="file:./dev.db"' > .env

# 3. Generate Prisma client types
npx prisma generate

# 4. Push Prisma schema to your SQLite database
npx prisma db push

# 5. Seed the database with the 12 curated home decor items
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

  categoryRel   Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  categoryId    String?
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  imageUrl    String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  products    Product[]
}
```

---

## ✦ Seeded Products (12 Curated Items)

1. **Zen Basalt Stone Fountain** — Handcrafted basalt stone water feature with soothing acoustic stream.
2. **Fluted Ceramic Vase** — Sculptural ribbed chalk vessel for dry florals or console styling.
3. **Dome Mushroom Lamp** — Mid-century ambient dome table luminaire in spun cashmere finish.
4. **Boho Pampas Grass** — Naturally dried fluffy plumes for organic texture and movement.
5. **Arched Brass Mirror** — Hand-finished slim brass arch reflecting natural light.
6. **Linen Cushions** — Washed French flax linen throw pillows with raw frayed fringe.
7. **Ribbed Planter** — Vertical grooved stoneware with internal drainage saucer.
8. **Plaster Wall Art** — Textured impasto plaster relief canvas in warm off-white.
9. **Travertine Candle** — Honed heavy beige travertine vessel infused with santal and amber soy wax.
10. **Flax Linen Sheets** — Breathable stonewashed pure European flax bedding set.
11. **Frosted Window Clings** — Non-adhesive static cling privacy glass film for luminous diffused glow.
12. **Travertine Tray** — Carved raw natural travertine vanity organizer with beveled edges.

---

## ✦ API Endpoints

### `GET /api/products`
Retrieves products from SQLite.
- `?category=<category-name-or-slug>`
- `?featured=true`
- `?search=<term>`

### `POST /api/products`
Creates a new product record in the SQLite database.
**Body:**
```json
{
  "name": "Travertine Bookends",
  "category": "Decor Accents",
  "description": "Solid honed beige travertine sphere bookends.",
  "imageUrl": "https://images.unsplash.com/...",
  "affiliateLink": "https://shop.example.com/item",
  "price": 68.0,
  "featured": true
}
```

---

## ✦ Project Structure

```
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard with product ingestion
│   ├── api/
│   │   └── products/
│   │       └── route.ts          # REST API endpoints (GET, POST)
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic category atmosphere pages
│   ├── globals.css               # Global editorial Tailwind CSS styling
│   ├── layout.tsx                # Root layout with fonts & Header/Footer
│   └── page.tsx                  # Curated homepage (Hero, Categories, Products)
├── components/
│   ├── AdminProductForm.tsx      # Product ingestion form with validation
│   ├── CategoryGrid.tsx          # Responsive atmosphere categories
│   ├── Footer.tsx                # Editorial minimalist footer
│   ├── Header.tsx                # Brand header, tagline, search, wishlist & admin link
│   ├── Hero.tsx                  # Hero section with decor backdrop & gradient
│   ├── ProductCard.tsx           # Individual product card with affiliate CTA
│   └── ProductGrid.tsx           # 1/2/3 responsive grid with filters
├── lib/
│   └── prisma.ts                 # Prisma Client singleton
├── prisma/
│   ├── schema.prisma             # SQLite schema definition
│   └── seed.ts                   # Seed script with 12 home decor items
└── README.md                     # Documentation & setup instructions
```
