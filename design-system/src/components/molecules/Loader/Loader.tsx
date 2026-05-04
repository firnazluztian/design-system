import { ReactNode } from "react";
import { Text } from "../../atoms/Text";

export type LoaderVariant =
  | "flight-light"
  | "flight-dark"
  | "tixia-circular"
  | "tixia-linear"
  | "hotel-loader";

interface LoaderProps {
  variant: LoaderVariant;
  customImage?: string;
  customMessage?: ReactNode;
  width?: string | number;
  height?: string | number;
  widthImg?: string | number;
  heightImg?: string | number;
  className?: string;
}

const loaderConfig: Record<string, { image: string; message: string }> = {
  FLIGHT_LIGHT: {
    image:
      "https://design-system-eaip.onrender.com/img/flight-loader-light.gif",
    message: "Loading, please wait...",
  },
  FLIGHT_DARK: {
    image: "https://design-system-eaip.onrender.com/img/flight-loader-dark.gif",
    message: "Loading, please wait...",
  },
  "TIXIA-CIRCULAR": {
    image: "https://design-system-eaip.onrender.com/img/tixia-circular.gif",
    message: "Loading, please wait...",
  },
  "TIXIA-LINEAR": {
    image: "https://design-system-eaip.onrender.com/img/tixia-linear.gif",
    message: "Loading, please wait...",
  },
  "HOTEL-LOADER": {
    image: "https://design-system-eaip.onrender.com/img/hotel-loader.gif",
    message: "Loading, please wait...",
  },
};

const variantToLoaderCode: Record<LoaderVariant, string> = {
  "flight-light": "FLIGHT_LIGHT",
  "flight-dark": "FLIGHT_DARK",
  "tixia-circular": "TIXIA-CIRCULAR",
  "tixia-linear": "TIXIA-LINEAR",
  "hotel-loader": "HOTEL-LOADER",
};

// Helper function to convert width/height values to CSS classes or inline styles
const getDimensionStyle = (
  value: string | number | undefined,
  defaultClass: string
): { className: string; style?: React.CSSProperties } => {
  if (value === undefined) {
    return { className: defaultClass };
  }

  if (typeof value === "number") {
    return {
      className: "",
      style: { width: `${value}px`, height: `${value}px` },
    };
  }

  return { className: value };
};

export const Loader = ({
  variant,
  customImage,
  customMessage,
  width = "w-full",
  height = "h-full",
  widthImg = "w-auto",
  heightImg = "h-auto",
  className = "",
}: LoaderProps) => {
  const loaderCode = variantToLoaderCode[variant];
  const config = loaderConfig[loaderCode];

  const containerStyle = getDimensionStyle(width, "w-full");
  const containerHeightStyle = getDimensionStyle(height, "h-full");
  const imageWidthStyle = getDimensionStyle(widthImg, "w-auto");
  const imageHeightStyle = getDimensionStyle(heightImg, "h-auto");

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center gap-4 ${containerStyle.className} ${containerHeightStyle.className} ${className}`}
      style={{ ...containerStyle.style, ...containerHeightStyle.style }}
    >
      <img
        src={customImage || config.image}
        alt="Loading animation"
        className={`${imageWidthStyle.className} ${imageHeightStyle.className}`}
        style={{ ...imageWidthStyle.style, ...imageHeightStyle.style }}
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
          {config.message}
        </Text>
      )}
    </div>
  );
};
