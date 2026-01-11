"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import {
  appBarProgressVariants,
  appBarAnnouncementVariants,
  appBarSearchVariants,
  appBarTitleVariants,
  skipToContentVariants,
  appBarSlotVariants,
  appBarActionVariants,
  appBarBadgeVariants,
} from "./AppBar.styles";
import type {
  AppBarProgressProps,
  AppBarSearchProps,
  AppBarAnnouncementProps,
  AppBarTitleProps,
  AppBarBreadcrumbsProps,
  SkipToContentProps,
} from "./AppBar.types";

// ============================================================================
// Icons with smooth stroke animations
// ============================================================================

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn(
      "w-[18px] h-[18px] transition-transform duration-200",
      className
    )}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-4 h-4 transition-transform duration-200", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-3.5 h-3.5", className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn(
      "w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5",
      className
    )}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

// ============================================================================
// AppBar Progress
// ============================================================================

export const AppBarProgress = forwardRef<HTMLDivElement, AppBarProgressProps>(
  (
    {
      value,
      variant = "indeterminate",
      color,
      position = "bottom",
      height = 2,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(appBarProgressVariants({ position }), className)}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={variant === "determinate" ? value : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {variant === "determinate" ? (
          <div
            className={cn(
              "h-full rounded-full",
              "bg-gradient-to-r from-primary via-primary to-primary/80",
              "transition-all duration-500 ease-out",
              "shadow-[0_0_8px_rgba(var(--primary),0.4)]"
            )}
            style={{
              width: `${Math.min(100, Math.max(0, value || 0))}%`,
              backgroundColor: color,
            }}
          />
        ) : (
          <div className="h-full w-full bg-primary/10 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                "bg-gradient-to-r from-transparent via-primary to-transparent",
                "animate-[shimmer_2s_ease-in-out_infinite]",
                "shadow-[0_0_8px_rgba(var(--primary),0.3)]"
              )}
              style={{
                width: "40%",
                backgroundColor: color,
              }}
            />
          </div>
        )}
      </div>
    );
  }
);
AppBarProgress.displayName = "AppBarProgress";

// ============================================================================
// AppBar Search
// ============================================================================

export const AppBarSearch = forwardRef<HTMLDivElement, AppBarSearchProps>(
  (
    {
      expanded = false,
      onToggle,
      onSearch,
      onChange,
      placeholder = "Search...",
      defaultValue = "",
      icon,
      className,
      autoFocus = true,
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!expanded || !autoFocus) {
        return undefined;
      }

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);

      return () => {
        clearTimeout(timer);
      };
    }, [expanded, autoFocus]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onToggle?.();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          appBarSearchVariants({ expanded }),
          isFocused && expanded && "ring-primary/50",
          className
        )}
      >
        {!expanded ? (
          <button
            type="button"
            onClick={onToggle}
            className={cn(appBarActionVariants({ size: "md" }), "group")}
            aria-label="Open search"
          >
            {icon || <SearchIcon className="group-hover:scale-110" />}
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full gap-1 py-1.5"
          >
            <button
              type="button"
              onClick={onToggle}
              className={cn(
                "p-1.5 rounded-full shrink-0",
                "transition-all duration-200",
                "hover:bg-muted/80 active:scale-90"
              )}
              aria-label="Close search"
            >
              <CloseIcon className="opacity-60" />
            </button>
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className={cn(
                "flex-1 min-w-0 bg-transparent outline-none",
                "placeholder:text-muted-foreground/50",
                "text-sm py-1",
                "transition-all duration-200"
              )}
              aria-label="Search"
            />
            <button
              type="submit"
              className={cn(
                "p-1.5 rounded-full shrink-0",
                "transition-all duration-200",
                "hover:bg-muted/80 active:scale-90",
                "text-primary"
              )}
              aria-label="Submit search"
            >
              <SearchIcon />
            </button>
          </form>
        )}
      </div>
    );
  }
);
AppBarSearch.displayName = "AppBarSearch";

// ============================================================================
// AppBar Announcement
// ============================================================================

export const AppBarAnnouncement = forwardRef<
  HTMLDivElement,
  AppBarAnnouncementProps
