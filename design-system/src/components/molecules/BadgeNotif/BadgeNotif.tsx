import React from 'react';
import { Icon } from '../../atoms/Icons/Icons';
import { cn } from '../../../utils/cn';

const ICON_COLOR_MAP = {
  primary: '#007C99', // tailwind primary.DEFAULT
  secondary: '#CEEAE7', // tailwind secondary.DEFAULT
  danger: '#CA0000', // tailwind danger.DEFAULT
  warning: '#FF9319', // tailwind warning.DEFAULT
  info: '#0073E6', // tailwind info.DEFAULT
  success: '#00B37D', // tailwind success.DEFAULT
  disabled: '#959595', // tailwind disabled.DEFAULT
};

export type IconColor = keyof typeof ICON_COLOR_MAP | string;

export interface BadgeNotifProps {
  /** The icon name from Iconify (e.g., 'mdi:home') */
  icon?: string;
  /** Custom CSS classes */
  className?: string;
  /** Color of the icon. Accepts a color name (primary, secondary, etc.) or a custom color value. */
  color?: IconColor;
  /** Number of the notification */
  value?: number;
  /** Maximum number to display before showing maxValue+ */
  maxValue?: number;
  /** Custom node to wrap (icon, card, etc) */
  children?: React.ReactNode;
}

export const BadgeNotif = ({
  icon,
  className,
  color = 'primary',
  value,
  maxValue = 99,
  children,
  ...props
}: BadgeNotifProps) => {
  // Always top-right
  const positionClass = 'top-0 right-0';

  // Determine badge content and style
  const showNumber = typeof value === 'number' && !isNaN(value);
  let badgeText = '';
  if (showNumber) {
    if (value > maxValue) {
      badgeText = `${maxValue}+`;
    } else {
      badgeText = String(value);
    }
  }

  // Dynamic badge width for content
  const badgePadding = showNumber ? 'px-2' : '';
  const badgeMinWidth = showNumber ? 'min-w-[20px]' : 'w-2.5 h-2.5';
  const badgeHeight = showNumber ? 'h-5' : 'h-2.5';

  // Determine icon color
  const iconColor =
    typeof color === 'string' && color in ICON_COLOR_MAP
      ? ICON_COLOR_MAP[color as keyof typeof ICON_COLOR_MAP]
      : color;

  return (
    <div className={cn('relative inline-block', className)}>
      {children ? (
        children
      ) : icon ? (
        <Icon icon={icon} color={iconColor} size={32} {...props} />
      ) : null}
      <span
        className={cn(
          'absolute flex items-center justify-center rounded-xl bg-[#FF4C4C] text-white text-[10px] font-semibold',
          positionClass,
          badgePadding,
          badgeMinWidth,
          badgeHeight,
          !showNumber && 'p-0',
          !showNumber && 'rounded-full'
        )}
        style={{
          transform: 'translate(50%,-50%)',
        }}
      >
        {showNumber ? badgeText : ''}
      </span>
    </div>
  );
};