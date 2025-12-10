import React from "react";
import { Stack } from "../components/Stack";
import { Grid, GridItem } from "../components/Grid";
import { Paper } from "../components/Paper";
import { Separator } from "../components/Separator";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import Badge from "../components/Badge";
import { ToggleGroup } from "../components/ToggleGroup";
import { Toggle } from "../components/Toggle";
import { Tag, TagGroup } from "../components/Tag";
import { Skeleton } from "../components/Skeleton";
import { Label, LabelGroup } from "../components/Label";

/**
 * NumericSpacingExample - Demonstrates numeric and custom string spacing values
 *
 * This example showcases the new capability to use numeric and custom spacing across ALL components:
 *
 * UPDATED COMPONENTS:
 * - ToggleGroup: spacing prop (0, 1, 2, 3, 4, or number/string)
 * - TagGroup: spacing prop ("sm", "md", "lg", or number/string)
 * - Skeleton: spacing prop ("tight", "normal", "loose", "relaxed", or number/string)
 * - LabelGroup: spacing prop ("sm", "md", "lg", or number/string)
 *
 * ALREADY SUPPORTED:
 * - Stack: spacing prop
 * - Grid: gap prop
 * - Container: padding prop
 * - Section: padding prop
 * - Card: padding prop
 * - Paper: padding prop
 * - Separator: spacing prop
 * - Masonry: gap prop
 * - AvatarGroup: spacing prop
 * - Item: spacing prop
 * - Field: spacing prop
 * - Form: spacing prop
 *
 * All support:
 * - Predefined tokens: 'xs', 'sm', 'md', 'lg', 'xl', '2xl'
 * - Numbers (automatically converted to pixels): 16, 24, 32
 * - Custom strings with units: '2rem', '1.5em', '40px'
 */
