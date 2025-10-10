import React from "react";
import { LinkProps } from "./Link.types";

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return <a {...props}>{children}</a>;
};
export default Link;
