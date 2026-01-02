'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BENEFITS } from '@/utils/constants';

export const BenefitsSection = () => {
  return (
    <section 
      id="section-benefits" 
      className="relative min-h-[120vh] sm:min-h-[200vh] w-full flex items-start px-4 sm:px-6 md:px-2 py-8 sm:py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          {/* Left side - reserved for the floating flavor visual */}
          <div className="hidden lg:block" />
          
          {/* Right side - Benefits content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-md tracking-[0.15em] sm:tracking-[0.2em] text-red-500 uppercase"
              >
                The Experience
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-2 leading-tight">
                Pure. Fluffy. <br />Unforgettable.
              </h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {BENEFITS.map((benefit, index) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-start gap-3 sm:gap-4 group p-3 sm:p-0 rounded-lg sm:rounded-none active:bg-black/5 sm:active:bg-transparent transition-colors"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 group-hover:scale-150 transition-transform flex-shrink-0" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-black">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-black/70 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
