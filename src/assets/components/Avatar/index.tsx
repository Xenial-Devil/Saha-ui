import React from 'react'
import {AvatarProps,DefaultAvatarProps} from './AvatarProps'


const Avatar = ({
    src= DefaultAvatarProps.src,
    alt= DefaultAvatarProps.alt,
    size= DefaultAvatarProps.size,
    shape= DefaultAvatarProps.shape}:AvatarProps):JSX.Element=> {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius:
          shape === "circle"
            ? "50%"
            : shape === "rounded"
            ? `${size * 0.1}px`
            : "0%",
      }}
    />
  );
}

export default Avatar