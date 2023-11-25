import React from "react";
import "./index.scss";

interface AccordionItemProps {
  isOpen: boolean;
  onClick: () => void;
  title: string;
  content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen,
  onClick,
  title,
  content,
}) => {
  return (
    <div className="w-full overscroll-none box-border transition-[height] Accordion">
      <div
        className="w-full flex justify-between items-center cursor-pointer bg-gray-200 text-gray-600 dark:text-gray-100 dark:bg-gray-900"
        onClick={onClick}
      >
        <h2>{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
          className={`fill-current text-gray-600 dark:text-gray-100 transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fill="currentColor"
            d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </div>
      <div className={`w-full ${isOpen ? "open" : "closed"} transition-[height]`}>
        {content}
      </div>
    </div>
  );
};

export default AccordionItem;
