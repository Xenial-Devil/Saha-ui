import Image from "../components/Image";

export const ImageExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Image Component</h3>

      {/* Basic Image */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Image</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format"
          alt="Sample image"
          width={400}
          height={300}
        />
      </div>

      {/* With Fit Options */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Fit Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Cover</p>
            <Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
              alt="Cover"
              width={300}
              height={200}
              fit="cover"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Contain</p>
            <Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
              alt="Contain"
              width={300}
              height={200}
              fit="contain"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Fill</p>
            <Image
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
              alt="Fill"
              width={300}
              height={200}
              fit="fill"
            />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-wrap gap-4">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
            alt="Rounded"
            width={200}
            height={200}
            variant="rounded"
          />
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
            alt="Circular"
            width={200}
            height={200}
            variant="circular"
          />
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
            alt="Bordered"
            width={200}
            height={200}
            variant="bordered"
          />
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&auto=format"
            alt="Glass"
            width={200}
            height={200}
            variant="glass"
          />
        </div>
      </div>

      {/* With Zoom on Hover */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Zoom on Hover</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format"
          alt="Hover to zoom"
          width={400}
          height={300}
          zoomOnHover
        />
      </div>

      {/* With Loading */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Lazy Loading</h4>
        <Image
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format"
          alt="Lazy loaded"
          width={400}
          height={300}
          loading="lazy"
        />
      </div>
    </div>
  );
};
