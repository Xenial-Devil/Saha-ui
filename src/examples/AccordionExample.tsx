import { useState, useCallback } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordion,
} from "../components/Accordion";
import type {
  AccordionVariant,
  AccordionSize,
  AccordionOrientation,
  HeadingLevel,
} from "../components/Accordion";
import Card from "../components/Card";
import { Plus, Minus, ChevronRight, Star, Settings, Info } from "lucide-react";

// ============================================================================
// Type Definitions
// ============================================================================

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  disabled?: boolean;
}

interface TechnologyCategory {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// ============================================================================
// Data
// ============================================================================

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.",
  },
  {
    id: "item-2",
    question: "What is TypeScript?",
    answer:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  },
  {
    id: "item-3",
    question: "What is Tailwind CSS?",
    answer:
      "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs.",
  },
];

const toolItems: FAQItem[] = [
  {
    id: "tool-1",
    question: "What is Vite?",
    answer:
      "Vite is a modern build tool that provides fast development and optimized production builds for modern web projects.",
  },
  {
    id: "tool-2",
    question: "What is CVA?",
    answer:
      "Class Variance Authority (CVA) is a utility for creating type-safe variant-based component styling with Tailwind CSS.",
  },
  {
    id: "tool-3",
    question: "What is shadcn/ui?",
    answer:
      "shadcn/ui is a collection of beautifully designed components built with Radix UI and Tailwind CSS that you can copy and paste into your apps.",
  },
];

const accessibilityItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is it accessible?",
    answer:
      "Yes. It adheres to the WAI-ARIA design pattern with proper keyboard navigation and ARIA attributes.",
  },
  {
    id: "faq-2",
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that are beautiful and can be easily customized with Tailwind CSS classes.",
  },
  {
    id: "faq-3",
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default with smooth transitions using CSS transitions and transforms.",
  },
  {
    id: "faq-4",
    question: "Is this item disabled?",
    answer: "This item is disabled and cannot be opened.",
    disabled: true,
  },
];

const technologyCategories: TechnologyCategory[] = [
  {
    id: "toggle-1",
    title: "Frontend Technologies",
    description:
      "HTML, CSS, JavaScript, React, Vue, Angular, Svelte, and many more frameworks and libraries for building modern web applications.",
  },
  {
    id: "toggle-2",
    title: "Backend Technologies",
    description:
      "Node.js, Python (Django/Flask), Ruby on Rails, PHP, Java (Spring Boot), and other server-side technologies.",
  },
  {
    id: "toggle-3",
    title: "Database Technologies",
    description:
      "MySQL, PostgreSQL, MongoDB, Redis, and other database management systems for data storage and retrieval.",
  },
];

const designSystemItems: TechnologyCategory[] = [
  {
    id: "card-1",
    title: "Design Systems",
    description:
      "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build applications.",
  },
  {
    id: "card-2",
    title: "Component Libraries",
    description:
      "Component libraries like Material-UI, Ant Design, Chakra UI, and shadcn/ui provide pre-built components to speed up development.",
  },
  {
    id: "card-3",
    title: "Custom Components",
    description:
      "Building custom components allows for complete control over design, functionality, and user experience tailored to specific needs.",
  },
];

// ============================================================================
// Section Components
// ============================================================================

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => (
  <div className="mb-8">
    <h4 className="text-lg font-semibold mb-2 text-text">{title}</h4>
    {description && (
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
    )}
    {children}
  </div>
);

// ============================================================================
// Basic Examples
// ============================================================================

