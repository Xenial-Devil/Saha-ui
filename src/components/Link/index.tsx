interface AnchorAttributes {
  href?: string; // URL the hyperlink points to
  target?: "_self" | "_blank" | "_parent" | "_top"; // Specifies where to open the link
  rel?:
    | "alternate"
    | "author"
    | "bookmark"
    | "external"
    | "help"
    | "license"
    | "next"
    | "nofollow"
    | "noreferrer"
    | "noopener"
    | "prev"
    | "search"
    | "tag"
    | ""; // Relationship between current document and linked document
  download?: string | boolean; // Indicates resource download
  hreflang?: string; // Language of the linked document
  type?: string; // MIME type of the linked document
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "unsafe-url"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | ""; // Referrer policy for requests
  ping?: string; // URLs to notify on link click (space-separated)
  name?: string; // Anchor name for bookmarking or navigation
  style?: React.CSSProperties; // Inline CSS styles
  className?: string; // CSS class names
  id?: string; // Unique ID for the element
  title?: string; // Tooltip text
  draggable?: boolean; // Specifies whether the element is draggable
  tabIndex?: number; // Defines the tab order
  accessKey?: string; // Defines a keyboard shortcut to activate the link
  role?: string; // ARIA role for accessibility
  ariaLabel?: string; // Custom ARIA label
  ariaHidden?: boolean; // Specifies whether the element is hidden from accessibility
  ariaCurrent?: "page" | "step" | "location" | "date" | "time" | boolean; // Indicates current state of the link in navigation
  children: React.ReactNode;
}

const Link: React.FC<AnchorAttributes> = ({ children, ...props }) => {
  return <a {...props}>{children}</a>;
};
export default Link;
