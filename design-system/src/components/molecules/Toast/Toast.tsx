import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';
import { ToastPosition } from './ToastContext';
import { Button } from '../../atoms/Button';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  rounded?: ToastRounded;
  title?: string;
  description?: string;
  onClose?: () => void;
  icon?: string;
  showIcon?: boolean;
  duration?: number;
  showClose?: boolean;
  position?: ToastPosition;
}

const roundedStyles: Record<ToastRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant = 'default', 
    rounded = 'lg',
    title, 
    description, 
    onClose, 
    icon, 
    showIcon = true,
    showClose = true,
    ...props 
  }, ref) => {
    const defaultIconMap: Record<ToastVariant, string> = {
      default: 'mdi:information',
      success: 'mdi:check-circle',
      error: 'mdi:alert-circle',
      warning: 'mdi:alert',
      info: 'mdi:information'
    };

    const iconToShow = icon || (showIcon ? defaultIconMap[variant] : undefined);
    const hasContent = title || description;

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          description ? 'items-start gap-3 p-4' : 'items-center gap-2 py-2.5 px-3',
          'border border-gray-200',
          roundedStyles[rounded],
          {
            'bg-white': variant === 'default',
            'bg-success-50': variant === 'success',
            'bg-danger-50': variant === 'error',
            'bg-warning-50': variant === 'warning',
            'bg-info-50': variant === 'info'
          },
          className
        )}
        {...props}
      >
        {iconToShow && (
          <Icon
            icon={iconToShow}
            className={cn(
              'flex-shrink-0',
              description ? 'h-5 w-5 mt-0.5' : 'h-4 w-4',
              {
                'text-gray': variant === 'default',
                'text-success': variant === 'success',
                'text-danger': variant === 'error',
                'text-warning': variant === 'warning',
                'text-info': variant === 'info'
              }
            )}
          />
        )}
        <div className="flex-1">
          {title && (
            <h3
              className={cn('text-sm font-medium leading-5', {
                'text-gray-900': variant === 'default',
                'text-success-900': variant === 'success',
                'text-danger-900': variant === 'error',
                'text-warning-900': variant === 'warning',
                'text-info-900': variant === 'info'
              })}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={cn(title ? 'mt-1' : '', 'text-sm leading-5', {
                'text-gray': variant === 'default',
                'text-success-700': variant === 'success',
                'text-danger-700': variant === 'error',
                'text-warning-700': variant === 'warning',
                'text-info-700': variant === 'info'
              })}
            >
              {description}
            </p>
          )}
          {!hasContent && (
            <span className="text-sm leading-5">
              {props.children}
            </span>
          )}
        </div>
        {showClose && onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className={cn(
              'flex-shrink-0 !p-1',
              description ? 'ml-4' : 'ml-2',
              {
                'text-gray-400 hover:text-gray': variant === 'default',
                'text-success-400 hover:text-success': variant === 'success',
                'text-danger-400 hover:text-danger': variant === 'error',
                'text-warning-400 hover:text-warning': variant === 'warning',
                'text-info-400 hover:text-info': variant === 'info'
              }
            )}
          >
            <Icon icon="mdi:close" className={cn(description ? 'h-5 w-5' : 'h-4 w-4')} />
          </Button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Toast }; 