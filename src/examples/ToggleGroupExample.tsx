import { ToggleGroup, Toggle } from "../components/ToggleGroup/index";
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
              <Toggle value="left">
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle value="center">
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle value="right">
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">List Style</h3>
            <ToggleGroup type="single" defaultValue="bullet">
              <Toggle value="bullet">
                <List className="h-4 w-4" />
                <span>Bullet</span>
              </Toggle>
              <Toggle value="numbered">
                <ListOrdered className="h-4 w-4" />
                <span>Numbered</span>
              </Toggle>
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
              <Toggle value="bold">
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle value="italic">
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle value="underline">
                <Underline className="h-4 w-4" />
              </Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Content Types</h3>
            <ToggleGroup type="multiple" defaultValue={["text", "image"]}>
              <Toggle value="text">
                <Type className="h-4 w-4" />
              </Toggle>
              <Toggle value="image">
                <Image className="h-4 w-4" />
              </Toggle>
              <Toggle value="link">
                <Link className="h-4 w-4" />
              </Toggle>
              <Toggle value="table">
                <Table className="h-4 w-4" />
              </Toggle>
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
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Primary</h3>
            <ToggleGroup type="single" variant="primary">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Secondary</h3>
            <ToggleGroup type="single" variant="secondary">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Accent</h3>
            <ToggleGroup type="single" variant="accent">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Success</h3>
            <ToggleGroup type="single" variant="success">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Warning</h3>
            <ToggleGroup type="single" variant="warning">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Error</h3>
            <ToggleGroup type="single" variant="error">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Info</h3>
            <ToggleGroup type="single" variant="info">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Outline</h3>
            <ToggleGroup type="single" variant="outline">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Ghost</h3>
            <ToggleGroup type="single" variant="ghost">
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
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
              <Toggle value="h1">
                <Heading1 className="h-3 w-3" />
              </Toggle>
              <Toggle value="h2">
                <Heading2 className="h-3 w-3" />
              </Toggle>
              <Toggle value="p">
                <Type className="h-3 w-3" />
              </Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Default</h3>
            <ToggleGroup type="single" size="default">
              <Toggle value="h1">
                <Heading1 className="h-4 w-4" />
              </Toggle>
              <Toggle value="h2">
                <Heading2 className="h-4 w-4" />
              </Toggle>
              <Toggle value="p">
                <Type className="h-4 w-4" />
              </Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Large</h3>
            <ToggleGroup type="single" size="lg">
              <Toggle value="h1">
                <Heading1 className="h-5 w-5" />
              </Toggle>
              <Toggle value="h2">
                <Heading2 className="h-5 w-5" />
              </Toggle>
              <Toggle value="p">
                <Type className="h-5 w-5" />
              </Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Extra Large</h3>
            <ToggleGroup type="single" size="xl">
              <Toggle value="h1">
                <Heading1 className="h-5 w-5" />
              </Toggle>
              <Toggle value="h2">
                <Heading2 className="h-5 w-5" />
              </Toggle>
              <Toggle value="p">
                <Type className="h-5 w-5" />
              </Toggle>
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
              <Toggle value="left">Left</Toggle>
              <Toggle value="center">Center</Toggle>
              <Toggle value="right">Right</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 1 (Default)</h3>
            <ToggleGroup type="single" spacing={1}>
              <Toggle value="left">Left</Toggle>
              <Toggle value="center">Center</Toggle>
              <Toggle value="right">Right</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 2</h3>
            <ToggleGroup type="single" spacing={2}>
              <Toggle value="left">Left</Toggle>
              <Toggle value="center">Center</Toggle>
              <Toggle value="right">Right</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 3</h3>
            <ToggleGroup type="single" spacing={3}>
              <Toggle value="left">Left</Toggle>
              <Toggle value="center">Center</Toggle>
              <Toggle value="right">Right</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Spacing 4</h3>
            <ToggleGroup type="single" spacing={4}>
              <Toggle value="left">Left</Toggle>
              <Toggle value="center">Center</Toggle>
              <Toggle value="right">Right</Toggle>
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
              <Toggle value="1">Option 1</Toggle>
              <Toggle value="2">Option 2</Toggle>
              <Toggle value="3">Option 3</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Vertical</h3>
            <ToggleGroup type="single" orientation="vertical">
              <Toggle value="1">Option 1</Toggle>
              <Toggle value="2">Option 2</Toggle>
              <Toggle value="3">Option 3</Toggle>
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
              <Toggle value="1">Option 1</Toggle>
              <Toggle value="2">Option 2</Toggle>
              <Toggle value="3">Option 3</Toggle>
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
              <Toggle value="1">One</Toggle>
              <Toggle value="2">Two</Toggle>
              <Toggle value="3">Three</Toggle>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium">Individual Items Disabled</h3>
            <ToggleGroup type="single">
              <Toggle value="1">Enabled</Toggle>
              <Toggle value="2" disabled>
                Disabled
              </Toggle>
              <Toggle value="3">Enabled</Toggle>
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
                <Toggle value="bold">
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle value="italic">
                  <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle value="underline">
                  <Underline className="h-4 w-4" />
                </Toggle>
              </ToggleGroup>

              <ToggleGroup type="single" spacing={0} variant="outline">
                <Toggle value="left">
                  <AlignLeft className="h-4 w-4" />
                </Toggle>
                <Toggle value="center">
                  <AlignCenter className="h-4 w-4" />
                </Toggle>
                <Toggle value="right">
                  <AlignRight className="h-4 w-4" />
                </Toggle>
              </ToggleGroup>

              <ToggleGroup type="single" spacing={0} variant="outline">
                <Toggle value="quote">
                  <Quote className="h-4 w-4" />
                </Toggle>
                <Toggle value="code">
                  <Code className="h-4 w-4" />
                </Toggle>
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
              <Toggle value="content">
                <Type className="h-4 w-4" />
                <span>Content</span>
              </Toggle>
              <Toggle value="media">
                <Image className="h-4 w-4" />
                <span>Media</span>
              </Toggle>
              <Toggle value="links">
                <Link className="h-4 w-4" />
                <span>Links</span>
              </Toggle>
              <Toggle value="tables">
                <Table className="h-4 w-4" />
                <span>Tables</span>
              </Toggle>
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
              <Toggle value="all">All</Toggle>
              <Toggle value="active">Active</Toggle>
              <Toggle value="completed">Completed</Toggle>
            </ToggleGroup>
          </div>
        </div>
      </section>
    </div>
  );
}
