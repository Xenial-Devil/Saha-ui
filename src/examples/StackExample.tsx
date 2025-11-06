import { Stack } from "../components/Stack";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { ArrowRight, Star, Heart, Zap } from "lucide-react";

export const StackExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Stack - Vertical Layout</h3>

      {/* Vertical Stack with Different Spacing */}
      <Card variant="bordered" className="mb-8">
        <CardContent>
          <Stack spacing="xs">
            <Badge variant="primary">Extra Small Spacing (xs)</Badge>
            <Badge variant="secondary">Items are very close</Badge>
            <Badge variant="accent">Compact layout</Badge>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="bordered" className="mb-8">
        <CardContent>
          <Stack spacing="sm">
            <Badge variant="primary">Small Spacing (sm)</Badge>
            <Badge variant="secondary">Slightly more space</Badge>
            <Badge variant="accent">Still compact</Badge>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="glass" className="mb-8">
        <CardContent>
          <Stack spacing="md">
            <Badge variant="primary">Medium Spacing (md) - Default</Badge>
            <Badge variant="secondary">Comfortable spacing</Badge>
            <Badge variant="accent">Most common choice</Badge>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="bordered" className="mb-8">
        <CardContent>
          <Stack spacing="lg">
            <Badge variant="success">Large Spacing (lg)</Badge>
            <Badge variant="warning">More breathing room</Badge>
            <Badge variant="error">Great for emphasis</Badge>
          </Stack>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Stack - Horizontal Layout
      </h3>

      {/* Horizontal Stack */}
      <Card variant="bordered" className="mb-8">
        <CardContent>
          <Stack direction="horizontal" spacing="md">
            <Button variant="primary" size="sm">
              <Star size={16} />
              Action 1
            </Button>
            <Button variant="secondary" size="sm">
              <Heart size={16} />
              Action 2
            </Button>
            <Button variant="accent" size="sm">
              <Zap size={16} />
              Action 3
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="glass" className="mb-8">
        <CardContent>
          <Stack direction="horizontal" spacing="sm" wrap>
            <Badge variant="primary">Tag 1</Badge>
            <Badge variant="secondary">Tag 2</Badge>
            <Badge variant="accent">Tag 3</Badge>
            <Badge variant="info">Tag 4</Badge>
            <Badge variant="success">Tag 5</Badge>
            <Badge variant="warning">Tag 6</Badge>
            <Badge variant="error">Tag 7</Badge>
            <Badge variant="outline">Tag 8</Badge>
          </Stack>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Stack - Alignment Options
      </h3>

      {/* Alignment Examples */}
      <Card variant="bordered" className="mb-8">
        <CardHeader>
          <CardTitle>Align Start</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" spacing="md" align="start">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="accent" size="lg">Large</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="bordered" className="mb-8">
        <CardHeader>
          <CardTitle>Align Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" spacing="md" align="center">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="accent" size="lg">Large</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="glass" className="mb-8">
        <CardHeader>
          <CardTitle>Align End</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" spacing="md" align="end">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="accent" size="lg">Large</Button>
          </Stack>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Stack - Justification
      </h3>

      {/* Justification Examples */}
      <Card variant="bordered" className="mb-8">
        <CardHeader>
          <CardTitle>Justify Between</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" spacing="md" justify="between">
            <Button variant="primary" size="sm">Left</Button>
            <Button variant="accent" size="sm">Right</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="bordered" className="mb-8">
        <CardHeader>
          <CardTitle>Justify Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" spacing="md" justify="center">
            <Button variant="primary" size="sm">Centered</Button>
            <Button variant="secondary" size="sm">Items</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="glass" className="mb-8">
        <CardHeader>
          <CardTitle>Justify Evenly</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" spacing="md" justify="evenly">
            <Badge variant="primary">One</Badge>
            <Badge variant="secondary">Two</Badge>
            <Badge variant="accent">Three</Badge>
          </Stack>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Stack - Responsive Layout
      </h3>

      {/* Responsive Stack */}
      <Card variant="glass-strong" className="mb-8">
        <CardHeader>
          <CardTitle>Responsive Direction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary mb-4 text-sm">
            Vertical on mobile, horizontal on desktop (resize window to see)
          </p>
          <Stack responsive spacing="md">
            <Button variant="primary">
              <ArrowRight size={16} />
              Get Started
            </Button>
            <Button variant="outline">Learn More</Button>
            <Button variant="ghost">View Docs</Button>
          </Stack>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Stack - With Dividers
      </h3>

      {/* Divided Stack */}
      <Card variant="bordered" className="mb-8">
        <CardHeader>
          <CardTitle>Vertical Dividers</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack divide spacing="md">
            <div className="py-2">
              <h4 className="font-semibold text-text">Section One</h4>
              <p className="text-text-secondary text-sm">First section content</p>
            </div>
            <div className="py-2">
              <h4 className="font-semibold text-text">Section Two</h4>
              <p className="text-text-secondary text-sm">Second section content</p>
            </div>
            <div className="py-2">
              <h4 className="font-semibold text-text">Section Three</h4>
              <p className="text-text-secondary text-sm">Third section content</p>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="glass" className="mb-8">
        <CardHeader>
          <CardTitle>Horizontal Dividers</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack direction="horizontal" divide spacing="lg">
            <div className="px-4">
              <Badge variant="primary">Step 1</Badge>
            </div>
            <div className="px-4">
              <Badge variant="secondary">Step 2</Badge>
            </div>
            <div className="px-4">
              <Badge variant="accent">Step 3</Badge>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Practical Example - Form Actions
      </h3>

      {/* Practical Example */}
      <Card variant="glass-strong" hoverable>
        <CardHeader>
          <CardTitle>Complete Form Example</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack spacing="lg">
            <div>
              <label className="text-sm font-medium text-text mb-2 block">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Enter project name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-text mb-2 block">
                Description
              </label>
              <textarea
                placeholder="Enter description"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                rows={3}
              />
            </div>

            <Stack direction="horizontal" spacing="md" justify="between">
              <Button variant="ghost">Cancel</Button>
              <Stack direction="horizontal" spacing="sm">
                <Button variant="outline">Save Draft</Button>
                <Button variant="primary">
                  Publish
                  <ArrowRight size={16} />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};
