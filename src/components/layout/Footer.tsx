import React from 'react';
import { BRAND } from '@/utils/constants';

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-charcoal text-white py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-gold transition-colors">{BRAND.instagram}</a>
        </div>
      </div>
    </footer>
  );
};
