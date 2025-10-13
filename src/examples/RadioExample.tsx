import React from "react";
import { Radio, RadioGroup } from "../components/Radio";

export function RadioExample() {
  const [selectedPlan, setSelectedPlan] = React.useState("pro");
  const [selectedColor, setSelectedColor] = React.useState("blue");
  const [selectedSize, setSelectedSize] = React.useState("md");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Radio Button
        </h2>
        <p className="text-text-secondary mb-6">
          Modern radio buttons with beautiful animations and multiple variants.
        </p>
      </div>

      {/* Basic Radio */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Basic Radio Buttons
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Radio label="Option 1" value="option1" name="basic" />
          <Radio label="Option 2" value="option2" name="basic" defaultChecked />
          <Radio label="Option 3" value="option3" name="basic" />
          <Radio
            label="Disabled Option"
            value="option4"
            name="basic"
            disabled
          />
        </div>
      </div>

      {/* Radio with Descriptions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Radio with Descriptions
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Radio
            label="Starter Plan"
            description="Perfect for individuals and small teams"
            value="starter"
            name="plan-desc"
          />
          <Radio
            label="Pro Plan"
            description="Advanced features for growing businesses"
            value="pro"
            name="plan-desc"
            defaultChecked
          />
          <Radio
            label="Enterprise"
            description="Custom solutions for large organizations"
            value="enterprise"
            name="plan-desc"
          />
        </div>
      </div>

      {/* RadioGroup - Controlled */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          RadioGroup (Controlled)
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="plan"
            label="Choose Your Plan"
            value={selectedPlan}
            onChange={setSelectedPlan}
            options={[
              {
                label: "Free",
                value: "free",
                description: "$0/month - Basic features",
              },
              {
                label: "Pro",
                value: "pro",
                description: "$29/month - All features included",
              },
              {
                label: "Enterprise",
                value: "enterprise",
                description: "Custom pricing - Unlimited everything",
              },
            ]}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Selected:{" "}
            <span className="font-semibold text-primary">{selectedPlan}</span>
          </p>
        </div>
      </div>

      {/* Color Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Color Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { variant: "default" as const, label: "Default" },
            { variant: "primary" as const, label: "Primary" },
            { variant: "secondary" as const, label: "Secondary" },
            { variant: "accent" as const, label: "Accent" },
            { variant: "success" as const, label: "Success" },
            { variant: "warning" as const, label: "Warning" },
            { variant: "error" as const, label: "Error" },
          ].map(({ variant, label }) => (
            <div
              key={variant}
              className="glass p-4 rounded-xl border border-border/50"
            >
              <p className="text-sm font-medium mb-3 text-foreground">
                {label}
              </p>
              <div className="space-y-2">
                <Radio
                  variant={variant}
                  label="Option 1"
                  value={`${variant}-1`}
                  name={variant}
                  defaultChecked
                />
                <Radio
                  variant={variant}
                  label="Option 2"
                  value={`${variant}-2`}
                  name={variant}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Size Variants
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="size"
            label="Select Size"
            value={selectedSize}
            onChange={setSelectedSize}
            direction="horizontal"
          >
            <Radio size="sm" label="Small" value="sm" />
            <Radio size="md" label="Medium" value="md" />
            <Radio size="lg" label="Large" value="lg" />
          </RadioGroup>
        </div>
      </div>

      {/* Horizontal Layout */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Horizontal Layout
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="color"
            label="Choose a Color"
            value={selectedColor}
            onChange={setSelectedColor}
            direction="horizontal"
            variant="accent"
            options={[
              { label: "Blue", value: "blue" },
              { label: "Green", value: "green" },
              { label: "Red", value: "red" },
              { label: "Purple", value: "purple" },
            ]}
          />
        </div>
      </div>

      {/* With Error */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          With Validation
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <RadioGroup
            name="terms"
            label="Terms and Conditions"
            error="You must accept the terms to continue"
            variant="error"
          >
            <Radio label="I accept the terms and conditions" value="accept" />
            <Radio label="I do not accept" value="decline" />
          </RadioGroup>
        </div>
      </div>

      {/* Label Position */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Label Position
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass p-6 rounded-xl border border-border/50">
            <p className="text-sm font-medium mb-4 text-foreground">
              Label on Right (Default)
            </p>
            <div className="space-y-3">
              <Radio
                label="Option 1"
                value="right-1"
                name="label-right"
                labelPosition="right"
              />
              <Radio
                label="Option 2"
                value="right-2"
                name="label-right"
                labelPosition="right"
              />
            </div>
          </div>

          <div className="glass p-6 rounded-xl border border-border/50">
            <p className="text-sm font-medium mb-4 text-foreground">
              Label on Left
            </p>
            <div className="space-y-3">
              <Radio
                label="Option 1"
                value="left-1"
                name="label-left"
                labelPosition="left"
              />
              <Radio
                label="Option 2"
                value="left-2"
                name="label-left"
                labelPosition="left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
