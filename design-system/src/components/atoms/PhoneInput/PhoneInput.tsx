import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import { Icon } from "../../atoms/Icons/Icons";
import { createPortal } from "react-dom";
import { COUNTRIES } from "./constant";
import { getCountryFromPhone } from "../../../utils/phoneMeta";

const phoneInputVariants = cva(
  "border bg-white px-3 py-2 ring-0 transition-colors placeholder:text-neutral placeholder:text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-neutral-200 hover:border-primary-300 focus:border-primary-300 hover:bg-primary-50",
        error:
          "border-danger hover:border-danger-600 focus:border-danger-600 hover:bg-danger-50",
        success:
          "border-success hover:border-success-600 focus:border-success-600 hover:bg-success-50",
        ghost:
          "border-transparent bg-transparent hover:bg-primary-50 focus:bg-primary-50",
        underline:
          "border-0 border-b-2 border-neutral-200 rounded-none bg-transparent hover:border-primary-300 focus:border-primary-300 hover:bg-transparent focus:bg-transparent",
      },
      size: {
        sm: "h-8 px-2 py-1 text-sm",
        md: "h-10 px-3 py-2 text-base",
        lg: "h-12 px-4 py-3 text-lg",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "xl",
      fullWidth: true,
    },
  }
);

export type PhoneInputVariant =
  | "default"
  | "error"
  | "success"
  | "ghost"
  | "underline";
export type PhoneInputSize = "sm" | "md" | "lg";
export type PhoneInputRounded =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

// Utility function to detect country from phone number using libphonenumber-js
const detectCountryFromPhone = (phoneNumber: string) => {
  if (!phoneNumber) return null;

  // Ensure phone number starts with + for libphonenumber-js
  const normalizedPhone = phoneNumber.startsWith("+")
    ? phoneNumber
    : `+${phoneNumber}`;
  return getCountryFromPhone(normalizedPhone);
};

// Utility function to handle Indonesian number conversion (0 -> +62)
const handleIndonesianNumber = (inputValue: string) => {
  // If input starts with 0 and is 9-12 digits long (typical Indonesian mobile number)
  if (
    inputValue.startsWith("0") &&
    inputValue.length >= 9 &&
    inputValue.length <= 12
  ) {
    // Convert 0 to +62
    return "+62" + inputValue.slice(1);
  }
  return inputValue;
};

// Utility function to check if input should be converted to Indonesian format
const shouldConvertToIndonesian = (inputValue: string) => {
  // After 3 digits, if it starts with 0, it's likely Indonesian
  return inputValue.startsWith("0") && inputValue.length >= 3;
};

export interface CountryValue {
  iso: string;
  code: string;
  value?: string;
}

export interface PhoneInputProps {
  /** Visual style variant */
  variant?: PhoneInputVariant;
  /** Size of the input */
  size?: PhoneInputSize;
  /** Border radius of the input */
  rounded?: PhoneInputRounded;
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
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Current phone number value */
  value?: string;
  /** Callback when phone number changes */
  onChange?: (phone: string, countryValue?: CountryValue) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Default country code */
  defaultCountry?: string;
  /** Custom class name */
  className?: string;
  /** Placeholder for the phone number input */
  placeholder?: string;
  /** Whether to automatically detect country from phone number input */
  autoDetect?: boolean;
  /** Name attribute for form submission and React Hook Form */
  name?: string;
}

