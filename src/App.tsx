import "./App.css";
import ThemeProvider from "./components/ThemeProvider";

import ThemeToggle from "./components/ThemeToggle";
import Button from "./components/Button";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card";
import Accordion from "./components/Accordion";
import Alert from "./components/Alert";
import Avatar from "./components/Avatar";
import AvatarGroup from "./components/AvatarGroup";
import Carousel from "./components/Carousel";
import Image from "./components/Image";
import Link from "./components/Link";
import List from "./components/List";
import Tooltip from "./components/Tooltip";
import {
  Sparkles,
  Zap,
  Heart,
  Star,
  Mail,
  User,
  Bell,
} from "lucide-react";

// Color palette component that uses theme colors from CSS variables
const ColorPalette = () => {
  // Read colors directly from CSS custom properties
  const getColorValue = (varName: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
    }
    return "";
  };

  const colors = [
    { name: "Primary", var: "--primary", fg: "--primary-foreground" },
    { name: "Secondary", var: "--secondary", fg: "--secondary-foreground" },
    { name: "Accent", var: "--accent", fg: "--accent-foreground" },
    { name: "Success", var: "--success", fg: "--success-foreground" },
    { name: "Warning", var: "--warning", fg: "--warning-foreground" },
    { name: "Error", var: "--error", fg: "--error-foreground" },
    { name: "Info", var: "--info", fg: "--info-foreground" },
    { name: "Muted", var: "--muted", fg: "--muted-foreground" },
    { name: "Card", var: "--card", fg: "--card-foreground" },
    { name: "Popover", var: "--popover", fg: "--popover-foreground" },
    { name: "Border", var: "--border", fg: "--foreground" },
    { name: "Ring", var: "--ring", fg: "--foreground" },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6">Color Palette (oklch)</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map(({ name, var: colorVar, fg }) => (
          <div key={name} className="glass p-4 rounded-lg">
            <div
              className="w-full h-16 rounded-md mb-2 flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: `oklch(var(${colorVar}))`,
                color: `oklch(var(${fg}))`,
              }}
            >
              {name}
            </div>
            <p className="text-xs font-mono opacity-70">
              {getColorValue(colorVar)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        {/* Header */}
        <header className="glass sticky top-0 z-50 border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={28} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Saha UI
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Modern React Component Library
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Beautiful, accessible components with glassmorphism effects for
              both light and dark modes
            </p>
          </div>

          {/* Buttons Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">
              Button Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <Zap size={18} />
                Primary
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="error">Error</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">
                <Sparkles size={18} />
                Glass Effect
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button size="sm" variant="primary">
                Small
              </Button>
              <Button size="md" variant="secondary">
                Medium
              </Button>
              <Button size="lg" variant="accent">
                Large
              </Button>
              <Button size="xl" variant="success">
                Extra Large
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button variant="primary">
                <Heart size={18} />
                Rounded
              </Button>
              <Button variant="glass">
                Full Width Glass Button
              </Button>
            </div>
          </div>

          {/* Cards Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default" hoverable>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>A standard card with shadow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    This is a default card with a clean, modern design.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="sm">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass" hoverable>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-primary" size={24} />
                    <CardTitle>Glass Card</CardTitle>
                  </div>
                  <CardDescription>
                    Beautiful glassmorphism effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    Features a modern glass effect with backdrop blur.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="glass" size="sm">
                    Explore
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="text-accent" size={24} />
                    <CardTitle>Strong Glass</CardTitle>
                  </div>
                  <CardDescription>Enhanced glass effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    A stronger glass effect with more blur.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="accent" size="sm">
                    <Star size={16} />
                    View
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="glass-subtle" hoverable>
                <CardHeader>
                  <CardTitle>Subtle Glass</CardTitle>
                  <CardDescription>Lighter glass effect</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    A more subtle glass effect for delicate designs.
                  </p>
                </CardContent>
              </Card>

              <Card variant="bordered" hoverable>
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                  <CardDescription>Card with border accent</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    Clean bordered design for a different look.
                  </p>
                </CardContent>
              </Card>

              <Card variant="default" padding="xl" hoverable>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="text-error" size={24} />
                    <CardTitle>Extra Padding</CardTitle>
                  </div>
                  <CardDescription>More spacious layout</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">
                    This card has extra padding for a more spacious feel.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Alerts Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Alert Variants</h3>
            <div className="space-y-4">
              <Alert
                variant="solid"
                status="info"
                title="Information"
                message="This is an informational alert with helpful details."
                closeable={false}
              />
              <Alert
                variant="left-accent"
                status="success"
                title="Success"
                message="Your action was completed successfully!"
                closeable={false}
              />
              <Alert
                variant="subtle"
                status="warning"
                title="Warning"
                message="Please review this warning before proceeding."
                closeable={false}
              />
              <Alert
                variant="outline"
                status="danger"
                title="Error"
                message="An error occurred. Please try again."
                closeable={true}
              />
            </div>
          </div>

          {/* Accordion Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Accordion</h3>
            <Accordion
              variant="default"
              items={[
                {
                  title: "What is Saha UI?",
                  content:
                    "Saha UI is a modern React component library built with TypeScript, Tailwind CSS, and featuring beautiful glassmorphism effects for both light and dark modes.",
                },
                {
                  title: "How do I install it?",
                  content:
                    "You can install Saha UI via npm or yarn. Simply run: npm install saha-ui or yarn add saha-ui",
                },
                {
                  title: "Is it customizable?",
                  content:
                    "Yes! All components are highly customizable with props and support both light and dark themes out of the box.",
                },
              ]}
            />
          </div>

          {/* Avatar & AvatarGroup Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Avatars</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Single Avatars</h4>
                <div className="flex gap-4 items-center flex-wrap">
                  <Avatar
                    src="https://i.pravatar.cc/150?img=1"
                    alt="User 1"
                    size="md"
                    shape="circle"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/150?img=2"
                    alt="User 2"
                    size="lg"
                    shape="circle"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/150?img=3"
                    alt="User 3"
                    size="xl"
                    shape="rounded"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/150?img=4"
                    alt="User 4"
                    size="2xl"
                    shape="square"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Avatar Group</h4>
                <AvatarGroup
                  avatars={[
                    {
                      src: "https://i.pravatar.cc/150?img=5",
                      alt: "User 5",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=6",
                      alt: "User 6",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=7",
                      alt: "User 7",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=8",
                      alt: "User 8",
                    },
                    {
                      src: "https://i.pravatar.cc/150?img=9",
                      alt: "User 9",
                    },
                  ]}
                  max={3}
                  size="2xl"
                  gap={false}
                />
              </div>
            </div>
          </div>

          {/* Tooltip Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Tooltips</h3>
            <div className="flex gap-4 flex-wrap">
              <Tooltip content="This is a tooltip" position="top">
                <Button variant="primary">
                  <User size={18} />
                  Hover Top
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip on the right" position="right">
                <Button variant="secondary">
                  <Mail size={18} />
                  Hover Right
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip at bottom" position="bottom">
                <Button variant="accent">
                  <Bell size={18} />
                  Hover Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Tooltip on the left" position="left">
                <Button variant="success">
                  <Star size={18} />
                  Hover Left
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Link Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Links</h3>
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Link href="#" className="text-primary hover:underline">
                  Primary Link
                </Link>
                <Link href="#" className="text-secondary hover:underline">
                  Secondary Link
                </Link>
                <Link href="#" className="text-accent hover:underline">
                  Accent Link
                </Link>
                <Link href="#" className="underline">
                  Underlined Link
                </Link>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener"
                  className="text-primary"
                >
                  External Link
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground cursor-not-allowed"
                >
                  Disabled Link
                </Link>
              </div>
            </div>
          </div>

          {/* List Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Lists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Disc List</h4>
                <List listType="disc">
                  <li>Modern React components</li>
                  <li>TypeScript support</li>
                  <li>Tailwind CSS styling</li>
                  <li>Dark mode support</li>
                  <li>Glassmorphism effects</li>
                </List>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Decimal List</h4>
                <List listType="decimal">
                  <li>Install the library</li>
                  <li>Import components</li>
                  <li>Customize with props</li>
                  <li>Build amazing UIs</li>
                  <li>Deploy with confidence</li>
                </List>
              </div>
            </div>
          </div>

          {/* Image Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Default</h4>
                <Image
                  src="https://picsum.photos/400/300?random=1"
                  alt="Sample 1"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">With Loading</h4>
                <Image
                  src="https://picsum.photos/400/300?random=2"
                  alt="Sample 2"
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Custom Size</h4>
                <Image
                  src="https://picsum.photos/400/300?random=3"
                  alt="Sample 3"
                  className="w-full rounded-lg"
                  style={{ objectFit: "cover", height: "200px" }}
                />
              </div>
            </div>
          </div>

          {/* Carousel Showcase */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Carousel</h3>
            <Carousel
              items={[
                {
                  image: "https://picsum.photos/1200/500?random=4",
                  alt: "Slide 1",
                  title: "Welcome to Saha UI",
                  description:
                    "Modern component library with beautiful designs",
                  link: "#",
                  linkText: "Get Started",
                },
                {
                  image: "https://picsum.photos/1200/500?random=5",
                  alt: "Slide 2",
                  title: "Glassmorphism Effects",
                  description: "Beautiful glass effects for modern UIs",
                  link: "#",
                  linkText: "Learn More",
                },
                {
                  image: "https://picsum.photos/1200/500?random=6",
                  alt: "Slide 3",
                  title: "Dark Mode Support",
                  description: "Seamless light and dark theme switching",
                  link: "#",
                  linkText: "Explore",
                },
              ]}
              autoplay
              autoplayInterval={5000}
              showNavigation
              showIndicators
              className="rounded-xl overflow-hidden"
            />
          </div>

          {/* Color Palette */}
          <ColorPalette />
        </section>

        {/* Footer */}
        <footer className="glass border-t border-border/50 mt-16">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-text-secondary">
              Built with ❤️ using React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-text-tertiary text-sm mt-2">
              Saha UI - Modern Component Library © 2025
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
