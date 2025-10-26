import { useState } from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "../components/ContextMenu";
import {
  Copy,
  Scissors,
  ClipboardPaste,
  Download,
  Trash2,
  Edit,
  Share2,
  Eye,
  EyeOff,
  Star,
  Heart,
  FileText,
  Folder,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Palette,
} from "lucide-react";

export default function ContextMenuExample() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("pedro");
  const [theme, setTheme] = useState("light");
  const [viewMode, setViewMode] = useState("grid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Context Menu Component
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Beautiful, accessible context menus (right-click menus) with
            advanced features.
            <br />
            <span className="text-sm">
              13 variants • 3 sizes • Nested submenus • Checkboxes • Radio
              groups • Keyboard navigation
            </span>
          </p>
        </div>

        {/* Basic Example - Browser Context Menu */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-2xl font-bold text-foreground">
              Browser-Style Context Menu
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid gap-6">
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[200px] w-full items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-gradient-to-br from-white/50 to-transparent dark:from-slate-900/50">
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">Right click here</p>
                  <p className="text-sm text-muted-foreground">
                    Try the browser-style context menu
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem inset icon={<Copy className="w-4 h-4" />}>
                  Back
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset disabled>
                  Forward
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset icon={<Download className="w-4 h-4" />}>
                  Reload
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger inset>
                    More Tools
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-52">
                    <ContextMenuItem>Save Page As...</ContextMenuItem>
                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    <ContextMenuItem>Name Window...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Developer Tools</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem
                  checked={showBookmarks}
                  onCheckedChange={setShowBookmarks}
                >
                  Show Bookmarks Bar
                  <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem
                  checked={showFullUrls}
                  onCheckedChange={setShowFullUrls}
                >
                  Show Full URLs
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup
                  value={selectedPerson}
                  onValueChange={setSelectedPerson}
                >
                  <ContextMenuLabel inset>People</ContextMenuLabel>
                  <ContextMenuRadioItem value="pedro">
                    Pedro Duarte
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="colm">
                    Colm Tuite
                  </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </section>

        {/* Color Variants */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-2xl font-bold text-foreground">
              Color Variants (10 Options)
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Default */}
            <ContextMenu variant="default">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-border/30 bg-card hover:bg-accent/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium">Default Variant</p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem icon={<Edit className="w-4 h-4" />}>
                  Edit
                </ContextMenuItem>
                <ContextMenuItem icon={<Copy className="w-4 h-4" />}>
                  Copy
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            {/* Primary */}
            <ContextMenu variant="primary">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-primary">Primary Variant</p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem icon={<Edit className="w-4 h-4" />}>
                  Edit
                </ContextMenuItem>
                <ContextMenuItem icon={<Copy className="w-4 h-4" />}>
                  Copy
                </ContextMenuItem>
                <ContextMenuItem icon={<Share2 className="w-4 h-4" />}>
                  Share
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Secondary */}
            <ContextMenu variant="secondary">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-secondary">Secondary</p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Action 1</ContextMenuItem>
                <ContextMenuItem>Action 2</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Accent */}
            <ContextMenu variant="accent">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-accent-foreground">Accent</p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Highlight</ContextMenuItem>
                <ContextMenuItem>Feature</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Success */}
            <ContextMenu variant="success">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Success
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem variant="success">Approve</ContextMenuItem>
                <ContextMenuItem>View Details</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Warning */}
            <ContextMenu variant="warning">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-yellow-600 dark:text-yellow-400">
                    Warning
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem variant="warning">Review</ContextMenuItem>
                <ContextMenuItem>Edit</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Error */}
            <ContextMenu variant="error">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-red-600 dark:text-red-400">
                    Error
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Edit</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Info - Using Primary */}
            <ContextMenu variant="primary">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    Info
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem icon={<Eye className="w-4 h-4" />}>
                  View
                </ContextMenuItem>
                <ContextMenuItem>Details</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Outline */}
            <ContextMenu variant="outline">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-border bg-background/50 hover:bg-background transition-colors">
                <div className="text-center">
                  <p className="font-medium text-foreground">Outline</p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Option 1</ContextMenuItem>
                <ContextMenuItem>Option 2</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            {/* Glass */}
            <ContextMenu variant="glass">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-white/20 hover:to-white/10 transition-colors">
                <div className="text-center">
                  <p className="font-medium text-foreground">Glass</p>
                  <p className="text-xs text-muted-foreground">
                    Right click me
                  </p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem icon={<Heart className="w-4 h-4" />}>
                  Favorite
                </ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </section>

        {/* Size Variants */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-2xl font-bold text-foreground">
              Size Variants
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <ContextMenu size="sm" variant="info">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-blue-500/30 bg-blue-500/5">
                <div className="text-center">
                  <p className="font-medium text-blue-600 dark:text-blue-400">
                    Small
                  </p>
                  <p className="text-xs text-muted-foreground">Right click</p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Small menu item</ContextMenuItem>
                <ContextMenuItem>Another item</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Third item</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <ContextMenu size="md" variant="success">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-green-500/30 bg-green-500/5">
                <div className="text-center">
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Medium (Default)
                  </p>
                  <p className="text-xs text-muted-foreground">Right click</p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Medium menu item</ContextMenuItem>
                <ContextMenuItem>Another item</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Third item</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <ContextMenu size="lg" variant="warning">
              <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border-2 border-orange-500/30 bg-orange-500/5">
                <div className="text-center">
                  <p className="font-medium text-orange-600 dark:text-orange-400">
                    Large
                  </p>
                  <p className="text-xs text-muted-foreground">Right click</p>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Large menu item</ContextMenuItem>
                <ContextMenuItem>Another item</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Third item</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </section>

        {/* File Explorer Context Menu */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-2xl font-bold text-foreground">
              File Explorer Example
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <ContextMenu variant="primary">
            <ContextMenuTrigger className="p-8 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-gradient-to-br from-white/50 to-transparent dark:from-slate-900/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Folder, name: "Documents", type: "folder" },
                  { icon: Image, name: "Photos.jpg", type: "image" },
                  { icon: Video, name: "Video.mp4", type: "video" },
                  { icon: Music, name: "Song.mp3", type: "audio" },
                  { icon: FileText, name: "Report.pdf", type: "document" },
                  { icon: Archive, name: "Archive.zip", type: "archive" },
                  { icon: Code, name: "App.tsx", type: "code" },
                  { icon: Palette, name: "Design.fig", type: "design" },
                ].map((file) => {
                  const Icon = file.icon;
                  return (
                    <div
                      key={file.name}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                      <p className="text-xs text-center truncate w-full">
                        {file.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem icon={<Eye className="w-4 h-4" />}>
                Open
                <ContextMenuShortcut>⌘O</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<EyeOff className="w-4 h-4" />}>
                Open in New Window
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<Scissors className="w-4 h-4" />}>
                Cut
                <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<Copy className="w-4 h-4" />}>
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<ClipboardPaste className="w-4 h-4" />}>
                Paste
                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<Edit className="w-4 h-4" />}>
                Rename
                <ContextMenuShortcut>F2</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem icon={<Star className="w-4 h-4" />}>
                Add to Favorites
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger icon={<Share2 className="w-4 h-4" />}>
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Email</ContextMenuItem>
                  <ContextMenuItem>Messages</ContextMenuItem>
                  <ContextMenuItem>AirDrop</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Copy Link</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem
                variant="destructive"
                icon={<Trash2 className="w-4 h-4" />}
              >
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </section>

        {/* Settings Example */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-2xl font-bold text-foreground">
              Settings Panel Example
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <ContextMenu variant="secondary">
            <ContextMenuTrigger className="p-6 rounded-xl border-2 border-border bg-card">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Application Settings</h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Theme:</span>
                    <span className="font-medium capitalize">{theme}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">View Mode:</span>
                    <span className="font-medium capitalize">{viewMode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Bookmarks:</span>
                    <span className="font-medium">
                      {showBookmarks ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Right-click to change settings
                </p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuLabel>Appearance</ContextMenuLabel>
              <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
                <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
                <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
                <ContextMenuRadioItem value="system">
                  System
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
              <ContextMenuSeparator />
              <ContextMenuLabel>View</ContextMenuLabel>
              <ContextMenuRadioGroup
                value={viewMode}
                onValueChange={setViewMode}
              >
                <ContextMenuRadioItem value="grid">
                  Grid View
                </ContextMenuRadioItem>
                <ContextMenuRadioItem value="list">
                  List View
                </ContextMenuRadioItem>
                <ContextMenuRadioItem value="compact">
                  Compact View
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem
                checked={showBookmarks}
                onCheckedChange={setShowBookmarks}
              >
                Show Bookmarks
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={showFullUrls}
                onCheckedChange={setShowFullUrls}
              >
                Show Full URLs
              </ContextMenuCheckboxItem>
            </ContextMenuContent>
          </ContextMenu>
        </section>
      </div>
    </div>
  );
}
