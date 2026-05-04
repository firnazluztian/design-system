import React from 'react';
import { cn } from '../../../utils/cn';

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  selected?: boolean;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, selected, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
          'hover:bg-primary-50',
          selected && 'bg-primary-50 text-primary-900',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export { SelectItem };
