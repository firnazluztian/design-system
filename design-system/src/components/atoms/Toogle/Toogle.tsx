import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const toggleVariants = cva(
  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-neutral-200 data-[state=checked]:bg-primary focus-visible:ring-primary',
        success: 'bg-neutral-200 data-[state=checked]:bg-success focus-visible:ring-success',
        warning: 'bg-neutral-200 data-[state=checked]:bg-warning focus-visible:ring-warning',
        danger: 'bg-neutral-200 data-[state=checked]:bg-danger focus-visible:ring-danger',
      },
      size: {
        sm: 'h-4 w-7',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ToggleVariant = 'primary' | 'success' | 'warning' | 'danger';
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** Whether the toggle is checked */
  checked?: boolean;
  /** Callback when toggle state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Visual style variant of the toggle */
  variant?: ToggleVariant;
  /** Size of the toggle */
  size?: ToggleSize;
  /** Label for the toggle */
  label?: string;
  /** Whether the toggle is required */
  required?: boolean;
  /** Helper text to display below the toggle */
  helperText?: string;
  /** Error message to display below the toggle */
  errorText?: string;
  /** Whether the toggle is in an error state */
  error?: boolean;
  /** Name attribute for form submission and React Hook Form */
  name?: string;
}

const Toggle = forwardRef<HTMLDivElement | HTMLInputElement, ToggleProps>(
  ({
    checked = false,
    onCheckedChange,
    variant = 'primary',
    size = 'md',
    label,
    required = false,
    helperText,
    errorText,
    error = false,
    className,
    name,
    ...props
  }, ref) => {
    const id = React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Expose both wrapper div (for backward compatibility) and hidden input (for React Hook Form)
    useImperativeHandle(ref, () => {
      // Prefer input element for React Hook Form compatibility
      return (hiddenInputRef.current || wrapperRef.current) as HTMLDivElement | HTMLInputElement;
    }, []);

    // Sync hidden input when checked changes
    useEffect(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.checked = checked;
        // Trigger change event for React Hook Form
        const event = new Event('change', { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);
      }
    }, [checked]);

    const handleToggle = () => {
      const newChecked = !checked;
      onCheckedChange?.(newChecked);
      
      // Update hidden input for React Hook Form
      if (hiddenInputRef.current) {
        hiddenInputRef.current.checked = newChecked;
        const event = new Event('change', { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);
      }
    };

    return (
      <div ref={wrapperRef} className="inline-flex flex-col gap-1.5">
        {/* Hidden input for React Hook Form */}
        <input
          type="checkbox"
          ref={hiddenInputRef}
          name={name}
          checked={checked}
          onChange={() => {}} // Controlled by handleToggle
          className="sr-only"
          aria-hidden="true"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            onClick={handleToggle}
            ref={buttonRef}
            className={cn(toggleVariants({ variant: error ? 'danger' : variant, size }), className)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            aria-invalid={error}
            aria-required={required}
            {...props}
          >
            <span
              data-state={checked ? 'checked' : 'unchecked'}
              className={cn(
                thumbVariants({ size }),
                checked ? 'translate-x-5' : 'translate-x-1'
              )}
            />
          </button>
          {label && (
            <label
              htmlFor={id}
              className="text-sm text-neutral-900"
            >
              {label}
              {required && <span className="text-danger ml-0.5">*</span>}
            </label>
          )}
        </div>
        {error && errorText && (
          <p className="text-xs text-danger" id={errorId}>
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-neutral" id={helperId}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
