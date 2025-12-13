import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "../components/Select";
import type { SelectOption } from "../components/Select/Select.types";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Crown,
  Zap,
  Shield,
  Globe,
  Code,
  Palette,
  Music,
  Camera,
  Book,
} from "lucide-react";

export const SelectExample = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  // For component-based pattern
  const [selectedFruit, setSelectedFruit] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Sample options
  const countryOptions: SelectOption[] = [
    {
      value: "us",
      label: "United States",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      value: "uk",
      label: "United Kingdom",
      icon: <Globe className="w-4 h-4" />,
    },
    { value: "ca", label: "Canada", icon: <Globe className="w-4 h-4" /> },
    { value: "au", label: "Australia", icon: <Globe className="w-4 h-4" /> },
    { value: "de", label: "Germany", icon: <Globe className="w-4 h-4" /> },
    { value: "fr", label: "France", icon: <Globe className="w-4 h-4" /> },
    { value: "jp", label: "Japan", icon: <Globe className="w-4 h-4" /> },
    { value: "in", label: "India", icon: <Globe className="w-4 h-4" /> },
  ];

  const skillOptions: SelectOption[] = [
    {
      value: "react",
      label: "React",
      description: "JavaScript library for UIs",
      icon: <Code className="w-4 h-4" />,
      group: "Frontend",
    },
    {
      value: "vue",
      label: "Vue.js",
      description: "Progressive JavaScript framework",
      icon: <Code className="w-4 h-4" />,
      group: "Frontend",
    },
    {
      value: "angular",
      label: "Angular",
      description: "Platform for web applications",
      icon: <Code className="w-4 h-4" />,
      group: "Frontend",
    },
    {
      value: "node",
      label: "Node.js",
      description: "JavaScript runtime environment",
      icon: <Shield className="w-4 h-4" />,
      group: "Backend",
    },
    {
      value: "python",
      label: "Python",
      description: "High-level programming language",
      icon: <Shield className="w-4 h-4" />,
      group: "Backend",
    },
    {
      value: "java",
      label: "Java",
      description: "Object-oriented language",
      icon: <Shield className="w-4 h-4" />,
      group: "Backend",
    },
  ];

  const roleOptions: SelectOption[] = [
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access",
      icon: <Crown className="w-4 h-4" />,
    },
    {
      value: "editor",
      label: "Editor",
      description: "Can edit and publish content",
      icon: <Star className="w-4 h-4" />,
    },
    {
      value: "viewer",
      label: "Viewer",
      description: "Read-only access",
      icon: <User className="w-4 h-4" />,
    },
    {
      value: "contributor",
      label: "Contributor",
      description: "Can create draft content",
      icon: <Zap className="w-4 h-4" />,
      disabled: true,
    },
  ];

  const hobbyOptions: SelectOption[] = [
    { value: "music", label: "Music", icon: <Music className="w-4 h-4" /> },
    {
      value: "photography",
      label: "Photography",
      icon: <Camera className="w-4 h-4" />,
    },
    { value: "reading", label: "Reading", icon: <Book className="w-4 h-4" /> },
    {
      value: "art",
      label: "Art & Design",
      icon: <Palette className="w-4 h-4" />,
    },
    { value: "coding", label: "Coding", icon: <Code className="w-4 h-4" /> },
    { value: "gaming", label: "Gaming", icon: <Zap className="w-4 h-4" /> },
  ];

  const teamMembers: SelectOption[] = [
    {
      value: "alice",
      label: "Alice Johnson",
      description: "alice@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      value: "bob",
      label: "Bob Smith",
      description: "bob@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      value: "carol",
      label: "Carol Williams",
      description: "carol@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      value: "dave",
      label: "Dave Brown",
      description: "dave@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ];

  const priorityOptions: SelectOption[] = [
    {
      value: "low",
      label: "Low Priority",
      icon: <Star className="w-4 h-4 text-blue-500" />,
    },
    {
      value: "medium",
      label: "Medium Priority",
      icon: <Star className="w-4 h-4 text-yellow-500" />,
    },
    {
      value: "high",
      label: "High Priority",
      icon: <Star className="w-4 h-4 text-orange-500" />,
    },
    {
      value: "critical",
      label: "Critical Priority",
      icon: <Star className="w-4 h-4 text-red-500" />,
    },
  ];

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          Select Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Advanced select dropdown with search, multi-select, icons, avatars,
          and more. Supports both props-based and component-based patterns.
        </p>
      </div>

      {/* Component-Based Pattern Examples */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Component-Based Pattern (Composable)
          </h3>
          <p className="text-muted-foreground mb-6">
            Use Select, SelectTrigger, SelectContent, and SelectItem for full
            control
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Simple Fruit Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Select a Fruit
            </label>
            <Select value={selectedFruit} onValueChange={setSelectedFruit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedFruit && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFruit}
              </p>
            )}
          </div>

          {/* Programming Languages with Groups */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Programming Language
            </label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Frontend</SelectLabel>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Backend</SelectLabel>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Mobile</SelectLabel>
                  <SelectItem value="swift">Swift</SelectItem>
                  <SelectItem value="kotlin">Kotlin</SelectItem>
                  <SelectItem value="dart">Dart</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedLanguage && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedLanguage}
              </p>
            )}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* Props-Based Pattern Examples */}
      <section className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            Props-Based Pattern (Options Array)
          </h3>
          <p className="text-muted-foreground mb-6">
            Use the options prop for quick implementation with advanced features
          </p>
        </div>
      </section>

      {/* Basic Select */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Basic Select
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple single selection dropdown
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            value={selectedCountry}
            onChange={(value) => setSelectedCountry(value as string)}
          />
          <Select
            label="Priority"
            placeholder="Select priority level"
            options={priorityOptions}
            clearable
          />
        </div>
      </section>

      {/* With Icons and Descriptions */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Icons and Descriptions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Options with icons and descriptive text
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="User Role"
            description="Select the user's permission level"
            placeholder="Choose a role"
            options={roleOptions}
            value={selectedRole}
            onChange={(value) => setSelectedRole(value as string)}
            icon={<User className="w-4 h-4" />}
          />
          <Select
            label="Contact Method"
            placeholder="How should we contact you?"
            options={[
              {
                value: "email",
                label: "Email",
                icon: <Mail className="w-4 h-4" />,
                description: "We'll send you an email",
              },
              {
                value: "phone",
                label: "Phone",
                icon: <Phone className="w-4 h-4" />,
                description: "We'll give you a call",
              },
              {
                value: "address",
                label: "Mail",
                icon: <MapPin className="w-4 h-4" />,
                description: "We'll send physical mail",
              },
            ]}
            clearable
          />
        </div>
      </section>

      {/* Multi-Select */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Multi-Select
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select multiple options with checkmarks
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Programming Skills"
            description="Select all technologies you know"
            placeholder="Choose your skills"
            options={skillOptions}
            value={selectedSkills}
            onChange={(value) => setSelectedSkills(value as string[])}
            multiple
            clearable
          />
          <Select
            label="Hobbies"
            placeholder="What do you enjoy?"
            options={hobbyOptions}
            value={selectedHobbies}
            onChange={(value) => setSelectedHobbies(value as string[])}
            multiple
            maxSelections={3}
            helperText="Select up to 3 hobbies"
            clearable
          />
        </div>
      </section>

      {/* Searchable Select */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Searchable Select
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Filter options with search functionality
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Country (Searchable)"
            placeholder="Search for a country"
            options={countryOptions}
            searchable
            clearable
          />
          <Select
            label="Skills (Searchable Multi-Select)"
            placeholder="Search and select skills"
            options={skillOptions}
            searchable
            multiple
            clearable
          />
        </div>
      </section>

      {/* With Avatars */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Avatars
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with user avatars
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Assign to Team Member"
            placeholder="Select a team member"
            options={teamMembers}
            clearable
          />
          <Select
            label="Project Team"
            placeholder="Select team members"
            options={teamMembers}
            multiple
            clearable
          />
        </div>
      </section>

      {/* Different Variants */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Variants
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select components with various color themes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select
            label="Default Variant"
            variant="default"
            options={priorityOptions}
            placeholder="Default style"
          />
          <Select
            label="Primary Variant"
            variant="primary"
            options={priorityOptions}
            placeholder="Primary style"
          />
          <Select
            label="Secondary Variant"
            variant="secondary"
            options={priorityOptions}
            placeholder="Secondary style"
          />
          <Select
            label="Success Variant"
            variant="success"
            options={priorityOptions}
            placeholder="Success style"
          />
          <Select
            label="Warning Variant"
            variant="warning"
            options={priorityOptions}
            placeholder="Warning style"
          />
          <Select
            label="Error Variant"
            variant="error"
            options={priorityOptions}
            placeholder="Error style"
          />
          <Select
            label="Ghost Variant"
            variant="ghost"
            options={priorityOptions}
            placeholder="Ghost style"
          />
          <Select
            label="Outline Variant"
            variant="outline"
            options={priorityOptions}
            placeholder="Outline style"
          />
          <Select
            label="Glass Variant"
            variant="glass"
            options={priorityOptions}
            placeholder="Glass style"
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Sizes
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Small, medium, and large select components
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Small Size"
            size="sm"
            options={priorityOptions}
            placeholder="Small select"
          />
          <Select
            label="Medium Size"
            size="md"
            options={priorityOptions}
            placeholder="Medium select"
          />
          <Select
            label="Large Size"
            size="lg"
            options={priorityOptions}
            placeholder="Large select"
          />
        </div>
      </section>

      {/* With Validation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Validation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with error states and helper text
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Required Field"
            placeholder="Please select an option"
            options={roleOptions}
            required
            error="This field is required"
          />
          <Select
            label="With Helper Text"
            placeholder="Choose wisely"
            options={roleOptions}
            helperText="This selection cannot be changed later"
          />
        </div>
      </section>

      {/* Disabled and Loading States */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Disabled and Loading States
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select with disabled and loading states
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Disabled Select"
            placeholder="This select is disabled"
            options={roleOptions}
            disabled
          />
          <Select
            label="Loading Select"
            placeholder="Loading options..."
            options={roleOptions}
            loading
          />
        </div>
      </section>

      {/* Grouped Options */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Grouped Options
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Options organized into groups
          </p>
        </div>
        <Select
          label="Programming Skills (Grouped)"
          placeholder="Select your skills"
          options={skillOptions}
          searchable
          multiple
          clearable
        />
      </section>

      {/* Custom Max Height */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Custom Max Height
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Limit dropdown height with scrolling
          </p>
        </div>
        <Select
          label="Skills with Short Dropdown"
          placeholder="Select skills"
          options={skillOptions}
          maxHeight="150px"
          searchable
        />
      </section>

      {/* Without Checkmarks */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Without Checkmarks
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Hide checkmark indicators
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="No Checkmarks (Single)"
            placeholder="Select one"
            options={roleOptions}
            showCheckmarks={false}
          />
          <Select
            label="No Checkmarks (Multiple)"
            placeholder="Select multiple"
            options={hobbyOptions}
            multiple
            showCheckmarks={false}
          />
        </div>
      </section>

      {/* Don't Close on Select */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Keep Open on Select
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown stays open after selection
          </p>
        </div>
        <Select
          label="Skills (Stays Open)"
          placeholder="Select multiple skills"
          options={skillOptions}
          multiple
          closeOnSelect={false}
          clearable
        />
      </section>
    </div>
  );
};

export default SelectExample;
