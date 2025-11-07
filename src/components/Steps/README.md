# Steps

A step indicator component for multi-step processes with progress tracking.

## Features

- 🎨 **Multiple Variants** - 4 visual styles
- 📏 **Three Sizes** - Small, medium, and large
- ↔️ **Two Orientations** - Horizontal and vertical layouts
- ♿ **Accessible** - ARIA support for step navigation
- 🎯 **Status Indicators** - Completed, current, pending, error states
- 🖱️ **Clickable Steps** - Optional navigation by clicking
- 🎨 **Custom Icons** - Replace default step numbers
- 🌗 **Dark Mode** - Full dark mode support

## Installation

\`\`\`bash
import { Steps, StepsItem } from '@saha-ui/components';
\`\`\`

## Basic Usage

\`\`\`tsx
import { Steps, StepsItem } from '@saha-ui/components';

function CheckoutProcess() {
  const [step, setStep] = useState('shipping');
  
  return (
    <Steps value={step} onValueChange={setStep}>
      <StepsItem value="cart" title="Shopping Cart" />
      <StepsItem value="shipping" title="Shipping Info" />
      <StepsItem value="payment" title="Payment" />
      <StepsItem value="confirm" title="Confirmation" />
    </Steps>
  );
}
\`\`\`

## API Reference

### Steps Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string \| number\` | - | Controlled current step |
| \`defaultValue\` | \`string \| number\` | - | Default step (uncontrolled) |
| \`onValueChange\` | \`(value) => void\` | - | Callback when step changes |
| \`variant\` | \`'default' \| 'bordered' \| 'glass' \| 'minimal'\` | \`'default'\` | Visual variant |
| \`size\` | \`'sm' \| 'md' \| 'lg'\` | \`'md'\` | Size |
| \`orientation\` | \`'horizontal' \| 'vertical'\` | \`'horizontal'\` | Layout orientation |
| \`clickable\` | \`boolean\` | \`false\` | Allow clicking to navigate |

### StepsItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string \| number\` | - | Unique step identifier |
| \`title\` | \`string\` | - | Step title |
| \`description\` | \`string\` | - | Step description |
| \`status\` | \`'completed' \| 'current' \| 'pending' \| 'error'\` | auto | Manual status override |
| \`icon\` | \`ReactNode\` | - | Custom icon |
| \`disabled\` | \`boolean\` | \`false\` | Disable step |

## Changelog

### v1.16.0
- Enhanced TypeScript types
- Improved ARIA support
- Better accessibility

---

**Need help?** Check the [component documentation](../README.md).
