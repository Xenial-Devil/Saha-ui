# Type Safety & Error Handling Guide

## Overview

All components now have **explicit prop types** with comprehensive JSDoc documentation. This enables TypeScript to catch invalid inputs at compile-time and provides excellent IntelliSense support.

---

## Exported Types

### Button Component

```typescript
import { Button, ButtonProps, ButtonVariant, ButtonSize } from "saha-ui";

// ✅ Valid usage
const MyButton = () => (
  <Button variant="primary" size="lg">
    Click Me
  </Button>
);

// ❌ TypeScript Error: Invalid variant
const InvalidButton = () => (
  <Button variant="invalid">
    {" "}
    // Error: Type '"invalid"' is not assignable to type 'ButtonVariant' Click Me
  </Button>
);

// ✅ Type-safe component props
interface MyComponentProps {
  buttonVariant: ButtonVariant; // "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "ghost" | "glass"
  buttonSize: ButtonSize; // "sm" | "md" | "lg" | "xl"
}

const MyComponent = ({ buttonVariant, buttonSize }: MyComponentProps) => (
  <Button variant={buttonVariant} size={buttonSize}>
    Dynamic Button
  </Button>
);
```

**Available Types:**

- `ButtonVariant`: `"primary" | "secondary" | "accent" | "success" | "warning" | "error" | "ghost" | "glass"`
- `ButtonSize`: `"sm" | "md" | "lg" | "xl"`
- `ButtonProps`: Full component props interface

---

### Alert Component

```typescript
import { Alert, AlertProps, AlertVariant, AlertStatus } from "saha-ui";

// ✅ Valid usage
const MyAlert = () => (
  <Alert
    variant="left-accent"
    status="success"
    title="Success!"
    message="Operation completed successfully."
    closeable
  />
);

// ❌ TypeScript Error: Invalid status
const InvalidAlert = () => (
  <Alert
    status="critical" // Error: Type '"critical"' is not assignable to type 'AlertStatus'
    message="Error"
  />
);

// ✅ Type-safe dynamic alerts
interface NotificationProps {
  type: AlertStatus;
  msg: string;
}

const Notification = ({ type, msg }: NotificationProps) => (
  <Alert status={type} message={msg} />
);

// ✅ Creating typed notification system
type NotificationConfig = {
  variant: AlertVariant;
  status: AlertStatus;
  message: string;
  closeable?: boolean;
};

const notifications: NotificationConfig[] = [
  { variant: "solid", status: "info", message: "Info message" },
  { variant: "subtle", status: "warning", message: "Warning message" },
  {
    variant: "left-accent",
    status: "success",
    message: "Success!",
    closeable: true,
  },
];
```

**Available Types:**

- `AlertVariant`: `"solid" | "subtle" | "left-accent" | "top-accent" | "outline"`
- `AlertStatus`: `"success" | "danger" | "warning" | "info"`
- `AlertProps`: Full component props interface

---

### Card Component

```typescript
import {
  Card,
  CardProps,
  CardVariant,
  CardPadding,
  CardRounded,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "saha-ui";

// ✅ Valid usage
const MyCard = () => (
  <Card variant="glass-strong" padding="lg" rounded="2xl" hoverable>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description</CardDescription>
    </CardHeader>
    <CardContent>Content here</CardContent>
  </Card>
);

// ❌ TypeScript Error: Invalid padding
const InvalidCard = () => (
  <Card padding="large">
    {" "}
    // Error: Type '"large"' is not assignable to type 'CardPadding' Content
  </Card>
);

// ✅ Type-safe card configurations
type CardConfig = {
  variant: CardVariant;
  padding: CardPadding;
  rounded: CardRounded;
};

const cardStyles: Record<string, CardConfig> = {
  default: { variant: "default", padding: "md", rounded: "lg" },
  glassMorphism: { variant: "glass-strong", padding: "lg", rounded: "2xl" },
  minimal: { variant: "bordered", padding: "sm", rounded: "md" },
};

const DynamicCard = ({ style }: { style: keyof typeof cardStyles }) => {
  const config = cardStyles[style];
  return <Card {...config}>Content</Card>;
};
```

**Available Types:**

- `CardVariant`: `"default" | "glass" | "glass-strong" | "glass-subtle" | "bordered"`
- `CardPadding`: `"none" | "sm" | "md" | "lg" | "xl"`
- `CardRounded`: `"sm" | "md" | "lg" | "xl" | "2xl"`
- `CardProps`: Full Card component props interface
- `CardHeaderProps`, `CardTitleProps`, `CardDescriptionProps`, `CardContentProps`, `CardFooterProps`

