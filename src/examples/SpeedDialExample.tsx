"use client";

import { useState } from "react";
import { SpeedDial } from "../components/SpeedDial";
import {
  Plus,
  Edit,
  Share,
  Download,
  Trash2,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Image,
  Video,
  Music,
} from "lucide-react";

export default function SpeedDialExample() {
  const [isOpen, setIsOpen] = useState(false);

  const basicActions = [
    {
      id: "1",
      icon: <Edit />,
      label: "Edit",
      onClick: () => console.log("Edit"),
    },
    {
      id: "2",
      icon: <Share />,
      label: "Share",
      onClick: () => console.log("Share"),
    },
    {
      id: "3",
      icon: <Download />,
      label: "Download",
      onClick: () => console.log("Download"),
    },
    {
      id: "4",
      icon: <Trash2 />,
      label: "Delete",
      onClick: () => console.log("Delete"),
      color: "error" as const,
    },
  ];

  const contactActions = [
    {
      id: "1",
      icon: <Phone />,
      label: "Call",
      onClick: () => console.log("Call"),
      color: "success" as const,
    },
    {
      id: "2",
      icon: <Mail />,
      label: "Email",
      onClick: () => console.log("Email"),
      color: "primary" as const,
    },
    {
      id: "3",
      icon: <MessageSquare />,
      label: "Message",
      onClick: () => console.log("Message"),
      color: "info" as const,
    },
  ];

  const mediaActions = [
    {
      id: "1",
      icon: <Image />,
      label: "Photo",
      onClick: () => console.log("Photo"),
      color: "primary" as const,
    },
    {
      id: "2",
      icon: <Video />,
      label: "Video",
      onClick: () => console.log("Video"),
      color: "secondary" as const,
    },
    {
      id: "3",
      icon: <Music />,
      label: "Audio",
      onClick: () => console.log("Audio"),
      color: "success" as const,
    },
    {
      id: "4",
      icon: <FileText />,
      label: "Document",
      onClick: () => console.log("Document"),
      color: "info" as const,
    },
  ];

  return (
    <div className="space-y-16 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">SpeedDial Component</h1>
        <p className="text-muted-foreground mb-8">
          Floating action buttons that expand to reveal multiple actions.
        </p>
      </div>

      {/* Basic Example */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Basic SpeedDial</h2>
          <p className="text-muted-foreground mb-4">
            Simple SpeedDial with default settings
          </p>
        </div>
        <div className="relative h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <SpeedDial
            icon={<Plus />}
            actions={basicActions}
            aria-label="Basic actions"
          />
        </div>
      </section>

      {/* Different Positions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Different Positions</h2>
          <p className="text-muted-foreground mb-4">
            SpeedDial can be positioned in any corner
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Top Left
            </p>
            <SpeedDial
              icon={<Plus />}
              position="top-left"
              actions={basicActions.slice(0, 3)}
              aria-label="Top left actions"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 right-2 text-sm text-muted-foreground">
              Top Right
            </p>
            <SpeedDial
              icon={<Plus />}
              position="top-right"
              actions={basicActions.slice(0, 3)}
              aria-label="Top right actions"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute bottom-2 left-2 text-sm text-muted-foreground">
              Bottom Left
            </p>
            <SpeedDial
              icon={<Plus />}
              position="bottom-left"
              actions={basicActions.slice(0, 3)}
              aria-label="Bottom left actions"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              Bottom Right
            </p>
            <SpeedDial
              icon={<Plus />}
              position="bottom-right"
              actions={basicActions.slice(0, 3)}
              aria-label="Bottom right actions"
            />
          </div>
        </div>
      </section>

      {/* Different Directions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Different Directions</h2>
          <p className="text-muted-foreground mb-4">
            Actions can expand in different directions
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Direction: Up
            </p>
            <SpeedDial
              icon={<Plus />}
              direction="up"
              actions={contactActions}
              aria-label="Up direction"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Direction: Down
            </p>
            <SpeedDial
              icon={<Plus />}
              position="top-right"
              direction="down"
              actions={contactActions}
              aria-label="Down direction"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Direction: Left
            </p>
            <SpeedDial
              icon={<Plus />}
              position="bottom-right"
              direction="left"
              actions={contactActions}
              aria-label="Left direction"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Direction: Right
            </p>
            <SpeedDial
              icon={<Plus />}
              position="bottom-left"
              direction="right"
              actions={contactActions}
              aria-label="Right direction"
            />
          </div>
        </div>
      </section>

      {/* Different Colors */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Different Colors</h2>
          <p className="text-muted-foreground mb-4">
            Customize the main button color
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(
            [
              "primary",
              "secondary",
              "success",
              "warning",
              "error",
              "info",
            ] as const
          ).map((color) => (
            <div
              key={color}
              className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border"
            >
              <p className="absolute top-2 left-2 text-sm text-muted-foreground capitalize">
                {color}
              </p>
              <SpeedDial
                icon={<Plus />}
                color={color}
                actions={basicActions.slice(0, 3)}
                aria-label={`${color} actions`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Different Sizes</h2>
          <p className="text-muted-foreground mb-4">
            Small, medium, and large sizes
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Small
            </p>
            <SpeedDial
              icon={<Plus />}
              size="sm"
              actions={basicActions.slice(0, 3)}
              aria-label="Small actions"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Medium
            </p>
            <SpeedDial
              icon={<Plus />}
              size="md"
              actions={basicActions.slice(0, 3)}
              aria-label="Medium actions"
            />
          </div>
          <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <p className="absolute top-2 left-2 text-sm text-muted-foreground">
              Large
            </p>
            <SpeedDial
              icon={<Plus />}
              size="lg"
              actions={basicActions.slice(0, 3)}
              aria-label="Large actions"
            />
          </div>
        </div>
      </section>

      {/* With Backdrop */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">With Backdrop</h2>
          <p className="text-muted-foreground mb-4">
            Add a backdrop overlay when open
          </p>
        </div>
        <div className="relative h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <SpeedDial
            icon={<Plus />}
            actions={mediaActions}
            showBackdrop={true}
            color="primary"
            aria-label="Media actions with backdrop"
          />
        </div>
      </section>

      {/* Controlled Mode */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Controlled Mode</h2>
          <p className="text-muted-foreground mb-4">
            Control the open state externally
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              {isOpen ? "Close" : "Open"} SpeedDial
            </button>
            <p className="text-sm text-muted-foreground flex items-center">
              Current state: {isOpen ? "Open" : "Closed"}
            </p>
          </div>
          <div className="relative h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <SpeedDial
              icon={<Plus />}
              actions={basicActions}
              open={isOpen}
              onOpenChange={setIsOpen}
              color="secondary"
              aria-label="Controlled actions"
            />
          </div>
        </div>
      </section>

      {/* Without Labels */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Without Labels</h2>
          <p className="text-muted-foreground mb-4">
            Hide action labels/tooltips
          </p>
        </div>
        <div className="relative h-96 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <SpeedDial
            icon={<Plus />}
            actions={basicActions}
            showLabels={false}
            color="info"
            aria-label="Actions without labels"
          />
        </div>
      </section>

      {/* Real World Example */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Real World Example</h2>
          <p className="text-muted-foreground mb-4">
            Media upload with multiple options
          </p>
        </div>
        <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-0 p-8">
            <h3 className="text-2xl font-bold mb-2">My Media Gallery</h3>
            <p className="text-muted-foreground">
              Click the button to upload different types of media
            </p>
          </div>
          <SpeedDial
            icon={<Plus />}
            actions={mediaActions}
            showBackdrop={true}
            color="primary"
            size="lg"
            aria-label="Upload media"
          />
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Disabled State</h2>
          <p className="text-muted-foreground mb-4">Disabled SpeedDial</p>
        </div>
        <div className="relative h-64 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <SpeedDial
            icon={<Plus />}
            actions={basicActions}
            disabled={true}
            aria-label="Disabled actions"
          />
        </div>
      </section>
    </div>
  );
}
