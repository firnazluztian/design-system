import { cn } from '../../../utils/cn';
import { useEffect, useState } from 'react';

export interface IconProps {
  /** The icon name from Iconify (e.g., 'mdi:home') */
  icon: string;
  /** Custom CSS classes */
  className?: string;
  /** Size of the icon in pixels */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Rotation in degrees */
  rotate?: number;
  /** Flip the icon horizontally or vertically */
  flip?: 'horizontal' | 'vertical' | 'both';
  /** Whether the icon should spin */
  spin?: boolean;
  /** Whether to load icon inline (default: true for SSR compatibility) */
  inline?: boolean;
  /** Mode of the icon (svg, mask, bg) */
  mode?: 'svg' | 'mask' | 'bg';
}

export const Icon = ({
  icon,
  className,
  size,
  color,
  rotate,
  flip,
  spin,
  inline = true,
  mode = 'svg',
  ...props
}: IconProps) => {
  const [IconifyIcon, setIconifyIcon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadIcon = async () => {
      try {
        const { Icon } = await import('@iconify/react');
        
        if (isMounted) {
          setIconifyIcon(() => Icon);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load icon:', error);
        if (isMounted) {
          setError(error as Error);
          setIsLoading(false);
        }
      }
    };

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, []);

  // Show placeholder during loading
  if (isLoading) {
    return <span style={{ width: size, height: size }} />;
  }

  // Show nothing if there's an error
  if (error || !IconifyIcon) {
    return null;
  }

  return (
    <IconifyIcon
      icon={icon}
      className={cn(
        spin && 'animate-spin',
        className
      )}
      style={{
        color,
        transform: `rotate(${rotate || 0}deg)`,
      }}
      height={size}
      width={size}
      flip={flip}
      inline={inline}
      mode={mode}
      {...props}
    />
  );
}; 