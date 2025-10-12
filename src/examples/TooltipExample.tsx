import Tooltip from "../components/Tooltip";
import Button from "../components/Button";
import { Info, Settings, Heart, Trash2 } from "lucide-react";

export const TooltipExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Tooltip Component</h3>

      {/* Basic Tooltips */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Tooltips</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="This is a tooltip">
            <Button variant="outline">Hover me</Button>
          </Tooltip>

          <Tooltip content="Click to get more information">
            <Button variant="primary">
              <Info size={16} /> Info
            </Button>
          </Tooltip>

          <Tooltip content="Open settings panel">
            <Button variant="ghost" size="sm">
              <Settings size={16} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Positions */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Positions</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Top tooltip" position="top">
            <Button variant="outline">Top</Button>
          </Tooltip>

          <Tooltip content="Right tooltip" position="right">
            <Button variant="outline">Right</Button>
          </Tooltip>

          <Tooltip content="Bottom tooltip" position="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>

          <Tooltip content="Left tooltip" position="left">
            <Button variant="outline">Left</Button>
          </Tooltip>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Dark tooltip" variant="dark">
            <Button variant="outline">Dark</Button>
          </Tooltip>

          <Tooltip content="Light tooltip" variant="light">
            <Button variant="outline">Light</Button>
          </Tooltip>

          <Tooltip content="Glass tooltip" variant="glass">
            <Button variant="outline">Glass</Button>
          </Tooltip>

          <Tooltip content="Primary tooltip" variant="primary">
            <Button variant="outline">Primary</Button>
          </Tooltip>

          <Tooltip content="Success tooltip" variant="success">
            <Button variant="outline">Success</Button>
          </Tooltip>
        </div>
      </div>

      {/* With Delay */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Delay</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Instant tooltip" delay={0}>
            <Button variant="outline">No delay</Button>
          </Tooltip>

          <Tooltip content="Quick tooltip" delay={200}>
            <Button variant="outline">200ms delay</Button>
          </Tooltip>

          <Tooltip content="Slow tooltip" delay={700}>
            <Button variant="outline">700ms delay</Button>
          </Tooltip>
        </div>
      </div>

      {/* Icon Buttons with Tooltips */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Icon Buttons with Tooltips
        </h4>
        <div className="flex gap-2">
          <Tooltip content="Add to favorites">
            <Button variant="ghost" size="sm">
              <Heart size={16} />
            </Button>
          </Tooltip>

          <Tooltip content="Delete item">
            <Button variant="ghost" size="sm">
              <Trash2 size={16} />
            </Button>
          </Tooltip>

          <Tooltip content="Settings">
            <Button variant="ghost" size="sm">
              <Settings size={16} />
            </Button>
          </Tooltip>

          <Tooltip content="Information">
            <Button variant="ghost" size="sm">
              <Info size={16} />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
