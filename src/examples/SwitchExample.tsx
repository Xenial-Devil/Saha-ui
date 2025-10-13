import React from "react";
import { Switch } from "../components/Switch";
import {
  Bell,
  Check,
  X,
  Wifi,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Zap,
  ZapOff,
} from "lucide-react";

export function SwitchExample() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [wifi, setWifi] = React.useState(true);
  const [sound, setSound] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleAsyncToggle = async (checked: boolean) => {
    setLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAutoSave(checked);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Switch</h2>
        <p className="text-muted-foreground mb-6">
          Modern toggle switches with beautiful animations, icons, and multiple
          variants.
        </p>
      </div>

      {/* Basic Switches */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Basic Switches
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch label="Default Switch" />
          <Switch label="Checked by default" defaultChecked />
          <Switch label="Disabled Switch" disabled />
          <Switch label="Disabled & Checked" disabled defaultChecked />
        </div>
      </div>

      {/* Switches with Descriptions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Switches with Descriptions
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            label="Push Notifications"
            description="Receive notifications about your account activity"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
          <Switch
            label="Email Marketing"
            description="Receive emails about new products and features"
            checked={marketing}
            onCheckedChange={setMarketing}
          />
          <Switch
            label="Auto-save"
            description="Automatically save your work every 5 minutes"
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
        </div>
      </div>

      {/* Switches with Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Switches with Icons
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            label="Dark Mode"
            description="Toggle dark mode theme"
            checked={darkMode}
            onCheckedChange={setDarkMode}
            onIcon={<Moon className="w-3 h-3" />}
            offIcon={<Sun className="w-3 h-3" />}
          />
          <Switch
            label="Wi-Fi"
            description="Connect to wireless networks"
            checked={wifi}
            onCheckedChange={setWifi}
            onIcon={<Wifi className="w-3 h-3" />}
            offIcon={<X className="w-3 h-3" />}
          />
          <Switch
            label="Sound"
            description="Enable system sounds"
            checked={sound}
            onCheckedChange={setSound}
            onIcon={<Volume2 className="w-3 h-3" />}
            offIcon={<VolumeX className="w-3 h-3" />}
          />
        </div>
      </div>

      {/* Color Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Color Variants
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch variant="default" label="Default Variant" defaultChecked />
          <Switch variant="primary" label="Primary Variant" defaultChecked />
          <Switch
            variant="secondary"
            label="Secondary Variant"
            defaultChecked
          />
          <Switch variant="accent" label="Accent Variant" defaultChecked />
          <Switch variant="success" label="Success Variant" defaultChecked />
          <Switch variant="warning" label="Warning Variant" defaultChecked />
          <Switch variant="error" label="Error Variant" defaultChecked />
        </div>
      </div>

      {/* Size Variations */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Size Variations
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            size="sm"
            label="Small Switch"
            description="Compact size for tight spaces"
            defaultChecked
          />
          <Switch
            size="md"
            label="Medium Switch"
            description="Standard size (default)"
            defaultChecked
          />
          <Switch
            size="lg"
            label="Large Switch"
            description="Prominent size for emphasis"
            defaultChecked
          />
        </div>
      </div>

      {/* Switches with Badges */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Switches with Badges
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            label="Beta Features"
            description="Enable experimental features"
            badge="Beta"
            defaultChecked
          />
          <Switch
            label="Premium Mode"
            description="Unlock premium features"
            badge="Pro"
            variant="accent"
          />
          <Switch
            label="Developer Tools"
            description="Enable advanced debugging"
            badge="🔧 Dev"
            variant="warning"
          />
        </div>
      </div>

      {/* Loading State */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Loading State
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            label="Auto-save (Async)"
            description="This switch simulates an async operation"
            checked={autoSave}
            onCheckedChange={handleAsyncToggle}
            loading={loading}
          />
          <Switch
            label="Loading Example"
            description="Switch in loading state"
            loading
          />
        </div>
      </div>

      {/* Label Position */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Label Position
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            label="Label on Right"
            description="Default position"
            labelPosition="right"
            defaultChecked
          />
          <Switch
            label="Label on Left"
            description="Alternative layout"
            labelPosition="left"
            defaultChecked
          />
        </div>
      </div>

      {/* Advanced Examples with Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Advanced Icon Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
            <Switch
              label="Security Lock"
              description="Lock your account"
              onIcon={<Lock className="w-3 h-3" />}
              offIcon={<Unlock className="w-3 h-3" />}
              variant="error"
            />
            <Switch
              label="Visibility"
              description="Show/hide content"
              onIcon={<Eye className="w-3 h-3" />}
              offIcon={<EyeOff className="w-3 h-3" />}
              variant="secondary"
            />
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
            <Switch
              label="Power Mode"
              description="Enable high performance"
              onIcon={<Zap className="w-3 h-3" />}
              offIcon={<ZapOff className="w-3 h-3" />}
              variant="warning"
            />
            <Switch
              label="Notifications"
              description="Push notifications"
              onIcon={<Bell className="w-3 h-3" />}
              offIcon={<X className="w-3 h-3" />}
              variant="success"
            />
          </div>
        </div>
      </div>

      {/* Validation States */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Validation States
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Switch
            label="Accept Terms"
            description="You must accept the terms to continue"
            error="This field is required"
            variant="error"
          />
          <Switch
            label="Newsletter"
            description="Subscribe to our newsletter"
            helperText="You can unsubscribe at any time"
            defaultChecked
          />
        </div>
      </div>

      {/* Without Labels */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Standalone Switches
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="flex gap-4 items-center">
            <Switch size="sm" />
            <Switch size="md" defaultChecked />
            <Switch size="lg" />
            <Switch size="sm" variant="success" defaultChecked />
            <Switch size="md" variant="warning" defaultChecked />
            <Switch size="lg" variant="error" defaultChecked />
          </div>
        </div>
      </div>

      {/* Settings Panel Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Settings Panel Example
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="space-y-6">
            <div>
              <h4 className="text-md font-semibold mb-3 text-foreground">
                Privacy & Security
              </h4>
              <div className="space-y-3">
                <Switch
                  label="Two-factor Authentication"
                  description="Add an extra layer of security"
                  badge="Recommended"
                  variant="success"
                />
                <Switch
                  label="Profile Visibility"
                  description="Make your profile visible to others"
                  defaultChecked
                />
                <Switch
                  label="Activity Status"
                  description="Show when you're active"
                  defaultChecked
                />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-md font-semibold mb-3 text-foreground">
                Notifications
              </h4>
              <div className="space-y-3">
                <Switch
                  label="Email Notifications"
                  description="Receive email updates"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                  onIcon={<Check className="w-3 h-3" />}
                  offIcon={<X className="w-3 h-3" />}
                />
                <Switch
                  label="Push Notifications"
                  description="Receive push notifications on your device"
                  defaultChecked
                />
                <Switch
                  label="SMS Notifications"
                  description="Receive text messages"
                  variant="warning"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current States Display */}
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Current States
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Notifications:</span>
            <span className="font-medium text-foreground">
              {notifications ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dark Mode:</span>
            <span className="font-medium text-foreground">
              {darkMode ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Wi-Fi:</span>
            <span className="font-medium text-foreground">
              {wifi ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sound:</span>
            <span className="font-medium text-foreground">
              {sound ? "On" : "Off"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Auto-save:</span>
            <span className="font-medium text-foreground">
              {autoSave ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Marketing:</span>
            <span className="font-medium text-foreground">
              {marketing ? "Subscribed" : "Unsubscribed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwitchExample;
