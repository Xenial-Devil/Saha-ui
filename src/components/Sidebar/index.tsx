"use client";

import { createContext, useContext, forwardRef, useState } from "react";
import { cn } from "../../lib/utils";
import {
  SidebarProps,
  SidebarHeaderProps,
  SidebarGroupProps,
  SidebarItemProps,
  SidebarContentProps,
  SidebarFooterProps,
} from "./Sidebar.types";
import {
  sidebarVariants,
  sidebarItemVariants,
  sidebarGroupVariants,
  sidebarToggleVariants,
} from "./Sidebar.styles";
import Tooltip from "../Tooltip";

type SidebarContextType = {
  collapsed: boolean;
  variant: SidebarProps["variant"];
  setCollapsed: (v: boolean | ((old: boolean) => boolean)) => void;
};

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  variant: "default",
  setCollapsed: () => {},
});

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      variant = "default",
      fixed = true,
      className,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

    const setCollapsed = (val: boolean | ((old: boolean) => boolean)) => {
      if (!isControlled) {
        setInternalCollapsed(val);
      }
      const newValue = typeof val === "function" ? val(collapsed) : val;
      onCollapsedChange?.(newValue);
    };

    return (
      <SidebarContext.Provider value={{ collapsed, variant, setCollapsed }}>
        <aside
          ref={ref}
          className={cn(sidebarVariants({ variant, collapsed, fixed }), className)}
          aria-expanded={!collapsed}
          {...props}
        >
          {children}
          
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={sidebarToggleVariants({ collapsed })}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
        </aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, miniIcon, className, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center min-h-[60px] px-4",
          collapsed ? "justify-center" : "justify-between",
          className
        )}
        {...props}
      >
        {collapsed ? (miniIcon || children) : children}
      </div>
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto overflow-x-hidden p-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = "SidebarContent";

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, collapsible = true, defaultExpanded = true, children, className, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
      <div ref={ref} className={cn(sidebarGroupVariants({ collapsed }), className)} {...props}>
        {label && (
          <div
            className={cn(
              "flex items-center font-medium text-muted-foreground transition-all",
              collapsed ? "justify-center text-[10px] mb-2 px-0 opacity-50 uppercase tracking-wider h-4" : "justify-between text-xs px-2 mb-1 uppercase tracking-wider h-6",
              collapsible && !collapsed && "cursor-pointer hover:text-foreground"
            )}
            onClick={() => {
              if (collapsible && !collapsed) {
                setExpanded(!expanded);
              }
            }}
          >
            <span className={cn(collapsed && "sr-only truncate")}>{label}</span>
            {collapsible && !collapsed && (
              <ChevronDownIcon
                className={cn("h-4 w-4 transition-transform duration-200", !expanded && "-rotate-90")}
              />
            )}
          </div>
        )}
        <div
          className={cn(
            "flex flex-col gap-1 overflow-hidden transition-all duration-300",
            !expanded && !collapsed && collapsible ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ isActive, icon, badge, isNested, tooltipText, children, className, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);
    const content = (
      <button
        ref={ref}
        type="button"
        className={cn(sidebarItemVariants({ isActive, collapsed, isNested }), className)}
        {...props}
      >
        {icon && (
          <span className="shrink-0 flex items-center justify-center">
            {icon}
          </span>
        )}
        {!collapsed && (
          <span className="flex-1 truncate font-medium text-sm text-left">
            {children}
          </span>
        )}
        {!collapsed && badge && (
          <span
            className={cn(
              "shrink-0 flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold",
              isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
            )}
          >
            {badge}
          </span>
        )}
        {collapsed && badge && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        )}
      </button>
    );

    if (collapsed && tooltipText) {
      return (
        <Tooltip content={tooltipText} position="right">
          {content}
        </Tooltip>
      );
    }

    return content;
  }
);
SidebarItem.displayName = "SidebarItem";

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);
    return (
      <div
        ref={ref}
        className={cn(
          "border-t border-border/50 p-4 transition-all",
          collapsed ? "flex justify-center items-center flex-col px-2 gap-2" : "flex flex-col gap-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
