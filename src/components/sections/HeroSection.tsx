'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { BRAND } from '@/utils/constants';

export const HeroSection = () => {
  return (
    <section 
      id="section-hero" 
      className="relative min-h-screen w-full flex flex-col justify-start items-center px-4 sm:px-6 pt-24 sm:pt-32 md:pt-12"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] text-white/80 uppercase mb-3 sm:mb-4"
        >
          Premium Event Catering
        </motion.p>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray mb-4 sm:mb-6 leading-tight px-2">
          {BRAND.tagline}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray/80 mb-8 sm:mb-10 max-w-xl mx-auto px-2 leading-relaxed">
          Elevate your event with an unforgettable Japanese dessert experience. 
          Handcrafted live, served with elegance.
        </p>
        
        
      </motion.div>
    </section>
  );
};
