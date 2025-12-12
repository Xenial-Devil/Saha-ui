export type EmptySize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type EmptyVariant = "default" | "subtle" | "outlined" | "glass";

export interface EmptyProps {
  /** Empty state title */
  title?: string;

  /** Empty state description */
  description?: string;

  /** Size of the empty state */
  size?: EmptySize;

  /** Visual variant style */
  variant?: EmptyVariant;

  /** Custom icon/image element */
  icon?: React.ReactNode;

  /** Preset icon type */
  iconType?:
    | "default"
    | "search"
    | "folder"
    | "document"
    | "image"
    | "inbox"
    | "cart"
    | "bookmark"
    | "notification"
    | "user"
    | "database"
    | "cloud"
    | "error"
    | "success";

  /** Icon color */
  iconColor?:
    | "primary"
    | "secondary"
    | "muted"
    | "success"
    | "warning"
    | "danger"
    | "info";

  /** Action button(s) */
  action?: React.ReactNode;

  /** Additional actions or links */
  extra?: React.ReactNode;

  /** Show illustration/image */
  image?: string;

  /** Custom content */
  children?: React.ReactNode;

  /** Additional CSS classes */
  className?: string;

  /** Full height container */
  fullHeight?: boolean;

  /** Enable animations */
  animated?: boolean;

  /** Custom z-index */
  zIndex?: number;

  /** Background color */
  showBackground?: boolean;
}
export interface EmptyContextValue {
  size: EmptyProps["size"];
  variant: EmptyProps["variant"];
  animated: boolean;
}
export interface EmptyIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  iconType?: EmptyProps["iconType"];
  iconColor?: EmptyProps["iconColor"];
  className?: string;
}
export interface EmptyImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}
export interface EmptyTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}
export interface EmptyDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}
export interface EmptyActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export interface EmptyExtraProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
