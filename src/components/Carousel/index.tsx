import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { cn } from "../../lib/utils";
import {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselPreviousProps,
  CarouselNextProps,
  CarouselVariant,
  CarouselEffect,
} from "./Carousel.types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  createValidator,
  commonValidators,
  isValidBoolean,
  isValidNumber,
} from "../../lib/validation";
import {
  carouselVariants,
  navigationVariants,
  indicatorVariants,
} from "./Carousel.styles";

interface CarouselContextValue {
  variant: CarouselVariant;
  effect: CarouselEffect;
  activeIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within a Carousel");
  }
  return context;
};


const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      variant = "default",
      effect = "slide",
      autoplay = false,
      autoplayInterval = 5000,
      direction = "forward",
      loop = true,
      pauseOnHover = true,
      swipeable = true,
      showNavigation = true,
      showIndicators = true,
      onSlideChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Development-only validation
    useEffect(() => {
      const validator = createValidator("Carousel");

      // Validate variant
      validator.validateEnum("variant", variant, [
        "default",
        "contained",
        "bordered",
        "glass",
      ] as const);

      // Validate effect
      validator.validateEnum("effect", effect, [
        "slide",
        "fade",
        "cube",
        "flip",
      ] as const);

      // Validate direction
      validator.validateEnum("direction", direction, [
        "forward",
        "backward",
      ] as const);

      // Validate numeric props
      validator.validateType(
        "autoplayInterval",
        autoplayInterval,
        "number",
        isValidNumber
      );

      if (autoplayInterval <= 0) {
        validator.error("autoplayInterval must be greater than 0");
      }

      // Validate boolean props
      validator.validateType("autoplay", autoplay, "boolean", isValidBoolean);
      validator.validateType("loop", loop, "boolean", isValidBoolean);
      validator.validateType(
        "pauseOnHover",
        pauseOnHover,
        "boolean",
        isValidBoolean
      );
      validator.validateType("swipeable", swipeable, "boolean", isValidBoolean);
      validator.validateType(
        "showNavigation",
        showNavigation,
        "boolean",
        isValidBoolean
      );
      validator.validateType(
        "showIndicators",
        showIndicators,
        "boolean",
        isValidBoolean
      );

      // Common validators
      commonValidators.className(validator, className);
    }, [
      variant,
      effect,
      direction,
      autoplayInterval,
      autoplay,
      loop,
      pauseOnHover,
      swipeable,
      showNavigation,
      showIndicators,
      className,
    ]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Find CarouselContent and count its children
    const content = React.Children.toArray(children);
    const carouselContent = content.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).displayName === "CarouselContent"
    );

    const totalSlides =
      carouselContent && React.isValidElement(carouselContent)
        ? React.Children.count((carouselContent.props as any).children)
        : 0;

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

    const nextSlide = useCallback(() => {
      goToSlide(activeIndex + 1);
    }, [activeIndex, goToSlide]);

    const prevSlide = useCallback(() => {
      goToSlide(activeIndex - 1);
    }, [activeIndex, goToSlide]);

    // Autoplay - fixed dependencies
    useEffect(() => {
      if (autoplay && !isPaused && totalSlides > 1) {
        intervalRef.current = setInterval(() => {
          if (direction === "forward") {
            nextSlide();
          } else {
            prevSlide();
          }
        }, autoplayInterval);

        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [
      autoplay,
      isPaused,
      direction,
      autoplayInterval,
      nextSlide,
      prevSlide,
      totalSlides,
    ]);

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      if (swipeable) {
        setTouchStart(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (swipeable) {
        setTouchEnd(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      if (swipeable && touchStart && touchEnd) {
        const distance = touchStart - touchEnd;
        const threshold = 50;

        if (distance > threshold) {
          nextSlide();
        } else if (distance < -threshold) {
          prevSlide();
        }

        setTouchStart(0);
        setTouchEnd(0);
      }
    };

    const contextValue: CarouselContextValue = {
      variant,
      effect,
      activeIndex,
      totalSlides,
      goToSlide,
      nextSlide,
      prevSlide,
    };

    return (
      <CarouselContext.Provider value={contextValue}>
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
          {children}

          {showNavigation && totalSlides > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}

          {showIndicators && totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
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
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { activeIndex, effect } = useCarousel();

    return (
      <div
        ref={ref}
        className={cn("relative w-full h-full", className)}
        {...props}
      >
        <div
          className={cn(
            "flex h-full transition-transform duration-500 ease-in-out",
            effect === "slide" && "transform"
          )}
          style={
            effect === "slide"
              ? { transform: `translateX(-${activeIndex * 100}%)` }
              : undefined
          }
        >
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                "data-index": index,
                "data-active": index === activeIndex,
              });
            }
            return child;
          })}
        </div>
      </div>
    );
  }
);

CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    const { effect } = useCarousel();
    const isActive = (props as any)["data-active"] === true;

    return (
      <div
        ref={ref}
        className={cn(
          "flex-shrink-0 w-full h-full relative",
          effect === "fade" && [
            "absolute inset-0 transition-opacity duration-500",
            isActive ? "opacity-100 z-10" : "opacity-0 z-0",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(({ className, children, ...props }, ref) => {
  const { variant, prevSlide } = useCarousel();

  return (
    <button
      ref={ref}
      onClick={prevSlide}
      className={cn(navigationVariants({ variant }), "left-4", className)}
      aria-label="Previous slide"
      {...props}
    >
      {children || <ChevronLeft className="w-6 h-6" />}
    </button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, nextSlide } = useCarousel();

    return (
      <button
        ref={ref}
        onClick={nextSlide}
        className={cn(navigationVariants({ variant }), "right-4", className)}
        aria-label="Next slide"
        {...props}
      >
        {children || <ChevronRight className="w-6 h-6" />}
      </button>
    );
  }
);

CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
