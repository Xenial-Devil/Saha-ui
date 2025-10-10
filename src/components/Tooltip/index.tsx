interface TooltipProps {
  content: string; // The text/content to display in the tooltip
  children: React.ReactNode; // The element the tooltip is attached to
  position?: "top" | "bottom" | "left" | "right"; // Tooltip position
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`absolute whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${positionClasses[position]}`}
      >
        {content}
      </div>
    </div>
  );
};
