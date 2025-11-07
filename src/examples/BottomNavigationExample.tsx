"use client";

import { useState } from "react";
import { BottomNavigation } from "../components/BottomNavigation";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Badge from "../components/Badge";
import {
  Home,
  Search,
  Heart,
  User,
  ShoppingCart,
  Bell,
  Mail,
  Compass,
  MessageSquare,
  Music,
  Video,
  Image,
  Calendar,
  FileText,
} from "lucide-react";

export default function BottomNavigationExample() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(1);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(2);

  const basicItems = [
    { label: "Home", icon: <Home className="w-5 h-5" /> },
    { label: "Search", icon: <Search className="w-5 h-5" /> },
    { label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const socialItems = [
    { label: "Home", icon: <Home className="w-5 h-5" /> },
    { label: "Explore", icon: <Compass className="w-5 h-5" /> },
    { label: "Messages", icon: <Mail className="w-5 h-5" />, badge: 5 },
    { label: "Notifications", icon: <Bell className="w-5 h-5" />, badge: 12 },
    { label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const ecommerceItems = [
    { label: "Shop", icon: <Home className="w-5 h-5" /> },
    { label: "Search", icon: <Search className="w-5 h-5" /> },
    { label: "Cart", icon: <ShoppingCart className="w-5 h-5" />, badge: 3 },
    { label: "Wishlist", icon: <Heart className="w-5 h-5" /> },
    { label: "Account", icon: <User className="w-5 h-5" /> },
  ];

  const mediaItems = [
    { label: "Home", icon: <Home className="w-5 h-5" /> },
    { label: "Music", icon: <Music className="w-5 h-5" /> },
    { label: "Video", icon: <Video className="w-5 h-5" /> },
    { label: "Photos", icon: <Image className="w-5 h-5" /> },
  ];

  const productivityItems = [
    { label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { label: "Calendar", icon: <Calendar className="w-5 h-5" /> },
    { label: "Tasks", icon: <FileText className="w-5 h-5" />, badge: 8 },
    {
      label: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      badge: 3,
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Bottom Navigation</h2>
        <p className="text-muted-foreground mb-6">
          A bottom navigation bar for mobile-friendly navigation. Perfect for
          primary navigation on mobile apps and responsive web applications.
        </p>
      </div>

      {/* Basic Bottom Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Bottom Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                <p className="text-muted-foreground">Content Area</p>
              </div>
              <BottomNavigation
                items={basicItems}
                value={value1}
                onChange={(v) =>
                  setValue1(typeof v === "number" ? v : parseInt(String(v)))
                }
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Selected: {basicItems[value1]?.label}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* With Badges */}
      <Card>
        <CardHeader>
          <CardTitle>With Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">
                    {socialItems[value2]?.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You have{" "}
                    {socialItems.reduce(
                      (acc, item) =>
                        acc + (typeof item.badge === "number" ? item.badge : 0),
                      0,
                    )}{" "}
                    notifications
                  </p>
                </div>
              </div>
              <BottomNavigation
                items={socialItems}
                value={value2}
                onChange={(v) =>
                  setValue2(typeof v === "number" ? v : parseInt(String(v)))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="max-w-sm mx-auto">
              <p className="text-sm font-medium mb-2 text-center">
                Primary (Default)
              </p>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                  <p className="text-muted-foreground">Primary Color</p>
                </div>
                <BottomNavigation
                  items={basicItems}
                  value={0}
                  color="primary"
                />
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <p className="text-sm font-medium mb-2 text-center">Secondary</p>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                  <p className="text-muted-foreground">Secondary Color</p>
                </div>
                <BottomNavigation
                  items={basicItems}
                  value={1}
                  color="secondary"
                />
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <p className="text-sm font-medium mb-2 text-center">Success</p>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                  <p className="text-muted-foreground">Success Color</p>
                </div>
                <BottomNavigation
                  items={basicItems}
                  value={2}
                  color="success"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Without Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Without Labels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                <p className="text-muted-foreground">Icon Only</p>
              </div>
              <BottomNavigation
                items={mediaItems}
                value={value3}
                onChange={(v) =>
                  setValue3(typeof v === "number" ? v : parseInt(String(v)))
                }
                showLabels={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="max-w-sm mx-auto">
              <p className="text-sm font-medium mb-2 text-center">Default</p>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                  <p className="text-muted-foreground">Default Variant</p>
                </div>
                <BottomNavigation
                  items={basicItems}
                  value={0}
                  variant="default"
                />
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <p className="text-sm font-medium mb-2 text-center">Filled</p>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                  <p className="text-muted-foreground">Filled Variant</p>
                </div>
                <BottomNavigation
                  items={basicItems}
                  value={1}
                  variant="filled"
                />
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <p className="text-sm font-medium mb-2 text-center">Shifting</p>
              <div className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
                  <p className="text-muted-foreground">Shifting Variant</p>
                </div>
                <BottomNavigation
                  items={basicItems}
                  value={2}
                  variant="shifting"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Example: E-commerce App */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: E-commerce App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 overflow-y-auto">
                <h3 className="text-lg font-bold mb-4">
                  {ecommerceItems[value4]?.label}
                </h3>
                {value4 === 0 && (
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Product Name</h4>
                          <p className="text-sm text-muted-foreground">
                            $99.99
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Another Product</h4>
                          <p className="text-sm text-muted-foreground">
                            $149.99
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {value4 === 1 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Search for products...
                    </p>
                  </div>
                )}
                {value4 === 2 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      You have 3 items in your cart
                    </p>
                    <Badge className="bg-success text-white">
                      Total: $349.97
                    </Badge>
                  </div>
                )}
                {value4 === 3 && (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-destructive" />
                    <p className="text-muted-foreground">
                      Your wishlist is empty
                    </p>
                  </div>
                )}
                {value4 === 4 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                        JD
                      </div>
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <p className="text-sm text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <BottomNavigation
                items={ecommerceItems}
                value={value4}
                onChange={(v) =>
                  setValue4(typeof v === "number" ? v : parseInt(String(v)))
                }
                color="primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Example: Productivity App */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Productivity App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-sm mx-auto">
            <div className="border rounded-lg overflow-hidden">
              <div className="h-72 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">
                    {productivityItems[0]?.label}
                  </h3>
                  <Badge className="bg-primary text-white">
                    {productivityItems.reduce(
                      (acc, item) =>
                        acc + (typeof item.badge === "number" ? item.badge : 0),
                      0,
                    )}{" "}
                    pending
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Team Meeting</span>
                      <span className="text-xs text-muted-foreground">
                        10:00 AM
                      </span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Project Review
                      </span>
                      <span className="text-xs text-muted-foreground">
                        2:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Client Call</span>
                      <span className="text-xs text-muted-foreground">
                        4:30 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <BottomNavigation
                items={productivityItems}
                value={0}
                variant="filled"
                color="primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
