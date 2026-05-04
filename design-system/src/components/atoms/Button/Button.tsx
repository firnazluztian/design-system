import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md active:shadow-none',
        secondary: 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm hover:shadow-md active:shadow-none',
        outline: 'border border-neutral-300 text-primary hover:bg-primary-50 active:bg-primary-100 hover:border-primary',
        'outline-primary': 'border border-primary-600 text-primary-600 hover:bg-primary-50',
        'outline-secondary': 'border border-secondary-600 text-secondary-600 hover:bg-secondary-50',
        'outline-success': 'border border-success-600 text-success-600 hover:bg-success-50',
        'outline-warning': 'border border-warning-600 text-warning-600 hover:bg-warning-50',
        'outline-danger': 'border border-danger-600 text-danger-600 hover:bg-danger-50',
        ghost: 'text-primary hover:bg-primary-50 active:bg-primary-100',
        link: 'text-primary hover:underline p-0',
        success: 'bg-success text-white hover:bg-success-600 active:bg-success-700 shadow-sm hover:shadow-md active:shadow-none',
        warning: 'bg-warning text-white hover:bg-warning-600 active:bg-warning-700 shadow-sm hover:shadow-md active:shadow-none',
        danger: 'bg-danger text-white hover:bg-danger-600 active:bg-danger-700 shadow-sm hover:shadow-md active:shadow-none',
      },
      size: {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-1.5',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-5 py-2.5',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
      isIconOnly: {
        true: 'p-2 aspect-square',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'none',
      fullWidth: false,
      isIconOnly: false,
    },
  }
);

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success' 
  | 'outline-warning' 
  | 'outline-danger' 
  | 'ghost' 
  | 'link' 
  | 'success' 
  | 'warning' 
  | 'danger'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  isIconOnly?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    rounded = 'xl', 
    fullWidth = false, 
    isLoading = false, 
    leftIcon, 
    rightIcon,
    isIconOnly = false,
    children, 
    ...props 
  }, ref) => {
    const hasIcon = Boolean(leftIcon || rightIcon);
    const isIconButton = isIconOnly || (hasIcon && !children);

    return (
      <button
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            rounded: isIconButton ? 'full' : rounded, 
            fullWidth, 
            isIconOnly: isIconButton,
            className 
          })
        )}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full" />
        )}
        {leftIcon && !isLoading && <Icon icon={leftIcon} className="w-4 h-4" inline />}
        {children && <span>{children}</span>}
        {rightIcon && !isLoading && <Icon icon={rightIcon} className="w-4 h-4" inline />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

export { buttonVariants };
