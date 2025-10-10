import Button from "./components/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import Alert from "./components/Alert";
import Accordion from "./components/Accordion";
import Avatar from "./components/Avatar";
import Tooltip from "./components/Tooltip";
import { Heart, Sparkles } from "lucide-react";

// Example: Simple App with Theme Support
export function SimpleExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background p-8">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>

        {/* Buttons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-text">Buttons</h2>
          <div className="flex gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="glass">Glass Effect</Button>
            <Button variant="success" rounded>
              <Heart size={18} />
              Rounded
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-text">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" hoverable>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>A standard card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">Card content goes here</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="glass" hoverable>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  <CardTitle>Glass Card</CardTitle>
                </div>
                <CardDescription>With glassmorphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">
                  Beautiful translucent effect
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alert */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-text">Alerts</h2>
          <Alert
            status="success"
            variant="subtle"
            closeable={true}
            message="Your changes have been saved successfully!"
            title="Success"
            rounded
          />
        </div>

        {/* Accordion */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-text">Accordion</h2>
          <Accordion
            variant="firstopen"
            items={[
              {
                title: "What is Saha UI?",
                content: "A modern React component library",
              },
              {
                title: "Dark mode support?",
                content: "Yes, full dark mode support!",
              },
              {
                title: "Customizable?",
                content: "Absolutely, using CSS variables",
              },
            ]}
          />
        </div>

        {/* Avatar & Tooltip */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-text">
            Avatar with Tooltip
          </h2>
          <Tooltip content="User Profile" variant="glass">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              size={60}
              shape="circle"
            />
          </Tooltip>
        </div>

        {/* Glass Effect Examples */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-text">Glass Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Glass</h3>
              <p className="text-sm text-text-secondary">
                Standard glass effect
              </p>
            </div>
            <div className="glass-strong p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Glass Strong</h3>
              <p className="text-sm text-text-secondary">Enhanced blur</p>
            </div>
            <div className="glass-subtle p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Glass Subtle</h3>
              <p className="text-sm text-text-secondary">Lighter effect</p>
            </div>
          </div>
        </div>

        {/* Color Showcase */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-text">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="h-20 bg-primary rounded-lg mb-2"></div>
              <p className="text-sm">Primary</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-secondary rounded-lg mb-2"></div>
              <p className="text-sm">Secondary</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-accent rounded-lg mb-2"></div>
              <p className="text-sm">Accent</p>
            </div>
            <div className="text-center">
              <div className="h-20 bg-success rounded-lg mb-2"></div>
              <p className="text-sm">Success</p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

// Example: Custom Theme Control
export function CustomThemeExample() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
      <YourApp />
    </ThemeProvider>
  );
}

// Example: Using useTheme Hook
export function ThemeHookExample() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
    </div>
  );
}

// Example: Glass Card with Actions
export function GlassCardExample() {
  return (
    <Card variant="glass-strong" padding="lg" hoverable>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Premium Feature</CardTitle>
            <CardDescription>Unlock advanced capabilities</CardDescription>
          </div>
          <Sparkles className="text-accent" size={32} />
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-text-secondary">
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Custom branding</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="accent" fullWidth>
          Upgrade Now
        </Button>
      </CardFooter>
    </Card>
  );
}

// Example: Responsive Button Group
export function ButtonGroupExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="secondary" size="md">
        Medium
      </Button>
      <Button variant="accent" size="lg">
        Large
      </Button>
      <Button variant="glass" size="xl">
        Extra Large
      </Button>
    </div>
  );
}

// Example: Alert Notifications
export function AlertExample() {
  return (
    <div className="space-y-4">
      <Alert
        status="success"
        variant="left-accent"
        title="Success"
        message="Task completed!"
        rounded
      />
      <Alert
        status="warning"
        variant="top-accent"
        title="Warning"
        message="Please review"
        rounded
      />
      <Alert
        status="error"
        variant="solid"
        title="Error"
        message="Something went wrong"
        rounded
      />
      <Alert
        status="info"
        variant="glass"
        title="Info"
        message="New update available"
        rounded
      />
    </div>
  );
}
