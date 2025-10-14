import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownGroup,
} from "../components/Dropdown";
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  File,
  Folder,
  Download,
  Upload,
  Copy,
  Trash2,
  Star,
  Crown,
  Zap,
  Shield,
  Award,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Home,
  Search,
  Check,
  X,
  AlertCircle,
  Info,
} from "lucide-react";

export const DropdownExample = () => {
  const [selectedAction, setSelectedAction] = useState<string | string[]>("");
  const [selectedFiles, setSelectedFiles] = useState<string | string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<
    string | string[]
  >([]);

  const users = [
    {
      value: "john",
      label: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      value: "jane",
      label: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      value: "bob",
      label: "Bob Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      value: "alice",
      label: "Alice Williams",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ];

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          Dropdown Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Advanced dropdown menus with keyboard navigation, search, and
          beautiful animations.
        </p>
      </div>

      {/* Basic Dropdown */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Basic Dropdown
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple dropdown with options
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dropdown
            placeholder="Select Action"
            value={selectedAction}
            onChange={setSelectedAction}
            options={[
              {
                value: "new",
                label: "New File",
                icon: <File className="w-4 h-4" />,
              },
              {
                value: "open",
                label: "Open",
                icon: <Folder className="w-4 h-4" />,
              },
              {
                value: "save",
                label: "Save",
                icon: <Download className="w-4 h-4" />,
              },
              {
                value: "export",
                label: "Export",
                icon: <Upload className="w-4 h-4" />,
              },
            ]}
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
            Dropdown with different color variants
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dropdown
            variant="default"
            placeholder="Default"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="primary"
            placeholder="Primary"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="secondary"
            placeholder="Secondary"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="accent"
            placeholder="Accent"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="success"
            placeholder="Success"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="warning"
            placeholder="Warning"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="error"
            placeholder="Error"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="ghost"
            placeholder="Ghost"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            variant="glass"
            placeholder="Glass"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
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
            Small, medium, and large dropdowns
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Dropdown
            size="sm"
            placeholder="Small"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            size="md"
            placeholder="Medium"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            size="lg"
            placeholder="Large"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Icons
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown options with custom icons
          </p>
        </div>
        <Dropdown
          placeholder="Select Action"
          variant="primary"
          options={[
            {
              value: "copy",
              label: "Copy",
              icon: <Copy className="w-4 h-4" />,
              shortcut: "⌘C",
            },
            {
              value: "cut",
              label: "Cut",
              icon: <X className="w-4 h-4" />,
              shortcut: "⌘X",
            },
            {
              value: "paste",
              label: "Paste",
              icon: <File className="w-4 h-4" />,
              shortcut: "⌘V",
            },
            {
              value: "delete",
              label: "Delete",
              icon: <Trash2 className="w-4 h-4" />,
              shortcut: "⌘D",
            },
          ]}
        />
      </section>

      {/* With Avatars */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Avatars
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown with user avatars
          </p>
        </div>
        <Dropdown placeholder="Assign to..." variant="accent" options={users} />
      </section>

      {/* With Descriptions */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Descriptions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown options with descriptions
          </p>
        </div>
        <Dropdown
          placeholder="Choose Plan"
          variant="primary"
          options={[
            {
              value: "free",
              label: "Free",
              description: "For personal projects",
              icon: <Star className="w-4 h-4" />,
              badge: "$0",
            },
            {
              value: "pro",
              label: "Pro",
              description: "For professional use",
              icon: <Crown className="w-4 h-4" />,
              badge: "$29",
            },
            {
              value: "enterprise",
              label: "Enterprise",
              description: "For large organizations",
              icon: <Shield className="w-4 h-4" />,
              badge: "$99",
            },
          ]}
        />
      </section>

      {/* With Badges */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Badges
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Options with status badges
          </p>
        </div>
        <Dropdown
          placeholder="Select Feature"
          options={[
            {
              value: "notifications",
              label: "Notifications",
              icon: <Bell className="w-4 h-4" />,
              badge: "New",
            },
            {
              value: "email",
              label: "Email",
              icon: <Mail className="w-4 h-4" />,
              badge: "5",
            },
            {
              value: "messages",
              label: "Messages",
              icon: <MessageSquare className="w-4 h-4" />,
              badge: "Beta",
            },
          ]}
        />
      </section>

      {/* With Shortcuts */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Keyboard Shortcuts
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Display keyboard shortcuts
          </p>
        </div>
        <Dropdown
          placeholder="Actions"
          variant="glass"
          options={[
            {
              value: "save",
              label: "Save",
              icon: <Download className="w-4 h-4" />,
              shortcut: "⌘S",
            },
            {
              value: "open",
              label: "Open",
              icon: <Folder className="w-4 h-4" />,
              shortcut: "⌘O",
            },
            {
              value: "search",
              label: "Search",
              icon: <Search className="w-4 h-4" />,
              shortcut: "⌘K",
            },
            {
              value: "home",
              label: "Go Home",
              icon: <Home className="w-4 h-4" />,
              shortcut: "⌘H",
            },
          ]}
        />
      </section>

      {/* Searchable Dropdown */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Searchable Dropdown
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Filter options with search
          </p>
        </div>
        <Dropdown
          searchable
          placeholder="Search users..."
          variant="primary"
          options={[
            {
              value: "john",
              label: "John Doe",
              avatar: "https://i.pravatar.cc/150?img=1",
            },
            {
              value: "jane",
              label: "Jane Smith",
              avatar: "https://i.pravatar.cc/150?img=2",
            },
            {
              value: "bob",
              label: "Bob Johnson",
              avatar: "https://i.pravatar.cc/150?img=3",
            },
            {
              value: "alice",
              label: "Alice Williams",
              avatar: "https://i.pravatar.cc/150?img=4",
            },
            {
              value: "charlie",
              label: "Charlie Brown",
              avatar: "https://i.pravatar.cc/150?img=5",
            },
            {
              value: "david",
              label: "David Lee",
              avatar: "https://i.pravatar.cc/150?img=6",
            },
            {
              value: "emma",
              label: "Emma Wilson",
              avatar: "https://i.pravatar.cc/150?img=7",
            },
            {
              value: "frank",
              label: "Frank Miller",
              avatar: "https://i.pravatar.cc/150?img=8",
            },
          ]}
        />
      </section>

      {/* Multi-Select */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Multi-Select
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select multiple options
          </p>
        </div>
        <Dropdown
          multiple
          placeholder="Select files..."
          value={selectedFiles}
          onChange={setSelectedFiles}
          variant="accent"
          options={[
            {
              value: "doc1",
              label: "Document.pdf",
              icon: <File className="w-4 h-4" />,
            },
            {
              value: "doc2",
              label: "Report.docx",
              icon: <File className="w-4 h-4" />,
            },
            {
              value: "img1",
              label: "Image.png",
              icon: <File className="w-4 h-4" />,
            },
            {
              value: "video1",
              label: "Video.mp4",
              icon: <File className="w-4 h-4" />,
            },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {Array.isArray(selectedFiles) ? selectedFiles.join(", ") : "None"}
        </p>
      </section>

      {/* Multi-Select with Search */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Multi-Select with Search
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Search and select multiple options
          </p>
        </div>
        <Dropdown
          multiple
          searchable
          placeholder="Select preferences..."
          value={selectedPreferences}
          onChange={setSelectedPreferences}
          variant="success"
          options={[
            {
              value: "notifications",
              label: "Notifications",
              icon: <Bell className="w-4 h-4" />,
            },
            {
              value: "email",
              label: "Email Updates",
              icon: <Mail className="w-4 h-4" />,
            },
            {
              value: "messages",
              label: "Messages",
              icon: <MessageSquare className="w-4 h-4" />,
            },
            {
              value: "calendar",
              label: "Calendar Sync",
              icon: <Calendar className="w-4 h-4" />,
            },
            {
              value: "dark-mode",
              label: "Dark Mode",
              icon: <Star className="w-4 h-4" />,
            },
            {
              value: "analytics",
              label: "Analytics",
              icon: <Award className="w-4 h-4" />,
            },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          {Array.isArray(selectedPreferences)
            ? selectedPreferences.join(", ")
            : "None"}
        </p>
      </section>

      {/* With Disabled Options */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Disabled Options
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Some options can be disabled
          </p>
        </div>
        <Dropdown
          placeholder="Select Option"
          options={[
            {
              value: "1",
              label: "Available Option",
              icon: <Check className="w-4 h-4" />,
            },
            {
              value: "2",
              label: "Disabled Option",
              icon: <X className="w-4 h-4" />,
              disabled: true,
              badge: "Pro",
            },
            {
              value: "3",
              label: "Another Available",
              icon: <Check className="w-4 h-4" />,
            },
            {
              value: "4",
              label: "Also Disabled",
              icon: <X className="w-4 h-4" />,
              disabled: true,
              badge: "Coming Soon",
            },
          ]}
        />
      </section>

      {/* With Validation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Validation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown with error and helper text
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Select Priority"
            placeholder="Choose priority..."
            error="Priority is required"
            variant="error"
            options={[
              {
                value: "low",
                label: "Low",
                icon: <Info className="w-4 h-4" />,
              },
              {
                value: "medium",
                label: "Medium",
                icon: <AlertCircle className="w-4 h-4" />,
              },
              {
                value: "high",
                label: "High",
                icon: <AlertCircle className="w-4 h-4" />,
              },
            ]}
          />
          <Dropdown
            label="Select Category"
            placeholder="Choose category..."
            helperText="This will help us organize your content"
            options={[
              {
                value: "work",
                label: "Work",
                icon: <Folder className="w-4 h-4" />,
              },
              {
                value: "personal",
                label: "Personal",
                icon: <Star className="w-4 h-4" />,
              },
              {
                value: "urgent",
                label: "Urgent",
                icon: <Zap className="w-4 h-4" />,
              },
            ]}
          />
        </div>
      </section>

      {/* Different Alignments */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Alignments
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Align dropdown content
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dropdown
            align="start"
            placeholder="Align Start"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            align="center"
            placeholder="Align Center"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Dropdown
            align="end"
            placeholder="Align End"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </div>
      </section>

      {/* Loading State */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Loading State
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Show loading indicator
          </p>
        </div>
        <Dropdown
          loading
          placeholder="Loading..."
          variant="primary"
          options={[]}
        />
      </section>

      {/* Disabled Dropdown */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Disabled Dropdown
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Entire dropdown disabled
          </p>
        </div>
        <Dropdown
          disabled
          placeholder="Disabled"
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
          ]}
        />
      </section>

      {/* Advanced Usage - User Profile Menu */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Advanced - User Profile Menu
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Complex dropdown with sections and actions
          </p>
        </div>
        <Dropdown
          placeholder="My Account"
          variant="glass"
          options={[
            {
              value: "profile",
              label: "Profile",
              icon: <User className="w-4 h-4" />,
              shortcut: "⌘P",
            },
            {
              value: "settings",
              label: "Settings",
              icon: <Settings className="w-4 h-4" />,
              shortcut: "⌘,",
            },
            {
              value: "billing",
              label: "Billing",
              icon: <CreditCard className="w-4 h-4" />,
            },
            {
              value: "logout",
              label: "Log Out",
              icon: <LogOut className="w-4 h-4" />,
              shortcut: "⌘Q",
            },
          ]}
        />
      </section>

      {/* Component-Based Usage - Basic */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based Approach - Basic
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use DropdownTrigger and DropdownContent for maximum flexibility
          </p>
        </div>
        <Dropdown variant="primary" size="md">
          <DropdownTrigger>Select an option</DropdownTrigger>
          <DropdownContent>
            <DropdownItem value="option1" label="Option 1" />
            <DropdownItem value="option2" label="Option 2" />
            <DropdownItem value="option3" label="Option 3" />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - With Icons */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - With Icons
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add custom icons to each item
          </p>
        </div>
        <Dropdown variant="accent" size="md">
          <DropdownTrigger>Actions</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              value="new"
              label="New File"
              icon={<File className="w-4 h-4" />}
              shortcut="⌘N"
            />
            <DropdownItem
              value="open"
              label="Open"
              icon={<Folder className="w-4 h-4" />}
              shortcut="⌘O"
            />
            <DropdownSeparator />
            <DropdownItem
              value="save"
              label="Save"
              icon={<Download className="w-4 h-4" />}
              shortcut="⌘S"
            />
            <DropdownItem
              value="export"
              label="Export"
              icon={<Upload className="w-4 h-4" />}
              shortcut="⌘E"
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - With Groups */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - With Groups
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Organize items with DropdownGroup
          </p>
        </div>
        <Dropdown variant="glass" size="md">
          <DropdownTrigger>More Options</DropdownTrigger>
          <DropdownContent>
            <DropdownGroup label="File Operations">
              <DropdownItem
                value="copy"
                label="Copy"
                icon={<Copy className="w-4 h-4" />}
                shortcut="⌘C"
              />
              <DropdownItem
                value="cut"
                label="Cut"
                icon={<X className="w-4 h-4" />}
                shortcut="⌘X"
              />
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup label="Danger Zone">
              <DropdownItem
                value="delete"
                label="Delete"
                icon={<Trash2 className="w-4 h-4" />}
                shortcut="⌘D"
              />
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - With Avatars */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - With Avatars
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            User selection with avatars
          </p>
        </div>
        <Dropdown variant="secondary" size="md">
          <DropdownTrigger>Assign to...</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              value="john"
              label="John Doe"
              avatar="https://i.pravatar.cc/150?img=1"
              description="Product Designer"
            />
            <DropdownItem
              value="jane"
              label="Jane Smith"
              avatar="https://i.pravatar.cc/150?img=2"
              description="Frontend Developer"
            />
            <DropdownItem
              value="bob"
              label="Bob Johnson"
              avatar="https://i.pravatar.cc/150?img=3"
              description="Backend Developer"
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - With Badges */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - With Badges & Descriptions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Rich content with badges and descriptions
          </p>
        </div>
        <Dropdown variant="success" size="md">
          <DropdownTrigger>Select Plan</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              value="free"
              label="Free"
              description="For personal projects"
              icon={<Star className="w-4 h-4" />}
              badge="$0"
            />
            <DropdownItem
              value="pro"
              label="Pro"
              description="For professional use"
              icon={<Crown className="w-4 h-4" />}
              badge="$29"
            />
            <DropdownItem
              value="enterprise"
              label="Enterprise"
              description="For large organizations"
              icon={<Shield className="w-4 h-4" />}
              badge="$99"
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - Custom Trigger */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - Custom Trigger
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use asChild to render custom trigger elements
          </p>
        </div>
        <Dropdown variant="primary" size="md">
          <DropdownTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
              <User className="w-4 h-4" />
              My Account
            </button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              value="profile"
              label="Profile"
              icon={<User className="w-4 h-4" />}
            />
            <DropdownItem
              value="settings"
              label="Settings"
              icon={<Settings className="w-4 h-4" />}
            />
            <DropdownSeparator />
            <DropdownItem
              value="logout"
              label="Log Out"
              icon={<LogOut className="w-4 h-4" />}
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - Complex Menu */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - Complex Menu
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Advanced menu with multiple groups and rich content
          </p>
        </div>
        <Dropdown variant="glass" size="md" checkmarks>
          <DropdownTrigger>Settings Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownGroup label="Account">
              <DropdownItem
                value="profile"
                label="Profile"
                icon={<User className="w-4 h-4" />}
                description="Manage your profile"
                shortcut="⌘P"
              />
              <DropdownItem
                value="billing"
                label="Billing"
                icon={<CreditCard className="w-4 h-4" />}
                description="View billing information"
                badge="Pro"
              />
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup label="Notifications">
              <DropdownItem
                value="email"
                label="Email Notifications"
                icon={<Mail className="w-4 h-4" />}
                badge="3"
              />
              <DropdownItem
                value="push"
                label="Push Notifications"
                icon={<Bell className="w-4 h-4" />}
                badge="New"
              />
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup label="Premium">
              <DropdownItem
                value="upgrade"
                label="Upgrade to Pro"
                icon={<Zap className="w-4 h-4" />}
                description="Unlock all features"
              />
              <DropdownItem
                value="premium"
                label="Premium Features"
                icon={<Award className="w-4 h-4" />}
                disabled
                badge="Coming Soon"
              />
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Both Methods Comparison */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Both Methods - Side by Side
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose the method that fits your needs: Props-based for simplicity,
            Component-based for flexibility
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Props-based */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Props-Based (Simple)
            </p>
            <Dropdown
              variant="primary"
              placeholder="Select Action"
              options={[
                {
                  value: "edit",
                  label: "Edit",
                  icon: <File className="w-4 h-4" />,
                },
                {
                  value: "delete",
                  label: "Delete",
                  icon: <Trash2 className="w-4 h-4" />,
                },
                {
                  value: "share",
                  label: "Share",
                  icon: <Upload className="w-4 h-4" />,
                },
              ]}
            />
          </div>

          {/* Component-based */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Component-Based (Flexible)
            </p>
            <Dropdown variant="primary">
              <DropdownTrigger>Select Action</DropdownTrigger>
              <DropdownContent>
                <DropdownItem
                  value="edit"
                  label="Edit"
                  icon={<File className="w-4 h-4" />}
                />
                <DropdownItem
                  value="delete"
                  label="Delete"
                  icon={<Trash2 className="w-4 h-4" />}
                />
                <DropdownItem
                  value="share"
                  label="Share"
                  icon={<Upload className="w-4 h-4" />}
                />
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DropdownExample;
