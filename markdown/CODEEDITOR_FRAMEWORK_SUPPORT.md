# CodeEditor Framework Support

## Overview

The CodeEditor component now includes comprehensive framework-specific syntax highlighting support for popular web frameworks. Custom components are automatically highlighted with distinct colors to differentiate them from standard HTML elements.

## Supported Frameworks

### 1. React (JSX/TSX)

**Language Options:** `jsx`, `tsx`

**Features:**

- ✅ **React Hooks** - All hooks highlighted in fuchsia (useState, useEffect, etc.)
- ✅ **Custom Components (PascalCase)** - Cyan color for components like `<MyButton>`, `<UserCard>`, `<CustomInput>`
- ✅ **Standard HTML tags** - Blue color for elements like `<div>`, `<span>`, `<button>`
- ✅ **Props/Attributes** - Amber color for all props
- ✅ **JSX Expressions** - Purple color for variables in `{value}`
- ✅ **Spread Operator** - Orange color for `{...props}`
- ✅ **Fragment Syntax** - Cyan color for `<>` and `</>`

**Example:**

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyCustomButton onClick={() => setCount(count + 1)}>
        Click me
      </MyCustomButton>
      <UserProfile {...user} />
    </>
  );
}
```

**Highlighting:**

- `useState`, `useEffect` → Fuchsia (hooks)
- `MyCustomButton`, `UserProfile` → Cyan (custom components)
- `onClick` → Amber (props)
- `{...user}` → Orange (spread)
- `<>`, `</>` → Cyan (fragments)

---

### 2. Vue

**Language Option:** `vue`

**Features:**

- ✅ **Vue Directives** - Emerald color for `v-if`, `v-for`, `v-model`, `v-bind`, etc.
- ✅ **Vue Composition API** - Fuchsia color for `ref`, `reactive`, `computed`, `watch`, etc.
- ✅ **Custom Components (PascalCase)** - Cyan color like `<MyComponent>`, `<UserCard>`
- ✅ **Custom Components (kebab-case)** - Teal color like `<my-component>`, `<user-card>`
- ✅ **Mustache Syntax** - Yellow color for `{{ expression }}`
- ✅ **Template Tags** - Fuchsia color for `<template>`, `<script>`, `<style>`
- ✅ **Standard HTML tags** - Blue color for standard elements
- ✅ **Attributes/Props** - Amber color including `:`, `@`, `#` modifiers

**Example:**

```vue
<template>
  <div>
    <MyHeader :title="pageTitle" />
    <user-profile v-if="isLoggedIn" />
    <custom-button @click="handleClick">
      {{ buttonText }}
    </custom-button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const pageTitle = ref("Dashboard");
const isLoggedIn = computed(() => user.value !== null);
</script>
```

**Highlighting:**

- `v-if`, `@click` → Emerald (directives)
- `ref`, `computed` → Fuchsia (composition API)
- `MyHeader` → Cyan (PascalCase component)
- `user-profile`, `custom-button` → Teal (kebab-case component)
- `:title`, `@click` → Amber (props)
- `{{ buttonText }}` → Yellow (mustache)

---

### 3. Django Templates

**Language Options:** `django`, `django-html`, `htmldjango`

**Features:**

- ✅ **Template Tags** - Fuchsia color for `{% if %}`, `{% for %}`, `{% block %}`, etc.
- ✅ **Template Variables** - Yellow color for `{{ variable }}`
- ✅ **Template Filters** - Cyan color for `|filter` like `{{ name|upper }}`
- ✅ **Custom Components** - Teal color for both PascalCase and kebab-case custom tags
- ✅ **Standard HTML** - Orange color for standard HTML elements
- ✅ **Tag Delimiters** - Pink color for `{%`, `%}`, `{{`, `}}`

**Example:**

```django
{% extends "base.html" %}

{% block content %}
  <div>
    {% if user.is_authenticated %}
      <UserProfile user="{{ user }}" />
      <custom-widget data="{{ user.data|safe }}" />
      {{ user.name|title }}
    {% endif %}
  </div>
{% endblock %}
```

**Highlighting:**

- `{% extends %}`, `{% if %}`, `{% block %}` → Fuchsia (template tags)
- `{{ user }}`, `{{ user.name }}` → Yellow (variables)
- `|safe`, `|title` → Cyan (filters)
- `UserProfile`, `custom-widget` → Teal (custom components)
- `{%`, `%}`, `{{`, `}}` → Pink (delimiters)

---

### 4. Laravel Blade

**Language Options:** `blade`, `laravel`, `blade.php`

**Features:**

- ✅ **Blade Directives** - Fuchsia color for `@if`, `@foreach`, `@section`, etc.
- ✅ **Blade Echo** - Yellow color for `{{ $variable }}`
- ✅ **Raw Echo** - Orange color for `{!! $html !!}`
- ✅ **Blade Comments** - Gray italic for `{{-- comment --}}`
- ✅ **Blade Components** - Cyan color for `<x-component-name>`
- ✅ **Custom Components (PascalCase)** - Teal color like `<MyComponent>`
- ✅ **Standard HTML** - Orange color for standard elements

