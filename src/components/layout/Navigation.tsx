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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-charcoal/90 backdrop-blur-md py-4 shadow-lg' 
          : 'bg-transparent py-6'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          {BRAND.name}
        </Link>
        
        <Link 
          href="#section-contact"
          className="px-5 py-2 bg-white text-charcoal text-sm font-medium rounded-full hover:bg-white/90 hover:scale-105 transition-all"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
};
