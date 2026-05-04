import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../atoms/Icons/Icons';
import { getWindow } from '../../../utils/ssr';

export interface HorizontalCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    updateScrollButtons();
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollButtons);
    const win = getWindow();
    win.addEventListener('resize', updateScrollButtons);
    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      win.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const scrollBy = (offset: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative w-full', className)}>
      {canScrollLeft && (
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-primary-900 text-white rounded-full shadow-md p-2 focus:outline-none"
          onClick={() => scrollBy(-containerRef.current!.clientWidth * 0.8)}
          aria-label="Scroll left"
        >
          <Icon icon="mdi:chevron-left" size={24} />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth py-2 px-2 hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 scroll-snap-align-start"
            style={{ minWidth: '320px', maxWidth: '360px' }}
          >
            {child}
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-primary-900 text-white rounded-full shadow-md p-2 focus:outline-none"
          onClick={() => scrollBy(containerRef.current!.clientWidth * 0.8)}
          aria-label="Scroll right"
        >
          <Icon icon="mdi:chevron-right" size={24} />
        </button>
      )}
    </div>
  );
};

// Tailwind utility for hiding scrollbars
// Add this to your global styles if not present:
// .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
// .hide-scrollbar::-webkit-scrollbar { display: none; } 