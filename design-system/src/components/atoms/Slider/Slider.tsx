import React, { useState, useRef, useEffect, forwardRef } from 'react';
import clsx from 'clsx';
import { getWindow } from '../../../utils/ssr';

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  className?: string;
  disabled?: boolean;
  showValue?: boolean;
  marks?: { value: number; label: string }[];
  range?: boolean;
  name?: string;
}

export const Slider = forwardRef<HTMLDivElement | HTMLInputElement, SliderProps>(({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = min,
  onChange,
  className,
  disabled = false,
  showValue = false,
  marks = [],
  range = false,
  name,
  ...props
}, ref) => {
  // Internal state for single or range
  const isRange = range;
  const [value, setValue] = useState<number | [number, number]>(
    controlledValue !== undefined
      ? controlledValue
      : defaultValue !== undefined
      ? defaultValue
      : isRange
      ? [min, max]
      : min
  );
  const [isDragging, setIsDragging] = useState<null | 0 | 1>(null); // null: not dragging, 0: first thumb, 1: second thumb
  const sliderRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Expose both wrapper div (for backward compatibility) and hidden input (for React Hook Form)
  React.useImperativeHandle(ref, () => {
    // Prefer input element for React Hook Form compatibility
    return (hiddenInputRef.current || wrapperRef.current) as HTMLDivElement | HTMLInputElement;
  }, []);

  // Get current value(s)
  const currentValue = controlledValue !== undefined ? controlledValue : value;
  const [start, end] = isRange
    ? Array.isArray(currentValue)
      ? currentValue
      : [min, max]
    : [typeof currentValue === 'number' ? currentValue : min, max];

  // Clamp values
  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  // Handle value change
  const handleChange = (newValue: number | [number, number]) => {
    if (disabled) return;
    let clampedValue: number | [number, number];
    if (isRange && Array.isArray(newValue)) {
      clampedValue = [clamp(newValue[0]), clamp(newValue[1])];
    } else if (!isRange && typeof newValue === 'number') {
      clampedValue = clamp(newValue);
    } else {
      clampedValue = isRange ? [min, max] : min;
    }
    if (controlledValue === undefined) {
      setValue(clampedValue);
    }
    onChange?.(clampedValue);
    
    // Update hidden input for React Hook Form
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(clampedValue);
      const event = new Event('input', { bubbles: true });
      hiddenInputRef.current.dispatchEvent(event);
    }
  };

  // Mouse/touch event handlers
  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = x / rect.width;
    const rawValue = min + (max - min) * percentage;
    const steppedValue = Math.round(rawValue / step) * step;
    return clamp(steppedValue);
  };

  const handleThumbMouseDown = (thumbIdx: 0 | 1) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(thumbIdx);
    e.stopPropagation();
  };

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!isRange) {
      setIsDragging(0);
      updateValueFromEvent(e, 0);
    } else {
      // Find closest thumb
      const mouseValue = getValueFromPosition(e.clientX);
      const distToStart = Math.abs(mouseValue - start);
      const distToEnd = Math.abs(mouseValue - end);
      const thumbIdx = distToStart < distToEnd ? 0 : 1;
      setIsDragging(thumbIdx as 0 | 1);
      updateValueFromEvent(e, thumbIdx as 0 | 1);
    }
  };

  // Make updateValueFromEvent stable for useCallback
  const updateValueFromEvent = React.useCallback((e: MouseEvent | React.MouseEvent<HTMLDivElement>, thumbIdx: 0 | 1) => {
    const newVal = getValueFromPosition((e as MouseEvent).clientX);
    if (!isRange) {
      handleChange(newVal);
    } else {
      let newRange: [number, number] = [start, end];
      if (thumbIdx === 0) {
        newRange = [Math.min(newVal, end - step), end];
      } else {
        newRange = [start, Math.max(newVal, start + step)];
      }
      // Ensure start <= end
      if (newRange[0] > newRange[1]) newRange = [newRange[1], newRange[0]];
      handleChange(newRange);
    }
  }, [isRange, start, end, step, handleChange, getValueFromPosition]);

  // --- Fix for dragging bug: use named handlers for add/removeEventListener ---
  const draggingRef = React.useRef(isDragging);
  draggingRef.current = isDragging;

  // Named handlers for add/removeEventListener
  const handleDocumentMouseMove = React.useCallback(function(e: Event) {
    if (draggingRef.current === null || disabled) return;
    updateValueFromEvent(e as MouseEvent, draggingRef.current);
  }, [disabled, updateValueFromEvent]);

  const handleDocumentMouseUp = React.useCallback(function() {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging !== null) {
      const win = getWindow();
      win.addEventListener('mousemove', handleDocumentMouseMove as EventListener);
      win.addEventListener('mouseup', handleDocumentMouseUp as EventListener);
      return () => {
        win.removeEventListener('mousemove', handleDocumentMouseMove as EventListener);
        win.removeEventListener('mouseup', handleDocumentMouseUp as EventListener);
      };
    }
  }, [isDragging, handleDocumentMouseMove, handleDocumentMouseUp]);

  // Calculate thumb positions
  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;
  const startPercent = getPercentage(start);
  const endPercent = getPercentage(end);

  return (
    <div ref={wrapperRef} className={clsx('relative w-full', className)} {...props}>
      {/* Hidden input for React Hook Form */}
      <input
        type="hidden"
        ref={hiddenInputRef}
        name={name}
        value={JSON.stringify(currentValue)}
        onChange={() => {}} // Controlled by handleChange
      />
      <div
        ref={sliderRef}
        className={clsx(
          'relative h-2 bg-gray-200 rounded-full cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onMouseDown={handleSliderMouseDown}
      >
        {/* Track fill */}
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{ left: `${isRange ? startPercent : 0}%`, width: `${isRange ? endPercent - startPercent : startPercent}%` }}
        />
        {/* Thumbs */}
        <div
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md',
            'border-2 border-primary',
            disabled && 'cursor-not-allowed'
          )}
          style={{ left: `${startPercent}%`, transform: 'translate(-50%, -50%)' }}
          onMouseDown={handleThumbMouseDown(0)}
        />
        {isRange && (
          <div
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md',
              'border-2 border-primary',
              disabled && 'cursor-not-allowed'
            )}
            style={{ left: `${endPercent}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={handleThumbMouseDown(1)}
          />
        )}
      </div>

      {marks.length > 0 && (
        <div className="flex justify-between mt-2">
          {marks.map((mark) => (
            <div
              key={mark.value}
              className="text-xs text-gray"
              style={{ left: `${((mark.value - min) / (max - min)) * 100}%` }}
            >
              {mark.label}
            </div>
          ))}
        </div>
      )}

      {showValue && (
        <div className="mt-2 text-sm text-gray-600">
          {isRange ? `${start} - ${end}` : start}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider'; 