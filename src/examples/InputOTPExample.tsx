import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../components/InputOTP";

/**
 * Comprehensive examples for InputOTP component
 */
const InputOTPExample: React.FC = () => {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [composableOtp, setComposableOtp] = useState("");
  const [maskedOtp, setMaskedOtp] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <div className="w-full space-y-12 p-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">InputOTP Component Examples</h1>
        <p className="text-muted-foreground text-lg">
          Advanced OTP input component with dual API support, auto-focus, paste
          handling, and comprehensive validation.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Basic Usage</h2>
          <p className="text-muted-foreground">
            Simple OTP input with compact props-based API
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <InputOTP
              length={6}
              value={otp1}
              onChange={setOtp1}
              label="Enter OTP"
              helperText="Check your email for the verification code"
              onComplete={(value) => console.log("OTP Complete:", value)}
            />
            <p className="text-sm text-muted-foreground">
              Value: <code className="bg-muted px-2 py-1 rounded">{otp1}</code>
            </p>
          </div>

          <div className="space-y-3">
            <InputOTP
              length={4}
              value={otp2}
              onChange={setOtp2}
              label="4-Digit PIN"
              helperText="Enter your security PIN"
              mask
            />
            <p className="text-sm text-muted-foreground">
              Value: <code className="bg-muted px-2 py-1 rounded">{otp2}</code>
            </p>
          </div>
        </div>
      </section>

      {/* All Variants */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">All Variants</h2>
          <p className="text-muted-foreground">
            10 beautiful variants to match your design
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputOTP
            length={4}
            variant="primary"
            label="Primary"
            autoFocus
          />
          <InputOTP length={4} variant="secondary" label="Secondary" />
          <InputOTP length={4} variant="accent" label="Accent" />
          <InputOTP length={4} variant="info" label="Info" />
          <InputOTP length={4} variant="success" label="Success" />
          <InputOTP length={4} variant="warning" label="Warning" />
          <InputOTP length={4} variant="error" label="Error" />
          <InputOTP length={4} variant="outline" label="Outline" />
          <InputOTP length={4} variant="ghost" label="Ghost" />
          <InputOTP length={4} variant="glass" label="Glass" />
        </div>
      </section>

      {/* All Sizes */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">All Sizes</h2>
          <p className="text-muted-foreground">
            From small to extra large - perfect for any use case
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InputOTP length={4} size="sm" label="Small" variant="primary" />
          <InputOTP length={4} size="md" label="Medium" variant="secondary" />
          <InputOTP length={4} size="lg" label="Large" variant="accent" />
          <InputOTP length={4} size="xl" label="Extra Large" variant="info" />
        </div>
      </section>

      {/* Composable API */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Composable API</h2>
          <p className="text-muted-foreground">
            Build custom layouts with InputOTPGroup, InputOTPSlot, and
            InputOTPSeparator
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <InputOTP
              value={composableOtp}
              onChange={setComposableOtp}
              variant="primary"
              label="Custom Layout (3-3)"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Value:{" "}
              <code className="bg-muted px-2 py-1 rounded">
                {composableOtp}
              </code>
            </p>
          </div>

          <div className="space-y-3">
            <InputOTP
              value={otp3}
              onChange={setOtp3}
              variant="accent"
              label="Custom Layout (2-2-2)"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator>·</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator>·</InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Value: <code className="bg-muted px-2 py-1 rounded">{otp3}</code>
            </p>
          </div>
        </div>
      </section>

      {/* With Separators */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">With Separators</h2>
          <p className="text-muted-foreground">
            Automatic separators using compact API
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputOTP
            length={6}
            value={otp4}
            onChange={setOtp4}
            variant="secondary"
            label="Hyphen Separator"
            showSeparator
            groupSize={3}
            separator="-"
          />
          <InputOTP
            length={6}
            variant="accent"
            label="Dot Separator"
            showSeparator
            groupSize={2}
            separator="·"
          />
        </div>
      </section>

      {/* Input Types */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Input Types</h2>
          <p className="text-muted-foreground">
            Numeric, alphanumeric, or text-based OTP inputs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputOTP
            length={6}
            type="numeric"
            variant="primary"
            label="Numeric Only"
            helperText="Numbers 0-9 only"
          />
          <InputOTP
            length={6}
            type="alphanumeric"
            variant="secondary"
            label="Alphanumeric"
            helperText="Letters and numbers"
          />
          <InputOTP
            length={6}
            type="text"
            variant="accent"
            label="Text (Any Character)"
            helperText="Any character allowed"
          />
        </div>
      </section>

      {/* Masked Input */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Masked Input</h2>
          <p className="text-muted-foreground">
            Hide sensitive OTP codes with customizable mask characters
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <InputOTP
              length={6}
              value={maskedOtp}
              onChange={setMaskedOtp}
              variant="primary"
              label="Default Mask (•)"
              mask
            />
            <p className="text-sm text-muted-foreground">
              Value:{" "}
              <code className="bg-muted px-2 py-1 rounded">{maskedOtp}</code>
            </p>
          </div>
          <InputOTP
            length={6}
            variant="secondary"
            label="Star Mask (*)"
            mask
            maskChar="*"
          />
          <InputOTP
            length={6}
            variant="accent"
            label="Hash Mask (#)"
            mask
            maskChar="#"
          />
        </div>
      </section>

      {/* States */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">States</h2>
          <p className="text-muted-foreground">
            Error states, disabled inputs, and required fields
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputOTP
            length={6}
            variant="error"
            label="Error State"
            error="Invalid verification code"
            required
          />
          <InputOTP
            length={6}
            variant="success"
            label="Success State"
            helperText="Code verified successfully"
          />
          <InputOTP
            length={6}
            variant="outline"
            label="Disabled"
            disabled
            defaultValue="123456"
          />
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Advanced Features</h2>
          <p className="text-muted-foreground">
            Auto-focus, paste handling, custom patterns, and completion
            callbacks
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <InputOTP
              length={6}
              value={verificationCode}
              onChange={setVerificationCode}
              variant="primary"
              size="lg"
              label="Verification Code"
              helperText="Paste your 6-digit code or type manually"
              autoFocus
              allowPaste
              onComplete={(value) => {
                console.log("Verification complete:", value);
                alert(`Code submitted: ${value}`);
              }}
            />
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm font-semibold">Features enabled:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Auto-focus on mount</li>
                <li>Paste support (try: Ctrl+V)</li>
                <li>Keyboard navigation (Arrow keys, Home, End)</li>
                <li>Backspace/Delete support</li>
                <li>onComplete callback when all digits filled</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <InputOTP
              length={4}
              variant="glass"
              size="lg"
              label="Premium PIN"
              type="numeric"
              mask
              showSeparator
              groupSize={2}
              separator="·"
            />
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm font-semibold">Styling features:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Glass morphism variant</li>
                <li>Large size for better touch targets</li>
                <li>Masked input for security</li>
                <li>Visual separators</li>
                <li>Smooth animations & transitions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Real-world Examples</h2>
          <p className="text-muted-foreground">
            Common use cases for OTP inputs
          </p>
        </div>

        {/* Email Verification */}
        <div className="max-w-md mx-auto p-8 bg-card rounded-2xl shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Email Verification</h3>
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit code to your email
              <br />
              <span className="font-semibold">user@example.com</span>
            </p>
          </div>
          <InputOTP
            length={6}
            variant="primary"
            size="lg"
            label="Verification Code"
            autoFocus
            onComplete={(value) => console.log("Email verified:", value)}
          />
          <div className="flex justify-between items-center text-sm">
            <button className="text-primary hover:underline">Resend code</button>
            <span className="text-muted-foreground">Expires in 5:00</span>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="max-w-md mx-auto p-8 bg-card rounded-2xl shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>
          <InputOTP
            length={6}
            variant="accent"
            size="lg"
            type="numeric"
            label="Authentication Code"
            showSeparator
            groupSize={3}
            autoFocus
          />
        </div>

        {/* Phone Verification */}
        <div className="max-w-md mx-auto p-8 bg-card rounded-2xl shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">Phone Verification</h3>
            <p className="text-sm text-muted-foreground">
              We've sent an SMS code to
              <br />
              <span className="font-semibold">+1 (555) 123-4567</span>
            </p>
          </div>
          <InputOTP
            length={4}
            variant="success"
            size="xl"
            type="numeric"
            label="SMS Code"
            autoFocus
          />
        </div>
      </section>

      {/* Custom Patterns */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Custom Patterns</h2>
          <p className="text-muted-foreground">
            Use regex patterns to validate specific input formats
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputOTP
            length={6}
            variant="primary"
            label="Uppercase Letters Only"
            pattern={/^[A-Z]$/}
            helperText="Enter uppercase letters A-Z"
          />
          <InputOTP
            length={4}
            variant="secondary"
            label="Hexadecimal"
            pattern={/^[0-9A-F]$/}
            helperText="Enter hex characters 0-9, A-F"
          />
        </div>
      </section>
    </div>
  );
};

export default InputOTPExample;
