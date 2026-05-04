import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const textareaVariants = cva(
  'border bg-white px-3 py-2 ring-0 transition-colors placeholder:text-neutral placeholder:text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
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
        sm: 'min-h-[60px] px-2 py-1 text-sm',
        md: 'min-h-[80px] px-3 py-2 text-base',
        lg: 'min-h-[100px] px-4 py-3 text-lg',
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
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'xl',
      fullWidth: true,
      resize: 'vertical',
    },
  }
);

export type TextareaVariant = 'default' | 'error' | 'success' | 'ghost' | 'underline';
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';
export type TextareaLabelPlacement = 'top' | 'left';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Visual style variant */
  variant?: TextareaVariant;
  /** Size of the textarea */
  size?: TextareaSize;
  /** Border radius of the textarea */
  rounded?: TextareaRounded;
  /** Whether the textarea is in an error state */
  error?: boolean;
  /** Error message to display below the textarea */
  errorText?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
  /** Label for the textarea */
  label?: string;
  /** Whether the textarea is required */
  required?: boolean;
  /** Position of the label relative to the textarea */
  labelPlacement?: TextareaLabelPlacement;
  /** Whether the textarea should take full width */
  fullWidth?: boolean;
  /** Resize behavior of the textarea */
  resize?: TextareaResize;
  /** Character count display */
  showCharCount?: boolean;
  /** Maximum character count */
  maxLength?: number;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
    resize = 'vertical',
    showCharCount = false,
    maxLength,
    minRows = 3,
    maxRows = 10,
    id: providedId,
    value,
    ...props 
  }, ref) => {
    const id = providedId || React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const charCountId = `${id}-char-count`;

    const currentLength = typeof value === 'string' ? value.length : 0;
    const isOverLimit = maxLength && currentLength > maxLength;

    const textareaField = (
      <div className={cn("relative", !fullWidth && "inline-block")}>
        <textarea
          id={id}
          ref={ref}
          rows={minRows}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ 
              variant: error ? 'error' : variant, 
              size, 
              rounded, 
              fullWidth,
              resize: resize === 'none' ? 'none' : resize
            }),
            className
          )}
          aria-describedby={cn(
            error ? errorId : helperText ? helperId : undefined,
            showCharCount ? charCountId : undefined
          )}
          aria-invalid={error}
          aria-required={required}
          style={{
            minHeight: `${minRows * 1.5}em`,
            maxHeight: `${maxRows * 1.5}em`,
          }}
          value={value}
          {...props}
        />
        {showCharCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-neutral-500 bg-white px-1 rounded">
            <span id={charCountId} className={isOverLimit ? 'text-danger' : ''}>
              {currentLength}/{maxLength}
            </span>
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
        {showCharCount && maxLength && !error && !helperText && (
          <p className="mt-1 text-xs text-neutral" id={charCountId}>
            {currentLength} of {maxLength} characters
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
              {textareaField}
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
        {textareaField}
        {helperOrError}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };