import React from "react";
import {
  Empty,
  EmptyIcon,
  EmptyImage,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
  EmptyExtra,
} from "../components/Empty";

export const EmptyExample: React.FC = () => {
  return (
    <div className="space-y-12 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Empty States
        </h2>
        <p className="text-muted-foreground mb-6">
          Beautiful empty state components with multiple variants, sizes, and
          preset icons.
        </p>
      </div>

      {/* Variants */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Empty
            variant="default"
            iconType="inbox"
            iconColor="primary"
            title="No messages"
            description="Your inbox is empty. Start a conversation to see messages here."
            action={
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                New Message
              </button>
            }
          />

          <Empty
            variant="subtle"
            iconType="search"
            iconColor="info"
            title="No results found"
            description="We couldn't find any results matching your search criteria."
            action={
              <button className="px-4 py-2 bg-info text-info-foreground rounded-lg hover:opacity-90 transition-opacity">
                Clear Search
              </button>
            }
          />

          <Empty
            variant="outlined"
            iconType="folder"
            iconColor="warning"
            title="No files"
            description="This folder is empty. Upload files to get started."
            action={
              <button className="px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:opacity-90 transition-opacity">
                Upload Files
              </button>
            }
          />

          <Empty
            variant="glass"
            iconType="database"
            iconColor="success"
            title="No data"
            description="There is no data to display at the moment."
            action={
              <button className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity">
                Import Data
              </button>
            }
          />
        </div>
      </section>

      {/* Composable API */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          Composable API (Recommended)
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Use subcomponents for better composition and flexibility
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Composable */}
          <Empty variant="default">
            <EmptyIcon iconType="inbox" iconColor="primary" />
            <EmptyTitle>No messages</EmptyTitle>
            <EmptyDescription>
              Your inbox is empty. Start a conversation to see messages here.
            </EmptyDescription>
            <EmptyActions>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                New Message
              </button>
            </EmptyActions>
          </Empty>

          {/* With Custom Icon */}
          <Empty variant="subtle">
            <EmptyIcon iconColor="success">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </EmptyIcon>
            <EmptyTitle>Welcome!</EmptyTitle>
            <EmptyDescription>
              Get started with custom icons and full control
            </EmptyDescription>
          </Empty>

          {/* With Image */}
          <Empty variant="glass" size="lg">
            <EmptyImage src="https://via.placeholder.com/150x150?text=Empty" />
            <EmptyTitle>No data available</EmptyTitle>
            <EmptyDescription>
              Upload or import data to get started
            </EmptyDescription>
            <EmptyActions>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Upload
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Import
                </button>
              </div>
            </EmptyActions>
          </Empty>

          {/* With Extra Links */}
          <Empty variant="outlined">
            <EmptyIcon iconType="cart" iconColor="warning" />
            <EmptyTitle>Your cart is empty</EmptyTitle>
            <EmptyDescription>
              Add items to your cart to proceed with checkout
            </EmptyDescription>
            <EmptyActions>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Continue Shopping
              </button>
            </EmptyActions>
            <EmptyExtra>
              <div className="flex gap-2 text-sm">
                <a href="#" className="text-primary hover:underline">
                  View Wishlist
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-primary hover:underline">
                  Browse Deals
                </a>
              </div>
            </EmptyExtra>
          </Empty>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Empty
            size="sm"
            variant="subtle"
            iconType="notification"
            title="Small Size"
            description="Compact empty state for smaller spaces."
          />

          <Empty
            size="md"
            variant="subtle"
            iconType="notification"
            title="Medium Size"
            description="Default size for most use cases."
          />

          <Empty
            size="lg"
            variant="subtle"
            iconType="notification"
            title="Large Size"
            description="Larger empty state with more spacing and bigger text."
          />

          <Empty
            size="xl"
            variant="subtle"
            iconType="notification"
            title="Extra Large"
            description="Maximum size for prominent empty states."
          />
        </div>
      </section>

      {/* Icon Types */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Preset Icons</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Empty
            variant="outlined"
            iconType="search"
            iconColor="info"
            title="Search"
            description="No results"
          />
          <Empty
            variant="outlined"
            iconType="folder"
            iconColor="primary"
            title="Folder"
            description="Empty folder"
          />
          <Empty
            variant="outlined"
            iconType="document"
            iconColor="secondary"
            title="Document"
            description="No documents"
          />
          <Empty
            variant="outlined"
            iconType="image"
            iconColor="success"
            title="Image"
            description="No images"
          />
          <Empty
            variant="outlined"
            iconType="inbox"
            iconColor="info"
            title="Inbox"
            description="No messages"
          />
          <Empty
            variant="outlined"
            iconType="cart"
            iconColor="warning"
            title="Cart"
            description="Empty cart"
          />
          <Empty
            variant="outlined"
            iconType="bookmark"
            iconColor="primary"
            title="Bookmark"
            description="No bookmarks"
          />
          <Empty
            variant="outlined"
            iconType="notification"
            iconColor="danger"
            title="Notifications"
            description="No alerts"
          />
          <Empty
            variant="outlined"
            iconType="user"
            iconColor="primary"
            title="Users"
            description="No users"
          />
          <Empty
            variant="outlined"
            iconType="database"
            iconColor="success"
            title="Database"
            description="No data"
          />
          <Empty
            variant="outlined"
            iconType="cloud"
            iconColor="info"
            title="Cloud"
            description="No files"
          />
          <Empty
            variant="outlined"
            iconType="error"
            iconColor="danger"
            title="Error"
            description="Not found"
          />
        </div>
      </section>

      {/* Icon Colors */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Icon Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="primary"
            title="Primary"
          />
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="secondary"
            title="Secondary"
          />
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="success"
            title="Success"
          />
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="warning"
            title="Warning"
          />
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="danger"
            title="Danger"
          />
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="info"
            title="Info"
          />
          <Empty
            variant="subtle"
            iconType="inbox"
            iconColor="muted"
            title="Muted"
          />
        </div>
      </section>

      {/* With Custom Icon */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Custom Icon</h3>
        <Empty
          variant="glass"
          size="lg"
          iconColor="primary"
          title="Custom Icon"
          description="You can provide your own custom icon or SVG."
          icon={
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          }
          action={
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
          }
        />
      </section>

      {/* With Image */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          With Image/Illustration
        </h3>
        <Empty
          variant="default"
          size="lg"
          image="https://via.placeholder.com/200x200?text=No+Data"
          title="No data available"
          description="Upload or import data to get started with analytics and insights."
          action={
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Upload Data
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Import CSV
              </button>
            </div>
          }
        />
      </section>

      {/* With Multiple Actions */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          Multiple Actions
        </h3>
        <Empty
          variant="outlined"
          size="lg"
          iconType="cart"
          iconColor="warning"
          title="Your cart is empty"
          description="Add items to your cart to proceed with checkout."
          action={
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Continue Shopping
            </button>
          }
          extra={
            <div className="flex gap-2 text-sm">
              <a href="#" className="text-primary hover:underline">
                View Wishlist
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#" className="text-primary hover:underline">
                Browse Deals
              </a>
            </div>
          }
        />
      </section>

      {/* Full Height */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Full Height</h3>
        <Empty
          variant="subtle"
          fullHeight
          iconType="error"
          iconColor="danger"
          title="Page not found"
          description="The page you're looking for doesn't exist or has been moved."
          action={
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              Go Home
            </button>
          }
        />
      </section>

      {/* Custom Content */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          Custom Content
        </h3>
        <Empty variant="glass" size="lg" iconType="success" iconColor="success">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              Welcome to Saha UI!
            </h3>
            <p className="text-muted-foreground">
              Get started by exploring our components and building amazing user
              interfaces.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                View Docs
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
                See Examples
              </button>
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
                GitHub
              </button>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                ⭐ Star us on GitHub • 📚 Read the documentation • 💬 Join our
                community
              </p>
            </div>
          </div>
        </Empty>
      </section>

      {/* Without Animation */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          Without Animation
        </h3>
        <Empty
          variant="outlined"
          animated={false}
          iconType="document"
          iconColor="muted"
          title="Static Empty State"
          description="This empty state has animations disabled."
        />
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          Real-world Examples
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Inbox */}
          <Empty
            variant="default"
            iconType="inbox"
            iconColor="primary"
            title="All caught up!"
            description="You've read all your messages. Enjoy your day!"
            extra={
              <p className="text-xs text-muted-foreground mt-2">
                Last checked: Just now
              </p>
            }
          />

          {/* Search Results */}
          <Empty
            variant="subtle"
            iconType="search"
            iconColor="info"
            title="No results for 'example'"
            description="Try different keywords or check your spelling."
            action={
              <button className="px-4 py-2 bg-info text-info-foreground rounded-lg hover:opacity-90 transition-opacity">
                Clear Filters
              </button>
            }
          />

          {/* Bookmarks */}
          <Empty
            variant="outlined"
            iconType="bookmark"
            iconColor="warning"
            title="No bookmarks yet"
            description="Save articles and pages you'd like to read later."
            action={
              <button className="px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:opacity-90 transition-opacity">
                Explore Content
              </button>
            }
          />

          {/* Notifications */}
          <Empty
            variant="glass"
            iconType="notification"
            iconColor="success"
            title="You're all set!"
            description="No new notifications to show. We'll notify you when something important happens."
          />
        </div>
      </section>
    </div>
  );
};
