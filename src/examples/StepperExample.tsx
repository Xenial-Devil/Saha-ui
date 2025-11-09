"use client";

import { useState } from "react";
import { Stepper } from "../components/Stepper";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import {
  User,
  CreditCard,
  CheckCircle,
  ShoppingCart,
  Truck,
  Home,
  FileText,
  Bell,
  Star,
  EyeOff,
} from "lucide-react";

export default function StepperExample() {
  const [activeStep1, setActiveStep1] = useState(0);
  const [activeStep2, setActiveStep2] = useState(0);
  const [activeStep3, setActiveStep3] = useState(1);
  const [activeStep4, setActiveStep4] = useState(0);

  const basicSteps = [
    { label: "Account Info" },
    { label: "Personal Details" },
    { label: "Confirmation" },
  ];

  const checkoutSteps = [
    {
      label: "Cart",
      description: "Review your items",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      label: "Shipping",
      description: "Enter delivery address",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      label: "Payment",
      description: "Complete your purchase",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      label: "Confirmation",
      description: "Order complete",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const formSteps = [
    {
      label: "Basic Information",
      description: "Name, email, and phone",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Address",
      description: "Shipping and billing address",
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: "Payment",
      description: "Payment method",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      label: "Review",
      description: "Review and submit",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const setupSteps = [
    { label: "Welcome" },
    { label: "Configuration" },
    { label: "Integration" },
    { label: "Complete" },
  ];

  const handleNext1 = () => {
    if (activeStep1 < basicSteps.length - 1) {
      setActiveStep1(activeStep1 + 1);
    }
  };

  const handleBack1 = () => {
    if (activeStep1 > 0) {
      setActiveStep1(activeStep1 - 1);
    }
  };

  const handleNext2 = () => {
    if (activeStep2 < checkoutSteps.length - 1) {
      setActiveStep2(activeStep2 + 1);
    }
  };

  const handleBack2 = () => {
    if (activeStep2 > 0) {
      setActiveStep2(activeStep2 - 1);
    }
  };

  const handleReset = () => {
    setActiveStep1(0);
    setActiveStep2(0);
    setActiveStep3(0);
    setActiveStep4(0);
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Stepper</h2>
        <p className="text-muted-foreground mb-6">
          A multi-step progress indicator for wizards and multi-step forms.
          Guide users through sequential processes with clear visual feedback.
        </p>
      </div>

      {/* Basic Horizontal Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Horizontal Stepper</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Stepper
              steps={basicSteps}
              activeStep={activeStep1}
              orientation="horizontal"
            />

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleBack1}
                disabled={activeStep1 === 0}
              >
                Back
              </Button>
              <Button
                onClick={handleNext1}
                disabled={activeStep1 === basicSteps.length - 1}
              >
                {activeStep1 === basicSteps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>

            {activeStep1 === basicSteps.length - 1 && (
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-success font-semibold">
                  All steps completed!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* With Icons and Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>With Icons and Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Stepper
              steps={checkoutSteps}
              activeStep={activeStep2}
              orientation="horizontal"
            />

            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold mb-2">
                Step {activeStep2 + 1}: {checkoutSteps[activeStep2].label}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                {checkoutSteps[activeStep2].description}
              </p>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack2}
                  disabled={activeStep2 === 0}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext2}
                  disabled={activeStep2 === checkoutSteps.length - 1}
                >
                  {activeStep2 === checkoutSteps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>

            {activeStep2 === checkoutSteps.length - 1 && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vertical Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Vertical Stepper</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            steps={formSteps}
            activeStep={activeStep3}
            orientation="vertical"
          />
        </CardContent>
      </Card>

      {/* Different Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-medium">Default</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                variant="default"
                orientation="horizontal"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Outlined</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                variant="outlined"
                orientation="horizontal"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Filled</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                variant="filled"
                orientation="horizontal"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error State */}
      <Card>
        <CardHeader>
          <CardTitle>With Error State</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            steps={[
              { label: "Account", status: "complete" },
              { label: "Verification", status: "error" },
              { label: "Complete", status: "inactive" },
            ]}
            activeStep={1}
            orientation="horizontal"
            error
          />
          <p className="text-sm text-destructive mt-4">
            Error: Please verify your email address before continuing.
          </p>
        </CardContent>
      </Card>

      {/* Optional Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Optional Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            steps={[
              { label: "Required Info" },
              { label: "Additional Details", optional: true },
              { label: "Review" },
            ]}
            activeStep={1}
            orientation="horizontal"
          />
        </CardContent>
      </Card>

      {/* Interactive (Clickable Steps) */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive (Clickable Steps)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Stepper
              steps={setupSteps}
              activeStep={activeStep4}
              orientation="horizontal"
              interactive
              onStepClick={(index) => setActiveStep4(index)}
            />
            <p className="text-sm text-muted-foreground">
              Click on any step to navigate directly to it.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Completed State */}
      <Card>
        <CardHeader>
          <CardTitle>All Steps Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper
            steps={setupSteps.map((step) => ({
              ...step,
              status: "complete" as const,
            }))}
            activeStep={setupSteps.length}
            orientation="horizontal"
          />
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
            <h3 className="font-semibold text-success mb-1">Setup Complete!</h3>
            <p className="text-sm text-muted-foreground">
              All steps have been successfully completed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Different Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Color Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-medium">Primary (Default)</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                color="primary"
                orientation="horizontal"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Secondary</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                color="secondary"
                orientation="horizontal"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Success</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                color="success"
                orientation="horizontal"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Error</p>
              <Stepper
                steps={basicSteps}
                activeStep={1}
                color="error"
                orientation="horizontal"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Example - Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Multi-Step Form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Stepper
              steps={[
                {
                  label: "Choose Preferences",
                  description: "Select notification types",
                  icon: <Bell className="w-5 h-5" />,
                },
                {
                  label: "Set Priorities",
                  description: "Mark important notifications",
                  icon: <Star className="w-5 h-5" />,
                },
                {
                  label: "Privacy Settings",
                  description: "Control visibility",
                  icon: <EyeOff className="w-5 h-5" />,
                },
                {
                  label: "Complete",
                  description: "Save your settings",
                  icon: <CheckCircle className="w-5 h-5" />,
                },
              ]}
              activeStep={activeStep3}
              orientation="horizontal"
              interactive
              onStepClick={(index) => setActiveStep3(index)}
            />

            <div className="p-6 border rounded-lg">
              <h4 className="font-semibold mb-4">Step Content</h4>
              {activeStep3 === 0 && (
                <p className="text-sm text-muted-foreground">
                  Choose which types of notifications you'd like to receive...
                </p>
              )}
              {activeStep3 === 1 && (
                <p className="text-sm text-muted-foreground">
                  Mark which notifications are most important to you...
                </p>
              )}
              {activeStep3 === 2 && (
                <p className="text-sm text-muted-foreground">
                  Control who can see your notification settings...
                </p>
              )}
              {activeStep3 === 3 && (
                <p className="text-sm text-muted-foreground">
                  Review and save your notification preferences.
                </p>
              )}

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep3(Math.max(0, activeStep3 - 1))}
                  disabled={activeStep3 === 0}
                >
                  Back
                </Button>
                <Button
                  onClick={() => setActiveStep3(Math.min(3, activeStep3 + 1))}
                  disabled={activeStep3 === 3}
                >
                  {activeStep3 === 3 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { Stepper } from 'saha-ui';

// Basic usage
const [activeStep, setActiveStep] = useState(0);

const steps = [
  { label: 'Account' },
  { label: 'Details' },
  { label: 'Confirmation' }
];

<Stepper
  steps={steps}
  activeStep={activeStep}
  orientation="horizontal"
/>

// With icons and descriptions
<Stepper
  steps={[
    {
      label: 'Shipping',
      description: 'Enter address',
      icon: <TruckIcon />
    },
    {
      label: 'Payment',
      description: 'Complete purchase',
      icon: <CardIcon />
    }
  ]}
  activeStep={activeStep}
/>

// Vertical orientation
<Stepper
  steps={steps}
  activeStep={activeStep}
  orientation="vertical"
/>

// With error state
<Stepper
  steps={steps}
  activeStep={1}
  error
/>

// Interactive (clickable steps)
<Stepper
  steps={steps}
  activeStep={activeStep}
  interactive
  onStepClick={(index) => setActiveStep(index)}
/>

// Different variants
<Stepper
  steps={steps}
  activeStep={activeStep}
  variant="outlined"
/>

// Different colors
<Stepper
  steps={steps}
  activeStep={activeStep}
  color="success"
/>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export { StepperExample };
