import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "../index";
import { Sparkles, Zap, Star, Heart } from "lucide-react";

export const CardExample = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Card Variants</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card variant="default" hoverable>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>A standard card with shadow</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              This is a default card with a clean, modern design.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">
              Learn More
            </Button>
          </CardFooter>
        </Card>

        <Card variant="glass" hoverable>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={24} />
              <CardTitle>Glass Card</CardTitle>
            </div>
            <CardDescription>Beautiful glassmorphism effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              Features a modern glass effect with backdrop blur.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="glass" size="sm">
              Explore
            </Button>
          </CardFooter>
        </Card>

        <Card variant="glass-strong" hoverable>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="text-accent" size={24} />
              <CardTitle>Strong Glass</CardTitle>
            </div>
            <CardDescription>Enhanced glass effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              A stronger glass effect with more blur.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="accent" size="sm">
              <Star size={16} />
              View
            </Button>
          </CardFooter>
        </Card>

        <Card variant="glass-subtle" hoverable>
          <CardHeader>
            <CardTitle>Subtle Glass</CardTitle>
            <CardDescription>Lighter glass effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              A more subtle glass effect for delicate designs.
            </p>
          </CardContent>
        </Card>

        <Card variant="bordered" hoverable>
          <CardHeader>
            <CardTitle>Bordered Card</CardTitle>
            <CardDescription>Card with border accent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              Clean bordered design for a different look.
            </p>
          </CardContent>
        </Card>

        <Card variant="default" padding="xl" hoverable>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="text-error" size={24} />
              <CardTitle>Extra Padding</CardTitle>
            </div>
            <CardDescription>More spacious layout</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              This card has extra padding for a more spacious feel.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
