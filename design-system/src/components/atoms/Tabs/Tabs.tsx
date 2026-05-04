import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icons/Icons';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: string;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: string;
  variant?: 'default' | 'pills' | 'underline' | 'active-underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tabListClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
  onChange?: (activeId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  variant = 'default',
  size = 'md',
  className,
  tabListClassName,
  tabClassName,
  contentClassName,
  onChange,
}) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId || items[0]?.id || '');
  const activeTabRef = React.useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  React.useEffect(() => {
    if (variant === 'active-underline' && activeTabRef.current) {
      const rect = activeTabRef.current.getBoundingClientRect();
      const parentRect = activeTabRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setUnderlineStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    }
  }, [variant, items, activeId]);

  React.useEffect(() => {
    if (variant === 'active-underline') {
      const handleResize = () => {
        if (activeTabRef.current) {
          const rect = activeTabRef.current.getBoundingClientRect();
          const parentRect = activeTabRef.current.parentElement?.getBoundingClientRect();
          if (parentRect) {
            setUnderlineStyle({
              left: rect.left - parentRect.left,
              width: rect.width,
            });
          }
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [variant, items, activeId]);

  const handleTabClick = useCallback((id: string) => {
    setActiveId(id);
    onChange?.(id);
  }, [onChange]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-1.5';
      case 'lg':
        return 'text-lg px-6 py-3';
      default:
        return 'text-base px-4 py-2';
    }
  };

  const getVariantClasses = (isActive: boolean, isDisabled: boolean) => {
    const baseClasses = clsx(
      'flex items-center space-x-2 transition-colors',
      'font-medium',
      getSizeClasses(),
      isDisabled && 'opacity-50 cursor-not-allowed',
      !isDisabled && 'cursor-pointer'
    );

    switch (variant) {
      case 'pills':
        return clsx(
          baseClasses,
          'rounded-full',
          isActive
            ? 'bg-primary text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        );
      case 'underline':
        return clsx(
          baseClasses,
          'border-b-2',
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
        );
      case 'active-underline':
        return clsx(
          baseClasses,
          'border-b-0',
          isActive
            ? 'text-primary'
            : 'text-gray-600 dark:text-gray-300 hover:text-primary'
        );
      default:
        return clsx(
          baseClasses,
          'border-b-2',
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
        );
    }
  };

  return (
    <div className={clsx('w-full', className)}>
      <div className={clsx(
        variant === 'active-underline' ? 'relative' : '',
        'flex space-x-1',
        variant === 'pills' && 'space-x-2 border-b-0',
        variant !== 'active-underline' && 'border-b border-gray-200 dark:border-gray-700',
        tabListClassName
      )}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const isDisabled = Boolean(item.disabled);

          return (
            <button
              key={item.id}
              ref={variant === 'active-underline' && isActive ? activeTabRef : undefined}
              onClick={() => !isDisabled && handleTabClick(item.id)}
              disabled={isDisabled}
              className={clsx(
                getVariantClasses(isActive, isDisabled),
                tabClassName
              )}
            >
              {item.icon && (
                <Icon
                  icon={item.icon}
                  className="w-5 h-5 flex-shrink-0"
                />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
        {variant === 'active-underline' && (
          <span
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />
        )}
      </div>
      <div className={clsx('mt-4', contentClassName)}>
        {items.find((item) => item.id === activeId)?.content}
      </div>
    </div>
  );
}; 