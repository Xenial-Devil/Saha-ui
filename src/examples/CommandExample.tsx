import { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "../components/Command";
import type { CommandItem as CommandItemType } from "../components/Command/Command.types";
import {
  FileText,
  Folder,
  Search,
  Settings,
  User,
  Mail,
  Calendar,
  Download,
  Upload,
  Trash2,
  Copy,
  Edit,
  Save,
  Home,
  Palette,
  Zap,
  Heart,
  Star,
  LogOut,
  Bell,
  Users,
  Database,
  Code,
  Terminal,
  GitBranch,
  Package,
  Bug,
  HelpCircle,
  FileCode,
  Globe,
  Lock,
} from "lucide-react";

export default function CommandExample() {
  // Component API examples
  const [componentValue, setComponentValue] = useState("");
  const [keyboardValue, setKeyboardValue] = useState("");

  // Props-based examples
  const [propsValue, setPropsValue] = useState("");
  const [quickValue, setQuickValue] = useState("");

  // Loading state
  const [loadingValue, setLoadingValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Props-based items
  const quickItems: CommandItemType[] = [
    {
      value: "new-file",
      label: "New File",
      icon: <FileText className="w-4 h-4" />,
      shortcut: "⌘N",
    },
    {
      value: "new-folder",
      label: "New Folder",
      icon: <Folder className="w-4 h-4" />,
      shortcut: "⌘⇧N",
    },
    {
      value: "search",
      label: "Search Files",
      icon: <Search className="w-4 h-4" />,
      shortcut: "⌘F",
    },
    {
      value: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      shortcut: "⌘,",
    },
  ];

  const groupedItems = [
    {
      label: "File Operations",
      items: [
        {
          value: "new",
          label: "New File",
          icon: <FileText className="w-4 h-4" />,
          shortcut: "⌘N",
        },
        {
          value: "open",
          label: "Open",
          icon: <Folder className="w-4 h-4" />,
          shortcut: "⌘O",
        },
        {
          value: "save",
          label: "Save",
          icon: <Save className="w-4 h-4" />,
          shortcut: "⌘S",
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          value: "copy",
          label: "Copy",
          icon: <Copy className="w-4 h-4" />,
          shortcut: "⌘C",
        },
        {
          value: "cut",
          label: "Cut",
          icon: <Edit className="w-4 h-4" />,
          shortcut: "⌘X",
        },
        {
          value: "paste",
          label: "Paste",
          icon: <FileText className="w-4 h-4" />,
          shortcut: "⌘V",
        },
      ],
    },
  ];

  const handleLoadingSearch = (value: string) => {
    setLoadingValue(value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Real-life example states
  const [appPaletteOpen, setAppPaletteOpen] = useState(false);
  const [appPaletteValue, setAppPaletteValue] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [dashboardValue, setDashboardValue] = useState("");

  // Mock data for real-life examples
  const recentFiles = [
    {
      name: "Dashboard.tsx",
      path: "/src/pages/Dashboard.tsx",
      modified: "2 mins ago",
    },
    { name: "api.ts", path: "/src/utils/api.ts", modified: "1 hour ago" },
    { name: "README.md", path: "/README.md", modified: "Yesterday" },
  ];

  const projects = [
    { name: "E-commerce Platform", status: "Active", team: "5 members" },
    { name: "Analytics Dashboard", status: "In Progress", team: "3 members" },
    { name: "Mobile App", status: "Planning", team: "8 members" },
  ];

  // Keyboard shortcut for command palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setAppPaletteOpen((prev) => !prev);
      }
      // Close on Escape
      if (e.key === "Escape" && appPaletteOpen) {
        e.preventDefault();
        setAppPaletteOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [appPaletteOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Command Component
          </h1>
          <p className="text-xl text-foreground/70">
            Command palette with keyboard navigation, search, and grouping
          </p>
        </div>

        {/* COMPONENT API EXAMPLES */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold border-b pb-2">
            Component API Examples
          </h2>

          {/* Basic Component API */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">1. Basic Command Palette</h3>
            <p className="text-foreground/70">
              A command menu with keyboard navigation. Use ↑↓ arrows to
              navigate, Enter to select.
            </p>
            <div className="max-w-md mx-auto">
              <Command value={componentValue} onValueChange={setComponentValue}>
                <CommandInput placeholder="Type a command..." />
                <CommandList>
                  <CommandEmpty>No results found</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem
                      value="new-file"
                      icon={<FileText className="w-4 h-4" />}
                      shortcut="⌘N"
                      onSelect={() => alert("New File")}
                    >
                      New File
                    </CommandItem>
                    <CommandItem
                      value="new-folder"
                      icon={<Folder className="w-4 h-4" />}
                      shortcut={["⌘", "⇧", "N"]}
                      onSelect={() => alert("New Folder")}
                    >
                      New Folder
                    </CommandItem>
                    <CommandItem
                      value="search"
                      icon={<Search className="w-4 h-4" />}
                      shortcut="⌘F"
                      onSelect={() => alert("Search")}
                    >
                      Search Files
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem
                      value="settings"
                      icon={<Settings className="w-4 h-4" />}
                      shortcut="⌘,"
                      onSelect={() => alert("Settings")}
                    >
                      Settings
                    </CommandItem>
                    <CommandItem
                      value="profile"
                      icon={<User className="w-4 h-4" />}
                      onSelect={() => alert("Profile")}
                    >
                      Profile
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
              {componentValue && (
                <div className="mt-2 p-3 rounded-lg bg-primary/10 text-primary text-sm">
                  Search: <strong>{componentValue}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Rich Options with Descriptions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">2. With Descriptions</h3>
            <p className="text-foreground/70">
              Command items with detailed descriptions
            </p>
            <div className="max-w-md mx-auto">
              <Command variant="primary">
                <CommandInput placeholder="Search actions..." />
                <CommandList>
                  <CommandEmpty>No actions found</CommandEmpty>
                  <CommandGroup heading="Actions">
                    <CommandItem
                      value="upload"
                      icon={<Upload className="w-5 h-5 text-success" />}
                      description="Upload files to cloud storage"
                      shortcut="⌘U"
                    >
                      Upload Files
                    </CommandItem>
                    <CommandItem
                      value="download"
                      icon={<Download className="w-5 h-5 text-info" />}
                      description="Download selected items"
                      shortcut="⌘D"
                    >
                      Download
                    </CommandItem>
                    <CommandItem
                      value="delete"
                      icon={<Trash2 className="w-5 h-5 text-error" />}
                      description="Move to trash"
                      shortcut={["⌘", "⌫"]}
                    >
                      Delete
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">3. Keyboard Navigation</h3>
            <p className="text-foreground/70">
              Full keyboard support with visual shortcuts
            </p>
            <div className="max-w-md mx-auto">
              <Command
                value={keyboardValue}
                onValueChange={setKeyboardValue}
                variant="accent"
              >
                <CommandInput placeholder="Try keyboard navigation..." />
                <CommandList>
                  <CommandEmpty>No commands found</CommandEmpty>
                  <CommandGroup heading="Navigation">
                    <CommandItem
                      value="home"
                      icon={<Home className="w-4 h-4" />}
                      shortcut="⌘H"
                    >
                      Home
                    </CommandItem>
                    <CommandItem
                      value="calendar"
                      icon={<Calendar className="w-4 h-4" />}
                      shortcut="⌘K"
                    >
                      Calendar
                    </CommandItem>
                    <CommandItem
                      value="mail"
                      icon={<Mail className="w-4 h-4" />}
                      shortcut="⌘M"
                    >
                      Mail
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Customization">
                    <CommandItem
                      value="theme"
                      icon={<Palette className="w-4 h-4" />}
                      shortcut="⌘T"
                    >
                      Change Theme
                    </CommandItem>
                    <CommandItem
                      value="shortcuts"
                      icon={<Zap className="w-4 h-4" />}
                      shortcut="⌘/"
                    >
                      Keyboard Shortcuts
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
              <div className="mt-4 p-4 rounded-lg bg-accent/10 text-sm space-y-2">
                <p className="font-semibold">Keyboard Shortcuts:</p>
                <ul className="space-y-1 text-foreground/70">
                  <li>
                    • <kbd className="px-2 py-1 rounded bg-muted">↑↓</kbd>{" "}
                    Navigate items
                  </li>
                  <li>
                    • <kbd className="px-2 py-1 rounded bg-muted">Enter</kbd>{" "}
                    Select item
                  </li>
                  <li>
                    • <kbd className="px-2 py-1 rounded bg-muted">Esc</kbd>{" "}
                    Clear search
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Loading State */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">4. Loading State</h3>
            <p className="text-foreground/70">
              Show loading indicator while fetching results
            </p>
            <div className="max-w-md mx-auto">
              <Command
                value={loadingValue}
                onValueChange={handleLoadingSearch}
                loading={isLoading}
                variant="secondary"
              >
                <CommandInput placeholder="Search to trigger loading..." />
                <CommandList>
                  <CommandLoading>Searching...</CommandLoading>
                  <CommandEmpty>No results found</CommandEmpty>
                  <CommandGroup heading="Results">
                    <CommandItem
                      value="result1"
                      icon={<Star className="w-4 h-4" />}
                    >
                      Result 1
                    </CommandItem>
                    <CommandItem
                      value="result2"
                      icon={<Heart className="w-4 h-4" />}
                    >
                      Result 2
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          {/* Disabled Items */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">5. Disabled Items</h3>
            <p className="text-foreground/70">Some items can be disabled</p>
            <div className="max-w-md mx-auto">
              <Command variant="success">
                <CommandInput placeholder="Try selecting disabled items..." />
                <CommandList>
                  <CommandEmpty>No commands found</CommandEmpty>
                  <CommandGroup heading="Commands">
                    <CommandItem
                      value="enabled"
                      icon={<FileText className="w-4 h-4" />}
                    >
                      Enabled Item
                    </CommandItem>
                    <CommandItem
                      value="disabled"
                      icon={<FileText className="w-4 h-4" />}
                      disabled
                    >
                      Disabled Item
                    </CommandItem>
                    <CommandItem
                      value="also-enabled"
                      icon={<Folder className="w-4 h-4" />}
                    >
                      Another Enabled Item
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </section>

        {/* PROPS-BASED API EXAMPLES */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold border-b pb-2">
            Props-Based API (Quick Use)
          </h2>

          {/* Quick Single Commands */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quick Command Menu</h3>
            <p className="text-foreground/70">
              Simple props-based API for quick implementations
            </p>
            <div className="max-w-md mx-auto">
              <Command
                items={quickItems}
                value={quickValue}
                onValueChange={setQuickValue}
                onSelect={(value: string) => alert(`Selected: ${value}`)}
                placeholder="Quick search..."
                variant="primary"
              />
            </div>
          </div>

          {/* Grouped Commands */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Grouped Commands</h3>
            <p className="text-foreground/70">Commands organized in groups</p>
            <div className="max-w-md mx-auto">
              <Command
                items={groupedItems}
                value={propsValue}
                onValueChange={setPropsValue}
                onSelect={(value: string) => alert(`Selected: ${value}`)}
                placeholder="Search commands..."
                variant="info"
              />
            </div>
          </div>
        </section>

        {/* Variants Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2">Variant Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                "ghost",
                "glass",
                "outline",
              ] as const
            ).map((variant) => (
              <div key={variant} className="space-y-2">
                <p className="text-sm font-semibold capitalize">{variant}</p>
                <Command variant={variant} onSelect={() => {}}>
                  <CommandInput placeholder={`${variant} variant`} />
                  <CommandList>
                    <CommandGroup>
                      <CommandItem value="1">Option 1</CommandItem>
                      <CommandItem value="2">Option 2</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            ))}
          </div>
        </section>

        {/* Sizes Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b pb-2">Size Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="space-y-2">
                <p className="text-sm font-semibold capitalize">Size: {size}</p>
                <Command size={size} onSelect={() => {}}>
                  <CommandInput placeholder={`${size} size`} />
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        value="1"
                        icon={<FileText className="w-4 h-4" />}
                      >
                        Option 1
                      </CommandItem>
                      <CommandItem
                        value="2"
                        icon={<Folder className="w-4 h-4" />}
                      >
                        Option 2
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            ))}
          </div>
        </section>

        {/* REAL-LIFE EXAMPLES */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold border-b pb-2">
            Real-Life Use Cases
          </h2>

          {/* 1. Application Command Palette (cmd+k style) */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              1. Application Command Palette (⌘K)
            </h3>
            <p className="text-foreground/70">
              Global application shortcuts like VS Code, Linear, or Vercel
            </p>
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-sm text-foreground/60 mb-2">
                  💡 Press{" "}
                  <kbd className="px-2 py-1 rounded bg-background border">
                    Ctrl+K
                  </kbd>{" "}
                  or{" "}
                  <kbd className="px-2 py-1 rounded bg-background border">
                    ⌘K
                  </kbd>{" "}
                  anywhere on this page to toggle
                </p>
                <button
                  onClick={() => setAppPaletteOpen(!appPaletteOpen)}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {appPaletteOpen ? "Close" : "Open"} Command Palette
                </button>
              </div>

              {appPaletteOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]">
                  <div className="w-full max-w-2xl mx-4">
                    <Command
                      value={appPaletteValue}
                      onValueChange={setAppPaletteValue}
                      variant="glass"
                      size="lg"
                      className="shadow-2xl"
                    >
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        {/* Quick Actions */}
                        <CommandGroup heading="Quick Actions">
                          <CommandItem
                            value="new-project"
                            icon={<Folder className="w-4 h-4" />}
                            description="Create a new project"
                            shortcut="⌘N"
                            onSelect={() => {
                              alert("Creating new project...");
                              setAppPaletteOpen(false);
                            }}
                          >
                            New Project
                          </CommandItem>
                          <CommandItem
                            value="search-files"
                            icon={<Search className="w-4 h-4" />}
                            description="Search across all files"
                            shortcut="⌘P"
                            onSelect={() => alert("Opening file search...")}
                          >
                            Search Files
                          </CommandItem>
                          <CommandItem
                            value="theme-toggle"
                            icon={<Palette className="w-4 h-4" />}
                            description="Switch between light and dark mode"
                            shortcut="⌘T"
                            onSelect={() => alert("Toggling theme...")}
                          >
                            Toggle Theme
                          </CommandItem>
                        </CommandGroup>

                        <CommandSeparator />

                        {/* Navigation */}
                        <CommandGroup heading="Navigate">
                          <CommandItem
                            value="dashboard"
                            icon={<Home className="w-4 h-4" />}
                            shortcut="⌘H"
                            onSelect={() => alert("Going to Dashboard")}
                          >
                            Dashboard
                          </CommandItem>
                          <CommandItem
                            value="projects"
                            icon={<Folder className="w-4 h-4" />}
                            shortcut="⌘1"
                            onSelect={() => alert("Going to Projects")}
                          >
                            Projects
                          </CommandItem>
                          <CommandItem
                            value="team"
                            icon={<Users className="w-4 h-4" />}
                            shortcut="⌘2"
                            onSelect={() => alert("Going to Team")}
                          >
                            Team
                          </CommandItem>
                          <CommandItem
                            value="settings"
                            icon={<Settings className="w-4 h-4" />}
                            shortcut="⌘,"
                            onSelect={() => alert("Opening Settings")}
                          >
                            Settings
                          </CommandItem>
                        </CommandGroup>

                        <CommandSeparator />

                        {/* Account */}
                        <CommandGroup heading="Account">
                          <CommandItem
                            value="profile"
                            icon={<User className="w-4 h-4" />}
                            onSelect={() => alert("Opening Profile")}
                          >
                            View Profile
                          </CommandItem>
                          <CommandItem
                            value="notifications"
                            icon={<Bell className="w-4 h-4" />}
                            onSelect={() => alert("Opening Notifications")}
                          >
                            Notifications
                          </CommandItem>
                          <CommandItem
                            value="logout"
                            icon={<LogOut className="w-4 h-4 text-error" />}
                            onSelect={() => {
                              alert("Logging out...");
                              setAppPaletteOpen(false);
                            }}
                          >
                            <span className="text-error">Log Out</span>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                    <button
                      onClick={() => setAppPaletteOpen(false)}
                      className="mt-4 w-full text-center text-sm text-foreground/60 hover:text-foreground"
                    >
                      Press{" "}
                      <kbd className="px-2 py-1 rounded bg-muted">Esc</kbd> to
                      close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Code Editor Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              2. Code Editor Quick Actions
            </h3>
            <p className="text-foreground/70">
              VS Code / JetBrains style command palette for developers
            </p>
            <div className="max-w-2xl mx-auto">
              <Command
                value={editorValue}
                onValueChange={setEditorValue}
                variant="accent"
                size="md"
              >
                <CommandInput placeholder="Search commands (>), files (@), or symbols (#)" />
                <CommandList className="max-h-96">
                  <CommandEmpty>No commands found</CommandEmpty>

                  {/* Recent Files */}
                  <CommandGroup heading="Recent Files">
                    {recentFiles.map((file, idx) => (
                      <CommandItem
                        key={idx}
                        value={`recent-${idx}`}
                        icon={<FileCode className="w-4 h-4" />}
                        description={`${file.path} • ${file.modified}`}
                        onSelect={() => alert(`Opening ${file.name}`)}
                      >
                        {file.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  {/* Editor Commands */}
                  <CommandGroup heading="Editor Commands">
                    <CommandItem
                      value="format"
                      icon={<Code className="w-4 h-4" />}
                      description="Format the current document"
                      shortcut={["⌥", "⇧", "F"]}
                      onSelect={() => alert("Formatting document...")}
                    >
                      Format Document
                    </CommandItem>
                    <CommandItem
                      value="organize"
                      icon={<Package className="w-4 h-4" />}
                      description="Organize and optimize imports"
                      shortcut={["⌥", "⇧", "O"]}
                      onSelect={() => alert("Organizing imports...")}
                    >
                      Organize Imports
                    </CommandItem>
                    <CommandItem
                      value="terminal"
                      icon={<Terminal className="w-4 h-4" />}
                      description="Toggle integrated terminal"
                      shortcut="⌃`"
                      onSelect={() => alert("Toggling terminal...")}
                    >
                      Toggle Terminal
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  {/* Git Commands */}
                  <CommandGroup heading="Source Control">
                    <CommandItem
                      value="commit"
                      icon={<GitBranch className="w-4 h-4" />}
                      description="Commit staged changes"
                      shortcut="⌘Enter"
                      onSelect={() => alert("Opening commit dialog...")}
                    >
                      Commit Changes
                    </CommandItem>
                    <CommandItem
                      value="pull"
                      icon={<Download className="w-4 h-4" />}
                      description="Pull from remote"
                      onSelect={() => alert("Pulling changes...")}
                    >
                      Pull
                    </CommandItem>
                    <CommandItem
                      value="push"
                      icon={<Upload className="w-4 h-4" />}
                      description="Push to remote"
                      onSelect={() => alert("Pushing changes...")}
                    >
                      Push
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  {/* Debug */}
                  <CommandGroup heading="Debug">
                    <CommandItem
                      value="debug"
                      icon={<Bug className="w-4 h-4 text-error" />}
                      description="Start debugging"
                      shortcut="F5"
                      onSelect={() => alert("Starting debugger...")}
                    >
                      Start Debugging
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          {/* 3. Admin Dashboard */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              3. Admin Dashboard Quick Actions
            </h3>
            <p className="text-foreground/70">
              Quick navigation and actions for admin panels
            </p>
            <div className="max-w-2xl mx-auto">
              <Command
                value={dashboardValue}
                onValueChange={setDashboardValue}
                variant="primary"
                size="md"
              >
                <CommandInput placeholder="Search users, projects, or actions..." />
                <CommandList className="max-h-96">
                  <CommandEmpty>No results found</CommandEmpty>

                  {/* Quick Stats */}
                  <CommandGroup heading="Recent Projects">
                    {projects.map((project, idx) => (
                      <CommandItem
                        key={idx}
                        value={`project-${idx}`}
                        icon={<Folder className="w-4 h-4" />}
                        description={`${project.status} • ${project.team}`}
                        onSelect={() => alert(`Opening ${project.name}`)}
                      >
                        {project.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  {/* Admin Actions */}
                  <CommandGroup heading="Admin Actions">
                    <CommandItem
                      value="create-user"
                      icon={<User className="w-4 h-4 text-success" />}
                      description="Add a new user to the system"
                      onSelect={() => alert("Creating new user...")}
                    >
                      Create New User
                    </CommandItem>
                    <CommandItem
                      value="manage-roles"
                      icon={<Lock className="w-4 h-4" />}
                      description="Manage user roles and permissions"
                      onSelect={() => alert("Opening roles manager...")}
                    >
                      Manage Roles
                    </CommandItem>
                    <CommandItem
                      value="database"
                      icon={<Database className="w-4 h-4" />}
                      description="View database statistics"
                      onSelect={() => alert("Opening database stats...")}
                    >
                      Database Stats
                    </CommandItem>
                    <CommandItem
                      value="api-logs"
                      icon={<Globe className="w-4 h-4" />}
                      description="View API request logs"
                      onSelect={() => alert("Opening API logs...")}
                    >
                      API Logs
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  {/* System */}
                  <CommandGroup heading="System">
                    <CommandItem
                      value="backup"
                      icon={<Download className="w-4 h-4 text-info" />}
                      description="Create system backup"
                      onSelect={() => alert("Starting backup...")}
                    >
                      Create Backup
                    </CommandItem>
                    <CommandItem
                      value="maintenance"
                      icon={<Settings className="w-4 h-4 text-warning" />}
                      description="Enable maintenance mode"
                      onSelect={() => alert("Enabling maintenance mode...")}
                    >
                      Maintenance Mode
                    </CommandItem>
                    <CommandItem
                      value="help"
                      icon={<HelpCircle className="w-4 h-4" />}
                      description="View documentation"
                      shortcut="?"
                      onSelect={() => alert("Opening help...")}
                    >
                      Help & Documentation
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          {/* 4. E-commerce Search */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">
              4. E-commerce Product Search
            </h3>
            <p className="text-foreground/70">
              Quick product search with categories and filters
            </p>
            <div className="max-w-2xl mx-auto">
              <Command variant="info" size="md">
                <CommandInput placeholder="Search products, categories, or brands..." />
                <CommandList className="max-h-96">
                  <CommandEmpty>No products found</CommandEmpty>

                  {/* Categories */}
                  <CommandGroup heading="Categories">
                    <CommandItem
                      value="electronics"
                      icon={<Zap className="w-4 h-4" />}
                      description="Phones, laptops, accessories"
                      onSelect={() => alert("Browsing Electronics")}
                    >
                      Electronics
                    </CommandItem>
                    <CommandItem
                      value="clothing"
                      icon={<Star className="w-4 h-4" />}
                      description="Fashion and apparel"
                      onSelect={() => alert("Browsing Clothing")}
                    >
                      Clothing
                    </CommandItem>
                    <CommandItem
                      value="home"
                      icon={<Home className="w-4 h-4" />}
                      description="Furniture and decor"
                      onSelect={() => alert("Browsing Home & Garden")}
                    >
                      Home & Garden
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  {/* Popular Products */}
                  <CommandGroup heading="Popular Products">
                    <CommandItem
                      value="laptop"
                      description="$999 • 4.5★ • In Stock"
                      onSelect={() => alert("Viewing MacBook Pro")}
                    >
                      MacBook Pro 14"
                    </CommandItem>
                    <CommandItem
                      value="phone"
                      description="$799 • 4.8★ • In Stock"
                      onSelect={() => alert("Viewing iPhone")}
                    >
                      iPhone 15 Pro
                    </CommandItem>
                    <CommandItem
                      value="watch"
                      description="$399 • 4.6★ • Limited Stock"
                      onSelect={() => alert("Viewing Apple Watch")}
                    >
                      Apple Watch Series 9
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  {/* Quick Actions */}
                  <CommandGroup heading="Quick Actions">
                    <CommandItem
                      value="cart"
                      icon={<Package className="w-4 h-4" />}
                      description="View shopping cart"
                      onSelect={() => alert("Opening cart...")}
                    >
                      View Cart (3 items)
                    </CommandItem>
                    <CommandItem
                      value="orders"
                      icon={<FileText className="w-4 h-4" />}
                      description="Track your orders"
                      onSelect={() => alert("Viewing orders...")}
                    >
                      My Orders
                    </CommandItem>
                    <CommandItem
                      value="wishlist"
                      icon={<Heart className="w-4 h-4" />}
                      description="View saved items"
                      onSelect={() => alert("Opening wishlist...")}
                    >
                      Wishlist (12 items)
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
