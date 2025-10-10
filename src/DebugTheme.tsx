import { useTheme } from "./components/ThemeProvider";

export function DebugTheme() {
  const { theme } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 glass p-4 rounded-lg z-50">
      <div className="text-sm font-mono">
        <div>
          <strong>Current Theme:</strong> {theme}
        </div>
        <div>
          <strong>HTML Class:</strong> {document.documentElement.className}
        </div>
        <div className="mt-2">
          <div className="w-20 h-8 bg-background border border-border"></div>
          <div className="text-xs mt-1">Background Color</div>
        </div>
        <div className="mt-2">
          <div className="w-20 h-8 bg-primary"></div>
          <div className="text-xs mt-1">Primary Color</div>
        </div>
      </div>
    </div>
  );
}