export const NumericSpacingExample = () => {
  return (
    <div className="space-y-12 mb-16">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          Stack with Numeric Spacing
        </h3>

        {/* Token-based spacing */}
        <Card variant="bordered" className="mb-6">
          <CardHeader>
            <CardTitle>Token Spacing (md)</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack spacing="md">
              <Badge variant="primary">Item 1 - md spacing</Badge>
              <Badge variant="secondary">Item 2</Badge>
              <Badge variant="accent">Item 3</Badge>
            </Stack>
          </CardContent>
        </Card>

        {/* Numeric spacing */}
        <Card variant="bordered" className="mb-6">
          <CardHeader>
            <CardTitle>Numeric Spacing (20px)</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack spacing={20}>
              <Badge variant="primary">Item 1 - 20px spacing</Badge>
              <Badge variant="secondary">Item 2</Badge>
              <Badge variant="accent">Item 3</Badge>
            </Stack>
          </CardContent>
        </Card>

        {/* Custom string spacing */}
        <Card variant="glass" className="mb-6">
          <CardHeader>
            <CardTitle>Custom String Spacing (2rem)</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack spacing="2rem">
              <Badge variant="success">Item 1 - 2rem spacing</Badge>
              <Badge variant="warning">Item 2</Badge>
              <Badge variant="error">Item 3</Badge>
            </Stack>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          Grid with Numeric Gap
        </h3>

        {/* Token-based gap */}
        <Card variant="bordered" className="mb-6">
          <CardHeader>
            <CardTitle>Token Gap (lg)</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid cols={3} gap="lg">
              <Badge variant="primary">Item 1</Badge>
              <Badge variant="secondary">Item 2</Badge>
              <Badge variant="accent">Item 3</Badge>
            </Grid>
          </CardContent>
        </Card>

        {/* Numeric gap */}
        <Card variant="bordered" className="mb-6">
          <CardHeader>
            <CardTitle>Numeric Gap (24px)</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid cols={3} gap={24}>
              <Badge variant="primary">Item 1</Badge>
              <Badge variant="secondary">Item 2</Badge>
              <Badge variant="accent">Item 3</Badge>
            </Grid>
          </CardContent>
        </Card>

        {/* Custom string gap */}
        <Card variant="glass" className="mb-6">
          <CardHeader>
            <CardTitle>Custom String Gap (1.5rem)</CardTitle>
          </CardHeader>
          <CardContent>
            <Grid cols={3} gap="1.5rem">
              <Badge variant="success">Item 1</Badge>
              <Badge variant="warning">Item 2</Badge>
              <Badge variant="error">Item 3</Badge>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          Paper with Numeric Padding
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Token-based padding */}
          <Paper padding="lg" variant="outlined">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Token Padding (lg)</h4>
              <p className="text-sm text-muted-foreground">
                Predefined token spacing
              </p>
            </div>
          </Paper>

          {/* Numeric padding */}
          <Paper padding={32} variant="outlined">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Numeric Padding (32px)</h4>
              <p className="text-sm text-muted-foreground">
                Direct pixel value
              </p>
            </div>
          </Paper>

          {/* Custom string padding */}
          <Paper padding="2.5rem" variant="outlined">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Custom Padding (2.5rem)</h4>
              <p className="text-sm text-muted-foreground">Custom unit value</p>
            </div>
          </Paper>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          Separator with Numeric Spacing
        </h3>

        <Card variant="bordered">
          <CardContent>
            <div>
              <p>Content above</p>
              <Separator spacing="md" label="Token (md)" />
              <p>Content middle</p>
              <Separator spacing={32} label="Numeric (32px)" />
              <p>Content middle</p>
              <Separator spacing="2rem" label="Custom (2rem)" />
              <p>Content below</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          Comparison: All Spacing Types
        </h3>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Horizontal Stack Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Token spacing examples */}
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                Tokens: xs, sm, md, lg, xl
              </p>
              <Stack direction="horizontal" spacing="xs" wrap>
                <Badge size="sm">xs</Badge>
                <Badge size="sm">gap</Badge>
                <Badge size="sm">spacing</Badge>
              </Stack>
            </div>

            {/* Numeric spacing examples */}
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                Numbers: 8, 16, 24, 32
              </p>
              <Stack direction="horizontal" spacing={16} wrap>
                <Badge size="sm">16px</Badge>
                <Badge size="sm">gap</Badge>
                <Badge size="sm">spacing</Badge>
              </Stack>
            </div>

            {/* Custom string spacing examples */}
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                Custom: 1rem, 1.5rem, 2rem
              </p>
              <Stack direction="horizontal" spacing="1rem" wrap>
                <Badge size="sm">1rem</Badge>
                <Badge size="sm">gap</Badge>
                <Badge size="sm">spacing</Badge>
              </Stack>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          ToggleGroup with Numeric Spacing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Token (spacing=1)</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup type="single" spacing={1}>
                <Toggle value="left">Left</Toggle>
                <Toggle value="center">Center</Toggle>
                <Toggle value="right">Right</Toggle>
              </ToggleGroup>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Numeric (16px)</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup type="single" spacing={16}>
                <Toggle value="bold">B</Toggle>
                <Toggle value="italic">I</Toggle>
                <Toggle value="underline">U</Toggle>
              </ToggleGroup>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Custom (1rem)</CardTitle>
            </CardHeader>
            <CardContent>
              <ToggleGroup type="single" spacing="1rem">
                <Toggle value="a">A</Toggle>
                <Toggle value="b">B</Toggle>
                <Toggle value="c">C</Toggle>
              </ToggleGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          TagGroup with Numeric Spacing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Token (sm)</CardTitle>
            </CardHeader>
            <CardContent>
              <TagGroup spacing="sm">
                <Tag>React</Tag>
                <Tag>TypeScript</Tag>
                <Tag>Tailwind</Tag>
              </TagGroup>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Numeric (20px)</CardTitle>
            </CardHeader>
            <CardContent>
              <TagGroup spacing={20}>
                <Tag>Next.js</Tag>
                <Tag>Vite</Tag>
                <Tag>Node</Tag>
              </TagGroup>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Custom (1.5rem)</CardTitle>
            </CardHeader>
            <CardContent>
              <TagGroup spacing="1.5rem">
                <Tag>HTML</Tag>
                <Tag>CSS</Tag>
                <Tag>JS</Tag>
              </TagGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          Skeleton with Numeric Spacing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Token (normal)</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton
                variant="pulse"
                shape="text"
                count={3}
                spacing="normal"
              />
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Numeric (24px)</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton variant="wave" shape="text" count={3} spacing={24} />
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Custom (2rem)</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton
                variant="shimmer"
                shape="text"
                count={3}
                spacing="2rem"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6 text-text">
          LabelGroup with Numeric Spacing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Token (md)</CardTitle>
            </CardHeader>
            <CardContent>
              <LabelGroup spacing="md">
                <Label>First Name</Label>
                <Label>Last Name</Label>
                <Label>Email</Label>
              </LabelGroup>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Numeric (32px)</CardTitle>
            </CardHeader>
            <CardContent>
              <LabelGroup spacing={32}>
                <Label>Username</Label>
                <Label>Password</Label>
                <Label>Confirm</Label>
              </LabelGroup>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Custom (2.5rem)</CardTitle>
            </CardHeader>
            <CardContent>
              <LabelGroup spacing="2.5rem">
                <Label>Address</Label>
                <Label>City</Label>
                <Label>Zip</Label>
              </LabelGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NumericSpacingExample;
