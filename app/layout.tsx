import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Aesthetic Piece - Curated Living & Style',
  description:
    'Discover beautiful things that make life more aesthetic. Curated home decor, artisanal ceramics, ambient lighting, and timeless everyday essentials.',
  openGraph: {
    title: 'Aesthetic Piece - Curated Living & Style',
    description:
      'Discover beautiful things that make life more aesthetic. Curated home decor and everyday essentials.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fcfbf9] text-[#1a1a1a] min-h-screen flex flex-col antialiased selection:bg-[#1a1a1a] selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
