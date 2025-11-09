import { cva } from "class-variance-authority";

export const colorPickerVariants = cva(
  "inline-flex items-center gap-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export const colorPickerTriggerVariants = cva(
  "inline-flex items-center gap-2 rounded-md border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-3",
        lg: "h-12 px-4",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer hover:bg-accent",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export const colorPickerSwatchVariants = cva(
  "relative rounded border-2 border-border overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-8 w-8",
      },
      interactive: {
        true: "cursor-pointer hover:scale-110 transition-transform",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      interactive: false,
    },
  }
);

export const colorPickerPopoverVariants = cva(
  "z-50 w-64 rounded-lg border bg-popover p-4 shadow-lg outline-none animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      placement: {
        top: "slide-in-from-bottom-2",
        "top-start": "slide-in-from-bottom-2",
        "top-end": "slide-in-from-bottom-2",
        bottom: "slide-in-from-top-2",
        "bottom-start": "slide-in-from-top-2",
        "bottom-end": "slide-in-from-top-2",
      },
    },
    defaultVariants: {
      placement: "bottom-start",
    },
  }
);

export const colorPickerSaturationVariants = cva(
  "relative h-40 w-full rounded-md cursor-crosshair select-none mb-3 overflow-hidden",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerHueSliderVariants = cva(
  "relative h-3 w-full rounded-full cursor-pointer select-none mb-3",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerAlphaSliderVariants = cva(
  "relative h-3 w-full rounded-full cursor-pointer select-none mb-3",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerInputVariants = cva(
  "w-full h-9 px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const colorPickerPresetGroupVariants = cva(
  "space-y-2",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerPresetGroupTitleVariants = cva(
  "text-xs font-medium text-muted-foreground mb-2",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerPresetColorsVariants = cva(
  "grid grid-cols-8 gap-2",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerPresetColorVariants = cva(
  "relative h-6 w-6 rounded cursor-pointer border-2 border-transparent hover:border-primary transition-all hover:scale-110 active:scale-95",
  {
    variants: {
      active: {
        true: "border-primary ring-2 ring-primary ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export const colorPickerFormatSwitchVariants = cva(
  "inline-flex items-center justify-center text-xs font-medium px-2 py-1 rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const colorPickerClearButtonVariants = cva(
  "inline-flex items-center justify-center h-6 w-6 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerPointerVariants = cva(
  "absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const colorPickerSliderThumbVariants = cva(
  "absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none",
  {
    variants: {},
    defaultVariants: {},
  }
);
