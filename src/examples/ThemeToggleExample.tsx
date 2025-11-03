/**
 * ThemeToggle Component Examples
 *
 * The ThemeToggle component provides an interactive button to switch between
 * light and dark themes. It integrates with the ThemeProvider and displays
 * animated icons for visual feedback.
 *
 * Features:
 * - 🌓 Toggle between light and dark modes
 * - 🎨 Animated sun/moon icons
 * - 💾 Theme persistence via ThemeProvider
 * - ⚡ Smooth transitions
 * - ♿ Accessible with ARIA labels
 * - 🎯 Multiple size options
 *
 * @example
 * Basic usage:
 * ```tsx
 * import { ThemeToggle } from 'saha-ui';
 *
 * <ThemeToggle />
 * ```
 */

import { ThemeToggle } from "../components/ThemeToggle";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Alert from "../components/Alert";
import Badge from "../components/Badge";

export default function ThemeToggleExample() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">ThemeToggle Component</h1>
        <p className="text-muted-foreground mb-4">
          Interactive button to toggle between light and dark themes with
          animated icons and smooth transitions.
        </p>
      </div>

      {/* Example 1: Basic Usage */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Basic Usage</h2>
          <p className="text-muted-foreground mb-4">
            Simple theme toggle button with default styling.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Default Theme Toggle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground">
                Click to toggle between light and dark modes
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { ThemeToggle } from 'saha-ui';

function Header() {
  return (
    <header>
      <nav>
        <ThemeToggle />
      </nav>
    </header>
  );
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Example 2: Different Sizes */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Different Sizes</h2>
          <p className="text-muted-foreground mb-4">
            ThemeToggle adapts to different size contexts.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Size Variations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle className="h-8 w-8" />
                <Badge variant="outline" size="sm">
                  Small
                </Badge>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle />
                <Badge variant="outline" size="sm">
                  Default
                </Badge>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle className="h-12 w-12" />
                <Badge variant="outline" size="sm">
                  Large
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Example 3: Placement Examples */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Placement Examples</h2>
          <p className="text-muted-foreground mb-4">
            Common placement patterns for theme toggles in layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Header Navigation</span>
                <ThemeToggle />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Place in the header for easy access across all pages.
              </p>
              <pre className="bg-muted p-3 rounded-lg mt-3 text-xs overflow-x-auto">
                <code>{`<header>
  <nav className="flex justify-between">
    <Logo />
    <ThemeToggle />
  </nav>
</header>`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sidebar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Add to sidebar for persistent visibility.
              </p>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <ThemeToggle />
                <span className="text-sm">Toggle Theme</span>
              </div>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`<aside>
  <nav>
    {/* Other nav items */}
    <ThemeToggle />
  </nav>
</aside>`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Include in settings or preferences sections.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">Appearance</h4>
                    <p className="text-xs text-muted-foreground">
                      Choose your preferred theme
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Place in footer for global access.
              </p>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">© 2024 Your App</span>
                  <ThemeToggle />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example 4: Features */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <p className="text-muted-foreground mb-4">
            Key features and capabilities of the ThemeToggle component.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  🌓
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dual Icons</h3>
                  <p className="text-sm text-muted-foreground">
                    Animated sun and moon icons with smooth transitions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  💾
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Auto Save</h3>
                  <p className="text-sm text-muted-foreground">
                    Theme preference saved to localStorage automatically
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  ♿
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Accessible</h3>
                  <p className="text-sm text-muted-foreground">
                    ARIA labels and keyboard navigation support
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  ⚡
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Lightweight with minimal re-renders
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  🎨
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Customizable</h3>
                  <p className="text-sm text-muted-foreground">
                    Accepts className for custom styling
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  🔄
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smooth Transition</h3>
                  <p className="text-sm text-muted-foreground">
                    Animated theme switching with CSS transitions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example 5: Best Practices */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Best Practices</h2>
          <p className="text-muted-foreground mb-4">
            Tips for implementing theme toggles effectively.
          </p>
        </div>

        <div className="space-y-4">
          <Alert
            status="success"
            title="✅ Make it accessible"
            message="ThemeToggle is always visible in navigation or header for easy access"
          />

          <Alert
            status="info"
            title="💡 Visual feedback"
            message="The icon changes based on current theme - sun for light mode, moon for dark mode"
          />

          <Alert
            status="warning"
            title="⚠️ Requires ThemeProvider"
            message="ThemeToggle must be used within a ThemeProvider component to function properly"
          />

          <Alert
            status="info"
            title="🎨 Consistent placement"
            message="Keep theme toggle in a consistent location across all pages for better UX"
          />
        </div>
      </section>

      {/* Example 6: With Other Components */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Integration Examples</h2>
          <p className="text-muted-foreground mb-4">
            Combining ThemeToggle with other components.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>With Dropdown Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<Dropdown>
  <DropdownTrigger>
    Settings
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Profile</DropdownItem>
    <DropdownItem>
      <ThemeToggle />
      Theme
    </DropdownItem>
  </DropdownContent>
</Dropdown>`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>With Navigation Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<nav className="flex items-center gap-4">
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
  <div className="ml-auto">
    <ThemeToggle />
  </div>
</nav>`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Try it out section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Try It Out!</h2>
          <p className="text-muted-foreground mb-4">
            Click the theme toggle and see how all components on this page adapt
            to the new theme.
          </p>
        </div>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Interactive Demo</span>
              <ThemeToggle />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>
                Notice how all elements on this page change when you toggle the
                theme:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                <li>Background colors adapt to the theme</li>
                <li>Text colors adjust for proper contrast</li>
                <li>Borders and shadows change accordingly</li>
                <li>Glass effects look different in each theme</li>
                <li>Icons and badges update their appearance</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
