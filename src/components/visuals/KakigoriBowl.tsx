'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface KakigoriBowlProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const KakigoriBowl: React.FC<KakigoriBowlProps> = ({ src, alt, className = '', priority = false }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-2xl"
          priority={priority}
        />
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/20 blur-xl rounded-full" />
      </motion.div>
    </div>
  );
};