>(
  (
    {
      children,
      dismissible = true,
      onDismiss,
      color,
      textColor,
      icon,
      className,
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
      if (!isExiting) {
        return undefined;
      }

      const timer = setTimeout(() => {
        setDismissed(true);
        onDismiss?.();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }, [isExiting, onDismiss]);

    if (dismissed) {
      return null;
    }

    const handleDismiss = () => {
      setIsExiting(true);
    };

    return (
      <div
        ref={ref}
        className={cn(
          appBarAnnouncementVariants({ dismissible }),
          "bg-gradient-to-r from-primary via-primary/95 to-primary",
          "text-primary-foreground",
          isExiting && "animate-out fade-out slide-out-to-top-2 duration-300",
          className
        )}
        style={{
          backgroundColor: color,
          color: textColor,
        }}
        role="banner"
        aria-live="polite"
      >
        {icon && <span className="shrink-0 animate-bounce-subtle">{icon}</span>}
        <span className="text-sm font-medium">{children}</span>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "p-1.5 rounded-full",
              "transition-all duration-200",
              "hover:bg-white/20 active:scale-90",
              "focus:outline-none focus:ring-2 focus:ring-white/30"
            )}
            aria-label="Dismiss announcement"
          >
            <CloseIcon className="w-3.5 h-3.5 opacity-80" />
          </button>
        )}
      </div>
    );
  }
);
AppBarAnnouncement.displayName = "AppBarAnnouncement";

// ============================================================================
// AppBar Title
// ============================================================================

