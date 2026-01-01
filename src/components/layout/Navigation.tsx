'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BRAND } from '@/utils/constants';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-charcoal/90 backdrop-blur-md py-3 md:py-4 shadow-lg' 
          : 'bg-transparent py-4 md:py-6'
        }
      `}
      style={{ 
        paddingTop: `max(env(safe-area-inset-top), ${isScrolled ? '0.75rem' : '1rem'})` 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-lg md:text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity active:scale-95"
        >
          {BRAND.name}
        </Link>
        
        <Link 
          href="#section-contact"
          className="px-4 md:px-5 py-2.5 md:py-2 bg-white text-charcoal text-sm font-medium rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all min-h-[44px] flex items-center justify-center"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
};
