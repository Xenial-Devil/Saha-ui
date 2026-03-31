# Sidebar

A powerful application-shell composition component consisting of a layout `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarItem`, and `SidebarFooter`. Uses Context API to seamlessly handle and broadcast `collapsed` layout states globally to all child subcomponents.

## Installation

```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarItem, SidebarFooter } from 'saha-ui';
```

## Usage

### Compound Sidebar Pattern

```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarItem } from "saha-ui";

export default function Example() {
  return (
    <div className="flex h-screen w-full relative">
      <Sidebar defaultCollapsed={false} collapsible={true}>
        <SidebarHeader>
          <h2 className="text-xl font-bold">App</h2>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup label="Menu">
            <SidebarItem href="/dashboard" icon={<DashboardIcon />}>Dashboard</SidebarItem>
            <SidebarItem href="/settings" icon={<SettingsIcon />}>Settings</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
      <main className="flex-1 p-6">
        Main Interface
      </main>
    </div>
  );
}
```

## Props

### Sidebar (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `collapsed` | `boolean` | - | Controlled state mapping container layout precisely rendering slim toolbars |
| `defaultCollapsed` | `boolean` | `false` | Fallback initialization standard enforcing start width smoothly via Context |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Observer dispatching callback whenever toggle button triggers organically |
| `collapsible` | `boolean` | `true` | Allows user intervention natively rendering visual trigger button manually |
| `side` | `"left" \| "right"` | `"left"` | Modifies anchoring alignment boundaries |
| `variant` | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` | Renders styling layouts defining CSS hierarchy limits efficiently |

### SidebarItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | Optional leading SVG/Icon rendered securely maintaining tooltip constraints logically |
| `active` | `boolean` | `false` | Highlights routing selections implicitly |
| `href` | `string` | - | Generates standard native anchoring hyperlinks intelligently |
| `badge` | `ReactNode` | - | Injects counting numeric metrics identically at right boundaries naturally |

### SidebarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | - | Displays sectional grouping categorization tags implicitly overriding layout spacing padding cleanly |
