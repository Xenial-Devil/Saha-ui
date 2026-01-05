# Field

A form field wrapper component that combines label, input, error message, and hint text for consistent form layouts.

## Features

- 🏷️ **Label Support** - Optional labels with required indicators
- ❌ **Error Display** - Error message handling
- 💡 **Hint Text** - Helper text for guidance
- ♿ **Accessible** - Proper ARIA associations
- 🎨 **Flexible** - Works with any input component

## Installation

\`\`\`tsx
import { Field } from 'saha-ui';
\`\`\`

## Basic Usage

\`\`\`tsx
<Field
label="Email"
required
error="Invalid email address"
hint="We'll never share your email"

>   <Input type="email" />
> </Field>
> \`\`\`

## Related Components

- **Label** - Standalone label
- **Input** - Input fields
- **Form** - Form wrapper
