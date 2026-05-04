import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  checked = false,
  disabled = false,
  onChange,
  size = 'md',
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  };

  const dotSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <label
      className={clsx(
        'inline-flex items-center cursor-pointer',
        disabled && 'opacity-60 cursor-not-allowed'
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={clsx(
            'block rounded-full transition-colors duration-200 ease-in-out',
            sizeClasses[size],
            checked
              ? 'bg-primary'
              : 'bg-gray-200 dark:bg-gray-700',
            disabled && 'cursor-not-allowed'
          )}
        />
        <div
          className={clsx(
            'absolute rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
            dotSizeClasses[size],
            checked
              ? size === 'sm'
                ? 'translate-x-4'
                : size === 'md'
                ? 'translate-x-5'
                : 'translate-x-7'
              : 'translate-x-0.5',
            'top-1/2 -translate-y-1/2'
          )}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
});

Switch.displayName = 'Switch'; 