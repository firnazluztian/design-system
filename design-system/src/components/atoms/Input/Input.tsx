import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';

const inputVariants = cva(
  'border bg-white px-3 py-2 ring-0 transition-colors placeholder:text-neutral placeholder:text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 hover:border-primary-300 focus:border-primary-300 hover:bg-primary-50',
        error: 'border-danger hover:border-danger-600 focus:border-danger-600 hover:bg-danger-50',
        success: 'border-success hover:border-success-600 focus:border-success-600 hover:bg-success-50',
        ghost: 'border-transparent bg-transparent hover:bg-primary-50 focus:bg-primary-50',
        underline: 'border-0 border-b-2 border-neutral-200 rounded-none bg-transparent hover:border-primary-300 focus:border-primary-300 hover:bg-transparent focus:bg-transparent',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-sm',
        md: 'h-10 px-3 py-2 text-base',
        lg: 'h-12 px-4 py-3 text-lg',
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
        false: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'xl',
      fullWidth: true,
    },
  }
);

export type InputVariant = 'default' | 'error' | 'success' | 'ghost' | 'underline';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type LabelPlacement = 'top' | 'left';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual style variant */
  variant?: InputVariant;
  /** Size of the input */
  size?: InputSize;
  /** Border radius of the input */
  rounded?: InputRounded;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Error message to display below the input */
  errorText?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Label for the input */
  label?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Position of the label relative to the input */
  labelPlacement?: LabelPlacement;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Icon to display on the left side of the input */
  leftIcon?: string;
  /** Icon to display on the right side of the input */
  rightIcon?: string;
  /** Callback function when right icon is clicked */
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    rounded = 'xl', 
    error = false,
    errorText, 
    helperText, 
    label, 
    required = false,
    labelPlacement = 'top',
    fullWidth = false,
    leftIcon, 
    rightIcon,
    onRightIconClick,
    id: providedId,
    ...props 
  }, ref) => {
    const id = providedId || React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const inputField = (
      <div className={cn("relative", !fullWidth && "inline-block")}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral">
            <Icon icon={leftIcon} className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          type="text"
          ref={ref}
          className={cn(
            inputVariants({ variant: error ? 'error' : variant, size, rounded, fullWidth }),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        />
        {rightIcon && (
          <div 
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-neutral",
              onRightIconClick && "cursor-pointer hover:text-primary-600"
            )}
            onClick={onRightIconClick}
            role={onRightIconClick ? "button" : undefined}
            tabIndex={onRightIconClick ? 0 : undefined}
          >
            <Icon icon={rightIcon} className="w-4 h-4" />
          </div>
        )}
      </div>
    );

    const helperOrError = (
      <>
        {error && errorText && (
          <p className="mt-1 text-xs text-danger" id={errorId}>
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-neutral" id={helperId}>
            {helperText}
          </p>
        )}
      </>
    );

    if (labelPlacement === 'left') {
      return (
        <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>
          <div className="flex items-start gap-4">
            {label && (
              <label
                htmlFor={id}
                className="block text-sm text-neutral-900 pt-2"
              >
                {label}
                {required && <span className="text-danger ml-0.5">*</span>}
              </label>
            )}
            <div className={cn("flex-1", !fullWidth && "inline-block")}>
              {inputField}
              {helperOrError}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={cn(fullWidth ? "w-full" : "inline-block", className)}>
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm text-neutral-900"
          >
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        {inputField}
        {helperOrError}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }; 