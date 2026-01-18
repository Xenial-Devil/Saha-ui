// Main component
export { AppBar, default } from "./AppBar";

// Sub-components
export {
  AppBarProgress,
  AppBarSearch,
  AppBarAnnouncement,
  AppBarTitle,
  AppBarBreadcrumbs,
  SkipToContent,
  AppBarSlot,
  AppBarBackButton,
  AppBarMenuButton,
} from "./AppBar.components";

// Context & Hooks
export {
  AppBarProvider,
  useAppBar,
  useAppBarOptional,
  useAppBarScrolled,
  useAppBarVisible,
  useAppBarMobile,
  useAppBarHeight,
} from "./AppBar.context";

export {
  useAppBarScroll,
  useIsMobile,
  useReducedMotion,
  useBodyScrollLock,
  useResizeObserver,
  useKeyboardShortcuts,
  useCommandPalette,
  useFocusTrap,
  useEntranceAnimation,
} from "./AppBar.hooks";

// Types
export type {
  AppBarProps,
  AppBarContextValue,
  AppBarPosition,
  AppBarVariant,
  AppBarColor,
  AppBarAnimation,
  AppBarEntrance,
  AppBarEasing,
  BreadcrumbItem,
  ResponsiveAppBarProps,
  KeyboardShortcut,
  AppBarProgressProps,
  AppBarSearchProps,
  AppBarAnnouncementProps,
  AppBarTitleProps,
  AppBarBreadcrumbsProps,
  SkipToContentProps,
} from "./AppBar.types";

// Styles (for custom styling)
export {
  appBarVariants,
  appBarContentVariants,
  appBarScrollVariants,
  appBarProgressVariants,
  appBarAnnouncementVariants,
  appBarSearchVariants,
  appBarTitleVariants,
  appBarSlotVariants,
  skipToContentVariants,
  appBarEntranceVariants,
} from "./AppBar.styles";
