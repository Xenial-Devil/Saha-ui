// Components
export { default as Alert } from "./Alert";
export { AlertProvider } from "./AlertProvider";

// Hooks
export { useAlert } from "../../hooks/useAlert";

// Icons
export {
  StatusIcon,
  Icon,
  Spinner,
  AnimatedCheck,
  AnimatedX,
  extraIcons,
} from "./Alert.icons";

// Types
export type {
  AlertProps,
  AlertVariant,
  AlertStatus,
  AlertPosition,
  AlertAnimation,
  AlertAction,
  AlertSize,
  AlertRounded,
  AlertShadow,
  IconAnimation,
  AlertProviderProps,
  AlertContextType,
  AlertItem,
} from "./Alert.types";

// Styles (for customization)
export {
  alertVariants,
  getAnimationClasses,
  getIconAnimationClass,
  positionClasses,
  progressBarColors,
  progressTrackColors,
} from "./Alert.styles";
