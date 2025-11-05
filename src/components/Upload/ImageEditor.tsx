"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import type { CropData } from "./Upload.types";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  X,
  Check,
  Maximize2,
} from "lucide-react";

interface ImageEditorProps {
  imageUrl: string;
  onSave: (cropData: CropData, croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export const ImageEditor = ({
  imageUrl,
  onSave,
  onCancel,
  aspectRatio,
}: ImageEditorProps) => {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialScale, setInitialScale] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      imageRef.current = img;

      // Calculate initial scale to fit image in canvas
      const containerWidth = containerRef.current?.clientWidth || 600;
      const containerHeight = containerRef.current?.clientHeight || 400;

      const scaleX = (containerWidth * 0.9) / img.width;
      const scaleY = (containerHeight * 0.9) / img.height;
      const fitScale = Math.min(scaleX, scaleY);

      setInitialScale(fitScale);
      setScale(fitScale);
      drawCanvas();
    };
  }, [imageUrl]);

  useEffect(() => {
    drawCanvas();
  }, [scale, rotate, position]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const containerWidth = containerRef.current?.clientWidth || 600;
    const containerHeight = containerRef.current?.clientHeight || 400;
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Move to center
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply rotation
    ctx.rotate((rotate * Math.PI) / 180);

    // Apply scale and position
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    ctx.drawImage(
      img,
      -scaledWidth / 2 + position.x,
      -scaledHeight / 2 + position.y,
      scaledWidth,
      scaledHeight
    );

    // Restore context after drawing image
    ctx.restore();

    // Draw crop overlay if aspect ratio is set
    if (aspectRatio) {
      // Calculate crop area
      const cropWidth = Math.min(
        canvas.width * 0.8,
        canvas.height * 0.8 * aspectRatio
      );
      const cropHeight = cropWidth / aspectRatio;
      const cropX = (canvas.width - cropWidth) / 2;
      const cropY = (canvas.height - cropHeight) / 2;

      // Draw semi-transparent overlay around crop area (not over it)
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

      // Top bar
      ctx.fillRect(0, 0, canvas.width, cropY);

      // Bottom bar
      ctx.fillRect(
        0,
        cropY + cropHeight,
        canvas.width,
        canvas.height - cropY - cropHeight
      );

      // Left bar
      ctx.fillRect(0, cropY, cropX, cropHeight);

      // Right bar
      ctx.fillRect(
        cropX + cropWidth,
        cropY,
        canvas.width - cropX - cropWidth,
        cropHeight
      );

      // Draw crop border
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);

      // Draw corner handles
      const handleSize = 8;
      ctx.fillStyle = "#fff";
      [
        [cropX, cropY],
        [cropX + cropWidth, cropY],
        [cropX, cropY + cropHeight],
        [cropX + cropWidth, cropY + cropHeight],
      ].forEach(([x, y]) => {
        ctx.fillRect(
          x - handleSize / 2,
          y - handleSize / 2,
          handleSize,
          handleSize
        );
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 5)); // Max 500%
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.01)); // Min 1%
  };

  const handleRotateLeft = () => {
    setRotate((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotate((prev) => prev + 90);
  };

  const handleReset = () => {
    setScale(initialScale); // Reset to initial fit scale
    setRotate(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get crop area
    let cropX = 0;
    let cropY = 0;
    let cropWidth = canvas.width;
    let cropHeight = canvas.height;

    if (aspectRatio) {
      cropWidth = Math.min(
        canvas.width * 0.8,
        canvas.height * 0.8 * aspectRatio
      );
      cropHeight = cropWidth / aspectRatio;
      cropX = (canvas.width - cropWidth) / 2;
      cropY = (canvas.height - cropHeight) / 2;
    }

    // Create cropped canvas
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;
    const ctx = croppedCanvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        canvas,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const croppedImage = croppedCanvas.toDataURL("image/png");
      const cropData: CropData = {
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight,
        scale,
        rotate,
      };

      onSave(cropData, croppedImage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-full bg-background rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <h3 className="text-lg font-semibold text-foreground">Edit Image</h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Canvas Area */}
        <div
          ref={containerRef}
          className="relative w-full flex-1 min-h-0 bg-muted/30 overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <canvas
            ref={canvasRef}
            className={cn(
              "w-full h-full",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          />
        </div>

        {/* Controls */}
        <div className="space-y-3 p-3 sm:p-4 border-t border-border bg-muted/20 shrink-0 overflow-y-auto max-h-[40vh]">
          {/* Zoom Slider */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleZoomOut}
              className="p-1.5 sm:p-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors shrink-0"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            <div className="flex-1 flex items-center gap-2 min-w-0">
              <input
                type="range"
                min="1"
                max="500"
                value={Math.round(scale * 100)}
                onChange={(e) => setScale(Number(e.target.value) / 100)}
                className="flex-1 min-w-0 h-2 bg-muted rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-4 
                  [&::-moz-range-thumb]:h-4 
                  [&::-moz-range-thumb]:rounded-full 
                  [&::-moz-range-thumb]:bg-primary
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-medium min-w-[50px] sm:min-w-[60px] text-center bg-background border border-border rounded px-2 py-1 shrink-0">
                {Math.round(scale * 100)}%
              </span>
            </div>

            <button
              onClick={handleZoomIn}
              className="p-1.5 sm:p-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors shrink-0"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          {/* Other Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Rotation Controls */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-background border border-border">
                <button
                  onClick={handleRotateLeft}
                  className="p-1.5 sm:p-2 rounded hover:bg-muted transition-colors"
                  title="Rotate Left"
                >
                  <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <span className="px-2 sm:px-3 text-xs sm:text-sm font-medium min-w-[50px] sm:min-w-[60px] text-center">
                  {rotate}°
                </span>
                <button
                  onClick={handleRotateRight}
                  className="p-1.5 sm:p-2 rounded hover:bg-muted transition-colors"
                  title="Rotate Right"
                >
                  <RotateCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                title="Reset"
              >
                <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
