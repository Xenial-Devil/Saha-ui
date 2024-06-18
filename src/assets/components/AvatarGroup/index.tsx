import React from "react";
import { AvatarProps, DefaultAvatarProps } from "./AvatarProps";
import Avatar from "../Avatar"; // Make sure this path is correct based on your file structure

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: number;
  overlap?: number;
  reverse?:boolean;
  gap:boolean;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = avatars.length,
  size = DefaultAvatarProps.size,
  overlap = 0.1, // 10% overlap by default
  reverse = true, // recerse by default
  gap = false, // no gap by default
}) => {
    console.log("avatar", size, overlap);
  const displayedAvatars = avatars.slice(0, max);
  const overlapOffset = `${size * overlap}px`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: gap? overlapOffset:0}}>
      {displayedAvatars.map((avatar, index) => (
        <div
          key={index}
          style={{
            marginLeft: index === 0 || gap ? "0px" : `-${overlapOffset}`,
            zIndex: reverse ? max - index : index,
          }}
        >
          <Avatar {...avatar} size={size}/>
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
