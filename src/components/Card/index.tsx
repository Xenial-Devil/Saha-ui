import React from "react";
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  padding = "md",
  rounded = "lg",
  hoverable = false,
  className = "",
  onClick,
}) => {
  const variantStyles = {
    default: "bg-surface shadow-md",
    glass: "glass",
    "glass-strong": "glass-strong",
    "glass-subtle": "glass-subtle",
    bordered: "bg-surface border-2 border-border",
  };

  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  const roundedStyles = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const hoverStyles = hoverable
    ? "transition-all duration-base hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    : "";

  return (
    <div
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${roundedStyles[rounded]} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h3 className={`text-xl font-semibold text-text ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => {
  return (
    <p className={`text-sm text-text-secondary mt-1 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`}>
      {children}
    </div>
  );
};

export default Card;
