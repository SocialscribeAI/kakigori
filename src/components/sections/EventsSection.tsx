'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const EventsSection = () => {
  return (
    <section
      id="section-events"
      className="relative min-h-[150vh] sm:min-h-[250vh] w-full flex items-start px-4 sm:px-6 md:px-2 py-6 sm:py-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-start">
          {/* Left: Events content (text) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-green-400 uppercase"
            >
              Perfect For
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 leading-tight">
              Every Special Moment
            </h2>
            <p className="text-base sm:text-lg text-white max-w-prose leading-relaxed">
              From intimate celebrations to grand corporate galas—we bring the experience to you.
            </p>
          </motion.div>

          {/* Right: reserved for floating visual (hidden on lg) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};
