# ColorPicker

An advanced color picker component with multiple color format support, presets, and an intuitive interface for selecting colors.

## Features

- 🎨 **Multiple Formats** - HEX, RGB, HSL, HSV support
- 🎯 **Interactive Picker** - Saturation/hue selector with alpha channel
- 📋 **Presets** - Predefined color swatches
- 👁️ **Preview** - Real-time color preview
- ⌨️ **Manual Input** - Type colors directly
- 🎨 **Recent Colors** - Remember recently used colors
- ♿ **Accessible** - Keyboard navigation and ARIA support
- 📱 **Responsive** - Works on all devices

## Installation

\`\`\`tsx
import { ColorPicker } from '@saha-ui/core';
\`\`\`

## Basic Usage

\`\`\`tsx
const [color, setColor] = useState('#3b82f6');

<ColorPicker value={color} onChange={setColor} />
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`value\` | \`string\` | \`"#000000"\` | Current color value |
| \`onChange\` | \`(color: string) => void\` | - | Callback when color changes |
| \`format\` | \`"hex" \| "rgb" \| "hsl"\` | \`"hex"\` | Color format |
| \`presets\` | \`string[]\` | - | Preset color swatches |
| \`showAlpha\` | \`boolean\` | \`false\` | Show alpha channel |
| \`showPresets\` | \`boolean\` | \`true\` | Show preset colors |
| \`disabled\` | \`boolean\` | \`false\` | Disable the picker |
| \`className\` | \`string\` | - | Additional CSS classes |

## Related Components

- **Input** - Text input for manual color entry
- **Popover** - Container for picker dropdown
- **Button** - Trigger button
