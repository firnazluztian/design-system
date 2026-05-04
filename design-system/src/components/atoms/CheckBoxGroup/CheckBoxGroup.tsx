import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Checkbox } from '../CheckBox/CheckBox';

const checkboxGroupVariants = cva(
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

export type CheckBoxGroupLayout = 'vertical' | 'horizontal' | 'grid';
export type CheckBoxGroupSize = 'sm' | 'md' | 'lg';
export type CheckBoxGroupLabelPlacement = 'top' | 'left';

export interface CheckBoxOption {
  value: string;
  label: string | React.ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckBoxGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Array of checkbox options */
  options: CheckBoxOption[];
  /** Currently selected values */
  value?: string[];
  /** Default selected values */
  defaultValue?: string[];
  /** Callback when selection changes */
  onChange?: (value: string[]) => void;
  /** Layout direction of checkboxes */
  layout?: CheckBoxGroupLayout;
  /** Size of the checkbox group */
  size?: CheckBoxGroupSize;
  /** Whether the group is in an error state */
  error?: boolean;
  /** Error message to display below the group */
  errorText?: string;
  /** Helper text to display below the group */
  helperText?: string;
  /** Label for the checkbox group */
  label?: string | React.ReactNode;
  /** Whether the group is required */
  required?: boolean;
  /** Position of the label relative to the group */
  labelPlacement?: CheckBoxGroupLabelPlacement;
  /** Whether the group should take full width */
  fullWidth?: boolean;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Visual style variant for checkboxes */
  variant?: 'square' | 'circle';
  /** Color theme for checkboxes */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Size variant for individual checkboxes */
  checkboxSize?: 'sm' | 'md' | 'lg';
  /** Whether to show "Select All" option */
  showSelectAll?: boolean;
  /** Custom text for "Select All" option */
  selectAllText?: string | React.ReactNode;
  /** Whether to show "Select All" as indeterminate when some items are selected */
  indeterminateSelectAll?: boolean;
  /** Custom gap between options (overrides size-based gap) */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Custom gap between select all and options (overrides gap) */
  selectAllGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Name attribute for form submission and React Hook Form */
  name?: string;
}

const CheckBoxGroup = forwardRef<HTMLFieldSetElement, CheckBoxGroupProps>(
  ({ 
    className, 
    options = [],
    value,
    defaultValue = [],
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
    variant = 'square',
    color = 'primary',
    checkboxSize = 'sm',
    showSelectAll = false,
    selectAllText = 'Select All',
    indeterminateSelectAll = true,
    gap,
    selectAllGap,
    name,
    id: providedId,
    ...props 
  }, ref) => {
    const id = providedId || React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const groupId = `${id}-group`;

    // Use controlled or uncontrolled value
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (optionValue: string, checked: boolean) => {
      const newValue = checked 
        ? [...currentValue, optionValue]
        : currentValue.filter(v => v !== optionValue);
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleSelectAll = (checked: boolean) => {
      const newValue = checked ? options.map(option => option.value) : [];
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const isAllSelected = options.length > 0 && currentValue.length === options.length;
    const isSomeSelected = currentValue.length > 0 && currentValue.length < options.length;
    const selectAllIndeterminate = indeterminateSelectAll && isSomeSelected;

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
    const selectAllGapClass = getGapClass(selectAllGap);

    const checkboxGroup = (
      <div className={cn("relative", !fullWidth && "inline-block")}>
        <fieldset
          ref={ref}
          id={groupId}
          name={name}
          className={cn(
            checkboxGroupVariants({ layout, size }),
            optionsGapClass,
            className
          )}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        >
          {showSelectAll && options.length > 0 && (
            <div className={cn(
              "flex flex-col",
              selectAllGapClass || optionsGapClass || checkboxGroupVariants({ layout: 'vertical', size })
            )}>
              <Checkbox
                label={selectAllText}
                checked={isAllSelected}
                indeterminate={selectAllIndeterminate}
                onChange={(e) => handleSelectAll(e.target.checked)}
                disabled={disabled}
                variant={variant}
                color={error ? 'error' : color}
                variantSize={checkboxSize}
                error={error ? ' ' : undefined}
              />
              
              <div className={cn(
                "flex",
                layout === 'vertical' && "flex-col",
                layout === 'horizontal' && "flex-row flex-wrap",
                layout === 'grid' && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                optionsGapClass || checkboxGroupVariants({ layout, size })
              )}>
                {options.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={currentValue.includes(option.value)}
                    onChange={(e) => handleChange(option.value, e.target.checked)}
                    disabled={disabled || option.disabled}
                    indeterminate={option.indeterminate}
                    variant={variant}
                    color={error ? 'error' : color}
                    variantSize={checkboxSize}
                    error={error ? ' ' : undefined}
                  />
                ))}
              </div>
            </div>
          )}
          
          {!showSelectAll && (
            <>
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={currentValue.includes(option.value)}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  disabled={disabled || option.disabled}
                  indeterminate={option.indeterminate}
                  variant={variant}
                  color={error ? 'error' : color}
                  variantSize={checkboxSize}
                  error={error ? ' ' : undefined}
                />
              ))}
            </>
          )}
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
              {checkboxGroup}
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
        {checkboxGroup}
        {helperOrError}
      </div>
    );
  }
);

CheckBoxGroup.displayName = 'CheckBoxGroup';

export { CheckBoxGroup };