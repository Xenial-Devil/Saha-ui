# CodeEditor Language Selector Feature

## Overview

The CodeEditor now includes a **Language Selector** feature that allows users to dynamically switch between different programming languages and frameworks. Framework-specific syntax highlighting (React, Vue, Django, Laravel) is **ONLY** activated when explicitly selected.

---

## Key Concept: Explicit Framework Selection

### Before (Problem)

- Setting `language="javascript"` would not distinguish between vanilla JS and React JSX
- No way to toggle framework-specific highlighting
- Custom components would not be highlighted unless you set the exact framework language

### After (Solution)

- `language="javascript"` → Regular JavaScript (no JSX highlighting)
- `language="reactjs"` → React with JSX highlighting for custom components
- `language="reactts"` → React with TypeScript + JSX highlighting
- Users can toggle between languages using the selector UI

---

## Usage

### Basic Usage (No Selector)

By default, the language is displayed but not changeable:

```tsx
<CodeEditor language="javascript" value={code} onChange={setCode} />
```

This shows "JavaScript" in the status bar (bottom-left corner).

---

### With Language Selector (Interactive)

Enable the selector to let users change the language:

```tsx
<CodeEditor
  language="reactjs"
  value={code}
  onChange={setCode}
  showLanguageSelector={true}
  onLanguageChange={(newLang) => {
    console.log("Language changed to:", newLang);
    // Optional: save preference, update state, etc.
  }}
/>
```

**Features:**

- ✅ Dropdown appears in the bottom-left corner
- ✅ Click to see all available languages organized by category
- ✅ Current language is highlighted
- ✅ Framework-specific highlighting activates immediately on selection
- ✅ `onLanguageChange` callback fires when user selects a new language

---

## Available Language Options

### Web Frameworks

- `reactjs` - React JS (JSX) - Custom components highlighted
- `reactts` - React TS (TSX) - TypeScript + React components
- `vuejs` - Vue.js - Vue directives + custom components
- `vuets` - Vue + TypeScript
- `angular` - Angular templates
- `svelte` - Svelte components

### Backend Frameworks

- `django` - Django Templates - Template tags + filters
- `blade` - Laravel Blade - Blade directives + components
- `php` - PHP

### JavaScript/TypeScript

- `javascript` - Vanilla JavaScript (no framework)
- `typescript` - Vanilla TypeScript (no framework)
- `jsx` - Generic JSX
- `tsx` - Generic TSX

### Markup & Styles

- `html` - HTML
- `css` - CSS
- `scss` - SCSS
- `json` - JSON
- `markdown` - Markdown

### Programming Languages

- `python` - Python
- `java` - Java
- `c` - C
- `cpp` - C++
- `csharp` - C#
- `go` - Go
- `rust` - Rust
- `ruby` - Ruby
- `swift` - Swift
- `kotlin` - Kotlin
- `dart` - Dart

### Database & Shell

- `sql` - SQL
- `bash` - Bash
- `shell` - Shell

### Other

- `r` - R
- `matlab` - MATLAB
- `julia` - Julia
- `plaintext` - Plain Text

---

## Framework-Specific Highlighting

### React (reactjs / reactts)

**Activated ONLY when language is set to `reactjs` or `reactts`**

```tsx
<CodeEditor
  language="reactjs" // ✅ Enables React highlighting
  showLanguageSelector={true}
/>
```

**Highlighted Elements:**

- ✅ React Hooks (useState, useEffect) → Fuchsia
- ✅ Custom Components (`<MyButton>`, `<UserCard>`) → Cyan
- ✅ Standard HTML tags (`<div>`, `<span>`) → Blue
- ✅ Props → Amber
- ✅ JSX expressions → Purple
- ✅ Fragments (`<>`) → Cyan

**Example Code:**

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MyCustomButton onClick={() => setCount(count + 1)}>{count}</MyCustomButton>
  );
}
```

---

### Vue (vuejs / vuets)

**Activated ONLY when language is set to `vuejs` or `vuets`**

```tsx
<CodeEditor
  language="vuejs" // ✅ Enables Vue highlighting
  showLanguageSelector={true}
/>
```

**Highlighted Elements:**

- ✅ Vue Directives (v-if, v-for, @click) → Emerald
- ✅ Composition API (ref, computed) → Fuchsia
- ✅ Custom Components PascalCase (`<MyComponent>`) → Cyan
- ✅ Custom Components kebab-case (`<my-component>`) → Teal
- ✅ Mustache syntax (`{{ }}`) → Yellow

**Example Code:**

```vue
<template>
  <div>
    <MyHeader :title="pageTitle" />
    <custom-button @click="handleClick">
      {{ buttonText }}
    </custom-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const pageTitle = ref("Dashboard");
</script>
```

---

### Django (django / django-html)

**Activated ONLY when language is set to `django` or `django-html`**

```tsx
<CodeEditor
  language="django" // ✅ Enables Django highlighting
  showLanguageSelector={true}
