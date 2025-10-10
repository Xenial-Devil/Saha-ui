import React from "react";
import { ImageProps } from "./Image.types";

const Image: React.FC<ImageProps> = (props) => {
  return <img {...props} />;
};

export default Image;
