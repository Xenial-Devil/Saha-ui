"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { NotificationCenterProps } from "./NotificationCenter.types";
import {
  notificationPanelVariants,
  notificationHeaderVariants,
  notificationItemVariants,
  notificationDotVariants,
  notificationBellVariants,
  typeDotVariants,
} from "./NotificationCenter.styles";
import Popover from "../Popover";

/** Bell icon @private */
const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

/** Checks/Doublechecks @private */
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

/**
 * Empty State icon @private
 */
const EmptyInboxIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const formatTimeAgo = (dateInput: Date | string): string => {
  const date = new Date(dateInput);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  
  return date.toLocaleDateString();
};

export const NotificationCenter = forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      notifications,
      onMarkAsRead,
      onMarkAllAsRead,
      onClearAll,
      variant = "default",
      size = "md",
      title = "Notifications",
      emptyMessage = "No new notifications",
      maxVisible = 5,
      trigger,
      className,
      align = "end",
      width,
    },
    ref
  ) => {
    const unreadCount = notifications.filter((n) => !n.read).length;
    const sortedNotifications = [...notifications].sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    });

    const displayItems = sortedNotifications.slice(0, maxVisible);

    const triggerElement = trigger || (
      <button
        type="button"
        className={notificationBellVariants({ size })}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <BellIcon className="h-2/3 w-2/3" />
        <span
          className={notificationDotVariants({
            size,
            hasUnread: unreadCount > 0,
          })}
        />
      </button>
    );

    const content = (
      <div 
        ref={ref}
        className={cn(notificationPanelVariants({ variant, size: width ? undefined : size }), className)}
        style={width ? { width } : undefined}
      >
        {/* Header */}
        <div className={notificationHeaderVariants({ variant })}>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {unreadCount > 0 && (
              <span className="flex h-5 items-center justify-center rounded-full bg-primary/10 px-2 text-[10px] font-medium text-primary">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex gap-1">
            {unreadCount > 0 && onMarkAllAsRead && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="rounded p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors"
                title="Mark all as read"
              >
                <CheckIcon className="h-4 w-4" />
              </button>
            )}
            {notifications.length > 0 && onClearAll && (
              <button
                type="button"
                onClick={onClearAll}
                className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Clear all"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col max-h-[60vh] overflow-y-auto">
          {displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <EmptyInboxIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            displayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  if (!item.read) onMarkAsRead?.(item.id);
                }}
                className={notificationItemVariants({
                  variant,
                  read: item.read,
                })}
              >
                {/* Indicator / Icon */}
                <div className="pt-1 select-none">
                  {item.icon ? (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {item.icon}
                    </div>
                  ) : item.avatar ? (
                    <img 
                      src={item.avatar} 
                      alt="" 
                      className="h-8 w-8 rounded-full object-cover shrink-0" 
                    />
                  ) : (
                    <span className={typeDotVariants({ type: item.type })} />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn(
                      "text-sm font-medium leading-tight text-foreground",
                      !item.read && "font-semibold"
                    )}>
                      {item.title}
                    </p>
                    {item.timestamp && (
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  {item.message && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  )}

                  {/* Actions */}
                  {item.action && (
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action?.onClick();
                        }}
                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {item.action.label}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > maxVisible && (
          <div className="border-t p-2">
            <button
              type="button"
              className="w-full rounded-md py-2 text-xs font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors"
            >
              View {notifications.length - maxVisible} more
            </button>
          </div>
        )}
      </div>
    );

    return (
      <Popover 
        content={content} 
        position={align === "end" ? "bottom-end" : align === "start" ? "bottom-start" : "bottom"}
      >
        {triggerElement}
      </Popover>
    );
  }
);

NotificationCenter.displayName = "NotificationCenter";

export default NotificationCenter;
