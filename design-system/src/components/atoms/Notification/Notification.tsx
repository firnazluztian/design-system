import React from 'react';
import { Icon } from '../../atoms/Icons/Icons';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

const notificationVariants = cva(
  'flex items-start gap-3 p-4 shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-white border border-neutral-200',
        primary: 'bg-primary-50 border border-primary-200',
        success: 'bg-success-50 border border-success-200',
        warning: 'bg-warning-50 border border-warning-200',
        danger: 'bg-danger-50 border border-danger-200',
        info: 'bg-info-50 border border-info-200',
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
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'xl',
    },
  }
);

export interface NotificationProps {
  /** The title of the notification */
  title?: string;
  /** The content of the notification */
  children: React.ReactNode;
  /** The icon to display */
  icon?: string;
  /** The visual style variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /** Border radius of the notification */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  /** Whether to show a close button */
  showClose?: boolean;
  /** Callback when the notification is closed */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
}

export const Notification = ({
  title,
  children,
  icon,
  variant = 'default',
  rounded = 'xl',
  showClose = false,
  onClose,
  className,
}: NotificationProps) => {
  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary-600';
      case 'success':
        return 'text-success-600';
      case 'warning':
        return 'text-warning-600';
      case 'danger':
        return 'text-danger-600';
      case 'info':
        return 'text-info-600';
      default:
        return 'text-neutral-600';
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case 'primary':
        return 'mdi:information';
      case 'success':
        return 'mdi:check-circle';
      case 'warning':
        return 'mdi:alert';
      case 'danger':
        return 'mdi:alert-circle';
      case 'info':
        return 'mdi:information';
      default:
        return 'mdi:information';
    }
  };

  return (
    <div className={cn(notificationVariants({ variant, rounded }), className)}>
      {icon && <Icon icon={getIcon()} className={cn('h-5 w-5 flex-shrink-0', getIconColor())} />}
      <div className="flex-1">
        {title && <h3 className="text-sm font-medium text-neutral-900">{title}</h3>}
        <div className="mt-1 text-sm text-neutral">{children}</div>
      </div>
      {showClose && (
        <button
          type="button"
          className="ml-auto flex-shrink-0 text-neutral-400 hover:text-neutral"
          onClick={onClose}
        >
          <Icon icon="mdi:close" className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}; 