export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the stack
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Spacing between items
   * @default 'md'
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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
   * Allow items to wrap
   * @default false
   */
  wrap?: boolean;

  /**
   * Make stack responsive (horizontal on desktop, vertical on mobile)
   * @default false
   */
  responsive?: boolean;

  /**
   * Render as a different element
   */
  asChild?: boolean;

  /**
   * Divide items with a separator
   * @default false
   */
  divide?: boolean;
}
