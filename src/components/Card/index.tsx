import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

// CVA variants for Card
const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-card/95 shadow-[0_4px_20px_0] shadow-black/5 dark:shadow-black/20 border border-border/30 backdrop-blur-sm hover:shadow-[0_8px_30px_0] hover:shadow-black/10 dark:hover:shadow-black/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        glass:
          "glass backdrop-blur-2xl shadow-[0_8px_32px_0] shadow-black/10 dark:shadow-black/30 hover:shadow-[0_12px_48px_0] hover:shadow-primary/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "glass-strong":
          "glass-strong backdrop-blur-3xl shadow-[0_12px_48px_0] shadow-black/15 dark:shadow-black/40 hover:shadow-[0_16px_64px_0] hover:shadow-primary/25 border-2 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "glass-subtle":
          "glass-subtle backdrop-blur-sm shadow-[0_2px_12px_0] shadow-black/5 dark:shadow-black/20 hover:shadow-[0_4px_20px_0] hover:shadow-primary/15 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        bordered:
          "bg-card/90 border-2 border-border/50 shadow-sm hover:border-primary/40 hover:shadow-[0_4px_24px_0] hover:shadow-primary/10 backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/3 before:to-accent/3 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
      },
      hoverable: {
        true: "hover:scale-[1.02] cursor-pointer active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "lg",
      hoverable: false,
    },
  }
);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant,
      padding,
      rounded,
      hoverable,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, rounded, hoverable }),
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Content wrapper with proper z-index */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h3
      className={cn(
        "text-xl font-semibold text-foreground tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground mt-1.5 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => {
  return <div className={cn("text-foreground", className)}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-border/50 flex items-center gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
