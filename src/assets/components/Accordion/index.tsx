import React, { useCallback, useState } from "react";
import AccordionItem from "./AccordionItem";

type AccordionVariant =
    | "default"
    | "controlled"
    | "allopen"
    | "toggle"
    | "firstopen";

interface AccordionProps {
    variant: AccordionVariant;

    items: { title: string; content: string }[];
}

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
          return [
            true,
            ...Array.from({ length: items.length - 1 }, () => false),
          ]; // First item open, others closed
        default:
          return [];
      }
    });


const handleAccordionClick = useCallback((index: number) => {
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
},[]);


    return (
      <div>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            isOpen={isOpen[index]}
            onClick={() => handleAccordionClick(index)}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>
    );
};

export default Accordion;




