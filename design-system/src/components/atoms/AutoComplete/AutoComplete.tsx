import React, { forwardRef, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../utils/cn";
import { Input } from "../Input/Input";
import { SelectItem } from "../SelectItem/SelectItem";
import { getWindow, getDocument } from "../../../utils/ssr";

// Create a custom event for autocomplete dropdown management
const AUTOCOMPLETE_OPEN_EVENT = "autocomplete-dropdown-opened";

export interface AutoCompleteProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "onSelect"
  > {
  /** Options to display in the dropdown */
  options: Array<{ value: string; label: string }>;
  /** Callback when an option is selected */
  onSelect?: (value: string) => void;
  /** Whether the dropdown is open */
  isOpen?: boolean;
  /** Whether to show loading state */
  loading?: boolean;
  /** Custom render function for options */
  renderOption?: (option: { value: string; label: string }) => React.ReactNode;
  /** Type of search to perform - 'include' searches anywhere in the string, 'startsWith' searches from the beginning */
  searchType?: "include" | "startsWith";
  /** Number of items to display initially. If 0 or undefined, displays all items */
  initialItemsToShow?: number;
  /** Number of additional items to load when scrolling to bottom */
  itemsToLoad?: number;
  /** Maximum height of the dropdown in pixels */
  maxDropdownHeight?: number;
  /** Custom message to display when no options are found */
  noOptionsMessage?: React.ReactNode;
  /** Custom message for scroll indicator. Use {current} and {total} as placeholders */
  scrollMoreMessage?: string;
  /** Custom message for when all options are shown. Use {total} as placeholder */
  allOptionsShownMessage?: string;
  /** Input variant that determines the visual style */
  variant?: "default" | "error" | "success" | "ghost" | "underline";
  /** Size of the input */
  size?: "sm" | "md" | "lg";
  /** Border radius of the input */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  /** Icon to display on the left side of the input */
  leftIcon?: string;
  /** Icon to display on the right side of the input */
  rightIcon?: string;
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
  labelPlacement?: "top" | "left";
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Whether to show clear icon when there's input */
  showClear?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Whether to reset invalid input to null on blur. When true, if user types a value that doesn't match any option and then blurs, the input will be reset to null */
  resetInvalidOnBlur?: boolean;
  /** Callback when invalid input is reset to null */
  onInvalidReset?: () => void;
}

interface AutoCompleteOpenEvent extends CustomEvent {
  detail: {
    id: string;
  };
}

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      className,
      options,
      onSelect,
      isOpen: controlledIsOpen,
      loading = false,
      renderOption,
      variant = "default",
      size = "md",
      rounded = "xl",
      leftIcon,
      rightIcon,
      error = false,
      errorText,
      helperText,
      label,
      required = false,
      labelPlacement = "top",
      fullWidth = false,
      value,
      onChange,
      onFocus,
      onBlur,
      showClear = false,
      onClear,
      searchType = "include",
      initialItemsToShow,
      itemsToLoad = 10,
      maxDropdownHeight = 300,
      noOptionsMessage = "No options found",
      scrollMoreMessage = "",
      allOptionsShownMessage = "",
      resetInvalidOnBlur = false,
      onInvalidReset,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState((value as string) || "");
    const [visibleItemsCount, setVisibleItemsCount] = useState(
      initialItemsToShow || 0
    );
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const isControlled = controlledIsOpen !== undefined;
    const reactId = React.useId();
    const id = `autocomplete-${reactId.replace(/:/g, "")}`;

    const updateDropdownPosition = () => {
      if (!isOpen || !inputRef.current || !dropdownRef.current) return;

      const { bottom, top, left, width } =
        inputRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      const win = getWindow();

      // Calculate available space
      const spaceBelow = win.innerHeight - bottom;
      const spaceAbove = top;

      // Estimate dropdown height (approximate based on maxDropdownHeight)
      const estimatedDropdownHeight = Math.min(maxDropdownHeight, 300);

      // Check if dropdown would be cut off at bottom
      const wouldBeCutOff = spaceBelow < estimatedDropdownHeight;
      const hasMoreSpaceAbove = spaceAbove > spaceBelow;
      const shouldFlip = wouldBeCutOff && hasMoreSpaceAbove;

      // Apply positioning styles
      Object.assign(dropdown.style, {
        position: "fixed",
        left: `${left}px`,
        width: `${width}px`,
      });

      if (shouldFlip) {
        // Position above the input
        Object.assign(dropdown.style, {
          bottom: `${win.innerHeight - top + 4}px`,
          top: "auto",
          maxHeight: `${spaceAbove - 8}px`,
        });
      } else {
        // Position below the input
        Object.assign(dropdown.style, {
          top: `${bottom + 4}px`,
          bottom: "auto",
          maxHeight: `${spaceBelow - 8}px`,
        });
      }
    };

    useEffect(() => {
      const win = getWindow();
      const doc = getDocument();

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

      const handleOtherAutocompleteOpen = (e: Event) => {
        const customEvent = e as AutoCompleteOpenEvent;
        if (customEvent.detail.id !== id) {
          setIsOpen(false);
        }
      };

      const handleClickOutside = (e: Event) => {
        const target = e.target as HTMLElement;
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        updateDropdownPosition();
        win.addEventListener("scroll", handleScroll, true);
        win.addEventListener("resize", handleResize);
      }

      doc.addEventListener(
        AUTOCOMPLETE_OPEN_EVENT,
        handleOtherAutocompleteOpen
      );
      doc.addEventListener("click", handleClickOutside);

      return () => {
        win.removeEventListener("scroll", handleScroll, true);
        win.removeEventListener("resize", handleResize);
        doc.removeEventListener(
          AUTOCOMPLETE_OPEN_EVENT,
          handleOtherAutocompleteOpen
        );
        doc.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen, id]);

    useEffect(() => {
      setInputValue((value as string) || "");
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);

      if (!value.trim()) {
        setIsOpen(false);
        return;
      }

      // Only open dropdown if there are filtered options
      const hasFilteredOptions = options.some(({ label }) => {
        const searchTerm = value.toLowerCase().trim();
        const optionLabel = label.toLowerCase();
        return searchType === "startsWith"
          ? optionLabel.startsWith(searchTerm)
          : optionLabel.includes(searchTerm);
      });

      setIsOpen(hasFilteredOptions);
      onChange?.(event);
    };

    const handleClear = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setInputValue("");
      onClear?.();
      const syntheticEvent = new Event(
        "change"
      ) as unknown as React.ChangeEvent<HTMLInputElement>;
      syntheticEvent.target = { value: "" } as HTMLInputElement;
      onChange?.(syntheticEvent);
    };

    const handleSelect = (option: { value: string; label: string }) => {
      if (!option) return;

      const { value, label } = option;
      setInputValue(label);
      setIsOpen(false);
      onSelect?.(value);

      const selectEvent = new CustomEvent("autocomplete-select", {
        detail: { selectedOption: option },
      });
      inputRef.current?.dispatchEvent(selectEvent);
    };

    // Helper function to check if current input value matches any option
    const isInputValueValid = (inputVal: string) => {
      if (!inputVal.trim()) return true; // Empty values are considered valid

      return options.some(({ label }) => {
        const searchTerm = inputVal.toLowerCase().trim();
        const optionLabel = label.toLowerCase();
        return searchType === "startsWith"
          ? optionLabel.startsWith(searchTerm)
          : optionLabel.includes(searchTerm);
      });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Check if we should reset invalid input on blur
      if (
        resetInvalidOnBlur &&
        inputValue.trim() &&
        !isInputValueValid(inputValue)
      ) {
        setInputValue("");
        onInvalidReset?.();

        // Create a synthetic change event to notify parent component
        const syntheticEvent = new Event(
          "change"
        ) as unknown as React.ChangeEvent<HTMLInputElement>;
        syntheticEvent.target = { value: "" } as HTMLInputElement;
        onChange?.(syntheticEvent);
      }

      onBlur?.(e);
    };

    const filteredOptions = options.filter(({ label }) => {
      const searchTerm = inputValue.toLowerCase().trim();
      const optionLabel = label.toLowerCase();

      if (searchType === "startsWith") {
        return optionLabel.startsWith(searchTerm);
      } else {
        // include
        return optionLabel.includes(searchTerm);
      }
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isControlled) {
        const doc = getDocument();
        doc.dispatchEvent(
          new CustomEvent(AUTOCOMPLETE_OPEN_EVENT, {
            detail: { id },
          })
        );
        // Open dropdown on focus if there are filtered options
        if (filteredOptions.length > 0) {
          setIsOpen(true);
        }
      }
      onFocus?.(e);
    };

    const handleDropdownScroll = () => {
      if (
        !dropdownContentRef.current ||
        initialItemsToShow === undefined ||
        initialItemsToShow <= 0
      )
        return;

      const { scrollTop, scrollHeight, clientHeight } =
        dropdownContentRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isNearBottom) {
        setVisibleItemsCount((prev) =>
          Math.min(prev + itemsToLoad, filteredOptions.length)
        );
      }
    };

    // Reset visible items count when search changes
    useEffect(() => {
      if (initialItemsToShow !== undefined && initialItemsToShow > 0) {
        setVisibleItemsCount(initialItemsToShow);
      }
    }, [inputValue, initialItemsToShow]);

    // Determine which options to show
    const visibleOptions =
      initialItemsToShow !== undefined && initialItemsToShow > 0
        ? filteredOptions.slice(0, visibleItemsCount)
        : filteredOptions;

    // Helper function to format messages with placeholders
    const formatMessage = (
      message: string,
      placeholders: Record<string, string | number>
    ) => {
      if (!message) return "";
      return message.replace(/\{(\w+)\}/g, (match, key) => {
        return placeholders[key]?.toString() || match;
      });
    };

    const showDropdown = isControlled ? controlledIsOpen : isOpen;

    // Determine if we should show the clear button
    const shouldShowClear =
      showClear && inputValue && !props.disabled && !props.readOnly;

    // If we have a clear button and a right icon, use the clear button instead
    const effectiveRightIcon = shouldShowClear ? "mdi:close" : rightIcon;

    // Keyboard navigation handlers - simplified for single option selection only
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown || visibleOptions.length === 0) {
        return;
      }

      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (visibleOptions.length === 1) {
            // If only one option, select it
            handleSelect(visibleOptions[0]);
          }
          break;

        case "Tab":
          if (visibleOptions.length === 1) {
            // If only one option, select it
            e.preventDefault();
            handleSelect(visibleOptions[0]);
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    const renderDropdown = () => {
      if (!showDropdown) return null;

      const doc = getDocument();
      if (!("body" in doc)) return null;

      const dropdown = (
        <div
          ref={dropdownRef}
          className="fixed z-[9999] min-w-[8rem] rounded-md border border-neutral-200 bg-white py-1 shadow-lg overflow-hidden"
          style={{ maxHeight: `${maxDropdownHeight}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={dropdownContentRef}
            className="overflow-auto"
            style={{ maxHeight: `${maxDropdownHeight}px` }}
            onScroll={handleDropdownScroll}
          >
            {loading ? (
              <div className="flex items-center justify-center py-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : visibleOptions.length > 0 ? (
              <>
                {visibleOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    selected={option.label === inputValue}
                    onClick={() => handleSelect(option)}
                  >
                    {renderOption ? renderOption(option) : option.label}
                  </SelectItem>
                ))}
                {initialItemsToShow !== undefined && initialItemsToShow > 0 && (
                  <>
                    {visibleItemsCount < filteredOptions.length &&
                      scrollMoreMessage && (
                        <div className="px-2 py-2 text-sm text-neutral-500 text-center">
                          {formatMessage(scrollMoreMessage, {
                            current: visibleItemsCount,
                            total: filteredOptions.length,
                          })}
                        </div>
                      )}
                    {visibleItemsCount >= filteredOptions.length &&
                      filteredOptions.length > 0 &&
                      allOptionsShownMessage && (
                        <div className="px-2 py-2 text-sm text-neutral-500 text-center">
                          {formatMessage(allOptionsShownMessage, {
                            total: filteredOptions.length,
                          })}
                        </div>
                      )}
                  </>
                )}
              </>
            ) : (
              <div className="px-2 py-2 text-sm text-neutral">
                {noOptionsMessage}
              </div>
            )}
          </div>
        </div>
      );

      return createPortal(dropdown, doc.body);
    };

    return (
      <div
        ref={wrapperRef}
        className={cn("relative", fullWidth ? "w-full" : "inline-block")}
      >
        <div ref={inputRef} className={cn(!fullWidth && "inline-block")}>
          <Input
            ref={ref}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            variant={variant}
            size={size}
            rounded={rounded}
            leftIcon={leftIcon}
            rightIcon={effectiveRightIcon}
            error={error}
            errorText={errorText}
            helperText={helperText}
            label={label}
            required={required}
            labelPlacement={labelPlacement}
            fullWidth={fullWidth}
            className={className}
            {...props}
            onClick={shouldShowClear ? handleClear : props.onClick}
          />
        </div>
        {renderDropdown()}
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";

export { AutoComplete };
