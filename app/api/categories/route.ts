import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const PREDEFINED_CATEGORIES = [
  { id: 'cat_1', name: 'Lighting & Lamps', slug: 'lighting-lamps' },
  { id: 'cat_2', name: 'Vases & Vessels', slug: 'vases-vessels' },
  { id: 'cat_3', name: 'Textiles & Throws', slug: 'textiles-throws' },
  { id: 'cat_4', name: 'Mirrors & Wall Decor', slug: 'mirrors-wall-decor' },
  { id: 'cat_5', name: 'Candles & Scents', slug: 'candles-scents' },
  { id: 'cat_6', name: 'Decor Accents', slug: 'decor-accents' },
  { id: 'cat_7', name: 'Planters & Pots', slug: 'planters-pots' },
  { id: 'cat_8', name: 'Art & Sculptures', slug: 'art-sculptures' },
  { id: 'cat_9', name: 'Bedding & Linens', slug: 'bedding-linens' },
  { id: 'cat_10', name: 'Home Essentials', slug: 'home-essentials' },
  { id: 'cat_11', name: 'Trays & Catchalls', slug: 'trays-catchalls' },
];

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    if (categories && categories.length > 0) {
      return NextResponse.json({
        success: true,
        data: categories,
      });
    }

    return NextResponse.json({
      success: true,
      data: PREDEFINED_CATEGORIES,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: PREDEFINED_CATEGORIES,
    });
  }
}
