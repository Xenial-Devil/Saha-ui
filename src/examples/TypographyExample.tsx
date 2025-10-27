import {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  Code,
  InlineCode,
  List,
} from "../components/Typography/index";
import type {
  TypographyColor,
  TypographyWeight,
} from "../components/Typography/Typography.types";

// ============================================================================
// EXAMPLE WRAPPER
// ============================================================================

export function TypographyExample() {
  return (
    <div className="space-y-12 p-8 max-w-4xl">
      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">
          Typography Components
        </h2>
        <p className="mb-6 text-muted-foreground">
          Comprehensive typography system with semantic HTML elements and
          beautiful styling.
        </p>
        <HeadingsExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">Text Variants</h2>
        <TextVariantsExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">Colors</h2>
        <ColorsExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">Alignment</h2>
        <AlignmentExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">Font Weights</h2>
        <WeightsExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">
          Text Transform
        </h2>
        <TransformExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">
          Text Decoration
        </h2>
        <DecorationExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">Truncation</h2>
        <TruncationExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">Code & Quotes</h2>
        <CodeQuotesExample />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold border-b pb-2">
          Complete Article Example
        </h2>
        <ArticleExample />
      </section>
    </div>
  );
}

// ============================================================================
// HEADINGS
// ============================================================================

function HeadingsExample() {
  return (
    <div className="space-y-4">
      <H1>Heading 1 - The largest heading</H1>
      <H2>Heading 2 - Section heading</H2>
      <H3>Heading 3 - Subsection heading</H3>
      <H4>Heading 4 - Minor heading</H4>
      <H5>Heading 5 - Small heading</H5>
      <H6>Heading 6 - Smallest heading</H6>

      <div className="mt-6 border-t pt-6">
        <Typography variant="h3" className="mb-2">
          Using Compact API
        </Typography>
        <Typography variant="h1">This is also a Heading 1</Typography>
      </div>
    </div>
  );
}

// ============================================================================
// TEXT VARIANTS
// ============================================================================

function TextVariantsExample() {
  return (
    <div className="space-y-4">
      <P>
        This is a regular paragraph. It has standard styling with proper line
        height and spacing. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </P>

      <Lead>
        This is a lead paragraph. It's larger and muted, perfect for
        introductory text or important summaries.
      </Lead>

      <Large>
        This is large text. It's slightly bigger than regular text and uses
        semibold weight.
      </Large>

      <Small>This is small text. Perfect for captions or footnotes.</Small>

      <Muted>
        This is muted text. It has reduced opacity and is great for secondary
        information.
      </Muted>
    </div>
  );
}

// ============================================================================
// COLORS
// ============================================================================

