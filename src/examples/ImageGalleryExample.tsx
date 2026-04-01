import { useState } from "react";
import { ImageGallery } from "../components/ImageGallery";

const productImages = [
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    alt: "Mountain",
    caption: "Morning trail",
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?auto=format&fit=crop&w=800&q=80",
    alt: "Forest",
    caption: "Quiet forest",
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    alt: "Workspace",
    caption: "Focus setup",
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=800&q=80",
    alt: "City",
    caption: "Urban skyline",
  },
  {
    id: "p5",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    alt: "Sea",
    caption: "Campaign hero",
  },
  {
    id: "p6",
    src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    alt: "Laptop",
    caption: "Studio desk",
  },
];

const eventImages = [
  {
    id: "e1",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    alt: "Concert lights",
    caption: "Keynote stage",
  },
  {
    id: "e2",
    src: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=800&q=80",
    alt: "Audience",
    caption: "Community meetup",
  },
  {
    id: "e3",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    alt: "Conference",
    caption: "Breakout sessions",
  },
  {
    id: "e4",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    alt: "Expo hall",
    caption: "Partner booth",
  },
];

export const ImageGalleryExample = () => {
  const [collection, setCollection] = useState<"product" | "event">("product");
  const [lastSelection, setLastSelection] = useState("No interaction yet.");

  const activeImages = collection === "product" ? productImages : eventImages;

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          ImageGallery Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Gallery layouts with optional lightbox navigation and caption
          overlays.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">Simple image grid.</p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <ImageGallery images={productImages.slice(0, 4)} columns={2} />
            <ImageGallery
              images={eventImages.slice(0, 2)}
              columns={2}
              gap="sm"
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Start with small grids for reliable loading behavior.</li>
              <li>• Always provide accurate alt and caption text.</li>
              <li>• Keep aspect ratio diversity realistic in test data.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Enable lightbox for enlarged navigation.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  collection === "product"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => {
                  setCollection("product");
                  setLastSelection("Switched to product gallery.");
                }}
              >
                Product Shots
              </button>
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  collection === "event"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => {
                  setCollection("event");
                  setLastSelection("Switched to event gallery.");
                }}
              >
                Event Coverage
              </button>
            </div>
            <ImageGallery images={activeImages} columns={3} enableLightbox />
            <p className="text-xs text-muted-foreground">{lastSelection}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Lightbox improves detail inspection and storytelling.</li>
              <li>• Keep collection switching instant and predictable.</li>
              <li>• Ensure captions remain meaningful in modal context.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Responsive column config for adaptive layouts.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <ImageGallery
              images={productImages}
              columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
              gap="sm"
            />
            <ImageGallery
              images={eventImages}
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="lg"
              enableLightbox
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Responsive columns prevent cramped mobile layouts.</li>
              <li>• Choose gap tokens by image density and caption length.</li>
              <li>
                • Separate dense and editorial galleries by breakpoint strategy.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Useful in portfolio showcases and product media pages.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Product Detail Media
              </p>
              <ImageGallery
                images={productImages}
                columns={3}
                showThumbnails
                enableLightbox
              />
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Event Recap Grid
              </p>
              <ImageGallery
                images={eventImages}
                columns={2}
                enableLightbox
                showThumbnails
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Great for ecommerce PDPs and campaign recap pages.</li>
              <li>• Keep thumbnail and lightbox controls discoverable.</li>
              <li>• Optimize image dimensions for predictable loading.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageGalleryExample;