**Example:**

```blade
@extends('layouts.app')

@section('content')
  <div>
    @if($user->isAdmin())
      <x-admin-panel />
      <UserDashboard :user="$user" />
    @endif

    @foreach($posts as $post)
      <x-post-card :post="$post">
        <x-slot name="title">
          {{ $post->title }}
        </x-slot>
      </x-post-card>
    @endforeach
  </div>
@endsection

{{-- This is a comment --}}
```

**Highlighting:**

- `@extends`, `@if`, `@foreach`, `@section` → Fuchsia (directives)
- `{{ $post->title }}` → Yellow (echo)
- `{!! $html !!}` → Orange (raw echo)
- `<x-admin-panel>`, `<x-post-card>` → Cyan (blade components)
- `UserDashboard` → Teal (custom PascalCase)
- `{{-- comment --}}` → Gray italic (comments)

---

## Color Scheme Summary

| Element Type                       | Color                             | Frameworks                  |
| ---------------------------------- | --------------------------------- | --------------------------- |
| **Custom Components (PascalCase)** | Cyan                              | React, Vue, Django, Laravel |
| **Custom Components (kebab-case)** | Teal                              | Vue, Django                 |
| **Blade Components (x-)**          | Cyan                              | Laravel                     |
| **Framework Hooks/Functions**      | Fuchsia                           | React, Vue                  |
| **Directives**                     | Emerald (Vue) / Fuchsia (Laravel) | Vue, Laravel                |
| **Template Tags**                  | Fuchsia                           | Django, Laravel             |
| **Variables/Mustache**             | Yellow                            | Vue, Django, Laravel        |
| **Props/Attributes**               | Amber                             | All                         |
| **Standard HTML**                  | Blue/Orange                       | All                         |
| **Strings**                        | Emerald                           | All                         |
| **Comments**                       | Gray Italic                       | All                         |

---

## Usage Examples

### React Component with Custom Components

```tsx
<CodeEditor
  language="jsx"
  theme="dark"
  value={reactCode}
  onChange={setReactCode}
  placeholder="// Write your React code..."
/>
```

### Vue Component with Framework Support

```tsx
<CodeEditor
  language="vue"
  theme="vscode"
  value={vueCode}
  onChange={setVueCode}
/>
```

### Django Template

```tsx
<CodeEditor
  language="django"
  theme="monokai"
  value={djangoTemplate}
  onChange={setDjangoTemplate}
/>
```

### Laravel Blade Template

```tsx
<CodeEditor
  language="blade"
  theme="github"
  value={bladeTemplate}
  onChange={setBladeTemplate}
/>
```

---

## Custom Component Detection

The CodeEditor automatically detects and highlights custom components based on naming conventions:

### React/JSX

- **PascalCase** → Custom Component (e.g., `MyButton`, `UserCard`, `CustomInput`)
- **lowercase** → Standard HTML (e.g., `div`, `span`, `button`)

### Vue

- **PascalCase** → Custom Component (e.g., `MyComponent`, `UserProfile`)
- **kebab-case with hyphen** → Custom Component (e.g., `my-component`, `user-profile`)
- **single lowercase word** → Standard HTML (e.g., `div`, `p`)

### Laravel Blade

- **x-prefix** → Blade Component (e.g., `x-button`, `x-card`, `x-alert`)
- **PascalCase** → Custom Component (e.g., `MyComponent`, `AdminPanel`)

### Django

- **Any non-standard HTML tag** → Custom Component

---

## Benefits

✅ **Better Code Readability** - Instantly distinguish custom components from HTML  
✅ **Framework-Aware** - Understands framework-specific syntax patterns  
✅ **Color-Coded** - Different colors for different component types  
✅ **Auto-Detection** - No configuration needed, works automatically  
✅ **Multi-Framework** - React, Vue, Django, and Laravel all supported  
✅ **Consistent UX** - Similar highlighting patterns across frameworks

---

## All Supported Languages

The CodeEditor supports 30+ programming languages with syntax highlighting:

- JavaScript, TypeScript, JSX, TSX
- Python, Java, C, C++, C#
- Go, Rust, Swift, Kotlin
- Ruby, PHP, Dart
- HTML, CSS, SCSS
- SQL, Bash, Shell
- JSON, YAML, XML, Markdown
- R, MATLAB, Julia
- Haskell, Erlang, Lisp, Perl, Scala
- COBOL, Ada, Assembly

---

## Theme Support

8 beautiful themes available:

- `light` - Clean light theme
- `dark` - Modern dark theme (default)
- `vscode` - VS Code inspired
- `github` - GitHub code style
- `monokai` - Classic Monokai
- `dracula` - Popular Dracula theme
- `nord` - Arctic Nord palette
- `solarized` - Solarized color scheme

---

## Next Steps

1. **Use the component** with your framework code
2. **Test custom components** in JSX, Vue, Django, or Blade templates
3. **Try different themes** to find your favorite
4. **Report issues** if you find any highlighting bugs

The CodeEditor is production-ready and fully supports custom components in all major web frameworks! 🚀
