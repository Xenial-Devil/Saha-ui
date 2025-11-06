import { Container } from "../components/Container";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";

export const ContainerExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Container Sizes</h3>

      {/* Extra Small Container */}
      <div className="mb-8">
        <Container size="xs" padding="sm">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Extra Small (xs)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Max width: 768px - Perfect for narrow content like articles
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Small Container */}
      <div className="mb-8">
        <Container size="sm" padding="sm">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Small (sm)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Max width: 896px - Great for focused content areas
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Medium Container */}
      <div className="mb-8">
        <Container size="md" padding="default">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Medium (md)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Max width: 1024px - Balanced width for most content
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Large Container (Default) */}
      <div className="mb-8">
        <Container size="lg" padding="default">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Large (lg) - Default</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Max width: 1280px - Standard desktop width
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Extra Large Container */}
      <div className="mb-8">
        <Container size="xl" padding="default">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Extra Large (xl)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Max width: 1400px - Wide layouts for dashboards
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* 2XL Container */}
      <div className="mb-8">
        <Container size="2xl" padding="lg">
          <Card variant="glass-subtle">
            <CardHeader>
              <CardTitle>2 Extra Large (2xl)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Max width: 1600px - Ultra-wide layouts
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Container Padding Variants
      </h3>

      {/* No Padding */}
      <div className="mb-8">
        <Container size="lg" padding="none">
          <Card variant="bordered">
            <CardContent>
              <p className="text-text-secondary">
                No padding - Perfect for full-bleed layouts
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Small Padding */}
      <div className="mb-8">
        <Container size="lg" padding="sm">
          <Card variant="bordered">
            <CardContent>
              <p className="text-text-secondary">
                Small padding - Compact vertical spacing
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      {/* Large Padding */}
      <div className="mb-8">
        <Container size="lg" padding="lg">
          <Card variant="glass">
            <CardContent>
              <p className="text-text-secondary">
                Large padding - Generous vertical spacing for hero sections
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Practical Example
      </h3>

      {/* Practical Layout Example */}
      <Container size="lg" padding="lg">
        <div className="space-y-6">
          <Card variant="glass-strong" hoverable>
            <CardHeader>
              <CardTitle>Centered Content Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-4">
                Containers automatically center content and add consistent
                horizontal padding (gutters) for responsive layouts.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary">Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="bordered" hoverable>
              <CardHeader>
                <CardTitle>Feature 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Responsive by default
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered" hoverable>
              <CardHeader>
                <CardTitle>Feature 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Consistent spacing
                </p>
              </CardContent>
            </Card>

            <Card variant="bordered" hoverable>
              <CardHeader>
                <CardTitle>Feature 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Clean & modern
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};
