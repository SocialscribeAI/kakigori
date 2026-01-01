import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  href,
  ...props 
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-full font-medium tracking-wide
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold/50
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: "bg-charcoal text-white hover:bg-black hover:scale-105 hover:shadow-lg active:scale-100",
    secondary: "bg-white text-charcoal hover:bg-gray-50 hover:scale-105 hover:shadow-lg active:scale-100 border border-gray-200",
    outline: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
    ghost: "text-charcoal hover:bg-black/5"
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};
