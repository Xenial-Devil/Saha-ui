"use client";

import React, { forwardRef, useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import type { ImageGalleryProps } from "./ImageGallery.types";
import Image from "../Image";
import { Dialog, DialogContent } from "../Dialog";

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

/**
 * ImageGallery Component
 *
 * A grid-based image gallery composing Image components and a Dialog lightbox.
 *
 * @example
 * ```tsx
 * const images = [
 *   { src: "/photo1.jpg", alt: "Photo 1" },
 *   { src: "/photo2.jpg", alt: "Photo 2" }
 * ];
 * 
 * <ImageGallery images={images} columns={3} />
 * ```
 */
export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      images,
      columns = 3,
      gap = "md",
      enableLightbox = true,
      showThumbnails = true,
      className,
      ...props
    },
    ref
  ) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const gapClass = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    }[gap];

    // Basic tailwind classes for grid responsive columns
    const gridColsClass = useMemo(() => {
      if (typeof columns === "number") {
        return `grid-cols-${columns}`;
      }
      return cn(
        columns.sm ? `grid-cols-${columns.sm}` : "grid-cols-2",
        columns.md && `md:grid-cols-${columns.md}`,
        columns.lg && `lg:grid-cols-${columns.lg}`,
        columns.xl && `xl:grid-cols-${columns.xl}`
      );
    }, [columns]);

    const openLightbox = (index: number) => {
      if (!enableLightbox) return;
      setCurrentIndex(index);
      setLightboxOpen(true);
    };

    const handleNext = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <>
        {/* Grid View */}
        <div ref={ref} className={cn("grid", gridColsClass, gapClass, className)} {...props}>
          {images.map((img, i) => (
            <div 
              key={img.id || i} 
              className={cn("relative overflow-hidden group", enableLightbox && "cursor-pointer")}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img.thumbnailSrc || img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                aspectRatio="square"
                onClick={img.onClick as any}
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <span className="text-white text-sm line-clamp-2">{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        {enableLightbox && (
          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent 
              className="max-w-[90vw] max-h-[90vh] p-1 bg-black/95 border-border/10 overflow-hidden flex flex-col justify-center hide-close"
              aria-label="Image lightbox"
              state={lightboxOpen ? "open" : "closed"}
            >
              {images.length > 0 && (
                <div className="relative flex-1 flex items-center justify-center p-4">
                  <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className="max-h-[75vh] w-auto object-contain mx-auto"
                  />
                  
                  {images[currentIndex].caption && (
                    <div className="absolute bottom-6 bg-black/50 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-sm shadow-xl">
                      {images[currentIndex].caption}
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-3 rounded-full text-white transition-all shadow-lg border border-white/10"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-3 rounded-full text-white transition-all shadow-lg border border-white/10"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Thumbnails strip */}
              {showThumbnails && images.length > 1 && (
                <div className="h-20 w-full overflow-x-auto flex gap-2 p-2 border-t border-white/10 snap-x justify-center">
                  {images.map((img, i) => (
                    <button
                      key={`thumb-${img.id || i}`}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={cn(
                        "relative shrink-0 w-16 h-16 rounded-md overflow-hidden snap-center transition-all opacity-50 hover:opacity-100",
                        currentIndex === i && "ring-2 ring-primary opacity-100 scale-105"
                      )}
                    >
                      <Image
                        src={img.thumbnailSrc || img.src}
                        alt={`Thumbnail ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }
);

ImageGallery.displayName = "ImageGallery";

export default ImageGallery;
