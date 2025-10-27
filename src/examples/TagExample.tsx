import { Tag, TagGroup } from "../components/Tag";
import {
  Star,
  Heart,
  Zap,
  Check,
  AlertCircle,
  Code,
  Globe,
  Mail,
  Phone,
  Clock,
  Sparkles,
  Flame,
  Award,
} from "lucide-react";

export function TagExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Tag Component</h2>
        <p className="text-muted-foreground">
          Versatile tags for labels, categories, status indicators with advanced
          features.
        </p>
      </div>

      {/* Basic Tags */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Basic Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag>Default Tag</Tag>
          <Tag label="Label Tag" />
          <Tag>Technology</Tag>
          <Tag>Design</Tag>
          <Tag>Development</Tag>
        </div>
      </section>

      {/* Different Variants */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Different Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="default">Default</Tag>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="accent">Accent</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
          <Tag variant="info">Info</Tag>
          <Tag variant="outline">Outline</Tag>
          <Tag variant="ghost">Ghost</Tag>
          <Tag variant="glass">Glass</Tag>
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Tag size="sm" variant="primary">
            Small
          </Tag>
          <Tag size="md" variant="primary">
            Medium
          </Tag>
          <Tag size="lg" variant="primary">
            Large
          </Tag>
        </div>
      </section>

      {/* Rounded Variants */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Rounded Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Tag rounded="none" variant="accent">
            No Rounding
          </Tag>
          <Tag rounded="default" variant="accent">
            Default Rounded
          </Tag>
          <Tag rounded="full" variant="accent">
            Fully Rounded
          </Tag>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Tag icon={<Star className="h-4 w-4" />} variant="primary">
            Featured
          </Tag>
          <Tag icon={<Heart className="h-4 w-4" />} variant="error">
            Favorite
          </Tag>
          <Tag icon={<Zap className="h-4 w-4" />} variant="warning">
            Fast
          </Tag>
          <Tag icon={<Check className="h-4 w-4" />} variant="success">
            Verified
          </Tag>
          <Tag icon={<AlertCircle className="h-4 w-4" />} variant="info">
            Info
          </Tag>
        </div>
      </section>

      {/* With Avatars */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">With Avatars</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            avatar="https://i.pravatar.cc/150?img=1"
            variant="primary"
            size="md"
          >
            John Doe
          </Tag>
          <Tag
            avatar="https://i.pravatar.cc/150?img=2"
            variant="secondary"
            size="md"
          >
            Jane Smith
          </Tag>
          <Tag
            avatar="https://i.pravatar.cc/150?img=3"
            variant="accent"
            size="md"
          >
            Bob Johnson
          </Tag>
        </div>
      </section>

      {/* Removable Tags */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Removable Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            removable
            onRemove={() => console.log("Removed React")}
            variant="primary"
          >
            React
          </Tag>
          <Tag
            removable
            onRemove={() => console.log("Removed TypeScript")}
            variant="secondary"
          >
            TypeScript
          </Tag>
          <Tag
            removable
            onRemove={() => console.log("Removed Tailwind")}
            variant="accent"
          >
            Tailwind CSS
          </Tag>
          <Tag
            removable
            onRemove={() => console.log("Removed Vite")}
            variant="success"
          >
            Vite
          </Tag>
        </div>
      </section>

      {/* Clickable Tags */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Clickable Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            clickable
            onClick={() => alert("Clicked Frontend")}
            variant="primary"
          >
            Frontend
          </Tag>
          <Tag
            clickable
            onClick={() => alert("Clicked Backend")}
            variant="secondary"
          >
            Backend
          </Tag>
          <Tag
            clickable
            onClick={() => alert("Clicked DevOps")}
            variant="accent"
          >
            DevOps
          </Tag>
        </div>
      </section>

      {/* With Dots */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">With Status Dots</h3>
        <div className="flex flex-wrap gap-2">
          <Tag dot dotPosition="left" variant="success">
            Active
          </Tag>
          <Tag dot dotPosition="left" variant="warning">
            Pending
          </Tag>
          <Tag dot dotPosition="left" variant="error">
            Inactive
          </Tag>
          <Tag dot dotPosition="right" dotColor="#8b5cf6" variant="outline">
            Custom Color
          </Tag>
        </div>
      </section>

      {/* With Badges */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">With Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Tag badge={5} variant="primary">
            Notifications
          </Tag>
          <Tag badge="99+" badgeVariant="error" variant="secondary">
            Messages
          </Tag>
          <Tag badge={12} badgeVariant="success" variant="accent">
            Tasks
          </Tag>
          <Tag badge="New" badgeVariant="warning" variant="outline">
            Features
          </Tag>
        </div>
      </section>

      {/* Selected State */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Selected State</h3>
        <div className="flex flex-wrap gap-2">
          <Tag selected variant="primary">
            Selected Tag
          </Tag>
          <Tag variant="primary">Unselected Tag</Tag>
          <Tag selected variant="success">
            Active Filter
          </Tag>
        </div>
      </section>

      {/* Loading State */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Loading State</h3>
        <div className="flex flex-wrap gap-2">
          <Tag loading variant="primary">
            Loading...
          </Tag>
          <Tag loading variant="success">
            Processing
          </Tag>
          <Tag loading variant="accent">
            Saving
          </Tag>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Disabled State</h3>
        <div className="flex flex-wrap gap-2">
          <Tag disabled variant="primary">
            Disabled
          </Tag>
          <Tag disabled removable onRemove={() => {}} variant="success">
            Can't Remove
          </Tag>
          <Tag disabled clickable variant="accent">
            Can't Click
          </Tag>
        </div>
      </section>

      {/* Animated Tags */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Animated Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            animated
            variant="primary"
            icon={<Sparkles className="h-4 w-4" />}
          >
            Animated Entry
          </Tag>
          <Tag animated variant="success" icon={<Flame className="h-4 w-4" />}>
            Smooth Animation
          </Tag>
          <Tag animated variant="accent" icon={<Award className="h-4 w-4" />}>
            Featured Item
          </Tag>
        </div>
      </section>

      {/* Tag Groups */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Tag Groups</h3>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Default spacing with wrapping
            </p>
            <TagGroup>
              <Tag variant="primary">JavaScript</Tag>
              <Tag variant="primary">TypeScript</Tag>
              <Tag variant="primary">React</Tag>
              <Tag variant="primary">Vue</Tag>
              <Tag variant="primary">Angular</Tag>
              <Tag variant="primary">Svelte</Tag>
            </TagGroup>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Small spacing, no wrapping
            </p>
            <TagGroup spacing="sm" wrap={false}>
              <Tag variant="success" size="sm">
                HTML
              </Tag>
              <Tag variant="success" size="sm">
                CSS
              </Tag>
              <Tag variant="success" size="sm">
                SCSS
              </Tag>
              <Tag variant="success" size="sm">
                Tailwind
              </Tag>
            </TagGroup>
          </div>

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Maximum 4 tags (shows "+2 more")
            </p>
            <TagGroup max={4} spacing="md">
              <Tag variant="accent">Node.js</Tag>
              <Tag variant="accent">Express</Tag>
              <Tag variant="accent">NestJS</Tag>
              <Tag variant="accent">Fastify</Tag>
              <Tag variant="accent">Koa</Tag>
              <Tag variant="accent">Hapi</Tag>
            </TagGroup>
          </div>
        </div>
      </section>

      {/* Technology Stack Example */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Technology Stack Example</h3>
        <div className="space-y-4 rounded-xl border-2 border-border bg-card p-6">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Frontend
            </h4>
            <TagGroup spacing="sm">
              <Tag
                icon={<Code className="h-3 w-3" />}
                variant="primary"
                size="sm"
              >
                React
              </Tag>
              <Tag
                icon={<Code className="h-3 w-3" />}
                variant="primary"
                size="sm"
              >
                TypeScript
              </Tag>
              <Tag
                icon={<Code className="h-3 w-3" />}
                variant="primary"
                size="sm"
              >
                Tailwind CSS
              </Tag>
              <Tag
                icon={<Code className="h-3 w-3" />}
                variant="primary"
                size="sm"
              >
                Vite
              </Tag>
            </TagGroup>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Backend
            </h4>
            <TagGroup spacing="sm">
              <Tag
                icon={<Globe className="h-3 w-3" />}
                variant="success"
                size="sm"
              >
                Node.js
              </Tag>
              <Tag
                icon={<Globe className="h-3 w-3" />}
                variant="success"
                size="sm"
              >
                Express
              </Tag>
              <Tag
                icon={<Globe className="h-3 w-3" />}
                variant="success"
                size="sm"
              >
                PostgreSQL
              </Tag>
            </TagGroup>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              DevOps
            </h4>
            <TagGroup spacing="sm">
              <Tag
                icon={<Zap className="h-3 w-3" />}
                variant="accent"
                size="sm"
              >
                Docker
              </Tag>
              <Tag
                icon={<Zap className="h-3 w-3" />}
                variant="accent"
                size="sm"
              >
                GitHub Actions
              </Tag>
              <Tag
                icon={<Zap className="h-3 w-3" />}
                variant="accent"
                size="sm"
              >
                AWS
              </Tag>
            </TagGroup>
          </div>
        </div>
      </section>

      {/* Contact Info Example */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Contact Info Example</h3>
        <TagGroup spacing="md">
          <Tag
            icon={<Mail className="h-4 w-4" />}
            variant="outline"
            as="a"
            href="mailto:contact@example.com"
          >
            contact@example.com
          </Tag>
          <Tag
            icon={<Phone className="h-4 w-4" />}
            variant="outline"
            as="a"
            href="tel:+1234567890"
          >
            +1 (234) 567-890
          </Tag>
          <Tag icon={<Globe className="h-4 w-4" />} variant="outline">
            San Francisco, CA
          </Tag>
        </TagGroup>
      </section>

      {/* User Profile Tags */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">User Profile Tags</h3>
        <div className="rounded-xl border-2 border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold">Sarah Johnson</h4>
              <p className="text-sm text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                SKILLS
              </p>
              <TagGroup spacing="sm" max={6}>
                <Tag variant="primary" size="sm">
                  React
                </Tag>
                <Tag variant="primary" size="sm">
                  Node.js
                </Tag>
                <Tag variant="primary" size="sm">
                  TypeScript
                </Tag>
                <Tag variant="primary" size="sm">
                  PostgreSQL
                </Tag>
                <Tag variant="primary" size="sm">
                  Docker
                </Tag>
                <Tag variant="primary" size="sm">
                  AWS
                </Tag>
                <Tag variant="primary" size="sm">
                  GraphQL
                </Tag>
                <Tag variant="primary" size="sm">
                  Redis
                </Tag>
              </TagGroup>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                STATUS
              </p>
              <TagGroup spacing="sm">
                <Tag dot variant="success" size="sm">
                  Available for Work
                </Tag>
                <Tag
                  icon={<Clock className="h-3 w-3" />}
                  variant="outline"
                  size="sm"
                >
                  PST Timezone
                </Tag>
              </TagGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
