# Switch

A fully accessible switch (toggle) component for binary on/off states. Implements the WAI-ARIA switch pattern with proper keyboard navigation and screen reader support.

## Features

- ✅ **Fully Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Multiple Variants** - 7 color variants (default, primary, secondary, accent, success, warning, error)
- 📏 **Size Options** - Small, medium, and large sizes
- 🏷️ **Labels & Descriptions** - Support for labels and descriptive text
- 🎯 **Icons** - Custom icons for on/off states
- ⌨️ **Keyboard Navigation** - Full keyboard support (Space, Enter)
- 🌗 **Dark Mode** - Automatic dark mode support
- 🔄 **Loading State** - Visual feedback during async operations
- 💫 **Smooth Animations** - Beautiful transition effects
- 🎭 **Flexible Layout** - Multiple label positions

## Installation

```bash
npm install saha-ui
```

## Basic Usage

```tsx
import { Switch } from "saha-ui";

function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      label="Enable notifications"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}
```

## Examples

### Variants

```tsx
<Switch label="Default" variant="default" />
<Switch label="Primary" variant="primary" />
<Switch label="Secondary" variant="secondary" />
<Switch label="Accent" variant="accent" />
<Switch label="Success" variant="success" />
<Switch label="Warning" variant="warning" />
<Switch label="Error" variant="error" />
```

### Sizes

```tsx
<Switch label="Small" size="sm" />
<Switch label="Medium" size="md" />
<Switch label="Large" size="lg" />
```

### With Description

```tsx
<Switch
  label="Email notifications"
  description="Receive email updates about your account activity"
  checked={emailNotifications}
  onCheckedChange={setEmailNotifications}
/>
```

### With Helper Text

```tsx
<Switch
  label="Two-factor authentication"
  helperText="Adds an extra layer of security to your account"
  checked={twoFactorEnabled}
  onCheckedChange={setTwoFactorEnabled}
/>
```

### Label Positions

```tsx
<Switch label="Right (default)" labelPosition="right" />
<Switch label="Left" labelPosition="left" />
<Switch label="Top" labelPosition="top" />
<Switch label="Bottom" labelPosition="bottom" />
```

### With Icons

```tsx
import { Sun, Moon } from "lucide-react";

<Switch
  label="Dark mode"
  checked={darkMode}
  onCheckedChange={setDarkMode}
  checkedIcon={<Moon className="w-3 h-3" />}
  uncheckedIcon={<Sun className="w-3 h-3" />}
/>;
```

### Loading State

```tsx
function AsyncSwitch() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (checked: boolean) => {
    setLoading(true);
    try {
      await savePreference(checked);
      setEnabled(checked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      label="Enable feature"
      checked={enabled}
      onCheckedChange={handleChange}
      loading={loading}
      disabled={loading}
    />
  );
}
```

### Disabled State

```tsx
<Switch
  label="Disabled switch"
  checked={false}
  disabled
  helperText="This option is currently unavailable"
/>

<Switch
  label="Disabled (checked)"
  checked={true}
  disabled
/>
```

### Required Field

```tsx
<Switch
  label="Accept terms and conditions"
  required
  checked={accepted}
  onCheckedChange={setAccepted}
  error={!accepted && submitted ? "You must accept to continue" : undefined}
/>
```

### With Error State

```tsx
<Switch
  label="Enable API access"
  checked={apiAccess}
  onCheckedChange={setApiAccess}
  error="API access is currently unavailable"
  aria-invalid="true"
/>
```

### Controlled vs Uncontrolled

```tsx
// Controlled
<Switch
  label="Controlled"
  checked={checked}
  onCheckedChange={setChecked}
/>

// Uncontrolled
<Switch
  label="Uncontrolled"
  defaultChecked={true}
/>
```

### Settings Panel Example

