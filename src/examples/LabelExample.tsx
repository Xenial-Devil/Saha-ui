import {
  Label,
  LabelGroup,
  LabelDescription,
  LabelError,
  LabelRequired,
  LabelOptional,
} from "../components/Label";
import { Input } from "../components/Input";

export default function LabelExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 shadow-lg shadow-blue-500/20">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Label Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Accessible form labels with support for required/optional
            indicators, descriptions, errors, and floating styles
          </p>
        </div>

        {/* Basic Labels */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Basic Labels
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="basic-email">Email Address</Label>
                <Input
                  id="basic-email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basic-name">Full Name</Label>
                <Input id="basic-name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basic-message">Message</Label>
                <textarea
                  id="basic-message"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={3}
                  placeholder="Your message..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Color Variants
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="default" htmlFor="variant-default">
                Default Label
              </Label>
              <Input id="variant-default" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="primary" htmlFor="variant-primary">
                Primary Label
              </Label>
              <Input id="variant-primary" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="secondary" htmlFor="variant-secondary">
                Secondary Label
              </Label>
              <Input id="variant-secondary" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="success" htmlFor="variant-success">
                Success Label
              </Label>
              <Input id="variant-success" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="warning" htmlFor="variant-warning">
                Warning Label
              </Label>
              <Input id="variant-warning" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="error" htmlFor="variant-error">
                Error Label
              </Label>
              <Input id="variant-error" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="info" htmlFor="variant-info">
                Info Label
              </Label>
              <Input id="variant-info" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="muted" htmlFor="variant-muted">
                Muted Label
              </Label>
              <Input id="variant-muted" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 space-y-2">
              <Label variant="outline" htmlFor="variant-outline">
                Outline Label
              </Label>
              <Input id="variant-outline" />
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sizes
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label size="sm" htmlFor="size-sm">
                  Small Label
                </Label>
                <Input id="size-sm" size="sm" />
              </div>
              <div className="space-y-2">
                <Label size="md" htmlFor="size-md">
                  Medium Label
                </Label>
                <Input id="size-md" size="md" />
              </div>
              <div className="space-y-2">
                <Label size="lg" htmlFor="size-lg">
                  Large Label
                </Label>
                <Input id="size-lg" size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Required & Optional */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Required & Optional Indicators
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="req-email" required>
                  Email Address
                </Label>
                <Input id="req-email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opt-phone" optional>
                  Phone Number
                </Label>
                <Input id="opt-phone" type="tel" />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="custom-req"
                  required
                  requiredIndicator="(required)"
                >
                  Username
                </Label>
                <Input id="custom-req" />
              </div>
            </div>
          </div>
        </section>

        {/* With Descriptions */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              With Descriptions
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="desc-email">Email Address</Label>
                  <LabelDescription>
                    We'll never share your email with anyone else
                  </LabelDescription>
                </div>
                <Input id="desc-email" type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="desc-password" required>
                    Password
                  </Label>
                  <LabelDescription>
                    Must be at least 8 characters with uppercase, lowercase, and
                    numbers
                  </LabelDescription>
                </div>
                <Input id="desc-password" type="password" />
              </div>
            </div>
          </div>
        </section>

        {/* With Errors */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-rose-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              With Error Messages
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="error-email" error required>
                    Email Address
                  </Label>
                  <LabelError>Please enter a valid email address</LabelError>
                </div>
                <Input
                  id="error-email"
                  type="email"
                  className="border-red-500 dark:border-red-400"
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="error-username" error required>
                    Username
                  </Label>
                  <LabelError>Username is already taken</LabelError>
                </div>
                <Input
                  id="error-username"
                  className="border-red-500 dark:border-red-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* With Help Text */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              With Help Tooltips
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="help-api"
                  showHelp
                  helpText="Your API key can be found in your account settings"
                >
                  API Key
                </Label>
                <Input id="help-api" type="password" />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="help-webhook"
                  required
                  showHelp
                  helpText="Enter the URL where you want to receive webhook notifications"
                >
                  Webhook URL
                </Label>
                <Input id="help-webhook" type="url" />
              </div>
            </div>
          </div>
        </section>

        {/* Label Groups */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Label Groups
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Vertical Group
              </h3>
              <LabelGroup direction="vertical">
                <div className="space-y-2">
                  <Label htmlFor="group-v-first">First Name</Label>
                  <Input id="group-v-first" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-v-last">Last Name</Label>
                  <Input id="group-v-last" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-v-email">Email</Label>
                  <Input id="group-v-email" type="email" />
                </div>
              </LabelGroup>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Horizontal Group
              </h3>
              <LabelGroup direction="horizontal" spacing="lg">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="group-h-first">First Name</Label>
                  <Input id="group-h-first" />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="group-h-last">Last Name</Label>
                  <Input id="group-h-last" />
                </div>
              </LabelGroup>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              States
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="state-normal">Normal State</Label>
                <Input id="state-normal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state-disabled" disabled>
                  Disabled State
                </Label>
                <Input id="state-disabled" disabled />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="state-error" error>
                    Error State
                  </Label>
                  <LabelError>This field has an error</LabelError>
                </div>
                <Input
                  id="state-error"
                  className="border-red-500 dark:border-red-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Composition API */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Composition API
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="comp-email" variant="primary">
                    Email Address
                    <LabelRequired />
                  </Label>
                  <LabelDescription>
                    We'll use this for important account notifications
                  </LabelDescription>
                </div>
                <Input id="comp-email" type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="comp-bio" variant="secondary">
                    Bio
                    <LabelOptional />
                  </Label>
                  <LabelDescription>
                    Tell us a bit about yourself (max 500 characters)
                  </LabelDescription>
                </div>
                <textarea
                  id="comp-bio"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
