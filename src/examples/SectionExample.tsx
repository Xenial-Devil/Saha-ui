import { Section } from "../components/Section";
import { Container } from "../components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { Sparkles, ArrowRight, Star, Zap, Heart } from "lucide-react";

export const SectionExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Section Variants</h3>

      {/* Default Section */}
      <Section variant="default" padding="lg">
        <Container size="lg">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Default Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Standard background color with consistent padding and max-width container
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Muted Section */}
      <Section variant="muted" padding="lg">
        <Container size="lg">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Muted Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Subtle background to differentiate sections and create visual hierarchy
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Accent Section */}
      <Section variant="accent" padding="lg">
        <Container size="lg">
          <Card variant="glass-subtle">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="text-accent" size={24} />
                <CardTitle>Accent Section</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Emphasized section with accent background color
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Gradient Section */}
      <Section variant="gradient" padding="xl">
        <Container size="lg">
          <Card variant="glass-strong" hoverable>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="text-primary" size={24} />
                <CardTitle>Gradient Section</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-4">
                Beautiful gradient background perfect for hero sections and call-to-actions
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button variant="primary" size="sm">
                  <Star size={16} />
                  Get Started
                </Button>
                <Button variant="glass" size="sm">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Padding Variants
      </h3>

      {/* Small Padding */}
      <Section variant="muted" padding="sm">
        <Container>
          <Card variant="bordered">
            <CardContent>
              <Badge variant="primary">Small Padding (sm)</Badge>
              <p className="text-text-secondary text-sm mt-2">
                Compact vertical spacing
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Default Padding */}
      <Section variant="default" padding="default">
        <Container>
          <Card variant="bordered">
            <CardContent>
              <Badge variant="secondary">Default Padding</Badge>
              <p className="text-text-secondary text-sm mt-2">
                Standard vertical spacing for most sections
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Large Padding */}
      <Section variant="muted" padding="lg">
        <Container>
          <Card variant="bordered">
            <CardContent>
              <Badge variant="accent">Large Padding (lg)</Badge>
              <p className="text-text-secondary text-sm mt-2">
                Generous vertical spacing for emphasis
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Extra Large Padding */}
      <Section variant="gradient" padding="xl">
        <Container>
          <Card variant="glass">
            <CardContent>
              <Badge variant="primary" size="lg">Extra Large Padding (xl)</Badge>
              <p className="text-text-secondary text-sm mt-2">
                Maximum spacing for hero sections
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Special Features
      </h3>

      {/* Bordered Section */}
      <Section variant="default" padding="lg" bordered>
        <Container>
          <Card variant="glass-subtle">
            <CardHeader>
              <CardTitle>Bordered Section</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Adds top and bottom borders to visually separate sections
              </p>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Full Height Section */}
      <Section variant="gradient" fullHeight padding="xl">
        <Container size="md">
          <div className="text-center">
            <Badge variant="glass" size="lg" className="mb-4">
              <Sparkles size={18} />
              Full Height Section
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-text">
              Welcome to Our Platform
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Full viewport height perfect for hero sections and splash screens
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" size="lg">
                <ArrowRight size={20} />
                Get Started
              </Button>
              <Button variant="glass" size="lg">
                View Demo
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Practical Landing Page Example
      </h3>

      {/* Hero Section */}
      <Section variant="gradient" padding="xl">
        <Container size="lg">
          <div className="text-center">
            <Badge variant="glass" size="lg" className="mb-6">
              ✨ Modern UI Components
            </Badge>
            <h1 className="text-5xl font-bold mb-4 text-text">
              Build Amazing Interfaces
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Saha UI provides everything you need to create beautiful, responsive web applications
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" size="xl">
                <Star size={20} />
                Get Started Free
              </Button>
              <Button variant="glass" size="xl">
                View Documentation
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section variant="muted" padding="xl">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-text">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered" hoverable>
              <CardHeader>
                <Zap className="text-primary mb-2" size={32} />
                <CardTitle>Fast Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Optimized components with GPU-accelerated animations
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered" hoverable>
              <CardHeader>
                <Heart className="text-error mb-2" size={32} />
                <CardTitle>Beautiful Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Modern glassmorphism effects and smooth transitions
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered" hoverable>
              <CardHeader>
                <Star className="text-accent mb-2" size={32} />
                <CardTitle>Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Intuitive API with full TypeScript support
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="accent" padding="xl" bordered>
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-text">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of developers building amazing applications
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" size="lg">
                <Sparkles size={20} />
                Start Building
              </Button>
              <Button variant="outline" size="lg">
                View Examples
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Max Width Variants
      </h3>

      {/* Different Max Widths */}
      <Section variant="muted" padding="lg" maxWidth="sm">
        <Card variant="bordered">
          <CardContent>
            <Badge variant="primary">Small (sm)</Badge>
            <p className="text-text-secondary text-sm mt-2">
              Max width: 896px - Great for focused content
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section variant="default" padding="lg" maxWidth="md">
        <Card variant="bordered">
          <CardContent>
            <Badge variant="secondary">Medium (md)</Badge>
            <p className="text-text-secondary text-sm mt-2">
              Max width: 1024px - Balanced width
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section variant="muted" padding="lg" maxWidth="xl">
        <Card variant="bordered">
          <CardContent>
            <Badge variant="accent">Extra Large (xl)</Badge>
            <p className="text-text-secondary text-sm mt-2">
              Max width: 1400px - Wide layouts
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section variant="gradient" padding="lg" maxWidth="full">
        <Card variant="glass">
          <CardContent>
            <Badge variant="primary" size="lg">Full Width</Badge>
            <p className="text-text-secondary text-sm mt-2">
              No max-width constraint - Uses full viewport
            </p>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
};
