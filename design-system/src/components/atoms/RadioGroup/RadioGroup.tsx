import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Radio } from '../Radio/Radio';

const radioGroupVariants = cva(
  'flex flex-col',
  {
    variants: {
      layout: {
        vertical: 'flex-col',
        horizontal: 'flex-row flex-wrap',
        grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      },
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      layout: 'vertical',
      size: 'md',
    },
  }
);

export type RadioGroupLayout = 'vertical' | 'horizontal' | 'grid';
export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupLabelPlacement = 'top' | 'left';

export interface RadioOption {
  value: string;
  label: string | React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Array of radio options */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Default selected value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Layout direction of radio buttons */
  layout?: RadioGroupLayout;
  /** Size of the radio group */
  size?: RadioGroupSize;
  /** Whether the group is in an error state */
  error?: boolean;
  /** Error message to display below the group */
  errorText?: string;
  /** Helper text to display below the group */
  helperText?: string;
  /** Label for the radio group */
  label?: string;
  /** Whether the group is required */
  required?: boolean;
  /** Position of the label relative to the group */
  labelPlacement?: RadioGroupLabelPlacement;
  /** Whether the group should take full width */
  fullWidth?: boolean;
  /** Whether all radio buttons are disabled */
  disabled?: boolean;
  /** Name attribute for the radio group */
  name?: string;
  /** Custom gap between options (overrides size-based gap) */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color theme for radio buttons */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Size variant for individual radio buttons */
  radioSize?: 'sm' | 'md' | 'lg';
}

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ 
    className, 
    options = [],
    value,
    defaultValue,
    onChange,
    layout = 'vertical',
    size = 'md',
    error = false,
    errorText, 
    helperText, 
    label, 
    required = false,
    labelPlacement = 'top',
    fullWidth = false,
    disabled = false,
    name: providedName,
    gap,
    color = 'primary',
    radioSize = 'sm',
    id: providedId,
    ...props 
  }, ref) => {
    const id = providedId || React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const groupId = `${id}-group`;
    const name = providedName || `radio-group-${id}`;

    // Use controlled or uncontrolled value
    const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
    };

    // Get gap classes
    const getGapClass = (gapValue?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
      if (gapValue === 'none') return 'gap-0';
      if (gapValue === 'xs') return 'gap-1';
      if (gapValue === 'sm') return 'gap-2';
      if (gapValue === 'md') return 'gap-3';
      if (gapValue === 'lg') return 'gap-4';
      if (gapValue === 'xl') return 'gap-6';
      return null; // Use size-based gap
    };

    const optionsGapClass = getGapClass(gap);

    const radioGroup = (
      <div className={cn("relative", !fullWidth && "inline-block")}>
        <fieldset
          ref={ref}
          id={groupId}
          className={cn(
            radioGroupVariants({ layout, size }),
            optionsGapClass,
            className
          )}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              label={option.label}
              checked={currentValue === option.value}
              onChange={() => handleChange(option.value)}
              disabled={disabled || option.disabled}
              name={name}
              value={option.value}
              color={error ? 'error' : color}
              error={error ? ' ' : undefined}
              variantSize={radioSize}
            />
          ))}
        </fieldset>
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
                htmlFor={groupId}
                className="block text-sm text-neutral-900 pt-2"
              >
                {label}
                {required && <span className="text-danger ml-0.5">*</span>}
              </label>
            )}
            <div className={cn("flex-1", !fullWidth && "inline-block")}>
              {radioGroup}
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
            htmlFor={groupId}
            className="mb-1.5 block text-sm text-neutral-900"
          >
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        {radioGroup}
        {helperOrError}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };