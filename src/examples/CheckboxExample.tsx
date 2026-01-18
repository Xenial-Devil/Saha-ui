// CheckboxExample.tsx
import React from "react";
import { Checkbox, CheckboxGroup } from "../components/Checkbox";
import {
  Shield,
  Globe,
  Database,
  Cloud,
  Bell,
  Mail,
  MessageSquare,
  Eye,
  Target,
  Moon,
  Sun,
  Cookie,
  FileText,
  CreditCard,
  Smartphone,
  Volume2,
  User,
  ShoppingCart,
  BarChart3,
  Fingerprint,
  Camera,
  Image,
  Video,
  Upload,
  RefreshCw,
  Settings,
  HelpCircle,
  CheckCircle,
  Watch,
  Shirt,
} from "lucide-react";

export function CheckboxExample() {
  // State management for various examples
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([
    "notifications",
  ]);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([
    "hosting",
  ]);
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  // Real-life example states
  const [cookieConsent, setCookieConsent] = React.useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [privacyAccepted, setPrivacyAccepted] = React.useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [autoSave, setAutoSave] = React.useState(true);
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    sms: false,
    inApp: true,
  });
  const [accessibility, setAccessibility] = React.useState({
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
  });

  const allItems = ["item1", "item2", "item3"];
  const indeterminate =
    selectedItems.length > 0 && selectedItems.length < allItems.length;

  React.useEffect(() => {
    setSelectAll(selectedItems.length === allItems.length);
  }, [selectedItems]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedItems(checked ? allItems : []);
  };

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          Checkbox Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Modern checkboxes with beautiful animations, multiple shapes, check
          styles, fill styles, and color schemes.
        </p>
      </div>

      {/* ==================== REAL-LIFE EXAMPLES ==================== */}

      <div className="border-b border-border pb-4 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          🌍 Real-Life Use Cases
        </h2>
        <p className="text-muted-foreground">
          Practical implementations for everyday applications
        </p>
      </div>

      {/* Cookie Consent Banner */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Cookie className="w-5 h-5" /> Cookie Consent Banner
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="flex items-start gap-4 mb-4">
            <Cookie className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-lg text-foreground">
                We use cookies 🍪
              </h4>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience and analyze
                our traffic. Please choose which cookies you'd like to accept.
              </p>
            </div>
          </div>
          <div className="space-y-3 ml-12">
            <Checkbox
              label="Necessary Cookies"
              description="Required for the website to function properly"
              checked={cookieConsent.necessary}
              disabled
              colorScheme="gray"
              checkStyle="lock"
            />
            <Checkbox
              label="Analytics Cookies"
              description="Help us understand how visitors interact with our website"
              checked={cookieConsent.analytics}
              onCheckedChange={(checked) =>
                setCookieConsent((prev) => ({ ...prev, analytics: checked }))
              }
              colorScheme="blue"
              checkStyle="checkCircle"
              icon={<BarChart3 className="w-3 h-3" />}
            />
            <Checkbox
              label="Marketing Cookies"
              description="Used to deliver personalized advertisements"
              checked={cookieConsent.marketing}
              onCheckedChange={(checked) =>
                setCookieConsent((prev) => ({ ...prev, marketing: checked }))
              }
              colorScheme="purple"
              checkStyle="checkCircle"
              icon={<Target className="w-3 h-3" />}
            />
            <Checkbox
              label="Preference Cookies"
              description="Remember your settings and preferences"
              checked={cookieConsent.preferences}
              onCheckedChange={(checked) =>
                setCookieConsent((prev) => ({ ...prev, preferences: checked }))
              }
              colorScheme="green"
              checkStyle="checkCircle"
              icon={<Settings className="w-3 h-3" />}
            />
          </div>
          <div className="flex gap-3 mt-6 ml-12">
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Accept Selected
            </button>
            <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors">
              Accept All
            </button>
          </div>
        </div>
      </section>

      {/* Terms & Conditions / Privacy Policy */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5" /> Registration Form Agreements
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <h4 className="font-medium mb-4">Complete your registration</h4>
          <div className="space-y-4">
            <Checkbox
              label="I agree to the Terms of Service"
              description={
                <span>
                  I have read and agree to the{" "}
                  <a href="#" className="text-primary underline">
                    Terms of Service
                  </a>
                </span>
              }
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
              required
              showRequiredIndicator
              colorScheme="primary"
              error={
                !termsAccepted
                  ? "You must accept the Terms of Service"
                  : undefined
              }
            />
            <Checkbox
              label="I agree to the Privacy Policy"
              description={
                <span>
                  I have read and understand the{" "}
                  <a href="#" className="text-primary underline">
                    Privacy Policy
                  </a>
                </span>
              }
              checked={privacyAccepted}
              onCheckedChange={setPrivacyAccepted}
              required
              showRequiredIndicator
              colorScheme="primary"
              error={
                !privacyAccepted
                  ? "You must accept the Privacy Policy"
                  : undefined
              }
            />
            <Checkbox
              label="Subscribe to newsletter"
              description="Receive updates, tips, and special offers (optional)"
              checked={newsletterSubscribed}
              onCheckedChange={setNewsletterSubscribed}
              colorScheme="success"
              icon={<Mail className="w-3 h-3" />}
              badge="Optional"
            />
          </div>
          <button
            className={`mt-6 px-6 py-2 rounded-lg transition-colors ${
              termsAccepted && privacyAccepted
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            disabled={!termsAccepted || !privacyAccepted}
          >
            Create Account
          </button>
        </div>
      </section>

      {/* Login Form - Remember Me */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <User className="w-5 h-5" /> Login Form
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-md">
          <h4 className="font-semibold text-lg mb-4">Welcome back</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-background"
              />
            </div>
            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                colorScheme="primary"
                size="sm"
              />
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Theme & Appearance Settings */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Settings className="w-5 h-5" /> Appearance Settings
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Theme</h4>
              <Checkbox
                label="Dark Mode"
                description="Use dark theme across the application"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                colorScheme={darkMode ? "purple" : "slate"}
                icon={
                  darkMode ? (
                    <Moon className="w-3 h-3" />
                  ) : (
                    <Sun className="w-3 h-3" />
                  )
                }
                fillStyle={darkMode ? "filled" : "outline"}
                shape="circle"
                animation="scale"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Auto-save</h4>
              <Checkbox
                label="Enable Auto-save"
                description="Automatically save your work every 30 seconds"
                checked={autoSave}
                onCheckedChange={setAutoSave}
                colorScheme="success"
                icon={<RefreshCw className="w-3 h-3" />}
                checkStyle="checkCircle"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5" /> Security Settings
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="space-y-4">
            <Checkbox
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
              colorScheme={twoFactorEnabled ? "success" : "warning"}
              icon={<Fingerprint className="w-3 h-3" />}
              checkStyle="shield"
              badge={twoFactorEnabled ? "Enabled" : "Recommended"}
              recommended={!twoFactorEnabled}
              size="lg"
              animation="scale"
            />
            {twoFactorEnabled && (
              <div className="ml-8 p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm text-success flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Two-factor authentication is enabled. Your account is more
                  secure.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notification Preferences
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Choose how you want to receive notifications
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Email Notifications"
              description="Receive notifications via email"
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, email: checked }))
              }
              colorScheme="blue"
              icon={<Mail className="w-3 h-3" />}
              checkStyle="check"
            />
            <Checkbox
              label="Push Notifications"
              description="Browser push notifications"
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, push: checked }))
              }
              colorScheme="purple"
              icon={<Bell className="w-3 h-3" />}
              checkStyle="check"
            />
            <Checkbox
              label="SMS Notifications"
              description="Text message alerts"
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, sms: checked }))
              }
              colorScheme="green"
              icon={<Smartphone className="w-3 h-3" />}
              checkStyle="check"
              badge="Premium"
            />
            <Checkbox
              label="In-App Notifications"
              description="Notifications within the app"
              checked={notifications.inApp}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({ ...prev, inApp: checked }))
              }
              colorScheme="orange"
              icon={<MessageSquare className="w-3 h-3" />}
              checkStyle="check"
            />
          </div>
        </div>
      </section>

      {/* Accessibility Settings */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5" /> Accessibility Settings
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Customize your experience for better accessibility
          </p>
          <div className="space-y-4">
            <Checkbox
              label="Reduce Motion"
              description="Minimize animations throughout the interface"
              checked={accessibility.reduceMotion}
              onCheckedChange={(checked) =>
                setAccessibility((prev) => ({ ...prev, reduceMotion: checked }))
              }
              colorScheme="blue"
              animation={accessibility.reduceMotion ? "none" : "scale"}
            />
            <Checkbox
              label="High Contrast Mode"
              description="Increase contrast for better visibility"
              checked={accessibility.highContrast}
              onCheckedChange={(checked) =>
                setAccessibility((prev) => ({ ...prev, highContrast: checked }))
              }
              colorScheme="slate"
              fillStyle={accessibility.highContrast ? "filled" : "outline"}
            />
            <Checkbox
              label="Large Text"
              description="Increase text size throughout the app"
              checked={accessibility.largeText}
              onCheckedChange={(checked) =>
                setAccessibility((prev) => ({ ...prev, largeText: checked }))
              }
              colorScheme="purple"
              size={accessibility.largeText ? "lg" : "md"}
            />
            <Checkbox
              label="Screen Reader Optimized"
              description="Optimize content for screen readers"
              checked={accessibility.screenReader}
              onCheckedChange={(checked) =>
                setAccessibility((prev) => ({ ...prev, screenReader: checked }))
              }
              colorScheme="green"
              icon={<Volume2 className="w-3 h-3" />}
            />
          </div>
        </div>
      </section>

      {/* E-commerce: Add to Wishlist / Compare */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" /> E-commerce Product Actions
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                <Shirt className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium">Premium T-Shirt</h4>
                <p className="text-sm text-muted-foreground">$49.99</p>
                <div className="flex gap-4 mt-2">
                  <Checkbox
                    label="Wishlist"
                    colorScheme="red"
                    checkStyle="heart"
                    shape="circle"
                    size="sm"
                    animation="heartbeat"
                  />
                  <Checkbox
                    label="Compare"
                    colorScheme="blue"
                    checkStyle="check"
                    shape="circle"
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                <Watch className="w-10 h-10 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium">Smart Watch Pro</h4>
                <p className="text-sm text-muted-foreground">$299.99</p>
                <div className="flex gap-4 mt-2">
                  <Checkbox
                    label="Wishlist"
                    colorScheme="red"
                    checkStyle="heart"
                    shape="circle"
                    size="sm"
                    animation="heartbeat"
                    defaultChecked
                  />
                  <Checkbox
                    label="Compare"
                    colorScheme="blue"
                    checkStyle="check"
                    shape="circle"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task/Todo List */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Task List / Todo App
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-lg">
          <h4 className="font-semibold mb-4">Today's Tasks</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Checkbox
                defaultChecked
                colorScheme="success"
                checkStyle="check"
                animation="bounce"
              />
              <span className="line-through text-muted-foreground">
                Review project proposal
              </span>
              <span className="ml-auto text-xs px-2 py-1 bg-success/20 text-success rounded">
                Done
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Checkbox
                defaultChecked
                colorScheme="success"
                checkStyle="check"
                animation="bounce"
              />
              <span className="line-through text-muted-foreground">
                Send weekly report
              </span>
              <span className="ml-auto text-xs px-2 py-1 bg-success/20 text-success rounded">
                Done
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg border-primary/30 bg-primary/5">
              <Checkbox
                colorScheme="primary"
                checkStyle="check"
                animation="bounce"
              />
              <span>Schedule team meeting</span>
              <span className="ml-auto text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded">
                In Progress
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Checkbox
                colorScheme="primary"
                checkStyle="check"
                animation="bounce"
              />
              <span>Update documentation</span>
              <span className="ml-auto text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                Pending
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Checkbox
                colorScheme="error"
                checkStyle="check"
                animation="bounce"
              />
              <span>Fix critical bug #1234</span>
              <span className="ml-auto text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                Urgent
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Survey / Feedback Form */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <HelpCircle className="w-5 h-5" /> Survey / Feedback Form
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <h4 className="font-semibold mb-2">How did you hear about us?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Select all that apply
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Checkbox label="Search Engine (Google, Bing)" colorScheme="blue" />
            <Checkbox label="Social Media" colorScheme="pink" />
            <Checkbox label="Friend or Colleague" colorScheme="green" />
            <Checkbox label="Online Advertisement" colorScheme="purple" />
            <Checkbox label="Blog or Article" colorScheme="orange" />
            <Checkbox label="Other" colorScheme="slate" />
          </div>
        </div>
      </section>

      {/* File Upload Preferences */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <Upload className="w-5 h-5" /> File Upload Settings
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <h4 className="font-medium mb-4">Upload Preferences</h4>
          <div className="space-y-3">
            <Checkbox
              label="Optimize images automatically"
              description="Compress and resize images for faster loading"
              colorScheme="blue"
              icon={<Image className="w-3 h-3" />}
              defaultChecked
            />
            <Checkbox
              label="Generate thumbnails"
              description="Create thumbnail versions of uploaded images"
              colorScheme="purple"
              icon={<Camera className="w-3 h-3" />}
              defaultChecked
            />
            <Checkbox
              label="Extract video metadata"
              description="Automatically read duration, resolution, and codec info"
              colorScheme="orange"
              icon={<Video className="w-3 h-3" />}
            />
            <Checkbox
              label="Virus scan on upload"
              description="Scan all files for malware before storing"
              colorScheme="success"
              icon={<Shield className="w-3 h-3" />}
              defaultChecked
              disabled
              badge="Required"
            />
          </div>
        </div>
      </section>

      {/* Checkout - Billing Same as Shipping */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
          <CreditCard className="w-5 h-5" /> Checkout Form
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 max-w-lg">
          <h4 className="font-semibold mb-4">Billing Information</h4>
          <Checkbox
            label="Billing address is same as shipping address"
            colorScheme="primary"
            defaultChecked
          />
          <div className="mt-4 pt-4 border-t">
            <Checkbox
              label="Save this card for future purchases"
              description="Securely store your payment method"
              colorScheme="success"
              icon={<CreditCard className="w-3 h-3" />}
            />
          </div>
          <div className="mt-4">
            <Checkbox
              label="Send me a receipt via email"
              description="Get a copy of your order confirmation"
              colorScheme="blue"
              icon={<Mail className="w-3 h-3" />}
              defaultChecked
            />
          </div>
        </div>
      </section>

      {/* ==================== COMPONENT SHOWCASE ==================== */}

      <div className="border-b border-border pb-4 mb-8 mt-16">
        <h2 className="text-2xl font-bold text-foreground">
          🎨 Component Features Showcase
        </h2>
        <p className="text-muted-foreground">
          Explore all the customization options
        </p>
      </div>

      {/* Basic Checkboxes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Basic Checkboxes
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox label="Default Checkbox" />
          <Checkbox label="Checked by default" defaultChecked />
          <Checkbox label="Disabled Checkbox" disabled />
          <Checkbox label="Disabled & Checked" disabled defaultChecked />
          <Checkbox label="Read-only Checkbox" readOnly defaultChecked />
          <Checkbox label="Loading State" loading />
        </div>
      </section>

      {/* Check Styles */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Check Styles
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose from 20+ different check mark styles
        </p>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Checkbox label="Check" checkStyle="check" defaultChecked />
            <Checkbox label="Cross" checkStyle="cross" defaultChecked />
            <Checkbox label="Dot" checkStyle="dot" defaultChecked />
            <Checkbox label="Dash" checkStyle="dash" defaultChecked />
            <Checkbox label="Plus" checkStyle="plus" defaultChecked />
            <Checkbox label="Star" checkStyle="star" defaultChecked />
            <Checkbox
              label="Heart"
              checkStyle="heart"
              defaultChecked
              colorScheme="red"
            />
            <Checkbox
              label="Diamond"
              checkStyle="diamond"
              defaultChecked
              colorScheme="purple"
            />
            <Checkbox
              label="Shield"
              checkStyle="shield"
              defaultChecked
              colorScheme="blue"
            />
            <Checkbox
              label="Thumbs Up"
              checkStyle="thumbsUp"
              defaultChecked
              colorScheme="green"
            />
            <Checkbox
              label="Lightning"
              checkStyle="lightning"
              defaultChecked
              colorScheme="amber"
            />
            <Checkbox
              label="Fire"
              checkStyle="fire"
              defaultChecked
              colorScheme="orange"
            />
            <Checkbox
              label="Leaf"
              checkStyle="leaf"
              defaultChecked
              colorScheme="emerald"
            />
            <Checkbox
              label="Eye"
              checkStyle="eye"
              defaultChecked
              colorScheme="cyan"
            />
            <Checkbox
              label="Lock"
              checkStyle="lock"
              defaultChecked
              colorScheme="slate"
            />
            <Checkbox
              label="Bookmark"
              checkStyle="bookmark"
              defaultChecked
              colorScheme="pink"
            />
            <Checkbox
              label="Flag"
              checkStyle="flag"
              defaultChecked
              colorScheme="rose"
            />
            <Checkbox
              label="Bell"
              checkStyle="bell"
              defaultChecked
              colorScheme="yellow"
            />
            <Checkbox
              label="Crown"
              checkStyle="crown"
              defaultChecked
              colorScheme="amber"
            />
            <Checkbox
              label="Target"
              checkStyle="target"
              defaultChecked
              colorScheme="red"
            />
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Checkbox Shapes
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Checkbox label="Square" shape="square" defaultChecked />
            <Checkbox label="Rounded SM" shape="roundedSm" defaultChecked />
            <Checkbox label="Rounded" shape="rounded" defaultChecked />
            <Checkbox label="Rounded LG" shape="roundedLg" defaultChecked />
            <Checkbox label="Rounded XL" shape="roundedXl" defaultChecked />
            <Checkbox label="Circle" shape="circle" defaultChecked />
            <Checkbox label="Diamond" shape="diamond" defaultChecked />
            <Checkbox label="Squircle" shape="squircle" defaultChecked />
            <Checkbox label="Leaf" shape="leaf" defaultChecked />
            <Checkbox label="Blob" shape="blob" defaultChecked />
          </div>
        </div>
      </section>

      {/* Fill Styles */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Fill Styles
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Checkbox label="Filled" fillStyle="filled" defaultChecked />
            <Checkbox label="Outline" fillStyle="outline" defaultChecked />
            <Checkbox label="Soft" fillStyle="soft" defaultChecked />
            <Checkbox label="Ghost" fillStyle="ghost" defaultChecked />
            <Checkbox
              label="Gradient"
              fillStyle="gradient"
              colorScheme="gradientSunset"
              defaultChecked
            />
            <Checkbox label="Glass" fillStyle="glass" defaultChecked />
            <Checkbox
              label="Neon"
              fillStyle="neon"
              colorScheme="cyan"
              defaultChecked
            />
            <Checkbox
              label="Glow"
              fillStyle="glow"
              colorScheme="purple"
              glowIntensity="lg"
              defaultChecked
            />
            <Checkbox
              label="Shadow"
              fillStyle="shadow"
              shadowIntensity="lg"
              defaultChecked
            />
            <Checkbox label="3D" fillStyle="3d" defaultChecked />
            <Checkbox label="Raised" fillStyle="raised" defaultChecked />
            <Checkbox label="Inset" fillStyle="inset" defaultChecked />
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Animations
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Checkbox label="None" animation="none" />
            <Checkbox label="Scale" animation="scale" />
            <Checkbox label="Bounce" animation="bounce" />
            <Checkbox label="Slide" animation="slide" />
            <Checkbox label="Fade" animation="fade" />
            <Checkbox label="Spin" animation="spin" />
            <Checkbox label="Pulse" animation="pulse" />
            <Checkbox label="Shake" animation="shake" />
            <Checkbox label="Flip" animation="flip" />
            <Checkbox label="Jelly" animation="jelly" />
            <Checkbox label="Rubber Band" animation="rubberBand" />
            <Checkbox label="Swing" animation="swing" />
            <Checkbox label="Tada" animation="tada" />
            <Checkbox label="Heartbeat" animation="heartbeat" />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Size Variations
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <div className="flex flex-wrap items-end gap-4">
            <Checkbox size="xs" label="Extra Small" defaultChecked />
            <Checkbox size="sm" label="Small" defaultChecked />
            <Checkbox size="md" label="Medium" defaultChecked />
            <Checkbox size="lg" label="Large" defaultChecked />
            <Checkbox size="xl" label="Extra Large" defaultChecked />
            <Checkbox size="2xl" label="2XL" defaultChecked />
            <Checkbox size="3xl" label="3XL" defaultChecked />
            <Checkbox size="4xl" label="4XL" defaultChecked />
          </div>
        </div>
      </section>

      {/* Color Schemes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Color Schemes
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Standard Colors
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
              <Checkbox label="Default" colorScheme="default" defaultChecked />
              <Checkbox label="Primary" colorScheme="primary" defaultChecked />
              <Checkbox
                label="Secondary"
                colorScheme="secondary"
                defaultChecked
              />
              <Checkbox label="Success" colorScheme="success" defaultChecked />
              <Checkbox label="Warning" colorScheme="warning" defaultChecked />
              <Checkbox label="Error" colorScheme="error" defaultChecked />
              <Checkbox label="Info" colorScheme="info" defaultChecked />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              Gradient Schemes
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Checkbox
                label="Sunset"
                colorScheme="gradientSunset"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Ocean"
                colorScheme="gradientOcean"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Forest"
                colorScheme="gradientForest"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Fire"
                colorScheme="gradientFire"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Night"
                colorScheme="gradientNight"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Rainbow"
                colorScheme="gradientRainbow"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Neon"
                colorScheme="gradientNeon"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Pastel"
                colorScheme="gradientPastel"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Metallic"
                colorScheme="gradientMetallic"
                fillStyle="gradient"
                defaultChecked
              />
              <Checkbox
                label="Aurora"
                colorScheme="gradientAurora"
                fillStyle="gradient"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </section>

      {/* Indeterminate State */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Indeterminate State (Select All)
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50 space-y-4">
          <Checkbox
            label="Select All"
            checked={selectAll}
            indeterminate={indeterminate}
            onCheckedChange={handleSelectAll}
            colorScheme="primary"
          />
          <div className="ml-6 space-y-3 border-l-2 border-border pl-4">
            <Checkbox
              label="Item 1"
              value="item1"
              checked={selectedItems.includes("item1")}
              onCheckedChange={(checked: boolean) => {
                setSelectedItems(
                  checked
                    ? [...selectedItems, "item1"]
                    : selectedItems.filter((i) => i !== "item1")
                );
              }}
            />
            <Checkbox
              label="Item 2"
              value="item2"
              checked={selectedItems.includes("item2")}
              onCheckedChange={(checked: boolean) => {
                setSelectedItems(
                  checked
                    ? [...selectedItems, "item2"]
                    : selectedItems.filter((i) => i !== "item2")
                );
              }}
            />
            <Checkbox
              label="Item 3"
              value="item3"
              checked={selectedItems.includes("item3")}
              onCheckedChange={(checked: boolean) => {
                setSelectedItems(
                  checked
                    ? [...selectedItems, "item3"]
                    : selectedItems.filter((i) => i !== "item3")
                );
              }}
            />
          </div>
        </div>
      </section>

      {/* CheckboxGroup */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Checkbox Group
        </h3>
        <div className="glass p-6 rounded-2xl border border-border/50">
          <CheckboxGroup
            label="Select Features"
            description="Choose the features you want to enable"
            value={selectedFeatures}
            onChange={setSelectedFeatures}
            colorScheme="primary"
          >
            <Checkbox
              value="notifications"
              label="Notifications"
              description="Receive updates and alerts"
            />
            <Checkbox
              value="analytics"
              label="Analytics"
              description="Track your usage statistics"
            />
            <Checkbox
              value="api"
              label="API Access"
              description="Enable API integrations"
            />
            <Checkbox
              value="support"
              label="Priority Support"
              description="Get priority customer support"
            />
          </CheckboxGroup>
        </div>
      </section>

      {/* Card Style Checkboxes */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          Card Style Checkboxes
        </h3>
        <CheckboxGroup
          label="Select Services"
          description="Choose the services you need"
          value={selectedServices}
          onChange={setSelectedServices}
          card
          colorScheme="primary"
        >
          <Checkbox
            value="hosting"
            label="Web Hosting"
            description="Fast and reliable hosting with 99.9% uptime"
            icon={<Cloud className="w-6 h-6" />}
            badge="Popular"
          />
          <Checkbox
            value="database"
            label="Database"
            description="Managed database with automatic backups"
            icon={<Database className="w-6 h-6" />}
            recommended
          />
          <Checkbox
            value="cdn"
            label="CDN"
            description="Global content delivery network"
            icon={<Globe className="w-6 h-6" />}
            badge="Fast"
          />
        </CheckboxGroup>
      </section>

      {/* Current Selections Display */}
      <section className="glass p-6 rounded-2xl border border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Current Selections
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Features:</span>
            <span className="font-medium text-foreground">
              {selectedFeatures.length > 0
                ? selectedFeatures.join(", ")
                : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Services:</span>
            <span className="font-medium text-foreground">
              {selectedServices.length > 0
                ? selectedServices.join(", ")
                : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Add-ons:</span>
            <span className="font-medium text-foreground">
              {selectedAddons.length > 0 ? selectedAddons.join(", ") : "None"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Selected Items:</span>
            <span className="font-medium text-foreground">
              {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckboxExample;
