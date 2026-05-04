import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icons/Icons';

export type AccordionVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'default' | 'light' | 'dark' | 'info';
export type AccordionShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type AccordionRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface AccordionItem {
  id: string;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpenIds?: string[];
  openIds?: string[];
  onOpenChange?: (openIds: string[]) => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  contentClassName?: string;
  variant?: AccordionVariant;
  shadow?: AccordionShadow;
  rounded?: AccordionRounded;
}

const variantStyles: Record<AccordionVariant, { hover: string; active: string; text: string }> = {
  primary: {
    hover: 'hover:bg-primary-50',
    active: 'bg-primary-50',
    text: 'text-primary-700',
  },
  secondary: {
    hover: 'hover:bg-secondary-50',
    active: 'bg-secondary-50',
    text: 'text-secondary-700',
  },
  success: {
    hover: 'hover:bg-success-50',
    active: 'bg-success-50',
    text: 'text-success-700',
  },
  warning: {
    hover: 'hover:bg-warning-50',
    active: 'bg-warning-50',
    text: 'text-warning-700',
  },
  default: {
    hover: 'hover:bg-gray-50',
    active: 'bg-gray-50',
    text: 'text-gray-700',
  },
  light: {
    hover: 'hover:bg-light-50',
    active: 'bg-light-50',
    text: 'text-light-900',
  },
  dark: {
    hover: 'hover:bg-dark-50',
    active: 'bg-dark-50',
    text: 'text-dark-50',
  },
  info: {
    hover: 'hover:bg-info-50',
    active: 'bg-info-50',
    text: 'text-info-700',
  },
};

const shadowStyles: Record<AccordionShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

const roundedStyles: Record<AccordionRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  defaultOpenIds = [],
  openIds: controlledOpenIds,
  onOpenChange,
  icon = 'mdi:chevron-down',
  iconPosition = 'right',
  className,
  contentClassName,
  variant = 'primary',
  shadow = 'none',
  rounded = 'xl',
}) => {
  const [internalOpenIds, setInternalOpenIds] = useState<string[]>(defaultOpenIds);
  
  // Use controlled openIds if provided, otherwise use internal state
  const openIds = controlledOpenIds !== undefined ? controlledOpenIds : internalOpenIds;
  const isControlled = controlledOpenIds !== undefined;

  const toggleItem = (id: string) => {
    let newOpenIds: string[];
    
    if (multiple) {
      newOpenIds = openIds.includes(id)
        ? openIds.filter((itemId) => itemId !== id)
        : [...openIds, id];
    } else {
      newOpenIds = openIds.includes(id) ? [] : [id];
    }

    if (isControlled) {
      // In controlled mode, call the onOpenChange callback
      onOpenChange?.(newOpenIds);
    } else {
      // In uncontrolled mode, update internal state
      setInternalOpenIds(newOpenIds);
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={clsx('w-full space-y-2', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const isDisabled = Boolean(item.disabled);

        return (
          <div
            key={item.id}
            className={clsx(
              'border overflow-hidden',
              'bg-white',
              'border-gray-200',
              shadowStyles[shadow],
              roundedStyles[rounded],
              'transition-shadow duration-200',
            )}
          >
            <button
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={clsx(
                'w-full flex items-center justify-between p-4',
                'text-left transition-colors',
                styles.hover,
                isOpen && styles.active,
                styles.text,
                isDisabled && 'opacity-50 cursor-not-allowed',
              )}
            >
              {iconPosition === 'left' && (
                <div
                  className={clsx(
                    'mr-3 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                >
                  <Icon icon={icon} className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1">{item.title}</div>
              {iconPosition === 'right' && (
                <div
                  className={clsx(
                    'ml-3 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                >
                  <Icon icon={icon} className="w-5 h-5" />
                </div>
              )}
            </button>
            <div
              className={clsx(
                'grid transition-all duration-200 ease-in-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={clsx(
                    'p-4 border-t border-gray-200',
                    contentClassName
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 