import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../index";
import { Star, Heart, Mail, User, Bell } from "lucide-react";

export const ButtonGroupExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">
        Button Group Component
      </h3>

      {/* Horizontal Button Groups */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Horizontal Groups
        </h4>
        <div className="space-y-4">
          <ButtonGroup>
            <Button variant="primary">Left</Button>
            <Button variant="primary">Center</Button>
            <Button variant="primary">Right</Button>
          </ButtonGroup>

          <ButtonGroup variant="outline">
            <Button variant="ghost">Save</Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="ghost">Delete</Button>
          </ButtonGroup>

          <ButtonGroup variant="glass">
            <Button variant="glass">
              <Star size={16} />
              Featured
            </Button>
            <Button variant="glass">
              <Heart size={16} />
              Favorite
            </Button>
            <Button variant="glass">
              <Mail size={16} />
              Share
            </Button>
          </ButtonGroup>

          <ButtonGroup fullRounded>
            <Button variant="secondary">First</Button>
            <Button variant="secondary">Second</Button>
            <Button variant="secondary">Third</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Vertical Button Groups */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Vertical Groups
        </h4>
        <div className="flex flex-wrap gap-4">
          <ButtonGroup orientation="vertical">
            <Button variant="accent">Top</Button>
            <Button variant="accent">Middle</Button>
            <Button variant="accent">Bottom</Button>
          </ButtonGroup>

          <ButtonGroup orientation="vertical" variant="outline">
            <Button variant="ghost">
              <User size={16} />
              Profile
            </Button>
            <Button variant="ghost">
              <Bell size={16} />
              Notifications
            </Button>
            <Button variant="ghost">
              <Mail size={16} />
              Messages
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Sizes & Full Width
        </h4>
        <div className="space-y-4">
          <ButtonGroup size="sm">
            <Button variant="primary">Small</Button>
            <Button variant="primary">Size</Button>
            <Button variant="primary">Group</Button>
          </ButtonGroup>

          <ButtonGroup size="lg">
            <Button variant="success">Large</Button>
            <Button variant="success">Size</Button>
            <Button variant="success">Group</Button>
          </ButtonGroup>

          <ButtonGroup fullWidth>
            <Button variant="warning">Equal</Button>
            <Button variant="warning">Width</Button>
            <Button variant="warning">Buttons</Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Contextual Usage */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Contextual Usage
        </h4>
        <Card variant="glass-strong" padding="lg" className="max-w-md">
          <CardHeader>
            <CardTitle>Confirm Action</CardTitle>
            <CardDescription>Are you sure you want to proceed?</CardDescription>
          </CardHeader>
          <CardFooter>
            <ButtonGroup fullWidth>
              <Button variant="error">Delete</Button>
              <Button variant="ghost">Cancel</Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
