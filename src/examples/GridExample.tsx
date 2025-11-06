import { Grid, GridItem } from "../components/Grid";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { LayoutGrid, Smartphone, Monitor, Maximize } from "lucide-react";

export const GridExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Basic Grid Layouts</h3>

      {/* 2 Column Grid */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">2 Column Grid</h4>
        <Grid cols={2} gap="md">
          <Card variant="bordered" hoverable>
            <CardContent>
              <Badge variant="primary">Column 1</Badge>
            </CardContent>
          </Card>
          <Card variant="bordered" hoverable>
            <CardContent>
              <Badge variant="secondary">Column 2</Badge>
            </CardContent>
          </Card>
        </Grid>
      </div>

      {/* 3 Column Grid */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">3 Column Grid</h4>
        <Grid cols={3} gap="lg">
          <Card variant="bordered" hoverable>
            <CardHeader>
              <CardTitle>Feature 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">
                First feature description
              </p>
            </CardContent>
          </Card>
          <Card variant="bordered" hoverable>
            <CardHeader>
              <CardTitle>Feature 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">
                Second feature description
              </p>
            </CardContent>
          </Card>
          <Card variant="bordered" hoverable>
            <CardHeader>
              <CardTitle>Feature 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">
                Third feature description
              </p>
            </CardContent>
          </Card>
        </Grid>
      </div>

      {/* 4 Column Grid */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-text">4 Column Grid</h4>
        <Grid cols={4} gap="md">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} variant="glass" hoverable>
              <CardContent>
                <div className="text-center py-4">
                  <LayoutGrid className="mx-auto mb-2 text-primary" size={24} />
                  <Badge variant="primary">Item {i}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </div>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Responsive Grid
      </h3>

      {/* Responsive Grid */}
      <div className="mb-8">
        <Card variant="glass-subtle" className="mb-4">
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Smartphone size={16} />
              <span>1 column on mobile</span>
              <Monitor size={16} className="ml-4" />
              <span>2 on tablet</span>
              <Maximize size={16} className="ml-4" />
              <span>4 on desktop</span>
            </div>
          </CardContent>
        </Card>

        <Grid
          cols={1}
          responsive={{
            sm: 2,
            md: 3,
            lg: 4,
          }}
          gap="lg"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} variant="bordered" hoverable>
              <CardContent>
                <div className="text-center py-6">
                  <Badge variant="accent">Card {i}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </div>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Auto-Fit Grid
      </h3>

      {/* Auto-Fit Grid */}
      <div className="mb-8">
        <Card variant="glass" className="mb-4">
          <CardContent>
            <p className="text-text-secondary text-sm">
              Automatically adjusts columns based on available space (min width: 250px)
            </p>
          </CardContent>
        </Card>

        <Grid autoFit minColWidth="250px" gap="lg">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} variant="glass-strong" hoverable>
              <CardHeader>
                <CardTitle>Auto Item {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Flexible sizing
                </p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </div>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Grid with Spans
      </h3>

      {/* Grid with Spans */}
      <div className="mb-8">
        <Grid cols={12} gap="lg">
          {/* Full Width Header */}
          <GridItem colSpan={12}>
            <Card variant="glass">
              <CardContent>
                <div className="text-center py-4">
                  <Badge variant="primary" size="lg">
                    Full Width Header (12 cols)
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </GridItem>

          {/* Sidebar - 4 cols */}
          <GridItem colSpan={12} responsive={{ md: 4 }}>
            <Card variant="bordered" hoverable>
              <CardHeader>
                <CardTitle>Sidebar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  4 columns on desktop, full width on mobile
                </p>
              </CardContent>
            </Card>
          </GridItem>

          {/* Main Content - 8 cols */}
          <GridItem colSpan={12} responsive={{ md: 8 }}>
            <Card variant="bordered" hoverable>
              <CardHeader>
                <CardTitle>Main Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  8 columns on desktop, full width on mobile
                </p>
              </CardContent>
            </Card>
          </GridItem>

          {/* Three equal columns */}
          <GridItem colSpan={12} responsive={{ md: 4 }}>
            <Card variant="glass-subtle" hoverable>
              <CardContent>
                <Badge variant="success">Column 1</Badge>
              </CardContent>
            </Card>
          </GridItem>

          <GridItem colSpan={12} responsive={{ md: 4 }}>
            <Card variant="glass-subtle" hoverable>
              <CardContent>
                <Badge variant="warning">Column 2</Badge>
              </CardContent>
            </Card>
          </GridItem>

          <GridItem colSpan={12} responsive={{ md: 4 }}>
            <Card variant="glass-subtle" hoverable>
              <CardContent>
                <Badge variant="error">Column 3</Badge>
              </CardContent>
            </Card>
          </GridItem>
        </Grid>
      </div>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Dashboard Layout Example
      </h3>

      {/* Dashboard Layout */}
      <Grid cols={12} gap="lg">
        {/* Header */}
        <GridItem colSpan={12}>
          <Card variant="glass-strong">
            <CardContent>
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-text">Dashboard</h4>
                <Button variant="primary" size="sm">
                  New Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </GridItem>

        {/* Stats Cards */}
        <GridItem colSpan={6} responsive={{ sm: 6, md: 3 }}>
          <Card variant="bordered" hoverable>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-2xl font-bold text-primary">1,234</p>
                <p className="text-sm text-text-secondary">Total Users</p>
              </div>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem colSpan={6} responsive={{ sm: 6, md: 3 }}>
          <Card variant="bordered" hoverable>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-2xl font-bold text-success">567</p>
                <p className="text-sm text-text-secondary">Active</p>
              </div>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem colSpan={6} responsive={{ sm: 6, md: 3 }}>
          <Card variant="bordered" hoverable>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-2xl font-bold text-warning">89</p>
                <p className="text-sm text-text-secondary">Pending</p>
              </div>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem colSpan={6} responsive={{ sm: 6, md: 3 }}>
          <Card variant="bordered" hoverable>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-2xl font-bold text-accent">$12.5k</p>
                <p className="text-sm text-text-secondary">Revenue</p>
              </div>
            </CardContent>
          </Card>
        </GridItem>

        {/* Main Chart */}
        <GridItem colSpan={12} responsive={{ lg: 8 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-text-secondary">Chart Area</p>
              </div>
            </CardContent>
          </Card>
        </GridItem>

        {/* Recent Activity */}
        <GridItem colSpan={12} responsive={{ lg: 4 }}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">New</Badge>
                  <p className="text-sm text-text-secondary">User signup</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm">Done</Badge>
                  <p className="text-sm text-text-secondary">Task completed</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning" size="sm">Alert</Badge>
                  <p className="text-sm text-text-secondary">Pending review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>

      <h3 className="text-2xl font-bold mb-6 mt-12 text-text">
        Gap Variants
      </h3>

      {/* Different Gap Sizes */}
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-semibold mb-3 text-text">Small Gap</h4>
          <Grid cols={4} gap="sm">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} variant="bordered">
                <CardContent>
                  <Badge variant="outline">Item {i}</Badge>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-text">Large Gap</h4>
          <Grid cols={4} gap="lg">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} variant="bordered">
                <CardContent>
                  <Badge variant="outline">Item {i}</Badge>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-text">Extra Large Gap</h4>
          <Grid cols={4} gap="xl">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} variant="bordered">
                <CardContent>
                  <Badge variant="outline">Item {i}</Badge>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};
