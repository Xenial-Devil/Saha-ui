import { List, ListItem } from "../components/List";
import Card, { CardHeader, CardTitle, CardContent } from "../components/Card";
import { Check, X, ChevronRight, Star, Heart } from "lucide-react";

export const ListExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">List Component</h3>

      {/* Basic List */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Basic Unordered List
        </h4>
        <List>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
          <ListItem>Fourth item</ListItem>
        </List>
      </div>

      {/* Ordered List */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Ordered List</h4>
        <List ordered>
          <ListItem>First step</ListItem>
          <ListItem>Second step</ListItem>
          <ListItem>Third step</ListItem>
        </List>
      </div>

      {/* With Icons */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">With Icons</h4>
        <List>
          <ListItem icon={<Check size={16} className="text-success" />}>
            Completed task
          </ListItem>
          <ListItem icon={<X size={16} className="text-error" />}>
            Failed task
          </ListItem>
          <ListItem icon={<ChevronRight size={16} className="text-primary" />}>
            In progress
          </ListItem>
          <ListItem icon={<Star size={16} className="text-warning" />}>
            Starred item
          </ListItem>
          <ListItem icon={<Heart size={16} className="text-destructive" />}>
            Favorite item
          </ListItem>
        </List>
      </div>

      {/* Divided List */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Divided List</h4>
        <List variant="divided">
          <ListItem>Item with divider</ListItem>
          <ListItem>Another item</ListItem>
          <ListItem>Final item</ListItem>
        </List>
      </div>

      {/* List Variants */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Bordered</p>
            <List variant="bordered">
              <ListItem>Bordered item 1</ListItem>
              <ListItem>Bordered item 2</ListItem>
              <ListItem>Bordered item 3</ListItem>
            </List>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Striped</p>
            <List variant="striped">
              <ListItem>Striped item 1</ListItem>
              <ListItem>Striped item 2</ListItem>
              <ListItem>Striped item 3</ListItem>
              <ListItem>Striped item 4</ListItem>
            </List>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Glass</p>
            <List variant="glass">
              <ListItem icon={<Star size={16} />}>Glass effect item 1</ListItem>
              <ListItem icon={<Star size={16} />}>Glass effect item 2</ListItem>
              <ListItem icon={<Star size={16} />}>Glass effect item 3</ListItem>
            </List>
          </div>
        </div>
      </div>

      {/* List Sizes */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Sizes</h4>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small</p>
            <List size="sm">
              <ListItem>Small list item</ListItem>
              <ListItem>Small list item</ListItem>
            </List>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Medium (Default)
            </p>
            <List size="md">
              <ListItem>Medium list item</ListItem>
              <ListItem>Medium list item</ListItem>
            </List>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Large</p>
            <List size="lg">
              <ListItem>Large list item</ListItem>
              <ListItem>Large list item</ListItem>
            </List>
          </div>
        </div>
      </div>

      {/* In Card Context */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          In Card Context
        </h4>
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <List variant="divided">
              <ListItem icon={<Check size={16} className="text-success" />}>
                Complete project setup
              </ListItem>
              <ListItem icon={<Check size={16} className="text-success" />}>
                Design component architecture
              </ListItem>
              <ListItem
                icon={<ChevronRight size={16} className="text-primary" />}
              >
                Implement core features
              </ListItem>
              <ListItem
                icon={<X size={16} className="text-muted-foreground" />}
              >
                Write documentation
              </ListItem>
              <ListItem
                icon={<X size={16} className="text-muted-foreground" />}
              >
                Deploy to production
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>

      {/* Custom Styled Items */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Custom Styled Items
        </h4>
        <List variant="bordered">
          <ListItem className="font-bold text-primary">
            Important item with custom styling
          </ListItem>
          <ListItem className="italic text-muted-foreground">
            Subtle secondary information
          </ListItem>
          <ListItem className="underline">
            Emphasized item with underline
          </ListItem>
        </List>
      </div>
    </div>
  );
};
