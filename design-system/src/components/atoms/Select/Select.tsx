import React, { forwardRef, useState, Children, isValidElement, cloneElement, useEffect, useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';
import { SelectItem, SelectItemProps } from '../SelectItem';
import { getWindow, getDocument } from '../../../utils/ssr';

// Create a custom event for select dropdown management
const SELECT_OPEN_EVENT = 'select-dropdown-opened';

export type SelectPosition = 'bottom' | 'top' | 'left' | 'right';

const selectVariants = cva(
  'rounded-md px-3 py-2 text-sm ring-0 transition-colors placeholder:text-neutral placeholder:text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-neutral-200 hover:border-primary-300 focus:border-primary-300 hover:bg-primary-50 bg-white',
        error: 'border border-danger hover:border-danger-600 focus:border-danger-600 hover:bg-danger-50 bg-white',
        success: 'border border-success hover:border-success-600 focus:border-success-600 bg-white',
        ghost: 'border-0 hover:bg-neutral-100 focus:bg-neutral-100 bg-transparent',
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
        "2xl": 'rounded-2xl',
        "3xl": 'rounded-3xl',
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
      fullWidth: true,
      rounded: 'xl',
    },
  }
);

export type SelectVariant = 'default' | 'error' | 'success' | 'ghost' | 'underline';
export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: (value: string) => void;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size' | 'onChange'>,
    VariantProps<typeof selectVariants> {
  /** Options for the select */
  options?: SelectOption[];
  /** Label for the select */
  label?: string;
  /** Whether the select is in an error state */
  error?: boolean;
  /** Error message to display below the select */
  errorText?: string;
  /** Helper text to display below select */
  helperText?: string;
  /** Whether the select is required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Position of the dropdown */
  position?: SelectPosition;
  /** Whether the select should take full width */
  fullWidth?: boolean;
  variant?: SelectVariant;
  size?: SelectSize;
  /** Children components (SelectItem) */
  children?: React.ReactNode;
  /** Icon to display on the left side of the select */
  leftIcon?: string;
  /** Icon to display on the right side of the select */
  rightIcon?: string;
  /** Border radius of the select */
  rounded?: SelectRounded;
  /** Name attribute for form submission and React Hook Form */
  name?: string;
}