/>
```

**Highlighted Elements:**

- ✅ Template Tags (`{% if %}`, `{% for %}`) → Fuchsia
- ✅ Variables (`{{ user }}`) → Yellow
- ✅ Filters (`|safe`, `|title`) → Cyan
- ✅ Custom components → Teal

**Example Code:**

```django
{% extends "base.html" %}

{% block content %}
  <UserProfile user="{{ user }}" />
  {{ user.name|title }}
{% endblock %}
```

---

### Laravel Blade (blade / laravel)

**Activated ONLY when language is set to `blade` or `laravel`**

```tsx
<CodeEditor
  language="blade" // ✅ Enables Blade highlighting
  showLanguageSelector={true}
/>
```

**Highlighted Elements:**

- ✅ Blade Directives (`@if`, `@foreach`) → Fuchsia
- ✅ Blade Components (`<x-button>`) → Cyan
- ✅ Custom Components (`<UserDashboard>`) → Teal
- ✅ Echo (`{{ }}`) → Yellow
- ✅ Raw Echo (`{!! !!}`) → Orange

**Example Code:**

```blade
@extends('layouts.app')

@section('content')
  <x-admin-panel />
  <UserDashboard :user="$user" />
  {{ $post->title }}
@endsection
```

---

## Language Selector UI

### Location

Bottom-left corner of the editor (in the status bar)

### Appearance

- **Without selector:** Shows language label (e.g., "React JS (JSX)")
- **With selector:** Clickable button with dropdown arrow

### Interaction

1. Click the language button
2. Dropdown appears above the status bar
3. Languages organized in categories
4. Current language is highlighted in blue
5. Click any language to switch
6. Dropdown closes automatically

### Categories in Dropdown

- Web Frameworks
- Backend Frameworks
- JavaScript/TypeScript
- Markup & Styles
- Programming Languages
- Database & Shell
- Other

---

## Complete Examples

### Example 1: React Code Editor with Selector

```tsx
import { useState } from "react";
import { CodeEditor } from "saha-ui";

function ReactEditor() {
  const [code, setCode] = useState(`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <CustomButton onClick={() => setCount(count + 1)}>
      Count: {count}
    </CustomButton>
  );
}`);

  const [language, setLanguage] = useState("reactjs");

  return (
    <CodeEditor
      language={language}
      value={code}
      onChange={setCode}
      onLanguageChange={setLanguage}
      showLanguageSelector={true}
      theme="dark"
      minHeight="400px"
    />
  );
}
```

### Example 2: Multi-Framework Playground

```tsx
import { useState } from "react";
import { CodeEditor } from "saha-ui";

const examples = {
  reactjs: `<MyButton onClick={handleClick}>Click me</MyButton>`,
  vuejs: `<my-button @click="handleClick">Click me</my-button>`,
  django: `<CustomButton data="{{ user }}">Click me</CustomButton>`,
  blade: `<x-button wire:click="handleClick">Click me</x-button>`,
};

function FrameworkPlayground() {
  const [language, setLanguage] = useState("reactjs");
  const [code, setCode] = useState(examples.reactjs);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setCode(examples[newLang] || code);
  };

  return (
    <div>
      <h2>Framework Playground</h2>
      <CodeEditor
        language={language}
        value={code}
        onChange={setCode}
        onLanguageChange={handleLanguageChange}
        showLanguageSelector={true}
        theme="vscode"
      />
    </div>
  );
}
```

---

## Props Reference

| Prop                   | Type                           | Default        | Description                  |
| ---------------------- | ------------------------------ | -------------- | ---------------------------- |
| `language`             | `CodeLanguage`                 | `"javascript"` | Current language/framework   |
| `showLanguageSelector` | `boolean`                      | `false`        | Show dropdown selector       |
| `onLanguageChange`     | `(lang: CodeLanguage) => void` | -              | Called when language changes |

---

## Benefits

✅ **Explicit Control** - Framework highlighting only when you want it  
✅ **User-Friendly** - Visual dropdown with organized categories  
✅ **Dynamic Switching** - Change languages on the fly  
✅ **No Ambiguity** - `javascript` vs `reactjs` are clearly different  
✅ **Better UX** - Users see exactly what highlighting mode is active  
✅ **Customizable** - Can programmatically control language  
✅ **Callback Support** - React to language changes in your app

---

## Migration Guide

### If you were using framework highlighting before:

**Before:**

```tsx
<CodeEditor language="jsx" value={reactCode} />
```

**After (to get React highlighting):**

```tsx
<CodeEditor language="reactjs" value={reactCode} />
```

**Or let user choose:**

```tsx
<CodeEditor
  language="reactjs"
  value={reactCode}
  showLanguageSelector={true}
  onLanguageChange={(lang) => console.log("Switched to:", lang)}
/>
```

---

## Summary

The Language Selector feature gives you **explicit control** over framework-specific syntax highlighting. Users can see and change the language mode, and framework features (like React hooks or Vue directives) only highlight when the specific framework language is selected.

This eliminates confusion between vanilla JavaScript and React JSX, provides a better user experience, and makes the editor more versatile for multi-language projects! 🚀
