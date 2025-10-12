import Rating from "../components/Rating";

export const RatingExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Rating Component</h3>

      {/* Basic Ratings */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Ratings</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Default:</span>
            <Rating value={4} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              With Value:
            </span>
            <Rating value={4.5} precision="half" showValue />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              With Count:
            </span>
            <Rating value={4.3} precision="half" showValue count={128} />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Small:</span>
            <Rating value={4} size="sm" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Medium:</span>
            <Rating value={4} size="md" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Large:</span>
            <Rating value={4} size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Extra Large:
            </span>
            <Rating value={4} size="xl" />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Default:</span>
            <Rating value={4} variant="default" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Primary:</span>
            <Rating value={4} variant="primary" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Secondary:
            </span>
            <Rating value={4} variant="secondary" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Gradient:
            </span>
            <Rating value={4} variant="gradient" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Glass:</span>
            <Rating value={4} variant="glass" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Outline:</span>
            <Rating value={4} variant="outline" size="lg" />
          </div>
        </div>
      </div>

      {/* Half Precision */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Half Star Precision
        </h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              4.5 stars:
            </span>
            <Rating value={4.5} precision="half" showValue size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              3.5 stars:
            </span>
            <Rating value={3.5} precision="half" showValue size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              2.5 stars:
            </span>
            <Rating value={2.5} precision="half" showValue size="lg" />
          </div>
        </div>
      </div>

      {/* Different Icons */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Different Icons
        </h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Stars:</span>
            <Rating value={4} icon="star" size="lg" variant="gradient" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Hearts:</span>
            <Rating value={4} icon="heart" size="lg" variant="primary" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Circles:</span>
            <Rating value={4} icon="circle" size="lg" variant="secondary" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Diamonds:
            </span>
            <Rating value={4} icon="diamond" size="lg" variant="gradient" />
          </div>
        </div>
      </div>

      {/* Interactive */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Interactive Rating
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click to rate, hover to preview
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Full Stars:
            </span>
            <Rating
              value={0}
              precision="full"
              onChange={(value: number) => console.log("Rating:", value)}
              size="lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Half Stars:
            </span>
            <Rating
              value={0}
              precision="half"
              onChange={(value: number) => console.log("Rating:", value)}
              showValue
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Read Only */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Read Only</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Product Rating:
            </span>
            <Rating
              value={4.7}
              precision="half"
              readOnly
              showValue
              count={2541}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              User Review:
            </span>
            <Rating
              value={5}
              readOnly
              showValue
              countLabel="votes"
              count={89}
            />
          </div>
        </div>
      </div>

      {/* Disabled */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Disabled State</h4>
        <div className="flex items-center gap-4">
          <Rating value={3} disabled size="lg" />
        </div>
      </div>

      {/* Custom Max */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Custom Maximum</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Out of 10:
            </span>
            <Rating value={7} max={10} showValue size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Out of 3:
            </span>
            <Rating
              value={2}
              max={3}
              showValue
              size="lg"
              icon="heart"
              variant="primary"
            />
          </div>
        </div>
      </div>

      {/* Custom Colors */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Custom Colors</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Red Hearts:
            </span>
            <Rating value={4} icon="heart" color="#ef4444" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Green Stars:
            </span>
            <Rating value={4} color="#10b981" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Purple Stars:
            </span>
            <Rating value={4} color="#a855f7" size="lg" />
          </div>
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Real-World Examples
        </h4>

        {/* Product Card */}
        <div className="bg-background/50 border border-border rounded-lg p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h5 className="font-semibold text-lg mb-1">
                Wireless Headphones
              </h5>
              <p className="text-sm text-muted-foreground mb-2">
                Premium noise-canceling headphones
              </p>
              <Rating
                value={4.6}
                precision="half"
                showValue
                count={1284}
                readOnly
              />
            </div>
            <span className="text-2xl font-bold text-primary">$199</span>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <h5 className="font-semibold text-lg mb-4">Write a Review</h5>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Rating</span>
              <Rating
                value={0}
                onChange={(value: number) => console.log("Overall:", value)}
                size="lg"
                variant="gradient"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quality</span>
              <Rating
                value={0}
                onChange={(value: number) => console.log("Quality:", value)}
                size="md"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value for Money</span>
              <Rating
                value={0}
                onChange={(value: number) => console.log("Value:", value)}
                size="md"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Would Recommend</span>
              <Rating
                value={0}
                icon="heart"
                variant="primary"
                onChange={(value: number) => console.log("Recommend:", value)}
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
