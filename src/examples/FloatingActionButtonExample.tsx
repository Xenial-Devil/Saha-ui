import React from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import { Plus, MessageCircle, Edit, Share2, Heart, Send } from "lucide-react";

export function FloatingActionButtonExample() {
  const [showNotification, setShowNotification] = React.useState("");

  const handleFABClick = (action: string) => {
    setShowNotification(action);
    setTimeout(() => setShowNotification(""), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Floating Action Button
        </h2>
        <p className="text-text-secondary mb-6">
          Modern floating action buttons with beautiful animations and multiple
          variants.
        </p>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-card/95 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-lg shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300">
          <p className="text-sm font-medium text-foreground">
            {showNotification}
          </p>
        </div>
      )}

      {/* Basic Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Basic Variants
        </h3>
        <div className="glass p-8 rounded-2xl relative min-h-[300px] border border-border/50">
          <p className="text-sm text-text-secondary mb-4">
            Different color variants with hover effects and shadows
          </p>

          {/* Primary - Bottom Right (using children) */}
          <FloatingActionButton
            variant="primary"
            position="bottom-right"
            label="Create New"
            onClick={() => handleFABClick("Primary FAB clicked!")}
          >
            <Plus size={24} />
          </FloatingActionButton>

          {/* Secondary - Bottom Left (using children) */}
          <FloatingActionButton
            variant="secondary"
            position="bottom-left"
            label="Messages"
            onClick={() => handleFABClick("Messages opened!")}
          >
            <MessageCircle size={24} />
          </FloatingActionButton>

          {/* Accent - Top Right (using icon prop) */}
          <FloatingActionButton
            variant="accent"
            position="top-right"
            icon={<Edit size={24} />}
            label="Edit"
            onClick={() => handleFABClick("Edit mode activated!")}
          />

          {/* Glass - Top Left (using icon prop) */}
          <FloatingActionButton
            variant="glass"
            position="top-left"
            icon={<Share2 size={24} />}
            label="Share"
            onClick={() => handleFABClick("Sharing options opened!")}
          />
        </div>
      </div>

      {/* Size Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Size Variants
        </h3>
        <div className="glass p-8 rounded-2xl relative min-h-[300px] border border-border/50">
          <p className="text-sm text-text-secondary mb-4">
            Different sizes: sm, md, lg, xl
          </p>

          {/* Small */}
          <FloatingActionButton
            variant="info"
            size="sm"
            position="bottom-right"
            icon={<Plus size={16} />}
            label="Small FAB"
            offset={{ x: 0, y: 0 }}
            onClick={() => handleFABClick("Small FAB clicked!")}
          />

          {/* Medium */}
          <FloatingActionButton
            variant="success"
            size="md"
            position="bottom-right"
            icon={<Plus size={20} />}
            label="Medium FAB"
            offset={{ x: 0, y: -80 }}
            onClick={() => handleFABClick("Medium FAB clicked!")}
          />

          {/* Large */}
          <FloatingActionButton
            variant="warning"
            size="lg"
            position="bottom-right"
            icon={<Plus size={24} />}
            label="Large FAB"
            offset={{ x: 0, y: -160 }}
            onClick={() => handleFABClick("Large FAB clicked!")}
          />

          {/* Extra Large */}
          <FloatingActionButton
            variant="error"
            size="xl"
            position="bottom-right"
            icon={<Plus size={28} />}
            label="Extra Large FAB"
            offset={{ x: 0, y: -250 }}
            onClick={() => handleFABClick("Extra Large FAB clicked!")}
          />
        </div>
      </div>

      {/* Extended FAB */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Extended FAB
        </h3>
        <div className="glass p-8 rounded-2xl relative min-h-[200px] border border-border/50">
          <p className="text-sm text-text-secondary mb-4">
            Extended FAB with visible label
          </p>

          {/* Extended with label (using children) */}
          <FloatingActionButton
            variant="primary"
            position="bottom-right"
            label="Send Message"
            extended
            onClick={() => handleFABClick("Message sent!")}
          >
            <Send size={20} />
          </FloatingActionButton>

          <FloatingActionButton
            variant="accent"
            position="bottom-left"
            label="Add to Favorites"
            extended
            onClick={() => handleFABClick("Added to favorites!")}
          >
            <Heart size={20} />
          </FloatingActionButton>
        </div>
      </div>

      {/* All Color Variants */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          All Color Variants
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { variant: "default" as const, label: "Default" },
            { variant: "primary" as const, label: "Primary" },
            { variant: "secondary" as const, label: "Secondary" },
            { variant: "accent" as const, label: "Accent" },
            { variant: "info" as const, label: "Info" },
            { variant: "success" as const, label: "Success" },
            { variant: "warning" as const, label: "Warning" },
            { variant: "error" as const, label: "Error" },
            { variant: "glass" as const, label: "Glass" },
          ].map(({ variant, label }) => (
            <div
              key={variant}
              className="glass p-6 rounded-xl border border-border/50 flex flex-col items-center justify-center gap-4 relative"
            >
              <FloatingActionButton
                variant={variant}
                size="md"
                icon={<Plus size={20} />}
                position="bottom-right"
                offset={{ x: -40, y: -40 }}
                className="!fixed"
                onClick={() => handleFABClick(`${label} FAB clicked!`)}
              />
              <p className="text-sm font-medium text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
