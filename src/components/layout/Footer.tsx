import React from 'react';
import { BRAND } from '@/utils/constants';

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-charcoal text-white py-6 sm:py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-xs sm:text-sm text-white/50">
        <p className="text-center sm:text-left">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <div className="flex gap-4 sm:gap-6">
          <a href="#" className="hover:text-white active:text-white/70 transition-colors py-2 px-1 min-h-[44px] flex items-center">Privacy</a>
          <a href="#" className="hover:text-white active:text-white/70 transition-colors py-2 px-1 min-h-[44px] flex items-center">Terms</a>
          <a href="#" className="hover:text-gold active:text-gold/70 transition-colors py-2 px-1 min-h-[44px] flex items-center">{BRAND.instagram}</a>
        </div>
      </div>
    </footer>
  );
};
