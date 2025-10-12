import React from "react";

export type BreadcrumbVariant =
  | "default"
  | "ghost"
  | "bordered"
  | "pills"
  | "underline"
  | "glass";

export type BreadcrumbSize = "sm" | "md" | "lg";

export type BreadcrumbSeparatorType =
  | "slash"
  | "chevron"
  | "dot"
  | "arrow"
  | "custom";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: BreadcrumbSeparatorType;
  children?: React.ReactNode;
}

export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
  children?: React.ReactNode;
}

export interface BreadcrumbSeparatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}
