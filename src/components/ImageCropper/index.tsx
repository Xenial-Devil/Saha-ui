"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../../lib/utils";
import type { ImageCropperProps, Point } from "./ImageCropper.types";
import { cropperContainerVariants, cropperAreaVariants } from "./ImageCropper.styles";

/**
 * ImageCropper Component
 *
 * A lightweight, native image cropper with pan and zoom.
 * Generates a Data URL and Blob upon cropping.
 *
 * @example
 * ```tsx
 * <ImageCropper
 *   image="https://example.com/image.jpg"
 *   aspect={1}
 *   shape="round"
 *   onCropComplete={(url, blob) => setAvatar(url)}
 * />
 * ```
 */
export const ImageCropper = React.forwardRef<HTMLDivElement, ImageCropperProps>(
  (
    {
      image,
      onCropComplete,
      onCancel,
      aspect = 1,
      shape = "rect",
      disabled = false,
      className,
      ...props
    },
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const [zoom, setZoom] = useState(1);
    const [translation, setTranslation] = useState<Point>({ x: 0, y: 0 });
    
    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef<Point>({ x: 0, y: 0 });

    // Handle mouse events for panning
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStartRef.current = { x: clientX - translation.x, y: clientY - translation.y };
    };

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
      if (!isDragging || disabled) return;
      e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      setTranslation({
        x: clientX - dragStartRef.current.x,
        y: clientY - dragStartRef.current.y,
      });
    }, [isDragging, disabled]);

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove, { passive: false });
        window.addEventListener("touchmove", handleMouseMove, { passive: false });
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchend", handleMouseUp);
      }
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Handle wheel for zooming
    const handleWheel = (e: React.WheelEvent) => {
      if (disabled) return;
      e.preventDefault();
      const newZoom = Math.min(Math.max(1, zoom - e.deltaY * 0.001), 3);
      setZoom(newZoom);
    };

    const generateCrop = async () => {
      if (!imgRef.current || !containerRef.current || !onCropComplete) return;

      const container = containerRef.current.getBoundingClientRect();
      const img = imgRef.current;
      
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const scaleX = naturalWidth / img.width;
      const scaleY = naturalHeight / img.height;

      // Container size dictates max safe area based on aspect
      let cropWidth = container.width;
      let cropHeight = container.width / aspect;
      
      if (cropHeight > container.height) {
        cropHeight = container.height;
        cropWidth = container.height * aspect;
      }

      // 80% of container size to leave margin
      cropWidth *= 0.8;
      cropHeight *= 0.8;

      // Coordinate calc:
      // The visual image is scaled by 'zoom' and translated by 'translation'.
      // We must map the static crop rectangle bounding box back into image natural coordinates.
      
      const visualRectLeft = (container.width - cropWidth) / 2;
      const visualRectTop = (container.height - cropHeight) / 2;
      
      // Image renders centered when translation is 0:
      const imgVisualLeft = (container.width - img.width * zoom) / 2 + translation.x;
      const imgVisualTop = (container.height - img.height * zoom) / 2 + translation.y;

      const x = (visualRectLeft - imgVisualLeft) * scaleX / zoom;
      const y = (visualRectTop - imgVisualTop) * scaleY / zoom;
      const width = cropWidth * scaleX / zoom;
      const height = cropHeight * scaleY / zoom;

      // Setup canvas
      const canvas = document.createElement("canvas");
      canvas.width = cropWidth; // Output size 
      canvas.height = cropHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        if (shape === "round") {
            ctx.beginPath();
            ctx.arc(cropWidth / 2, cropHeight / 2, cropWidth / 2, 0, 2 * Math.PI);
            ctx.clip();
        }

        ctx.drawImage(
          img,
          Math.max(0, x),
          Math.max(0, y),
          Math.min(naturalWidth, width),
          Math.min(naturalHeight, height),
          0,
          0,
          cropWidth,
          cropHeight
        );

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        canvas.toBlob((blob) => {
          onCropComplete(dataUrl, blob);
        }, "image/jpeg", 0.9);
      }
    };

    return (
      <div className={cn("flex flex-col gap-4 max-w-lg w-full", className)} {...props}>
        <div 
          ref={containerRef}
          className={cn(cropperContainerVariants(), isDragging ? "cursor-grabbing" : "cursor-grab")}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onWheel={handleWheel}
        >
          {/* Draggable/Zoomable Image */}
          <img
            ref={imgRef}
            src={image}
            alt="Crop content"
            className="max-w-none max-h-none pointer-events-none"
            style={{
              transform: `translate3d(${translation.x}px, ${translation.y}px, 0) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.1s max-out",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {/* Mask Frame (Center Cutout) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div 
               className={cropperAreaVariants({ shape })}
               style={{
                 width: "80%", // max visually
                 aspectRatio: aspect,
                 maxHeight: "80%",
               }}
             />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3 w-full px-2">
             <span className="text-xs font-bold shrink-0">Zoom</span>
             <input 
               title="Zoom"
               type="range"
               min="1"
               max="3"
               step="0.05"
               value={zoom}
               onChange={(e) => setZoom(parseFloat(e.target.value))}
               disabled={disabled}
               className="flex-1 accent-primary"
             />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
              >
                Cancel
              </button>
            )}
            {onCropComplete && (
              <button
                type="button"
                onClick={generateCrop}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                Crop Image
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ImageCropper.displayName = "ImageCropper";

export default ImageCropper;
