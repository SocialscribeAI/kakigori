import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 py-20 ${className}`}>
      {children}
    </section>
  );
};
