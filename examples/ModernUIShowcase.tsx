import React from 'react';
import {
  Container,
  Stack,
  Grid,
  GridItem,
  Section,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Tooltip,
} from '../src';

/**
 * Modern UI Showcase
 * Demonstrates all enhanced components with modern effects
 */

export function ModernUIShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Full Height with Gradient */}
      <Section fullHeight variant="gradient" padding="xl">
        <Container size="lg">
          <Stack spacing="xl" align="center">
            <Badge variant="primary" size="lg">
              ✨ Modern UI Components
            </Badge>
            <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Welcome to Saha UI
            </h1>
            <p className="text-xl text-center text-muted-foreground max-w-2xl">
              Experience cutting-edge design with GPU-accelerated animations,
              glassmorphism effects, and responsive layouts
            </p>
            <Stack direction="horizontal" spacing="md" wrap>
              <Button size="lg" variant="primary">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
              <Button size="lg" variant="glass">
                GitHub
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Button Showcase */}
      <Section variant="default" padding="xl">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Enhanced Buttons</h2>
              <p className="text-muted-foreground">
                GPU-accelerated with scale animations and glow effects
              </p>
            </div>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Hover to see the enhanced shadows and scale effects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Stack spacing="lg">
                  <Stack direction="horizontal" spacing="md" wrap>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="error">Error</Button>
                  </Stack>

                  <Stack direction="horizontal" spacing="md" wrap>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="glass">Glass</Button>
                  </Stack>

                  <Stack direction="horizontal" spacing="md" wrap align="center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* Card Showcase */}
      <Section variant="muted" padding="xl">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Modern Cards</h2>
              <p className="text-muted-foreground">
                Multi-layer effects with radial gradients and lift animations
              </p>
            </div>

            <Grid
              cols={1}
              responsive={{ md: 2, lg: 4 }}
              gap="lg"
            >
              <Card hoverable>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Subtle backdrop blur with gradient overlays on hover
                </CardContent>
              </Card>

              <Card variant="glass" hoverable>
                <CardHeader>
                  <CardTitle>Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Strong glassmorphism with radial highlight
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <CardTitle>Glass Strong</CardTitle>
                </CardHeader>
                <CardContent>
                  Maximum blur effect with enhanced glow
                </CardContent>
              </Card>

              <Card variant="bordered" hoverable>
                <CardHeader>
                  <CardTitle>Bordered Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Color-shifting border on hover
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Badge Showcase */}
      <Section padding="xl">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Enhanced Badges</h2>
              <p className="text-muted-foreground">
                Transform-optimized with hover scale animations
              </p>
            </div>

            <Card variant="glass-subtle">
              <CardContent>
                <Stack spacing="lg">
                  <Stack direction="horizontal" spacing="md" wrap>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="accent">Accent</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </Stack>

                  <Stack direction="horizontal" spacing="md" wrap>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="ghost">Ghost</Badge>
                    <Badge variant="glass">Glass</Badge>
                  </Stack>

                  <Stack direction="horizontal" spacing="md" wrap align="center">
                    <Badge size="sm" shape="pill">Small Pill</Badge>
                    <Badge size="md" shape="pill">Medium Pill</Badge>
                    <Badge size="lg" shape="pill">Large Pill</Badge>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* Layout Components Showcase */}
      <Section variant="gradient" padding="xl">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Responsive Layouts</h2>
              <p className="text-muted-foreground">
                Powerful layout components with auto-fit capabilities
              </p>
            </div>

            {/* Auto-fit Grid */}
            <Stack spacing="lg">
              <h3 className="text-2xl font-semibold">Auto-Fit Grid</h3>
              <Grid autoFit minColWidth="200px" gap="md">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} hoverable>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-lg font-medium">Item {i}</p>
                        <p className="text-sm text-muted-foreground">
                          Auto-adjusts
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>

            {/* Responsive Grid */}
            <Stack spacing="lg">
              <h3 className="text-2xl font-semibold">Responsive Grid</h3>
              <Grid
                cols={1}
                responsive={{ sm: 2, md: 3, lg: 6 }}
                gap="md"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} variant="glass" hoverable>
                    <CardContent>
                      <div className="text-center py-6">
                        <Badge variant="primary">{i}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>

            {/* Complex Grid Layout */}
            <Stack spacing="lg">
              <h3 className="text-2xl font-semibold">Complex Grid Layout</h3>
              <Grid cols={12} gap="lg">
                <GridItem colSpan={12}>
                  <Card variant="bordered">
                    <CardContent>
                      <p className="text-center py-4">Full Width Header</p>
                    </CardContent>
                  </Card>
                </GridItem>

                <GridItem colSpan={12} responsive={{ md: 4 }}>
                  <Card variant="glass-strong">
                    <CardContent>
                      <p className="text-center py-8">Sidebar</p>
                    </CardContent>
                  </Card>
                </GridItem>

                <GridItem colSpan={12} responsive={{ md: 8 }}>
                  <Stack spacing="md">
                    <Card hoverable>
                      <CardContent>
                        <p className="py-4">Main Content Area</p>
                      </CardContent>
                    </Card>
                    <Grid cols={2} gap="md">
                      <Card hoverable>
                        <CardContent>
                          <p className="text-center py-4">50%</p>
                        </CardContent>
                      </Card>
                      <Card hoverable>
                        <CardContent>
                          <p className="text-center py-4">50%</p>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Stack>
                </GridItem>
              </Grid>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Input Showcase */}
      <Section variant="muted" padding="xl">
        <Container size="md">
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Modern Inputs</h2>
              <p className="text-muted-foreground">
                Multi-layer effects with focus animations
              </p>
            </div>

            <Card variant="glass">
              <CardContent>
                <Stack spacing="lg">
                  <Input
                    variant="outline"
                    placeholder="Outline variant"
                    size="md"
                  />
                  <Input
                    variant="glass"
                    placeholder="Glass variant"
                    size="md"
                  />
                  <Input
                    variant="primary"
                    placeholder="Primary variant"
                    size="md"
                  />
                  <Stack direction="horizontal" spacing="md" responsive>
                    <Input
                      variant="outline"
                      placeholder="Small"
                      size="sm"
                    />
                    <Input
                      variant="outline"
                      placeholder="Medium"
                      size="md"
                    />
                    <Input
                      variant="outline"
                      placeholder="Large"
                      size="lg"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Section>

      {/* Stack Showcase */}
      <Section padding="xl">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Flexible Stacks</h2>
              <p className="text-muted-foreground">
                Vertical, horizontal, and responsive layouts
              </p>
            </div>

            <Grid cols={1} responsive={{ lg: 2 }} gap="lg">
              {/* Vertical Stack */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Vertical Stack</CardTitle>
                  <CardDescription>Default direction</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack spacing="md">
                    <Badge variant="primary">Item 1</Badge>
                    <Badge variant="secondary">Item 2</Badge>
                    <Badge variant="accent">Item 3</Badge>
                  </Stack>
                </CardContent>
              </Card>

              {/* Horizontal Stack */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Horizontal Stack</CardTitle>
                  <CardDescription>Side by side</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack direction="horizontal" spacing="md">
                    <Badge variant="primary">Item 1</Badge>
                    <Badge variant="secondary">Item 2</Badge>
                    <Badge variant="accent">Item 3</Badge>
                  </Stack>
                </CardContent>
              </Card>

              {/* Responsive Stack */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Responsive Stack</CardTitle>
                  <CardDescription>Changes with screen size</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack responsive spacing="md">
                    <Button variant="primary">Action 1</Button>
                    <Button variant="secondary">Action 2</Button>
                    <Button variant="accent">Action 3</Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Divided Stack */}
              <Card variant="bordered">
                <CardHeader>
                  <CardTitle>Divided Stack</CardTitle>
                  <CardDescription>With separators</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack divide spacing="md">
                    <div className="py-2">Section 1</div>
                    <div className="py-2">Section 2</div>
                    <div className="py-2">Section 3</div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Feature Grid */}
      <Section variant="gradient" padding="xl">
        <Container>
          <Stack spacing="xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground">
                What makes Saha UI modern and polished
              </p>
            </div>

            <Grid autoFit minColWidth="280px" gap="lg">
              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="primary" size="lg">🚀</Badge>
                  <CardTitle>GPU Accelerated</CardTitle>
                </CardHeader>
                <CardContent>
                  All animations use transform-gpu for smooth 60fps performance
                  on all devices
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="accent" size="lg">✨</Badge>
                  <CardTitle>Modern Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  Glassmorphism, multi-layer shadows, and radial gradients for
                  depth
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="success" size="lg">📱</Badge>
                  <CardTitle>Responsive First</CardTitle>
                </CardHeader>
                <CardContent>
                  Mobile-first design with powerful responsive utilities built-in
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="info" size="lg">🎨</Badge>
                  <CardTitle>Theme Preserved</CardTitle>
                </CardHeader>
                <CardContent>
                  All enhancements maintain your existing color palette perfectly
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="warning" size="lg">⚡</Badge>
                  <CardTitle>Type Safe</CardTitle>
                </CardHeader>
                <CardContent>
                  Full TypeScript support with intellisense and type inference
                </CardContent>
              </Card>

              <Card variant="glass-strong" hoverable>
                <CardHeader>
                  <Badge variant="error" size="lg">🔧</Badge>
                  <CardTitle>Composable</CardTitle>
                </CardHeader>
                <CardContent>
                  asChild prop support for maximum flexibility and composition
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section variant="accent" padding="xl" bordered>
        <Container size="md">
          <Stack spacing="lg" align="center">
            <Badge variant="glass" size="lg">
              Ready to build?
            </Badge>
            <h2 className="text-4xl font-bold text-center">
              Start Building Beautiful UIs Today
            </h2>
            <p className="text-center text-muted-foreground text-lg">
              Modern components, responsive layouts, and polished interactions
              out of the box
            </p>
            <Stack direction="horizontal" spacing="md">
              <Button size="xl" variant="primary">
                Get Started
              </Button>
              <Button size="xl" variant="glass">
                View Docs
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Footer */}
      <Section variant="muted" padding="lg" bordered>
        <Container>
          <Stack direction="horizontal" justify="between" align="center" responsive>
            <p className="text-muted-foreground">
              © 2025 Saha UI. Modern. Polished. Production-ready.
            </p>
            <Stack direction="horizontal" spacing="md">
              <Badge variant="outline">v1.13.3</Badge>
              <Badge variant="glass">✨ Enhanced</Badge>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}

export default ModernUIShowcase;
