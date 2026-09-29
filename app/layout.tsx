import './globals.css';
import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Noto_Serif, Noto_Serif_Devanagari } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-noto',
  display: 'swap',
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Indian Knowledge Systems (IKS) — SwiftSum Vedic Ganita',
  description: 'A premium academic presentation of Indian Knowledge Systems: Vedic mathematics, Nalanda scholarly heritage, and NEP 2020 aligned computation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${notoSerif.variable} ${notoDevanagari.variable}`}
    >
      <body className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow z-10 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
