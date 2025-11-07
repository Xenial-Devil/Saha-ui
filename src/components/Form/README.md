# Form

A form component with built-in validation, error handling, and submission management. Integrates with popular form libraries.

## Features

- ✅ **Validation** - Built-in and custom validation
- ❌ **Error Handling** - Field and form-level errors
- 🎯 **Submission** - Loading states and callbacks
- 📋 **Field Management** - Register and unregister fields
- ♿ **Accessible** - Proper form semantics

## Installation

\`\`\`tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
<Form onSubmit={handleSubmit}>
  <FormField name="email">
    <FormLabel>Email</FormLabel>
    <FormControl>
      <Input type="email" />
    </FormControl>
    <FormMessage />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
\`\`\`

## Related Components

- **Field** - Form field wrapper
- **Input** - Input components
- **Button** - Submit button
