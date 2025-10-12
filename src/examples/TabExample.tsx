import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tab";
import Card from "../components/Card";

export const TabExample = () => {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Tab Component Examples</h2>
        <div className="space-y-4 mb-12">
          <p className="text-sm text-base-content/60 mb-4">
            Composable tab components: Tabs, TabsList, TabsTrigger, TabsContent
          </p>
          <div className="max-w-2xl">
            <Tabs defaultValue="account">
              <TabsList variant="bordered">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card className="p-6 shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Account Settings</h3>
                      <p className="text-sm text-base-content/60 mt-1">
                        Make changes to your account here. Click save when you're
                        done.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                          type="text"
                          defaultValue="Pedro Duarte"
                          className="px-3 py-2 rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Username</label>
                        <input
                          type="text"
                          defaultValue="@peduarte"
                          className="px-3 py-2 rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                      Save changes
                    </button>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card className="p-6 shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Password</h3>
                      <p className="text-sm text-base-content/60 mt-1">
                        Change your password here. After saving, you'll be logged
                        out.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Current password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-2 rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          New password
                        </label>
                        <input
                          type="password"
                          className="px-3 py-2 rounded-md border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                      Save password
                    </button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* All Variants */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">All Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-base-content/60 mb-2">Default</p>
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Primary</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="primary">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Secondary</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="secondary">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Glass</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="glass">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Bordered</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="bordered">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Minimal</p>
              <Tabs defaultValue="tab1">
                <TabsList variant="minimal">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* With Icons and Badges */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">With Icons and Badges</h3>
          <Tabs defaultValue="home">
            <TabsList variant="primary">
              <TabsTrigger
                value="home"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                }
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                badge={5}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                badge={12}
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                }
              >
                Notifications
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Sizes</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-base-content/60 mb-2">Small</p>
              <Tabs defaultValue="tab1">
                <TabsList size="sm">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Medium</p>
              <Tabs defaultValue="tab1">
                <TabsList size="md">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div>
              <p className="text-sm text-base-content/60 mb-2">Large</p>
              <Tabs defaultValue="tab1">
                <TabsList size="lg">
                  <TabsTrigger value="tab1">Home</TabsTrigger>
                  <TabsTrigger value="tab2">Profile</TabsTrigger>
                  <TabsTrigger value="tab3">Settings</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Full Width */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Full Width</h3>
          <Tabs defaultValue="tab1">
            <TabsList fullWidth variant="primary">
              <TabsTrigger value="tab1">Home</TabsTrigger>
              <TabsTrigger value="tab2">Profile</TabsTrigger>
              <TabsTrigger value="tab3">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Disabled State */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Disabled</h3>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Active</TabsTrigger>
              <TabsTrigger value="tab2" disabled>
                Disabled
              </TabsTrigger>
              <TabsTrigger value="tab3">Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Custom Styling */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Custom Styling (Fully Customizable)
          </h3>

          {/* Underline style */}
          <div className="space-y-3">
            <p className="text-sm text-base-content/60">
              Underline Style (custom classes)
            </p>
            <Tabs defaultValue="tab1">
              <TabsList
                variant="minimal"
                className="gap-4 p-0 bg-transparent border-b-2 border-base-300"
              >
                <TabsTrigger
                  value="tab1"
                  className="rounded-none border-b-2 border-transparent pb-3 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="rounded-none border-b-2 border-transparent pb-3 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  Settings
                </TabsTrigger>
                <TabsTrigger
                  value="tab3"
                  className="rounded-none border-b-2 border-transparent pb-3 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Pill style */}
          <div className="space-y-3">
            <p className="text-sm text-base-content/60">
              Pill Style (custom spacing and rounded)
            </p>
            <Tabs defaultValue="tab1">
              <TabsList variant="glass" className="gap-3 p-0 bg-transparent">
                <TabsTrigger
                  value="tab1"
                  className="rounded-full px-6 py-3 shadow-md data-[state=active]:scale-105 data-[state=active]:shadow-lg"
                >
                  Home
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="rounded-full px-6 py-3 shadow-md data-[state=active]:scale-105 data-[state=active]:shadow-lg"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="tab3"
                  className="rounded-full px-6 py-3 shadow-md data-[state=active]:scale-105 data-[state=active]:shadow-lg"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabExample;
