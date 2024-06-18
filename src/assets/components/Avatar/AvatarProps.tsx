export type AvatarProps = {
  src: string;
  alt: string;
  size: number;
  shape:"circle" | "square" | "rounded";
};

export const DefaultAvatarProps: AvatarProps = {
  src: "",
  alt: "Avatar",
  size: 25,
  shape: "circle",
};