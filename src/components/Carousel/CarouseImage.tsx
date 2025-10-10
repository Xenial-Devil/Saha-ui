import React from "react";
import { cn } from "../../lib/utils";
import { CarouselItemProps } from "./Carousel.types";
import Image from "../Image";
import { ExternalLink } from "lucide-react";

/**
 * CarouselItem component
 * Individual slide in a carousel with image, overlays, and CTA
 */
const CarouselItem: React.FC<CarouselItemProps> = ({
  image,
  alt,
  caption,
  title,
  description,
  link,
  linkText,
  onClick,
  linkTarget = "_blank",
  className,
  LinkIcon,
}) => {
  const Icon = LinkIcon || ExternalLink;

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Background image */}
      <Image
        src={image}
        alt={alt}
        className="w-full h-full object-cover"
        fit="cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content overlay */}
      {(title || description || link || onClick) && (
        <div className="absolute inset-0 flex flex-col justify-center items-start p-6 sm:p-8 md:p-12 gap-3 md:gap-4">
          {title && (
            <h2 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              {description}
            </p>
          )}

          {/* CTA Button */}
          {(link || onClick) && (
            <div className="mt-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {!onClick && link ? (
                <a
                  href={link}
                  target={linkTarget}
                  rel={
                    linkTarget === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                    "bg-gradient-to-r from-primary to-accent text-white font-medium",
                    "hover:shadow-lg hover:shadow-primary/50 hover:scale-105",
                    "transition-all duration-200"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {linkText || "Learn More"}
                </a>
              ) : (
                <button
                  onClick={onClick}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                    "bg-gradient-to-r from-primary to-accent text-white font-medium",
                    "hover:shadow-lg hover:shadow-primary/50 hover:scale-105",
                    "transition-all duration-200 cursor-pointer"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {linkText || "Click Here"}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Caption at bottom */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
          <p className="text-center text-white text-sm md:text-base">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default CarouselItem;
