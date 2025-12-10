import type { VariantProps } from "class-variance-authority";
import { transferVariants } from "./Transfer.styles";

/**
 * Transfer item type
 */
export interface TransferItem {
  /**
   * Unique identifier for the item
   */
  key: string;

  /**
   * Display label for the item
   */
  label: string;

  /**
   * Optional description or subtitle
   */
  description?: string;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom icon or avatar to display
   */
  icon?: React.ReactNode;

  /**
   * Custom data associated with the item
   */
  data?: any;
}

/**
 * Transfer list orientation
 */
export type TransferOrientation = "horizontal" | "vertical";

/**
 * Transfer size variants
 */
export type TransferSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/**
 * Props for the Transfer component
 *
 * @example
 * ```tsx
 * // Basic transfer
 * <Transfer
 *   dataSource={items}
 *   targetKeys={selectedKeys}
 *   onChange={handleChange}
 * />
 *
 * // With search
 * <Transfer
 *   dataSource={items}
 *   targetKeys={selectedKeys}
 *   onChange={handleChange}
 *   showSearch
 *   onSearch={handleSearch}
 * />
 *
 * // With custom titles
 * <Transfer
 *   dataSource={items}
 *   targetKeys={selectedKeys}
 *   onChange={handleChange}
 *   titles={['Available', 'Selected']}
 * />
 *
 * // Vertical orientation
 * <Transfer
 *   dataSource={items}
 *   targetKeys={selectedKeys}
 *   onChange={handleChange}
 *   orientation="vertical"
 * />
 *
 * // With custom render
 * <Transfer
 *   dataSource={items}
 *   targetKeys={selectedKeys}
 *   onChange={handleChange}
 *   render={(item) => (
 *     <div className="flex items-center gap-2">
 *       {item.icon}
 *       <span>{item.label}</span>
 *     </div>
 *   )}
 * />
 * ```
 */
export interface TransferProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof transferVariants> {
  /**
   * Data source for the transfer component
   */
  dataSource: TransferItem[];

  /**
   * Keys of items that are in the target list
   */
  targetKeys?: string[];

  /**
   * Keys of selected items in both lists
   */
  selectedKeys?: string[];

  /**
   * Callback when target keys change
   */
  onChange?: (
    targetKeys: string[],
    direction: "left" | "right",
    movedKeys: string[]
  ) => void;

  /**
   * Callback when selected keys change
   */
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;

  /**
   * Titles for the source and target lists
   * @default ['Source', 'Target']
   */
  titles?: [React.ReactNode, React.ReactNode];

  /**
   * Whether to show search box
   * @default false
   */
  showSearch?: boolean;

  /**
   * Callback when search input changes
   */
  onSearch?: (direction: "left" | "right", value: string) => void;

  /**
   * Custom filter function for search
   */
  filterOption?: (inputValue: string, item: TransferItem) => boolean;

  /**
   * Placeholder text for search inputs
   */
  searchPlaceholder?: string;

  /**
   * Custom render function for list items
   */
  render?: (item: TransferItem) => React.ReactNode;

  /**
   * Whether to show select all checkbox
   * @default true
   */
  showSelectAll?: boolean;

  /**
   * Custom footer for each list
   */
  footer?: (props: { direction: "left" | "right" }) => React.ReactNode;

  /**
   * Operations text (button labels)
   * @default ['>', '<']
   */
  operations?: [React.ReactNode, React.ReactNode];

  /**
   * Orientation of the transfer component
   * @default "horizontal"
   */
  orientation?: TransferOrientation;

  /**
   * Size variant
   * @default "md"
   */
  size?: TransferSize;

  /**
   * Whether the transfer is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to show item count in header
   * @default true
   */
  showItemCount?: boolean;

  /**
   * Custom empty state for lists
   */
  emptyText?: React.ReactNode;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Custom className for lists
   */
  listClassName?: string;

  /**
   * Custom className for operations (buttons)
   */
  operationsClassName?: string;

  /**
   * Custom className for list items
   */
  itemClassName?: string;

  /**
   * Height of each list
   */
  listHeight?: number | string;

  /**
   * Enable pagination for long lists
   * @default false
   */
  pagination?: boolean;

  /**
   * Items per page (when pagination is enabled)
   * @default 10
   */
  pageSize?: number;

  /**
   * Enable virtualization for large datasets
   * @default false
   */
  virtualized?: boolean;
}

/**
 * Internal props for TransferList component
 */
export interface TransferListProps {
  direction: "left" | "right";
  title?: React.ReactNode;
  items: TransferItem[];
  selectedKeys: string[];
  onSelectChange: (selectedKeys: string[]) => void;
  onItemClick?: (item: TransferItem) => void;
  disabled?: boolean;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  showSelectAll?: boolean;
  showItemCount?: boolean;
  render?: (item: TransferItem) => React.ReactNode;
  footer?: React.ReactNode;
  emptyText?: React.ReactNode;
  listClassName?: string;
  itemClassName?: string;
  height?: number | string;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  size?: TransferSize;
}
