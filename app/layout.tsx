import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono, Rozha_One } from 'next/font/google';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-jakarta',
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
  title: 'SwiftSum — Vedic Ganita & Indian Knowledge Systems (IKS)',
  description: 'An interactive computational workspace demonstrating classical Vedic arithmetic algorithms with animated vector ray diagrams, parallel coordinate matrices, and verified proofs aligned with NEP 2020.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} ${jetbrainsMono.variable} ${rozhaOne.variable}`}
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