export const AppBarTitle = forwardRef<HTMLDivElement, AppBarTitleProps>(
  ({ children, subtitle, truncate = true, maxWidth, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-center min-w-0",
          "transition-all duration-300",
          className
        )}
        style={{ maxWidth }}
      >
        <h1 className={cn(appBarTitleVariants({ truncate }), "tracking-tight")}>
          {children}
        </h1>
        {subtitle && (
          <span
            className={cn(
              "text-xs sm:text-sm text-muted-foreground/80 truncate mt-0.5",
              "transition-all duration-300"
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    );
  }
);
AppBarTitle.displayName = "AppBarTitle";

// ============================================================================
// AppBar Breadcrumbs
// ============================================================================

export const AppBarBreadcrumbs = forwardRef<
  HTMLElement,
  AppBarBreadcrumbsProps
>(({ items, separator, maxItems = 4, className }, ref) => {
  const displayItems =
    items.length > maxItems
      ? [
          items[0],
          { label: "...", href: undefined },
          ...items.slice(-(maxItems - 2)),
        ]
      : items;

  return (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex items-center gap-0.5 text-sm flex-wrap">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;

          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-0.5 min-w-0",
                "animate-in fade-in slide-in-from-left-2 duration-300"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {index > 0 && (
                <span
                  className="text-muted-foreground/30 mx-1"
                  aria-hidden="true"
                >
                  {separator || <ChevronRightIcon />}
                </span>
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center gap-1.5 px-1.5 py-0.5 -mx-1.5 rounded-md",
                    "text-muted-foreground",
                    "transition-all duration-200",
                    "hover:text-foreground hover:bg-muted/60",
                    "focus:outline-none focus:text-foreground focus:bg-muted/60",
                    "truncate max-w-[120px] sm:max-w-[150px]"
                  )}
                >
                  {item.icon && (
                    <span className="shrink-0 opacity-60">{item.icon}</span>
                  )}
                  <span className="truncate">{item.label}</span>
                </a>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5 px-1.5 py-0.5 rounded-md truncate",
                    isLast
                      ? "text-foreground font-medium max-w-[150px] sm:max-w-[200px]"
                      : "text-muted-foreground max-w-[120px] sm:max-w-[150px]"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && (
                    <span className="shrink-0 opacity-60">{item.icon}</span>
                  )}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
AppBarBreadcrumbs.displayName = "AppBarBreadcrumbs";

// ============================================================================
// Skip to Content
// ============================================================================

export const SkipToContent = forwardRef<HTMLAnchorElement, SkipToContentProps>(
  (
    { label = "Skip to main content", targetId = "main-content", className },
    ref
  ) => {
    return (
      <a
        ref={ref}
        href={`#${targetId}`}
        className={cn(skipToContentVariants(), className)}
      >
        {label}
      </a>
    );
  }
);
SkipToContent.displayName = "SkipToContent";

// ============================================================================
// AppBar Slot
// ============================================================================

interface AppBarSlotProps {
  children: React.ReactNode;
  position?: "start" | "center" | "end";
  className?: string;
}

export const AppBarSlot = forwardRef<HTMLDivElement, AppBarSlotProps>(
  ({ children, position = "start", className }, ref) => {
    if (!children) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(appBarSlotVariants({ position }), className)}
      >
        {children}
      </div>
    );
  }
);
AppBarSlot.displayName = "AppBarSlot";

// ============================================================================
// Back Button
// ============================================================================

interface AppBarBackButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export const AppBarBackButton = forwardRef<
  HTMLButtonElement,
  AppBarBackButtonProps
>(({ onClick, icon, label = "Back", className }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "group",
        "inline-flex items-center justify-center gap-1",
        "p-2 -ml-2 rounded-xl",
        "transition-all duration-200 ease-out",
        "hover:bg-muted/80 active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={label}
    >
      {icon || <ArrowLeftIcon />}
    </button>
  );
});
AppBarBackButton.displayName = "AppBarBackButton";

// ============================================================================
// Mobile Menu Button - Smooth Hamburger Animation
// ============================================================================

interface AppBarMenuButtonProps {
  open?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AppBarMenuButton = forwardRef<
  HTMLButtonElement,
  AppBarMenuButtonProps
>(({ open = false, onClick, className }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "relative p-2.5 -ml-2 rounded-xl",
        "transition-all duration-300 ease-out",
        "hover:bg-muted/80",
        "active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Top line */}
        <span
          className={cn(
            "absolute h-[2px] rounded-full bg-current",
            "transition-all duration-300",
            "ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]",
            open
              ? "w-5 rotate-45 translate-y-0"
              : "w-5 rotate-0 -translate-y-[6px]"
          )}
        />
        {/* Middle line */}
        <span
          className={cn(
            "absolute h-[2px] rounded-full bg-current",
            "transition-all duration-200 ease-out",
            open ? "w-0 opacity-0" : "w-5 opacity-100"
          )}
        />
        {/* Bottom line */}
        <span
          className={cn(
            "absolute h-[2px] rounded-full bg-current",
            "transition-all duration-300",
            "ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]",
            open
              ? "w-5 -rotate-45 translate-y-0"
              : "w-5 rotate-0 translate-y-[6px]"
          )}
        />
      </div>
    </button>
  );
});
AppBarMenuButton.displayName = "AppBarMenuButton";

// ============================================================================
// Mobile Menu Drawer - Full featured animated drawer
// ============================================================================

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
  overlayClassName?: string;
}

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (
    { open, onClose, children, side = "left", className, overlayClassName },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle mounting for portal
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    // Handle body scroll lock
    useEffect(() => {
      if (open) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        setIsAnimating(true);
      } else {
        // Delay removing scroll lock until animation completes
        const timer = setTimeout(() => {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
          setIsAnimating(false);
        }, 300);
        return () => clearTimeout(timer);
      }

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }, [open]);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    // Focus trap
    useEffect(() => {
      if (!open || !menuRef.current) {
        return undefined;
      }

      const menu = menuRef.current;
      const focusableElements = menu.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      menu.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => {
        menu.removeEventListener("keydown", handleTab);
      };
    }, [open]);

    if (!mounted) {
      return null;
    }

    if (!open && !isAnimating) {
      return null;
    }

    return createPortal(
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50",
          !open && !isAnimating && "pointer-events-none"
        )}
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm",
            "transition-opacity duration-300 ease-out",
            open ? "opacity-100" : "opacity-0",
            overlayClassName
          )}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          ref={menuRef}
          className={cn(
            "absolute top-0 bottom-0 w-[280px] sm:w-[320px]",
            "bg-background",
            "shadow-2xl shadow-black/20",
            "flex flex-col",
            "transition-transform duration-300",
            "ease-[cubic-bezier(0.32,0.72,0,1)]",
            // Position
            side === "left" ? "left-0" : "right-0",
            // Animation
            side === "left"
              ? open
                ? "translate-x-0"
                : "-translate-x-full"
              : open
              ? "translate-x-0"
              : "translate-x-full",
            className
          )}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);
MobileMenu.displayName = "MobileMenu";

// ============================================================================
// Mobile Menu Header
// ============================================================================

interface MobileMenuHeaderProps {
  children?: React.ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  className?: string;
}

export const MobileMenuHeader = forwardRef<
  HTMLDivElement,
  MobileMenuHeaderProps
