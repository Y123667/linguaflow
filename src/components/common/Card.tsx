import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';

    const variants = {
      default: 'bg-white shadow-lg shadow-dark-900/5 border border-dark-200/50',
      glass: 'glass',
      gradient: 'bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-200/30',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-8',
    };

    const hoverStyles = hover ? 'card-hover cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], paddings[padding], hoverStyles, className))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