```tsx
function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    darkMode: false,
    sounds: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <Switch
        label="Push notifications"
        description="Receive push notifications on your device"
        checked={settings.notifications}
        onCheckedChange={(checked) => updateSetting("notifications", checked)}
      />
      <Switch
        label="Auto-save"
        description="Automatically save your work"
        checked={settings.autoSave}
        onCheckedChange={(checked) => updateSetting("autoSave", checked)}
      />
      <Switch
        label="Dark mode"
        description="Use dark theme"
        checked={settings.darkMode}
        onCheckedChange={(checked) => updateSetting("darkMode", checked)}
      />
      <Switch
        label="Sound effects"
        description="Play sound effects"
        checked={settings.sounds}
        onCheckedChange={(checked) => updateSetting("sounds", checked)}
      />
    </div>
  );
}
```

### Privacy Settings

```tsx
<div className="space-y-4">
  <Switch
    label="Profile visibility"
    description="Make your profile visible to other users"
    checked={profileVisible}
    onCheckedChange={setProfileVisible}
  />
  <Switch
    label="Show online status"
    description="Let others see when you're online"
    checked={showOnline}
    onCheckedChange={setShowOnline}
    disabled={!profileVisible}
    helperText={!profileVisible ? "Enable profile visibility first" : undefined}
  />
  <Switch
    label="Activity tracking"
    description="Help us improve by sharing anonymous usage data"
    checked={tracking}
    onCheckedChange={setTracking}
  />
</div>
```

### Feature Toggles

```tsx
<div className="space-y-3">
  <Switch
    label="Beta features"
    description="Try out experimental features"
    variant="warning"
    checked={betaEnabled}
    onCheckedChange={setBetaEnabled}
  />
  <Switch
    label="Advanced mode"
    description="Show advanced options and settings"
    checked={advancedMode}
    onCheckedChange={setAdvancedMode}
  />
  <Switch
    label="Developer tools"
    description="Enable developer console and debugging"
    checked={devTools}
    onCheckedChange={setDevTools}
  />
</div>
```

## Accessibility

### Keyboard Navigation

- **Space**: Toggle switch state
- **Enter**: Toggle switch state
- **Tab**: Move focus to/from switch
- **Shift + Tab**: Move focus backwards

### Screen Reader Support

The component provides comprehensive screen reader support:

```tsx
// Auto-generated IDs and ARIA attributes
<Switch
  label="Enable feature"
  description="This enables the advanced feature"
  helperText="You can disable this at any time"
/>
// Automatically creates:
// - role="switch"
// - aria-checked for on/off state
// - aria-labelledby links to label
// - aria-describedby links to description and helperText
```

### Manual ARIA Labels

For switches without visible labels:

```tsx
<Switch
  aria-label="Toggle dark mode"
  checked={darkMode}
  onCheckedChange={setDarkMode}
/>
```

### ARIA Descriptions

```tsx
<Switch
  label="Notifications"
  aria-describedby="notification-description"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
<p id="notification-description">
  You will receive email and push notifications
</p>
```

### Error Announcements

Errors are automatically announced to screen readers:

```tsx
<Switch
  label="Required setting"
  error="This setting must be enabled"
  aria-invalid="true"
  checked={checked}
  onCheckedChange={setChecked}
/>
// Error has role="alert" and aria-live="polite"
```

### Loading State Accessibility

```tsx
<Switch
  label="Saving preference"
  loading={true}
  aria-busy="true"
  aria-label="Saving preference, please wait"
/>
```

### Required Fields

```tsx
<Switch
  label="Accept terms"
  required
  aria-required="true"
  checked={accepted}
  onCheckedChange={setAccepted}
/>
```

## API Reference

### Switch Props

