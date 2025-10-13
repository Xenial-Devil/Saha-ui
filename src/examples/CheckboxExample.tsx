import React from "react";
import { Checkbox, CheckboxGroup } from "../components/Checkbox";
import {
  Check,
  Star,
  Heart,
  Zap,
  Shield,
  Crown,
  Rocket,
  Package,
  Globe,
  Code,
  Cpu,
  Database,
  Cloud,
  Lock,
  Bell,
  Mail,
  MessageSquare,
} from "lucide-react";

export function CheckboxExample() {
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([
    "notifications",
  ]);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([
    "hosting",
  ]);
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const allItems = ["item1", "item2", "item3"];
  const indeterminate =
    selectedItems.length > 0 && selectedItems.length < allItems.length;

  React.useEffect(() => {
    setSelectAll(selectedItems.length === allItems.length);
  }, [selectedItems]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedItems(checked ? allItems : []);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Checkbox</h2>
        <p className="text-muted-foreground mb-6">
          Modern checkboxes with beautiful animations, indeterminate state,
          icons, and multiple variants.
        </p>
      </div>

      {/* Basic Checkboxes */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Basic Checkboxes
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox label="Default Checkbox" />
          <Checkbox label="Checked by default" defaultChecked />
          <Checkbox label="Disabled Checkbox" disabled />
          <Checkbox label="Disabled & Checked" disabled defaultChecked />
        </div>
      </div>

      {/* Checkboxes with Descriptions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Checkboxes with Descriptions
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            label="Email Notifications"
            description="Receive email updates about your account activity"
            defaultChecked
          />
          <Checkbox
            label="Push Notifications"
            description="Receive push notifications on your device"
            defaultChecked
          />
          <Checkbox
            label="SMS Notifications"
            description="Receive text messages for important updates"
          />
        </div>
      </div>

      {/* Indeterminate State */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Indeterminate State (Select All)
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            label="Select All"
            checked={selectAll}
            indeterminate={indeterminate}
            onCheckedChange={handleSelectAll}
          />
          <div className="ml-6 space-y-3 border-l-2 border-border pl-4">
            <Checkbox
              label="Item 1"
              value="item1"
              checked={selectedItems.includes("item1")}
              onCheckedChange={(checked: boolean) => {
                setSelectedItems(
                  checked
                    ? [...selectedItems, "item1"]
                    : selectedItems.filter((i) => i !== "item1")
                );
              }}
            />
            <Checkbox
              label="Item 2"
              value="item2"
              checked={selectedItems.includes("item2")}
              onCheckedChange={(checked: boolean) => {
                setSelectedItems(
                  checked
                    ? [...selectedItems, "item2"]
                    : selectedItems.filter((i) => i !== "item2")
                );
              }}
            />
            <Checkbox
              label="Item 3"
              value="item3"
              checked={selectedItems.includes("item3")}
              onCheckedChange={(checked: boolean) => {
                setSelectedItems(
                  checked
                    ? [...selectedItems, "item3"]
                    : selectedItems.filter((i) => i !== "item3")
                );
              }}
            />
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Color Variants
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox variant="default" label="Default Variant" defaultChecked />
          <Checkbox variant="primary" label="Primary Variant" defaultChecked />
          <Checkbox
            variant="secondary"
            label="Secondary Variant"
            defaultChecked
          />
          <Checkbox variant="accent" label="Accent Variant" defaultChecked />
          <Checkbox variant="success" label="Success Variant" defaultChecked />
          <Checkbox variant="warning" label="Warning Variant" defaultChecked />
          <Checkbox variant="error" label="Error Variant" defaultChecked />
        </div>
      </div>

      {/* Size Variations */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Size Variations
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            size="sm"
            label="Small Checkbox"
            description="Compact size for tight spaces"
            defaultChecked
          />
          <Checkbox
            size="md"
            label="Medium Checkbox"
            description="Standard size (default)"
            defaultChecked
          />
          <Checkbox
            size="lg"
            label="Large Checkbox"
            description="Prominent size for emphasis"
            defaultChecked
          />
        </div>
      </div>

      {/* Checkboxes with Badges */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Checkboxes with Badges
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            label="Beta Features"
            description="Enable experimental features"
            badge="Beta"
            defaultChecked
          />
          <Checkbox
            label="Premium Features"
            description="Unlock premium functionality"
            badge="Pro"
            variant="accent"
          />
          <Checkbox
            label="Developer Tools"
            description="Enable advanced debugging"
            badge="🔧 Dev"
            variant="warning"
          />
        </div>
      </div>

      {/* Custom Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Custom Icons
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            label="Favorite"
            description="Mark as favorite"
            icon={<Star className="w-3 h-3" />}
            variant="warning"
          />
          <Checkbox
            label="Like"
            description="Add to liked items"
            icon={<Heart className="w-3 h-3" />}
            variant="error"
            defaultChecked
          />
          <Checkbox
            label="Premium"
            description="Enable premium features"
            icon={<Crown className="w-3 h-3" />}
            variant="accent"
          />
        </div>
      </div>

      {/* CheckboxGroup */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Checkbox Group
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Select Features"
            description="Choose the features you want to enable"
            value={selectedFeatures}
            onChange={setSelectedFeatures}
          >
            <Checkbox
              value="notifications"
              label="Notifications"
              description="Receive updates and alerts"
            />
            <Checkbox
              value="analytics"
              label="Analytics"
              description="Track your usage statistics"
            />
            <Checkbox
              value="api"
              label="API Access"
              description="Enable API integrations"
            />
            <Checkbox
              value="support"
              label="Priority Support"
              description="Get priority customer support"
            />
          </CheckboxGroup>
        </div>
      </div>

      {/* Card Style Checkboxes */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Card Style Checkboxes
        </h3>
        <CheckboxGroup
          label="Select Services"
          description="Choose the services you need"
          value={selectedServices}
          onChange={setSelectedServices}
          card
        >
          <Checkbox
            value="hosting"
            label="Web Hosting"
            description="Fast and reliable hosting with 99.9% uptime"
            icon={<Cloud className="w-6 h-6" />}
            badge="Popular"
          />
          <Checkbox
            value="database"
            label="Database"
            description="Managed database with automatic backups"
            icon={<Database className="w-6 h-6" />}
            recommended
          />
          <Checkbox
            value="cdn"
            label="CDN"
            description="Global content delivery network"
            icon={<Globe className="w-6 h-6" />}
            badge="Fast"
          />
        </CheckboxGroup>
      </div>

      {/* Card Style with Options Array */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Add-ons Selection
        </h3>
        <CheckboxGroup
          label="Select Add-ons"
          description="Enhance your plan with these add-ons"
          value={selectedAddons}
          onChange={setSelectedAddons}
          card
          options={[
            {
              value: "backup",
              label: "Automated Backups",
              description: "Daily backups with 30-day retention",
              icon: <Shield className="w-6 h-6" />,
              recommended: true,
            },
            {
              value: "monitoring",
              label: "24/7 Monitoring",
              description: "Real-time performance monitoring",
              icon: <Zap className="w-6 h-6" />,
              badge: "New",
            },
            {
              value: "security",
              label: "Advanced Security",
              description: "DDoS protection and firewall",
              icon: <Lock className="w-6 h-6" />,
              badge: "Pro",
            },
            {
              value: "ssl",
              label: "SSL Certificate",
              description: "Free SSL certificate included",
              icon: <Check className="w-6 h-6" />,
            },
          ]}
        />
      </div>

      {/* Horizontal Layout */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Horizontal Layout
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Notification Preferences"
            direction="horizontal"
          >
            <Checkbox
              value="email"
              label="Email"
              icon={<Mail className="w-3 h-3" />}
            />
            <Checkbox
              value="push"
              label="Push"
              icon={<Bell className="w-3 h-3" />}
            />
            <Checkbox
              value="sms"
              label="SMS"
              icon={<MessageSquare className="w-3 h-3" />}
            />
          </CheckboxGroup>
        </div>
      </div>

      {/* Validation States */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Validation States
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            label="Accept Terms and Conditions"
            description="You must accept to continue"
            error="This field is required"
            variant="error"
          />
          <Checkbox
            label="Subscribe to Newsletter"
            description="Get weekly updates"
            helperText="You can unsubscribe at any time"
            defaultChecked
          />
        </div>
      </div>

      {/* Advanced Card Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Plan Features Grid
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Customize Your Plan"
            description="Select the features you need"
            card
            variant="accent"
          >
            <Checkbox
              value="storage"
              label="Extra Storage"
              description="Additional 100GB of storage space"
              icon={<Package className="w-5 h-5" />}
              badge="$5/mo"
            />
            <Checkbox
              value="compute"
              label="High Performance"
              description="Dedicated CPU and RAM resources"
              icon={<Cpu className="w-5 h-5" />}
              badge="$15/mo"
            />
            <Checkbox
              value="api"
              label="API Access"
              description="Full REST API with unlimited calls"
              icon={<Code className="w-5 h-5" />}
              badge="$10/mo"
              recommended
            />
            <Checkbox
              value="support"
              label="Premium Support"
              description="24/7 priority support with 1h response"
              icon={<Rocket className="w-5 h-5" />}
              badge="$20/mo"
            />
          </CheckboxGroup>
        </div>
      </div>

      {/* Standalone Checkboxes */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Standalone Checkboxes
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="flex gap-4 items-center flex-wrap">
            <Checkbox size="sm" />
            <Checkbox size="md" defaultChecked />
            <Checkbox size="lg" />
            <Checkbox size="sm" variant="success" defaultChecked />
            <Checkbox size="md" variant="warning" defaultChecked />
            <Checkbox size="lg" variant="error" defaultChecked />
            <Checkbox size="md" variant="accent" indeterminate />
          </div>
        </div>
      </div>

      {/* Current Selections Display */}
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Current Selections
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Features:</span>
            <span className="font-medium text-foreground">
              {selectedFeatures.length > 0
                ? selectedFeatures.join(", ")
                : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Services:</span>
            <span className="font-medium text-foreground">
              {selectedServices.length > 0
                ? selectedServices.join(", ")
                : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Add-ons:</span>
            <span className="font-medium text-foreground">
              {selectedAddons.length > 0 ? selectedAddons.join(", ") : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Items:</span>
            <span className="font-medium text-foreground">
              {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckboxExample;
