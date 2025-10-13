import React from "react";
import { Radio, RadioGroup } from "../components/Radio";
import {
  Zap,
  Shield,
  Crown,
  Star,
  Rocket,
  Heart,
  Globe,
  Code,
  Cpu,
  Database,
  Cloud,
  Lock,
  Users,
  TrendingUp,
  Package,
  Palette,
} from "lucide-react";

export function RadioAdvancedExample() {
  const [selectedPlan, setSelectedPlan] = React.useState("pro");
  const [selectedColor, setSelectedColor] = React.useState("blue");
  const [selectedPayment, setSelectedPayment] = React.useState("credit");
  const [selectedServer, setSelectedServer] = React.useState("us-east");

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Advanced Radio Components
        </h2>
        <p className="text-muted-foreground mb-6">
          Explore advanced radio features including card layouts, icons, badges,
          images, and more.
        </p>
      </div>

      {/* Card Style Radio Buttons with Icons */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Pricing Plans (Card Style)
        </h3>
        <RadioGroup
          name="pricing"
          value={selectedPlan}
          onChange={setSelectedPlan}
          card
          label="Choose Your Plan"
          helperText="Select the plan that best fits your needs"
        >
          <Radio
            value="free"
            label="Free"
            description="Perfect for getting started. Includes basic features and 100 API calls per month."
            icon={<Package className="w-6 h-6" />}
            badge="Free"
          />
          <Radio
            value="pro"
            label="Professional"
            description="For growing businesses. Unlimited API calls, priority support, and advanced analytics."
            icon={<Rocket className="w-6 h-6" />}
            badge="Popular"
            recommended
          />
          <Radio
            value="enterprise"
            label="Enterprise"
            description="For large organizations. Custom solutions, dedicated support, and SLA guarantees."
            icon={<Crown className="w-6 h-6" />}
            badge="Custom"
          />
        </RadioGroup>
      </div>

      {/* Card Style with Options Array */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Payment Methods
        </h3>
        <RadioGroup
          name="payment"
          value={selectedPayment}
          onChange={setSelectedPayment}
          card
          label="Select Payment Method"
          options={[
            {
              value: "credit",
              label: "Credit Card",
              description:
                "Pay securely with your credit or debit card. Instant processing.",
              icon: <Shield className="w-6 h-6" />,
              recommended: true,
            },
            {
              value: "paypal",
              label: "PayPal",
              description:
                "Quick checkout with your PayPal account. No card details needed.",
              icon: <Globe className="w-6 h-6" />,
              badge: "Fast",
            },
            {
              value: "crypto",
              label: "Cryptocurrency",
              description:
                "Pay with Bitcoin, Ethereum, or other cryptocurrencies.",
              icon: <Lock className="w-6 h-6" />,
              badge: "New",
            },
          ]}
        />
      </div>

      {/* Regular Radio with Icons */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Server Location (With Icons)
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="server"
            value={selectedServer}
            onChange={setSelectedServer}
            label="Choose Server Region"
            helperText="Select the region closest to your users for best performance"
          >
            <Radio
              value="us-east"
              label="US East (Virginia)"
              description="Low latency for North America"
              icon={<Database className="w-5 h-5" />}
              badge="Recommended"
            />
            <Radio
              value="us-west"
              label="US West (Oregon)"
              description="Optimized for West Coast"
              icon={<Cloud className="w-5 h-5" />}
            />
            <Radio
              value="eu-central"
              label="EU Central (Frankfurt)"
              description="Best for European users"
              icon={<Globe className="w-5 h-5" />}
            />
            <Radio
              value="asia-pacific"
              label="Asia Pacific (Singapore)"
              description="Fastest for Asian markets"
              icon={<Zap className="w-5 h-5" />}
            />
          </RadioGroup>
        </div>
      </div>

      {/* Color Selection with Custom Styling */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Theme Colors (Horizontal Card Layout)
        </h3>
        <RadioGroup
          name="colors"
          value={selectedColor}
          onChange={setSelectedColor}
          card
          direction="horizontal"
          label="Select Theme Color"
          helperText="This will be applied across your entire dashboard"
        >
          <Radio
            value="blue"
            label="Ocean Blue"
            description="Calm and professional"
            icon={<Palette className="w-6 h-6 text-blue-500" />}
          />
          <Radio
            value="purple"
            label="Royal Purple"
            description="Creative and modern"
            icon={<Palette className="w-6 h-6 text-purple-500" />}
            recommended
          />
          <Radio
            value="green"
            label="Nature Green"
            description="Fresh and eco-friendly"
            icon={<Palette className="w-6 h-6 text-green-500" />}
          />
          <Radio
            value="red"
            label="Passion Red"
            description="Bold and energetic"
            icon={<Palette className="w-6 h-6 text-red-500" />}
          />
        </RadioGroup>
      </div>

      {/* Features Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Feature Tiers
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="features"
            variant="accent"
            size="lg"
            label="Select Feature Set"
          >
            <Radio
              value="basic"
              label="Basic Features"
              description="Essential tools for small projects"
              icon={<Code className="w-5 h-5" />}
            />
            <Radio
              value="advanced"
              label="Advanced Features"
              description="Enhanced capabilities for growing teams"
              icon={<Cpu className="w-5 h-5" />}
              badge="Popular"
            />
            <Radio
              value="premium"
              label="Premium Features"
              description="Full suite with all advanced tools"
              icon={<Star className="w-5 h-5" />}
              badge="🔥 Hot"
            />
          </RadioGroup>
        </div>
      </div>

      {/* Different Variants */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Card Variants Showcase
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="variant-primary" variant="primary" card>
              <Radio
                value="opt1"
                label="Primary Variant"
                description="Default primary color scheme"
                icon={<Heart className="w-5 h-5" />}
              />
              <Radio
                value="opt2"
                label="With Badge"
                description="Highlighted option"
                icon={<Star className="w-5 h-5" />}
                badge="New"
              />
            </RadioGroup>
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="variant-success" variant="success" card>
              <Radio
                value="opt1"
                label="Success Variant"
                description="Green color scheme"
                icon={<Shield className="w-5 h-5" />}
              />
              <Radio
                value="opt2"
                label="Recommended"
                description="Best choice"
                icon={<TrendingUp className="w-5 h-5" />}
                recommended
              />
            </RadioGroup>
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="variant-warning" variant="warning" card>
              <Radio
                value="opt1"
                label="Warning Variant"
                description="Attention-grabbing style"
                icon={<Zap className="w-5 h-5" />}
              />
              <Radio
                value="opt2"
                label="Important"
                description="Requires attention"
                icon={<Crown className="w-5 h-5" />}
                badge="⚠️"
              />
            </RadioGroup>
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="variant-secondary" variant="secondary" card>
              <Radio
                value="opt1"
                label="Secondary Variant"
                description="Subtle and elegant"
                icon={<Users className="w-5 h-5" />}
              />
              <Radio
                value="opt2"
                label="Alternative"
                description="Another option"
                icon={<Globe className="w-5 h-5" />}
                badge="Alt"
              />
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Size Variations with Cards */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Size Variations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="size-sm" size="sm" card label="Small">
              <Radio
                value="s1"
                label="Small Size"
                description="Compact option"
                icon={<Code className="w-4 h-4" />}
              />
              <Radio
                value="s2"
                label="Another"
                description="Second option"
                icon={<Cpu className="w-4 h-4" />}
              />
            </RadioGroup>
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="size-md" size="md" card label="Medium">
              <Radio
                value="m1"
                label="Medium Size"
                description="Standard option"
                icon={<Shield className="w-5 h-5" />}
                defaultChecked
              />
              <Radio
                value="m2"
                label="Another"
                description="Second option"
                icon={<Lock className="w-5 h-5" />}
              />
            </RadioGroup>
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50">
            <RadioGroup name="size-lg" size="lg" card label="Large">
              <Radio
                value="l1"
                label="Large Size"
                description="Prominent option"
                icon={<Star className="w-6 h-6" />}
              />
              <Radio
                value="l2"
                label="Another"
                description="Second option"
                icon={<Crown className="w-6 h-6" />}
              />
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Mixed Standard and Card */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Standard with Icons & Badges
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="mixed"
            variant="accent"
            label="Development Environment"
            helperText="Choose your preferred setup"
          >
            <Radio
              value="local"
              label="Local Development"
              description="Run on your machine with full control"
              icon={<Cpu className="w-5 h-5" />}
              badge="Fast"
            />
            <Radio
              value="staging"
              label="Staging Server"
              description="Test in a production-like environment"
              icon={<Cloud className="w-5 h-5" />}
              badge="Recommended"
            />
            <Radio
              value="production"
              label="Production"
              description="Deploy directly to live environment"
              icon={<Rocket className="w-5 h-5" />}
              badge="⚠️ Caution"
            />
          </RadioGroup>
        </div>
      </div>

      {/* Current Selections Display */}
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Current Selections
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Pricing Plan:</span>
            <span className="font-medium text-foreground">
              {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="font-medium text-foreground">
              {selectedPayment.charAt(0).toUpperCase() +
                selectedPayment.slice(1)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Server Location:</span>
            <span className="font-medium text-foreground">
              {selectedServer.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Theme Color:</span>
            <span className="font-medium text-foreground">
              {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioAdvancedExample;
