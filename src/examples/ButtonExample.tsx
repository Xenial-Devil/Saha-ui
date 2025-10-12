import Button from "../components/Button";
import { Sparkles, Zap, Heart } from "lucide-react";

export const ButtonExample = () => (
  <div className="mb-16">
    <h3 className="text-2xl font-bold mb-6 text-text">Button Variants</h3>
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <Zap size={18} />
        Primary
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="info">Info</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="glass">
        <Sparkles size={18} />
        Glass Effect
      </Button>
    </div>

    <div className="flex flex-wrap gap-4 mt-6">
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="secondary">
        Medium
      </Button>
      <Button size="lg" variant="accent">
        Large
      </Button>
      <Button size="xl" variant="success">
        Extra Large
      </Button>
    </div>

    <div className="flex flex-wrap gap-4 mt-6">
      <Button variant="primary">
        <Heart size={18} />
        Rounded
      </Button>
      <Button variant="glass">Full Width Glass Button</Button>
    </div>
  </div>
);
