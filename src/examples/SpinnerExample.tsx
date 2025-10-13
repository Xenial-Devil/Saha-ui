import React, { useState } from "react";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../components/Card";

export const SpinnerExample: React.FC = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Spinner Component</h2>
        <p className="text-base-content/70 mb-8">
          A versatile loading spinner with multiple variants, sizes, animations,
          and customization options.
        </p>
      </div>

      {/* Variants */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Variants</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="default" />
            <p className="text-sm text-muted-foreground">Default</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="primary" />
            <p className="text-sm text-muted-foreground">Primary</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="secondary" />
            <p className="text-sm text-muted-foreground">Secondary</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="accent" />
            <p className="text-sm text-muted-foreground">Accent</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="info" />
            <p className="text-sm text-muted-foreground">Info</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="success" />
            <p className="text-sm text-muted-foreground">Success</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="warning" />
            <p className="text-sm text-muted-foreground">Warning</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="error" />
            <p className="text-sm text-muted-foreground">Error</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="glass" />
            <p className="text-sm text-muted-foreground">Glass</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner variant="gradient" />
            <p className="text-sm text-muted-foreground">Gradient</p>
          </div>
        </div>
      </section>

      {/* Spinner Types - Basic */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Classic Spinner Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Spinner type="ring" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Ring</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Spinner type="dots" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Dots</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Spinner type="dashed" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Dashed</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Spinner type="bars" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Bars</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg">
            <Spinner type="dotRing" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Dot Ring</p>
          </div>
        </div>
      </section>

      {/* Unique Spinner Types */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          ✨ Unique & Creative Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-accent/5">
            <Spinner type="orbit" variant="gradient" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">Orbit</p>
            <p className="text-xs text-muted-foreground text-center">
              Multi-orbit system
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-success/5 to-info/5">
            <Spinner type="pulse" variant="success" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">Pulse</p>
            <p className="text-xs text-muted-foreground text-center">
              Expanding circles
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-warning/5 to-error/5">
            <Spinner type="square" variant="warning" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">
              Square
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Corner animation
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-accent/5 to-primary/5">
            <Spinner type="triangle" variant="accent" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">
              Triangle
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Geometric pattern
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-info/5 to-success/5">
            <Spinner type="wave" variant="info" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">Wave</p>
            <p className="text-xs text-muted-foreground text-center">
              Sequential bars
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-error/5 to-warning/5">
            <Spinner type="spiral" variant="error" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">
              Spiral
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Expanding spiral
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5">
            <Spinner type="infinity" variant="gradient" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">
              Infinity
            </p>
            <p className="text-xs text-muted-foreground text-center">
              ∞ symbol path
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-success/5 to-accent/5">
            <Spinner type="flower" variant="success" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">
              Flower
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Petal pattern
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-secondary/5 to-info/5">
            <Spinner type="grid" variant="secondary" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">Grid</p>
            <p className="text-xs text-muted-foreground text-center">
              9-cell grid
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gradient-to-br from-accent/5 to-error/5">
            <Spinner type="bounce" variant="accent" size="lg" />
            <p className="text-sm text-muted-foreground font-semibold">
              Bounce
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Bouncing dots
            </p>
          </div>
        </div>
      </section>

      {/* Creative Types Showcase */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          🎨 Creative Types with Different Variants & Sizes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center gap-3 p-6 border rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
            <Spinner type="orbit" variant="gradient" size="xl" />
            <p className="text-sm text-muted-foreground font-semibold">
              Orbit XL
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 border rounded-xl bg-gradient-to-br from-success/10 to-info/10">
            <Spinner type="flower" variant="success" size="xl" />
            <p className="text-sm text-muted-foreground font-semibold">
              Flower XL
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 border rounded-xl bg-gradient-to-br from-error/10 to-warning/10">
            <Spinner type="infinity" variant="gradient" size="xl" />
            <p className="text-sm text-muted-foreground font-semibold">
              Infinity XL
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 border rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10">
            <Spinner type="spiral" variant="accent" size="xl" />
            <p className="text-sm text-muted-foreground font-semibold">
              Spiral XL
            </p>
          </div>
        </div>
      </section>

      {/* All Types Size Comparison */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Size Variations - New Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-base">
                Orbit - Multiple Sizes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4 py-6">
              <Spinner type="orbit" variant="primary" size="sm" />
              <Spinner type="orbit" variant="primary" size="md" />
              <Spinner type="orbit" variant="primary" size="lg" />
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-base">
                Flower - Multiple Sizes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4 py-6">
              <Spinner type="flower" variant="success" size="sm" />
              <Spinner type="flower" variant="success" size="md" />
              <Spinner type="flower" variant="success" size="lg" />
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle className="text-base">Wave - Multiple Sizes</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4 py-6">
              <Spinner type="wave" variant="info" size="sm" />
              <Spinner type="wave" variant="info" size="md" />
              <Spinner type="wave" variant="info" size="lg" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner size="xs" variant="primary" />
            <p className="text-sm text-muted-foreground">XS</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner size="sm" variant="primary" />
            <p className="text-sm text-muted-foreground">Small</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner size="md" variant="primary" />
            <p className="text-sm text-muted-foreground">Medium</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner size="lg" variant="primary" />
            <p className="text-sm text-muted-foreground">Large</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner size="xl" variant="primary" />
            <p className="text-sm text-muted-foreground">XL</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner size="2xl" variant="primary" />
            <p className="text-sm text-muted-foreground">2XL</p>
          </div>
        </div>
      </section>

      {/* Animation Types */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Animation Types</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner animation="spin" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Spin</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner animation="pulse" variant="success" size="lg" />
            <p className="text-sm text-muted-foreground">Pulse</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner animation="bounce" variant="warning" size="lg" />
            <p className="text-sm text-muted-foreground">Bounce</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner animation="ping" variant="error" size="lg" />
            <p className="text-sm text-muted-foreground">Ping</p>
          </div>
        </div>
      </section>

      {/* Thickness */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Thickness</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner thickness="thin" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Thin</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner thickness="default" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Default</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner thickness="thick" variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Thick</p>
          </div>
        </div>
      </section>

      {/* With Labels */}
      <section>
        <h3 className="text-xl font-semibold mb-4">With Labels</h3>
        <div className="flex flex-wrap items-start gap-8">
          <Spinner variant="primary" label="Loading..." />
          <Spinner variant="success" label="Processing..." size="lg" />
          <Spinner variant="gradient" label="Please wait..." size="xl" />
        </div>
      </section>

      {/* Speed Control */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Speed Control</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner speed={0.5} variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Slow (0.5x)</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner speed={1} variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Normal (1x)</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner speed={2} variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Fast (2x)</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner speed={3} variant="primary" size="lg" />
            <p className="text-sm text-muted-foreground">Very Fast (3x)</p>
          </div>
        </div>
      </section>

      {/* In Cards */}
      <section>
        <h3 className="text-xl font-semibold mb-4">In Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Loading Data</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <Spinner variant="primary" label="Fetching..." />
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Processing</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <Spinner variant="success" size="lg" label="Processing data..." />
            </CardContent>
          </Card>

          <Card variant="glass-strong">
            <CardHeader>
              <CardTitle>Uploading</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-8">
              <Spinner variant="gradient" label="Uploading files..." />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fullscreen Overlay */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Fullscreen Overlay</h3>
        <Button variant="primary" onClick={() => setShowFullscreen(true)}>
          Show Fullscreen Spinner
        </Button>

        {showFullscreen && (
          <Spinner
            fullscreen
            variant="gradient"
            size="2xl"
            label="Loading application..."
            onClick={() => setShowFullscreen(false)}
          />
        )}
      </section>

      {/* Button with Spinner */}
      <section>
        <h3 className="text-xl font-semibold mb-4">In Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            <Spinner size="sm" variant="default" />
            Loading...
          </Button>
          <Button variant="success" disabled>
            <Spinner size="sm" variant="default" />
            Saving...
          </Button>
          <Button variant="glass" disabled>
            <Spinner size="sm" variant="primary" />
            Processing...
          </Button>
        </div>
      </section>

      {/* With Custom Logo/Icon */}
      <section>
        <h3 className="text-xl font-semibold mb-4">With Custom Logo/Icon</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="primary"
              size="xl"
              logo="https://avatars.githubusercontent.com/u/139895814?s=200&v=4"
              logoSize="md"
              label="Loading..."
            />
            <p className="text-sm text-muted-foreground">Image URL</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="success"
              size="xl"
              logo={
                <div className="w-full h-full flex items-center justify-center bg-success/10 rounded-full">
                  <span className="text-2xl font-bold text-success">S</span>
                </div>
              }
              logoSize="lg"
            />
            <p className="text-sm text-muted-foreground">Custom Component</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="gradient"
              size="2xl"
              logo={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                    className="text-primary"
                  />
                  <path
                    d="M2 17L12 22L22 17L12 12L2 17Z"
                    fill="currentColor"
                    className="text-accent"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-secondary"
                  />
                </svg>
              }
              logoSize="md"
              label="Building..."
            />
            <p className="text-sm text-muted-foreground">SVG Icon</p>
          </div>
        </div>
      </section>

      {/* Logo Sizes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Logo Sizes</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="primary"
              size="xl"
              logo={
                <div className="w-full h-full flex items-center justify-center bg-primary/20 rounded-full">
                  <span className="text-xs font-bold text-primary">XS</span>
                </div>
              }
              logoSize="xs"
            />
            <p className="text-sm text-muted-foreground">Extra Small</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="primary"
              size="xl"
              logo={
                <div className="w-full h-full flex items-center justify-center bg-primary/20 rounded-full">
                  <span className="text-sm font-bold text-primary">SM</span>
                </div>
              }
              logoSize="sm"
            />
            <p className="text-sm text-muted-foreground">Small</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="primary"
              size="xl"
              logo={
                <div className="w-full h-full flex items-center justify-center bg-primary/20 rounded-full">
                  <span className="text-base font-bold text-primary">MD</span>
                </div>
              }
              logoSize="md"
            />
            <p className="text-sm text-muted-foreground">Medium</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="primary"
              size="xl"
              logo={
                <div className="w-full h-full flex items-center justify-center bg-primary/20 rounded-full">
                  <span className="text-lg font-bold text-primary">LG</span>
                </div>
              }
              logoSize="lg"
            />
            <p className="text-sm text-muted-foreground">Large</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Spinner
              variant="primary"
              size="xl"
              logo={
                <div className="w-full h-full flex items-center justify-center bg-primary/20 rounded-full">
                  <span className="text-xl font-bold text-primary">XL</span>
                </div>
              }
              logoSize="xl"
            />
            <p className="text-sm text-muted-foreground">Extra Large</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Submission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  disabled
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  disabled
                />
              </div>
              <Button variant="primary" className="w-full" disabled>
                <Spinner size="sm" variant="default" />
                Signing in...
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Loading</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-12">
              <Spinner
                variant="gradient"
                size="2xl"
                logo={
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      S
                    </span>
                  </div>
                }
                logoSize="lg"
                label="Loading your app..."
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SpinnerExample;
