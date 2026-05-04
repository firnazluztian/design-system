import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string | React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  error?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  variantSize?: 'sm' | 'md' | 'lg';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  checked = false,
  disabled = false,
  onChange,
  name,
  value,
  error,
  color = 'primary',
  variantSize = 'sm',
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  // Outer control size + inner dot size (pixel-perfect, no aliasing)
  const sizeClasses: Record<NonNullable<RadioProps['variantSize']>, string> = {
    sm: 'h-4 w-4 before:h-2 before:w-2',
    md: 'h-5 w-5 before:h-2.5 before:w-2.5',
    lg: 'h-6 w-6 before:h-3 before:w-3',
  };

  // Use text-* to set currentColor for the dot + border when checked
  const colorClasses: Record<NonNullable<RadioProps['color']>, string> = {
    primary: 'text-primary-600 checked:border-primary-600 hover:border-primary-600',
    secondary: 'text-secondary-600 checked:border-secondary-600 hover:border-secondary-600',
    success: 'text-success-600 checked:border-success-600 hover:border-success-600',
    warning: 'text-warning-600 checked:border-warning-600 hover:border-warning-600',
    error: 'text-danger-600 checked:border-danger-600 hover:border-danger-600',
  };

  return (
    <label
      className={twMerge(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        disabled && 'opacity-60 cursor-not-allowed'
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        ref={ref}
        {...props}
        className={twMerge(
          // Base control
          'appearance-none rounded-full border-2 bg-white shrink-0',
          // Center a pseudo-element dot
          'grid place-items-center',
          // Inner dot (smooth, perfectly centered)
          "before:content-[''] before:rounded-full before:bg-current before:scale-0",
          'before:transition-transform before:duration-150 before:ease-out',
          'checked:before:scale-100',
          // Sizes
          sizeClasses[variantSize],
          // Colors (currentColor + checked border color)
          colorClasses[color],
          checked ? '' : (error ? 'border-danger-600' : 'border-gray-300'),
          !checked && error && 'hover:border-danger-700',
          // Focus only when keyboard navigating (prevents extra “ring” on click)
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current'
        )}
        // currentColor is set via text-* classes above
      />

      {label && (
        <span
          className={twMerge(
            'text-sm font-medium leading-none',
            error && 'text-danger-600'
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';
