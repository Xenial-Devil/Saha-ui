# CookieConsent

A customizable cookie consent dialog designed to float at the bottom of the viewport, compliant with standard data privacy requirements.

## Installation

```tsx
import { CookieConsent } from "saha-ui";
```

## Usage

### Basic Usage

```tsx
import { CookieConsent, useCookieConsent } from "saha-ui";

export default function App() {
  const { hasConsent, acceptCookies, declineCookies } = useCookieConsent();

  if (hasConsent) return null;

  return <CookieConsent onAccept={acceptCookies} onDecline={declineCookies} />;
}
```

## Props

| Prop           | Type                                          | Default                  | Description                          |
| -------------- | --------------------------------------------- | ------------------------ | ------------------------------------ |
| `title`        | `string`                                      | `"Cookie Preferences"`   | Title of the consent banner.         |
| `description`  | `string`                                      | `"We use cookies to..."` | The descriptive text for the banner. |
| `acceptLabel`  | `string`                                      | `"Accept All"`           | Text for the accept button.          |
| `declineLabel` | `string`                                      | `"Decline"`              | Text for the decline button.         |
| `onAccept`     | `() => void`                                  | `undefined`              | Callback when cookies are accepted.  |
| `onDecline`    | `() => void`                                  | `undefined`              | Callback when cookies are declined.  |
| `position`     | `"bottom" \| "bottom-left" \| "bottom-right"` | `"bottom"`               | Position on the screen.              |
