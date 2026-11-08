// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const homeDecorCategory = {
  name: 'Home Décor',
  slug: 'home-decor',
  description: 'Beautiful decorative products thoughtfully selected for creating a warm, intentional living space.',
  imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  affiliateLink: 'https://www.amazon.com/s?k=home+decor+aesthetic&tag=aestheticpiece-20',
};

const homeDecorProducts = [
  {
    name: 'Decorative Vases',
    description: 'Sculptural fluted ceramic vessel with a matte chalk finish, designed for displaying dry stems or making a quiet architectural statement on consoles.',
    price: 68.0,
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=decorative+vases+home+decor&tag=aestheticpiece-20',
    featured: true,
  },
  {
    name: 'Tabletop Fountains',
    description: 'Handcrafted natural basalt stone indoor water fountain with gentle cascading stream, bringing calming acoustic ambiance and grounding presence to living rooms.',
    price: 145.0,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=tabletop+water+fountains+indoor&tag=aestheticpiece-20',
    featured: true,
  },
  {
    name: 'Decorative Lamps',
    description: 'Mid-century modern dome table luminaire with warm ambient diffused LED illumination, featuring a weighted metal base and satin cashmere lacquer.',
    price: 110.0,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=decorative+mushroom+table+lamps&tag=aestheticpiece-20',
    featured: true,
  },
  {
    name: 'Wall Decorations',
    description: 'Hand-sculpted textured plaster relief canvas and slim arched brass mantle accent crafted for serene living spaces and entryways.',
    price: 185.0,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=modern+aesthetic+wall+decorations&tag=aestheticpiece-20',
    featured: true,
  },
  {
    name: 'Artificial Flowers',
    description: 'Naturally dried neutral pampas plumes and lifelike silk botanical stems adding soft movement, tactile richness, and organic texture to quiet corners.',
    price: 38.0,
    imageUrl: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=artificial+flowers+dried+botanicals&tag=aestheticpiece-20',
    featured: false,
  },
];

const additionalCategories = [
  {
    name: 'Lighting & Lamps',
    slug: 'lighting-lamps',
    description: 'Atmospheric illumination, sculptural table lamps, and serene ambient fixtures.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=home+decor+lighting+lamps&tag=aestheticpiece-20',
  },
  {
    name: 'Vases & Vessels',
    slug: 'vases-vessels',
    description: 'Artisanal stoneware, fluted ceramics, and organic sculptural vessels.',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=fluted+ceramic+vases+vessels&tag=aestheticpiece-20',
  },
  {
    name: 'Textiles & Throws',
    slug: 'textiles-throws',
    description: 'Washed Belgian linen, tactile cushions, and cozy organic woven fibers.',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=french+linen+pillows+throws&tag=aestheticpiece-20',
  },
  {
    name: 'Mirrors & Wall Decor',
    slug: 'mirrors-wall-decor',
    description: 'Hand-finished brass arches, minimalist mirrors, and textured wall reliefs.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=arched+brass+mirror+wall+decor&tag=aestheticpiece-20',
  },
  {
    name: 'Candles & Scents',
    slug: 'candles-scents',
    description: 'Honed travertine candle vessels, botanical aromas, and soothing soy wax.',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    affiliateLink: 'https://www.amazon.com/s?k=scented+soy+candles+stone+vessels&tag=aestheticpiece-20',
  },
];

async function main() {
  console.log('Seeding database for Aesthetic Piece...');

  // 1. Seed the primary "Home Décor" Category
  const homeDecor = await prisma.category.upsert({
    where: { slug: homeDecorCategory.slug },
    update: homeDecorCategory,
    create: homeDecorCategory,
  });

  // 2. Populate the 5 Home Décor products
  for (const prod of homeDecorProducts) {
    const existing = await prisma.product.findFirst({
      where: { name: prod.name, categoryId: homeDecor.id },
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          ...prod,
          category: homeDecor.name,
          categoryId: homeDecor.id,
        },
      });
    } else {
      await prisma.product.create({
        data: {
          ...prod,
          category: homeDecor.name,
          categoryId: homeDecor.id,
        },
      });
    }
  }

  // 3. Seed additional atmospheric categories
  for (const cat of additionalCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  console.log('Database seeded successfully with Home Décor category and 5 products.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
