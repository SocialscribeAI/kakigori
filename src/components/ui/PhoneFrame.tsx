import React from 'react';
import Image from 'next/image';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal';
  frameSrc?: string;
  screenClassName?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  frameSrc,
  screenClassName = ''
}) => {
  return (
    <div 
      className={`
        relative aspect-[9/19] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem]
        ${frameSrc ? 'bg-transparent border-0' : 'border-[4px] sm:border-[6px] md:border-[8px] border-gray-900 bg-gray-900'}
        overflow-hidden shadow-xl sm:shadow-2xl phone-glow
        transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
    >
      {/* Screen Content */}
      <div
        className={`relative w-full h-full bg-white overflow-hidden rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem] ${screenClassName}`}
      >
        {children}
      </div>

      {/* Default notch (only when not using a custom image frame) */}
      {!frameSrc && variant === 'default' && (
        <div className="absolute top-0.5 sm:top-1 left-1/2 -translate-x-1/2 h-3 sm:h-4 md:h-5 w-16 sm:w-20 md:w-24 bg-black rounded-b-lg sm:rounded-b-xl z-20" />
      )}

      {/* Optional image-based phone frame overlay */}
      {frameSrc && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Image src={frameSrc} alt="Phone frame" fill className="object-contain" priority={false} />
        </div>
      )}

      {/* Screen reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[2rem]" />
    </div>
  );
};
