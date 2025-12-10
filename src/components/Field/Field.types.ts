export type FieldSize = "sm" | "md" | "lg";
export type FieldVariant =
  | "default"
  | "filled"
  | "outlined"
  | "ghost"
  | "glass"
  | "primary"
  | "success"
  | "warning"
  | "error";

export type FieldOrientation = "vertical" | "horizontal";
export type FieldLabelPosition = "top" | "left" | "right";

export interface FieldSetProps
  extends React.HTMLAttributes<HTMLFieldSetElement> {
  variant?: FieldVariant;
  size?: FieldSize;
  disabled?: boolean;
  legend?: string;
  children?: React.ReactNode;
}

export interface FieldGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: FieldOrientation;
  /**
   * Spacing between field items
   * Accepts predefined tokens, numbers (px), or string with units
   * @example
   * <FieldGroup spacing="md">Token spacing</FieldGroup>
   * <FieldGroup spacing={16}>16px spacing</FieldGroup>
   * <FieldGroup spacing="1rem">Custom spacing</FieldGroup>
   */
  spacing?: "none" | "sm" | "md" | "lg" | "xl" | number | string;
  columns?: 1 | 2 | 3 | 4;
  children?: React.ReactNode;
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  // Styling
  variant?: FieldVariant;
  size?: FieldSize;

  // Layout
  orientation?: FieldOrientation;
  labelPosition?: FieldLabelPosition;

  // States
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  readOnly?: boolean;

  // Content (Props API)
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  hint?: string;

  // Accessibility
  htmlFor?: string;
  id?: string;

  // Child element (Props API)
  children?: React.ReactNode;

  // Advanced features
  showOptional?: boolean;
  showRequired?: boolean;
  asteriskPosition?: "before" | "after";

  // Custom rendering
  renderLabel?: (props: FieldLabelProps) => React.ReactNode;
  renderDescription?: (props: FieldDescriptionProps) => React.ReactNode;
  renderError?: (props: FieldErrorProps) => React.ReactNode;
  renderHint?: (props: FieldHintProps) => React.ReactNode;
}

export interface FieldLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: FieldSize;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  asteriskPosition?: "before" | "after";
  children?: React.ReactNode;
}

export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: FieldSize;
  variant?: FieldVariant;
  children?: React.ReactNode;
}

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: FieldSize;
  children?: React.ReactNode;
}

export interface FieldHintProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: FieldSize;
  children?: React.ReactNode;
}
