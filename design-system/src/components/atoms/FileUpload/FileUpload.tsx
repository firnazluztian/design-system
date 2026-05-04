import React, { useCallback, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icons/Icons';

export type FileUploadVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'default' | 'light' | 'dark' | 'info';
export type FileUploadShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type FileUploadRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface FileUploadProps {
  accept?: string[];
  maxSize?: number; // in bytes
  multiple?: boolean;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  variant?: FileUploadVariant;
  shadow?: FileUploadShadow;
  rounded?: FileUploadRounded;
  children?: React.ReactNode;
  showFileList?: boolean;
  showPlaceholder?: boolean;
  showMaxSize?: boolean;
  icon?: string;
  name?: string;
}

const variantStyles: Record<FileUploadVariant, { 
  border: string;
  hover: string;
  active: string;
  text: string;
  bg: string;
}> = {
  primary: {
    border: 'border-primary-200',
    hover: 'hover:border-primary-300',
    active: 'border-primary-400',
    text: 'text-primary-700',
    bg: 'bg-primary-50',
  },
  secondary: {
    border: 'border-secondary-200',
    hover: 'hover:border-secondary-300',
    active: 'border-secondary-400',
    text: 'text-secondary-700',
    bg: 'bg-secondary-50',
  },
  success: {
    border: 'border-success-200',
    hover: 'hover:border-success-300',
    active: 'border-success-400',
    text: 'text-success-700',
    bg: 'bg-success-50',
  },
  warning: {
    border: 'border-warning-200',
    hover: 'hover:border-warning-300',
    active: 'border-warning-400',
    text: 'text-warning-700',
    bg: 'bg-warning-50',
  },
  default: {
    border: 'border-gray-200',
    hover: 'hover:border-gray-300',
    active: 'border-gray-400',
    text: 'text-gray-700',
    bg: 'bg-gray-50',
  },
  light: {
    border: 'border-light-200',
    hover: 'hover:border-light-300',
    active: 'border-light-400',
    text: 'text-light-900',
    bg: 'bg-light-50',
  },
  dark: {
    border: 'border-dark-200',
    hover: 'hover:border-dark-300',
    active: 'border-dark-400',
    text: 'text-dark-50',
    bg: 'bg-dark-50',
  },
  info: {
    border: 'border-info-200',
    hover: 'hover:border-info-300',
    active: 'border-info-400',
    text: 'text-info-700',
    bg: 'bg-info-50',
  },
};

const shadowStyles: Record<FileUploadShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
};

const roundedStyles: Record<FileUploadRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export const FileUpload = forwardRef<HTMLDivElement | HTMLInputElement, FileUploadProps>(({
  accept = ['*'],
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  value = [],
  onChange,
  className,
  disabled = false,
  placeholder = 'Drag and drop files here or click to browse',
  variant = 'default',
  shadow = 'none',
  rounded = 'lg',
  children,
  showFileList = true,
  showPlaceholder = true,
  showMaxSize = true,
  icon = 'mdi:upload',
  name,
}, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Expose both wrapper div (for backward compatibility) and file input (for React Hook Form)
  useImperativeHandle(ref, () => {
    // Prefer file input element for React Hook Form compatibility
    return (fileInputRef.current || wrapperRef.current) as HTMLDivElement | HTMLInputElement;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${maxSize / (1024 * 1024)}MB limit`;
    }

    if (accept[0] !== '*' && !accept.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return file.type.startsWith(type);
    })) {
      return `File type not allowed. Allowed types: ${accept.join(', ')}`;
    }

    return null;
  }, [accept, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...value, ...validFiles] : validFiles;
      onChange?.(newFiles);
    }
  }, [disabled, multiple, onChange, validateFile, value]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (disabled || !e.target.files) return;

    const files = Array.from(e.target.files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...value, ...validFiles] : validFiles;
      onChange?.(newFiles);
    }

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [disabled, multiple, onChange, validateFile, value]);

  const removeFile = useCallback((index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange?.(newFiles);
  }, [onChange, value]);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Icon icon="mdi:image" className="w-5 h-5" />;
    }
    if (file.type.startsWith('text/')) {
      return <Icon icon="mdi:file-document" className="w-5 h-5" />;
    }
    return <Icon icon="mdi:file" className="w-5 h-5" />;
  };

  const styles = variantStyles[variant];

  return (
    <div ref={wrapperRef} className={clsx('w-full', className)}>
      <div
        className={clsx(
          'p-6 text-center transition-colors',
          !children && [
            'border-2 border-dashed',
            styles.border,
            styles.bg,
            isDragging && styles.active,
            !disabled && styles.hover,
          ],
          disabled && 'opacity-50 cursor-not-allowed',
          shadowStyles[shadow],
          roundedStyles[rounded],
          !children && 'cursor-pointer'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && !children && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept.join(',')}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
          name={name}
        />
        
        {children ? (
          <div onClick={() => !disabled && fileInputRef.current?.click()}>
            {children}
          </div>
        ) : (
          <>
            <Icon icon={icon} className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
            {showPlaceholder && (
              <p className={clsx('text-neutral-600', styles.text)}>{placeholder}</p>
            )}
            {showMaxSize && (
              <p className="text-sm text-neutral mt-2">
                Max file size: {maxSize / (1024 * 1024)}MB
              </p>
            )}
          </>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-danger">{error}</p>
      )}

      {showFileList && value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={clsx(
                'flex items-center justify-between p-2',
                roundedStyles[rounded],
                styles.bg
              )}
            >
              <div className="flex items-center space-x-2">
                {getFileIcon(file)}
                <span className={clsx('text-sm', styles.text)}>
                  {file.name}
                </span>
                <span className="text-xs text-neutral">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              {!disabled && (
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-neutral hover:text-danger"
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload'; 