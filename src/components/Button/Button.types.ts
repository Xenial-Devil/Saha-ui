import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  rounded?: boolean;
  children: React.ReactNode;
}
