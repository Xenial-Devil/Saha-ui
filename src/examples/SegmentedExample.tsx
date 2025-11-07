"use client";

import { useState } from "react";
import { Segmented } from "../components/Segmented";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import {
  List,
  Grid,
  LayoutGrid,
  Calendar,
  Users,
  Settings,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  Heart,
  Star,
  Bookmark,
  Share2,
  Download,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SegmentedExample() {
  const [view, setView] = useState("list");
  const [layout, setLayout] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState("overview");
  const [visibility, setVisibility] = useState("public");
  const [status, setStatus] = useState("active");

  const viewOptions = [
    { value: "list", label: "List", icon: <List className="w-4 h-4" /> },
    { value: "grid", label: "Grid", icon: <Grid className="w-4 h-4" /> },
    { value: "board", label: "Board", icon: <LayoutGrid className="w-4 h-4" /> },
  ];

  const layoutOptions = [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
    { value: "compact", label: "Compact" },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
  ];

  const tabOptions = [
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics" },
    { value: "reports", label: "Reports" },
    { value: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const visibilityOptions = [
    { value: "public", label: "Public", icon: <Eye className="w-4 h-4" /> },
    { value: "private", label: "Private", icon: <EyeOff className="w-4 h-4" /> },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "disabled", label: "Disabled" },
  ];

  const contactOptions = [
    { value: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
    { value: "phone", label: "Phone", icon: <Phone className="w-4 h-4" /> },
    { value: "chat", label: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const timeOptions = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Segmented Control</h2>
        <p className="text-muted-foreground mb-6">
          An iOS-style segmented control component for switching between views or filtering
          options. Features animated indicator and full keyboard support.
        </p>
      </div>

      {/* Basic Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Segmented Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">View Mode</label>
              <Segmented options={viewOptions} value={view} onChange={setView} />
              <p className="text-xs text-muted-foreground">Selected: {view}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Layout</label>
              <Segmented options={layoutOptions} value={layout} onChange={setLayout} />
              <p className="text-xs text-muted-foreground">Selected: {layout}</p>
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
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default</label>
              <Segmented
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                variant="default"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Outlined</label>
              <Segmented
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Filled</label>
              <Segmented
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                variant="filled"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ghost</label>
              <Segmented
                options={filterOptions}
                value={filter}
                onChange={setFilter}
                variant="ghost"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Small</label>
              <Segmented
                options={layoutOptions}
                value={layout}
                onChange={setLayout}
                size="sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Medium (Default)</label>
              <Segmented
                options={layoutOptions}
                value={layout}
                onChange={setLayout}
                size="md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Large</label>
              <Segmented
                options={layoutOptions}
                value={layout}
                onChange={setLayout}
                size="lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* With Icons */}
      <Card>
        <CardHeader>
          <CardTitle>With Icons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">View Options</label>
              <Segmented options={viewOptions} value={view} onChange={setView} size="lg" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Method</label>
              <Segmented
                options={contactOptions}
                value="email"
                onChange={() => {}}
                size="lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Visibility</label>
              <Segmented
                options={visibilityOptions}
                value={visibility}
                onChange={setVisibility}
                size="lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block (Full Width) */}
      <Card>
        <CardHeader>
          <CardTitle>Block (Full Width)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Width Tabs</label>
              <Segmented options={tabOptions} value={tab} onChange={setTab} block />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Segmented
                options={timeOptions}
                value="week"
                onChange={() => {}}
                block
                variant="outlined"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Disabled Control</label>
              <Segmented
                options={layoutOptions}
                value={layout}
                onChange={setLayout}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">With Icons Disabled</label>
              <Segmented
                options={viewOptions}
                value={view}
                onChange={setView}
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disabled Options */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Disabled Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">Some Options Disabled</label>
            <Segmented
              options={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed", disabled: true },
                { value: "archived", label: "Archived", disabled: true },
              ]}
              value={filter}
              onChange={setFilter}
            />
            <p className="text-xs text-muted-foreground">
              "Completed" and "Archived" options are disabled
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Without Animation */}
      <Card>
        <CardHeader>
          <CardTitle>Without Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">No Animated Indicator</label>
            <Segmented
              options={layoutOptions}
              value={layout}
              onChange={setLayout}
              animated={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Practical Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Dashboard View Switcher */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Dashboard View</label>
              <Segmented
                options={[
                  { value: "overview", label: "Overview", icon: <LayoutGrid className="w-4 h-4" /> },
                  { value: "calendar", label: "Calendar", icon: <Calendar className="w-4 h-4" /> },
                  { value: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
                ]}
                value="overview"
                onChange={() => {}}
                size="lg"
              />
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Filter</label>
              <Segmented
                options={statusOptions}
                value={status}
                onChange={setStatus}
                variant="filled"
              />
            </div>

            {/* Notification Settings */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Notification Preference</label>
              <Segmented
                options={[
                  { value: "all", label: "All", icon: <Bell className="w-4 h-4" /> },
                  { value: "important", label: "Important", icon: <Star className="w-4 h-4" /> },
                  { value: "none", label: "None", icon: <EyeOff className="w-4 h-4" /> },
                ]}
                value="all"
                onChange={() => {}}
                block
                size="lg"
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Actions</label>
              <Segmented
                options={[
                  { value: "like", label: "Like", icon: <Heart className="w-4 h-4" /> },
                  { value: "bookmark", label: "Bookmark", icon: <Bookmark className="w-4 h-4" /> },
                  { value: "share", label: "Share", icon: <Share2 className="w-4 h-4" /> },
                ]}
                value="like"
                onChange={() => {}}
                variant="outlined"
              />
            </div>

            {/* File Operations */}
            <div className="space-y-2">
              <label className="text-sm font-medium">File Operations</label>
              <Segmented
                options={[
                  { value: "download", label: "Download", icon: <Download className="w-4 h-4" /> },
                  { value: "upload", label: "Upload", icon: <Upload className="w-4 h-4" /> },
                  { value: "share", label: "Share", icon: <Share2 className="w-4 h-4" /> },
                ]}
                value="download"
                onChange={() => {}}
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`import { Segmented } from 'saha-ui';
import { List, Grid } from 'lucide-react';

// Basic usage
const [view, setView] = useState('list');

<Segmented
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
  value={view}
  onChange={setView}
/>

// With icons
<Segmented
  options={[
    { value: 'list', label: 'List', icon: <List /> },
    { value: 'grid', label: 'Grid', icon: <Grid /> },
  ]}
  value={view}
  onChange={setView}
/>

// Different variants
<Segmented
  options={options}
  value={value}
  onChange={setValue}
  variant="outlined"
  size="lg"
/>

// Full width
<Segmented
  options={options}
  value={value}
  onChange={setValue}
  block
/>

// With disabled options
<Segmented
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2', disabled: true },
  ]}
  value={value}
  onChange={setValue}
/>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export { SegmentedExample };
