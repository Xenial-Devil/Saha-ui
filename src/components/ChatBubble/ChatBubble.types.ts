import React from "react";
import type { AvatarProps } from "../Avatar/Avatar.types";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text message to display
   */
  message: React.ReactNode;
  
  /**
   * The sender's name
   */
  sender?: string;
  
  /**
   * Timestamp of the message
   */
  timestamp?: string;
  
  /**
   * Whether the message was sent by the current user
   * Determines alignment (right for true, left for false)
   * @default false
   */
  isMe?: boolean;
  
  /**
   * Custom avatar props or image URL
   */
  avatar?: string | AvatarProps;
  
  /**
   * Hide the avatar completely
   * @default false
   */
  hideAvatar?: boolean;
  
  /**
   * Visual variant style for the bubble
   * @default "default"
   */
  variant?: "default" | "primary" | "secondary" | "ghost" | "glass";
  
  /**
   * Status indicators (read, delivered, etc)
   */
  status?: "sending" | "sent" | "delivered" | "read" | "failed";
}
