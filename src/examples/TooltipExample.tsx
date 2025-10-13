import Tooltip, { TooltipTrigger, TooltipContent } from "../components/Tooltip";
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
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="primary">
                <Info size={16} /> Info
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click to get more information</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open settings panel</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Positions */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Positions</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip position="top">
            <TooltipTrigger>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent>Top tooltip</TooltipContent>
          </Tooltip>

          <Tooltip position="right">
            <TooltipTrigger>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent>Right tooltip</TooltipContent>
          </Tooltip>

          <Tooltip position="bottom">
            <TooltipTrigger>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent>Bottom tooltip</TooltipContent>
          </Tooltip>

          <Tooltip position="left">
            <TooltipTrigger>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent>Left tooltip</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip variant="dark">
            <TooltipTrigger>
              <Button variant="outline">Dark</Button>
            </TooltipTrigger>
            <TooltipContent>Dark tooltip</TooltipContent>
          </Tooltip>

          <Tooltip variant="light">
            <TooltipTrigger>
              <Button variant="outline">Light</Button>
            </TooltipTrigger>
            <TooltipContent>Light tooltip</TooltipContent>
          </Tooltip>

          <Tooltip variant="glass">
            <TooltipTrigger>
              <Button variant="outline">Glass</Button>
            </TooltipTrigger>
            <TooltipContent>Glass tooltip</TooltipContent>
          </Tooltip>

          <Tooltip variant="primary">
            <TooltipTrigger>
              <Button variant="outline">Primary</Button>
            </TooltipTrigger>
            <TooltipContent>Primary tooltip</TooltipContent>
          </Tooltip>

          <Tooltip variant="success">
            <TooltipTrigger>
              <Button variant="outline">Success</Button>
            </TooltipTrigger>
            <TooltipContent>Success tooltip</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* With Delay */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Delay</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip delay={0}>
            <TooltipTrigger>
              <Button variant="outline">No delay</Button>
            </TooltipTrigger>
            <TooltipContent>Instant tooltip</TooltipContent>
          </Tooltip>

          <Tooltip delay={200}>
            <TooltipTrigger>
              <Button variant="outline">200ms delay</Button>
            </TooltipTrigger>
            <TooltipContent>Quick tooltip</TooltipContent>
          </Tooltip>

          <Tooltip delay={700}>
            <TooltipTrigger>
              <Button variant="outline">700ms delay</Button>
            </TooltipTrigger>
            <TooltipContent>Slow tooltip</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Icon Buttons with Tooltips */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Icon Buttons with Tooltips
        </h4>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Heart size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to favorites</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Trash2 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete item</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm">
                <Info size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Information</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
