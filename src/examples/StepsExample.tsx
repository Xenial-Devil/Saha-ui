import { Steps, StepsItem } from "../components/Steps";
import { User, CreditCard, Check, Package, Truck, Home } from "lucide-react";

export const StepsExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Steps Component</h3>

      {/* Basic Horizontal Steps */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Horizontal Steps - Default
        </h4>
        <Steps defaultValue={2}>
          <StepsItem
            value={1}
            title="Account"
            description="Create your account"
          />
          <StepsItem
            value={2}
            title="Profile"
            description="Fill in your details"
          />
          <StepsItem
            value={3}
            title="Verification"
            description="Verify your email"
          />
          <StepsItem value={4} title="Complete" description="You're all set!" />
        </Steps>
      </div>

      {/* Steps with Icons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Steps with Icons
        </h4>
        <Steps defaultValue={3}>
          <StepsItem
            value={1}
            title="Cart"
            description="Review your items"
            icon={<Package className="w-5 h-5" />}
          />
          <StepsItem
            value={2}
            title="Shipping"
            description="Enter shipping details"
            icon={<Truck className="w-5 h-5" />}
          />
          <StepsItem
            value={3}
            title="Payment"
            description="Complete payment"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StepsItem
            value={4}
            title="Confirmation"
            description="Order confirmed"
            icon={<Check className="w-5 h-5" />}
          />
        </Steps>
      </div>

      {/* Vertical Steps */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Vertical Steps</h4>
        <Steps orientation="vertical" defaultValue={2}>
          <StepsItem
            value={1}
            title="Choose Plan"
            description="Select a subscription plan that works for you"
            status="completed"
          />
          <StepsItem
            value={2}
            title="Account Setup"
            description="Create your account and set preferences"
            status="current"
          >
            <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border">
              <p className="text-sm">Set up your account details here...</p>
            </div>
          </StepsItem>
          <StepsItem
            value={3}
            title="Payment"
            description="Enter payment information securely"
            status="pending"
          />
          <StepsItem
            value={4}
            title="Confirmation"
            description="Review and confirm your subscription"
            status="pending"
          />
        </Steps>
      </div>

      {/* Different Variants */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Default</p>
            <Steps variant="default" defaultValue={2}>
              <StepsItem value={1} title="Start" />
              <StepsItem value={2} title="Progress" />
              <StepsItem value={3} title="End" />
            </Steps>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Bordered</p>
            <Steps variant="bordered" defaultValue={1}>
              <StepsItem
                value={1}
                title="Design"
                description="Create mockups"
              />
              <StepsItem
                value={2}
                title="Develop"
                description="Build features"
              />
              <StepsItem value={3} title="Deploy" description="Go live" />
            </Steps>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Glass</p>
            <Steps variant="glass" defaultValue={2}>
              <StepsItem
                value={1}
                title="Personal Info"
                icon={<User className="w-4 h-4" />}
              />
              <StepsItem
                value={2}
                title="Address"
                icon={<Home className="w-4 h-4" />}
              />
              <StepsItem
                value={3}
                title="Payment"
                icon={<CreditCard className="w-4 h-4" />}
              />
            </Steps>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Minimal</p>
            <Steps variant="minimal" defaultValue={1}>
              <StepsItem value={1} title="Step 1" description="First step" />
              <StepsItem value={2} title="Step 2" description="Second step" />
              <StepsItem value={3} title="Step 3" description="Third step" />
            </Steps>
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Small</p>
            <Steps size="sm" defaultValue={1}>
              <StepsItem value={1} title="Step 1" />
              <StepsItem value={2} title="Step 2" />
              <StepsItem value={3} title="Step 3" />
            </Steps>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Medium (Default)
            </p>
            <Steps size="md" defaultValue={2}>
              <StepsItem value={1} title="Step 1" />
              <StepsItem value={2} title="Step 2" />
              <StepsItem value={3} title="Step 3" />
            </Steps>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Large</p>
            <Steps size="lg" defaultValue={1}>
              <StepsItem value={1} title="Step 1" description="First step" />
              <StepsItem value={2} title="Step 2" description="Second step" />
              <StepsItem value={3} title="Step 3" description="Final step" />
            </Steps>
          </div>
        </div>
      </div>

      {/* Clickable Steps */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Clickable Steps
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click on any step to navigate
        </p>
        <Steps
          defaultValue={2}
          clickable
          onValueChange={(value) => console.log("Step changed to:", value)}
        >
          <StepsItem value={1} title="Step 1" description="First step" />
          <StepsItem value={2} title="Step 2" description="Second step" />
          <StepsItem value={3} title="Step 3" description="Third step" />
          <StepsItem value={4} title="Step 4" description="Final step" />
        </Steps>
      </div>

      {/* Error State */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Error State</h4>
        <Steps defaultValue={2}>
          <StepsItem value={1} title="Completed" status="completed" />
          <StepsItem
            value={2}
            title="Error"
            status="error"
            description="Something went wrong"
          />
          <StepsItem value={3} title="Pending" status="pending" />
        </Steps>
      </div>
    </div>
  );
};
