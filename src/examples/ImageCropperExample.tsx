import { useState } from "react";
import { ImageCropper } from "../components/ImageCropper";

const sampleImage =
  "https://images.unsplash.com/photo-1542204625-de293a2f9177?auto=format&fit=crop&w=1200&q=80";
const samplePortrait =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80";

export const ImageCropperExample = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [productPreview, setProductPreview] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState("No crop actions yet.");

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          ImageCropper Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Interactive image cropping for avatars, banners, and media management.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Crop with default rectangular selection.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <ImageCropper
              image={sampleImage}
              onCropComplete={(dataUrl) => {
                setProductPreview(dataUrl);
                setLastAction("Created default rectangular crop.");
              }}
            />
            <ImageCropper
              image={sampleImage}
              aspect={4 / 3}
              onCropComplete={(dataUrl) => {
                setProductPreview(dataUrl);
                setLastAction("Created 4:3 crop for product card layout.");
              }}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Start with one default crop path and clear CTA labels.</li>
              <li>• Offer common aspect ratios early in user workflows.</li>
              <li>
                • Store previews in state so users can verify output
                immediately.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Round crop for profile or team avatar flows.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <ImageCropper
              image={samplePortrait}
              shape="round"
              aspect={1}
              onCropComplete={(dataUrl) => {
                setAvatarPreview(dataUrl);
                setLastAction("Updated team avatar crop.");
              }}
              onCancel={() => setLastAction("Avatar crop canceled.")}
            />
            <ImageCropper
              image={samplePortrait}
              shape="round"
              aspect={1}
              disabled
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and forms.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Round crops are ideal for profile and member cards.</li>
              <li>• Disabled states help in approval-only screens.</li>
              <li>• Pair crop actions with immediate visual confirmation.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Use wide aspect ratios for cover images.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <ImageCropper
              image={sampleImage}
              aspect={16 / 9}
              onCropComplete={(dataUrl) => {
                setBannerPreview(dataUrl);
                setLastAction("Created 16:9 marketing banner crop.");
              }}
            />
            <ImageCropper
              image={samplePortrait}
              aspect={4 / 5}
              onCropComplete={(dataUrl) => {
                setProductPreview(dataUrl);
                setLastAction("Created portrait crop for marketplace listing.");
              }}
              onCancel={() => setLastAction("Portrait crop canceled.")}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep callback handlers lightweight and deterministic.</li>
              <li>• Support both landscape and portrait marketing assets.</li>
              <li>• Track cancel actions to improve editing UX analytics.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Production usage in onboarding profile setup and media editing
          pipelines.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <ImageCropper
              image={samplePortrait}
              shape="round"
              aspect={1}
              onCropComplete={(dataUrl) => {
                setAvatarPreview(dataUrl);
                setLastAction("Profile setup crop confirmed.");
              }}
              onCancel={() => setLastAction("Profile setup crop canceled.")}
            />

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border/70 bg-muted/20 p-2">
                <p className="mb-2 text-xs font-medium text-foreground">
                  Avatar Preview
                </p>
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No avatar crop yet.
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/20 p-2">
                <p className="mb-2 text-xs font-medium text-foreground">
                  Banner Preview
                </p>
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="h-20 w-full rounded object-cover"
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No banner crop yet.
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/20 p-2">
                <p className="mb-2 text-xs font-medium text-foreground">
                  Product Preview
                </p>
                {productPreview ? (
                  <img
                    src={productPreview}
                    alt="Product preview"
                    className="h-20 w-full rounded object-cover"
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">
                    No product crop yet.
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Last action: {lastAction}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Preserve crop previews so users can compare outputs.</li>
              <li>• Include cancel paths for multi-step onboarding flows.</li>
              <li>• Persist final crops to profile or media services.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageCropperExample;