| Prop               | Type                                                                                     | Default     | Description                                   |
| ------------------ | ---------------------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `label`            | `string`                                                                                 | -           | Label text for the switch                     |
| `description`      | `string`                                                                                 | -           | Description text shown below/beside the label |
| `helperText`       | `string`                                                                                 | -           | Helper text shown below the switch            |
| `error`            | `string`                                                                                 | -           | Error message to display                      |
| `labelPosition`    | `'left' \| 'right' \| 'top' \| 'bottom'`                                                 | `'right'`   | Position of the label                         |
| `variant`          | `'default' \| 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color variant                                 |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                                   | `'md'`      | Size of the switch                            |
| `checked`          | `boolean`                                                                                | -           | Checked state (controlled)                    |
| `defaultChecked`   | `boolean`                                                                                | `false`     | Default checked state (uncontrolled)          |
| `disabled`         | `boolean`                                                                                | `false`     | Whether the switch is disabled                |
| `loading`          | `boolean`                                                                                | `false`     | Show loading state                            |
| `required`         | `boolean`                                                                                | `false`     | Whether the switch is required                |
| `checkedIcon`      | `ReactNode`                                                                              | -           | Icon to show when checked                     |
| `uncheckedIcon`    | `ReactNode`                                                                              | -           | Icon to show when unchecked                   |
| `onChange`         | `(e: ChangeEvent) => void`                                                               | -           | Native change handler                         |
| `onCheckedChange`  | `(checked: boolean) => void`                                                             | -           | Callback when checked state changes           |
| `className`        | `string`                                                                                 | -           | Additional CSS classes                        |
| `aria-label`       | `string`                                                                                 | -           | Accessible label for screen readers           |
| `aria-labelledby`  | `string`                                                                                 | -           | ID of element that labels this switch         |
| `aria-describedby` | `string`                                                                                 | -           | IDs of elements that describe this switch     |
| `aria-required`    | `'true' \| 'false'`                                                                      | -           | Whether the switch is required                |
| `aria-invalid`     | `'true' \| 'false'`                                                                      | -           | Whether the switch has an error               |

## Best Practices

### 1. Always Provide Labels

For accessibility, always provide a clear label:

```tsx
// Good ✅
<Switch label="Enable notifications" />
<Switch aria-label="Toggle dark mode" />

// Bad ❌
<Switch />
```

### 2. Use for Binary States Only

Switches are for on/off states. For other cases:

```tsx
// Good ✅ - Binary choice
<Switch label="Enable feature" />

// Bad ❌ - Multiple options (use Radio instead)
<Switch label="Option 1" />
<Switch label="Option 2" />
<Switch label="Option 3" />
```

### 3. Provide Clear Descriptions

Help users understand what the switch does:

```tsx
<Switch
  label="Email notifications"
  description="Receive email updates about your account"
/>
```

### 4. Show Immediate Feedback

```tsx
<Switch label="Feature" loading={isSaving} disabled={isSaving} />
```

### 5. Use Controlled Components in Forms

```tsx
function Form() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      label="Enable feature"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}
```

### 6. Validate Required Switches

```tsx
<Switch
  label="Accept terms"
  required
  error={!accepted && submitted ? "Required" : undefined}
/>
```

### 7. Disable Dependent Options

```tsx
<Switch
  label="Advanced features"
  checked={advanced}
  onCheckedChange={setAdvanced}
/>
<Switch
  label="Expert mode"
  checked={expert}
  onCheckedChange={setExpert}
  disabled={!advanced}
  helperText={!advanced ? "Enable advanced features first" : undefined}
/>
```

### 8. Use Appropriate Variants

```tsx
// Success for positive actions
<Switch variant="success" label="Enable backups" />

// Warning for potentially risky actions
<Switch variant="warning" label="Beta features" />

// Error for dangerous actions
<Switch variant="error" label="Delete account on logout" />
```

### 9. Consider Using Icons

Make the state more obvious with icons:

```tsx
<Switch label="Dark mode" checkedIcon={<Moon />} uncheckedIcon={<Sun />} />
```

### 10. Group Related Switches

```tsx
<fieldset>
  <legend>Notification Settings</legend>
  <Switch label="Email notifications" />
  <Switch label="Push notifications" />
  <Switch label="SMS notifications" />
</fieldset>
```

## Form Integration

### With React Hook Form

```tsx
import { useForm, Controller } from "react-hook-form";

