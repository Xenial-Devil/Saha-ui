import { useState } from "react";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldHint,
} from "./index";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { Radio, RadioGroup } from "../Radio";
import { Switch } from "../Switch";
import { Mail, User, Phone, Lock, CreditCard } from "lucide-react";

export const FieldExample = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [agree, setAgree] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [theme, setTheme] = useState("light");

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="space-y-12 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Field Component</h1>
        <p className="text-muted-foreground">
          Form field components with labels, descriptions, errors, and hints
        </p>
      </div>

      {/* Props API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Props API</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Email Address"
            description="We'll never share your email with anyone else."
            required
            htmlFor="email-props"
          >
            <Input
              id="email-props"
              type="email"
              placeholder="john@example.com"
              startIcon={<Mail size={16} />}
            />
          </Field>

          <Field
            label="Password"
            hint="Must be at least 8 characters long"
            required
            htmlFor="password-props"
          >
            <Input
              id="password-props"
              type="password"
              placeholder="••••••••"
              startIcon={<Lock size={16} />}
            />
          </Field>

          <Field
            label="Username"
            description="Choose a unique username"
            showOptional
            htmlFor="username-props"
          >
            <Input
              id="username-props"
              type="text"
              placeholder="johndoe"
              startIcon={<User size={16} />}
            />
          </Field>

          <Field
            label="Phone Number"
            error={emailError}
            required
            htmlFor="phone-props"
          >
            <Input
              id="phone-props"
              type="tel"
              placeholder="+1 (555) 123-4567"
              startIcon={<Phone size={16} />}
              onChange={(e) => {
                if (e.target.value && !/^\+?[\d\s()-]+$/.test(e.target.value)) {
                  setEmailError("Please enter a valid phone number");
                } else {
                  setEmailError("");
                }
              }}
            />
          </Field>
        </div>
      </section>

      {/* Composable API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Composable API (Recommended)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="email-comp" required>
              Email Address
            </FieldLabel>
            <Input
              id="email-comp"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              startIcon={<Mail size={16} />}
            />
            {emailError ? (
              <FieldError>{emailError}</FieldError>
            ) : (
              <FieldDescription>
                We'll never share your email with anyone else.
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password-comp" required>
              Password
            </FieldLabel>
            <Input
              id="password-comp"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={<Lock size={16} />}
            />
            <FieldHint>Must be at least 8 characters long</FieldHint>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel htmlFor="bio-comp" optional>
              Bio
            </FieldLabel>
            <TextArea
              id="bio-comp"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
            <FieldDescription>
              Write a short bio about yourself. Maximum 500 characters.
            </FieldDescription>
          </Field>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Sizes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field size="sm" label="Small Field" required htmlFor="small">
            <Input id="small" placeholder="Small input" size="sm" />
          </Field>

          <Field size="md" label="Medium Field" required htmlFor="medium">
            <Input id="medium" placeholder="Medium input" size="md" />
          </Field>

          <Field size="lg" label="Large Field" required htmlFor="large">
            <Input id="large" placeholder="Large input" size="lg" />
          </Field>
        </div>
      </section>

      {/* FieldSet & FieldGroup */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">FieldSet & FieldGroup</h2>

        <FieldSet legend="Personal Information" variant="outlined">
          <FieldGroup columns={2}>
            <Field>
              <FieldLabel htmlFor="firstname" required>
                First Name
              </FieldLabel>
              <Input id="firstname" placeholder="John" />
            </Field>

            <Field>
              <FieldLabel htmlFor="lastname" required>
                Last Name
              </FieldLabel>
              <Input id="lastname" placeholder="Doe" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email-set" required>
                Email
              </FieldLabel>
              <Input
                id="email-set"
                type="email"
                placeholder="john@example.com"
                startIcon={<Mail size={16} />}
              />
              <FieldDescription>Your primary email address</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone-set">Phone</FieldLabel>
              <Input
                id="phone-set"
                type="tel"
                placeholder="+1 (555) 123-4567"
                startIcon={<Phone size={16} />}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>

      {/* Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">FieldSet Variants</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FieldSet legend="Default Variant" variant="default">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="default-input">Input</FieldLabel>
                <Input id="default-input" placeholder="Default variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Filled Variant" variant="filled">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="filled-input">Input</FieldLabel>
                <Input id="filled-input" placeholder="Filled variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Outlined Variant" variant="outlined">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="outlined-input">Input</FieldLabel>
                <Input id="outlined-input" placeholder="Outlined variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Glass Variant" variant="glass">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="glass-input">Input</FieldLabel>
                <Input id="glass-input" placeholder="Glass variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Primary Variant" variant="primary">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="primary-input">Input</FieldLabel>
                <Input id="primary-input" placeholder="Primary variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Success Variant" variant="success">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="success-input">Input</FieldLabel>
                <Input id="success-input" placeholder="Success variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Warning Variant" variant="warning">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="warning-input">Input</FieldLabel>
                <Input id="warning-input" placeholder="Warning variant" />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet legend="Error Variant" variant="error">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="error-input">Input</FieldLabel>
                <Input id="error-input" placeholder="Error variant" />
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </section>

      {/* With Different Input Types */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">With Different Input Types</h2>

        <FieldSet legend="Registration Form" variant="glass">
          <FieldGroup columns={2}>
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="country" required>
                Country
              </FieldLabel>
              <Select
                id="country"
                options={[
                  { value: "us", label: "United States" },
                  { value: "uk", label: "United Kingdom" },
                  { value: "ca", label: "Canada" },
                  { value: "au", label: "Australia" },
                ]}
                placeholder="Select your country"
              />
              <FieldDescription>Select your country of residence</FieldDescription>
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="card" required>
                Card Number
              </FieldLabel>
              <Input
                id="card"
                type="text"
                placeholder="1234 5678 9012 3456"
                startIcon={<CreditCard size={16} />}
              />
              <FieldHint>Enter your 16-digit card number</FieldHint>
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
              <TextArea
                id="feedback"
                placeholder="Share your thoughts about our service..."
                rows={4}
              />
              <FieldDescription>
                Share your thoughts about our service.
              </FieldDescription>
            </Field>

            <Field className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <FieldLabel htmlFor="agree" className="mb-0 cursor-pointer">
                  I agree to the terms and conditions
                </FieldLabel>
              </div>
            </Field>

            <Field className="md:col-span-2">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="newsletter" className="mb-0">
                  Subscribe to newsletter
                </FieldLabel>
                <Switch
                  id="newsletter"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
              </div>
              <FieldDescription>
                Receive updates about new features and promotions
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>

      {/* Radio Group */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">With Radio Group</h2>

        <FieldSet legend="Preferences" variant="outlined">
          <Field>
            <FieldLabel required>Theme Preference</FieldLabel>
            <RadioGroup name="theme" value={theme} onChange={setTheme}>
              <Radio value="light" label="Light Mode" />
              <Radio value="dark" label="Dark Mode" />
              <Radio value="system" label="System Default" />
            </RadioGroup>
            <FieldDescription>
              Choose your preferred color theme
            </FieldDescription>
          </Field>
        </FieldSet>
      </section>

      {/* Horizontal Layout */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Horizontal Layout</h2>

        <FieldGroup spacing="lg">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="horizontal-1" className="min-w-[150px] pt-2">
              Full Name
            </FieldLabel>
            <div className="flex-1">
              <Input id="horizontal-1" placeholder="John Doe" />
              <FieldDescription>Enter your full legal name</FieldDescription>
            </div>
          </Field>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="horizontal-2" className="min-w-[150px] pt-2">
              Email Address
            </FieldLabel>
            <div className="flex-1">
              <Input
                id="horizontal-2"
                type="email"
                placeholder="john@example.com"
              />
              <FieldDescription>Your primary contact email</FieldDescription>
            </div>
          </Field>
        </FieldGroup>
      </section>

      {/* States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">States</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Disabled Field"
            description="This field is disabled"
            disabled
            htmlFor="disabled"
          >
            <Input id="disabled" placeholder="Disabled input" disabled />
          </Field>

          <Field
            label="Field with Error"
            error="This field is required"
            required
            htmlFor="error-field"
          >
            <Input id="error-field" placeholder="Enter value" />
          </Field>

          <Field
            label="Required Field"
            description="This field is required"
            required
            htmlFor="required"
          >
            <Input id="required" placeholder="Required input" />
          </Field>

          <Field
            label="Optional Field"
            description="This field is optional"
            showOptional
            htmlFor="optional"
          >
            <Input id="optional" placeholder="Optional input" />
          </Field>
        </div>
      </section>

      {/* Real-world Form Example */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Form Example</h2>

        <FieldSet legend="Contact Form" variant="glass" size="lg">
          <FieldGroup columns={2} spacing="lg">
            <Field>
              <FieldLabel htmlFor="contact-name" required>
                Name
              </FieldLabel>
              <Input
                id="contact-name"
                placeholder="Your full name"
                startIcon={<User size={16} />}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="contact-email" required>
                Email
              </FieldLabel>
              <Input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                startIcon={<Mail size={16} />}
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="contact-subject" required>
                Subject
              </FieldLabel>
              <Input id="contact-subject" placeholder="What's this about?" />
              <FieldHint>Briefly describe the purpose of your message</FieldHint>
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="contact-message" required>
                Message
              </FieldLabel>
              <TextArea
                id="contact-message"
                placeholder="Your message here..."
                rows={6}
              />
              <FieldDescription>
                Provide as much detail as possible to help us assist you better.
              </FieldDescription>
            </Field>

            <Field className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Checkbox id="contact-copy" />
                <FieldLabel htmlFor="contact-copy" className="mb-0 cursor-pointer">
                  Send me a copy of this message
                </FieldLabel>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </section>
    </div>
  );
};

export default FieldExample;
