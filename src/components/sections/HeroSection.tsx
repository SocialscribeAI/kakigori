'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
        className="relative z-20 text-center max-w-5xl mx-auto px-3"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center rounded-full border border-white/15 bg-black/72 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-white uppercase mb-5 sm:mb-6 backdrop-blur-md shadow-[0_14px_38px_rgba(0,0,0,0.5)]"
        >
          Premium Event Catering
        </motion.p>
        
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-black/76 px-4 py-5 sm:px-8 sm:py-7 backdrop-blur-lg shadow-[0_36px_100px_rgba(0,0,0,0.55)]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-5 leading-[1.05] px-2 [text-shadow:0_14px_34px_rgba(0,0,0,0.5)]">
            {BRAND.tagline}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-white/95 mb-1 max-w-2xl mx-auto px-2 leading-relaxed [text-shadow:0_10px_24px_rgba(0,0,0,0.35)]">
            Elevate your event with an unforgettable Japanese dessert experience. 
            Handcrafted live, served with elegance.
          </p>
        </div>
        
        
      </motion.div>
    </section>
  );
};
