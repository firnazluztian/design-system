import React from 'react';
import { cn } from '../../../utils/cn';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'heading3' | 'body1' | 'display1' | 'display2' | 'heading1' | 'heading2' | 'heading4' | 'subtitle1' | 'subtitle2' | 'body2' | 'caption' | 'value';

export interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Text: React.FC<TextProps> = ({
  variant = 'p',
  children,
  className,
  as
}) => {
  const variantStyles: Record<TextVariant, string> = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    p: 'text-base',
    span: 'text-base',
    label: 'text-sm font-medium',
    heading3: 'text-2xl font-bold',
    body1: 'text-base',
    display1: 'text-5xl font-bold',
    display2: 'text-4xl font-bold',
    heading1: 'text-4xl font-bold',
    heading2: 'text-3xl font-bold',
    heading4: 'text-xl font-bold',
    subtitle1: 'text-lg font-medium',
    subtitle2: 'text-base font-medium',
    body2: 'text-sm',
    caption: 'text-xs',
    value: 'text-base font-medium'
  };

  const getComponent = (variant: TextVariant) => {
    switch (variant) {
      case 'display1':
      case 'display2':
      case 'heading1':
      case 'heading2':
      case 'heading3':
      case 'heading4':
        return 'h' + variant.slice(-1) as keyof JSX.IntrinsicElements;
      case 'body1':
      case 'body2':
      case 'subtitle1':
      case 'subtitle2':
        return 'p' as keyof JSX.IntrinsicElements;
      case 'caption':
      case 'value':
        return 'span' as keyof JSX.IntrinsicElements;
      default:
        return variant as keyof JSX.IntrinsicElements;
    }
  };

  const Component = as || getComponent(variant);

  return (
    <Component className={cn('text-gray-900', variantStyles[variant], className)}>
      {children}
    </Component>
  );
};

export { Text }; 