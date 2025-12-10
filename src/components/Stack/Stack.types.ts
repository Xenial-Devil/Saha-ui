import React from "react";

/**
 * Props for the Stack component.
 *
 * Stack is a layout primitive for arranging elements with consistent spacing.
 * It provides a flexible way to create vertical or horizontal layouts with
 * various alignment, spacing, and responsive options.
 *
 * @example
 * // Basic vertical stack
 * <Stack spacing="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 *
 * @example
 * // Horizontal stack with centered items
 * <Stack direction="horizontal" align="center" justify="between">
 *   <Button>Left</Button>
 *   <Button>Right</Button>
 * </Stack>
 *
 * @example
 * // Responsive stack with dividers
 * <Stack responsive divide spacing="lg">
 *   <Card>Content 1</Card>
 *   <Card>Content 2</Card>
 * </Stack>
 *
 * @example
 * // Using as semantic list with ARIA
 * <Stack
 *   asChild
 *   role="list"
 *   aria-label="Navigation items"
 * >
 *   <ul>
 *     <li role="listitem">Item 1</li>
 *     <li role="listitem">Item 2</li>
 *   </ul>
 * </Stack>
 */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the stack layout.
   * - `vertical`: Arranges children in a column (default)
   * - `horizontal`: Arranges children in a row
   *
   * @default 'vertical'
   *
   * @example
   * <Stack direction="horizontal">
   *   <Button>First</Button>
   *   <Button>Second</Button>
   * </Stack>
   */
  direction?: "vertical" | "horizontal";

  /**
   * Spacing between stack items using Tailwind gap utilities.
   * - `none`: No spacing (gap-0)
   * - `xs`: 0.25rem (gap-1)
   * - `sm`: 0.5rem (gap-2)
   * - `md`: 1rem (gap-4)
   * - `lg`: 1.5rem (gap-6)
   * - `xl`: 2rem (gap-8)
   * - `2xl`: 3rem (gap-12)
   * - `number`: Direct pixel value (e.g., 16 for 16px)
   * - `string`: Custom value with units (e.g., '2rem', '20px')
   *
   * @default 'md'
   *
   * @example
   * <Stack spacing="lg">
   *   <Card>Card 1</Card>
   *   <Card>Card 2</Card>
   * </Stack>
   *
   * @example
   * <Stack spacing={16}>
   *   <Card>16px gap</Card>
   * </Stack>
   *
   * @example
   * <Stack spacing="2rem">
   *   <Card>Custom gap</Card>
   * </Stack>
   */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string;

  /**
   * Alignment of items on the cross axis (perpendicular to direction).
   * - `start`: Align items to start (top for horizontal, left for vertical)
   * - `center`: Center items
   * - `end`: Align items to end (bottom for horizontal, right for vertical)
   * - `stretch`: Stretch items to fill container (default)
   * - `baseline`: Align items along their text baseline
   *
   * @default 'stretch'
   *
   * @example
   * <Stack direction="horizontal" align="center">
   *   <Icon size={24} />
   *   <Text>Centered with icon</Text>
   * </Stack>
   */
  align?: "start" | "center" | "end" | "stretch" | "baseline";

  /**
   * Distribution of items on the main axis (along direction).
   * - `start`: Pack items at start (default)
   * - `center`: Center items
   * - `end`: Pack items at end
   * - `between`: Distribute with space between items
   * - `around`: Distribute with space around items
   * - `evenly`: Distribute with equal space between and around items
   *
   * @default 'start'
   *
   * @example
   * <Stack direction="horizontal" justify="between">
   *   <Button>Cancel</Button>
   *   <Button>Submit</Button>
   * </Stack>
   */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /**
   * Allow items to wrap onto multiple lines when they overflow.
   * - `true`: Items wrap (flex-wrap)
   * - `false`: Items don't wrap (flex-nowrap, default)
   *
   * @default false
   *
   * @example
   * <Stack direction="horizontal" wrap spacing="sm">
   *   <Badge>Tag 1</Badge>
   *   <Badge>Tag 2</Badge>
   *   <Badge>Tag 3</Badge>
   * </Stack>
   */
  wrap?: boolean;

  /**
   * Make the stack responsive, changing from vertical on mobile to horizontal on desktop.
   * Automatically applies at `md` breakpoint (768px).
   *
   * When true, overrides the `direction` prop with responsive behavior:
   * - Mobile: vertical (flex-col)
   * - Desktop (md+): horizontal (md:flex-row)
   *
   * @default false
   *
   * @example
   * <Stack responsive spacing="md">
   *   <Card>Stacks vertically on mobile</Card>
   *   <Card>Stacks horizontally on desktop</Card>
   * </Stack>
   */
  responsive?: boolean;

  /**
   * Render the Stack as a child element using the Slot pattern.
   * When true, Stack merges its props with its single child instead of rendering a div.
   *
   * Useful for semantic HTML when you want Stack layout on an existing element.
   *
   * @default false
   *
   * @example
   * <Stack asChild direction="horizontal" spacing="md">
   *   <nav>
   *     <a href="/">Home</a>
   *     <a href="/about">About</a>
   *   </nav>
   * </Stack>
   */
  asChild?: boolean;

  /**
   * Add visual dividers between stack items.
   * - Vertical stacks: horizontal dividers (divide-y)
   * - Horizontal stacks: vertical dividers (divide-x)
   * - Responsive stacks: dividers adjust with layout
   *
   * Uses the theme's border color for dividers.
   *
   * @default false
   *
   * @example
   * <Stack divide spacing="md">
   *   <div>Section 1</div>
   *   <div>Section 2</div>
   *   <div>Section 3</div>
   * </Stack>
   */
  divide?: boolean;

  /**
   * Accessible label for the stack container.
   * Use when the Stack represents a meaningful group or region.
   *
   * @example
   * <Stack aria-label="User profile actions">
   *   <Button>Edit Profile</Button>
   *   <Button>Change Password</Button>
   * </Stack>
   */
  "aria-label"?: string;

  /**
   * ID of element that labels this stack.
   * Alternative to aria-label when a visible label exists.
   *
   * @example
   * <h2 id="actions-heading">Available Actions</h2>
   * <Stack aria-labelledby="actions-heading">
   *   <Button>Action 1</Button>
   *   <Button>Action 2</Button>
   * </Stack>
   */
  "aria-labelledby"?: string;

  /**
   * ID of element that describes this stack.
   * Provides additional context for assistive technologies.
   *
   * @example
   * <Stack aria-describedby="stack-help">
   *   <Input />
   *   <Input />
   * </Stack>
   * <Text id="stack-help">Fill in all fields</Text>
   */
  "aria-describedby"?: string;

  /**
   * ARIA role for the stack container.
   * Common roles: 'list', 'group', 'toolbar', 'navigation', 'region'
   *
   * @example
   * // Stack as a list
   * <Stack role="list" aria-label="Features">
   *   <div role="listitem">Feature 1</div>
   *   <div role="listitem">Feature 2</div>
   * </Stack>
   *
   * @example
   * // Stack as a toolbar
   * <Stack role="toolbar" direction="horizontal" aria-label="Text formatting">
   *   <Button>Bold</Button>
   *   <Button>Italic</Button>
   * </Stack>
   */
  role?: string;

  /**
   * Orientation of the stack for ARIA.
   * Should match the direction prop for consistency.
   *
   * @example
   * <Stack
   *   direction="horizontal"
   *   role="toolbar"
   *   aria-orientation="horizontal"
   * >
   *   <Button>Cut</Button>
   *   <Button>Copy</Button>
   * </Stack>
   */
  "aria-orientation"?: "horizontal" | "vertical";

  /**
   * Children elements to be arranged in the stack.
   */
  children?: React.ReactNode;
}
