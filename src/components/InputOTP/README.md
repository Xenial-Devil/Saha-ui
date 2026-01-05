# InputOTP

A one-time password input component with individual digit boxes and automatic focus management.

## Features

- 🔢 **Digit Boxes** - Individual input boxes
- ⌨️ **Auto Focus** - Automatic focus progression
- 📋 **Paste Support** - Paste from clipboard
- 🎨 **Customizable** - Styling and length
- ♿ **Accessible** - Keyboard navigation

## Installation

\`\`\`tsx
import { InputOTP } from 'saha-ui';
\`\`\`

## Basic Usage

\`\`\`tsx
const [otp, setOtp] = useState('');

<InputOTP
  length={6}
  value={otp}
  onChange={setOtp}
/>
\`\`\`

## Related Components

- **Input** - Text input
- **Field** - Form field wrapper
