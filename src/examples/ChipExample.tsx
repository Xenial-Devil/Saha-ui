import { Chip } from "../components/Chip";
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/Card";
import Avatar from "../components/Avatar";
import { Star, Heart, Zap, Sparkles, Filter } from "lucide-react";

export const ChipExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Chip Component</h3>

      {/* Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-wrap gap-3">
          <Chip variant="filled" color="primary">
            Filled
          </Chip>
          <Chip variant="outlined" color="primary">
            Outlined
          </Chip>
          <Chip variant="soft" color="primary">
            Soft
          </Chip>
          <Chip variant="gradient" color="primary">
            Gradient
          </Chip>
          <Chip variant="glass" color="primary">
            Glass
          </Chip>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Colors</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Filled</p>
            <div className="flex flex-wrap gap-2">
              <Chip variant="filled" color="default">
                Default
              </Chip>
              <Chip variant="filled" color="primary">
                Primary
              </Chip>
              <Chip variant="filled" color="secondary">
                Secondary
              </Chip>
              <Chip variant="filled" color="success">
                Success
              </Chip>
              <Chip variant="filled" color="warning">
                Warning
              </Chip>
              <Chip variant="filled" color="error">
                Error
              </Chip>
              <Chip variant="filled" color="info">
                Info
              </Chip>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Outlined</p>
            <div className="flex flex-wrap gap-2">
              <Chip variant="outlined" color="default">
                Default
              </Chip>
              <Chip variant="outlined" color="primary">
                Primary
              </Chip>
              <Chip variant="outlined" color="secondary">
                Secondary
              </Chip>
              <Chip variant="outlined" color="success">
                Success
              </Chip>
              <Chip variant="outlined" color="warning">
                Warning
              </Chip>
              <Chip variant="outlined" color="error">
                Error
              </Chip>
              <Chip variant="outlined" color="info">
                Info
              </Chip>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Soft</p>
            <div className="flex flex-wrap gap-2">
              <Chip variant="soft" color="default">
                Default
              </Chip>
              <Chip variant="soft" color="primary">
                Primary
              </Chip>
              <Chip variant="soft" color="secondary">
                Secondary
              </Chip>
              <Chip variant="soft" color="success">
                Success
              </Chip>
              <Chip variant="soft" color="warning">
                Warning
              </Chip>
              <Chip variant="soft" color="error">
                Error
              </Chip>
              <Chip variant="soft" color="info">
                Info
              </Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="flex items-center flex-wrap gap-3">
          <Chip size="sm" color="primary">
            Small
          </Chip>
          <Chip size="md" color="primary">
            Medium
          </Chip>
          <Chip size="lg" color="primary">
            Large
          </Chip>
        </div>
      </div>

      {/* With Icons */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <div className="flex flex-wrap gap-3">
          <Chip icon={<Star size={14} />} color="warning" variant="soft">
            Featured
          </Chip>
          <Chip icon={<Heart size={14} />} color="error" variant="filled">
            Favorite
          </Chip>
          <Chip icon={<Zap size={14} />} color="info" variant="gradient">
            Powered
          </Chip>
          <Chip icon={<Sparkles size={14} />} color="primary" variant="glass">
            Premium
          </Chip>
        </div>
      </div>

      {/* With Avatars */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Avatars</h4>
        <div className="flex flex-wrap gap-3">
          <Chip
            avatar={
              <Avatar
                size="xs"
                src="https://i.pravatar.cc/150?img=1"
                alt="John Doe"
                className="w-5 h-5"
              />
            }
            variant="soft"
            color="primary"
          >
            John Doe
          </Chip>
          <Chip
            avatar={
              <Avatar
                size="xs"
                src="https://i.pravatar.cc/150?img=2"
                alt="Jane Smith"
                className="w-5 h-5"
              />
            }
            variant="outlined"
            color="secondary"
          >
            Jane Smith
          </Chip>
          <Chip
            avatar={
              <Avatar
                size="xs"
                src="https://i.pravatar.cc/150?img=3"
                alt="Bob Wilson"
                className="w-5 h-5"
              />
            }
            variant="filled"
            color="success"
          >
            Bob Wilson
          </Chip>
        </div>
      </div>

      {/* Deletable Chips */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Deletable Chips
        </h4>
        <div className="flex flex-wrap gap-3">
          <Chip
            deletable
            onDelete={() => console.log("Deleted React")}
            color="primary"
            variant="soft"
          >
            React
          </Chip>
          <Chip
            deletable
            onDelete={() => console.log("Deleted TypeScript")}
            color="info"
            variant="soft"
          >
            TypeScript
          </Chip>
          <Chip
            deletable
            onDelete={() => console.log("Deleted JavaScript")}
            color="warning"
            variant="soft"
          >
            JavaScript
          </Chip>
          <Chip
            deletable
            onDelete={() => console.log("Deleted CSS")}
            color="error"
            variant="soft"
          >
            CSS
          </Chip>
          <Chip
            deletable
            onDelete={() => console.log("Deleted HTML")}
            color="success"
            variant="soft"
          >
            HTML
          </Chip>
        </div>
      </div>

      {/* Clickable Chips */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Clickable & Interactive
        </h4>
        <div className="flex flex-wrap gap-3">
          <Chip
            clickable
            onClick={() => alert("Clicked!")}
            color="primary"
            variant="outlined"
          >
            Click Me
          </Chip>
          <Chip
            clickable
            onClick={() => alert("Filter activated")}
            color="info"
            variant="soft"
            icon={<Filter size={14} />}
          >
            Filter
          </Chip>
          <Chip
            clickable
            deletable
            onClick={() => alert("Clicked tag")}
            onDelete={() => console.log("Deleted tag")}
            color="secondary"
            variant="filled"
          >
            Interactive Tag
          </Chip>
        </div>
      </div>

      {/* Disabled State */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Disabled State</h4>
        <div className="flex flex-wrap gap-3">
          <Chip disabled color="primary" variant="filled">
            Disabled
          </Chip>
          <Chip disabled deletable color="success" variant="soft">
            Can't Delete
          </Chip>
          <Chip
            disabled
            clickable
            onClick={() => alert("Won't fire")}
            color="error"
            variant="outlined"
          >
            Can't Click
          </Chip>
        </div>
      </div>

      {/* Real-World Usage */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Real-World Usage
        </h4>

        <Card variant="glass" padding="lg" className="mb-4">
          <CardHeader>
            <CardTitle>Skills & Tags</CardTitle>
            <CardDescription>Manage your technology stack</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Frontend</p>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    deletable
                    onDelete={() => console.log("Removed React")}
                    color="primary"
                    variant="soft"
                  >
                    React
                  </Chip>
                  <Chip
                    deletable
                    onDelete={() => console.log("Removed Vue")}
                    color="success"
                    variant="soft"
                  >
                    Vue
                  </Chip>
                  <Chip
                    deletable
                    onDelete={() => console.log("Removed Angular")}
                    color="error"
                    variant="soft"
                  >
                    Angular
                  </Chip>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Backend</p>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    deletable
                    onDelete={() => console.log("Removed Node.js")}
                    color="success"
                    variant="soft"
                  >
                    Node.js
                  </Chip>
                  <Chip
                    deletable
                    onDelete={() => console.log("Removed Python")}
                    color="info"
                    variant="soft"
                  >
                    Python
                  </Chip>
                  <Chip
                    deletable
                    onDelete={() => console.log("Removed Go")}
                    color="secondary"
                    variant="soft"
                  >
                    Go
                  </Chip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
