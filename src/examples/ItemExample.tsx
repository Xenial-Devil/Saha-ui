import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
  ItemGroup,
  ItemSeparator,
  ItemBadge,
} from "../components/Item";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import {
  Mail,
  Home,
  Settings,
  User,
  Star,
  Heart,
  Bell,
  ChevronRight,
  Trash2,
  Edit,
} from "lucide-react";

export const ItemExample = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Star className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Item Component
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A flexible, composable component for displaying content with media,
            title, description, and actions. Supports both compact props-based
            and component APIs.
          </p>
        </section>

        <div className="w-full grid lg:grid-cols-2 gap-8">
          {/* Compact Props API */}
          <section className="space-y-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Compact Props API</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Basic Usage
                </h4>
                <div className="space-y-3">
                  <Item
                    variant="bordered"
                    media={<Home className="w-5 h-5 text-primary" />}
                    title="Dashboard"
                    description="View your application overview"
                  />
                  <Item
                    variant="bordered"
                    media={<Mail className="w-5 h-5 text-blue-500" />}
                    title="Messages"
                    description="You have 12 new messages"
                    badge="12"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  With Actions
                </h4>
                <div className="space-y-3">
                  <Item
                    variant="elevated"
                    media={<Settings className="w-5 h-5 text-purple-500" />}
                    title="Settings"
                    description="Manage your account settings"
                    actions={
                      <Button size="sm" variant="primary">
                        Edit
                      </Button>
                    }
                  />
                  <Item
                    variant="elevated"
                    media={<Bell className="w-5 h-5 text-amber-500" />}
                    title="Notifications"
                    description="Configure notification preferences"
                    actions={
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  With Header and Footer
                </h4>
                <Item
                  variant="glass"
                  header={
                    <div className="text-xs text-muted-foreground font-medium">
                      ⭐ Featured Section
                    </div>
                  }
                  media={
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  }
                  title="Featured Item"
                  description="This item includes header and footer sections"
                  footer={
                    <div className="text-xs text-muted-foreground">
                      🕐 Last updated: 2 hours ago
                    </div>
                  }
                />
              </div>
            </div>
          </section>
          {/* Component API */}
          <section className="space-y-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold">
                Component Composition API
              </h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Basic Composition
                </h4>
                <Item variant="soft">
                  <ItemMedia variant="icon">
                    <User className="w-5 h-5 text-green-500" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>User Profile</ItemTitle>
                    <ItemDescription>
                      Manage your user profile information
                    </ItemDescription>
                  </ItemContent>
                </Item>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  With Avatar
                </h4>
                <Item
                  variant="bordered"
                  clickable
                  className="hover:shadow-lg transition-shadow"
                >
                  <ItemMedia variant="avatar">
                    <Avatar
                      src="https://i.pravatar.cc/150?img=1"
                      alt="John Doe"
                      size="md"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>John Doe</ItemTitle>
                    <ItemDescription>john.doe@example.com</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button size="sm" variant="primary">
                      View Profile
                    </Button>
                  </ItemActions>
                </Item>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  asChild Pattern
                </h4>
                <Item asChild clickable variant="ghost">
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "start",
                      gap: "12px",
                    }}
                    className="group"
                  >
                    <ItemMedia variant="icon">
                      <Home className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Clickable Item</ItemTitle>
                      <ItemDescription>
                        This item is rendered as a link element
                      </ItemDescription>
                    </ItemContent>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </a>
                </Item>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  With Header & Footer
                </h4>
                <Item variant="elevated">
                  <ItemHeader>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Header Section
                      </span>
                      <ItemBadge variant="info">New</ItemBadge>
                    </div>
                  </ItemHeader>
                  <div className="flex items-start gap-3">
                    <ItemMedia variant="icon">
                      <Star className="w-5 h-5 text-yellow-500" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Item with Header and Footer</ItemTitle>
                      <ItemDescription>
                        This item demonstrates header and footer sections
                      </ItemDescription>
                    </ItemContent>
                  </div>
                  <ItemFooter>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      🕐 Footer Section - Last updated 5 min ago
                    </div>
                  </ItemFooter>
                </Item>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Multiple Actions
                </h4>
                <Item
                  variant="soft"
                  className="hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <ItemMedia variant="icon">
                      <Settings className="w-5 h-5 text-purple-500" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Project Settings</ItemTitle>
                      <ItemDescription>
                        Configure your project preferences
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="primary">
                        Save
                      </Button>
                    </ItemActions>
                  </div>
                </Item>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  ItemGroup with Separators
                </h4>
                <ItemGroup
                  variant="divided"
                  className="bg-background/50 rounded-xl"
                >
                  <Item
                    clickable
                    media={<Home className="w-5 h-5 text-primary" />}
                    title="Home"
                    description="Dashboard overview"
                  />
                  <ItemSeparator />
                  <Item
                    clickable
                    media={<Mail className="w-5 h-5 text-blue-500" />}
                    title="Messages"
                    description="View your inbox"
                  />
                  <ItemSeparator />
                  <Item
                    clickable
                    media={<Settings className="w-5 h-5 text-purple-500" />}
                    title="Settings"
                    description="Manage preferences"
                  />
                </ItemGroup>
              </div>
            </div>
          </section>
        </div>

        {/* Variants Section */}
        <section className="space-y-6 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold">Style Variants</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Item
              variant="default"
              media={<Home className="w-5 h-5 text-primary" />}
              title="Default"
              description="Subtle background styling"
              clickable
            />
            <Item
              variant="bordered"
              media={<Mail className="w-5 h-5 text-blue-500" />}
              title="Bordered"
              description="With visible border"
              clickable
            />
            <Item
              variant="elevated"
              media={<Settings className="w-5 h-5 text-purple-500" />}
              title="Elevated"
              description="Shadow effect"
              clickable
            />
            <Item
              variant="ghost"
              media={<User className="w-5 h-5 text-green-500" />}
              title="Ghost"
              description="Shows on hover"
              clickable
            />
            <Item
              variant="glass"
              media={<Star className="w-5 h-5 text-yellow-500" />}
              title="Glass"
              description="Glassmorphism"
              clickable
            />
            <Item
              variant="soft"
              media={<Heart className="w-5 h-5 text-red-500 fill-red-500/20" />}
              title="Soft"
              description="Subtle colors"
              clickable
            />
          </div>
        </section>

        {/* Color Variants Section */}
        <section className="space-y-6 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rainbow-500/20 via-pink-500/20 to-purple-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            </div>
            <h3 className="text-2xl font-semibold">Color Variants</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Item
              variant="primary"
              media={<Star className="w-5 h-5 text-primary" />}
              title="Primary"
              description="Primary brand color"
              clickable
            />
            <Item
              variant="secondary"
              media={<Settings className="w-5 h-5 text-secondary" />}
              title="Secondary"
              description="Secondary accent"
              clickable
            />
            <Item
              variant="accent"
              media={<Heart className="w-5 h-5 text-accent" />}
              title="Accent"
              description="Accent highlight"
              clickable
            />
            <Item
              variant="success"
              media={<Star className="w-5 h-5 text-green-500 fill-green-500" />}
              title="Success"
              description="Success state"
              clickable
              badge="✓"
            />
            <Item
              variant="warning"
              media={<Bell className="w-5 h-5 text-amber-500" />}
              title="Warning"
              description="Warning state"
              clickable
              badge="!"
            />
            <Item
              variant="error"
              media={<Trash2 className="w-5 h-5 text-red-500" />}
              title="Error"
              description="Error state"
              clickable
              badge="×"
            />
            <Item
              variant="info"
              media={<Mail className="w-5 h-5 text-blue-500" />}
              title="Info"
              description="Information state"
              clickable
              badge="i"
            />
          </div>
        </section>

        {/* Color Variants with Active States */}
        <section className="space-y-6 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-green-500 fill-green-500" />
            </div>
            <h3 className="text-2xl font-semibold">Active Color States</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Normal State
              </h4>
              <Item
                variant="success"
                media={<Home className="w-5 h-5 text-green-500" />}
                title="Success Item"
                description="Normal state"
                clickable
              />
              <Item
                variant="warning"
                media={<Bell className="w-5 h-5 text-amber-500" />}
                title="Warning Item"
                description="Normal state"
                clickable
              />
              <Item
                variant="error"
                media={<Trash2 className="w-5 h-5 text-red-500" />}
                title="Error Item"
                description="Normal state"
                clickable
              />
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Active State
              </h4>
              <Item
                variant="success"
                media={<Home className="w-5 h-5 text-green-500" />}
                title="Success Item"
                description="Active state"
                clickable
                active
              />
              <Item
                variant="warning"
                media={<Bell className="w-5 h-5 text-amber-500" />}
                title="Warning Item"
                description="Active state"
                clickable
                active
              />
              <Item
                variant="error"
                media={<Trash2 className="w-5 h-5 text-red-500" />}
                title="Error Item"
                description="Active state"
                clickable
                active
              />
            </div>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="space-y-6 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-2xl font-semibold">Sizes</h3>
          </div>
          <div className="space-y-4">
            <Item
              size="sm"
              variant="bordered"
              media={<Home className="w-4 h-4 text-primary" />}
              title="Small Size"
              description="Compact layout for dense interfaces"
            />
            <Item
              size="md"
              variant="bordered"
              media={<Mail className="w-5 h-5 text-blue-500" />}
              title="Medium Size"
              description="Default size for most use cases"
            />
            <Item
              size="lg"
              variant="bordered"
              media={<Settings className="w-6 h-6 text-purple-500" />}
              title="Large Size"
              description="More spacious layout for prominent items"
            />
          </div>
        </section>

        {/* States */}
        <section className="space-y-6 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold">Interactive States</h3>
          </div>
          <div className="space-y-4">
            <Item
              clickable
              variant="bordered"
              media={<Home className="w-5 h-5 text-primary" />}
              title="Clickable Item"
              description="Hover to see interaction effect"
              className="hover:scale-[1.02] transition-transform"
            />
            <Item
              clickable
              active
              variant="soft"
              media={<Mail className="w-5 h-5 text-blue-500" />}
              title="Active Item"
              description="Currently selected or active"
            />
            <Item
              disabled
              variant="bordered"
              media={<Settings className="w-5 h-5" />}
              title="Disabled Item"
              description="Not interactive"
            />
          </div>
        </section>

        {/* Media Variants */}
        <section className="space-y-6 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-2xl font-semibold">Media Variants</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Item variant="bordered" clickable>
              <ItemMedia variant="icon">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Icon Media</ItemTitle>
                <ItemDescription>Using icon as media</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="bordered" clickable>
              <ItemMedia variant="avatar">
                <Avatar
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User"
                  size="md"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Avatar Media</ItemTitle>
                <ItemDescription>Using avatar component</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="bordered" clickable>
              <ItemMedia variant="image">
                <img
                  src="https://picsum.photos/seed/item1/80/80"
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Image Media</ItemTitle>
                <ItemDescription>Square image element</ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="bordered" clickable>
              <ItemMedia variant="thumbnail">
                <img
                  src="https://picsum.photos/seed/item2/120/80"
                  alt="Thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Thumbnail Media</ItemTitle>
                <ItemDescription>Wider aspect ratio thumbnail</ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </section>

        {/* Item Groups - Full Width */}
        <section className="space-y-8 p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-semibold">
              Item Groups & Complex Examples
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Default Group
              </h4>
              <ItemGroup className="bg-background/50 rounded-xl">
                <Item
                  clickable
                  media={<Home className="w-5 h-5 text-primary" />}
                  title="Home"
                  description="Go to dashboard"
                />
                <Item
                  clickable
                  media={<Mail className="w-5 h-5 text-blue-500" />}
                  title="Messages"
                  description="View your messages"
                />
                <Item
                  clickable
                  media={<Settings className="w-5 h-5 text-purple-500" />}
                  title="Settings"
                  description="Configure application"
                />
              </ItemGroup>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Bordered Group
              </h4>
              <ItemGroup variant="bordered">
                <Item
                  clickable
                  media={<User className="w-5 h-5 text-green-500" />}
                  title="Profile"
                  description="Edit your profile"
                />
                <Item
                  clickable
                  media={<Star className="w-5 h-5 text-yellow-500" />}
                  title="Favorites"
                  description="Your favorite items"
                />
              </ItemGroup>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Divided with Separators
              </h4>
              <ItemGroup
                variant="divided"
                className="bg-background/50 rounded-xl"
              >
                <Item
                  clickable
                  media={<Home className="w-5 h-5 text-primary" />}
                  title="Dashboard"
                  description="Overview"
                />
                <ItemSeparator />
                <Item
                  clickable
                  media={<Mail className="w-5 h-5 text-blue-500" />}
                  title="Inbox"
                  description="12 new messages"
                  badge="12"
                />
                <ItemSeparator />
                <Item
                  clickable
                  media={<Bell className="w-5 h-5 text-amber-500" />}
                  title="Notifications"
                  description="3 unread"
                  badge="3"
                />
              </ItemGroup>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Cards Group
              </h4>
              <ItemGroup variant="cards">
                <Item
                  variant="elevated"
                  clickable
                  media={
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  }
                  title="Featured"
                  description="Top picks for you"
                  actions={
                    <Button size="sm" variant="primary">
                      View
                    </Button>
                  }
                  className="hover:shadow-xl transition-shadow"
                />
                <Item
                  variant="elevated"
                  clickable
                  media={
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  }
                  title="Favorites"
                  description="Your saved items"
                  actions={
                    <Button size="sm" variant="primary">
                      View
                    </Button>
                  }
                  className="hover:shadow-xl transition-shadow"
                />
              </ItemGroup>
            </div>

            <div className="space-y-3 lg:col-span-2">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Navigation List Example
              </h4>
              <ItemGroup variant="bordered" className="bg-background">
                <Item clickable active>
                  <ItemMedia variant="icon">
                    <Home className="w-5 h-5 text-primary" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Dashboard</ItemTitle>
                    <ItemDescription>Main overview</ItemDescription>
                  </ItemContent>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Item>
                <ItemSeparator />
                <Item clickable>
                  <ItemMedia variant="icon">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Messages</ItemTitle>
                    <ItemDescription>12 unread</ItemDescription>
                  </ItemContent>
                  <ItemBadge variant="primary">12</ItemBadge>
                </Item>
                <ItemSeparator />
                <Item clickable>
                  <ItemMedia variant="icon">
                    <Bell className="w-5 h-5 text-amber-500" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Notifications</ItemTitle>
                    <ItemDescription>3 new alerts</ItemDescription>
                  </ItemContent>
                  <ItemBadge variant="error">3</ItemBadge>
                </Item>
                <ItemSeparator />
                <Item clickable>
                  <ItemMedia variant="icon">
                    <Settings className="w-5 h-5 text-purple-500" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Settings</ItemTitle>
                    <ItemDescription>App preferences</ItemDescription>
                  </ItemContent>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Item>
              </ItemGroup>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemExample;
