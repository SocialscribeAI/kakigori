'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BENEFITS } from '@/utils/constants';

export const BenefitsSection = () => {
  return (
    <section 
      id="section-benefits" 
      className="relative min-h-[200vh] w-full flex items-start px-6 md:px-2 py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - reserved for the floating flavor visual */}
          <div className="hidden lg:block" />
          
          {/* Right side - Benefits content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-md tracking-[0.2em] text-red-500 uppercase"
              >
                The Experience
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-black mt-2">
                Pure. Fluffy. <br />Unforgettable.
              </h2>
            </div>
            
            <div className="space-y-6">
              {BENEFITS.map((benefit, index) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 group-hover:scale-150 transition-transform" />
                  <div>
                    <h3 className="text-lg font-semibold text-black">{benefit.title}</h3>
                    <p className="text-black/70">{benefit.description}</p>
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