const Select = forwardRef<HTMLDivElement | HTMLInputElement, SelectProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      rounded = 'xl',
      options,
      label,
      error = false,
      errorText,
      helperText,
      required = false,
      placeholder,
      value,
      onChange,
      disabled = false,
      position = 'bottom',
      fullWidth = false,
      children,
      leftIcon,
      rightIcon,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const reactId = React.useId();
    const id = `select-${reactId.replace(/:/g, '')}`;

    // Expose both wrapper div (for backward compatibility) and hidden input (for React Hook Form)
    useImperativeHandle(ref, () => {
      // If ref is a function, we need to handle it differently
      // For React Hook Form, prefer the input element
      // For backward compatibility, prefer the wrapper div
      // We'll default to input element for form compatibility
      return (hiddenInputRef.current || wrapperRef.current) as HTMLDivElement | HTMLInputElement;
    }, []);

    const updateDropdownPosition = () => {
      if (isOpen && buttonRef.current && dropdownRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropdown = dropdownRef.current;
        const win = getWindow();
        
        // Constants for space calculations
        const spaceBelow = win.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        
        // Check if dropdown would touch bottom of page
        const dropdownBottom = buttonRect.bottom + dropdown.offsetHeight + 4; // 4px for gap
        const touchesBottom = dropdownBottom >= win.innerHeight;
        const hasMoreSpaceAbove = spaceAbove > spaceBelow;
        const shouldFlip = touchesBottom && hasMoreSpaceAbove;

        if (position === 'bottom' || position === 'top') {
          dropdown.style.position = 'fixed';
          dropdown.style.left = `${buttonRect.left}px`;
          dropdown.style.width = `${buttonRect.width}px`;

          if (position === 'bottom' && shouldFlip) {
            // Move to top if touches bottom
            dropdown.style.bottom = `${win.innerHeight - buttonRect.top + 4}px`;
            dropdown.style.top = 'auto';
            dropdown.style.maxHeight = `${spaceAbove - 8}px`;
          } else if (position === 'bottom') {
            // Stay at bottom
            dropdown.style.top = `${buttonRect.bottom + 4}px`;
            dropdown.style.bottom = 'auto';
            dropdown.style.maxHeight = `${spaceBelow - 8}px`;
          } else if (position === 'top' && !shouldFlip) {
            // Move to bottom if more space below
            dropdown.style.top = `${buttonRect.bottom + 4}px`;
            dropdown.style.bottom = 'auto';
            dropdown.style.maxHeight = `${spaceBelow - 8}px`;
          } else {
            // Stay at top
            dropdown.style.bottom = `${win.innerHeight - buttonRect.top + 4}px`;
            dropdown.style.top = 'auto';
            dropdown.style.maxHeight = `${spaceAbove - 8}px`;
          }
        } else if (position === 'left') {
          dropdown.style.position = 'fixed';
          dropdown.style.right = `${win.innerWidth - buttonRect.left + 4}px`;
          dropdown.style.top = `${buttonRect.top}px`;
          dropdown.style.maxHeight = `${win.innerHeight - buttonRect.top - 8}px`;
        } else if (position === 'right') {
          dropdown.style.position = 'fixed';
          dropdown.style.left = `${buttonRect.right + 4}px`;
          dropdown.style.top = `${buttonRect.top}px`;
          dropdown.style.maxHeight = `${win.innerHeight - buttonRect.top - 8}px`;
        }
      }
    };

    useEffect(() => {
      const win = getWindow();

      const handleScroll = () => {
        if (isOpen) {
          updateDropdownPosition();
        }
      };

      const handleResize = () => {
        if (isOpen) {
          updateDropdownPosition();
        }
      };

      if (isOpen) {
        updateDropdownPosition();
        win.addEventListener('scroll', handleScroll, true);
        win.addEventListener('resize', handleResize);
      }

      return () => {
        win.removeEventListener('scroll', handleScroll, true);
        win.removeEventListener('resize', handleResize);
      };
    }, [isOpen, position]);

    // Sync hidden input when value changes externally
    useEffect(() => {
      if (hiddenInputRef.current && value !== undefined) {
        hiddenInputRef.current.value = value;
      }
    }, [value]);

    useEffect(() => {
      const doc = getDocument();

      const handleOtherSelectOpen = (e: Event) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail.id !== id) {
          setIsOpen(false);
        }
      };

      const handleClickOutside = (e: Event) => {
        const target = e.target as HTMLElement;
        const selectButton = buttonRef.current;
        const dropdown = dropdownRef.current;

        if (
          selectButton &&
          dropdown &&
          !selectButton.contains(target) &&
          !dropdown.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      doc.addEventListener(SELECT_OPEN_EVENT, handleOtherSelectOpen);
      doc.addEventListener('click', handleClickOutside);

      return () => {
        doc.removeEventListener(SELECT_OPEN_EVENT, handleOtherSelectOpen);
        doc.removeEventListener('click', handleClickOutside);
      };
    }, [id]);

    const handleOpen = () => {
      if (disabled) return;
      
      if (isOpen) {
        setIsOpen(false);
        return;
      }

      const doc = getDocument();
      doc.dispatchEvent(
        new CustomEvent(SELECT_OPEN_EVENT, {
          detail: { id },
        })
      );
      setIsOpen(true);
    };

    const getSelectedLabel = () => {
      if (options) {
        const selectedOption = options.find((option) => option.value === value);
        return selectedOption?.label;
      }
      
      if (children) {
        const childArray = Children.toArray(children);
        const selectedChild = childArray.find(
          (child) => 
            isValidElement<SelectItemProps>(child) && 
            'value' in child.props && 
            child.props.value === value
        );
        return isValidElement(selectedChild) ? selectedChild.props.children : null;
      }
      
      return null;
    };

    const handleSelect = (selectedValue: string) => {
      if (disabled) return;
      onChange?.(selectedValue);
      setIsOpen(false);
      
      // Update hidden input for React Hook Form
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = selectedValue;
        // Trigger input event for React Hook Form
        const event = new Event('input', { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);
      }
    };

    const renderOptions = () => {
      if (options) {
        return options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            selected={option.value === value}
            onClick={() => {
              if (option.onClick) {
                option.onClick(option.value);
              }
              handleSelect(option.value);
            }}
          >
            <div className="flex items-center gap-2">
              {option.icon}
              {option.label}
            </div>
          </SelectItem>
        ));
      }

      if (children) {
        return Children.map(children, (child) => {
          if (isValidElement<SelectItemProps>(child) && 'value' in child.props) {
            return cloneElement(child, {
              selected: child.props.value === value,
              onClick: () => handleSelect(child.props.value),
            });
          }
          return null;
        });
      }

      return null;
    };

    const renderDropdown = () => {
      if (!isOpen || disabled) return null;

      const dropdown = (
        <div
          ref={dropdownRef}
          className={cn(
            'fixed z-[9999] min-w-[8rem] border border-neutral-200 bg-white py-1 shadow-lg rounded-lg',
            position === 'left' || position === 'right' ? 'w-max' : 'w-full'
          )}
          onClick={(e) => e.stopPropagation()}
          style={{
            overflowY: 'auto',
          }}
        >
          {renderOptions()}
        </div>
      );

      const doc = getDocument();
      if (!('body' in doc)) return null;

      return createPortal(dropdown, doc.body);
    };

    return (
      <div 
        ref={wrapperRef}
        className={cn(fullWidth ? "w-full" : "inline-block")} 
        {...props}
      >
        {/* Hidden input for React Hook Form */}
        <input
          type="hidden"
          ref={hiddenInputRef}
          name={name}
          value={value || ''}
          onChange={() => {}} // Controlled by handleSelect
        />
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm text-neutral-900"
          >
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        <div 
          className={cn("relative", !fullWidth && "inline-block")}
          onClick={handleOpen}
        >
          <button
            id={id}
            ref={buttonRef}
            type="button"
            className={cn(
              selectVariants({ variant: error ? 'error' : variant, size, rounded, fullWidth }),
              'flex items-center justify-between',
              disabled && 'cursor-not-allowed opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
            disabled={disabled}
          >
            {leftIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral flex items-center">
                <Icon icon={leftIcon} className="w-4 h-4" />
              </div>
            )}
            <span className="flex items-center gap-2 min-w-0 flex-1">
              <span className={cn(
                "truncate text-left",
                getSelectedLabel() ? "text-neutral-900" : "text-neutral"
              )}>
                {getSelectedLabel() || placeholder}
              </span>
            </span>
            {rightIcon ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral flex items-center">
                <Icon icon={rightIcon} className="w-4 h-4" />
              </div>
            ) : (
              <Icon
                icon="mdi:chevron-down"
                className={cn('transition-transform flex-shrink-0 ml-2 w-4 h-4', isOpen && 'rotate-180')}
              />
            )}
          </button>
          {renderDropdown()}
        </div>
        {error && errorText && (
          <p className="mt-1 text-xs text-danger" id={`${id}-error`}>
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-neutral" id={`${id}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select }; 