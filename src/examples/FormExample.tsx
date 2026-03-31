import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormSection,
  FormActions,
} from "../components/Form";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import Button from "../components/Button";

// ===========================
// Type Definitions
// ===========================

interface BasicFormData {
  username: string;
  email: string;
  password: string;
  bio?: string;
  agreeToTerms: boolean;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

// ===========================
// Form Examples
// ===========================

export const FormExample = () => {
  // ===========================
  // Submit Handlers
  // ===========================

  const handleBasicSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: BasicFormData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      bio: formData.get("bio") as string,
      agreeToTerms: formData.get("agreeToTerms") === "on",
    };
    console.log("Basic form submitted:", data);
    alert(`Welcome, ${data.username}!`);
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: ProfileFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
    };
    console.log("Profile form submitted:", data);
    alert(`Profile updated for ${data.firstName} ${data.lastName}`);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    };
    console.log("Contact form:", data);
    alert("Message sent");
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const email = fd.get("email");
    console.log("Newsletter:", email);
    alert(`Subscribed: ${email}`);
  };

  return (
    <div className="space-y-16 p-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4 pb-8 border-b-2 border-border/50">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Form Component
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced form components with support for React Hook Form, Yup, and
          Zod validation. Works standalone or integrated with validation
          libraries.
        </p>
      </div>

      <div className="space-y-20">
        {/* ===== BASIC FORM EXAMPLES ===== */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Basic Forms</h2>
          </div>

          {/* Basic Form - Default */}
          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Default Form
            </h3>
            <Form
              onSubmit={handleBasicSubmit}
              variant="default"
              className="max-w-md mx-auto p-6"
            >
              <FormItem>
                <FormLabel htmlFor="username" required>
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                  />
                </FormControl>
                <FormDescription>
                  Choose a unique username for your account
                </FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="email" required>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="password" required>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </FormControl>
                <FormDescription>
                  Must be at least 8 characters long
                </FormDescription>
              </FormItem>

              <FormActions>
                <Button type="submit" variant="primary">
                  Create Account
                </Button>
              </FormActions>
            </Form>
          </div>

          {/* Primary Variant */}
          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Primary Variant
            </h3>
            <Form
              onSubmit={handleBasicSubmit}
              variant="primary"
              className="max-w-md mx-auto"
            >
              <FormItem>
                <FormLabel htmlFor="name-primary" variant="primary" required>
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    id="name-primary"
                    name="name"
                    placeholder="John Doe"
                    variant="primary"
                    required
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="email-primary" variant="primary" required>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    id="email-primary"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    variant="primary"
                    required
                  />
                </FormControl>
              </FormItem>

              <FormActions>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </FormActions>
            </Form>
          </div>

          {/* Glass Variant */}
          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-glass/50 backdrop-blur animate-pulse" />
              Glass Variant
            </h3>
            <Form
              onSubmit={handleBasicSubmit}
              variant="glass"
              className="max-w-md mx-auto"
            >
              <FormItem>
                <FormLabel htmlFor="title-glass">Project Title</FormLabel>
                <FormControl>
                  <Input
                    id="title-glass"
                    name="title"
                    placeholder="My Awesome Project"
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel htmlFor="description-glass">Description</FormLabel>
                <FormControl>
                  <TextArea
                    id="description-glass"
                    name="description"
                    placeholder="Describe your project..."
                    rows={4}
                  />
                </FormControl>
              </FormItem>

              <FormActions align="center">
                <Button type="submit" variant="glass">
                  Create Project
                </Button>
              </FormActions>
            </Form>
          </div>
        </section>

        {/* ===== COMPACT API EXAMPLES ===== */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Compact API</h2>
          </div>

          {/* Compact Form - Contact */}
          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Contact Form (Compact)
            </h3>
            <div className="max-w-md mx-auto">
              <Form
                onSubmit={handleContactSubmit}
                variant="accent"
                className="p-4"
              >
                <FormItem>
                  <FormLabel htmlFor="contact-name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="contact-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="contact-subject">Subject</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="What is this about?"
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="contact-message">Message</FormLabel>
                  <FormControl>
                    <TextArea
                      id="contact-message"
                      name="message"
                      placeholder="Your message here..."
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Please be as detailed as possible
                  </FormDescription>
                </FormItem>

                <FormActions>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => alert("Cancelled")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Send Message
                  </Button>
                </FormActions>
              </Form>
            </div>
          </div>

          {/* Compact Form - Newsletter */}
          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Newsletter Signup (Inline)
            </h3>
            <div className="max-w-2xl mx-auto">
              <Form
                onSubmit={handleNewsletterSubmit}
                variant="success"
                layout="inline"
                className="max-w-full"
              >
                <FormItem>
                  <FormControl>
                    <Input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </FormControl>
                </FormItem>
                <FormActions>
                  <Button type="submit" variant="primary">
                    Subscribe
                  </Button>
                </FormActions>
              </Form>
            </div>
          </div>
        </section>

        {/* ===== FORM SECTIONS ===== */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-secondary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Form with Sections</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <Form
              onSubmit={handleProfileSubmit}
              variant="outline"
              className="max-w-2xl mx-auto"
            >
              <FormSection
                title="Personal Information"
                description="Basic details about you"
                variant="primary"
                divider
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel htmlFor="firstName" required>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel htmlFor="lastName" required>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel htmlFor="profileEmail" required>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="profileEmail"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="phone" optional>
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </FormControl>
                </FormItem>
              </FormSection>

              <FormSection
                title="Address"
                description="Where can we reach you?"
                variant="secondary"
                divider
              >
                <FormItem>
                  <FormLabel htmlFor="address">Street Address</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main St"
                    />
                  </FormControl>
                </FormItem>

                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormControl>
                      <Input id="city" name="city" placeholder="New York" />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <FormControl>
                      <Input id="country" name="country" placeholder="USA" />
                    </FormControl>
                  </FormItem>
                </div>
              </FormSection>

              <FormActions align="between">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Profile
                  </Button>
                </div>
              </FormActions>
            </Form>
          </div>
        </section>

        {/* ===== VALIDATION STATES ===== */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-warning to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Validation States</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <Form
              onSubmit={(data: any) => console.log(data)}
              variant="default"
              className="max-w-md mx-auto space-y-6 p-6"
            >
              <FormItem>
                <FormLabel variant="error">Username (Error State)</FormLabel>
                <FormControl>
                  <Input variant="error" defaultValue="a" />
                </FormControl>
                <FormMessage variant="error">
                  Username must be at least 3 characters long
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel variant="success">Email (Success State)</FormLabel>
                <FormControl>
                  <Input variant="success" defaultValue="user@example.com" />
                </FormControl>
                <FormMessage variant="success">Email is available!</FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel variant="warning">
                  Password (Warning State)
                </FormLabel>
                <FormControl>
                  <Input
                    variant="warning"
                    type="password"
                    defaultValue="pass123"
                  />
                </FormControl>
                <FormMessage variant="warning">
                  Password strength: Weak
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel variant="info">Bio (Info State)</FormLabel>
                <FormControl>
                  <TextArea variant="info" rows={3} />
                </FormControl>
                <FormMessage variant="info">
                  Tell us about yourself (optional)
                </FormMessage>
              </FormItem>
            </Form>
          </div>
        </section>

        {/* ===== ALL VARIANTS ===== */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-info to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">All Form Variants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(
              [
                "default",
                "primary",
                "secondary",
                "accent",
                "success",
                "warning",
                "error",
                "info",
                "outline",
                "glass",
              ] as const
            ).map((variant) => (
              <div
                key={variant}
                className="bg-card/30 border border-border/50 rounded-xl p-6"
              >
                <h4 className="text-base font-semibold mb-4 capitalize flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {variant}
                </h4>
                <Form
                  onSubmit={(data: any) => console.log(data)}
                  variant={variant}
                  spacing="sm"
                >
                  <FormItem>
                    <FormLabel variant={variant}>Name</FormLabel>
                    <FormControl>
                      <Input
                        variant={variant === "default" ? "outline" : variant}
                        placeholder="Enter name"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel variant={variant}>Email</FormLabel>
                    <FormControl>
                      <Input
                        variant={variant === "default" ? "outline" : variant}
                        type="email"
                        placeholder="Enter email"
                      />
                    </FormControl>
                  </FormItem>

                  <FormActions>
                    <Button
                      type="submit"
                      variant={variant === "default" ? "primary" : variant}
                      size="sm"
                    >
                      Submit
                    </Button>
                  </FormActions>
                </Form>
              </div>
            ))}
          </div>
        </section>

        {/* ===== LOADING STATE ===== */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <h2 className="text-3xl font-bold">Loading State</h2>
          </div>

          <div className="bg-card/30 border border-border/50 rounded-2xl p-8">
            <Form
              onSubmit={(data: any) => console.log(data)}
              variant="primary"
              loading={true}
              className="max-w-md mx-auto"
            >
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Loading..." />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Loading..." />
                </FormControl>
              </FormItem>

              <FormActions>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </FormActions>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormExample;
