import './globals.css';
import type { Metadata, Viewport } from 'next';
import SmoothScroll from '@/components/common/SmoothScroll';
import MotionInit from '@/components/common/MotionInit';

export const metadata: Metadata = {
  title: 'Swiftsum · Where Zero Was Born — Ancient Indian Mathematics',
  description:
    "A scrollytelling descent through 2,000+ years of ancient Indian mathematics — from knotted altar ropes to the Kerala school's infinite series. The zero you read, the decimals you compute, the sine you plot: it all began here.",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-black text-[#F5F0E6] antialiased selection:bg-[#E5A93C] selection:text-black">
        <MotionInit />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
