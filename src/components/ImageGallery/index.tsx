"use client";

import React, { forwardRef, useState, useMemo } from "react";
import { cn } from "../../lib/utils";
import type { ImageGalleryProps } from "./ImageGallery.types";
import {
  imageGalleryVariants,
  imageGalleryItemVariants,
  imageGalleryImageVariants,
  imageGalleryCaptionVariants,
  imageGalleryCaptionTextVariants,
  lightboxDialogContentVariants,
  lightboxContainerVariants,
  lightboxImageVariants,
  lightboxCaptionVariants,
  lightboxNavButtonVariants,
  lightboxThumbstripVariants,
  lightboxThumbBtnVariants,
} from "./ImageGallery.styles";
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
        <div ref={ref} className={cn(imageGalleryVariants({ gap }), gridColsClass, className)} {...props}>
          {images.map((img, i) => (
            <div 
              key={img.id || i} 
              className={cn(imageGalleryItemVariants({ enableLightbox }))}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={img.thumbnailSrc || img.src}
                alt={img.alt}
                className={imageGalleryImageVariants()}
                aspectRatio="square"
                onClick={img.onClick as any}
              />
              {img.caption && (
                <div className={imageGalleryCaptionVariants()}>
                  <span className={imageGalleryCaptionTextVariants()}>{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        {enableLightbox && (
          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent 
              className={lightboxDialogContentVariants()}
              aria-label="Image lightbox"
              state={lightboxOpen ? "open" : "closed"}
            >
              {images.length > 0 && (
                <div className={lightboxContainerVariants()}>
                  <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className={lightboxImageVariants()}
                  />
                  
                  {images[currentIndex].caption && (
                    <div className={lightboxCaptionVariants()}>
                      {images[currentIndex].caption}
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className={lightboxNavButtonVariants({ dir: "left" })}
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className={lightboxNavButtonVariants({ dir: "right" })}
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
                <div className={lightboxThumbstripVariants()}>
                  {images.map((img, i) => (
                    <button
                      key={`thumb-${img.id || i}`}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={cn(lightboxThumbBtnVariants({ active: currentIndex === i }))}
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
