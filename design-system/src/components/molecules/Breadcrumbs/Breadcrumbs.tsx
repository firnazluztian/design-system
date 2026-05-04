import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';

const breadcrumbsVariants = cva('flex items-center text-sm', {
  variants: {
    variant: {
      default: 'text-neutral-600',
      light: 'text-neutral-400',
      dark: 'text-neutral-800',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type BreadcrumbsVariant = 'default' | 'light' | 'dark';
export type BreadcrumbsSize = 'sm' | 'md' | 'lg';

export interface BreadcrumbItem {
  /** Label to display */
  label: string;
  /** URL to navigate to */
  href?: string;
  /** Icon to display before the label */
  icon?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof breadcrumbsVariants> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator between items */
  separator?: React.ReactNode;
  /** Whether the last item should be active */
  activeLastItem?: boolean;
  /** Size of the breadcrumbs */
  size?: BreadcrumbsSize;
  variant?: BreadcrumbsVariant;
}

const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      items,
      separator = <Icon icon="mdi:slash-forward" className="h-4 w-4 flex-shrink-0" />,
      activeLastItem = true,
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={cn(breadcrumbsVariants({ variant, size }), className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isActive = isLast && activeLastItem;

            return (
              <li
                key={item.label}
                className={cn(
                  'flex items-center gap-1.5',
                  isActive && 'text-primary font-medium'
                )}
              >
                {item.icon && (
                  <Icon 
                    icon={item.icon} 
                    className={cn(
                      'flex-shrink-0',
                      size === 'sm' && 'h-3.5 w-3.5',
                      size === 'md' && 'h-4 w-4',
                      size === 'lg' && 'h-5 w-5'
                    )} 
                  />
                )}
                {item.href && !isActive ? (
                  <a
                    href={item.href}
                    className={cn(
                      'transition-colors duration-200',
                      'hover:text-primary hover:underline focus:outline-none',
                      'focus-visible:text-primary focus-visible:underline',
                      'active:text-primary-600'
                    )}
                  >
                    <span className="truncate max-w-[200px] inline-block align-bottom">
                      {item.label}
                    </span>
                  </a>
                ) : (
                  <span className={cn(
                    'truncate max-w-[200px] inline-block',
                    isActive && 'text-primary'
                  )}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className={cn(
                    'text-neutral-400 flex-shrink-0',
                    size === 'sm' && 'scale-90',
                    size === 'lg' && 'scale-110'
                  )}>
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export { Breadcrumbs }; 