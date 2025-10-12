import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { cva } from "class-variance-authority";
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const content = React.Children.toArray(children);
    const totalSlides = content.filter(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any).displayName === "CarouselItem"
    ).length;

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

    // Autoplay
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
          {children}
        </div>
      </div>
    );
  }
);

CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    const { effect, activeIndex } = useCarousel();
    const itemIndex = React.useMemo(() => {
      const parent =
        ref && typeof ref !== "function" ? ref.current?.parentElement : null;
      if (!parent) return 0;
      const siblings = Array.from(parent.children);
      return siblings.indexOf(
        ref && typeof ref !== "function" ? ref.current! : parent
      );
    }, [ref]);

    const isActive = itemIndex === activeIndex;

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
        data-active={isActive}
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
