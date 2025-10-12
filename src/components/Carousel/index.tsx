import React, { useEffect, useRef, useState, useCallback } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { CarouselProps } from "./Carousel.types";
import CarouselItem from "./CarouseImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * CVA variants for Carousel container
 */
const carouselVariants = cva(
  "relative w-full overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]",
  {
    variants: {
      variant: {
        default: "rounded-none",
        contained: "max-w-7xl mx-auto",
        bordered: "rounded-xl border-2 border-border shadow-lg",
        glass:
          "rounded-xl border border-border/30 bg-background/5 backdrop-blur-sm shadow-2xl",
      },
      effect: {
        slide: "",
        fade: "",
        cube: "perspective-1000",
        flip: "perspective-1000",
      },
    },
    defaultVariants: {
      variant: "default",
      effect: "slide",
    },
  }
);

/**
 * CVA variants for navigation buttons
 */
const navigationVariants = cva(
  "absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-white/80 text-black hover:bg-white hover:scale-110 shadow-lg",
        contained:
          "bg-white/80 text-black hover:bg-white hover:scale-110 shadow-lg",
        bordered:
          "bg-primary/90 text-white hover:bg-primary hover:scale-110 shadow-xl",
        glass:
          "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md hover:scale-110 shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * CVA variants for dot indicators
 */
const indicatorVariants = cva(
  "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
  {
    variants: {
      active: {
        true: "w-8 bg-white shadow-lg shadow-white/50",
        false: "bg-white/50 hover:bg-white/75",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

/**
 * Ultra-modern Carousel component
 *
 * Advanced carousel/slider with multiple transition effects, autoplay,
 * navigation controls, dot indicators, and responsive design.
 * Supports both items array and children elements.
 *
 * @example
 * ```tsx
 * <Carousel
 *   items={[
 *     { image: '/slide1.jpg', alt: 'Slide 1', title: 'Welcome' },
 *     { image: '/slide2.jpg', alt: 'Slide 2', title: 'Features' },
 *   ]}
 *   autoplay
 *   effect="fade"
 *   variant="glass"
 * />
 * ```
 */
const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      children,
      autoplay = false,
      autoplayInterval = 5000,
      direction = "forward",
      showNavigation = true,
      showIndicators = true,
      showThumbnails = false,
      effect = "slide",
      variant = "default",
      loop = true,
      pauseOnHover = true,
      swipeable = true,
      onSlideChange,
      className,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Use items if provided, otherwise use children
    const content = items
      ? items.map((item, index) => <CarouselItem key={index} {...item} />)
      : React.Children.toArray(children);

    const totalSlides = content.length;

    // Navigate to specific slide
    const goToSlide = useCallback(
      (index: number) => {
        const newIndex = loop
          ? (index + totalSlides) % totalSlides
          : Math.max(0, Math.min(index, totalSlides - 1));

        setActiveIndex(newIndex);
        onSlideChange?.(newIndex);
      },
      [totalSlides, loop, onSlideChange]
    );

    // Navigate to next slide
    const nextSlide = useCallback(() => {
      goToSlide(activeIndex + 1);
    }, [activeIndex, goToSlide]);

    // Navigate to previous slide
    const prevSlide = useCallback(() => {
      goToSlide(activeIndex - 1);
    }, [activeIndex, goToSlide]);

    // Setup autoplay
    useEffect(() => {
      if (!autoplay || isPaused || totalSlides <= 1) return;

      intervalRef.current = setInterval(() => {
        if (direction === "forward") {
          nextSlide();
        } else {
          prevSlide();
        }
      }, autoplayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [
      autoplay,
      isPaused,
      autoplayInterval,
      direction,
      nextSlide,
      prevSlide,
      totalSlides,
    ]);

    // Handle touch start
    const handleTouchStart = (e: React.TouchEvent) => {
      if (!swipeable) return;
      setTouchStart(e.targetTouches[0].clientX);
    };

    // Handle touch move
    const handleTouchMove = (e: React.TouchEvent) => {
      if (!swipeable) return;
      setTouchEnd(e.targetTouches[0].clientX);
    };

    // Handle touch end
    const handleTouchEnd = () => {
      if (!swipeable) return;
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setTouchStart(0);
      setTouchEnd(0);
    };

    // Get transition classes based on effect
    const getEffectClass = () => {
      switch (effect) {
        case "fade":
          return "transition-opacity duration-700";
        case "slide":
          return "transition-transform duration-700";
        case "cube":
          return "transition-all duration-700 transform-gpu";
        case "flip":
          return "transition-all duration-700 transform-gpu";
        default:
          return "transition-transform duration-700";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(carouselVariants({ variant, effect }), className)}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {/* Slides container */}
        <div
          ref={sliderRef}
          className={cn("relative h-full flex", getEffectClass())}
          style={{
            transform:
              effect === "slide"
                ? `translateX(-${activeIndex * 100}%)`
                : undefined,
          }}
        >
          {content.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "min-w-full h-full flex-shrink-0",
                effect === "fade" &&
                  (index === activeIndex
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0")
              )}
            >
              {slide}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {showNavigation && totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className={cn(navigationVariants({ variant }), "left-4")}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className={cn(navigationVariants({ variant }), "right-4")}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {showIndicators && totalSlides > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {content.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  indicatorVariants({ active: index === activeIndex })
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";

export default Carousel;