const SingleModeExample: React.FC = () => {
  const handleValueChange = useCallback((value: string | string[]) => {
    console.log("Single mode value changed:", value);
  }, []);

  return (
    <Section
      title="Single Mode (Default)"
      description="Only one item can be open at a time. Clicking another item closes the current one."
    >
      <Accordion
        type="single"
        defaultValue="item-1"
        onValueChange={handleValueChange}
        onOpenStart={(value) => console.log(`Opening: ${value}`)}
        onOpenEnd={(value) => console.log(`Opened: ${value}`)}
        onCloseStart={(value) => console.log(`Closing: ${value}`)}
        onCloseEnd={(value) => console.log(`Closed: ${value}`)}
      >
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            headingLevel={3}
            onOpenChange={(isOpen) =>
              console.log(`${item.id} is now ${isOpen ? "open" : "closed"}`)
            }
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

const CollapsibleExample: React.FC = () => {
  return (
    <Section
      title="Single Mode (Collapsible)"
      description="Can close all items by clicking the open item again."
    >
      <Accordion type="single" collapsible variant="controlled">
        {toolItems.map((item) => (
          <AccordionItem key={item.id} value={item.id} headingLevel={3}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

const MultipleModeExample: React.FC = () => {
  const handleValueChange = useCallback((value: string | string[]) => {
    console.log("Multiple mode values:", value);
  }, []);

  return (
    <Section
      title="Multiple Mode"
      description="Multiple items can be open simultaneously."
    >
      <Accordion
        type="multiple"
        defaultValue={["faq-1", "faq-2"]}
        variant="allopen"
        onValueChange={handleValueChange}
      >
        {accessibilityItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            headingLevel={3}
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

// ============================================================================
// Controlled Example
// ============================================================================

const ControlledExample: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const handleSingleChange = useCallback((value: string | string[]) => {
    setSingleValue(value as string);
  }, []);

  const handleMultipleChange = useCallback((value: string | string[]) => {
    setMultipleValues(value as string[]);
  }, []);

  return (
    <Section
      title="Controlled Mode"
      description="External state management with buttons to control accordion."
    >
      <div className="space-y-6">
        {/* Single Controlled */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSingleValue("ctrl-1")}
              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Item 1
            </button>
            <button
              onClick={() => setSingleValue("ctrl-2")}
              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open Item 2
            </button>
            <button
              onClick={() => setSingleValue("")}
              className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              Close All
            </button>
            <span className="px-3 py-1.5 text-sm bg-muted rounded-md">
              Current: {singleValue || "none"}
            </span>
          </div>
          <Accordion
            type="single"
            value={singleValue}
            onValueChange={handleSingleChange}
            collapsible
          >
            <AccordionItem value="ctrl-1">
              <AccordionTrigger>Controlled Item 1</AccordionTrigger>
              <AccordionContent>
                This accordion is controlled externally. Use the buttons above
                to control it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ctrl-2">
              <AccordionTrigger>Controlled Item 2</AccordionTrigger>
              <AccordionContent>
                State is managed by React useState hook outside the component.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Multiple Controlled */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setMultipleValues(["multi-1", "multi-2"])}
              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Open All
            </button>
            <button
              onClick={() => setMultipleValues([])}
              className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              Close All
            </button>
            <span className="px-3 py-1.5 text-sm bg-muted rounded-md">
              Open:{" "}
              {multipleValues.length > 0 ? multipleValues.join(", ") : "none"}
            </span>
          </div>
          <Accordion
            type="multiple"
            value={multipleValues}
            onValueChange={handleMultipleChange}
            variant="glass"
          >
            <AccordionItem value="multi-1">
              <AccordionTrigger>Multiple Controlled 1</AccordionTrigger>
              <AccordionContent>
                Multiple items can be controlled simultaneously.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="multi-2">
              <AccordionTrigger>Multiple Controlled 2</AccordionTrigger>
              <AccordionContent>
                Each item can be toggled independently.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Section>
  );
};

// ============================================================================
// Size Variants Example
// ============================================================================

const SizeVariantsExample: React.FC = () => {
  const sizes: AccordionSize[] = ["sm", "md", "lg"];

  return (
    <Section
      title="Size Variants"
      description="Different sizes for various use cases."
    >
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size}>
            <p className="text-sm font-medium mb-2 capitalize">{size} Size</p>
            <Accordion type="single" collapsible size={size}>
              <AccordionItem value={`${size}-1`}>
                <AccordionTrigger>
                  {size.toUpperCase()} Size Accordion
                </AccordionTrigger>
                <AccordionContent>
                  This accordion uses the {size} size variant. Notice the
                  different padding and font sizes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ============================================================================
// Custom Icons Example
// ============================================================================

const CustomIconsExample: React.FC = () => {
  return (
    <Section
      title="Custom Icons"
      description="Various icon configurations and positions."
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="icon-1">
          <AccordionTrigger
            openIcon={<Minus className="h-5 w-5 text-primary" />}
            closedIcon={<Plus className="h-5 w-5 text-muted-foreground" />}
          >
            Plus/Minus Icons
          </AccordionTrigger>
          <AccordionContent>
            This item uses custom plus and minus icons for open/closed states.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="icon-2">
          <AccordionTrigger
            icon={
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-90" />
            }
          >
            Rotating Chevron Right
          </AccordionTrigger>
          <AccordionContent>
            This item uses a single icon that rotates when opened.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="icon-3">
          <AccordionTrigger iconPosition="left">
            Icon on Left Side
          </AccordionTrigger>
          <AccordionContent>
            The icon is positioned on the left side of the trigger.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="icon-4">
          <AccordionTrigger
            iconPosition="left"
            icon={<Star className="h-5 w-5 text-yellow-500" />}
          >
            Custom Icon on Left
          </AccordionTrigger>
          <AccordionContent>
            Combining custom icon with left position.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="icon-5">
          <AccordionTrigger hideIcon>No Icon at All</AccordionTrigger>
          <AccordionContent>
            This item has no icon - the hideIcon prop is set to true.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};

// ============================================================================
// Keyboard Navigation Example
// ============================================================================

const KeyboardNavigationExample: React.FC = () => {
  return (
    <Section
      title="Keyboard Navigation"
      description="Full keyboard support with loop navigation enabled."
    >
      <div className="p-4 bg-muted rounded-lg text-sm mb-4">
        <p className="font-semibold mb-2">Keyboard Controls:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>
            <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">↓</kbd>{" "}
            /{" "}
            <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">↑</kbd>{" "}
            - Navigate between items
          </li>
          <li>
            <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">
              Home
            </kbd>{" "}
            - Go to first item
          </li>
          <li>
            <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">
              End
            </kbd>{" "}
            - Go to last item
          </li>
          <li>
            <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">
              Enter
            </kbd>{" "}
            /{" "}
            <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">
              Space
            </kbd>{" "}
            - Toggle current item
          </li>
        </ul>
      </div>
      <Accordion type="single" collapsible loop>
        <AccordionItem value="nav-1">
          <AccordionTrigger>First Item (loops to last)</AccordionTrigger>
          <AccordionContent>
            Press Down Arrow to navigate to the next item. From the last item,
            it will loop back here.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="nav-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>
            Use Up/Down arrows to navigate, Home/End to jump to first/last.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="nav-3">
          <AccordionTrigger>Third Item (loops to first)</AccordionTrigger>
          <AccordionContent>
            Press Down Arrow from here to loop back to the first item.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};

// ============================================================================
// Animation & Performance Example
// ============================================================================

const AnimationPerformanceExample: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  }, []);

  return (
    <Section
      title="Animation & Performance"
      description="Custom animation duration, lazy mounting, and callbacks."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium mb-2">
            Lazy Mount with 500ms Animation
          </p>
          <Accordion
            type="single"
            collapsible
            lazyMount
            unmountOnClose
            animationDuration={500}
            onOpenStart={(value) => addLog(`Opening: ${value}`)}
            onOpenEnd={(value) => addLog(`Opened: ${value}`)}
            onCloseStart={(value) => addLog(`Closing: ${value}`)}
            onCloseEnd={(value) => addLog(`Closed: ${value}`)}
          >
            <AccordionItem value="lazy-1">
              <AccordionTrigger>Lazy Loaded Content</AccordionTrigger>
              <AccordionContent
                onAnimationStart={() => addLog("Animation started")}
                onAnimationEnd={() => addLog("Animation ended")}
              >
                This content is only mounted when first opened and unmounted
                when closed. Check the console for mount/unmount logs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="lazy-2">
              <AccordionTrigger>Another Lazy Item</AccordionTrigger>
              <AccordionContent>
                Content is lazy loaded for better performance with many items.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Event Log</p>
          <div className="bg-muted rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">
                Interact with the accordion to see events...
              </p>
            ) : (
              logs.map((log, index) => (
                <p key={index} className="text-muted-foreground">
                  {log}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

// ============================================================================
// Force Mount Example
// ============================================================================

const ForceMountExample: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", name: "" });

  return (
    <Section
      title="Force Mount (Form State Preservation)"
      description="Content stays in DOM even when closed - useful for forms."
    >
      <Accordion type="single" collapsible>
        <AccordionItem value="form-1">
          <AccordionTrigger>
            <span className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Form with Preserved State
            </span>
          </AccordionTrigger>
          <AccordionContent forceMount>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Close and reopen this accordion - form values are preserved!
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Current values: Name: "{formData.name || "(empty)"}", Email: "
                {formData.email || "(empty)"}"
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  );
};

// ============================================================================
// Heading Levels Example
// ============================================================================

const HeadingLevelsExample: React.FC = () => {
  const headingLevels: HeadingLevel[] = [2, 3, 4, 5];

  return (
    <Section
      title="Semantic Heading Levels"
      description="Proper heading hierarchy for accessibility."
    >
      <Accordion type="single" collapsible>
        {headingLevels.map((level) => (
          <AccordionItem
            key={`h${level}`}
            value={`heading-${level}`}
            headingLevel={level}
          >
            <AccordionTrigger>
              This trigger is wrapped in an H{level} element
            </AccordionTrigger>
            <AccordionContent>
              Using headingLevel={level} ensures proper document outline and
              screen reader navigation. Inspect the DOM to see the h{level}{" "}
              wrapper.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

// ============================================================================
// Disabled States Example
// ============================================================================

const DisabledStatesExample: React.FC = () => {
  return (
    <Section
      title="Disabled States"
      description="Individual items or entire accordion can be disabled."
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium mb-2">Disabled Items</p>
          <Accordion type="single" collapsible>
            <AccordionItem value="enabled-1">
              <AccordionTrigger>Enabled Item 1</AccordionTrigger>
              <AccordionContent>This item works normally.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="disabled-1" disabled>
              <AccordionTrigger>Disabled Item</AccordionTrigger>
              <AccordionContent>You cannot open this content.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="enabled-2">
              <AccordionTrigger>Enabled Item 2</AccordionTrigger>
              <AccordionContent>
                This item also works normally.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Entire Accordion Disabled</p>
          <Accordion type="single" collapsible disabled>
            <AccordionItem value="all-disabled-1">
              <AccordionTrigger>Cannot Open</AccordionTrigger>
              <AccordionContent>Content is inaccessible.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="all-disabled-2">
              <AccordionTrigger>Also Cannot Open</AccordionTrigger>
              <AccordionContent>Content is inaccessible.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Section>
  );
};

// ============================================================================
// All Variants Showcase
// ============================================================================

const VariantsShowcase: React.FC = () => {
  const variants: AccordionVariant[] = [
    "default",
    "controlled",
    "allopen",
    "toggle",
    "firstopen",
    "glass",
  ];

  return (
    <Section
      title="All Variants"
      description="Visual style variants for different contexts."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {variants.map((variant) => (
          <div key={variant}>
            <p className="text-sm font-medium mb-2 capitalize">{variant}</p>
            <Accordion type="single" collapsible variant={variant}>
              <AccordionItem value={`${variant}-1`}>
                <AccordionTrigger>{variant} Variant</AccordionTrigger>
                <AccordionContent>
                  This accordion uses the "{variant}" variant styling.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ============================================================================
// Using Hook Directly Example
// ============================================================================

const UsingHookExample: React.FC = () => {
  const accordion = useAccordion({
    type: "multiple",
    defaultValue: ["hook-1"],
    collapsible: true,
    loop: true,
    onValueChange: (value) => console.log("Hook value changed:", value),
  });

  return (
    <Section
      title="Using useAccordion Hook Directly"
      description="Build custom accordion UI using the hook."
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => accordion.openAll()}
            className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Open All
          </button>
          <button
            onClick={() => accordion.closeAll()}
            className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
          >
            Close All
          </button>
          <button
            onClick={() => accordion.toggleItem("hook-2")}
            className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
          >
            Toggle Item 2
          </button>
        </div>

        <div className="p-3 bg-muted rounded-lg text-sm">
          <p>
            <strong>Open items:</strong>{" "}
            {Array.isArray(accordion.value) && accordion.value.length > 0
              ? accordion.value.join(", ")
              : "none"}
          </p>
        </div>

        <div className="space-y-2">
          {["hook-1", "hook-2", "hook-3"].map((item) => (
            <div
              key={item}
              className="border rounded-lg overflow-hidden cursor-pointer transition-colors hover:border-primary/50"
              onClick={() => accordion.handleValueChange(item)}
            >
              <div className="flex justify-between items-center p-4 bg-card">
                <span className="font-medium">{item}</span>
                <span
                  className={`text-sm ${
                    accordion.isItemOpen(item)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {accordion.isItemOpen(item) ? "Open" : "Closed"}
                </span>
              </div>
              {accordion.isItemOpen(item) && (
                <div className="p-4 pt-0 text-muted-foreground">
                  Custom content for {item} built using the useAccordion hook.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ============================================================================
// In Card Context Example
// ============================================================================

const InCardContextExample: React.FC = () => {
  return (
    <Section
      title="In Card Context"
      description="Accordion nested within a Card component."
    >
      <Card variant="glass" padding="none">
        <Accordion type="single" defaultValue="card-1" variant="firstopen">
          {designSystemItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} headingLevel={3}>
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  {item.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </Section>
  );
};

// ============================================================================
// Main Example Component
// ============================================================================

export const AccordionExample: React.FC = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Accordion Component</h3>

      {/* Basic Examples */}
      <SingleModeExample />
      <CollapsibleExample />
      <MultipleModeExample />

      {/* Controlled Mode */}
      <ControlledExample />

      {/* Size Variants */}
      <SizeVariantsExample />

      {/* Custom Icons */}
      <CustomIconsExample />

      {/* Keyboard Navigation */}
      <KeyboardNavigationExample />

      {/* Animation & Performance */}
      <AnimationPerformanceExample />

      {/* Force Mount */}
      <ForceMountExample />

      {/* Heading Levels */}
      <HeadingLevelsExample />

      {/* Disabled States */}
      <DisabledStatesExample />

      {/* All Variants */}
      <VariantsShowcase />

      {/* Using Hook */}
      <UsingHookExample />

      {/* Toggle Variant */}
      <Section title="Toggle Variant">
        <Accordion type="single" defaultValue="toggle-1" variant="toggle">
          {technologyCategories.map((item) => (
            <AccordionItem key={item.id} value={item.id} headingLevel={3}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* In Card Context */}
      <InCardContextExample />
    </div>
  );
};

export default AccordionExample;
