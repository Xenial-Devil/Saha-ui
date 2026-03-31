export interface SpotlightSearchProps {
  /** The trigger component that opens the search */
  children?: React.ReactNode;
  /** Whether the search is currently open (controlled mode) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** The data to display in the search. Grouped by category. */
  data?: Array<{
    heading: string;
    items: Array<{
      id: string;
      title: string;
      description?: string;
      icon?: React.ReactNode;
      onSelect?: () => void;
    }>;
  }>;
  /** Placeholder text for the search input */
  placeholder?: string;
}
