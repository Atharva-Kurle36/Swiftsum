import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

// Fonts load via the Google Fonts @import in globals.css with local serif
// fallbacks, so production builds never depend on font-network access.
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
    <html lang="en">
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
