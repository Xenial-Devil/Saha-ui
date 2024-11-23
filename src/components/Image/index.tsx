interface ImgAttributes {
  alt?: string; // Alternative text
  src?: string; // Image source URL
  srcset?: string; // Image source set for responsive images
  sizes?: string; // Image sizes for responsive images
  crossOrigin?: "anonymous" | "use-credentials" | ""; // Cross-origin policy
  useMap?: string; // Associated image map
  isMap?: boolean; // Indicates if the image is part of a server-side image map
  width?: number | string; // Width of the image
  height?: number | string; // Height of the image
  decoding?: "sync" | "async" | "auto"; // Decoding hint for the browser
  loading?: "eager" | "lazy"; // Lazy loading behavior
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url"
    | ""
    | "strict-origin"
    | "strict-origin-when-cross-origin"; // Referrer policy
  fetchPriority?: "high" | "low" | "auto"; // Priority for fetching the image
  style?: React.CSSProperties; // Inline styles (if used in React)
  className?: string; // CSS class names (if used in React or similar)
  id?: string; // ID of the element
  title?: string; // Tooltip text
  draggable?: boolean; // Whether the element is draggable
}

const Image: React.FC<ImgAttributes> = (props) => {
  return <img {...props} />;
};

export default Image;
