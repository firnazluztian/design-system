import React, { createContext, useContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastProps } from './Toast';
import { cn } from '../../../utils/cn';
import { getDocument } from '../../../utils/ssr';

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

interface ToastContextValue {
  showToast: (props: Omit<ToastProps, 'onClose'>) => string;
  removeToast: (id: string) => void;
}

interface ToastItem extends ToastProps {
  id: string;
  position: ToastPosition;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const position = props.position || 'top-right';
    const duration = props.duration || 5000;

    const newToast: ToastItem = {
      ...props,
      id,
      position,
    };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const toastsByPosition = toasts.reduce<Record<ToastPosition, ToastItem[]>>((acc, toast) => {
    if (!acc[toast.position]) {
      acc[toast.position] = [];
    }
    acc[toast.position].push(toast);
    return acc;
  }, {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
    'top-center': [],
    'bottom-center': [],
  });

  const doc = getDocument();
  if (!('body' in doc)) return <ToastContext.Provider value={{ showToast, removeToast }}>{children}</ToastContext.Provider>;

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {createPortal(
        <>
          {(Object.entries(toastsByPosition) as [ToastPosition, ToastItem[]][]).map(([position, items]) => (
            <div
              key={position}
              className={cn(
                'fixed z-[100] flex flex-col gap-2 min-w-[320px] max-w-[420px]',
                positionStyles[position],
                position.includes('bottom') ? 'flex-col-reverse' : 'flex-col'
              )}
            >
              {items.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                  className="animate-slide-in"
                />
              ))}
            </div>
          ))}
        </>,
        doc.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 