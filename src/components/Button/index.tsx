import React from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  rounded = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-base focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantStyles = {
    primary:
      "bg-primary text-text-inverse hover:bg-primary-dark focus:ring-primary shadow-md hover:shadow-lg",
    secondary:
      "bg-secondary text-text-inverse hover:bg-secondary-dark focus:ring-secondary shadow-md hover:shadow-lg",
    accent:
      "bg-accent text-text-inverse hover:bg-accent-dark focus:ring-accent shadow-md hover:shadow-lg",
    success:
      "bg-success text-text-inverse hover:bg-success-dark focus:ring-success shadow-md hover:shadow-lg",
    warning:
      "bg-warning text-text-inverse hover:bg-warning-dark focus:ring-warning shadow-md hover:shadow-lg",
    error:
      "bg-error text-text-inverse hover:bg-error-dark focus:ring-error shadow-md hover:shadow-lg",
    ghost:
      "bg-transparent text-text hover:bg-surface-hover focus:ring-primary border border-border",
    glass: "glass glass-hover text-text focus:ring-primary",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2.5",
    xl: "px-8 py-4 text-xl gap-3",
  };

  const roundedStyles = rounded ? "rounded-full" : "rounded-lg";
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
