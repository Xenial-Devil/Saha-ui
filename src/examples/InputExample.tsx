import { Input } from "../components/Input";
import { Search, Mail, Lock, User, Eye, EyeOff, AtSign } from "lucide-react";
import { useState } from "react";

export const InputExample = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Input Component</h3>

      {/* All Variants */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">All Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary</p>
            <Input variant="primary" placeholder="Primary variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary</p>
            <Input variant="secondary" placeholder="Secondary variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Accent</p>
            <Input variant="accent" placeholder="Accent variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Info</p>
            <Input variant="info" placeholder="Info variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Success</p>
            <Input variant="success" placeholder="Success variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Warning</p>
            <Input variant="warning" placeholder="Warning variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Error</p>
            <Input variant="error" placeholder="Error variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Outline (Default)
            </p>
            <Input variant="outline" placeholder="Outline variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Ghost</p>
            <Input variant="ghost" placeholder="Ghost variant" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Glass</p>
            <Input variant="glass" placeholder="Glass variant" />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small</p>
            <Input size="sm" placeholder="Small input" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Medium (Default)
            </p>
            <Input size="md" placeholder="Medium input" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Large</p>
            <Input size="lg" placeholder="Large input" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Extra Large</p>
            <Input size="xl" placeholder="Extra large input" />
          </div>
        </div>
      </div>

      {/* With Labels */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">With Labels</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Username" placeholder="Enter your username" />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            helperText="We'll never share your email"
          />

          <Input label="Full Name" placeholder="John Doe" required />

          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            helperText="Include country code"
          />
        </div>
      </div>

      {/* With Icons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Search"
            startIcon={<Search size={18} />}
            placeholder="Search..."
          />

          <Input
            label="Email Address"
            type="email"
            startIcon={<Mail size={18} />}
            placeholder="you@example.com"
          />

          <Input
            label="Username"
            startIcon={<AtSign size={18} />}
            placeholder="username"
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            startIcon={<Lock size={18} />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pointer-events-auto cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            placeholder="Enter password"
          />
        </div>
      </div>

      {/* Validation with Error Prop */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Validation States
        </h4>
        <div className="space-y-4">
          <Input
            label="Success Input"
            variant="success"
            defaultValue="john.doe@example.com"
            helperText="Email is available!"
            startIcon={<Mail size={18} />}
          />

          <Input
            label="Error Input"
            variant="error"
            error="This field is required"
            placeholder="Enter value..."
          />

          <Input
            label="Warning Input"
            variant="warning"
            helperText="This username might be taken"
            defaultValue="johndoe"
            startIcon={<User size={18} />}
          />

          <Input
            label="Info Input"
            variant="info"
            helperText="Additional information required"
            placeholder="Enter details..."
          />
        </div>
      </div>

      {/* Character Counter */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Character Counter
        </h4>
        <div className="space-y-4">
          <Input
            label="Bio"
            placeholder="Tell us about yourself..."
            maxLength={100}
            showCounter
            helperText="Maximum 100 characters"
          />

          <Input
            label="Tweet"
            variant="info"
            placeholder="What's happening?"
            maxLength={280}
            showCounter
          />
        </div>
      </div>

      {/* Full Width */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Full Width</h4>
        <div className="space-y-4">
          <Input
            fullWidth
            label="Full Name"
            placeholder="Enter your full name"
            variant="outline"
          />

          <Input
            fullWidth
            label="Address"
            placeholder="123 Main St, City, Country"
            variant="secondary"
          />
        </div>
      </div>

      {/* Disabled State */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Disabled</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Disabled Input"
            placeholder="Cannot edit this"
            disabled
          />

          <Input
            label="Disabled with Value"
            defaultValue="This is disabled"
            disabled
            startIcon={<Lock size={18} />}
          />
        </div>
      </div>

      {/* Different Input Types */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Input Types</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Date" type="date" variant="outline" />

          <Input label="Time" type="time" variant="outline" />

          <Input
            label="Number"
            type="number"
            placeholder="0"
            variant="outline"
          />

          <Input label="Color" type="color" variant="outline" />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="outline"
          />

          <Input label="Password" type="password" variant="outline" />

          <Input
            label="URL"
            type="url"
            placeholder="https://example.com"
            variant="outline"
          />

          <Input label="Search" type="search" placeholder="Search..." />
        </div>
      </div>

      {/* Login Form Example */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Login Form Example
        </h4>
        <div className="max-w-md mx-auto glass p-8 rounded-2xl">
          <h5 className="text-xl font-bold mb-6 text-center">Sign In</h5>
          <div className="space-y-4">
            <Input
              fullWidth
              label="Email"
              type="email"
              variant="glass"
              startIcon={<Mail size={18} />}
              placeholder="you@example.com"
              required
            />

            <Input
              fullWidth
              label="Password"
              type="password"
              variant="glass"
              startIcon={<Lock size={18} />}
              placeholder="Enter your password"
              required
            />

            <button className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold hover:brightness-110 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
