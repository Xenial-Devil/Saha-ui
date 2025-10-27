import Separator from "../components/Separator";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/Card";
import Button from "../components/Button";
import { ButtonGroup } from "../components/ButtonGroup";
import { User, Mail } from "lucide-react";

export const SeparatorExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Separator Component</h3>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-6">
          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Solid</p>
            <Separator variant="solid" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Dashed</p>
            <Separator variant="dashed" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Dotted</p>
            <Separator variant="dotted" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Gradient</p>
            <Separator variant="gradient" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Glass</p>
            <Separator variant="glass" />
          </div>
        </div>
      </div>

      {/* With Labels */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Labels</h4>
        <div className="space-y-6">
          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Center Label</p>
            <Separator label="OR" variant="gradient" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Left Label</p>
            <Separator label="Section Start" labelPosition="left" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Right Label</p>
            <Separator label="Section End" labelPosition="right" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Decorative</p>
            <Separator label="Continue Reading" variant="gradient" decorative />
          </div>
        </div>
      </div>

      {/* Thickness */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Thickness</h4>
        <div className="space-y-6">
          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Thin</p>
            <Separator thickness="thin" variant="solid" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Medium</p>
            <Separator thickness="medium" variant="solid" />
          </div>

          <div className="glass p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">Thick</p>
            <Separator thickness="thick" variant="gradient" />
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Spacing</h4>
        <div className="glass p-6 rounded-lg space-y-1">
          <p className="text-sm">Content above</p>
          <Separator spacing="xs" />
          <p className="text-sm">Extra Small Spacing (xs)</p>
          <Separator spacing="sm" />
          <p className="text-sm">Small Spacing (sm)</p>
          <Separator spacing="md" />
          <p className="text-sm">Medium Spacing (md)</p>
          <Separator spacing="lg" />
          <p className="text-sm">Large Spacing (lg)</p>
          <Separator spacing="xl" />
          <p className="text-sm">Extra Large Spacing (xl)</p>
        </div>
      </div>

      {/* Vertical Separators */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Vertical Orientation
        </h4>
        <div className="glass p-6 rounded-lg">
          <div className="flex items-center h-24 gap-4">
            <div className="text-sm text-center flex-1">Section 1</div>
            <Separator orientation="vertical" className="h-full" />
            <div className="text-sm text-center flex-1">Section 2</div>
            <Separator
              orientation="vertical"
              variant="gradient"
              className="h-full"
            />
            <div className="text-sm text-center flex-1">Section 3</div>
            <Separator
              orientation="vertical"
              variant="dashed"
              thickness="medium"
              className="h-full"
            />
            <div className="text-sm text-center flex-1">Section 4</div>
          </div>
        </div>

        <div className="glass p-6 rounded-lg mt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Vertical with Label
          </p>
          <div className="flex items-center h-32">
            <div className="flex-1 text-center">
              <p className="font-medium">Before</p>
              <p className="text-sm text-muted-foreground">Content</p>
            </div>
            <Separator
              orientation="vertical"
              label="OR"
              variant="glass"
              className="h-full"
            />
            <div className="flex-1 text-center">
              <p className="font-medium">After</p>
              <p className="text-sm text-muted-foreground">Content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Usage */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Contextual Usage
        </h4>

        {/* In Form */}
        <Card variant="glass" padding="lg" className="mb-4">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="primary" className="w-full">
                Sign in with Email
              </Button>

              <Separator label="OR" variant="gradient" spacing="sm" />

              <ButtonGroup fullWidth orientation="vertical">
                <Button variant="outline">
                  <User size={16} /> Continue with GitHub
                </Button>
                <Button variant="outline">
                  <Mail size={16} /> Continue with Google
                </Button>
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <CardTitle>Article</CardTitle>
            <CardDescription>Sample content layout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">
                This is the first paragraph of the article. It introduces the
                main topic and sets the context.
              </p>

              <Separator
                label="Section 1"
                labelPosition="left"
                variant="dashed"
                spacing="lg"
              />

              <p className="text-sm text-text-secondary">
                This section contains the main content. It provides detailed
                information about the topic.
              </p>

              <Separator
                label="Section 2"
                labelPosition="left"
                variant="dashed"
                spacing="lg"
              />

              <p className="text-sm text-text-secondary">
                The final section summarizes the key points and provides
                conclusions.
              </p>

              <Separator decorative spacing="lg" variant="gradient" />

              <p className="text-sm text-muted-foreground text-center">
                End of Article
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
