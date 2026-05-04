import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'primary' | 'secondary' | 'neutral' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'neutral',
  size = 'sm',
  className = '',
}) => {
  const orientationClasses = {
    horizontal: 'w-full border-t-0 border-l-0 border-r-0 border-b',
    vertical: 'h-full border-l border-t-0 border-r-0 border-b-0',
  };

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const colorClasses = {
    primary: 'border-primary-300',
    secondary: 'border-secondary-300',
    neutral: 'border-neutral-300',
    success: 'border-success-300',
    warning: 'border-warning-300',
    error: 'border-error-300',
  };

  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'border-b' : 'border-l',
    md: orientation === 'horizontal' ? 'border-b-2' : 'border-l-2',
    lg: orientation === 'horizontal' ? 'border-b-4' : 'border-l-4',
  };

  const dividerClasses = twMerge(
    'inline-block',
    orientationClasses[orientation],
    variantClasses[variant],
    colorClasses[color],
    sizeClasses[size],
    className
  );

  return <div className={dividerClasses} />;
};
