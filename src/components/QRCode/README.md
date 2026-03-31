# QRCode

Creates a high-fidelity QR Code. This component wraps `qrcode.react`, supporting embedded center logos, error correction, and multiple rendering engines (SVG or Canvas).

## Installation

```tsx
import { QRCode } from 'saha-ui';
```

## Usage

### Standard QR Tracking

```tsx
import { QRCode } from "saha-ui";

export default function Example() {
  return (
    <QRCode 
      value="https://saha-ui.isubroto.com.bd" 
      logoUrl="/brand-logo.png" 
      renderAs="svg"
      level="H"
      size={200}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The target URL or textual content encoded logically into grid blocks |
| `renderAs` | `"canvas" \| "svg"` | `"svg"` | Determines HTML DOM elements representing the visual blocks computationally |
| `level` | `"L" \| "M" \| "Q" \| "H"` | `"M"` | Error correction scale. High (`H`) required mapping complex center logos cleanly |
| `logoUrl` | `string` | - | Overlay URL rendered identically inside the central core layer vertically mapped |
| `logoSize` | `number` | `0.2` | Fractional ratio scaling dimension for embedded logo relative to total block |
| `logoExcavate` | `boolean` | `true` | Masks the underlying code blocks perfectly surrounding embedded assets |
| `size` | `number` | `128` | Output frame width/height natively rendered externally |
| `includeMargin` | `boolean` | `false` | Internal library margin buffering injection globally |
| `fgColor` | `string` | `"#000000"` | Hexadecimal or CSS shade dictating active node block blocks |
| `bgColor` | `string` | `"transparent"` | CSS rendering shade dictating passive background squares |