export const PhoneInput = forwardRef<HTMLDivElement | HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      rounded = "xl",
      error = false,
      errorText,
      helperText,
      label,
      required = false,
      fullWidth = false,
      value = "",
      onChange,
      disabled = false,
      defaultCountry = "id",
      placeholder = "Enter phone number",
      autoDetect = true,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(
      () =>
        COUNTRIES.find((country) => country.iso === defaultCountry) ||
        COUNTRIES[0]
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(() => {
      if (autoDetect && value) {
        // Use libphonenumber-js to detect country from phone number
        const detectedCountry = detectCountryFromPhone(value);
        if (detectedCountry) {
          setSelectedCountry(detectedCountry);
          return value;
        }

        // If no country detected but value exists, return as is
        return value;
      }
      const dialCode = selectedCountry.code;
      return value.startsWith(dialCode) ? value.slice(dialCode.length) : value;
    });

    // Call onChange with country code on initial load if value is provided
    useEffect(() => {
      if (value && onChange) {
        if (autoDetect) {
          const detectedCountry = detectCountryFromPhone(value);
          if (detectedCountry) {
            const dialCode = detectedCountry.code;
            const inputValue = value.startsWith(dialCode) 
              ? value.slice(dialCode.length) 
              : value;
            const countryValue: CountryValue = {
              iso: detectedCountry.iso,
              code: detectedCountry.code.replace("+", ""),
              value: inputValue,
            };
            onChange(value, countryValue);
          } else {
            onChange(value);
          }
        } else {
          const dialCode = selectedCountry.code;
          const inputValue = value.startsWith(dialCode) 
            ? value.slice(dialCode.length) 
            : value;
          const countryValue: CountryValue = {
            iso: selectedCountry.iso,
            code: selectedCountry.code.replace("+", ""),
            value: inputValue,
          };
          onChange(value, countryValue);
        }
      }
    }, []); // Only run on mount

    // Track if country has been detected in autoDetect mode
    const [countryDetected, setCountryDetected] = useState(() => {
      if (autoDetect && value) {
        return !!detectCountryFromPhone(value);
      }
      return false;
    });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const id = React.useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    // Expose both wrapper div (for backward compatibility) and hidden input (for React Hook Form)
    useImperativeHandle(ref, () => {
      // Prefer input element for React Hook Form compatibility
      return (hiddenInputRef.current || wrapperRef.current) as HTMLDivElement | HTMLInputElement;
    }, []);

    const filteredCountries = COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.includes(searchQuery)
    );

    const wrapperRef = useRef<HTMLDivElement>(null);
    const updateDropdownPosition = () => {
      if (isOpen && buttonRef.current && dropdownRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropdown = dropdownRef.current;
        const win =
          typeof window !== "undefined"
            ? window
            : { innerHeight: 0, innerWidth: 0 };
        const spaceBelow = win.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        const dropdownBottom =
          buttonRect.bottom + (dropdown.offsetHeight || 0) + 4;
        const touchesBottom = dropdownBottom >= win.innerHeight;
        const hasMoreSpaceAbove = spaceAbove > spaceBelow;
        const shouldFlip = touchesBottom && hasMoreSpaceAbove;
        dropdown.style.position = "fixed";
        dropdown.style.left = `${buttonRect.left}px`;
        dropdown.style.minWidth = `${buttonRect.width}px`;
        dropdown.style.maxWidth = "340px"; // or any reasonable max width
        dropdown.style.width = "auto";
        if (shouldFlip) {
          dropdown.style.bottom = `${win.innerHeight - buttonRect.top + 4}px`;
          dropdown.style.top = "auto";
          dropdown.style.maxHeight = `${spaceAbove - 8}px`;
        } else {
          dropdown.style.top = `${buttonRect.bottom + 4}px`;
          dropdown.style.bottom = "auto";
          dropdown.style.maxHeight = `${spaceBelow - 8}px`;
        }
      }
    };

    useEffect(() => {
      const win = typeof window !== "undefined" ? window : undefined;
      const handleScroll = () => {
        if (isOpen) updateDropdownPosition();
      };
      const handleResize = () => {
        if (isOpen) updateDropdownPosition();
      };
      if (isOpen) {
        updateDropdownPosition();
        win?.addEventListener("scroll", handleScroll, true);
        win?.addEventListener("resize", handleResize);
      }
      return () => {
        win?.removeEventListener("scroll", handleScroll, true);
        win?.removeEventListener("resize", handleResize);
      };
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: Event) => {
        const target = e.target as HTMLElement;
        if (
          buttonRef.current &&
          dropdownRef.current &&
          !buttonRef.current.contains(target) &&
          !dropdownRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    const handleCountrySelect = (country: (typeof COUNTRIES)[0]) => {
      setSelectedCountry(country);
      setIsOpen(false);
      setSearchQuery("");

      if (autoDetect) {
        // In autoDetect mode, update the phone number to include the new country code
        const newValue = country.code + phoneNumber.replace(/^\+?\d*/, "");
        setPhoneNumber(newValue);
        // Send clean numeric value without + for API compatibility
        const cleanValue = newValue.replace(/[^\d]/g, "");
        const inputValue = phoneNumber.replace(/^\+?\d*/, "");
        const countryValue: CountryValue = {
          iso: country.iso,
          code: country.code.replace("+", ""),
          value: inputValue,
        };
        onChange?.(cleanValue, countryValue);
      } else {
        // In manual mode, keep the existing behavior
        const newValue = country.code + phoneNumber;
        // Send clean numeric value without + for API compatibility
        const cleanValue = newValue.replace(/[^\d]/g, "");
        const countryValue: CountryValue = {
          iso: country.iso,
          code: country.code.replace("+", ""),
          value: phoneNumber,
        };
        onChange?.(cleanValue, countryValue);
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Validate input: only allow digits and + symbol
      const isValidInput = /^[+\d]*$/.test(inputValue);
      if (!isValidInput) {
        return; // Ignore invalid input
      }

      if (autoDetect && inputValue.startsWith("+")) {
        // Auto-detect mode: user can type full phone number with country code
        const detectedCountry = detectCountryFromPhone(inputValue);
        if (detectedCountry) {
          setSelectedCountry(detectedCountry);
          setCountryDetected(true);
          setPhoneNumber(inputValue);
          // Send clean numeric value without + for API compatibility
          const cleanValue = inputValue.replace(/[^\d]/g, "");
          const dialCode = detectedCountry.code;
          const inputWithoutCode = inputValue.startsWith(dialCode) 
            ? inputValue.slice(dialCode.length) 
            : inputValue;
          const countryValue: CountryValue = {
            iso: detectedCountry.iso,
            code: detectedCountry.code.replace("+", ""),
            value: inputWithoutCode,
          };
          onChange?.(cleanValue, countryValue);
        } else {
          // No country detected, treat as full input
          setPhoneNumber(inputValue);
          setCountryDetected(false);
          // Send clean numeric value without + for API compatibility
          const cleanValue = inputValue.replace(/[^\d]/g, "");
          onChange?.(cleanValue);
        }
      } else if (
        autoDetect &&
        !inputValue.startsWith("+") &&
        inputValue.length > 0
      ) {
        // Check for Indonesian number pattern (0 -> +62) first
        const indonesianConverted = handleIndonesianNumber(inputValue);

        if (indonesianConverted !== inputValue) {
          // Indonesian number detected and converted (9-12 digits)
          setPhoneNumber(indonesianConverted);
          setSelectedCountry(
            COUNTRIES.find((country) => country.iso === "id") || COUNTRIES[0]
          );
          setCountryDetected(true);
          // Send clean numeric value without + for API compatibility
          const cleanValue = indonesianConverted.replace(/[^\d]/g, "");
          const inputWithoutCode = inputValue.slice(1); // Remove leading 0
          const countryValue: CountryValue = {
            iso: "id",
            code: "62",
            value: inputWithoutCode,
          };
          onChange?.(cleanValue, countryValue);
        } else if (shouldConvertToIndonesian(inputValue)) {
          // After 3 digits starting with 0, convert to Indonesian format
          const convertedValue = "+62" + inputValue.slice(1);
          setPhoneNumber(convertedValue);
          setSelectedCountry(
            COUNTRIES.find((country) => country.iso === "id") || COUNTRIES[0]
          );
          setCountryDetected(true);
          // Send clean numeric value without + for API compatibility
          const cleanValue = convertedValue.replace(/[^\d]/g, "");
          const inputWithoutCode = inputValue.slice(1); // Remove leading 0
          const countryValue: CountryValue = {
            iso: "id",
            code: "62",
            value: inputWithoutCode,
          };
          onChange?.(cleanValue, countryValue);
        } else if (inputValue.startsWith("0")) {
          // Potential Indonesian number starting with 0, don't add + yet
          setPhoneNumber(inputValue);
          setCountryDetected(false);
          // Don't send onChange yet, wait to see if it becomes a valid Indonesian number
        } else {
          // User started typing without +, add it automatically
          const newValue = "+" + inputValue;
          setPhoneNumber(newValue);
          // Send clean numeric value without + for API compatibility
          const cleanValue = newValue.replace(/[^\d]/g, "");
          onChange?.(cleanValue);
        }
      } else {
        // Manual mode: only allow digits and update with selected country code
        const newPhoneNumber = inputValue.replace(/[^\d]/g, "");
        setPhoneNumber(newPhoneNumber);
        const newValue = selectedCountry.code + newPhoneNumber;
        // Send clean numeric value without + for API compatibility
        const cleanValue = newValue.replace(/[^\d]/g, "");
        const countryValue: CountryValue = {
          iso: selectedCountry.iso,
          code: selectedCountry.code.replace("+", ""),
          value: newPhoneNumber,
        };
        onChange?.(cleanValue, countryValue);
      }
    };

    const inputClassName = cn(
      phoneInputVariants({
        variant: error ? "error" : variant,
        size,
        rounded,
        fullWidth,
      }),
      "!w-full"
    );

    // In autoDetect mode, show single input initially, then show country selector after detection
    const showCountrySelector = !autoDetect || (autoDetect && countryDetected);

    // Sync hidden input value when phone number changes
    useEffect(() => {
      if (hiddenInputRef.current) {
        const phoneValue = phoneNumber || '';
        hiddenInputRef.current.value = phoneValue;
        // Trigger input event for React Hook Form
        const event = new Event('input', { bubbles: true });
        hiddenInputRef.current.dispatchEvent(event);
      }
    }, [phoneNumber]);

    return (
      <div
        ref={wrapperRef}
        className={cn(fullWidth ? "w-full" : "inline-block", className)}
        {...props}
      >
        {/* Hidden input for React Hook Form */}
        <input
          type="hidden"
          ref={hiddenInputRef}
          name={name}
          value={phoneNumber || ''}
          onChange={() => {}} // Controlled by handlePhoneChange
        />
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm text-neutral-900">
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        <div className={cn("relative", !fullWidth && "inline-block")}>
          <div className="flex">
            {showCountrySelector && (
              <button
                type="button"
                ref={buttonRef}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={cn(
                  inputClassName,
                  "flex items-center gap-2 rounded-r-none justify-between",
                  autoDetect ? "max-w-[60px]" : "max-w-[100px]",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon icon={selectedCountry.flag} className="w-5 h-5" />
                  {!autoDetect && (
                    <span className="text-sm">{selectedCountry.code}</span>
                  )}
                </span>
                <Icon
                  icon="mdi:chevron-down"
                  className={cn("transition-transform", isOpen && "rotate-180")}
                />
              </button>
            )}
            <input
              type="tel"
              id={id}
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={disabled}
              className={cn(
                inputClassName,
                showCountrySelector ? "rounded-l-none" : `rounded-l-${rounded}`,
                "flex-1 min-w-0 w-full"
              )}
              placeholder={autoDetect ? "e.g. +6281234567890" : placeholder}
            />
          </div>

          {isOpen &&
            createPortal(
              <div
                ref={dropdownRef}
                className="border border-neutral-200 bg-white shadow-lg overflow-y-auto rounded-md"
              >
                <div className="p-2 border-b border-neutral-200">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      // Allow letters, numbers, and spaces for country search
                      const value = e.target.value;
                      const isValidSearch = /^[a-zA-Z0-9\s]*$/.test(value);
                      if (isValidSearch) {
                        setSearchQuery(value);
                      }
                    }}
                    placeholder="Search countries..."
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:border-primary-300"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.iso + country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={cn(
                        "w-full px-3 py-2 text-sm text-left hover:bg-primary-50 cursor-pointer",
                        selectedCountry.iso === country.iso && "bg-primary-50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon={country.flag} className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {country.code}
                        </span>
                        <span className="text-sm text-neutral-600">
                          {country.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>,
              typeof document !== "undefined" ? document.body : document
            )}
        </div>
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
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
