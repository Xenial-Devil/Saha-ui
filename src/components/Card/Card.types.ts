import React from "react";

export interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "glass" | "glass-strong" | "glass-subtle" | "bordered";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
