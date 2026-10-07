import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0A08] text-[#F5F0E6] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.3em] mb-4">404 · पृष्ठम् न लब्धम्</p>
      <h1 className="font-display text-4xl sm:text-6xl text-[#F5F0E6] font-medium tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="font-sans text-sm sm:text-base text-[#A8A090] max-w-md mb-8">
        The coordinate or treatise you are seeking does not exist in this archive.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full border border-[#E5A93C]/40 bg-[#14120D] text-[#E5A93C] font-mono text-xs uppercase tracking-widest hover:bg-[#E5A93C] hover:text-[#0B0A08] transition-colors"
      >
        Return to Sanctuary
      </Link>
    </div>
  );
}
