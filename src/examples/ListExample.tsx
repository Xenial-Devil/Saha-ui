import List from "../components/List";
import ListItem from "../components/List/ListItem";
import Card, { CardHeader, CardTitle, CardContent } from "../components/Card";
import { Check, X, ChevronRight } from "lucide-react";

export const ListExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">List Component</h3>

      {/* Basic List */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic List</h4>
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
            </List>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Cards</p>
            <List variant="cards">
              <ListItem>Card item 1</ListItem>
              <ListItem>Card item 2</ListItem>
              <ListItem>Card item 3</ListItem>
            </List>
          </div>
        </div>
      </div>

      {/* In Card */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">List in Card</h4>
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <List variant="divided">
              <ListItem icon={<Check size={16} className="text-success" />}>
                Setup project structure
              </ListItem>
              <ListItem icon={<Check size={16} className="text-success" />}>
                Create component library
              </ListItem>
              <ListItem
                icon={<ChevronRight size={16} className="text-primary" />}
              >
                Write documentation
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
