export type SliderSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type SliderVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "glass";

export type SliderOrientation = "horizontal" | "vertical";

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  // Value control
  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  onChangeCommitted?: (value: number | number[]) => void;

  // Range
  min?: number;
  max?: number;
  step?: number;

  // Appearance
  variant?: SliderVariant;
  size?: SliderSize;
  orientation?: SliderOrientation;

  // Features
  disabled?: boolean;
  marks?: boolean | SliderMark[];
  showValue?: boolean;
  showTooltip?: boolean;
  tooltipFormat?: (value: number) => string;
  range?: boolean;

  // Labels
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;

  // Styling
  trackColor?: string;
  thumbColor?: string;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;

  // Advanced
  valueLabelDisplay?: "auto" | "on" | "off";
  getAriaLabel?: (index: number) => string;
  getAriaValueText?: (value: number, index: number) => string;
  name?: string;
  id?: string;

  // Composable API
  children?: React.ReactNode;
}
