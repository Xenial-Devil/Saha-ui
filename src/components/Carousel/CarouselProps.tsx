export interface CarouseItemProps {
  image: string;
  alt: string;
  caption?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  onClick?: () => void;
  linkTarget?: "_blank" | "_self" | "_parent" | "_top";
  className?: string;
  captionStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  linkStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  LinkIcon?: React.ElementType | null;
}
export interface CarouselProps {
  autoplay?: boolean;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  className?: string;
  containerStyle?: React.CSSProperties;
  navigationStyle?: React.CSSProperties;
  indicatorsStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export const DefaultCarouselProps: CarouselProps = {
  autoplay: false,
  autoplayInterval: 5000,
  showNavigation: true,
  showIndicators: true,
  className: "",
  containerStyle: {},
  navigationStyle: {},
  indicatorsStyle: {},
};
export const DefaultCarouselImageProps: CarouseItemProps = {
  image: "",
  alt: "",
  caption: "",
  title: "",
  description: "",
  link: "",
  linkText: "",
  onClick: undefined,
  linkTarget: "_blank",
  className: "",
  captionStyle: {},
  titleStyle: {},
  linkStyle: {},
  descriptionStyle: {},
  LinkIcon: null,
};
