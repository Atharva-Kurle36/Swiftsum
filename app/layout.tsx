import './globals.css';
import type { Metadata } from 'next';
import { Cinzel, Outfit, JetBrains_Mono, Rozha_One } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const rozhaOne = Rozha_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rozha',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vedic Ganita Calculator — Indian Knowledge Systems (IKS)',
  description: 'An interactive mathematics application demonstrating classical Vedic arithmetic sutras with step-by-step animations, crosswise digit diagrams, and ancient Indian scientific lore.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${jetbrainsMono.variable} ${rozhaOne.variable}`}
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

