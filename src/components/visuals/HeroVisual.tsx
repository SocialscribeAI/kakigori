'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KakigoriBowl } from './KakigoriBowl';
import { ASSETS } from '@/utils/constants';

export const HeroVisual = () => {
  // This component will likely need to be connected to a global scroll state 
  // or use GSAP ScrollTrigger to pin and animate based on section positions.
  // For now, we'll set up the structure.

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
      <div className="relative w-[500px] h-[500px]">
        {/* 
          Logic to switch flavors based on scroll position will go here.
          For now, showing the first flavor.
        */}
        <KakigoriBowl 
          src={ASSETS.flavors[0]} 
          alt="Kakigori Flavor 1" 
          priority
        />
      </div>
    </div>
  );
};
