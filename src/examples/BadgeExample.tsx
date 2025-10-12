import { Badge } from "../index";
import { Star, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export const BadgeExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Badge Component</h3>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="glass">Glass</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary" size="sm">
            Small
          </Badge>
          <Badge variant="primary" size="md">
            Medium
          </Badge>
          <Badge variant="primary" size="lg">
            Large
          </Badge>
        </div>
      </div>

      {/* Shapes */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Shapes</h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" shape="rounded">
            Rounded
          </Badge>
          <Badge variant="primary" shape="pill">
            Pill
          </Badge>
          <Badge variant="primary" shape="square">
            Square
          </Badge>
        </div>
      </div>

      {/* With Status Dot */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          With Status Dot
        </h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" dot>
            Online
          </Badge>
          <Badge variant="warning" dot>
            Away
          </Badge>
          <Badge variant="error" dot>
            Offline
          </Badge>
          <Badge variant="info" dot pulse>
            Live
          </Badge>
        </div>
      </div>

      {/* With Icons */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" icon={<Star size={12} />}>
            Featured
          </Badge>
          <Badge variant="success" icon={<CheckCircle size={12} />}>
            Verified
          </Badge>
          <Badge variant="warning" icon={<AlertCircle size={12} />}>
            Alert
          </Badge>
          <Badge variant="glass" icon={<Sparkles size={12} />}>
            Premium
          </Badge>
        </div>
      </div>
    </div>
  );
};
