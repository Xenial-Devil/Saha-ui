import React from "react";
import { Skeleton } from "../components/Skeleton";
import { Card } from "../components/Card";

export const SkeletonExample: React.FC = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Skeleton Component</h2>
        <p className="text-base-content/70 mb-8">
          A flexible skeleton loader for displaying placeholder content while
          data is loading.
        </p>
      </div>

      {/* Variants */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Default</p>
            <Skeleton variant="default" height="60px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Pulse</p>
            <Skeleton variant="pulse" height="60px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Wave</p>
            <Skeleton variant="wave" height="60px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Shimmer</p>
            <Skeleton variant="shimmer" height="60px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Gradient</p>
            <Skeleton variant="gradient" height="60px" />
          </div>
        </div>
      </section>

      {/* Shapes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Shapes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Rectangle</p>
            <Skeleton shape="rectangle" width="100%" height="80px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Circle</p>
            <Skeleton shape="circle" width="80px" height="80px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Rounded</p>
            <Skeleton shape="rounded" width="100%" height="80px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Text</p>
            <Skeleton shape="text" width="100%" height="16px" count={4} />
          </div>
        </div>
      </section>

      {/* Animation Speeds */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Animation Speeds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Slow</p>
            <Skeleton variant="shimmer" speed="slow" height="60px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Normal</p>
            <Skeleton variant="shimmer" speed="normal" height="60px" />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Fast</p>
            <Skeleton variant="shimmer" speed="fast" height="60px" />
          </div>
        </div>
      </section>

      {/* Multiple Lines */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Multiple Lines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">3 Lines</p>
            <Skeleton variant="pulse" count={3} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">5 Lines with Shimmer</p>
            <Skeleton variant="shimmer" count={5} />
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Real-world Examples</h3>

        {/* Profile Card Skeleton */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">Profile Card Loading</p>
          <Card className="max-w-sm">
            <div className="flex items-start gap-4">
              <Skeleton
                shape="circle"
                width="64px"
                height="64px"
                variant="shimmer"
              />
              <div className="flex-1">
                <Skeleton
                  variant="shimmer"
                  height="24px"
                  width="60%"
                  className="mb-2"
                />
                <Skeleton
                  variant="shimmer"
                  height="16px"
                  width="80%"
                  className="mb-4"
                />
                <Skeleton variant="pulse" count={2} height="14px" />
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Post Skeleton */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">Blog Post Loading</p>
          <Card className="max-w-2xl">
            <Skeleton variant="wave" height="200px" className="mb-4" />
            <Skeleton
              variant="shimmer"
              height="32px"
              width="80%"
              className="mb-3"
            />
            <Skeleton variant="pulse" count={4} height="16px" />
          </Card>
        </div>

        {/* List Items Skeleton */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">List Items Loading</p>
          <div className="max-w-md space-y-4">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="flex items-center gap-4">
                <Skeleton
                  shape="circle"
                  width="48px"
                  height="48px"
                  variant="gradient"
                />
                <div className="flex-1">
                  <Skeleton
                    variant="shimmer"
                    height="18px"
                    width="70%"
                    className="mb-2"
                  />
                  <Skeleton variant="pulse" height="14px" width="90%" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div>
          <p className="text-sm font-medium mb-3">Product Grid Loading</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <Skeleton variant="wave" height="200px" className="mb-3" />
                <Skeleton
                  variant="shimmer"
                  height="20px"
                  width="80%"
                  className="mb-2"
                />
                <Skeleton
                  variant="pulse"
                  height="16px"
                  width="60%"
                  className="mb-3"
                />
                <Skeleton variant="gradient" height="40px" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeletonExample;
