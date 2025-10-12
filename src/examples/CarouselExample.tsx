import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/Carousel";
import { Button } from "../index";
import { ShoppingCart, Heart, Star } from "lucide-react";

export const CarouselExample = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&auto=format",
      title: "Nature Scene",
      description: "Explore the beauty of nature",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=1200&auto=format",
      title: "Mountain View",
      description: "Breathtaking mountain scenery",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=1200&auto=format",
      title: "Sunset Paradise",
      description: "Golden hour magnificence",
    },
    {
      image:
        "https://images.unsplash.com/photo-1682687221175-fd40bbafe6c9?w=1200&auto=format",
      title: "Ocean Views",
      description: "Tranquil coastal beauty",
    },
  ];

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Carousel Component</h3>

      {/* Basic Carousel */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Basic Carousel with Navigation
        </h4>
        <Carousel autoplay autoplayInterval={3000}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-lg opacity-90">{slide.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Carousel with CTA Buttons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Carousel with Call-to-Action Buttons
        </h4>
        <Carousel variant="bordered">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-lg opacity-90 mb-4">
                      {slide.description}
                    </p>
                    <Button variant="glass" size="lg">
                      <ShoppingCart size={18} />
                      Explore Now
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Glass Effect Carousel */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Glass Effect Carousel with Auto-play
        </h4>
        <Carousel variant="glass" autoplay autoplayInterval={4000}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-lg opacity-90 mb-4">
                      {slide.description}
                    </p>
                    <div className="flex gap-3">
                      <Button variant="primary" size="md">
                        <Heart size={18} />
                        Save
                      </Button>
                      <Button variant="outline" size="md">
                        <Star size={18} />
                        Favorite
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Fade Effect */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Fade Effect Carousel
        </h4>
        <Carousel effect="fade" autoplay autoplayInterval={5000}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
                    <h3 className="text-4xl font-bold mb-3">{slide.title}</h3>
                    <p className="text-xl opacity-90">{slide.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Minimal Carousel - No Navigation */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Minimal Auto-play Carousel (No Navigation)
        </h4>
        <Carousel autoplay autoplayInterval={3000}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-lg opacity-90">{slide.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
