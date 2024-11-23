import React, { useEffect, useRef, useState } from "react";
import { CarouselProps, DefaultCarouselProps } from "./CarouselProps";
import CarouseItem from "./CarouseImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./index.scss";

const Carousel: React.FC<CarouselProps> = ({
  autoplay = DefaultCarouselProps.autoplay,
  autoplayInterval = DefaultCarouselProps.autoplayInterval,
  showNavigation = DefaultCarouselProps.showNavigation,
  showIndicators = DefaultCarouselProps.showIndicators,
  className = DefaultCarouselProps.className,
  containerStyle = DefaultCarouselProps.containerStyle,
  navigationStyle = DefaultCarouselProps.navigationStyle,
  indicatorsStyle = DefaultCarouselProps.indicatorsStyle,
  children,
}) => {
  const [active, setActive] = useState<number>(0); // Tracks the active slide index
  const sliderRef = useRef<HTMLDivElement | null>(null); // Ref for the slider container
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const image = [
    "https://cdn.pixabay.com/photo/2016/10/21/14/50/plouzane-1758197_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/07/06/19/26/drops-6392473_960_720.jpg",
    "https://cdn.pixabay.com/photo/2024/01/02/14/58/leaf-8483401_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/01/05/02/50/boat-3062045_960_720.jpg",
  ];

  const childArray = React.Children.toArray(children); // Convert children to an array for indexing
  const lengthItems = childArray.length;

  const reloadSlider = (newActive: number) => {
    setActive(newActive);

    // Reset the autoplay interval on manual interactions
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (autoplay || (!showIndicators && !showIndicators)) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % lengthItems);
      }, autoplayInterval);
    }
  };

  const handleNext = () => reloadSlider((active + 1) % lengthItems);

  const handlePrev = () =>
    reloadSlider((active - 1 + lengthItems) % lengthItems);

  const handleDotClick = (index: number) => reloadSlider(index);

  // Automatically switch slides on mount
  useEffect(() => {
    if (autoplay || (!showIndicators && !showIndicators)) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % lengthItems);
      }, autoplayInterval);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup interval on unmount
    };
  }, [lengthItems]);

  // Adjust slider position on window resize
  useEffect(() => {
    const resizeHandler = () => {
      if (sliderRef.current) {
        sliderRef.current.style.left = `-${
          sliderRef.current.children[active]?.clientWidth * active
        }px`;
      }
    };

    window.addEventListener("resize", resizeHandler);
    resizeHandler(); // Adjust position on component mount
    return () => window.removeEventListener("resize", resizeHandler);
  }, [active]);

  // Update slider's position when the active slide changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.left = `-${
        sliderRef.current.children[active]?.clientWidth * active
      }px`;
    }
  }, [active]);

  return (
    <div
      className={`slider ${className}`}
      style={{ position: "relative", display: "flex", ...containerStyle }}
    >
      <div className="list" ref={sliderRef}>
        {childArray.map((child, index) => (
          <div
            key={index}
            className="item"
            style={{ flexShrink: 0, width: "100%" }}
          >
            {child}
          </div>
        ))}
      </div>
      {showNavigation && (
        <div className="buttons">
          <button id="prev" style={{ ...navigationStyle }} onClick={handlePrev}>
            <ChevronLeft />
          </button>
          <button id="next" style={{ ...navigationStyle }} onClick={handleNext}>
            <ChevronRight />
          </button>
        </div>
      )}
      {showIndicators && (
        <ul className="dots">
          {childArray.map((_, index) => (
            <li
              key={index}
              style={{ ...indicatorsStyle }}
              className={index === active ? "active" : ""}
              onClick={() => reloadSlider(index)}
            ></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carousel;
