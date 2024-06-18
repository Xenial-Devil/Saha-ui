import React from "react";
import { AvatarProps, DefaultAvatarProps } from "./AvatarProps";
import Avatar from "../Avatar"; // Make sure this path is correct based on your file structure

interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: number;
  overlap?: number;
  reverse?:boolean // Percentage of overlap between avatars
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = avatars.length,
  size = DefaultAvatarProps.size,
  overlap = 0.1, // 10% overlap by default
  reverse = true, // recerse by default
}) => {
    console.log("avatar", size, overlap);
  const displayedAvatars = avatars.slice(0, max);
  const overlapOffset = `${size * overlap}px`;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {displayedAvatars.map((avatar, index) => (
        <div
          key={index}
          style={{
            marginLeft: index === 0 ? "0px" : `-${overlapOffset}`,
            zIndex: reverse ? max - index : index,
          }}
        >
          <Avatar {...avatar} size={size}/>
        </div>
      ))}
      {avatars.length > max && (
        <div
          style={{
            marginLeft: `-${overlapOffset}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ccc",
            borderRadius: "50%",
            fontSize: `${size * 0.4}px`,
            color: "white",
          }}
        >
          +{avatars.length - max}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
