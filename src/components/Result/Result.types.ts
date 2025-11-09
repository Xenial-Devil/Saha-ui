import { ReactNode, HTMLAttributes } from "react";

export type ResultStatus =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "404"
  | "403"
  | "500";

export interface ResultProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Status type of the result */
  status?: ResultStatus;
  /** Custom icon to display */
  icon?: ReactNode;
  /** Title of the result */
  title?: ReactNode;
  /** Subtitle/description of the result */
  subTitle?: ReactNode;
  /** Additional content to display */
  extra?: ReactNode;
  /** Size of the result component */
  size?: "sm" | "md" | "lg";
  /** Custom class for the wrapper */
  className?: string;
  /** Custom class for the icon container */
  iconClassName?: string;
  /** Custom class for the title */
  titleClassName?: string;
  /** Custom class for the subtitle */
  subTitleClassName?: string;
  /** Custom class for the extra content */
  extraClassName?: string;
}
