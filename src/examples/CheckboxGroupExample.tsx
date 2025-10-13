import { useState } from "react";
import { CheckboxGroup, Checkbox } from "../components/Checkbox";
import { Star, Heart, Crown, Zap, Shield, Award } from "lucide-react";

export const CheckboxGroupExample = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "notifications",
  ]);
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          CheckboxGroup Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Advanced checkbox group with multiple layouts, variants, and features.
        </p>
      </div>

      {/* Basic Vertical Group */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Basic Vertical Group
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple vertical checkbox group with options array
          </p>
        </div>
        <CheckboxGroup
          label="Select your interests"
          description="Choose one or more topics you're interested in"
          value={selectedInterests}
          onChange={setSelectedInterests}
          options={[
            { value: "coding", label: "Coding" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
            { value: "writing", label: "Writing" },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {selectedInterests.join(", ") || "None"}
        </p>
      </section>

      {/* Horizontal Group */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Horizontal Layout
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Checkbox group arranged horizontally
          </p>
        </div>
        <CheckboxGroup
          label="Account Settings"
          direction="horizontal"
          value={selectedFeatures}
          onChange={setSelectedFeatures}
          options={[
            {
              value: "notifications",
              label: "Email Notifications",
              description: "Receive updates via email",
            },
            {
              value: "newsletter",
              label: "Newsletter",
              description: "Weekly digest of content",
            },
            {
              value: "marketing",
              label: "Marketing",
              description: "Promotional offers",
            },
          ]}
        />
      </section>

      {/* Card Layout */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Card Layout with Icons
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Beautiful card layout with custom icons and badges
          </p>
        </div>
        <CheckboxGroup
          label="Choose Your Plan Features"
          description="Select the features you want to include"
          card
          value={selectedPlan}
          onChange={setSelectedPlan}
          variant="primary"
          options={[
            {
              value: "basic",
              label: "Basic Support",
              description: "Email support within 48 hours",
              icon: <Star className="w-5 h-5" />,
              badge: "Free",
            },
            {
              value: "priority",
              label: "Priority Support",
              description: "24/7 chat and email support",
              icon: <Zap className="w-5 h-5" />,
              badge: "$9/mo",
              recommended: true,
            },
            {
              value: "premium",
              label: "Premium Features",
              description: "Advanced analytics and reporting",
              icon: <Crown className="w-5 h-5" />,
              badge: "$29/mo",
            },
            {
              value: "security",
              label: "Enhanced Security",
              description: "Two-factor auth and encryption",
              icon: <Shield className="w-5 h-5" />,
              badge: "$19/mo",
            },
            {
              value: "api",
              label: "API Access",
              description: "Full REST API integration",
              icon: <Award className="w-5 h-5" />,
              badge: "$39/mo",
            },
            {
              value: "custom",
              label: "Custom Integration",
              description: "Dedicated support engineer",
              icon: <Heart className="w-5 h-5" />,
              badge: "$99/mo",
            },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {selectedPlan.join(", ") || "None"}
        </p>
      </section>

      {/* Different Variants */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Variants
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Checkbox groups with different color variants
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxGroup
            label="Primary Variant"
            variant="primary"
            options={[
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
              { value: "opt3", label: "Option 3" },
            ]}
          />
          <CheckboxGroup
            label="Success Variant"
            variant="success"
            options={[
              { value: "opt4", label: "Option 1" },
              { value: "opt5", label: "Option 2" },
              { value: "opt6", label: "Option 3" },
            ]}
          />
          <CheckboxGroup
            label="Warning Variant"
            variant="warning"
            options={[
              { value: "opt7", label: "Option 1" },
              { value: "opt8", label: "Option 2" },
              { value: "opt9", label: "Option 3" },
            ]}
          />
          <CheckboxGroup
            label="Error Variant"
            variant="error"
            options={[
              { value: "opt10", label: "Option 1" },
              { value: "opt11", label: "Option 2" },
              { value: "opt12", label: "Option 3" },
            ]}
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Sizes
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Small, medium, and large checkbox groups
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CheckboxGroup
            label="Small Size"
            size="sm"
            options={[
              { value: "small1", label: "Small Option 1" },
              { value: "small2", label: "Small Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Medium Size"
            size="md"
            options={[
              { value: "medium1", label: "Medium Option 1" },
              { value: "medium2", label: "Medium Option 2" },
            ]}
          />
          <CheckboxGroup
            label="Large Size"
            size="lg"
            options={[
              { value: "large1", label: "Large Option 1" },
              { value: "large2", label: "Large Option 2" },
            ]}
          />
        </div>
      </section>

      {/* With Children (Custom Checkboxes) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Custom Children
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Using custom Checkbox components as children
          </p>
        </div>
        <CheckboxGroup
          label="Programming Skills"
          description="Select your skill level in different technologies"
          value={selectedSkills}
          onChange={setSelectedSkills}
          direction="vertical"
        >
          <Checkbox
            value="react"
            label="React"
            description="Component-based UI library"
            icon={<Star className="w-4 h-4" />}
            badge="Expert"
          />
          <Checkbox
            value="typescript"
            label="TypeScript"
            description="Typed superset of JavaScript"
            icon={<Shield className="w-4 h-4" />}
            badge="Advanced"
          />
          <Checkbox
            value="node"
            label="Node.js"
            description="JavaScript runtime environment"
            icon={<Zap className="w-4 h-4" />}
            badge="Intermediate"
          />
        </CheckboxGroup>
        <p className="text-sm text-muted-foreground">
          Selected Skills: {selectedSkills.join(", ") || "None"}
        </p>
      </section>

      {/* With Validation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Validation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Checkbox group with error and helper text
          </p>
        </div>
        <CheckboxGroup
          label="Terms and Conditions"
          error={
            selectedPlan.length === 0
              ? "Please select at least one option"
              : undefined
          }
          helperText="You must agree to continue"
          options={[
            {
              value: "terms",
              label: "I agree to the Terms of Service",
              description: "Read our terms and conditions",
            },
            {
              value: "privacy",
              label: "I agree to the Privacy Policy",
              description: "Review how we handle your data",
            },
            {
              value: "marketing",
              label: "I want to receive marketing emails",
              description: "Optional promotional content",
            },
          ]}
        />
      </section>

      {/* Disabled Options */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Disabled Options
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Some options can be disabled
          </p>
        </div>
        <CheckboxGroup
          label="Feature Access"
          description="Based on your current plan"
          options={[
            {
              value: "basic-features",
              label: "Basic Features",
              description: "Available on all plans",
            },
            {
              value: "advanced-features",
              label: "Advanced Features",
              description: "Premium plan required",
              disabled: true,
              badge: "Premium",
            },
            {
              value: "enterprise-features",
              label: "Enterprise Features",
              description: "Enterprise plan required",
              disabled: true,
              badge: "Enterprise",
            },
          ]}
        />
      </section>

      {/* Card Layout with Images */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Card Layout with Images
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Beautiful card layout with gradient backgrounds
          </p>
        </div>
        <CheckboxGroup
          label="Select Your Favorite Themes"
          description="Choose one or more color themes"
          card
          options={[
            {
              value: "ocean",
              label: "Ocean Blue",
              description: "Calm and professional",
              image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            },
            {
              value: "sunset",
              label: "Sunset Orange",
              description: "Warm and energetic",
              image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              recommended: true,
            },
            {
              value: "forest",
              label: "Forest Green",
              description: "Natural and fresh",
              image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            },
          ]}
        />
      </section>

      {/* Compact Card Grid */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Compact Card Grid
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Responsive grid layout with multiple cards
          </p>
        </div>
        <CheckboxGroup
          label="Content Preferences"
          description="Choose the types of content you want to see"
          card
          size="sm"
          variant="accent"
          options={[
            {
              value: "tutorials",
              label: "Tutorials",
              icon: <Star className="w-4 h-4" />,
            },
            {
              value: "articles",
              label: "Articles",
              icon: <Heart className="w-4 h-4" />,
            },
            {
              value: "videos",
              label: "Videos",
              icon: <Crown className="w-4 h-4" />,
            },
            {
              value: "podcasts",
              label: "Podcasts",
              icon: <Zap className="w-4 h-4" />,
            },
            {
              value: "courses",
              label: "Courses",
              icon: <Shield className="w-4 h-4" />,
            },
            {
              value: "ebooks",
              label: "E-books",
              icon: <Award className="w-4 h-4" />,
            },
          ]}
        />
      </section>
    </div>
  );
};

export default CheckboxGroupExample;
