// Color palette component that uses theme colors from CSS variables
const ColorPalette = () => {
  const colors = [
    { name: "Primary", var: "--primary", fg: "--primary-foreground" },
    { name: "Secondary", var: "--secondary", fg: "--secondary-foreground" },
    { name: "Accent", var: "--accent", fg: "--accent-foreground" },
    { name: "Success", var: "--success", fg: "--success-foreground" },
    { name: "Warning", var: "--warning", fg: "--warning-foreground" },
    { name: "Error", var: "--error", fg: "--error-foreground" },
    { name: "Info", var: "--info", fg: "--info-foreground" },
    { name: "Muted", var: "--muted", fg: "--muted-foreground" },
    { name: "Card", var: "--card", fg: "--card-foreground" },
    { name: "Popover", var: "--popover", fg: "--popover-foreground" },
    { name: "Border", var: "--border", fg: "--foreground" },
    { name: "Ring", var: "--ring", fg: "--foreground" },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">Color Palette</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map(({ name, var: colorVar, fg }) => (
          <div key={name} className="glass p-4 rounded-lg">
            <div
              className="w-full h-16 rounded-md mb-2 flex items-center justify-center text-sm font-medium shadow-sm"
              style={{
                backgroundColor: `var(${colorVar})`,
                color: `var(${fg})`,
              }}
            >
              {name}
            </div>
            <p className="text-xs font-mono opacity-70">{colorVar}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
