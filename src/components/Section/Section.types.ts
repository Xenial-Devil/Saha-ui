export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'muted' | 'accent' | 'gradient';

  /**
   * Padding size
   * @default 'default'
   */
  padding?: 'none' | 'sm' | 'default' | 'lg' | 'xl';

  /**
   * Maximum width container inside section
   * @default 'lg'
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Center content horizontally
   * @default true
   */
  center?: boolean;

  /**
   * Add border to section
   * @default false
   */
  bordered?: boolean;

  /**
   * Make section full viewport height
   * @default false
   */
  fullHeight?: boolean;

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
