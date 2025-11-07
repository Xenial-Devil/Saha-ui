"use client";

import { useState } from "react";
import { Result } from "../components/Result";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import {
  Home,
  RefreshCw,
  Mail,
  ArrowLeft,
  LogIn,
  Search,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function ResultExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Result</h2>
        <p className="text-muted-foreground mb-6">
          Display feedback pages for user actions and system states. Perfect for
          success confirmations, error pages, and status displays.
        </p>
      </div>

      {/* Success Results */}
      <Card>
        <CardHeader>
          <CardTitle>Success States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Result
              status="success"
              title="Payment Successful!"
              subTitle="Your order has been placed successfully. Order #12345"
              extra={
                <div className="flex gap-2">
                  <Button onClick={() => console.log("Go to orders")}>
                    View Order
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => console.log("Go home")}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              }
            />

            <div className="border-t pt-8">
              <Result
                status="success"
                title="Registration Complete!"
                subTitle="Welcome to our platform. Your account has been created successfully."
                extra={<Button size="lg">Get Started</Button>}
              />
            </div>

            <div className="border-t pt-8">
              <Result
                status="success"
                title="Email Verified"
                subTitle="Your email address has been verified. You can now access all features."
                extra={
                  <div className="flex gap-2">
                    <Button>Continue to Dashboard</Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Results */}
      <Card>
        <CardHeader>
          <CardTitle>Error States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Result
              status="error"
              title="Payment Failed"
              subTitle="We couldn't process your payment. Please check your payment details and try again."
              extra={
                <div className="flex gap-2">
                  <Button
                    variant="error"
                    onClick={handleRetry}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Get Help
                  </Button>
                </div>
              }
            />

            <div className="border-t pt-8">
              <Result
                status="error"
                title="Submission Error"
                subTitle="Unable to submit your form. Please check your connection and try again."
                extra={
                  <Button variant="error">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Submission
                  </Button>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Results */}
      <Card>
        <CardHeader>
          <CardTitle>Info States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Result
              status="info"
              title="Verification Email Sent"
              subTitle="We've sent a verification link to your email address. Please check your inbox."
              extra={
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Open Email
                  </Button>
                  <Button variant="ghost">Resend Email</Button>
                </div>
              }
            />

            <div className="border-t pt-8">
              <Result
                status="info"
                title="Account Under Review"
                subTitle="Your account is currently being reviewed. This usually takes 24-48 hours."
                extra={<Button variant="outline">Back to Dashboard</Button>}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning Results */}
      <Card>
        <CardHeader>
          <CardTitle>Warning States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Result
              status="warning"
              title="Session Expiring Soon"
              subTitle="Your session will expire in 5 minutes. Please save your work."
              extra={
                <div className="flex gap-2">
                  <Button variant="warning">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Extend Session
                  </Button>
                  <Button variant="outline">Save & Exit</Button>
                </div>
              }
            />

            <div className="border-t pt-8">
              <Result
                status="warning"
                title="Storage Almost Full"
                subTitle="You're using 95% of your storage space. Consider upgrading your plan."
                extra={
                  <div className="flex gap-2">
                    <Button variant="warning">Upgrade Plan</Button>
                    <Button variant="outline">Manage Files</Button>
                  </div>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HTTP Error Pages */}
      <Card>
        <CardHeader>
          <CardTitle>HTTP Error Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Result
              status="404"
              title="404 - Page Not Found"
              subTitle="Sorry, the page you're looking for doesn't exist or has been moved."
              extra={
                <div className="flex gap-2">
                  <Button>
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                  <Button variant="ghost">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              }
            />

            <div className="border-t pt-8">
              <Result
                status="403"
                title="403 - Access Denied"
                subTitle="You don't have permission to access this page. Please contact your administrator."
                extra={
                  <div className="flex gap-2">
                    <Button>
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                    <Button variant="outline">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </div>
                }
              />
            </div>

            <div className="border-t pt-8">
              <Result
                status="500"
                title="500 - Server Error"
                subTitle="Something went wrong on our end. We're working to fix it. Please try again later."
                extra={
                  <div className="flex gap-2">
                    <Button onClick={handleRetry}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                    <Button variant="outline">
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                    <Button variant="ghost">Report Issue</Button>
                  </div>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Minimal Results */}
      <Card>
        <CardHeader>
          <CardTitle>Minimal Style (No Extra Actions)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <Result
              status="success"
              title="Changes Saved"
              subTitle="Your settings have been updated successfully."
            />

            <div className="border-t pt-8">
              <Result
                status="info"
                title="Processing Request"
                subTitle="Your request is being processed. This may take a few moments."
              />
            </div>

            <div className="border-t pt-8">
              <Result
                status="warning"
                title="Incomplete Profile"
                subTitle="Please complete your profile to access all features."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Example: Form Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Contact Form Success</CardTitle>
        </CardHeader>
        <CardContent>
          <Result
            status="success"
            title="Message Sent Successfully!"
            subTitle="Thank you for contacting us. We'll get back to you within 24 hours."
            extra={
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  <Button>
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                  <Button variant="outline">Send Another Message</Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Reference ID: #MSG-12345
                </p>
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* Practical Example: E-commerce */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Order Confirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <Result
            status="success"
            title="Order Placed Successfully!"
            subTitle="Your order #ORD-789456 has been confirmed and will be delivered in 3-5 business days."
            extra={
              <div className="space-y-4">
                <div className="flex gap-2 justify-center">
                  <Button size="lg">Track Order</Button>
                  <Button variant="outline" size="lg">
                    View Invoice
                  </Button>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery: Dec 25-28, 2024
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your email address
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button variant="ghost" size="sm">
                    Continue Shopping
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            }
          />
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import { Result } from 'saha-ui';
import { Home, RefreshCw } from 'lucide-react';

// Success result
<Result
  status="success"
  title="Payment Successful!"
  subTitle="Your order has been placed successfully."
  extra={
    <Button>View Order</Button>
  }
/>

// Error result with actions
<Result
  status="error"
  title="Payment Failed"
  subTitle="Please check your payment details and try again."
  extra={
    <div className="flex gap-2">
      <Button variant="destructive" onClick={handleRetry}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </Button>
      <Button variant="outline">Get Help</Button>
    </div>
  }
/>

// Info result
<Result
  status="info"
  title="Email Sent"
  subTitle="Check your inbox for the verification link."
  extra={<Button>Open Email</Button>}
/>

// Warning result
<Result
  status="warning"
  title="Session Expiring"
  subTitle="Your session will expire in 5 minutes."
  extra={<Button variant="warning">Extend Session</Button>}
/>

// 404 Page
<Result
  status="404"
  title="404 - Page Not Found"
  subTitle="The page you're looking for doesn't exist."
  extra={
    <Button>
      <Home className="w-4 h-4 mr-2" />
      Go Home
    </Button>
  }
/>

// 403 Forbidden
<Result
  status="403"
  title="403 - Access Denied"
  subTitle="You don't have permission to access this page."
  extra={<Button>Go Home</Button>}
/>

// 500 Server Error
<Result
  status="500"
  title="500 - Server Error"
  subTitle="Something went wrong. Please try again later."
  extra={<Button onClick={handleRetry}>Retry</Button>}
/>

// Minimal (no actions)
<Result
  status="success"
  title="Changes Saved"
  subTitle="Your settings have been updated."
/>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export { ResultExample };
