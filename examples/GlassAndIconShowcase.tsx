import React from "react";
import Button from "../src/components/Button";
import Badge from "../src/components/Badge";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../src/components/Card";
import { Input } from "../src/components/Input";
import Alert from "../src/components/Alert";
import { Stack } from "../src/components/Stack";
import { Container } from "../src/components/Container";
import { Separator } from "../src/components/Separator";

/**
 * Glass Variant & Icon Button Showcase
 * Demonstrates the improved glassmorphism design and icon button variant
 */
function GlassAndIconShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 py-12">
      <Container size="xl">
        <Stack spacing="2xl">
          {/* Hero Section */}
          <Stack spacing="lg" align="center">
            <Badge variant="glass" size="lg">
              ✨ Enhanced UI Components
            </Badge>
            <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Glass Variants & Icon Buttons
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl">
              Consistent glassmorphism design and icon button variant for modern
              UI
            </p>
          </Stack>

          <Separator />

          {/* Icon Buttons Section */}
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Icon Button Variant</h2>
              <p className="text-muted-foreground">
                Perfect square buttons for icon-only actions (size="icon")
              </p>
            </div>

            <Card variant="glass" hoverable>
              <CardHeader>
                <CardTitle>Icon Button Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack spacing="lg">
                  {/* Primary Icons */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Primary Variant
                    </h3>
                    <Stack direction="horizontal" spacing="md" wrap>
                      <Button variant="primary" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </Button>
                      <Button variant="primary" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </Button>
                      <Button variant="primary" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </Stack>
                  </div>

                  <Separator />

                  {/* Ghost Icons */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Ghost Variant
                    </h3>
                    <Stack direction="horizontal" spacing="md" wrap>
                      <Button variant="ghost" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </Button>
                    </Stack>
                  </div>

                  <Separator />

                  {/* Glass Icons */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Glass Variant
                    </h3>
                    <Stack direction="horizontal" spacing="md" wrap>
                      <Button variant="glass" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </Button>
                      <Button variant="glass" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </Button>
                      <Button variant="glass" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </Button>
                    </Stack>
                  </div>

                  <Separator />

                  {/* Outline Icons */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Outline Variant
                    </h3>
                    <Stack direction="horizontal" spacing="md" wrap>
                      <Button variant="outline" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          />
                        </svg>
                      </Button>
                    </Stack>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Separator />

          {/* Glass Buttons */}
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Glass Buttons</h2>
              <p className="text-muted-foreground">
                Enhanced glassmorphism with backdrop-blur-xl and radial
                highlights
              </p>
            </div>

            <Card variant="glass-strong" hoverable>
              <CardContent>
                <Stack spacing="lg">
                  <Stack direction="horizontal" spacing="md" wrap>
                    <Button variant="glass" size="sm">
                      Small Glass
                    </Button>
                    <Button variant="glass" size="md">
                      Medium Glass
                    </Button>
                    <Button variant="glass" size="lg">
                      Large Glass
                    </Button>
                    <Button variant="glass" size="xl">
                      Extra Large
                    </Button>
                    <Button variant="glass" size="icon">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </Button>
                  </Stack>

                  <Separator />

                  {/* Loading States */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Loading States
                    </h3>
                    <Stack direction="horizontal" spacing="md" wrap>
                      <Button variant="primary" loading>
                        Loading
                      </Button>
                      <Button variant="glass" loading>
                        Processing
                      </Button>
                      <Button variant="success" loading size="lg">
                        Saving Changes
                      </Button>
                      <Button
                        variant="ghost"
                        loading
                        size="icon"
                        aria-label="Loading"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </Button>
                    </Stack>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Separator />

          {/* Glass Cards */}
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Glass Cards</h2>
              <p className="text-muted-foreground">
                Three levels of glassmorphism intensity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="glass-subtle" hoverable>
                <CardHeader>
                  <Badge variant="glass" size="sm">
                    Subtle
                  </Badge>
                  <CardTitle>Glass Subtle</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Lightweight glassmorphism with subtle backdrop blur.
                  </p>
                  <Stack direction="horizontal" spacing="sm">
                    <Button variant="outline" size="icon">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </Button>
                    <code className="text-xs">bg-white/5</code>
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="glass" hoverable>
                <CardHeader>
                  <Badge variant="glass" size="sm">
                    Standard
                  </Badge>
                  <CardTitle>Glass Standard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Balanced glassmorphism. Recommended for most use cases.
                  </p>
                  <Stack direction="horizontal" spacing="sm">
                    <Button variant="glass" size="icon">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </Button>
                    <code className="text-xs">bg-white/10</code>
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="glass" size="sm">
                    Strong
                  </Badge>
                  <CardTitle>Glass Strong</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Maximum glassmorphism. Best for prominent elements.
                  </p>
                  <Stack direction="horizontal" spacing="sm">
                    <Button variant="primary" size="icon">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </Button>
                    <code className="text-xs">bg-white/15</code>
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </Stack>

          <Separator />

          {/* Glass Badges */}
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Glass Components</h2>
              <p className="text-muted-foreground">
                Consistent glassmorphism across all components
              </p>
            </div>

            <Card variant="glass" hoverable>
              <CardContent>
                <Stack spacing="lg">
                  {/* Badges */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Badges</h3>
                    <Stack direction="horizontal" spacing="md" wrap>
                      <Badge variant="glass" size="sm">
                        Small
                      </Badge>
                      <Badge variant="glass" size="md">
                        Medium
                      </Badge>
                      <Badge variant="glass" size="lg">
                        Large
                      </Badge>
                      <Badge variant="glass">✨ Premium</Badge>
                      <Badge variant="glass">🚀 Fast</Badge>
                    </Stack>
                  </div>

                  <Separator />

                  {/* Inputs */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Inputs</h3>
                    <Stack spacing="md">
                      <Input
                        variant="glass"
                        placeholder="Glass input..."
                        size="md"
                      />
                    </Stack>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          <Separator />

          {/* Glass Alerts */}
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Glass Alerts</h2>
              <p className="text-muted-foreground">
                Notification components with glassmorphism
              </p>
            </div>

            <Stack spacing="lg">
              <Alert variant="glass" status="info">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Glass Variant Applied</h4>
                    <p className="text-sm mt-1">
                      Beautiful glassmorphism effect with consistent styling.
                    </p>
                  </div>
                </div>
              </Alert>

              <Alert variant="glass" status="success">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold">Successfully Updated</h4>
                    <p className="text-sm mt-1">
                      All components now use the improved glass variant design.
                    </p>
                  </div>
                </div>
              </Alert>
            </Stack>
          </Stack>

          <Separator />

          {/* Technical Specs */}
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                Technical Specifications
              </h2>
              <p className="text-muted-foreground">
                Design tokens and implementation details
              </p>
            </div>

            <Card variant="glass" hoverable>
              <CardHeader>
                <CardTitle>Glass Variant Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Stack spacing="sm">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Light Mode
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Background:</span>
                        <code className="font-mono">bg-white/10</code>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Border:</span>
                        <code className="font-mono">border-white/20</code>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Blur:</span>
                        <code className="font-mono">backdrop-blur-xl</code>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shadow:</span>
                        <code className="font-mono">shadow-black/10</code>
                      </div>
                    </div>
                  </Stack>

                  <Stack spacing="sm">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Dark Mode
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Background:</span>
                        <code className="font-mono">bg-black/10</code>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Border:</span>
                        <code className="font-mono">border-white/20</code>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Blur:</span>
                        <code className="font-mono">backdrop-blur-xl</code>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shadow:</span>
                        <code className="font-mono">shadow-black/10</code>
                      </div>
                    </div>
                  </Stack>
                </div>
              </CardContent>
            </Card>

            <Card variant="glass-strong" hoverable>
              <CardHeader>
                <CardTitle>Icon Button Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack spacing="sm">
                  <div className="flex justify-between text-sm">
                    <span>Size:</span>
                    <code className="font-mono">h-10 w-10</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Padding:</span>
                    <code className="font-mono">p-0</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Border Radius:</span>
                    <code className="font-mono">rounded-xl</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Icon Size:</span>
                    <code className="font-mono">w-5 h-5</code>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          {/* Footer */}
          <Stack spacing="lg" align="center">
            <Badge variant="glass" size="lg">
              Built with Saha UI ✨
            </Badge>
            <p className="text-center text-muted-foreground">
              Consistent glassmorphism design inspired by Context Menu
            </p>
            <Stack direction="horizontal" spacing="md">
              <Button variant="glass" size="lg">
                Documentation
              </Button>
              <Button variant="primary" size="lg">
                Get Started
              </Button>
              <Button variant="glass" size="icon">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default GlassAndIconShowcase;
