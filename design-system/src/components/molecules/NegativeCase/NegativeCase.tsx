import { ReactNode } from "react";
import { Button } from "../../atoms/Button";
import { Text } from "../../atoms/Text";

export type NegativeCaseVariant =
  | "no-internet"
  | "data-not-found"
  | "under-development"
  | "information-unavailable"
  | "payment-success"
  | "payment-failed"
  | "no-order"
  | "timeout"
  | "on-process"
  | "page-not-found"
  | "page-not-found-v2"
  | "no-seat-available"
  | "change-price"
  | "help-desk"
  | "approved"
  | "rejected";

interface NegativeCaseProps {
  variant: NegativeCaseVariant;
  customMessage?: ReactNode;
  reload?: () => void;
  reloadText?: string;
  customImage?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const appErrorConfig: Record<string, { image: string; message: string }> = {
  PAGE_NOT_FOUND: {
    image: "https://design-system-eaip.onrender.com/img/page-not-found.svg",
    message: "The page you are looking for does not exist.",
  },
  PAGE_NOT_FOUND_V2: {
    image: "https://design-system-eaip.onrender.com/img/page-not-found-v2.svg",
    message: "The page you are looking for does not exist.",
  },
  NO_INTERNET: {
    image: "https://design-system-eaip.onrender.com/img/no-internet.svg",
    message: "Please check your internet connection and try again.",
  },
  DATA_NOT_FOUND: {
    image: "https://design-system-eaip.onrender.com/img/search-not-found.svg",
    message: "No data available for your request.",
  },
  UNDER_DEVELOPMENT: {
    image: "https://design-system-eaip.onrender.com/img/under-development.svg",
    message: "This feature is currently under development.",
  },
  INFORMATION_UNAVAILABLE: {
    image: "https://design-system-eaip.onrender.com/img/search-not-found.svg",
    message: "The requested information is currently unavailable.",
  },
  PAYMENT_SUCCESS: {
    image: "https://design-system-eaip.onrender.com/img/payment-success.svg",
    message: "Operation completed successfully.",
  },
  PAYMENT_FAILED: {
    image: "https://design-system-eaip.onrender.com/img/payment-failed.svg",
    message: "Payment failed. Please try again.",
  },
  NO_ORDER: {
    image: "https://design-system-eaip.onrender.com/img/no-order.svg",
    message: "No order found.",
  },
  TIMEOUT: {
    image: "https://design-system-eaip.onrender.com/img/timeout.svg",
    message: "Request timed out. Please try again.",
  },
  ON_PROCESS: {
    image: "https://design-system-eaip.onrender.com/img/on-process.svg",
    message: "Your request is being processed. Please wait for a moment.",
  },
  NO_SEAT_AVAILABLE: {
    image: "https://design-system-eaip.onrender.com/img/seat-not-available.svg",
    message: "No seat available. Please try again later.",
  },
  CHANGE_PRICE: {
    image: "https://design-system-eaip.onrender.com/img/change-price.svg",
    message: "The price has been changed. Please try again.",
  },
  HELP_DESK: {
    image: "https://design-system-eaip.onrender.com/img/help-desk.svg",
    message: "Please contact our help desk for assistance.",
  },
  APPROVED: {
    image: "https://design-system-eaip.onrender.com/img/approved.svg",
    message: "Your request has been approved.",
  },
  REJECTED: {
    image: "https://design-system-eaip.onrender.com/img/rejected.svg",
    message: "Your request has been rejected.",
  },
};

const variantToErrorCode: Record<NegativeCaseVariant, string> = {
  "no-internet": "NO_INTERNET",
  "data-not-found": "DATA_NOT_FOUND",
  "under-development": "UNDER_DEVELOPMENT",
  "information-unavailable": "INFORMATION_UNAVAILABLE",
  "payment-success": "PAYMENT_SUCCESS",
  "payment-failed": "PAYMENT_FAILED",
  "no-order": "NO_ORDER",
  timeout: "TIMEOUT",
  "on-process": "ON_PROCESS",
  "page-not-found": "PAGE_NOT_FOUND",
  "page-not-found-v2": "PAGE_NOT_FOUND_V2",
  "no-seat-available": "NO_SEAT_AVAILABLE",
  "change-price": "CHANGE_PRICE",
  "help-desk": "HELP_DESK",
  approved: "APPROVED",
  rejected: "REJECTED",
};

export const NegativeCase = ({
  variant,
  customMessage,
  reload,
  reloadText = "Try Again",
  customImage,
  width,
  height,
  className = "",
}: NegativeCaseProps) => {
  const errorCode = variantToErrorCode[variant];
  const errorConfig = appErrorConfig[errorCode];

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center gap-4 ${className}`}
    >
      <img
        src={customImage || errorConfig.image}
        alt="Negative case illustration"
        className="max-w-[300px] h-auto"
        style={{ width, height }}
      />
      {customMessage ? (
        typeof customMessage === "string" ? (
          <Text variant="body1" className="m-0">
            {customMessage}
          </Text>
        ) : (
          <div className="m-0">{customMessage}</div>
        )
      ) : (
        <Text variant="body1" className="m-0">
          {errorConfig.message}
        </Text>
      )}
      {reload && (
        <Button onClick={reload} rounded="full" variant="primary" size="md">
          {reloadText}
        </Button>
      )}
    </div>
  );
};
