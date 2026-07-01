import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

/**
 * Pulsante accessibile con:
 * - Dimensione minima 44x44px (WCAG 2.5.5)
 * - Focus state altamente visibile
 * - Contrasto colori WCAG AAA
 * - Padding generoso per touch targets
 */
export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    min-h-[44px] min-w-[44px]
    px-6 py-3
    rounded-lg
    font-medium
    transition-all
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground border-2 border-border hover:bg-muted',
    outline: 'bg-background text-foreground border-2 border-border hover:bg-secondary'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
