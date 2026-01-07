import {
  // Basic shapes
  Star,
  Heart,
  Circle,
  Square,
  Diamond,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  // Expressions & Emotions
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  ThumbsUp,
  ThumbsDown,
  // Nature & Weather
  Sun,
  Moon,
  Cloud,
  Snowflake,
  Droplet,
  Flame,
  Leaf,
  Flower2,
  TreeDeciduous,
  // Awards & Achievements
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  BadgeCheck,
  Ribbon,
  // Energy & Power
  Zap,
  Sparkle,
  Sparkles,
  Rocket,
  Target,
  // Food & Drinks
  Coffee,
  Pizza,
  Cake,
  Cookie,
  Apple,
  Cherry,
  IceCream2,
  Beer,
  Wine,
  // Animals
  Cat,
  Dog,
  Bird,
  Fish,
  Bug,
  Rabbit,
  PawPrint,
  // Entertainment
  Music,
  Headphones,
  Gamepad2,
  Dice5,
  Puzzle,
  Palette,
  // Communication
  MessageCircle,
  Bell,
  Mail,
  Send,
  // Objects
  Gift,
  Bookmark,
  Flag,
  Key,
  Lock,
  Lightbulb,
  Umbrella,
  Glasses,
  Watch,
  Compass,
  // Status
  Check,
  CheckCircle,
  X,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
  // Misc
  Ghost,
  Skull,
  Anchor,
  Plane,
  Car,
  Home,
  Building,
  Mountain,
  Waves,
  Infinity as InfinityIcon, // Renamed to avoid shadowing global Infinity
  Percent,
  DollarSign,
  Euro,
  Bitcoin,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { RatingIcon } from "./Rating.types";

/**
 * Comprehensive icon mapping - 80+ icons
 */
export const iconMap: Record<RatingIcon, LucideIcon> = {
  // Basic shapes
  star: Star,
  heart: Heart,
  circle: Circle,
  square: Square,
  diamond: Diamond,
  triangle: Triangle,
  hexagon: Hexagon,
  octagon: Octagon,
  pentagon: Pentagon,

  // Expressions & Emotions
  smile: Smile,
  frown: Frown,
  meh: Meh,
  laugh: Laugh,
  angry: Angry,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,

  // Nature & Weather
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  snowflake: Snowflake,
  droplet: Droplet,
  flame: Flame,
  leaf: Leaf,
  flower: Flower2,
  tree: TreeDeciduous,

  // Awards & Achievements
  award: Award,
  trophy: Trophy,
  medal: Medal,
  crown: Crown,
  gem: Gem,
  badge: BadgeCheck,
  ribbon: Ribbon,

  // Energy & Power
  zap: Zap,
  bolt: Zap,
  sparkle: Sparkle,
  sparkles: Sparkles,
  rocket: Rocket,
  target: Target,

  // Food & Drinks
  coffee: Coffee,
  pizza: Pizza,
  cake: Cake,
  cookie: Cookie,
  apple: Apple,
  cherry: Cherry,
  iceCream: IceCream2,
  beer: Beer,
  wine: Wine,

  // Animals
  cat: Cat,
  dog: Dog,
  bird: Bird,
  fish: Fish,
  bug: Bug,
  rabbit: Rabbit,
  pawPrint: PawPrint,

  // Entertainment
  music: Music,
  headphones: Headphones,
  gamepad: Gamepad2,
  dice: Dice5,
  puzzle: Puzzle,
  palette: Palette,

  // Communication
  messageCircle: MessageCircle,
  bell: Bell,
  mail: Mail,
  send: Send,

  // Objects
  gift: Gift,
  bookmark: Bookmark,
  flag: Flag,
  key: Key,
  lock: Lock,
  lightbulb: Lightbulb,
  umbrella: Umbrella,
  glasses: Glasses,
  watch: Watch,
  compass: Compass,

  // Status
  check: Check,
  checkCircle: CheckCircle,
  x: X,
  xCircle: XCircle,
  alertCircle: AlertCircle,
  info: Info,
  help: HelpCircle,

  // Misc
  ghost: Ghost,
  skull: Skull,
  anchor: Anchor,
  plane: Plane,
  car: Car,
  home: Home,
  building: Building,
  mountain: Mountain,
  waves: Waves,
  infinity: InfinityIcon, // Use renamed import
  percent: Percent,
  dollarSign: DollarSign,
  euro: Euro,
  bitcoin: Bitcoin,
};

/**
 * Get icon component by name
 */
export const getIconComponent = (icon: RatingIcon): LucideIcon => {
  return iconMap[icon] || iconMap.star;
};

/**
 * Get all available icon names
 */
export const getAllIconNames = (): RatingIcon[] => {
  return Object.keys(iconMap) as RatingIcon[];
};

/**
 * Icon categories for documentation/reference
 */
export const iconCategories = {
  shapes: [
    "star",
    "heart",
    "circle",
    "square",
    "diamond",
    "triangle",
    "hexagon",
    "octagon",
    "pentagon",
  ],
  emotions: [
    "smile",
    "frown",
    "meh",
    "laugh",
    "angry",
    "thumbsUp",
    "thumbsDown",
  ],
  nature: [
    "sun",
    "moon",
    "cloud",
    "snowflake",
    "droplet",
    "flame",
    "leaf",
    "flower",
    "tree",
  ],
  awards: ["award", "trophy", "medal", "crown", "gem", "badge", "ribbon"],
  energy: ["zap", "bolt", "sparkle", "sparkles", "rocket", "target"],
  food: [
    "coffee",
    "pizza",
    "cake",
    "cookie",
    "apple",
    "cherry",
    "iceCream",
    "beer",
    "wine",
  ],
  animals: ["cat", "dog", "bird", "fish", "bug", "rabbit", "pawPrint"],
  entertainment: [
    "music",
    "headphones",
    "gamepad",
    "dice",
    "puzzle",
    "palette",
  ],
  communication: ["messageCircle", "bell", "mail", "send"],
  objects: [
    "gift",
    "bookmark",
    "flag",
    "key",
    "lock",
    "lightbulb",
    "umbrella",
    "glasses",
    "watch",
    "compass",
  ],
  status: [
    "check",
    "checkCircle",
    "x",
    "xCircle",
    "alertCircle",
    "info",
    "help",
  ],
  misc: [
    "ghost",
    "skull",
    "anchor",
    "plane",
    "car",
    "home",
    "building",
    "mountain",
    "waves",
    "infinity",
    "percent",
    "dollarSign",
    "euro",
    "bitcoin",
  ],
} as const;
