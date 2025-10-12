import Carousel from "../components/Carousel";
import { ShoppingCart, Heart, Star } from "lucide-react";

export const CarouselExample = () => {
  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&auto=format",
      alt: "Slide 1",
      caption: "Beautiful Landscape 1",
      title: "Nature Scene",
      description: "Explore the beauty of nature",
      link: "#",
      linkText: "Explore Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=1200&auto=format",
      alt: "Slide 2",
      caption: "Beautiful Landscape 2",
      title: "Mountain View",
      description: "Breathtaking mountain scenery",
      link: "#",
      linkText: "Discover More",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=1200&auto=format",
      alt: "Slide 3",
      caption: "Beautiful Landscape 3",
      title: "Sunset Paradise",
      description: "Golden hour magnificence",
      link: "#",
      linkText: "View Gallery",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682687221175-fd40bbafe6c9?w=1200&auto=format",
      alt: "Slide 4",
      caption: "Beautiful Landscape 4",
      title: "Ocean Views",
      description: "Tranquil coastal beauty",
      link: "#",
      linkText: "Learn More",
    },
  ];

  // Items without buttons
  const itemsNoButtons = items.map((item) => ({
    ...item,
    link: undefined,
    linkText: undefined,
    showButton: false,
  }));

  // Items with custom button variants
  const itemsWithSolidButton = items.map((item) => ({
    ...item,
    buttonVariant: "solid" as const,
    LinkIcon: ShoppingCart,
  }));

  const itemsWithOutlineButton = items.map((item) => ({
    ...item,
    buttonVariant: "outline" as const,
    LinkIcon: Heart,
  }));

  const itemsWithGhostButton = items.map((item) => ({
    ...item,
    buttonVariant: "ghost" as const,
    LinkIcon: Star,
  }));

  // Custom button component example
  const CustomCTAButton = ({
    link,
    linkText,
  }: {
    link?: string;
    linkText?: string;
  }) => (
    <a
      href={link}
      className="group relative inline-flex items-center gap-2 px-8 py-4 overflow-hidden rounded-full bg-white text-black font-bold transition-all duration-300 hover:bg-primary hover:text-white"
    >
      <span className="relative z-10">{linkText || "Custom Button"}</span>
      <div className="absolute inset-0 scale-0 rounded-full bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-100" />
    </a>
  );

  const itemsWithCustomButton = items.map((item) => ({
    ...item,
    CustomButton: CustomCTAButton,
  }));

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Carousel Component</h3>

      {/* Basic Carousel with Default Gradient Button */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Default Carousel with Gradient Button
        </h4>
        <Carousel items={items} />
      </div>

      {/* Carousel without Buttons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Carousel without CTA Buttons
        </h4>
        <Carousel items={itemsNoButtons} autoplay autoplayInterval={3000} />
      </div>

      {/* Solid Button Variant */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Solid Button Variant with Custom Icon
        </h4>
        <Carousel items={itemsWithSolidButton} variant="bordered" />
      </div>

      {/* Outline Button Variant */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Outline Button Variant
        </h4>
        <Carousel items={itemsWithOutlineButton} variant="glass" autoplay />
      </div>

      {/* Ghost Button Variant */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Ghost Button Variant
        </h4>
        <Carousel items={itemsWithGhostButton} />
      </div>

      {/* Custom Button Component */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Custom Button Component
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          You can provide your own button component with complete custom styling
        </p>
        <Carousel
          items={itemsWithCustomButton}
          variant="glass"
          autoplay
          autoplayInterval={4000}
        />
      </div>

      {/* Fade Effect */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Fade Effect with Navigation
        </h4>
        <Carousel
          items={items}
          effect="fade"
          autoplay
          autoplayInterval={4000}
          showNavigation
          showIndicators
        />
      </div>
    </div>
  );
};
