import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import { ErrorWrapper } from '../ErrorWrapper/ErrorWrapper';

export interface InfiniteScrollProps<T> {
  data: T[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export const InfiniteScroll = <T,>({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  renderItem,
  className,
  loadingComponent,
  emptyComponent,
  endComponent,
  threshold = 0.5,
  rootMargin = '0px',
  root = null,
}: InfiniteScrollProps<T>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold]);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const defaultLoadingComponent = (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-sm text-neutral">Loading more...</span>
    </div>
  );

  const defaultEmptyComponent = <ErrorWrapper />;

  const defaultEndComponent = (
    <div className="flex items-center justify-center gap-2 py-4">
      <span className="text-sm text-neutral">No more items to load</span>
    </div>
  );

  if (data.length === 0 && !isFetchingNextPage) {
    return emptyComponent || defaultEmptyComponent;
  }

  return (
    <div className={cn('w-full', className)}>
      {data.map((item, index) => renderItem(item, index))}
      
      <div ref={loadMoreRef}>
        {isFetchingNextPage && (loadingComponent || defaultLoadingComponent)}
        {!hasNextPage && data.length > 0 && (endComponent || defaultEndComponent)}
      </div>
    </div>
  );
}; 