import React, { useState } from "react";
import Popover from "../components/Popover";
import Button from "../components/Button";

const PopoverExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-12 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Popover Component
        </h2>
        <p className="text-muted-foreground mb-8">
          Display rich interactive content in elegant popovers with multiple
          variants and positioning options.
        </p>
      </div>

      {/* Basic Popovers */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Basic Popovers
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover content="This is a simple popover">
            <Button variant="primary">Click me</Button>
          </Popover>

          <Popover content="Hover over me to see this popover" trigger="hover">
            <Button variant="secondary">Hover me</Button>
          </Popover>

          <Popover
            content="Focus on this button to see the popover"
            trigger="focus"
          >
            <Button variant="outline">Focus me</Button>
          </Popover>
        </div>
      </div>

      {/* Positions */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Positions
        </h3>
        <div className="flex flex-wrap gap-8 items-center justify-center p-8">
          <Popover content="Top position" position="top">
            <Button>Top</Button>
          </Popover>

          <Popover content="Top Start position" position="top-start">
            <Button>Top Start</Button>
          </Popover>

          <Popover content="Top End position" position="top-end">
            <Button>Top End</Button>
          </Popover>

          <Popover content="Bottom position" position="bottom">
            <Button>Bottom</Button>
          </Popover>

          <Popover content="Bottom Start" position="bottom-start">
            <Button>Bottom Start</Button>
          </Popover>

          <Popover content="Bottom End" position="bottom-end">
            <Button>Bottom End</Button>
          </Popover>

          <Popover content="Left position" position="left">
            <Button>Left</Button>
          </Popover>

          <Popover content="Right position" position="right">
            <Button>Right</Button>
          </Popover>
        </div>
      </div>

      {/* Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Popover
            variant="default"
            content="Default variant with standard styling"
          >
            <Button>Default</Button>
          </Popover>

          <Popover variant="primary" content="Primary color theme for emphasis">
            <Button variant="primary">Primary</Button>
          </Popover>

          <Popover
            variant="secondary"
            content="Secondary color theme for subtlety"
          >
            <Button variant="secondary">Secondary</Button>
          </Popover>

          <Popover
            variant="success"
            content="Success theme for positive feedback"
          >
            <Button variant="success">Success</Button>
          </Popover>

          <Popover
            variant="warning"
            content="Warning theme for important notices"
          >
            <Button variant="warning">Warning</Button>
          </Popover>

          <Popover
            variant="danger"
            content="Danger theme for critical information"
          >
            <Button variant="error">Danger</Button>
          </Popover>

          <Popover variant="accent" content="Accent color theme for highlights">
            <Button variant="accent">Accent</Button>
          </Popover>

          <Popover
            variant="info"
            content="Info theme for informational content"
          >
            <Button variant="info">Info</Button>
          </Popover>

          <Popover
            variant="glass"
            content="Glass morphism effect with backdrop blur"
          >
            <Button variant="glass">Glass</Button>
          </Popover>

          <Popover
            variant="bordered"
            content="Emphasized border for more contrast"
          >
            <Button variant="outline">Bordered</Button>
          </Popover>

          <Popover variant="elevated" content="Elevated with stronger shadow">
            <Button>Elevated</Button>
          </Popover>

          <Popover
            variant="flat"
            content="Minimal flat design with subtle border"
          >
            <Button>Flat</Button>
          </Popover>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Sizes</h3>
        <div className="flex flex-wrap gap-4">
          <Popover size="sm" content="Small popover">
            <Button size="sm">Small</Button>
          </Popover>

          <Popover size="md" content="Medium popover (default)">
            <Button size="md">Medium</Button>
          </Popover>

          <Popover
            size="lg"
            content="Large popover with more space for content"
          >
            <Button size="lg">Large</Button>
          </Popover>

          <Popover
            size="xl"
            content="Extra large popover for extensive content"
          >
            <Button size="lg">Extra Large</Button>
          </Popover>
        </div>
      </div>

      {/* With Title */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          With Title
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover
            title="Information"
            content="This popover has a title to provide context"
          >
            <Button>With Title</Button>
          </Popover>

          <Popover
            title="Settings"
            showCloseButton
            content={
              <div className="space-y-2">
                <div>Notification settings</div>
                <div>Privacy settings</div>
                <div>Account settings</div>
              </div>
            }
          >
            <Button>With Close Button</Button>
          </Popover>
        </div>
      </div>

      {/* With Footer */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          With Footer
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover
            title="Confirm Action"
            content="Are you sure you want to proceed with this action?"
            footer={
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
                <Button size="sm" variant="primary">
                  Confirm
                </Button>
              </div>
            }
          >
            <Button variant="error">Delete Item</Button>
          </Popover>

          <Popover
            variant="glass"
            title="Quick Actions"
            content={
              <div className="space-y-2 text-sm">
                <div className="cursor-pointer hover:text-primary transition-colors">
                  Edit
                </div>
                <div className="cursor-pointer hover:text-primary transition-colors">
                  Duplicate
                </div>
                <div className="cursor-pointer hover:text-primary transition-colors">
                  Share
                </div>
              </div>
            }
            footer={
              <Button size="sm" variant="ghost" className="w-full">
                More Options
              </Button>
            }
          >
            <Button>Actions Menu</Button>
          </Popover>
        </div>
      </div>

      {/* Rich Content */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Rich Content
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover
            size="lg"
            variant="elevated"
            title="User Profile"
            content={
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      john.doe@example.com
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Software Engineer at Tech Corp
                </div>
                <div className="flex gap-2">
                  <div className="text-center">
                    <div className="font-bold">234</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">1.2K</div>
                    <div className="text-xs text-muted-foreground">
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">456</div>
                    <div className="text-xs text-muted-foreground">
                      Following
                    </div>
                  </div>
                </div>
              </div>
            }
            footer={
              <Button size="sm" variant="primary" className="w-full">
                View Full Profile
              </Button>
            }
          >
            <Button>View Profile</Button>
          </Popover>

          <Popover
            size="lg"
            variant="glass"
            title="Color Picker"
            content={
              <div className="grid grid-cols-5 gap-2">
                {[
                  "bg-red-500",
                  "bg-orange-500",
                  "bg-yellow-500",
                  "bg-green-500",
                  "bg-blue-500",
                  "bg-indigo-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-gray-500",
                  "bg-black",
                ].map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-md ${color} cursor-pointer hover:scale-110 transition-transform border border-border/20`}
                  />
                ))}
              </div>
            }
          >
            <Button>Pick Color</Button>
          </Popover>
        </div>
      </div>

      {/* Controlled Popover */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Controlled Popover
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger="manual"
            content={
              <div>
                This is a controlled popover. Use the buttons to control its
                visibility.
              </div>
            }
          >
            <Button variant="outline">Target Element</Button>
          </Popover>

          <Button onClick={() => setIsOpen(true)}>Open Popover</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close Popover
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            Toggle Popover
          </Button>
        </div>
      </div>

      {/* Without Arrow */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Without Arrow
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover arrow={false} content="Popover without arrow">
            <Button>No Arrow</Button>
          </Popover>

          <Popover
            arrow={false}
            variant="glass"
            title="Clean Design"
            content="Sometimes a cleaner look without an arrow is preferred"
          >
            <Button>Glass No Arrow</Button>
          </Popover>
        </div>
      </div>

      {/* Custom Offset */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Custom Offset
        </h3>
        <div className="flex flex-wrap gap-4">
          <Popover offset={4} content="Close to trigger (4px)">
            <Button>Small Offset</Button>
          </Popover>

          <Popover offset={20} content="Far from trigger (20px)">
            <Button>Large Offset</Button>
          </Popover>
        </div>
      </div>

      {/* Real-world Examples */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Real-world Examples
        </h3>
        <div className="flex flex-wrap gap-4">
          {/* Share Menu */}
          <Popover
            title="Share"
            variant="elevated"
            content={
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                  <span>📧</span>
                  <span>Email</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                  <span>🔗</span>
                  <span>Copy Link</span>
                </button>
                <button className="w-full text-left px-3 py-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
                  <span>💬</span>
                  <span>Social Media</span>
                </button>
              </div>
            }
          >
            <Button variant="outline">Share</Button>
          </Popover>

          {/* Notifications */}
          <Popover
            title="Notifications"
            size="lg"
            variant="glass"
            showCloseButton
            content={
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-sm">Notification {i}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      This is a sample notification message
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      2 hours ago
                    </div>
                  </div>
                ))}
              </div>
            }
            footer={
              <Button size="sm" variant="ghost" className="w-full">
                View All Notifications
              </Button>
            }
          >
            <Button variant="outline">
              <span className="relative">
                🔔
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </span>
            </Button>
          </Popover>

          {/* Help Popover */}
          <Popover
            trigger="hover"
            variant="glass"
            size="lg"
            title="Need Help?"
            content={
              <div className="space-y-2 text-sm">
                <p>
                  Click on any element to interact with it. Use keyboard
                  shortcuts for faster navigation.
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Ctrl+K - Quick search</li>
                  <li>Ctrl+S - Save changes</li>
                  <li>Esc - Close dialog</li>
                </ul>
              </div>
            }
            footer={
              <Button size="sm" variant="ghost" className="w-full">
                View Full Documentation
              </Button>
            }
          >
            <Button variant="ghost" size="sm">
              ❓ Help
            </Button>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PopoverExample;
