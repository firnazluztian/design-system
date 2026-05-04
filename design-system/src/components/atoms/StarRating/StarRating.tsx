import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';

export type StarRatingSize = 'sm' | 'md' | 'lg';
export type StarRatingColor = 'primary' | 'warning' | 'default';

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: StarRatingSize;
  color?: StarRatingColor;
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const sizeConfig = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

const colorConfig = {
  primary: 'text-primary',
  warning: 'text-warning',
  default: 'text-default-400'
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  color = 'primary',
  readOnly = false,
  onRatingChange,
  className
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(index);
    }
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(maxRating)].map((_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= displayRating;
        const isHovered = hoverRating !== null && starIndex <= hoverRating;

        return (
          <button
            key={index}
            className={cn(
              'transition-colors duration-200',
              sizeConfig[size],
              isFilled || isHovered ? colorConfig[color] : 'text-default-200',
              !readOnly && 'cursor-pointer'
            )}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            disabled={readOnly}
            aria-label={`Rate ${starIndex} out of ${maxRating}`}
          >
            <Icon 
              icon={isFilled || isHovered ? "mdi:star" : "mdi:star-outline"} 
              className="w-full h-full" 
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating; 