>(({ children, onClose, showClose = true, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between",
        "px-4 py-3",
        "border-b border-border/50",
        className
      )}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {showClose && onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "p-2 -mr-2 rounded-xl",
            "transition-all duration-200",
            "hover:bg-muted/80 active:scale-95",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Close menu"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
});
MobileMenuHeader.displayName = "MobileMenuHeader";

// ============================================================================
// Mobile Menu Body
// ============================================================================

interface MobileMenuBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileMenuBody = forwardRef<HTMLDivElement, MobileMenuBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex-1 overflow-y-auto py-2", className)}>
        {children}
      </div>
    );
  }
);
MobileMenuBody.displayName = "MobileMenuBody";

// ============================================================================
// Mobile Menu Footer
// ============================================================================

interface MobileMenuFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileMenuFooter = forwardRef<
  HTMLDivElement,
  MobileMenuFooterProps
>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("px-4 py-3 border-t border-border/50 mt-auto", className)}
    >
      {children}
    </div>
  );
});
MobileMenuFooter.displayName = "MobileMenuFooter";

// ============================================================================
// Mobile Menu Item - Animated menu item
// ============================================================================

interface MobileMenuItemProps {
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export const MobileMenuItem = forwardRef<
  HTMLAnchorElement,
  MobileMenuItemProps
>(
  (
    { children, href, icon, active, disabled, onClick, className, delay = 0 },
    ref
  ) => {
    const Component = href ? "a" : "button";

    return (
      <Component
        ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full flex items-center gap-3",
          "px-4 py-3 mx-2 rounded-xl",
          "text-left text-sm font-medium",
          "transition-all duration-200",
          // Animation
          "animate-in fade-in slide-in-from-left-4",
          "fill-mode-both",
          // States
          active
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-muted/80 active:bg-muted",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        style={{
          animationDelay: `${delay}ms`,
          animationDuration: "400ms",
        }}
      >
        {icon && (
          <span
            className={cn(
              "w-5 h-5 flex items-center justify-center shrink-0",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            {icon}
          </span>
        )}
        <span className="flex-1 truncate">{children}</span>
        {active && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-in zoom-in duration-300" />
        )}
      </Component>
    );
  }
);
MobileMenuItem.displayName = "MobileMenuItem";

// ============================================================================
// Mobile Menu Divider
// ============================================================================

interface MobileMenuDividerProps {
  className?: string;
}

export const MobileMenuDivider = forwardRef<
  HTMLDivElement,
  MobileMenuDividerProps
>(({ className }, ref) => {
  return (
    <div ref={ref} className={cn("my-2 mx-4 h-px bg-border/50", className)} />
  );
});
MobileMenuDivider.displayName = "MobileMenuDivider";

// ============================================================================
// Mobile Menu Label
// ============================================================================

interface MobileMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileMenuLabel = forwardRef<HTMLDivElement, MobileMenuLabelProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-6 py-2 text-xs font-semibold uppercase tracking-wider",
          "text-muted-foreground/70",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
MobileMenuLabel.displayName = "MobileMenuLabel";

// ============================================================================
// AppBar Divider
// ============================================================================

interface AppBarDividerProps {
  className?: string;
}

export const AppBarDivider = forwardRef<HTMLDivElement, AppBarDividerProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-px h-5",
          "bg-gradient-to-b from-transparent via-border/60 to-transparent",
          "mx-1.5 sm:mx-2.5",
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }
);
AppBarDivider.displayName = "AppBarDivider";

// ============================================================================
// AppBar Action Button
// ============================================================================

interface AppBarActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  badge?: number | string;
  badgeColor?: string;
  className?: string;
  "aria-label"?: string;
}

export const AppBarAction = forwardRef<HTMLButtonElement, AppBarActionProps>(
  (
    {
      children,
      onClick,
      badge,
      badgeColor,
      className,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const showBadge = badge !== undefined && badge !== 0;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(appBarActionVariants({ size: "md" }), "group", className)}
        aria-label={ariaLabel}
      >
        <span className="transition-transform duration-200 group-hover:scale-110">
          {children}
        </span>
        {showBadge && (
          <span
            className={cn(appBarBadgeVariants())}
            style={{ backgroundColor: badgeColor }}
          >
            {typeof badge === "number" && badge > 99 ? "99+" : badge}
          </span>
        )}
      </button>
    );
  }
);
AppBarAction.displayName = "AppBarAction";
