import React from "react";
import { Toggle, ToggleGroup } from "../components/Toggle/index";
import ThemeToggle from "../components/ThemeToggle";
import type { ToggleVariant } from "../components/Toggle/Toggle.types";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image,
  Table,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

// ============================================================================
// EXAMPLE WRAPPER
// ============================================================================

export function ToggleExample() {
  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Toggle Component</h2>
        <p className="mb-6 text-muted-foreground">
          Interactive toggle buttons with multiple variants and sizes.
        </p>
        <BasicToggleExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Theme Toggle</h2>
        <p className="mb-6 text-muted-foreground">
          Examples of the `ThemeToggle` in icon and icon-label modes. Use
          `menuClassName` to control the open menu's bg/text/border classes.
        </p>
        <div className="flex items-center gap-4">
          <ThemeToggle variant="icon" />

          <ThemeToggle
            variant="icon-label"
            menuClassName="bg-white text-foreground border border-muted"
          />

          <ThemeToggle
            variant="icon-label"
            appearance="glass"
            menuClassName="bg-primary text-white border border-primary"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>
        <p className="mb-6 text-muted-foreground">
          Different color variants for toggles.
        </p>
        <VariantsExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-6 text-muted-foreground">
          Toggle buttons in different sizes.
        </p>
        <SizesExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">With Icons</h2>
        <p className="mb-6 text-muted-foreground">
          Toggles with icons for formatting actions.
        </p>
        <WithIconsExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Toggle Group - Single</h2>
        <p className="mb-6 text-muted-foreground">
          Group of toggles with single selection (radio behavior).
        </p>
        <ToggleGroupSingleExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Toggle Group - Multiple</h2>
        <p className="mb-6 text-muted-foreground">
          Group of toggles with multiple selection (checkbox behavior).
        </p>
        <ToggleGroupMultipleExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Vertical Orientation</h2>
        <p className="mb-6 text-muted-foreground">
          Toggle groups can be arranged vertically.
        </p>
        <VerticalOrientationExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Rich Text Editor Toolbar</h2>
        <p className="mb-6 text-muted-foreground">
          Complete example of a text formatting toolbar using toggle groups.
        </p>
        <RichTextToolbarExample />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Disabled State</h2>
        <p className="mb-6 text-muted-foreground">
          Toggles and groups can be disabled.
        </p>
        <DisabledExample />
      </section>
    </div>
  );
}

// ============================================================================
// BASIC TOGGLE
// ============================================================================

function BasicToggleExample() {
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle pressed={bold} onPressedChange={setBold}>
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle pressed={italic} onPressedChange={setItalic}>
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle>
        <Underline className="h-4 w-4" />
      </Toggle>

      <Toggle>Toggle Text</Toggle>

      <Toggle>
        <Code className="h-4 w-4 mr-2" />
        Code
      </Toggle>

      <div className="ml-4 text-sm text-muted-foreground">
        Bold: {bold ? "On" : "Off"}, Italic: {italic ? "On" : "Off"}
      </div>
    </div>
  );
}

// ============================================================================
// VARIANTS
// ============================================================================

function VariantsExample() {
  const variants: Array<{ variant: ToggleVariant; label: string }> = [
    { variant: "default", label: "Default" },
    { variant: "primary", label: "Primary" },
    { variant: "secondary", label: "Secondary" },
    { variant: "accent", label: "Accent" },
    { variant: "success", label: "Success" },
    { variant: "warning", label: "Warning" },
    { variant: "error", label: "Error" },
    { variant: "info", label: "Info" },
    { variant: "outline", label: "Outline" },
    { variant: "ghost", label: "Ghost" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map(({ variant, label }) => (
        <Toggle key={variant} variant={variant}>
          {label}
        </Toggle>
      ))}
    </div>
  );
}

// ============================================================================
// SIZES
// ============================================================================

function SizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle size="sm">
        <Bold className="h-3 w-3" />
      </Toggle>

      <Toggle size="default">
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle size="lg">
        <Bold className="h-5 w-5" />
      </Toggle>

      <Toggle size="xl">
        <Bold className="h-6 w-6" />
      </Toggle>

      <div className="w-full mt-4 flex flex-wrap items-center gap-4">
        <Toggle size="sm">Small</Toggle>
        <Toggle size="default">Default</Toggle>
        <Toggle size="lg">Large</Toggle>
        <Toggle size="xl">Extra Large</Toggle>
      </div>
    </div>
  );
}

// ============================================================================
// WITH ICONS
// ============================================================================

function WithIconsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle variant="outline">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Underline className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Link2 className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Image className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline">
        <Table className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

// ============================================================================
// TOGGLE GROUP - SINGLE
// ============================================================================

function ToggleGroupSingleExample() {
  const [alignment, setAlignment] = React.useState("left");

  return (
    <div className="space-y-4">
      <ToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
        <Toggle value="left" variant="outline">
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle value="center" variant="outline">
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle value="right" variant="outline">
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle value="justify" variant="outline">
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>

      <div className="text-sm text-muted-foreground">
        Selected: {alignment || "None"}
      </div>
    </div>
  );
}

// ============================================================================
// TOGGLE GROUP - MULTIPLE
// ============================================================================

function ToggleGroupMultipleExample() {
  const [formats, setFormats] = React.useState<string[]>(["bold"]);

  return (
    <div className="space-y-4">
      <ToggleGroup
        type="multiple"
        value={formats}
        onValueChange={setFormats}
        variant="primary"
      >
        <Toggle value="bold">
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle value="italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle value="underline">
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle value="strikethrough">
          <Strikethrough className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>

      <div className="text-sm text-muted-foreground">
        Selected: {formats.length > 0 ? formats.join(", ") : "None"}
      </div>
    </div>
  );
}

// ============================================================================
// VERTICAL ORIENTATION
// ============================================================================

function VerticalOrientationExample() {
  const [heading, setHeading] = React.useState("h1");

  return (
    <div className="flex gap-8">
      <ToggleGroup
        type="single"
        value={heading}
        onValueChange={setHeading}
        orientation="vertical"
        variant="outline"
      >
        <Toggle value="h1">
          <Heading1 className="h-4 w-4 mr-2" />
          Heading 1
        </Toggle>
        <Toggle value="h2">
          <Heading2 className="h-4 w-4 mr-2" />
          Heading 2
        </Toggle>
        <Toggle value="h3">
          <Heading3 className="h-4 w-4 mr-2" />
          Heading 3
        </Toggle>
      </ToggleGroup>

      <div className="text-sm text-muted-foreground">Selected: {heading}</div>
    </div>
  );
}

// ============================================================================
// RICH TEXT TOOLBAR
// ============================================================================

function RichTextToolbarExample() {
  const [alignment, setAlignment] = React.useState("left");
  const [formats, setFormats] = React.useState<string[]>([]);
  const [listType, setListType] = React.useState("");

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex flex-wrap gap-2">
        {/* Text Formatting */}
        <ToggleGroup
          type="multiple"
          value={formats}
          onValueChange={setFormats}
          variant="outline"
          size="sm"
        >
          <Toggle value="bold">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle value="italic">
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle value="underline">
            <Underline className="h-4 w-4" />
          </Toggle>
          <Toggle value="strikethrough">
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </ToggleGroup>

        <div className="w-px h-8 bg-border" />

        {/* Alignment */}
        <ToggleGroup
          type="single"
          value={alignment}
          onValueChange={setAlignment}
          variant="outline"
          size="sm"
        >
          <Toggle value="left">
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle value="center">
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle value="right">
            <AlignRight className="h-4 w-4" />
          </Toggle>
          <Toggle value="justify">
            <AlignJustify className="h-4 w-4" />
          </Toggle>
        </ToggleGroup>

        <div className="w-px h-8 bg-border" />

        {/* Lists */}
        <ToggleGroup
          type="single"
          value={listType}
          onValueChange={setListType}
          variant="outline"
          size="sm"
        >
          <Toggle value="bullet">
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle value="numbered">
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </ToggleGroup>

        <div className="w-px h-8 bg-border" />

        {/* Special */}
        <ToggleGroup type="single" variant="outline" size="sm">
          <Toggle value="code">
            <Code className="h-4 w-4" />
          </Toggle>
          <Toggle value="quote">
            <Quote className="h-4 w-4" />
          </Toggle>
          <Toggle value="link">
            <Link2 className="h-4 w-4" />
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="text-xs text-muted-foreground">
        <div>Formats: {formats.length > 0 ? formats.join(", ") : "None"}</div>
        <div>Alignment: {alignment}</div>
        <div>List: {listType || "None"}</div>
      </div>
    </div>
  );
}

// ============================================================================
// DISABLED
// ============================================================================

function DisabledExample() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Toggle disabled>Disabled</Toggle>
        <Toggle disabled pressed>
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle disabled variant="primary">
          Primary Disabled
        </Toggle>
      </div>

      <ToggleGroup type="single" disabled variant="outline">
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
  );
}
