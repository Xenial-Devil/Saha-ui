import Steps from "../components/Steps";
import { User, CreditCard, Check, Package, Truck, Home } from "lucide-react";

export const StepsExample = () => {
  const basicSteps = [
    {
      id: 1,
      title: "Account",
      description: "Create your account",
    },
    {
      id: 2,
      title: "Profile",
      description: "Fill in your details",
    },
    {
      id: 3,
      title: "Verification",
      description: "Verify your email",
    },
    {
      id: 4,
      title: "Complete",
      description: "You're all set!",
    },
  ];

  const checkoutSteps = [
    {
      id: 1,
      title: "Cart",
      description: "Review your items",
      icon: <Package className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Shipping",
      description: "Enter shipping details",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Payment",
      description: "Complete payment",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Confirmation",
      description: "Order confirmed",
      icon: <Check className="w-5 h-5" />,
    },
  ];

  const verticalSteps = [
    {
      id: 1,
      title: "Choose Plan",
      description: "Select a subscription plan that works for you",
      status: "completed" as const,
    },
    {
      id: 2,
      title: "Account Setup",
      description: "Create your account and set preferences",
      status: "current" as const,
      content: (
        <div className="p-4 bg-background/50 rounded-lg border border-border">
          <p className="text-sm">Set up your account details here...</p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Payment",
      description: "Enter payment information securely",
      status: "pending" as const,
    },
    {
      id: 4,
      title: "Start Using",
      description: "Access all features immediately",
      status: "pending" as const,
    },
  ];

  const onboardingSteps = [
    {
      id: 1,
      title: "Welcome",
      description: "Get started with the basics",
      icon: <Home className="w-5 h-5" />,
      status: "completed" as const,
    },
    {
      id: 2,
      title: "Profile",
      description: "Tell us about yourself",
      icon: <User className="w-5 h-5" />,
      status: "completed" as const,
    },
    {
      id: 3,
      title: "Preferences",
      description: "Customize your experience",
      status: "error" as const,
    },
    {
      id: 4,
      title: "Done",
      description: "You're ready to go!",
      status: "pending" as const,
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Steps Component</h3>

      {/* Basic Horizontal Steps */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Basic Horizontal Steps
        </h4>
        <Steps steps={basicSteps} current={1} />
      </div>

      {/* With Custom Icons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Checkout Flow with Icons
        </h4>
        <Steps steps={checkoutSteps} current={2} variant="bordered" />
      </div>

      {/* Glass Variant */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Glass Variant - Large Size
        </h4>
        <Steps
          steps={basicSteps}
          current={2}
          variant="glass"
          size="lg"
          clickable
          onStepClick={(index) => console.log("Clicked step:", index)}
        />
      </div>

      {/* Vertical Orientation */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Vertical Steps with Content
        </h4>
        <div className="max-w-2xl">
          <Steps
            steps={verticalSteps}
            orientation="vertical"
            variant="bordered"
          />
        </div>
      </div>

      {/* Small Size */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Small Size - Minimal Variant
        </h4>
        <Steps steps={basicSteps} current={0} size="sm" variant="minimal" />
      </div>

      {/* With Error State */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          With Error State
        </h4>
        <Steps steps={onboardingSteps} variant="glass" size="md" />
      </div>

      {/* Without Descriptions */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Without Descriptions
        </h4>
        <Steps
          steps={basicSteps}
          current={3}
          showDescription={false}
          variant="bordered"
        />
      </div>

      {/* Without Numbers (Dots) */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Without Numbers (Dots)
        </h4>
        <Steps steps={basicSteps} current={1} showNumbers={false} />
      </div>

      {/* Clickable Steps */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Clickable Interactive Steps
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click on any step to navigate
        </p>
        <Steps
          steps={checkoutSteps}
          current={1}
          clickable
          variant="glass"
          onStepClick={(index) =>
            alert(
              `Navigating to step ${index + 1}: ${checkoutSteps[index].title}`
            )
          }
        />
      </div>

      {/* Vertical with Icons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Vertical with Custom Icons
        </h4>
        <div className="max-w-2xl">
          <Steps
            steps={checkoutSteps}
            current={1}
            orientation="vertical"
            variant="glass"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
};
