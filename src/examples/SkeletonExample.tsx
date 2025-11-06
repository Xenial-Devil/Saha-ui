"use client";

import React, { useState } from "react";
import { Skeleton } from "../components/Skeleton";
import {
  SkeletonCard,
  SkeletonAvatar,
  SkeletonList,
  SkeletonTable,
  SkeletonForm,
  SkeletonText,
} from "../components/Skeleton/presets";
import { Card } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

export const SkeletonExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-12 p-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Skeleton Component</h2>
        <p className="text-muted-foreground text-lg mb-6">
          Flexible skeleton loaders for displaying placeholder content while
          data is loading. Improves perceived performance and reduces layout
          shift.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold">Perceived Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Instant visual feedback
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <span className="text-xl">📐</span>
              </div>
              <div>
                <h4 className="font-semibold">Layout Stability</h4>
                <p className="text-sm text-muted-foreground">
                  Prevents content shift
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <h4 className="font-semibold">Better UX</h4>
                <p className="text-sm text-muted-foreground">
                  Communicates loading state
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Animation Variants */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Animation Variants</h3>
        <p className="text-muted-foreground mb-6">
          Different animation styles for various use cases and brand aesthetics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Default</p>
              <Badge variant="outline" size="sm">
                Subtle
              </Badge>
            </div>
            <Skeleton variant="default" height="80px" />
            <p className="text-xs text-muted-foreground">
              Simple pulse animation
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Pulse</p>
              <Badge variant="outline" size="sm">
                Popular
              </Badge>
            </div>
            <Skeleton variant="pulse" height="80px" />
            <p className="text-xs text-muted-foreground">
              Enhanced pulse rhythm
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Wave</p>
              <Badge variant="outline" size="sm">
                Premium
              </Badge>
            </div>
            <Skeleton variant="wave" height="80px" />
            <p className="text-xs text-muted-foreground">
              Sweeping wave effect
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Shimmer</p>
              <Badge variant="outline" size="sm">
                Energetic
              </Badge>
            </div>
            <Skeleton variant="shimmer" height="80px" />
            <p className="text-xs text-muted-foreground">
              Fast shimmer with accent
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Gradient</p>
              <Badge variant="outline" size="sm">
                Smooth
              </Badge>
            </div>
            <Skeleton variant="gradient" height="80px" />
            <p className="text-xs text-muted-foreground">Gradient color flow</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Glass</p>
              <Badge variant="outline" size="sm">
                Modern
              </Badge>
            </div>
            <Skeleton variant="glass" height="80px" />
            <p className="text-xs text-muted-foreground">
              Glass morphism effect
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">Glow</p>
              <Badge variant="outline" size="sm">
                Attention
              </Badge>
            </div>
            <Skeleton variant="glow" height="80px" />
            <p className="text-xs text-muted-foreground">
              Glowing shadow effect
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">No Animation</p>
              <Badge variant="outline" size="sm">
                A11y
              </Badge>
            </div>
            <Skeleton variant="default" height="80px" noAnimation />
            <p className="text-xs text-muted-foreground">
              Reduced motion support
            </p>
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Shapes</h3>
        <p className="text-muted-foreground mb-6">
          Pre-configured shapes for common UI elements.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Rectangle</p>
            <Skeleton
              shape="rectangle"
              variant="shimmer"
              width="100%"
              height="80px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Circle</p>
            <Skeleton
              shape="circle"
              variant="shimmer"
              width="80px"
              height="80px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Rounded</p>
            <Skeleton
              shape="rounded"
              variant="shimmer"
              width="100%"
              height="80px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Text</p>
            <Skeleton shape="text" variant="shimmer" count={4} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Card</p>
            <Skeleton
              shape="card"
              variant="shimmer"
              width="100%"
              height="80px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Button</p>
            <Skeleton shape="button" variant="shimmer" width="100%" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Input</p>
            <Skeleton shape="input" variant="shimmer" width="100%" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Avatar</p>
            <Skeleton
              shape="avatar"
              variant="shimmer"
              width="80px"
              height="80px"
            />
          </div>
        </div>
      </section>

      {/* Animation Speeds */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Animation Speeds</h3>
        <p className="text-muted-foreground mb-6">
          Control animation timing to match your app's personality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Slow (3s)</p>
            <Skeleton variant="wave" speed="slow" height="60px" />
            <p className="text-xs text-muted-foreground">Calm and subtle</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Normal (1.5s)</p>
            <Skeleton variant="wave" speed="normal" height="60px" />
            <p className="text-xs text-muted-foreground">Balanced default</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Fast (1s)</p>
            <Skeleton variant="wave" speed="fast" height="60px" />
            <p className="text-xs text-muted-foreground">Quick and energetic</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Ultra Fast (0.6s)</p>
            <Skeleton variant="wave" speed="ultra-fast" height="60px" />
            <p className="text-xs text-muted-foreground">Very responsive</p>
          </div>
        </div>
      </section>

      {/* Multiple Lines & Spacing */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Multiple Lines & Spacing</h3>
        <p className="text-muted-foreground mb-6">
          Stack multiple skeleton elements with customizable spacing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Tight Spacing</p>
            <Skeleton variant="pulse" count={4} spacing="tight" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Normal Spacing</p>
            <Skeleton variant="pulse" count={4} spacing="normal" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Loose Spacing</p>
            <Skeleton variant="shimmer" count={4} spacing="loose" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium mb-2">Relaxed Spacing</p>
            <Skeleton variant="shimmer" count={4} spacing="relaxed" />
          </div>
        </div>
      </section>

      {/* Preset Components */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Preset Components</h3>
        <p className="text-muted-foreground mb-6">
          Pre-built skeleton loaders for common UI patterns. Ready to use out of
          the box.
        </p>

        {/* Skeleton Card */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            SkeletonCard
            <Badge variant="secondary" size="sm">
              Preset
            </Badge>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard variant="wave" />
            <SkeletonCard variant="shimmer" showImage={false} lines={4} />
            <SkeletonCard
              variant="gradient"
              imageHeight="150px"
              showActions={false}
            />
          </div>
          <Card className="mt-4 p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              {`<SkeletonCard variant="wave" imageHeight="200px" lines={3} />`}
            </p>
          </Card>
        </div>

        {/* Skeleton Avatar */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            SkeletonAvatar
            <Badge variant="secondary" size="sm">
              Preset
            </Badge>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium mb-3">Sizes</p>
              <div className="flex items-center gap-4 flex-wrap">
                <SkeletonAvatar size="xs" variant="shimmer" />
                <SkeletonAvatar size="sm" variant="shimmer" />
                <SkeletonAvatar size="md" variant="shimmer" />
                <SkeletonAvatar size="lg" variant="shimmer" />
                <SkeletonAvatar size="xl" variant="shimmer" />
                <SkeletonAvatar size="2xl" variant="shimmer" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">With Text (1 line)</p>
              <SkeletonAvatar size="lg" showText lines={1} variant="pulse" />
            </div>
            <div>
              <p className="text-sm font-medium mb-3">With Text (2 lines)</p>
              <SkeletonAvatar size="lg" showText lines={2} variant="pulse" />
            </div>
          </div>
          <Card className="mt-4 p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              {`<SkeletonAvatar size="lg" showText lines={2} />`}
            </p>
          </Card>
        </div>

        {/* Skeleton List */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            SkeletonList
            <Badge variant="secondary" size="sm">
              Preset
            </Badge>
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium mb-3">Default List</p>
              <SkeletonList items={3} variant="pulse" />
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Compact List</p>
              <SkeletonList
                items={5}
                avatarSize="sm"
                lines={1}
                variant="shimmer"
              />
            </div>
          </div>
          <Card className="mt-4 p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              {`<SkeletonList items={5} avatarSize="md" lines={2} />`}
            </p>
          </Card>
        </div>

        {/* Skeleton Table */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            SkeletonTable
            <Badge variant="secondary" size="sm">
              Preset
            </Badge>
          </h4>
          <SkeletonTable rows={5} columns={4} variant="pulse" />
          <Card className="mt-4 p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              {`<SkeletonTable rows={5} columns={4} showHeader={true} />`}
            </p>
          </Card>
        </div>

        {/* Skeleton Form */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            SkeletonForm
            <Badge variant="secondary" size="sm">
              Preset
            </Badge>
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonForm fields={4} variant="pulse" />
            <SkeletonForm fields={6} showButton={false} variant="wave" />
          </div>
          <Card className="mt-4 p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              {`<SkeletonForm fields={4} showButton={true} />`}
            </p>
          </Card>
        </div>

        {/* Skeleton Text */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
            SkeletonText
            <Badge variant="secondary" size="sm">
              Preset
            </Badge>
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium mb-3">Short Paragraph</p>
              <SkeletonText lines={3} lastLineWidth={60} variant="pulse" />
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Long Paragraph</p>
              <SkeletonText lines={8} lastLineWidth={45} variant="shimmer" />
            </div>
          </div>
          <Card className="mt-4 p-4 bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              {`<SkeletonText lines={5} lastLineWidth={60} />`}
            </p>
          </Card>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Real-world Examples</h3>
        <p className="text-muted-foreground mb-6">
          Complete examples showing how skeleton loaders work in production
          scenarios.
        </p>

        {/* Toggle Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsLoading(!isLoading)}
            variant={isLoading ? "error" : "success"}
          >
            {isLoading ? "Show Loaded Content" : "Show Loading State"}
          </Button>
        </div>

        {/* Dashboard Example */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Dashboard Layout</h4>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <SkeletonCard variant="wave" imageHeight="300px" />
                <SkeletonList items={4} variant="shimmer" />
              </div>
              <div className="space-y-6">
                <Card className="p-4">
                  <Skeleton variant="shimmer" height="20px" className="mb-4" />
                  <Skeleton
                    variant="pulse"
                    count={5}
                    height="14px"
                    spacing="normal"
                  />
                </Card>
                <SkeletonForm fields={3} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card className="overflow-hidden">
                  <div className="h-[300px] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <p className="text-2xl font-bold">Content Loaded! 🎉</p>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">
                      Your Amazing Content
                    </h3>
                    <p className="text-muted-foreground">
                      This is where your actual content appears after loading.
                    </p>
                  </div>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Quick Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Users</span>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Revenue</span>
                      <span className="font-bold">$5,678</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Profile Page Example */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Profile Page</h4>
          {isLoading ? (
            <Card className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <SkeletonAvatar size="2xl" variant="shimmer" />
                <div className="flex-1">
                  <Skeleton
                    variant="shimmer"
                    height="32px"
                    width="200px"
                    className="mb-2"
                  />
                  <Skeleton
                    variant="pulse"
                    height="16px"
                    width="300px"
                    className="mb-4"
                  />
                  <div className="flex gap-2">
                    <Skeleton variant="shimmer" shape="button" width="100px" />
                    <Skeleton variant="shimmer" shape="button" width="100px" />
                  </div>
                </div>
              </div>
              <SkeletonText lines={6} lastLineWidth={70} variant="pulse" />
            </Card>
          ) : (
            <Card className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl">
                  👤
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">John Doe</h3>
                  <p className="text-muted-foreground mb-4">
                    @johndoe • Product Designer
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm">Follow</Button>
                    <Button size="sm" variant="outline">
                      Message
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                Passionate about creating beautiful and functional user
                interfaces. Always learning and exploring new design trends.
              </p>
            </Card>
          )}
        </div>

        {/* Product Grid Example */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Product Grid</h4>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard
                  key={index}
                  variant="wave"
                  imageHeight="200px"
                  lines={2}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-[200px] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">Product {index + 1}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Great product description
                    </p>
                    <p className="font-bold text-primary">$99.99</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-semibold mb-2">DO</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Match skeleton size to actual content</li>
                  <li>• Use consistent animation across your app</li>
                  <li>• Provide reduced motion alternatives</li>
                  <li>• Keep animation subtle and professional</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">❌</span>
              <div>
                <h4 className="font-semibold mb-2">DON&apos;T</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use too many different variants</li>
                  <li>• Make animations too fast or distracting</li>
                  <li>• Show skeletons for too long</li>
                  <li>• Forget accessibility considerations</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SkeletonExample;
