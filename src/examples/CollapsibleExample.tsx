import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleCompact,
} from "../components/Collapsible";
import type { CollapsibleVariant } from "../components/Collapsible/Collapsible.types";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Card from "../components/Card";
import { ChevronsUpDown, Plus } from "lucide-react";

/**
 * CollapsibleExample - Comprehensive showcase of Collapsible component
 *
 * Demonstrates:
 * - Component API (composition)
 * - Compact API (props-based)
 * - All variants
 * - Controlled and uncontrolled
 * - Custom triggers
 * - Animation styles
 * - Advanced features
 */
export default function CollapsibleExample() {
  const [isOpen1, setIsOpen1] = useState(false);

  const variants: CollapsibleVariant[] = [
    "default",
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
    "info",
    "outline",
    "glass",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Collapsible Component
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A flexible component for expanding and collapsing content with
            beautiful animations and multiple variants
          </p>
        </div>

        {/* Basic Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Basic Usage</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Component API Example */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Component API</h3>
              <Collapsible className="w-full">
                <CollapsibleTrigger>
                  <div className="flex items-center justify-between w-full">
                    <h4 className="text-sm font-semibold">
                      @peduarte starred 3 repositories
                    </h4>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-2 pt-2">
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @radix-ui/primitives
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @stitches/react
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Compact API Example */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Compact API</h3>
              <CollapsibleCompact
                title={
                  <h4 className="text-sm font-semibold">
                    Click to see repositories
                  </h4>
                }
                content={
                  <div className="space-y-2 pt-2">
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @radix-ui/primitives
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm">
                      @stitches/react
                    </div>
                  </div>
                }
                variant="primary"
              />
            </Card>
          </div>
        </section>

        {/* All Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">All Variants</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {variants.map((variant) => (
              <Collapsible key={variant} variant={variant}>
                <CollapsibleTrigger>
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium capitalize">{variant}</span>
                    <Badge variant={variant as any}>{variant}</Badge>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    This is a {variant} variant collapsible. It demonstrates the
                    beautiful styling and smooth animations of the component.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>

        {/* Controlled Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Controlled State</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Controlled</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsOpen1(!isOpen1)}
                >
                  {isOpen1 ? "Close" : "Open"}
                </Button>
              </div>
              <Collapsible
                open={isOpen1}
                onOpenChange={setIsOpen1}
                variant="primary"
              >
                <CollapsibleTrigger>
                  <span>Toggle Panel</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 text-sm">
                    This collapsible is controlled externally. The button above
                    controls its state.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">Default Open</h3>
              <Collapsible defaultOpen variant="success">
                <CollapsibleTrigger>
                  <span>Initially Open</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 text-sm">
                    This collapsible starts in an open state by default.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">Disabled</h3>
              <Collapsible disabled variant="error">
                <CollapsibleTrigger>
                  <span>Disabled State</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 text-sm">
                    This content cannot be toggled.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </section>

        {/* Custom Triggers */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Custom Triggers</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Collapsible variant="glass">
              <CollapsibleTrigger asChild>
                <Button variant="glass" className="w-full justify-between">
                  <span>Custom Button Trigger</span>
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Using asChild prop to render a custom Button component as the
                  trigger.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="accent">
              <CollapsibleTrigger icon={<Plus className="h-4 w-4" />}>
                <span>Custom Icon</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Custom Plus icon instead of default ChevronDown.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="secondary">
              <CollapsibleTrigger showIcon={false}>
                <span>No Icon</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Trigger without any icon indicator.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="warning">
              <CollapsibleTrigger iconPosition="left">
                <span>Icon on Left</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Icon positioned on the left side instead of right.
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Animation Styles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Animation Styles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Collapsible variant="primary" animation="smooth">
              <CollapsibleTrigger>
                <span>Smooth Animation</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Default smooth easing animation for natural feel.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="success" animation="spring">
              <CollapsibleTrigger>
                <span>Spring Animation</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Spring-like animation with overshoot effect.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible variant="accent" animation="bounce">
              <CollapsibleTrigger>
                <span>Bounce Animation</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-sm">
                  Bouncy animation with elastic easing.
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Advanced Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Advanced Features</h2>

          <div className="grid gap-6">
            {/* Nested Collapsibles */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">Nested Collapsibles</h3>
              <Collapsible variant="primary">
                <CollapsibleTrigger>
                  <span>Parent Section</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-4">
                    <p className="text-sm">This is the parent content area.</p>
                    <Collapsible variant="secondary">
                      <CollapsibleTrigger>
                        <span>Nested Child 1</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-4 text-sm">
                          First nested collapsible content.
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <Collapsible variant="accent">
                      <CollapsibleTrigger>
                        <span>Nested Child 2</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-4 text-sm">
                          Second nested collapsible content.
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* FAQ Example */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">FAQ Example</h3>
              <div className="space-y-2">
                {[
                  {
                    q: "What is a collapsible component?",
                    a: "A collapsible component allows you to show and hide content sections, perfect for FAQs, menus, and complex UIs.",
                  },
                  {
                    q: "How do I control the state?",
                    a: "Use the 'open' and 'onOpenChange' props for controlled mode, or 'defaultOpen' for uncontrolled.",
                  },
                  {
                    q: "Can I customize the animations?",
                    a: "Yes! Choose from smooth, spring, bounce animations, or set custom durations.",
                  },
                ].map((faq, i) => (
                  <Collapsible key={i} variant="outline">
                    <CollapsibleTrigger>
                      <span className="text-sm font-medium">{faq.q}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 py-3 text-sm text-muted-foreground">
                        {faq.a}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </Card>

            {/* Complex Content */}
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold">Rich Content</h3>
              <Collapsible variant="glass">
                <CollapsibleTrigger>
                  <div className="flex items-center justify-between w-full">
                    <span>Project Details</span>
                    <Badge>New</Badge>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        This is a complex collapsible with rich content
                        including multiple sections, badges, and interactive
                        elements.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">React</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                        <Badge variant="accent">Tailwind</Badge>
                        <Badge variant="success">CVA</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="primary">
                        View Project
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
