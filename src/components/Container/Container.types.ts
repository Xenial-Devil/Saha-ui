export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width variant
   * @default 'lg'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Padding variant
   * @default 'default'
   */
  padding?: 'none' | 'sm' | 'default' | 'lg';

  /**
   * Center the container
   * @default true
   */
  center?: boolean;

  /**
   * Render as a different element
   */
  asChild?: boolean;

  /**
   * Add responsive gutter (horizontal padding)
   * @default true
   */
  gutter?: boolean;
}