function Form() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="notifications"
        control={control}
        rules={{ required: "You must enable notifications" }}
        render={({ field, fieldState }) => (
          <Switch
            label="Enable notifications"
            checked={field.value}
            onCheckedChange={field.onChange}
            error={fieldState.error?.message}
            aria-invalid={!!fieldState.error}
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Field } from "formik";

function Form() {
  return (
    <Formik
      initialValues={{ enabled: false }}
      validate={(values) => {
        const errors: any = {};
        if (!values.enabled) {
          errors.enabled = "This must be enabled";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Switch
          label="Accept terms"
          checked={values.enabled}
          onCheckedChange={(checked) => setFieldValue("enabled", checked)}
          error={touched.enabled ? errors.enabled : undefined}
        />
      )}
    </Formik>
  );
}
```

## Advanced Examples

### Theme Switcher

```tsx
function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Switch
      label="Dark mode"
      description="Switch between light and dark themes"
      checked={darkMode}
      onCheckedChange={setDarkMode}
      checkedIcon={<Moon className="w-3 h-3" />}
      uncheckedIcon={<Sun className="w-3 h-3" />}
    />
  );
}
```

### Notification Preferences

```tsx
function NotificationSettings() {
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [saving, setSaving] = useState(false);

  const updatePreference = async (key: string, value: boolean) => {
    setSaving(true);
    try {
      await api.updatePreference(key, value);
      setPreferences((prev) => ({ ...prev, [key]: value }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Switch
        label="Email notifications"
        description="Receive notifications via email"
        checked={preferences.email}
        onCheckedChange={(checked) => updatePreference("email", checked)}
        loading={saving}
      />
      <Switch
        label="Push notifications"
        description="Receive push notifications"
        checked={preferences.push}
        onCheckedChange={(checked) => updatePreference("push", checked)}
        loading={saving}
      />
      <Switch
        label="SMS notifications"
        description="Receive text messages"
        checked={preferences.sms}
        onCheckedChange={(checked) => updatePreference("sms", checked)}
        loading={saving}
      />
      <Switch
        label="Marketing emails"
        description="Receive promotional content"
        checked={preferences.marketing}
        onCheckedChange={(checked) => updatePreference("marketing", checked)}
        loading={saving}
      />
    </div>
  );
}
```

### Privacy Controls

```tsx
function PrivacySettings() {
  const [public, setPublic] = useState(false);
  const [searchable, setSearchable] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  return (
    <div className="space-y-4">
      <Switch
        label="Public profile"
        description="Make your profile visible to everyone"
        checked={public}
        onCheckedChange={setPublic}
      />
      <Switch
        label="Searchable"
        description="Allow your profile to appear in search results"
        checked={searchable}
        onCheckedChange={setSearchable}
        disabled={!public}
        helperText={!public ? "Enable public profile first" : undefined}
      />
      <Switch
        label="Show activity"
        description="Display your recent activity on your profile"
        checked={showActivity}
        onCheckedChange={setShowActivity}
        disabled={!public}
        helperText={!public ? "Enable public profile first" : undefined}
      />
    </div>
  );
}
```

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type { SwitchProps } from "saha-ui";

const MySwitch: React.FC<SwitchProps> = (props) => {
  return <Switch {...props} />;
};
```

## Styling

The component uses CVA (Class Variance Authority) for variant management:

```tsx
<Switch label="Custom styled" className="my-custom-class" />
```

## Dark Mode

Dark mode is automatically supported using CSS variables. No additional configuration needed.

## Comparison: Switch vs Checkbox

| Use Case             | Component  |
| -------------------- | ---------- |
| Binary on/off state  | **Switch** |
| Immediate effect     | **Switch** |
| Option in a form     | Checkbox   |
| Multiple selections  | Checkbox   |
| Submit with form     | Checkbox   |
| Settings/preferences | **Switch** |

**Use Switch when:**

- The change takes effect immediately
- You're toggling a feature on/off
- You're in a settings context

**Use Checkbox when:**

- The change happens on form submit
- You need multiple selections
- You're accepting terms/agreements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- [Checkbox](../Checkbox/README.md) - For form selections
- [Radio](../Radio/README.md) - For single selection
- [Toggle](../Toggle/README.md) - For toggle buttons
- [Form](../Form/README.md) - For form management

## Changelog

See [CHANGELOG.md](../../../CHANGELOG.md) for version history.

## License

MIT © Saha UI
