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
import { Sparkles, Zap, Heart, Star } from "lucide-react";
import { DebugTheme } from "./DebugTheme";

function App() {
  return (
    <ThemeProvider>
      <DebugTheme />
      <div className="min-h-screen bg-background transition-colors duration-300">
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
              <Button variant="primary" rounded>
                <Heart size={18} />
                Rounded
              </Button>
              <Button variant="glass" fullWidth>
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

          {/* Color Palette */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-text">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="glass p-4 rounded-lg text-center">
                <div className="w-full h-16 bg-primary rounded-md mb-2"></div>
                <p className="text-sm font-medium">Primary</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <div className="w-full h-16 bg-secondary rounded-md mb-2"></div>
                <p className="text-sm font-medium">Secondary</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <div className="w-full h-16 bg-accent rounded-md mb-2"></div>
                <p className="text-sm font-medium">Accent</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <div className="w-full h-16 bg-success rounded-md mb-2"></div>
                <p className="text-sm font-medium">Success</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <div className="w-full h-16 bg-warning rounded-md mb-2"></div>
                <p className="text-sm font-medium">Warning</p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <div className="w-full h-16 bg-error rounded-md mb-2"></div>
                <p className="text-sm font-medium">Error</p>
              </div>
            </div>
          </div>
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
