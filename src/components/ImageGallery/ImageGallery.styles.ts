import { cva } from "class-variance-authority";

export const imageGalleryVariants = cva("grid", {
  variants: {
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    }
  },
  defaultVariants: {
    gap: "md"
  }
});

export const imageGalleryItemVariants = cva(
  "relative overflow-hidden group",
  {
    variants: {
      enableLightbox: {
        true: "cursor-pointer",
      }
    }
  }
);
export const imageGalleryImageVariants = cva(
  "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
);
export const imageGalleryCaptionVariants = cva(
  "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-end"
);
export const imageGalleryCaptionTextVariants = cva(
  "text-white text-sm line-clamp-2"
);

export const lightboxDialogContentVariants = cva(
  "max-w-[90vw] max-h-[90vh] p-1 bg-black/95 border-border/10 overflow-hidden flex flex-col justify-center hide-close"
);
export const lightboxContainerVariants = cva(
  "relative flex-1 flex items-center justify-center p-4"
);
export const lightboxImageVariants = cva(
  "max-h-[75vh] w-auto object-contain mx-auto"
);
export const lightboxCaptionVariants = cva(
  "absolute bottom-6 bg-black/50 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-sm shadow-xl"
);
export const lightboxNavButtonVariants = cva(
  "absolute top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-3 rounded-full text-white transition-all shadow-lg border border-white/10",
  {
    variants: {
      dir: {
        left: "left-4",
        right: "right-4",
      }
    }
  }
);

export const lightboxThumbstripVariants = cva(
  "h-20 w-full overflow-x-auto flex gap-2 p-2 border-t border-white/10 snap-x justify-center"
);
export const lightboxThumbBtnVariants = cva(
  "relative shrink-0 w-16 h-16 rounded-md overflow-hidden snap-center transition-all opacity-50 hover:opacity-100",
  {
    variants: {
      active: {
        true: "ring-2 ring-primary opacity-100 scale-105"
      }
    }
  }
);
