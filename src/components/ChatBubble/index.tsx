"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { ChatBubbleProps } from "./ChatBubble.types";
import { Avatar } from "../Avatar";
import {
  chatBubbleWrapperVariants,
  chatBubbleContentVariants,
  chatBubbleVariants,
} from "./ChatBubble.styles";

const CheckIcon = ({ className, double }: { className?: string; double?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {double ? (
      <>
        <path d="M7 12l5 5L22 7" />
        <path d="M2 12l5 5m5-10l-5 5" />
      </>
    ) : (
      <path d="M20 6L9 17l-5-5" />
    )}
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const FailedIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="m15 9-6 6"/>
    <path d="m9 9 6 6"/>
  </svg>
);

/**
 * ChatBubble Component
 *
 * Displays a conversational message bubble with optional avatar, timestamp, and status.
 *
 * @example
 * ```tsx
 * <ChatBubble 
 *   message="Hey there! How are you?"
 *   isMe={false}
 *   avatar="https://i.pravatar.cc/150?u=1"
 *   timestamp="10:42 AM"
 * />
 * ```
 */
export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      message,
      sender,
      timestamp,
      isMe = false,
      avatar,
      hideAvatar = false,
      variant: propVariant,
      status,
      className,
      ...props
    },
    ref
  ) => {
    // Determine the tailwind variant: me messages get primary by default, others get default (muted)
    const variant = propVariant || (isMe ? "primary" : "default");

    // Process Avatar props
    let avatarSrc = "";
    let avatarFallback = sender ? sender.charAt(0).toUpperCase() : "U";
    if (typeof avatar === "string") {
      avatarSrc = avatar;
    } else if (avatar && typeof avatar === "object") {
      avatarSrc = avatar.src || "";
      avatarFallback = avatar.fallback || avatarFallback;
    }

    const renderStatus = () => {
      if (!isMe || !status) return null;
      
      switch (status) {
        case "sending": return <ClockIcon className="h-3 w-3 text-muted-foreground" />;
        case "sent": return <CheckIcon className="h-3 w-3 text-muted-foreground" />;
        case "delivered": return <CheckIcon double className="h-3 w-3 text-muted-foreground" />;
        case "read": return <CheckIcon double className="h-3 w-3 text-primary" />;
        case "failed": return <FailedIcon className="h-3 w-3 text-destructive" />;
        default: return null;
      }
    };

    return (
      <div 
        ref={ref} 
        className={cn(chatBubbleWrapperVariants({ isMe }), className)} 
        {...props}
      >
        {!hideAvatar && (
          <Avatar 
            src={avatarSrc} 
            fallback={avatarFallback} 
            size="sm"
            className="mt-4 shrink-0 shadow-sm border border-border/50"
          />
        )}
        
        <div className={chatBubbleContentVariants({ isMe })}>
          {sender && !isMe && (
            <span className="text-xs font-semibold text-muted-foreground px-1">
              {sender}
            </span>
          )}
          
          <div className={chatBubbleVariants({ variant, isMe })}>
            {message}
          </div>
          
          <div className={cn(
            "flex items-center gap-1.5 text-[10px] text-muted-foreground px-1 mt-0.5",
            isMe && "flex-row-reverse"
          )}>
            {timestamp && <span className="opacity-80">{timestamp}</span>}
            {renderStatus()}
          </div>
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
