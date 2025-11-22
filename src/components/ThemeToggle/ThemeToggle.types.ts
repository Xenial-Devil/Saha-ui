export interface ThemeToggleProps {
  className?: string;
  size?: number;
  variant?: "icon" | "icon-label";
  /**
   * Text/icon color variant for the toggle
   */
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "neutral";
  /**
   * Visual appearance for the button
   */
  appearance?: "default" | "glass";
  // Menu customization: allow overriding dropdown background, border and text color
  menuBg?: "default" | "white" | "primary" | "neutral";
  menuBorder?: "default" | "none" | "primary" | "neutral";
  menuText?: "default" | "primary" | "neutral";
  // Direct class override: a string of Tailwind classes to apply to the dropdown menu.
  // When provided, this will be used instead of combining `menuBg`/`menuBorder`/`menuText`.
  menuClassName?: string;
}
