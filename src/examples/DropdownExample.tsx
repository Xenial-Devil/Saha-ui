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
  const users = [
    {
      value: "john",
      label: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
      description: "Product Designer",
    },
    {
      value: "jane",
      label: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      description: "Frontend Developer",
    },
    {
      value: "bob",
      label: "Bob Johnson",
      avatar: "https://i.pravatar.cc/150?img=3",
      description: "Backend Developer",
    },
    {
      value: "alice",
      label: "Alice Williams",
      avatar: "https://i.pravatar.cc/150?img=4",
      description: "UX Designer",
    },
  ];

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-foreground">
          Dropdown Menu Component
        </h2>
        <p className="text-muted-foreground mb-8">
          A pure menu component for navigation and actions. Items can link to
          URLs or trigger actions. No selection state - just clean menu
          behavior.
        </p>
      </div>

      {/* Basic Dropdown Menu */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Basic Menu
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Simple menu with file actions
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dropdown placeholder="File Actions">
            <DropdownTrigger>File Menu</DropdownTrigger>
            <DropdownContent>
              <DropdownItem
                value="new"
                label="New File"
                icon={<File className="w-4 h-4" />}
                onSelect={() => alert("Creating new file...")}
              />
              <DropdownItem
                value="open"
                label="Open"
                icon={<Folder className="w-4 h-4" />}
                onSelect={() => alert("Opening file...")}
              />
              <DropdownItem
                value="save"
                label="Save"
                icon={<Download className="w-4 h-4" />}
                onSelect={() => alert("Saving...")}
              />
              <DropdownItem
                value="export"
                label="Export"
                icon={<Upload className="w-4 h-4" />}
                onSelect={() => alert("Exporting...")}
              />
            </DropdownContent>
          </Dropdown>
        </div>
      </section>

      {/* Different Variants */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Variants
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menus with different color variants
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dropdown variant="default">
            <DropdownTrigger>Default</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="primary">
            <DropdownTrigger>Primary</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="secondary">
            <DropdownTrigger>Secondary</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="accent">
            <DropdownTrigger>Accent</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="success">
            <DropdownTrigger>Success</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="warning">
            <DropdownTrigger>Warning</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="error">
            <DropdownTrigger>Error</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="ghost">
            <DropdownTrigger>Ghost</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown variant="glass">
            <DropdownTrigger>Glass</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Different Sizes
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Small, medium, and large menus
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Dropdown size="sm">
            <DropdownTrigger>Small</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown size="md">
            <DropdownTrigger>Medium</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
          <Dropdown size="lg">
            <DropdownTrigger>Large</DropdownTrigger>
            <DropdownContent>
              <DropdownItem href="#" label="Action 1" />
              <DropdownItem href="#" label="Action 2" />
            </DropdownContent>
          </Dropdown>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Icons & Shortcuts
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu with icons and keyboard shortcuts
          </p>
        </div>
        <Dropdown variant="primary">
          <DropdownTrigger>Edit Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              value="copy"
              label="Copy"
              icon={<Copy className="w-4 h-4" />}
              shortcut="⌘C"
              onSelect={() => alert("Copy")}
            />
            <DropdownItem
              value="cut"
              label="Cut"
              icon={<X className="w-4 h-4" />}
              shortcut="⌘X"
              onSelect={() => alert("Cut")}
            />
            <DropdownItem
              value="paste"
              label="Paste"
              icon={<File className="w-4 h-4" />}
              shortcut="⌘V"
              onSelect={() => alert("Paste")}
            />
            <DropdownSeparator />
            <DropdownItem
              value="delete"
              label="Delete"
              icon={<Trash2 className="w-4 h-4" />}
              shortcut="⌘D"
              onSelect={() => alert("Delete")}
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* With Avatars */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Avatars
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Team member menu</p>
        </div>
        <Dropdown variant="accent">
          <DropdownTrigger>Team Menu</DropdownTrigger>
          <DropdownContent>
            {users.map((user) => (
              <DropdownItem
                key={user.value}
                value={user.value}
                label={user.label}
                description={user.description}
                avatar={user.avatar}
                onSelect={() => alert(`Action for ${user.label}`)}
              />
            ))}
          </DropdownContent>
        </Dropdown>
      </section>

      {/* With Descriptions */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Descriptions
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu items with detailed descriptions and navigation
          </p>
        </div>
        <Dropdown variant="primary">
          <DropdownTrigger>Plans Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              href="/plans/free"
              label="Free"
              description="For personal projects"
              icon={<Star className="w-4 h-4" />}
              badge="$0"
            />
            <DropdownItem
              href="/plans/pro"
              label="Pro"
              description="For professional use"
              icon={<Crown className="w-4 h-4" />}
              badge="$29"
            />
            <DropdownItem
              href="/plans/enterprise"
              label="Enterprise"
              description="For large organizations"
              icon={<Shield className="w-4 h-4" />}
              badge="$99"
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* With Badges */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Badges
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Menu items with status badges
          </p>
        </div>
        <Dropdown>
          <DropdownTrigger>Notifications</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              href="/notifications"
              label="Notifications"
              icon={<Bell className="w-4 h-4" />}
              badge="New"
            />
            <DropdownItem
              href="/messages"
              label="Messages"
              icon={<Mail className="w-4 h-4" />}
              badge="5"
            />
            <DropdownItem
              href="/chat"
              label="Chat"
              icon={<MessageSquare className="w-4 h-4" />}
              badge="Beta"
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* With Shortcuts */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Keyboard Shortcuts
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Navigation menu with keyboard shortcuts
          </p>
        </div>
        <Dropdown variant="glass">
          <DropdownTrigger>Quick Actions</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              href="/save"
              label="Save"
              icon={<Download className="w-4 h-4" />}
              shortcut="⌘S"
            />
            <DropdownItem
              href="/open"
              label="Open"
              icon={<Folder className="w-4 h-4" />}
              shortcut="⌘O"
            />
            <DropdownItem
              href="/search"
              label="Search"
              icon={<Search className="w-4 h-4" />}
              shortcut="⌘K"
            />
            <DropdownSeparator />
            <DropdownItem
              href="/"
              label="Go Home"
              icon={<Home className="w-4 h-4" />}
              shortcut="⌘H"
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Searchable Dropdown */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Searchable Menu
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Filter menu items with search
          </p>
        </div>
        <Dropdown variant="primary">
          <DropdownTrigger>User Directory</DropdownTrigger>
          <DropdownContent>
            {[
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
            ].map((user) => (
              <DropdownItem
                key={user.value}
                href={`/users/${user.value}`}
                label={user.label}
                avatar={user.avatar}
              />
            ))}
          </DropdownContent>
        </Dropdown>
      </section>

      {/* With Disabled Options */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            With Disabled Options
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Some menu items can be disabled
          </p>
        </div>
        <Dropdown
          placeholder="Actions Menu"
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
            With Labels & Helper Text
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown menus with labels, error states, and helper text
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Dropdown
            label="Priority Actions"
            placeholder="Priority menu..."
            error="Please choose an action"
            variant="error"
            options={[
              {
                value: "low",
                label: "Low Priority",
                icon: <Info className="w-4 h-4" />,
              },
              {
                value: "medium",
                label: "Medium Priority",
                icon: <AlertCircle className="w-4 h-4" />,
              },
              {
                value: "high",
                label: "High Priority",
                icon: <AlertCircle className="w-4 h-4" />,
              },
            ]}
          />
          <Dropdown
            label="Category Actions"
            placeholder="Category menu..."
            helperText="Choose an action for this category"
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
            Component-Based Approach - Basic Menu
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use DropdownTrigger and DropdownContent for flexible menu creation
          </p>
        </div>
        <Dropdown variant="primary" size="md">
          <DropdownTrigger>Options Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownItem value="option1" label="Option 1" />
            <DropdownItem value="option2" label="Option 2" />
            <DropdownItem value="option3" label="Option 3" />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - With Links */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - Navigation Menu with Links
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Dropdown items can contain URLs for navigation
          </p>
        </div>
        <Dropdown variant="accent" size="md">
          <DropdownTrigger>Navigate</DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              href="/"
              label="Home"
              icon={<Home className="w-4 h-4" />}
            />
            <DropdownItem
              href="/dashboard"
              label="Dashboard"
              icon={<Folder className="w-4 h-4" />}
            />
            <DropdownItem
              href="/settings"
              label="Settings"
              icon={<Settings className="w-4 h-4" />}
            />
            <DropdownSeparator />
            <DropdownItem
              href="https://github.com"
              target="_blank"
              label="GitHub"
              description="Visit our repository"
              icon={<Upload className="w-4 h-4" />}
            />
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
            Team member menu with avatars
          </p>
        </div>
        <Dropdown variant="secondary" size="md">
          <DropdownTrigger>Team Menu</DropdownTrigger>
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
          <DropdownTrigger>Plans Menu</DropdownTrigger>
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
            Component-Based - User Account Menu
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use asChild to render custom trigger with menu actions
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
              href="/profile"
              label="Profile"
              icon={<User className="w-4 h-4" />}
              description="View your profile"
            />
            <DropdownItem
              href="/settings"
              label="Settings"
              icon={<Settings className="w-4 h-4" />}
              description="Manage your account"
            />
            <DropdownItem
              href="/billing"
              label="Billing"
              icon={<CreditCard className="w-4 h-4" />}
              description="Manage billing"
            />
            <DropdownSeparator />
            <DropdownItem
              value="logout"
              label="Log Out"
              icon={<LogOut className="w-4 h-4" />}
              onSelect={() => alert("Logging out...")}
            />
          </DropdownContent>
        </Dropdown>
      </section>

      {/* Component-Based - Complex Menu */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Component-Based - Complex Menu with Navigation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Advanced menu with multiple groups, links, and actions
          </p>
        </div>
        <Dropdown variant="glass" size="md">
          <DropdownTrigger>Settings Menu</DropdownTrigger>
          <DropdownContent>
            <DropdownGroup label="Account">
              <DropdownItem
                href="/profile"
                label="Profile"
                icon={<User className="w-4 h-4" />}
                description="Manage your profile"
                shortcut="⌘P"
              />
              <DropdownItem
                href="/billing"
                label="Billing"
                icon={<CreditCard className="w-4 h-4" />}
                description="View billing information"
                badge="Pro"
              />
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup label="Notifications">
              <DropdownItem
                href="/notifications/email"
                label="Email Notifications"
                icon={<Mail className="w-4 h-4" />}
                badge="3"
              />
              <DropdownItem
                href="/notifications/push"
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
                onSelect={() => alert("Upgrade clicked")}
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
            Props-based for simplicity, Component-based for flexibility with
            links and custom actions.
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
              placeholder="Actions"
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
              <DropdownTrigger>Actions Menu</DropdownTrigger>
              <DropdownContent>
                <DropdownItem
                  href="/edit"
                  label="Edit"
                  icon={<File className="w-4 h-4" />}
                />
                <DropdownItem
                  value="delete"
                  label="Delete"
                  icon={<Trash2 className="w-4 h-4" />}
                  onSelect={() => alert("Delete action")}
                />
                <DropdownItem
                  href="/share"
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
