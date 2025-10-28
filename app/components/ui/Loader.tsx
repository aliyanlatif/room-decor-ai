/**
 * Reusable Loader Component
 */

import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "md", message }) => {
  const sizeStyles = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className="text-center">
      <div
        className={`inline-block animate-spin rounded-full border-t-4 border-b-4 border-white ${sizeStyles[size]}`}
      ></div>
      {message && (
        <p
          className={`text-white mt-4 drop-shadow-lg font-medium ${textSizeStyles[size]}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
