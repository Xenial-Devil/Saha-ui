import React, { memo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";
import "./index.scss";
import { AccordionItemProps } from "./Accordion.types";

// CVA variants for accordion item
const accordionItemVariants = cva(
  "group relative w-full overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      isOpen: {
        true: "bg-card/50",
        false: "bg-card/30 hover:bg-card/40",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

const accordionHeaderVariants = cva(
  "w-full flex justify-between items-center cursor-pointer transition-all duration-300 px-6 py-4 gap-4",
  {
    variants: {
      isOpen: {
        true: "bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b border-border/50",
        false: "hover:bg-muted/30 active:scale-[0.99]",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

const accordionContentVariants = cva(
  "w-full px-6 overflow-hidden transition-all duration-500 ease-in-out bg-card/20",
  {
    variants: {
      isOpen: {
        true: "max-h-[500px] opacity-100 py-4",
        false: "max-h-0 opacity-0 py-0",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen,
  onClick,
  title,
  content,
}) => {
  return (
    <div
      className={cn(
        accordionItemVariants({ isOpen }),
        "border-b border-border/30 last:border-b-0 backdrop-blur-sm",
        "shadow-sm hover:shadow-md transition-shadow"
      )}
    >
      <div
        className={cn(accordionHeaderVariants({ isOpen }))}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
      >
        <h3 className="text-base font-semibold text-foreground tracking-wide flex-1">
          {title}
        </h3>
        <div className="relative">
          {/* Glow effect on icon */}
          <div
            className={cn(
              "absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-md opacity-0 transition-opacity duration-300",
              isOpen && "opacity-100"
            )}
          />
          <ChevronDown
            className={cn(
              "relative h-5 w-5 transition-all duration-500 ease-out",
              isOpen
                ? "rotate-180 text-primary"
                : "rotate-0 text-muted-foreground group-hover:text-foreground"
            )}
          />
        </div>
      </div>
      <div className={cn(accordionContentVariants({ isOpen }))}>
        <div
          className={cn(
            "text-muted-foreground leading-relaxed transition-all duration-300",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default memo(AccordionItem);