function ColorsExample() {
  const colors: Array<{ color: TypographyColor; label: string }> = [
    { color: "default", label: "Default" },
    { color: "primary", label: "Primary" },
    { color: "secondary", label: "Secondary" },
    { color: "accent", label: "Accent" },
    { color: "success", label: "Success" },
    { color: "warning", label: "Warning" },
    { color: "error", label: "Error" },
    { color: "info", label: "Info" },
    { color: "muted", label: "Muted" },
  ];

  return (
    <div className="space-y-3">
      {colors.map(({ color, label }) => (
        <Typography key={color} variant="p" color={color}>
          {label} - The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  );
}

// ============================================================================
// ALIGNMENT
// ============================================================================

function AlignmentExample() {
  return (
    <div className="space-y-4 border rounded-lg p-4 bg-muted/20">
      <P align="left">This text is aligned to the left (default)</P>
      <P align="center">This text is centered</P>
      <P align="right">This text is aligned to the right</P>
      <P align="justify">
        This text is justified. It will stretch to fill the entire width of the
        container, creating even margins on both sides. This is particularly
        useful for long paragraphs of text in articles or documentation.
      </P>
    </div>
  );
}

// ============================================================================
// WEIGHTS
// ============================================================================

function WeightsExample() {
  const weights: Array<{ weight: TypographyWeight; label: string }> = [
    { weight: "thin", label: "Thin (100)" },
    { weight: "extralight", label: "Extra Light (200)" },
    { weight: "light", label: "Light (300)" },
    { weight: "normal", label: "Normal (400)" },
    { weight: "medium", label: "Medium (500)" },
    { weight: "semibold", label: "Semibold (600)" },
    { weight: "bold", label: "Bold (700)" },
    { weight: "extrabold", label: "Extra Bold (800)" },
    { weight: "black", label: "Black (900)" },
  ];

  return (
    <div className="space-y-2">
      {weights.map(({ weight, label }) => (
        <Typography key={weight} variant="p" weight={weight}>
          {label} - The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  );
}

// ============================================================================
// TRANSFORM
// ============================================================================

function TransformExample() {
  return (
    <div className="space-y-3">
      <Typography variant="p" transform="none">
        Normal case - The Quick Brown Fox
      </Typography>
      <Typography variant="p" transform="uppercase">
        Uppercase - The Quick Brown Fox
      </Typography>
      <Typography variant="p" transform="lowercase">
        Lowercase - The Quick Brown Fox
      </Typography>
      <Typography variant="p" transform="capitalize">
        capitalize - the quick brown fox
      </Typography>
    </div>
  );
}

// ============================================================================
// DECORATION
// ============================================================================

function DecorationExample() {
  return (
    <div className="space-y-3">
      <Typography variant="p" decoration="none">
        No decoration - Normal text
      </Typography>
      <Typography variant="p" decoration="underline">
        Underline - This text is underlined
      </Typography>
      <Typography variant="p" decoration="overline">
        Overline - This text has a line above it
      </Typography>
      <Typography variant="p" decoration="lineThrough">
        Line through - This text is crossed out
      </Typography>
    </div>
  );
}

// ============================================================================
// TRUNCATION
// ============================================================================

function TruncationExample() {
  const longText =
    "This is a very long text that demonstrates the truncation feature. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-muted/20">
      <div>
        <Small className="mb-2 block text-muted-foreground">
          Normal (no truncate)
        </Small>
        <Typography variant="p" truncate="none">
          {longText}
        </Typography>
      </div>

      <div>
        <Small className="mb-2 block text-muted-foreground">Truncate</Small>
        <Typography variant="p" truncate="truncate">
          {longText}
        </Typography>
      </div>

      <div>
        <Small className="mb-2 block text-muted-foreground">Ellipsis</Small>
        <Typography variant="p" truncate="ellipsis">
          {longText}
        </Typography>
      </div>

      <div>
        <Small className="mb-2 block text-muted-foreground">Clip</Small>
        <Typography variant="p" truncate="clip">
          {longText}
        </Typography>
      </div>
    </div>
  );
}

// ============================================================================
// CODE & QUOTES
// ============================================================================

function CodeQuotesExample() {
  return (
    <div className="space-y-6">
      <div>
        <H3 className="mb-4">Blockquote</H3>
        <Blockquote>
          "The only way to do great work is to love what you do. If you haven't
          found it yet, keep looking. Don't settle."
          <footer className="mt-2 text-sm">— Steve Jobs</footer>
        </Blockquote>
      </div>

      <div>
        <H3 className="mb-4">Inline Code</H3>
        <P>
          To install the package, run{" "}
          <InlineCode>npm install saha-ui</InlineCode> in your terminal.
        </P>
      </div>

      <div>
        <H3 className="mb-4">Code Block</H3>
        <Code>
          const greeting = "Hello, World!";
          <br />
          console.log(greeting);
        </Code>
      </div>

      <div>
        <H3 className="mb-4">List</H3>
        <List>
          <li>First item in the list</li>
          <li>Second item in the list</li>
          <li>Third item in the list</li>
          <li>
            Nested lists are supported
            <ul className="my-2 ml-6 list-circle">
              <li>Nested item 1</li>
              <li>Nested item 2</li>
            </ul>
          </li>
        </List>
      </div>
    </div>
  );
}

// ============================================================================
// ARTICLE EXAMPLE
// ============================================================================

function ArticleExample() {
  return (
    <article className="space-y-6 border rounded-lg p-6 bg-card">
      <H1>Getting Started with React Components</H1>

      <Lead>
        Learn how to build beautiful and accessible React components with modern
        best practices and TypeScript support.
      </Lead>

      <H2>Introduction</H2>
      <P>
        React has revolutionized the way we build user interfaces. By breaking
        down complex UIs into smaller, reusable components, we can create
        maintainable and scalable applications.
      </P>

      <H3>Why Component Libraries?</H3>
      <P>
        Component libraries provide a consistent design system and accelerate
        development. They offer:
      </P>

      <List>
        <li>Consistent styling across your application</li>
        <li>Accessibility features built-in</li>
        <li>TypeScript support for type safety</li>
        <li>Responsive design out of the box</li>
      </List>

      <H3>Getting Started</H3>
      <P>
        To get started, install the package using{" "}
        <InlineCode>npm install saha-ui</InlineCode>. Then import the components
        you need:
      </P>

      <Code>import &#123; Button, Card, Typography &#125; from 'saha-ui';</Code>

      <Blockquote>
        Remember to wrap your app with the ThemeProvider for proper styling and
        dark mode support.
      </Blockquote>

      <H2>Best Practices</H2>
      <P>
        When building with components, keep these principles in mind for optimal
        results and maintainability.
      </P>

      <Muted>
        This article was last updated on January 2025. Check the documentation
        for the latest features.
      </Muted>
    </article>
  );
}