---

### Accordion Component

```typescript
import {
  Accordion,
  AccordionProps,
  AccordionVariant,
  AccordionItem,
} from "saha-ui";

// ✅ Valid usage
const MyAccordion = () => {
  const items: AccordionItem[] = [
    { title: "Section 1", content: "Content 1" },
    { title: "Section 2", content: "Content 2" },
    { title: "Section 3", content: "Content 3" },
  ];

  return <Accordion variant="toggle" items={items} />;
};

// ❌ TypeScript Error: Missing required properties
const InvalidAccordion = () => (
  <Accordion
    variant="default"
    items={[
      { title: "Section 1" }, // Error: Property 'content' is missing
    ]}
  />
);

// ✅ Type-safe FAQ system
interface FAQItem extends AccordionItem {
  id: string;
  category: string;
}

const FAQ = ({
  items,
  variant,
}: {
  items: FAQItem[];
  variant: AccordionVariant;
}) => {
  // TypeScript ensures items have title and content
  const accordionItems: AccordionItem[] = items.map((item) => ({
    title: item.title,
    content: item.content,
  }));

  return <Accordion variant={variant} items={accordionItems} />;
};
```

**Available Types:**

- `AccordionVariant`: `"default" | "controlled" | "allopen" | "toggle" | "firstopen"`
- `AccordionItem`: `{ title: string; content: string; }`
- `AccordionProps`: Full component props interface
- `AccordionItemProps`: Internal item props (for advanced usage)

---

## Common Error Patterns & Solutions

### 1. Invalid Variant Value

**Error:**

```typescript
<Button variant="blue">  // ❌ Error: Type '"blue"' is not assignable to type 'ButtonVariant'
```

**Solution:**

```typescript
<Button variant="primary">  // ✅ Use valid variant
```

**IntelliSense:** TypeScript will show you all valid options when you type `variant="`

---

### 2. Missing Required Props

**Error:**

```typescript
<Accordion variant="default" /> // ❌ Error: Property 'items' is missing
```

**Solution:**

```typescript
<Accordion
  variant="default"
  items={[{ title: "Q1", content: "A1" }]} // ✅ Provide required items
/>
```

---

### 3. Wrong Property Type

**Error:**

```typescript
<Alert closeable="yes" /> // ❌ Error: Type 'string' is not assignable to type 'boolean'
```

**Solution:**

```typescript
<Alert closeable={true} />  // ✅ Use boolean value
<Alert closeable />         // ✅ Shorthand for true
```

---

### 4. Invalid Size/Padding Value

**Error:**

```typescript
<Card padding="medium" /> // ❌ Error: Type '"medium"' is not assignable to type 'CardPadding'
```

**Solution:**

```typescript
<Card padding="md" /> // ✅ Use abbreviated form
```

---

## Advanced Type Usage

### 1. Creating Type-Safe Wrapper Components

```typescript
import { ButtonProps, ButtonVariant } from 'saha-ui';

interface ActionButtonProps extends Omit<ButtonProps, 'variant'> {
  action: 'submit' | 'cancel' | 'delete';
}

const ActionButton = ({ action, ...props }: ActionButtonProps) => {
  const variantMap: Record<string, ButtonVariant> = {
    submit: 'success',
    cancel: 'ghost',
    delete: 'error',
  };

  return <Button variant={variantMap[action]} {...props} />;
};

// ✅ Usage
<ActionButton action="submit">Submit Form</ActionButton>
<ActionButton action="delete">Delete Item</ActionButton>
```

---

### 2. Building a Notification System

```typescript
import { AlertProps, AlertStatus, AlertVariant } from "saha-ui";

type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
}

const NotificationList = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  const getAlertProps = (
    type: NotificationType
  ): Pick<AlertProps, "status" | "variant"> => {
    const mapping: Record<
      NotificationType,
      { status: AlertStatus; variant: AlertVariant }
    > = {
      success: { status: "success", variant: "left-accent" },
      error: { status: "danger", variant: "solid" },
      warning: { status: "warning", variant: "top-accent" },
      info: { status: "info", variant: "subtle" },
    };
    return mapping[type];
  };

  return (
    <div className="space-y-4">
      {notifications.map((notif) => (
        <Alert
          key={notif.id}
          {...getAlertProps(notif.type)}
          title={notif.title}
          message={notif.message}
          closeable
        />
      ))}
    </div>
  );
};
```

---

### 3. Creating Themed Card Collections

