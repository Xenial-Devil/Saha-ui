export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns
   * @default 12
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * Responsive column configuration
   */
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  };

  /**
   * Gap between items
   * @default 'md'
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Align items on cross axis
   * @default 'stretch'
   */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';

  /**
   * Justify content on main axis
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

  /**
   * Auto-fit columns (responsive without breakpoints)
   * @default false
   */
  autoFit?: boolean;

  /**
   * Minimum column width for auto-fit
   * @default '250px'
   */
  minColWidth?: string;

  /**
   * Render as a different element
   */
  asChild?: boolean;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column span
   * @default 1
   */
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';

  /**
   * Row span
   * @default 1
   */
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';

  /**
   * Responsive column span
   */
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  };

  /**
   * Render as a different element
   */
  asChild?: boolean;
}
