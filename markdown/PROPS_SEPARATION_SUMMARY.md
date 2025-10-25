# Props Separation Summary

## Overview

Separated all component props from their implementations into dedicated `.types.ts` files for better code organization, reusability, and maintainability.

## Changes Made

### ✅ New Type Files Created

1. **Button.types.ts**

   - `ButtonProps` interface

2. **Card.types.ts**

   - `CardProps` interface
   - `CardHeaderProps` interface
   - `CardTitleProps` interface
   - `CardDescriptionProps` interface
   - `CardContentProps` interface
   - `CardFooterProps` interface

3. **Tooltip.types.ts**

   - `TooltipProps` interface

4. **ThemeProvider.types.ts**

   - `Theme` type
   - `ThemeContextType` interface
   - `ThemeProviderProps` interface

5. **ThemeToggle.types.ts**

   - `ThemeToggleProps` interface

6. **Accordion.types.ts**

   - `AccordionVariant` type
   - `AccordionProps` interface
   - `AccordionItemProps` interface

7. **List.types.ts**

   - `ListType` type
   - `ListProps` interface
   - `ListItemProps` interface

8. **Image.types.ts**

   - `ImageProps` interface (formerly `ImgAttributes`)

9. **Link.types.ts**
   - `LinkProps` interface (formerly `AnchorAttributes`)

### 🔄 Renamed Files for Consistency

1. **Alert**

   - `AlertProps.ts` → `Alert.types.ts`

2. **Avatar**

   - `AvatarProps.tsx` → `Avatar.types.ts`

3. **AvatarGroup**

   - `AvatarProps.tsx` → `AvatarGroup.types.ts`

4. **Carousel**
   - `CarouselProps.tsx` → `Carousel.types.ts`

### 📝 Updated Component Imports

All components have been updated to import their props from the new `.types.ts` files:

```typescript
// Before
interface ButtonProps {
  variant?: string;
  // ...
}

// After
import { ButtonProps } from "./Button.types";
```

### 📦 Updated Main Export (src/index.ts)

The main index file now exports all types organized into two sections:

#### Theme Types

- `Theme`
- `ThemeContextType`
- `ThemeProviderProps`
- `ThemeToggleProps`

#### Component Types

- `AccordionVariant`, `AccordionProps`, `AccordionItemProps`
- `AlertProps`
- `AvatarProps`
- `AvatarGroupAvatarProps`
- `ButtonProps`
- `CardProps`, `CardHeaderProps`, `CardTitleProps`, `CardDescriptionProps`, `CardContentProps`, `CardFooterProps`
- `CarouselProps`
- `ImageProps`
- `LinkProps`
- `ListType`, `ListProps`, `ListItemProps`
- `TooltipProps`

## Benefits

### 1. **Better Code Organization**

- Props definitions are separated from component logic
- Easier to locate and modify type definitions
- Consistent naming pattern across all components

### 2. **Improved Reusability**

- Types can be imported and used independently
- Easier to extend or compose types
- Better for documentation and type generation

### 3. **Enhanced Developer Experience**

- Auto-completion works better with separated types
- Easier to understand component APIs
- Better for generating documentation

### 4. **Consistency**

- All type files follow the pattern: `ComponentName.types.ts`
- All props interfaces follow the pattern: `ComponentNameProps`
- All variant types follow the pattern: `ComponentNameVariant`

## File Structure

```
src/components/
├── Accordion/
│   ├── Accordion.types.ts       ✨ NEW
│   ├── AccordionItem.tsx
│   └── index.tsx
├── Alert/
│   ├── Alert.types.ts           🔄 RENAMED
│   └── index.tsx
├── Avatar/
│   ├── Avatar.types.ts          🔄 RENAMED
│   └── index.tsx
├── AvatarGroup/
│   ├── AvatarGroup.types.ts     🔄 RENAMED
│   └── index.tsx
├── Button/
│   ├── Button.types.ts          ✨ NEW
│   └── index.tsx
├── Card/
│   ├── Card.types.ts            ✨ NEW
│   └── index.tsx
├── Carousel/
│   ├── Carousel.types.ts        🔄 RENAMED
│   ├── CarouseImage.tsx
│   └── index.tsx
├── Image/
│   ├── Image.types.ts           ✨ NEW
│   └── index.tsx
├── Link/
│   ├── Link.types.ts            ✨ NEW
│   └── index.tsx
├── List/
│   ├── List.types.ts            ✨ NEW
│   ├── ListItem.tsx
│   └── index.tsx
├── ThemeProvider/
│   ├── ThemeProvider.types.ts   ✨ NEW
│   └── index.tsx
├── ThemeToggle/
│   ├── ThemeToggle.types.ts     ✨ NEW
│   └── index.tsx
└── Tooltip/
    ├── Tooltip.types.ts         ✨ NEW
    └── index.tsx
```

## Usage Example

```typescript
// Import component and its props
import { Button } from "saha-ui";
import type { ButtonProps } from "saha-ui";

// Use props for type checking
const myButtonProps: ButtonProps = {
  variant: "primary",
  size: "md",
  children: "Click me",
};

// Extend props
interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}
```

## Notes

- All inline interface declarations have been removed from component files
- Components now only import their types from `.types.ts` files
- The separation maintains backward compatibility with existing component usage
- Type exports are properly configured in the main `index.ts` file

## Migration Complete ✅

All components now follow the props separation pattern, making the codebase more maintainable and developer-friendly!