```typescript
import { CardProps, CardVariant } from "saha-ui";

type CardTheme = "modern" | "classic" | "glassMorphism";

const cardThemes: Record<
  CardTheme,
  Pick<CardProps, "variant" | "padding" | "rounded">
> = {
  modern: {
    variant: "default",
    padding: "lg",
    rounded: "2xl",
  },
  classic: {
    variant: "bordered",
    padding: "md",
    rounded: "md",
  },
  glassMorphism: {
    variant: "glass-strong",
    padding: "xl",
    rounded: "2xl",
  },
};

interface ThemedCardProps
  extends Omit<CardProps, "variant" | "padding" | "rounded"> {
  theme: CardTheme;
}

const ThemedCard = ({ theme, ...props }: ThemedCardProps) => (
  <Card {...cardThemes[theme]} {...props} />
);
```

---

### 4. Type Guards for Runtime Validation

```typescript
import { AlertStatus, ButtonVariant } from "saha-ui";

// Type guard for AlertStatus
function isValidAlertStatus(value: string): value is AlertStatus {
  return ["success", "danger", "warning", "info"].includes(value);
}

// Type guard for ButtonVariant
function isValidButtonVariant(value: string): value is ButtonVariant {
  return [
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
    "ghost",
    "glass",
  ].includes(value);
}

// Usage with runtime data
const MyComponent = ({ statusFromAPI }: { statusFromAPI: string }) => {
  // Validate and provide fallback
  const alertStatus: AlertStatus = isValidAlertStatus(statusFromAPI)
    ? statusFromAPI
    : "info";

  return <Alert status={alertStatus} message="Dynamic status from API" />;
};
```

---

## IntelliSense Benefits

With these explicit types, you get:

1. **Autocomplete**: IDE suggests valid values when typing

   ```typescript
   <Button variant="p|"  // Shows: primary, (and other options)
   ```

2. **Error Highlighting**: Invalid values are underlined immediately

   ```typescript
   <Alert status="critical" /> // Red underline with error message
   ```

3. **Hover Documentation**: See JSDoc comments on hover

   ```typescript
   <Card padding="|"
   // Hovering shows: "Padding size applied to the card @default 'md'"
   ```

4. **Jump to Definition**: Ctrl+Click on component to see type definition

5. **Refactoring Safety**: Renaming types updates all usages

---

## Best Practices

### ✅ DO

```typescript
// Import and use explicit types
import { ButtonVariant } from "saha-ui";
const variant: ButtonVariant = "primary";

// Use type annotations for props
interface Props {
  alertType: AlertStatus;
  cardStyle: CardVariant;
}

// Create type-safe mappings
const statusMap: Record<string, AlertStatus> = {
  ok: "success",
  fail: "danger",
};
```

### ❌ DON'T

```typescript
// Don't use string literals without types
const variant = "primary"; // Type is just 'string', not 'ButtonVariant'

// Don't bypass TypeScript with 'any'
const props: any = { variant: "invalid" }; // No type checking

// Don't hardcode magic strings
<Button variant="blue" />; // TypeScript can't catch this
```

---

## Testing with Types

```typescript
import { render } from "@testing-library/react";
import { Button, ButtonVariant } from "saha-ui";

describe("Button", () => {
  it.each<ButtonVariant>([
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
    "ghost",
    "glass",
  ])("renders %s variant correctly", (variant) => {
    const { container } = render(<Button variant={variant}>Test</Button>);
    expect(container).toMatchSnapshot();
  });
});
```

---

## Error Messages Reference

| Error                                                    | Meaning                    | Solution                                                                      |
| -------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------- |
| `Type '"xyz"' is not assignable to type 'ButtonVariant'` | Invalid variant value      | Use one of: primary, secondary, accent, success, warning, error, ghost, glass |
| `Property 'items' is missing`                            | Required prop not provided | Add the missing prop                                                          |
| `Type 'string' is not assignable to type 'boolean'`      | Wrong type for prop        | Use boolean value (true/false)                                                |
| `Property 'xyz' does not exist on type 'CardProps'`      | Invalid prop name          | Check component documentation for valid props                                 |

---

## Summary

✅ **All components have explicit, exported types**
✅ **Full TypeScript IntelliSense support**
✅ **Compile-time error checking for invalid inputs**
✅ **JSDoc documentation on all props**
✅ **Type-safe variant systems**
✅ **Easy to create type-safe wrapper components**

Import any type like this:

```typescript
import {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  AlertProps,
  AlertVariant,
  AlertStatus,
  CardProps,
  CardVariant,
  CardPadding,
  CardRounded,
  AccordionProps,
  AccordionVariant,
  AccordionItem,
} from "saha-ui";
```

TypeScript will now catch **all invalid inputs at compile-time** instead of runtime! 🎉
