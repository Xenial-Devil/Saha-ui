import { ToggleGroup, ToggleGroupItem } from "../components/ToggleGroup/index";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Type,
  Image,
  Link,
  Table,
} from "lucide-react";

/**
 * ToggleGroupExample Component
 *
 * Demonstrates all features and variants of the ToggleGroup component.
 */
export default function ToggleGroupExample() {
  return (
    <div className="space-y-12 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">ToggleGroup Component</h1>
        <p className="text-muted-foreground">
          Group of toggle buttons for single or multiple selection with advanced
          features.
        </p>
      </div>

      {/* Basic Usage - Single Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Single Selection (Radio)</h2>
        <p className="text-sm text-muted-foreground">
          Only one item can be selected at a time
        </p>
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Text Alignment</h3>
            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">List Style</h3>
            <ToggleGroup type="single" defaultValue="bullet">
              <ToggleGroupItem value="bullet">
                <List className="h-4 w-4" />
                <span>Bullet</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="numbered">
                <ListOrdered className="h-4 w-4" />
                <span>Numbered</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Multiple Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Multiple Selection (Checkbox)
        </h2>
        <p className="text-sm text-muted-foreground">
          Multiple items can be selected simultaneously
        </p>
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Text Formatting</h3>
            <ToggleGroup type="multiple" defaultValue={["bold"]}>
              <ToggleGroupItem value="bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Content Types</h3>
            <ToggleGroup type="multiple" defaultValue={["text", "image"]}>
              <ToggleGroupItem value="text">
                <Type className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="image">
                <Image className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="link">
                <Link className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="table">
                <Table className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <p className="text-sm text-muted-foreground">
          Different color schemes for various contexts
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Default</h3>
            <ToggleGroup type="single" variant="default">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Primary</h3>
            <ToggleGroup type="single" variant="primary">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Secondary</h3>
            <ToggleGroup type="single" variant="secondary">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Accent</h3>
            <ToggleGroup type="single" variant="accent">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Success</h3>
            <ToggleGroup type="single" variant="success">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Warning</h3>
            <ToggleGroup type="single" variant="warning">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Error</h3>
            <ToggleGroup type="single" variant="error">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Info</h3>
            <ToggleGroup type="single" variant="info">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Outline</h3>
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Ghost</h3>
            <ToggleGroup type="single" variant="ghost">
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <p className="text-sm text-muted-foreground">
          Different sizes for various use cases
        </p>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Small</h3>
            <ToggleGroup type="single" size="sm">
              <ToggleGroupItem value="h1">
                <Heading1 className="h-3 w-3" />
              </ToggleGroupItem>
              <ToggleGroupItem value="h2">
                <Heading2 className="h-3 w-3" />
              </ToggleGroupItem>
              <ToggleGroupItem value="p">
                <Type className="h-3 w-3" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Default</h3>
            <ToggleGroup type="single" size="default">
              <ToggleGroupItem value="h1">
                <Heading1 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="h2">
                <Heading2 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="p">
                <Type className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Large</h3>
            <ToggleGroup type="single" size="lg">
              <ToggleGroupItem value="h1">
                <Heading1 className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="h2">
                <Heading2 className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="p">
                <Type className="h-5 w-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Extra Large</h3>
            <ToggleGroup type="single" size="xl">
              <ToggleGroupItem value="h1">
                <Heading1 className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="h2">
                <Heading2 className="h-5 w-5" />
              </ToggleGroupItem>
              <ToggleGroupItem value="p">
                <Type className="h-5 w-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Spacing</h2>
        <p className="text-sm text-muted-foreground">
          Control the gap between toggle items
        </p>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">No Spacing (Attached)</h3>
            <ToggleGroup type="single" spacing={0} variant="outline">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 1 (Default)</h3>
            <ToggleGroup type="single" spacing={1}>
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 2</h3>
            <ToggleGroup type="single" spacing={2}>
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 3</h3>
            <ToggleGroup type="single" spacing={3}>
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 4</h3>
            <ToggleGroup type="single" spacing={4}>
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Orientation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Orientation</h2>
        <p className="text-sm text-muted-foreground">
          Horizontal or vertical layout
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Horizontal (Default)</h3>
            <ToggleGroup type="single" orientation="horizontal">
              <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Vertical</h3>
            <ToggleGroup type="single" orientation="vertical">
              <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Vertical with No Spacing</h3>
            <ToggleGroup
              type="single"
              orientation="vertical"
              spacing={0}
              variant="outline"
            >
              <ToggleGroupItem value="1">Option 1</ToggleGroupItem>
              <ToggleGroupItem value="2">Option 2</ToggleGroupItem>
              <ToggleGroupItem value="3">Option 3</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <p className="text-sm text-muted-foreground">
          Disable the entire group or individual items
        </p>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Entire Group Disabled</h3>
            <ToggleGroup type="single" disabled>
              <ToggleGroupItem value="1">One</ToggleGroupItem>
              <ToggleGroupItem value="2">Two</ToggleGroupItem>
              <ToggleGroupItem value="3">Three</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Individual Items Disabled</h3>
            <ToggleGroup type="single">
              <ToggleGroupItem value="1">Enabled</ToggleGroupItem>
              <ToggleGroupItem value="2" disabled>
                Disabled
              </ToggleGroupItem>
              <ToggleGroupItem value="3">Enabled</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Advanced Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Advanced Use Cases</h2>
        <p className="text-sm text-muted-foreground">
          Real-world examples and combinations
        </p>
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Rich Text Editor Toolbar</h3>
            <div className="flex flex-wrap gap-2">
              <ToggleGroup type="multiple" spacing={0} variant="outline">
                <ToggleGroupItem value="bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup type="single" spacing={0} variant="outline">
                <ToggleGroupItem value="left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup type="single" spacing={0} variant="outline">
                <ToggleGroupItem value="quote">
                  <Quote className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="code">
                  <Code className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Sidebar Navigation</h3>
            <ToggleGroup
              type="single"
              orientation="vertical"
              spacing={1}
              variant="ghost"
              className="w-48"
            >
              <ToggleGroupItem value="content">
                <Type className="h-4 w-4" />
                <span>Content</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="media">
                <Image className="h-4 w-4" />
                <span>Media</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="links">
                <Link className="h-4 w-4" />
                <span>Links</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="tables">
                <Table className="h-4 w-4" />
                <span>Tables</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Segmented Control (Primary)</h3>
            <ToggleGroup
              type="single"
              spacing={0}
              variant="primary"
              defaultValue="all"
            >
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="active">Active</ToggleGroupItem>
              <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
