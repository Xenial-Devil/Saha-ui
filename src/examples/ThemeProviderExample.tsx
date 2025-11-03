/**
 * ThemeProvider Component Examples
 *
 * The ThemeProvider is a context provider that manages theme state and provides
 * dark mode functionality across the entire application. It wraps your app and
 * makes theme utilities available to all child components.
 *
 * Features:
 * - 🌓 Dark mode support with system preference detection
 * - 💾 Theme persistence in localStorage
 * - 🎨 Custom theme configuration
 * - ⚡ Automatic theme switching
 * - 🔄 Theme context for all components
 *
 * @example
 * Basic usage - Wrap your entire app:
 * ```tsx
 * import { ThemeProvider } from 'saha-ui';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */

import { ThemeToggle } from "../components/ThemeToggle";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Alert from "../components/Alert";

export default function ThemeProviderExample() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">ThemeProvider Component</h1>
        <p className="text-muted-foreground mb-4">
          Theme context provider with dark mode support, system preference
          detection, and localStorage persistence.
        </p>
      </div>

      {/* Example 1: Basic Setup */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Basic Setup</h2>
          <p className="text-muted-foreground mb-4">
            Wrap your application with ThemeProvider at the root level.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>App.tsx / main.tsx Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { ThemeProvider } from 'saha-ui';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
      <YourAppContent />
    </ThemeProvider>
  );
}

export default App;`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Example 2: With ThemeToggle */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">With Theme Toggle</h2>
          <p className="text-muted-foreground mb-4">
            Add a theme toggle button to switch between light and dark modes.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Theme Demo</span>
              <ThemeToggle />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert
              status="info"
              message="Try clicking the theme toggle button above!"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    This card demonstrates the glass morphism effect in both
                    themes.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Notice how colors adapt to the current theme automatically.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="primary" size="sm">
                      Action
                    </Button>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Example 3: Features */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            ThemeProvider Features
          </h2>
          <p className="text-muted-foreground mb-4">
            Key features and capabilities of the ThemeProvider.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>🌓 Dark Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Seamless light and dark mode switching with smooth transitions
                between themes.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>💾 Persistence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Theme preference is saved to localStorage and persists across
                sessions.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>🖥️ System Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Automatically detects system color scheme preference on first
                load.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>🎨 CSS Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Uses CSS custom properties for dynamic theming with OKLCH
                colors.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>⚡ Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Lightweight context provider with minimal re-renders and optimal
                performance.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>🔄 Context API</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Provides theme context to all components via React Context API.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example 4: Usage in Components */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Using Theme in Components
          </h2>
          <p className="text-muted-foreground mb-4">
            Access theme state in your custom components using the useColorMode
            hook.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Custom Component Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`import { useColorMode } from 'saha-ui';

function MyComponent() {
  const { colorMode, setColorMode } = useColorMode();
  
  return (
    <div>
      <p>Current theme: {colorMode}</p>
      <button onClick={() => setColorMode('dark')}>
        Dark Mode
      </button>
      <button onClick={() => setColorMode('light')}>
        Light Mode
      </button>
    </div>
  );
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Example 5: Best Practices */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Best Practices</h2>
          <p className="text-muted-foreground mb-4">
            Tips for using ThemeProvider effectively in your application.
          </p>
        </div>

        <div className="space-y-4">
          <Alert
            status="success"
            title="✅ Always wrap at the root level"
            message="Place ThemeProvider at the highest level of your app, typically in App.tsx or main.tsx"
          />

          <Alert
            status="info"
            title="💡 One provider per app"
            message="You only need one ThemeProvider instance wrapping your entire application"
          />

          <Alert
            status="warning"
            title="⚠️ Placement matters"
            message="ThemeProvider should be outside any routing components to ensure theme persists across navigation"
          />

          <Alert
            status="info"
            title="🎨 Use theme-aware utilities"
            message="Use Tailwind's dark: modifier or CSS variables for theme-aware styling"
          />
        </div>
      </section>

      {/* Example 6: Integration with Other Libraries */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Framework Integration</h2>
          <p className="text-muted-foreground mb-4">
            Examples of integrating ThemeProvider with popular frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Next.js App Router</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// app/layout.tsx
import { ThemeProvider } from 'saha-ui';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vite + React</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'saha-ui';
import App from './App';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
