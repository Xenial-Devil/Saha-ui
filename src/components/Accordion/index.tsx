import React, { useCallback, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import AccordionItem from "./AccordionItem";
import { AccordionProps } from "./Accordion.types";

// CVA variants for accordion container
const accordionVariants = cva(
  "w-full space-y-0 rounded-2xl overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        controlled:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        allopen:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        toggle: "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
        firstopen:
          "border border-border/50 shadow-lg backdrop-blur-sm bg-card/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Accordion: React.FC<AccordionProps> = ({ variant, items }) => {
  const [isOpen, setIsOpen] = useState<boolean[]>(() => {
    switch (variant) {
      case "default":
        return []; // All items closed by default
      case "controlled":
        return [false]; // All items closed by default
      case "allopen":
        return Array.from({ length: items.length }, () => true); // All items open by default
      case "toggle":
        return [false]; // All items closed by default
      case "firstopen":
        return [true, ...Array.from({ length: items.length - 1 }, () => false)]; // First item open, others closed
      default:
        return [];
    }
  });

  const handleAccordionClick = useCallback(
    (index: number) => {
      switch (variant) {
        case "default": {
          const newIsOpen = [...isOpen];
          newIsOpen[index] = !newIsOpen[index];
          setIsOpen(newIsOpen);
          break;
        }
        case "controlled": {
          const newIsOpen = Array.from({ length: items.length }, () => false);
          newIsOpen[index] = true; // Open the clicked item
          setIsOpen(newIsOpen); // Set the selected variant
          break;
        }

        case "allopen": {
          const newIsOpen = [...isOpen];
          newIsOpen[index] = !newIsOpen[index];
          setIsOpen(newIsOpen);
          break;
        }
        case "toggle": {
          const newIsOpen = [...isOpen];
          if (isOpen[index]) {
            newIsOpen[index] = false; // Close the clicked item if it's already open
          } else {
            newIsOpen.fill(false); // Close all other items
            newIsOpen[index] = true; // Open the clicked item
          }
          setIsOpen(newIsOpen);
          break;
        }

        case "firstopen": {
          const newIsOpen = Array.from({ length: items.length }, () => false);
          newIsOpen[index] = true; // Keep the first item open // Toggle the clicked item if it's the first
          setIsOpen(newIsOpen);
          break;
        }
        default:
          break;
      }
    },
    [variant, isOpen, items.length]
  );

  return (
    <div className={cn(accordionVariants({ variant }))}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          isOpen={isOpen[index]}
          onClick={() => handleAccordionClick(index)}
          title={item.title}
          content={item.content}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default Accordion;
