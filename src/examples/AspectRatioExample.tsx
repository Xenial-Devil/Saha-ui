import AspectRatio from "../components/AspectRatio";
import { useState } from "react";

export const AspectRatioExample = () => {
  const [clickCount, setClickCount] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
          AspectRatio Component
        </h2>
        <p className="text-muted-foreground text-lg">
          Maintain perfect aspect ratios for images, videos, and embedded
          content with advanced features
        </p>
      </div>

      {/* Preset Ratios */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Preset Aspect Ratios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Square 1:1 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Square (1:1)
            </p>
            <AspectRatio ratio="1/1" variant="default">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                1:1
              </div>
            </AspectRatio>
          </div>

          {/* Standard 4:3 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Standard (4:3)
            </p>
            <AspectRatio ratio="4/3" variant="default">
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                4:3
              </div>
            </AspectRatio>
          </div>

          {/* Widescreen 16:9 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Widescreen (16:9)
            </p>
            <AspectRatio ratio="16/9" variant="default">
              <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
                16:9
              </div>
            </AspectRatio>
          </div>

          {/* Ultrawide 21:9 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Ultrawide (21:9)
            </p>
            <AspectRatio ratio="21/9" variant="default">
              <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-xl">
                21:9
              </div>
            </AspectRatio>
          </div>

          {/* Photo 3:2 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Photo (3:2)
            </p>
            <AspectRatio ratio="3/2" variant="default">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                3:2
              </div>
            </AspectRatio>
          </div>

          {/* Portrait 9:16 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Portrait (9:16)
            </p>
            <AspectRatio ratio="9/16" variant="default">
              <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl">
                9:16
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Visual Variants */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Visual Variants (16:9)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Default</p>
            <AspectRatio ratio="16/9" variant="default" rounded="lg">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
                alt="Mountain landscape"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Bordered */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Bordered
            </p>
            <AspectRatio ratio="16/9" variant="bordered" rounded="lg">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop"
                alt="Forest path"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Glass */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Glass</p>
            <AspectRatio ratio="16/9" variant="glass" rounded="lg">
              <img
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop"
                alt="Sunset"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Glass Strong */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Glass Strong
            </p>
            <AspectRatio ratio="16/9" variant="glass-strong" rounded="lg">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop"
                alt="Lake"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Gradient */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Gradient
            </p>
            <AspectRatio ratio="16/9" variant="gradient" rounded="lg">
              <img
                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=450&fit=crop"
                alt="Valley"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* With Overlay */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          With Overlay Gradient
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bottom Overlay */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Bottom Overlay
            </p>
            <AspectRatio
              ratio="16/9"
              variant="default"
              rounded="xl"
              overlay
              overlayPosition="bottom"
            >
              <img
                src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=450&fit=crop"
                alt="Mountain peak"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h4 className="text-xl font-bold">Mountain Vista</h4>
                <p className="text-sm opacity-90">Breathtaking views</p>
              </div>
            </AspectRatio>
          </div>

          {/* Top Overlay */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Top Overlay
            </p>
            <AspectRatio
              ratio="16/9"
              variant="glass"
              rounded="xl"
              overlay
              overlayPosition="top"
            >
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop"
                alt="Snow mountain"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-20 text-white">
                <h4 className="text-xl font-bold">Alpine Heights</h4>
                <p className="text-sm opacity-90">Snow-capped peaks</p>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Custom Ratio */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">Custom Ratio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Custom 2.5:1 Ratio
            </p>
            <AspectRatio
              ratio="custom"
              customRatio={2.5}
              variant="bordered"
              rounded="lg"
            >
              <div className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-2xl">
                Custom 2.5:1
              </div>
            </AspectRatio>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Custom 1.5:1 Ratio
            </p>
            <AspectRatio
              ratio="custom"
              customRatio={1.5}
              variant="glass-strong"
              rounded="lg"
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl">
                Custom 1.5:1
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Practical Examples
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Thumbnail */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Video Thumbnail
            </p>
            <AspectRatio
              ratio="16/9"
              variant="glass"
              rounded="xl"
              overlay
              overlayPosition="center"
            >
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>
            </AspectRatio>
          </div>

          {/* Profile Card */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Profile Card
            </p>
            <AspectRatio
              ratio="1/1"
              variant="gradient"
              rounded="2xl"
              overlay
              overlayPosition="bottom"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                <h4 className="text-lg font-bold">Jane Doe</h4>
                <p className="text-sm opacity-90">Product Designer</p>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Custom String Ratios */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Custom String Ratios
        </h3>
        <p className="text-muted-foreground mb-4">
          Use custom aspect ratios with string format "width:height"
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Custom 1.3:2.3 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Custom "1.3:2.3"
            </p>
            <AspectRatio
              ratio="custom"
              customRatio="1.3:2.3"
              variant="bordered"
            >
              <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                1.3:2.3
              </div>
            </AspectRatio>
          </div>

          {/* Custom 5:7 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Custom "5:7"
            </p>
            <AspectRatio ratio="custom" customRatio="5:7" variant="glass">
              <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                5:7
              </div>
            </AspectRatio>
          </div>

          {/* Custom 2.5:1 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Custom "2.5:1"
            </p>
            <AspectRatio ratio="custom" customRatio="2.5:1" variant="gradient">
              <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                2.5:1
              </div>
            </AspectRatio>
          </div>

          {/* Custom numeric 2.5 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Custom Numeric 2.5
            </p>
            <AspectRatio ratio="custom" customRatio={2.5} variant="default">
              <div className="w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                2.5
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Zoom on Hover */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">Zoom Effects</h3>
        <p className="text-muted-foreground mb-4">
          Interactive zoom effects on hover
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Zoom */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Default Zoom (1.1x)
            </p>
            <AspectRatio ratio="16/9" variant="bordered" zoomOnHover>
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
                alt="Mountain"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Custom Zoom Scale */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Strong Zoom (1.5x)
            </p>
            <AspectRatio
              ratio="16/9"
              variant="glass"
              zoomOnHover
              zoomScale={1.5}
            >
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop"
                alt="Nature"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>

          {/* Subtle Zoom */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Subtle Zoom (1.05x)
            </p>
            <AspectRatio
              ratio="16/9"
              variant="gradient"
              zoomOnHover
              zoomScale={1.05}
            >
              <img
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=450&fit=crop"
                alt="Sunset"
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Interactive Callbacks */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Interactive Callbacks
        </h3>
        <p className="text-muted-foreground mb-4">
          Click count: <strong className="text-primary">{clickCount}</strong> |
          Hovered:{" "}
          <strong className="text-accent">{hoveredItem || "None"}</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Click Handler */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Click to Count
            </p>
            <AspectRatio
              ratio="4/3"
              variant="bordered"
              onClick={() => setClickCount((prev) => prev + 1)}
              className="cursor-pointer hover:border-primary transition-colors"
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                Click Me!
              </div>
            </AspectRatio>
          </div>

          {/* Hover Handler */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Hover Detection
            </p>
            <AspectRatio
              ratio="4/3"
              variant="glass"
              onMouseEnter={() => setHoveredItem("Card 1")}
              onMouseLeave={() => setHoveredItem(null)}
              className="cursor-pointer"
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                Hover Me!
              </div>
            </AspectRatio>
          </div>

          {/* Combined */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Click + Hover + Zoom
            </p>
            <AspectRatio
              ratio="4/3"
              variant="gradient"
              onClick={() => setClickCount((prev) => prev + 1)}
              onMouseEnter={() => setHoveredItem("Card 2")}
              onMouseLeave={() => setHoveredItem(null)}
              zoomOnHover
              zoomScale={1.2}
              className="cursor-pointer"
            >
              <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                Interactive!
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>
    </div>
  );
};
