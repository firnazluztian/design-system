import { ReactNode } from 'react';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

type ErrorVariant = 
  | 'no-internet'
  | 'data-not-found'
  | 'under-development'
  | 'information-unavailable'
  | 'payment-success'
  | 'payment-failed'
  | 'no-order'
  | 'timeout'
  | 'on-process'
  | 'page-not-found';

interface ErrorWrapperProps {
  error?: unknown;
  reload?: () => void;
  children?: ReactNode;
  className?: string;
  variant?: ErrorVariant;
  customImage?: string;
  customMessage?: string | ReactNode;
}

// HTTP Status Codes with their default messages
const httpErrorConfig: Record<string, { image: string; message: string }> = {
  '400': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'Bad request. Please check your input and try again.',
  },
  '401': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'Please sign in to access this resource.',
  },
  '403': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'You do not have permission to access this resource.',
  },
  '404': {
    image: 'https://design-system-eaip.onrender.com/img/page-not-found.svg',
    message: 'The page you are looking for does not exist.',
  },
  '500': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'Something went wrong on our end. Please try again later.',
  },
  '502': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'Bad gateway. Our servers are having trouble connecting.',
  },
  '503': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'Service unavailable. We are currently performing maintenance.',
  },
  '504': {
    image: 'https://design-system-eaip.onrender.com/img/error.svg',
    message: 'Gateway timeout. The server took too long to respond.',
  },
};

// Application Specific Errors with their default messages
const appErrorConfig: Record<string, { image: string; message: string }> = {
  'PAGE_NOT_FOUND': {
    image: 'https://design-system-eaip.onrender.com/img/page-not-found.svg',
    message: 'The page you are looking for does not exist.',
  },
  'NO_INTERNET': {
    image: 'https://design-system-eaip.onrender.com/img/no-internet.svg',
    message: 'Please check your internet connection and try again.',
  },
  'DATA_NOT_FOUND': {
    image: 'https://design-system-eaip.onrender.com/img/search-not-found.svg',
    message: 'No data available for your request.',
  },
  'UNDER_DEVELOPMENT': {
    image: 'https://design-system-eaip.onrender.com/img/under-development.svg',
    message: 'This feature is currently under development.',
  },
  'INFORMATION_UNAVAILABLE': {
    image: 'https://design-system-eaip.onrender.com/img/search-not-found.svg',
    message: 'The requested information is currently unavailable.',
  },
  'PAYMENT_SUCCESS': {
    image: 'https://design-system-eaip.onrender.com/img/payment-success.svg',
    message: 'Operation completed successfully.',
  },
  'PAYMENT_FAILED': {
    image: 'https://design-system-eaip.onrender.com/img/payment-failed.svg',
    message: 'Payment failed. Please try again.',
  },
  'NO_ORDER': {
    image: 'https://design-system-eaip.onrender.com/img/no-order.svg',
    message: 'No order found.',
  },
  'TIMEOUT': {
    image: 'https://design-system-eaip.onrender.com/img/timeout.svg',
    message: 'Request timed out. Please try again.',
  },
  'ON_PROCESS': {
    image: 'https://design-system-eaip.onrender.com/img/on-process.svg',
    message: 'Your request is being processed. Please wait for a moment.',
  },
};

const variantToErrorCode: Record<ErrorVariant, string> = {
  'no-internet': 'NO_INTERNET',
  'data-not-found': 'DATA_NOT_FOUND',
  'under-development': 'UNDER_DEVELOPMENT',
  'information-unavailable': 'INFORMATION_UNAVAILABLE',
  'payment-success': 'PAYMENT_SUCCESS',
  'payment-failed': 'PAYMENT_FAILED',
  'no-order': 'NO_ORDER',
  'timeout': 'TIMEOUT',
  'on-process': 'ON_PROCESS',
  'page-not-found': 'PAGE_NOT_FOUND',
};

const allErrorConfigs = {
  ...httpErrorConfig,
  ...appErrorConfig,
};

const defaultErrorConfig = {
  image: 'https://design-system-eaip.onrender.com/img/error.svg',
  message: 'An unexpected error occurred. Our team is currently investigating the issue.',
};

const isValidErrorObject = (error: unknown): error is { code?: string; message?: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('code' in error || 'message' in error)
  );
};

const ErrorWrapper = ({ 
  error, 
  reload, 
  children, 
  className = '', 
  variant,
  customImage,
  customMessage 
}: ErrorWrapperProps) => {
  // If no error and no variant, show children
  if (!error && !variant) {
    return children ? <>{children}</> : null;
  }

  // Get the appropriate configuration based on variant or error
  const getErrorConfig = () => {
    if (variant) {
      const errorCode = variantToErrorCode[variant];
      return appErrorConfig[errorCode];
    }

    if (!isValidErrorObject(error)) {
      return defaultErrorConfig;
    }

    return error.code && allErrorConfigs[error.code] 
      ? allErrorConfigs[error.code] 
      : defaultErrorConfig;
  };

  const errorConfig = getErrorConfig();
  const displayImage = customImage || errorConfig.image;
  const displayMessage = customMessage || (isValidErrorObject(error) ? error.message : null) || errorConfig.message;

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center gap-4 ${className}`}>
      <img 
        src={displayImage} 
        alt="Error illustration" 
        className="max-w-[300px] h-auto"
      />
      {typeof displayMessage === 'string' ? (
        <Text variant="body1" className="m-0">
          {displayMessage}
        </Text>
      ) : (
        <div className="m-0">
          {displayMessage}
        </div>
      )}
      {reload && (
        <Button
          onClick={reload}
          rounded="full"
          variant="primary"
          size="md"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export { ErrorWrapper };
export type { ErrorWrapperProps, ErrorVariant };
