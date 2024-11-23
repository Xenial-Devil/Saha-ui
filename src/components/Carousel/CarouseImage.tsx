import React from "react";
import { CarouseItemProps, DefaultCarouselImageProps } from "./CarouselProps";

const CarouseItem: React.FC<CarouseItemProps> = ({
  image = DefaultCarouselImageProps.image,
  alt = DefaultCarouselImageProps.alt,
  caption = DefaultCarouselImageProps.caption,
  title = DefaultCarouselImageProps.title,
  description = DefaultCarouselImageProps.description,
  link = DefaultCarouselImageProps.link,
  linkText = DefaultCarouselImageProps.linkText,
  onClick = DefaultCarouselImageProps.onClick,
  linkTarget = DefaultCarouselImageProps.linkTarget,
  className = DefaultCarouselImageProps.className,
  captionStyle = DefaultCarouselImageProps.captionStyle,
  titleStyle = DefaultCarouselImageProps.titleStyle,
  linkStyle = DefaultCarouselImageProps.linkStyle,
  descriptionStyle = DefaultCarouselImageProps.descriptionStyle,
  LinkIcon = DefaultCarouselImageProps.LinkIcon,
}) => {
  return (
    <div className={`item relative ${className}}`}>
      <img src={image} alt={alt} />
      <div className="absolute top-0 left-0 flex flex-col justify-center items-start p-6 gap-4">
        <h1 className="text-white text-7xl " style={{ ...titleStyle }}>
          {title}
        </h1>
        <p className="text-white text-xl" style={{ ...descriptionStyle }}>
          {description}
        </p>
        {!onClick && link && link?.length > 0 && (
          <a
            className="bg-blue-500/50 px-6 py-2 inline-block rounded-md "
            href={link}
            target={linkTarget}
            style={{ color: "white", ...linkStyle }}
          >
            {LinkIcon && <LinkIcon />}
            {linkText ? linkText : "click here..."}
          </a>
        )}
        {onClick && (
          <div
            className="bg-blue-500/50 px-6 py-2 inline-block rounded-md cursor-pointer"
            style={{ color: "white", ...linkStyle }}
            onClick={onClick}
          >
            {LinkIcon && <LinkIcon />}
            {linkText ? linkText : "click here..."}
          </div>
        )}
      </div>
      <div className="absolute text-white top-[90%] left-[50%] -translate-x-1/2 flex justify-center items-center bg-black bg-opacity-50 px-4">
        <p className={`text-center text-white`} style={{ ...captionStyle }}>
          {caption}
        </p>
      </div>
    </div>
  );
};

export default CarouseItem;
