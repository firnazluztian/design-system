import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  variantSize?: 'sm' | 'md' | 'lg';
  variant?: 'square' | 'circle';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  disabled = false,
  indeterminate = false,
  variantSize = 'sm',
  variant = 'square',
  color = 'primary',
  className = '',
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const colorClasses = {
    primary: 'checked:bg-primary-600 checked:border-primary-600 hover:border-primary-600',
    secondary: 'checked:bg-secondary-600 checked:border-secondary-600 hover:border-secondary-600',
    success: 'checked:bg-success-600 checked:border-success-600 hover:border-success-600',
    warning: 'checked:bg-warning-600 checked:border-warning-600 hover:border-warning-600',
    error: 'checked:bg-danger-600 checked:border-danger-600 hover:border-danger-600',
  };

  // Error state styling for unselected checkboxes
  const errorClasses = error ? 'border-danger-600 hover:border-danger-700' : '';

  const variantClasses = {
    square: 'rounded',
    circle: 'rounded-full',
  };

  const checkboxClasses = twMerge(
    'border-2 transition-colors duration-200',
    'appearance-none cursor-pointer',
    'checked:bg-no-repeat checked:bg-center',
    variant === 'circle' ? 'checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iNCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=")]' : 'checked:bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgM0w0LjUgOC41TDIgNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=")]',
    variantClasses[variant],
    sizeClasses[variantSize],
    colorClasses[color],
    errorClasses,
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const labelClasses = twMerge(
    'ml-2 text-sm font-medium',
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'text-danger-600'
  );

  return (
    <div className="items-center">
      <div className="flex items-center">
        <input
          type="checkbox"
          className={checkboxClasses}
          disabled={disabled}
          ref={(input) => {
            if (typeof ref === 'function') {
              ref(input);
            } else if (ref) {
              ref.current = input;
            }
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
          {...props}
        />
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
