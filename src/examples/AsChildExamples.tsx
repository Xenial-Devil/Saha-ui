import React from "react";
import Button from "../components/Button";
import { Slot } from "../lib/Slot";

/**
 * Examples demonstrating the asChild pattern in the Button component
 */

// ============================================
// Example 1: Normal Button (Default Behavior)
// ============================================
export const NormalButton = () => {
  return <Button variant="primary">Click me</Button>;
};

// ============================================
// Example 2: Button as Link (with asChild)
// ============================================
export const ButtonAsLink = () => {
  return (
    <Button variant="primary" asChild>
      <a href="/dashboard">Go to Dashboard</a>
    </Button>
  );
};

// ============================================
// Example 3: Next.js Link Integration
// ============================================
// import Link from 'next/link';
export const NextJsButton = () => {
  // Uncomment when using in Next.js
  // return (
  //   <Button variant="accent" asChild>
  //     <Link href="/profile">View Profile</Link>
  //   </Button>
  // );
  
  // For this example, using regular link
  return (
    <Button variant="accent" asChild>
      <a href="/profile">View Profile</a>
    </Button>
  );
};

// ============================================
// Example 4: React Router Integration
// ============================================
// import { Link } from 'react-router-dom';
export const ReactRouterButton = () => {
  // Uncomment when using React Router
  // return (
  //   <Button variant="success" asChild>
  //     <Link to="/settings">Settings</Link>
  //   </Button>
  // );
  
  // For this example, using regular link
  return (
    <Button variant="success" asChild>
      <a href="/settings">Settings</a>
    </Button>
  );
};

// ============================================
// Example 5: Different Button Variants
// ============================================
export const VariantExamples = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {/* Primary variant */}
      <Button variant="primary" asChild>
        <a href="/primary">Primary Link</a>
      </Button>

      {/* Secondary variant */}
      <Button variant="secondary" asChild>
        <a href="/secondary">Secondary Link</a>
      </Button>

      {/* Success variant */}
      <Button variant="success" asChild>
        <a href="/success">Success Link</a>
      </Button>

      {/* Error variant */}
      <Button variant="error" asChild>
        <a href="/error">Error Link</a>
      </Button>

      {/* Outline variant */}
      <Button variant="outline" asChild>
        <a href="/outline">Outline Link</a>
      </Button>

      {/* Ghost variant */}
      <Button variant="ghost" asChild>
        <a href="/ghost">Ghost Link</a>
      </Button>
    </div>
  );
};

// ============================================
// Example 6: Different Sizes
// ============================================
export const SizeExamples = () => {
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="primary" size="sm" asChild>
        <a href="/small">Small</a>
      </Button>

      <Button variant="primary" size="md" asChild>
        <a href="/medium">Medium</a>
      </Button>

      <Button variant="primary" size="lg" asChild>
        <a href="/large">Large</a>
      </Button>

      <Button variant="primary" size="xl" asChild>
        <a href="/extra-large">Extra Large</a>
      </Button>
    </div>
  );
};

// ============================================
// Example 7: Download Button
// ============================================
export const DownloadButton = () => {
  return (
    <Button variant="info" asChild>
      <a href="/files/document.pdf" download>
        Download PDF
      </a>
    </Button>
  );
};

// ============================================
// Example 8: External Link
// ============================================
export const ExternalLinkButton = () => {
  return (
    <Button variant="accent" asChild>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        Visit External Site
      </a>
    </Button>
  );
};

// ============================================
// Example 9: Using Slot Directly
// ============================================
export const DirectSlotUsage = () => {
  return (
    <Slot className="custom-button-class" style={{ padding: "1rem" }}>
      <a href="/custom" style={{ color: "blue" }}>
        Custom Styled Link
      </a>
    </Slot>
  );
};

// ============================================
// Example 10: Comparison - With vs Without asChild
// ============================================
export const Comparison = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h3>❌ Bad: Button wrapping link (invalid HTML)</h3>
        <Button variant="primary">
          <a href="/page" style={{ color: "inherit", textDecoration: "none" }}>
            Link inside Button
          </a>
        </Button>
      </div>

      <div>
        <h3>✅ Good: Link styled as button (semantic HTML)</h3>
        <Button variant="primary" asChild>
          <a href="/page">Button as Link</a>
        </Button>
      </div>
    </div>
  );
};

// ============================================
// Example 11: Navigation Menu
// ============================================
export const NavigationMenu = () => {
  return (
    <nav style={{ display: "flex", gap: "0.5rem" }}>
      <Button variant="ghost" asChild>
        <a href="/">Home</a>
      </Button>
      <Button variant="ghost" asChild>
        <a href="/about">About</a>
      </Button>
      <Button variant="ghost" asChild>
        <a href="/services">Services</a>
      </Button>
      <Button variant="primary" asChild>
        <a href="/contact">Contact</a>
      </Button>
    </nav>
  );
};

// ============================================
// Example 12: Custom Component Integration
// ============================================
const CustomLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  { href: string; children: React.ReactNode }
>(({ href, children, ...props }, ref) => {
  return (
    <a ref={ref} href={href} {...props}>
      🔗 {children}
    </a>
  );
});
CustomLinkComponent.displayName = "CustomLinkComponent";

export const CustomComponentButton = () => {
  return (
    <Button variant="accent" asChild>
      <CustomLinkComponent href="/custom">
        Custom Component
      </CustomLinkComponent>
    </Button>
  );
};

// ============================================
// Example 13: Event Handlers Merging
// ============================================
export const EventHandlerExample = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    console.log("Link clicked!", e);
  };

  return (
    <Button variant="primary" onClick={handleButtonClick} asChild>
      <a href="/events" onClick={handleLinkClick}>
        Click me (check console)
      </a>
    </Button>
  );
};

// ============================================
// Complete Demo
// ============================================
export const AsChildDemo = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>asChild Pattern Examples</h1>
      
      <section style={{ marginBottom: "2rem" }}>
        <h2>Basic Usage</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <NormalButton />
          <ButtonAsLink />
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Framework Integration</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <NextJsButton />
          <ReactRouterButton />
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Variants</h2>
        <VariantExamples />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Sizes</h2>
        <SizeExamples />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Special Use Cases</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <DownloadButton />
          <ExternalLinkButton />
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Navigation Example</h2>
        <NavigationMenu />
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <Comparison />
      </section>
    </div>
  );
};

export default AsChildDemo;
