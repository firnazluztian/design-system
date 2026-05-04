import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  shape?: "circle" | "square";
  color?:
    | "ghost"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "default";
  className?: string;
  variant?: "cover" | "contain";
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "avatar",
  size = "medium",
  shape = "circle",
  color = "default",
  className = "",
  variant = "cover",
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset fallback when switching between different `src` values.
    setImageError(false);
  }, [src]);

  const looksLikeUrl = (value: string): boolean => {
    const v = value.trim();
    if (!v) return false;
    if (/^(https?:\/\/|data:image\/|blob:|file:)/i.test(v)) return true;
    if (v.startsWith("/")) return true;
    if (v.includes("/")) return true; // relative paths, cdn paths, etc.
    if (v.includes(".")) return true; // domains and file extensions
    return false;
  };

  const getInitials = (value: string): string => {
    const tokens = value.trim().split(/\s+/).filter(Boolean);
    const first = tokens[0]?.[0] ?? "";
    const second = tokens[1]?.[0] ?? "";
    const initials = second ? `${first}${second}` : first;
    return initials.toUpperCase();
  };

  const srcIsText = !!src && !looksLikeUrl(src);
  const initials = src ? getInitials(src) : "";

  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  };

  const colorClasses = {
    ghost: "bg-transparent text-gray-600 ring-1 ring-gray-300",
    primary: "bg-primary-600 text-white",
    secondary: "bg-secondary-600 text-white",
    danger: "bg-danger-600 text-white",
    warning: "bg-warning-600 text-gray-900",
    success: "bg-success-600 text-white",
    default: "bg-gray-200 text-gray-700",
  };

  const avatarClasses = twMerge(
    "inline-flex items-center justify-center overflow-hidden",
    sizeClasses[size],
    shapeClasses[shape],
    colorClasses[color],
    className,
  );

  return (
    <div className={avatarClasses}>
      {!src ? (
        <svg
          className="w-6 h-6 text-gray"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="currentColor"
          />
        </svg>
      ) : srcIsText || imageError ? (
        initials ? (
          <span className="text-sm font-semibold leading-none">{initials}</span>
        ) : (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
              fill="currentColor"
            />
          </svg>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          className={twMerge(
            "w-full h-full",
            variant === "cover" ? "object-cover" : "object-contain",
          )}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};
