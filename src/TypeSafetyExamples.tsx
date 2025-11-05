/**
 * Type Safety Examples
 *
 * This file demonstrates how TypeScript catches invalid inputs at compile-time.
 * Uncomment the error examples to see TypeScript errors in your IDE.
import React from "react"; */

import {
  Button,
  Alert,
  Card,
  // Import types for strict typing
  ButtonVariant,
  ButtonSize,
  AlertVariant,
  AlertStatus,
} from "./index";

// ============================================
// ✅ VALID EXAMPLES - These work perfectly
// ============================================

export const ValidExamples = () => {
  return (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold">Valid Type-Safe Examples</h2>

      {/* Button - All variants and sizes are type-safe */}
      <Button variant="primary" size="lg">
        Primary Button
      </Button>

      {/* Alert - Status and variant combinations */}
      <Alert
        variant="left-accent"
        status="success"
        title="Success!"
        message="Operation completed successfully"
        closeable
      />

      {/* Card - Full type safety on all props */}
      <Card variant="glass-strong" padding="lg" rounded="2xl" hoverable>
        <p>Glass morphism card</p>
      </Card>
    </div>
  );
};

// ============================================
// ✅ TYPE-SAFE DYNAMIC PROPS
// ============================================

interface DynamicButtonProps {
  variant: ButtonVariant; // TypeScript knows all valid values
  size: ButtonSize; // TypeScript knows all valid values
  label: string;
}

export const DynamicButton = ({ variant, size, label }: DynamicButtonProps) => {
  return (
    <Button variant={variant} size={size}>
      {label}
    </Button>
  );
};

// Usage - TypeScript will enforce valid values

// ============================================
// ✅ TYPE-SAFE MAPPINGS
// ============================================

const alertTypeMapping: Record<
  string,
  { variant: AlertVariant; status: AlertStatus }
> = {
  success: { variant: "left-accent", status: "success" },
  error: { variant: "solid", status: "danger" },
  warning: { variant: "top-accent", status: "warning" },
  info: { variant: "subtle", status: "info" },
};

export const TypedNotification = ({
  type,
  message,
}: {
  type: keyof typeof alertTypeMapping;
  message: string;
}) => {
  const config = alertTypeMapping[type];
  return <Alert {...config} message={message} />;
};

// ============================================
// ❌ ERROR EXAMPLES - These will show TypeScript errors
// ============================================

// Uncomment these to see TypeScript errors:

/*
// ❌ ERROR: Invalid button variant
export const InvalidButton1 = () => (
  <Button variant="blue">  // Error: Type '"blue"' is not assignable to type 'ButtonVariant'
    Click Me
  </Button>
);

// ❌ ERROR: Invalid button size
export const InvalidButton2 = () => (
  <Button size="large">  // Error: Type '"large"' is not assignable to type 'ButtonSize'
    Click Me
  </Button>
);

// ❌ ERROR: Invalid alert status
export const InvalidAlert1 = () => (
  <Alert status="critical">  // Error: Type '"critical"' is not assignable to type 'AlertStatus'
    Alert message
  </Alert>
);

// ❌ ERROR: Invalid alert variant
export const InvalidAlert2 = () => (
  <Alert variant="bordered">  // Error: Type '"bordered"' is not assignable to type 'AlertVariant'
    Alert message
  </Alert>
);

// ❌ ERROR: Invalid card variant
export const InvalidCard = () => (
  <Card variant="transparent">  // Error: Type '"transparent"' is not assignable to type 'CardVariant'
    Content
  </Card>
);

// ❌ ERROR: Invalid card padding
export const InvalidCardPadding = () => (
  <Card padding="medium">  // Error: Type '"medium"' is not assignable to type 'CardPadding'
    Content
  </Card>
);

// ❌ ERROR: Wrong prop type
export const InvalidBooleanProp = () => (
  <Alert closeable="yes">  // Error: Type 'string' is not assignable to type 'boolean'
    Alert
  </Alert>
);

// ❌ ERROR: Missing required property in accordion items
export const InvalidAccordion = () => (
  <Accordion 
    variant="default"
    items={[
      { title: "Only title" }  // Error: Property 'content' is missing
    ]}
  />
);

// ❌ ERROR: Invalid accordion variant
export const InvalidAccordionVariant = () => (
  <Accordion 
    variant="collapsible"  // Error: Type '"collapsible"' is not assignable to type 'AccordionVariant'
    items={[{ title: "Q", content: "A" }]}
  />
);

// ❌ ERROR: Wrong type assignment
const WrongTypeExample = () => {
  const variant: ButtonVariant = "invalid";  // Error: Type '"invalid"' is not assignable to type 'ButtonVariant'
  return <Button variant={variant}>Button</Button>;
};
*/

// ============================================
// ✅ ADVANCED: Type Guards for Runtime Validation
// ============================================

function isValidAlertStatus(value: string): value is AlertStatus {
  return ["success", "danger", "warning", "info"].includes(value);
}

// Use with runtime data (e.g., from API)
export const SafeRuntimeAlert = ({
  statusFromAPI,
}: {
  statusFromAPI: string;
}) => {
  // Validate and provide fallback
  const status: AlertStatus = isValidAlertStatus(statusFromAPI)
    ? statusFromAPI
    : "info";

  return <Alert status={status} message="Safe runtime status" />;
};

// ============================================
// ✅ ADVANCED: Generic Type-Safe Components
// ============================================

interface StatusConfig {
  variant: AlertVariant;
  status: AlertStatus;
  icon?: string;
}

const statusConfigs: Record<"ok" | "error" | "pending", StatusConfig> = {
  ok: { variant: "left-accent", status: "success" },
  error: { variant: "solid", status: "danger" },
  pending: { variant: "subtle", status: "warning" },
};

export const StatusAlert = <T extends keyof typeof statusConfigs>({
  type,
  message,
}: {
  type: T;
  message: string;
}) => {
  const config = statusConfigs[type];
  return <Alert {...config} message={message} />;
};

// ============================================
// ✅ CONCLUSION
// ============================================

/*
 * With explicit prop types, you get:
 *
 * 1. ✅ Compile-time error checking
 * 2. ✅ Full IntelliSense autocomplete
 * 3. ✅ JSDoc documentation on hover
 * 4. ✅ Refactoring safety
 * 5. ✅ Better code maintainability
 * 6. ✅ Prevents runtime errors
 *
 * All invalid inputs are caught during development,
 * not in production! 🎉
 */

export default ValidExamples;
