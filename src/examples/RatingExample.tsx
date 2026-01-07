import { useState } from "react";
import { Rating } from "../components/Rating";
import {
  Banana,
  Carrot,
  Candy,
  Swords,
  Crown,
  Flame,
  Sparkles,
  PlusCircle,
  Zap,
} from "lucide-react";
// Uncomment if using Iconify
// import { Icon } from "@iconify/react";

export const RatingExample = () => {
  const [interactiveRating, setInteractiveRating] = useState(0);
  const [halfRating, setHalfRating] = useState(0);
  const [reviewRatings, setReviewRatings] = useState({
    overall: 0,
    quality: 0,
    value: 0,
    recommend: 0,
  });

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-6 text-text">Rating Component</h3>

      {/* ============================================ */}
      {/* BASIC RATINGS */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Basic Ratings</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Default:</span>
            <Rating value={4} />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              With Value:
            </span>
            <Rating value={4.5} precision="half" showValue />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              With Count:
            </span>
            <Rating value={4.3} precision="half" showValue count={128} />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* SIZES */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">All Sizes</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">xs:</span>
            <Rating value={4} size="xs" colorScheme="yellow" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">sm:</span>
            <Rating value={4} size="sm" colorScheme="amber" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">md:</span>
            <Rating value={4} size="md" colorScheme="orange" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">lg:</span>
            <Rating value={4} size="lg" colorScheme="red" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">xl:</span>
            <Rating value={4} size="xl" colorScheme="rose" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">2xl:</span>
            <Rating value={4} size="2xl" colorScheme="pink" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">3xl:</span>
            <Rating value={4} size="3xl" colorScheme="purple" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-sm text-muted-foreground">4xl:</span>
            <Rating value={4} size="4xl" colorScheme="blue" />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* VARIANTS */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Variants</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Default:</span>
            <Rating value={4} variant="default" size="lg" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Primary:</span>
            <Rating value={4} variant="primary" size="lg" colorScheme="blue" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Secondary:
            </span>
            <Rating
              value={4}
              variant="secondary"
              size="lg"
              colorScheme="purple"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Gradient:
            </span>
            <Rating
              value={4}
              variant="gradient"
              size="lg"
              colorScheme="rainbow"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Glass:</span>
            <Rating value={4} variant="glass" size="lg" colorScheme="sky" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Outline:</span>
            <Rating value={4} variant="outline" size="lg" colorScheme="slate" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">Soft:</span>
            <Rating value={4} variant="soft" size="lg" colorScheme="emerald" />
          </div>
        </div>

        {/* Neon Variant - Dark Background */}
        <div className="mt-6 bg-slate-900 p-6 rounded-lg">
          <h5 className="text-white font-medium mb-4">Neon Variant</h5>
          <div className="flex flex-wrap gap-6">
            <Rating value={4} variant="neon" size="lg" colorScheme="cyan" />
            <Rating value={4} variant="neon" size="lg" colorScheme="pink" />
            <Rating value={4} variant="neon" size="lg" colorScheme="green" />
            <Rating value={4} variant="neon" size="lg" colorScheme="purple" />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PREDEFINED COLOR SCHEMES (25+) */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Predefined Color Schemes (25+)
        </h4>

        {/* Warm Colors */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-orange-600 mb-3">
            Warm Colors
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="yellow" />
              <span className="text-xs text-muted-foreground">yellow</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="amber" />
              <span className="text-xs text-muted-foreground">amber</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="orange" />
              <span className="text-xs text-muted-foreground">orange</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="red" />
              <span className="text-xs text-muted-foreground">red</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="rose" />
              <span className="text-xs text-muted-foreground">rose</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="pink" />
              <span className="text-xs text-muted-foreground">pink</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="fuchsia" />
              <span className="text-xs text-muted-foreground">fuchsia</span>
            </div>
          </div>
        </div>

        {/* Cool Colors */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-blue-600 mb-3">
            Cool Colors
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="purple" />
              <span className="text-xs text-muted-foreground">purple</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="violet" />
              <span className="text-xs text-muted-foreground">violet</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="indigo" />
              <span className="text-xs text-muted-foreground">indigo</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="blue" />
              <span className="text-xs text-muted-foreground">blue</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="sky" />
              <span className="text-xs text-muted-foreground">sky</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="cyan" />
              <span className="text-xs text-muted-foreground">cyan</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="teal" />
              <span className="text-xs text-muted-foreground">teal</span>
            </div>
          </div>
        </div>

        {/* Nature & Special Colors */}
        <div className="mb-6">
          <h5 className="text-sm font-medium text-green-600 mb-3">
            Nature & Special Colors
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="green" />
              <span className="text-xs text-muted-foreground">green</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="emerald" />
              <span className="text-xs text-muted-foreground">emerald</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="lime" />
              <span className="text-xs text-muted-foreground">lime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="gold" />
              <span className="text-xs text-muted-foreground">gold</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="silver" />
              <span className="text-xs text-muted-foreground">silver</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="bronze" />
              <span className="text-xs text-muted-foreground">bronze</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} colorScheme="rainbow" />
              <span className="text-xs text-muted-foreground">rainbow</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* CUSTOM COLORS */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Custom Colors (color & emptyColor)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg space-y-4">
            <h5 className="font-medium">HEX Colors</h5>
            <div className="flex items-center gap-3">
              <Rating
                value={4}
                color="#ff6b6b"
                emptyColor="#ffe3e3"
                size="lg"
              />
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #ff6b6b / #ffe3e3
              </code>
            </div>
            <div className="flex items-center gap-3">
              <Rating
                value={4}
                color="#845ef7"
                emptyColor="#e5dbff"
                size="lg"
              />
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #845ef7 / #e5dbff
              </code>
            </div>
            <div className="flex items-center gap-3">
              <Rating
                value={4}
                color="#20c997"
                emptyColor="#c3fae8"
                size="lg"
              />
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #20c997 / #c3fae8
              </code>
            </div>
          </div>

          <div className="p-4 border rounded-lg space-y-4">
            <h5 className="font-medium">RGB & Named Colors</h5>
            <div className="flex items-center gap-3">
              <Rating
                value={4}
                color="rgb(255, 107, 107)"
                emptyColor="rgb(255, 227, 227)"
                size="lg"
              />
              <code className="text-xs bg-muted px-2 py-1 rounded">RGB</code>
            </div>
            <div className="flex items-center gap-3">
              <Rating
                value={4}
                color="crimson"
                emptyColor="mistyrose"
                size="lg"
              />
              <code className="text-xs bg-muted px-2 py-1 rounded">Named</code>
            </div>
            <div className="flex items-center gap-3">
              <Rating
                value={4}
                color="hsl(259, 90%, 67%)"
                emptyColor="hsl(259, 100%, 93%)"
                size="lg"
              />
              <code className="text-xs bg-muted px-2 py-1 rounded">HSL</code>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PREDEFINED ICONS (80+) */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Predefined Icons (80+)
        </h4>

        {/* Basic Shapes */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Shapes</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="star" colorScheme="yellow" />
              <span className="text-xs text-muted-foreground">star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="heart" colorScheme="rose" />
              <span className="text-xs text-muted-foreground">heart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="circle" colorScheme="blue" />
              <span className="text-xs text-muted-foreground">circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="square" colorScheme="green" />
              <span className="text-xs text-muted-foreground">square</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="diamond" colorScheme="purple" />
              <span className="text-xs text-muted-foreground">diamond</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="triangle" colorScheme="orange" />
              <span className="text-xs text-muted-foreground">triangle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="hexagon" colorScheme="cyan" />
              <span className="text-xs text-muted-foreground">hexagon</span>
            </div>
          </div>
        </div>

        {/* Emotions */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Emotions & Expressions</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="smile" colorScheme="green" />
              <span className="text-xs text-muted-foreground">smile</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="frown" colorScheme="red" />
              <span className="text-xs text-muted-foreground">frown</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="meh" colorScheme="yellow" />
              <span className="text-xs text-muted-foreground">meh</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="laugh" colorScheme="cyan" />
              <span className="text-xs text-muted-foreground">laugh</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="thumbsUp" colorScheme="blue" />
              <span className="text-xs text-muted-foreground">thumbsUp</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="thumbsDown" colorScheme="gray" />
              <span className="text-xs text-muted-foreground">thumbsDown</span>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Awards & Achievements</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="award" colorScheme="gold" />
              <span className="text-xs text-muted-foreground">award</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="trophy" colorScheme="amber" />
              <span className="text-xs text-muted-foreground">trophy</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="medal" colorScheme="orange" />
              <span className="text-xs text-muted-foreground">medal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="crown" colorScheme="yellow" />
              <span className="text-xs text-muted-foreground">crown</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="gem" colorScheme="purple" />
              <span className="text-xs text-muted-foreground">gem</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="badge" colorScheme="emerald" />
              <span className="text-xs text-muted-foreground">badge</span>
            </div>
          </div>
        </div>

        {/* Nature */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Nature & Weather</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="sun" colorScheme="yellow" />
              <span className="text-xs text-muted-foreground">sun</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="moon" colorScheme="indigo" />
              <span className="text-xs text-muted-foreground">moon</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="flame" colorScheme="orange" />
              <span className="text-xs text-muted-foreground">flame</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="droplet" colorScheme="blue" />
              <span className="text-xs text-muted-foreground">droplet</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="snowflake" colorScheme="cyan" />
              <span className="text-xs text-muted-foreground">snowflake</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="leaf" colorScheme="green" />
              <span className="text-xs text-muted-foreground">leaf</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="flower" colorScheme="pink" />
              <span className="text-xs text-muted-foreground">flower</span>
            </div>
          </div>
        </div>

        {/* Energy */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Energy & Power</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="zap" colorScheme="yellow" />
              <span className="text-xs text-muted-foreground">zap</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="sparkle" colorScheme="pink" />
              <span className="text-xs text-muted-foreground">sparkle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="sparkles" colorScheme="purple" />
              <span className="text-xs text-muted-foreground">sparkles</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="rocket" colorScheme="red" />
              <span className="text-xs text-muted-foreground">rocket</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="target" colorScheme="red" />
              <span className="text-xs text-muted-foreground">target</span>
            </div>
          </div>
        </div>

        {/* Food */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Food & Drinks</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="coffee" colorScheme="amber" />
              <span className="text-xs text-muted-foreground">coffee</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="pizza" colorScheme="orange" />
              <span className="text-xs text-muted-foreground">pizza</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="cake" colorScheme="pink" />
              <span className="text-xs text-muted-foreground">cake</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="apple" colorScheme="red" />
              <span className="text-xs text-muted-foreground">apple</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="cherry" colorScheme="rose" />
              <span className="text-xs text-muted-foreground">cherry</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="beer" colorScheme="amber" />
              <span className="text-xs text-muted-foreground">beer</span>
            </div>
          </div>
        </div>

        {/* Animals */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Animals</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="cat" colorScheme="orange" />
              <span className="text-xs text-muted-foreground">cat</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="dog" colorScheme="amber" />
              <span className="text-xs text-muted-foreground">dog</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="bird" colorScheme="sky" />
              <span className="text-xs text-muted-foreground">bird</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="fish" colorScheme="cyan" />
              <span className="text-xs text-muted-foreground">fish</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="rabbit" colorScheme="pink" />
              <span className="text-xs text-muted-foreground">rabbit</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="pawPrint" colorScheme="stone" />
              <span className="text-xs text-muted-foreground">pawPrint</span>
            </div>
          </div>
        </div>

        {/* Entertainment */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Entertainment</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="music" colorScheme="purple" />
              <span className="text-xs text-muted-foreground">music</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="headphones" colorScheme="indigo" />
              <span className="text-xs text-muted-foreground">headphones</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="gamepad" colorScheme="green" />
              <span className="text-xs text-muted-foreground">gamepad</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="dice" colorScheme="red" />
              <span className="text-xs text-muted-foreground">dice</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="palette" colorScheme="pink" />
              <span className="text-xs text-muted-foreground">palette</span>
            </div>
          </div>
        </div>

        {/* Currency */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Currency (Price Rating)</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={2} max={4} icon="dollarSign" colorScheme="green" />
              <span className="text-xs text-muted-foreground">dollarSign</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={3} max={4} icon="euro" colorScheme="blue" />
              <span className="text-xs text-muted-foreground">euro</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} max={5} icon="bitcoin" colorScheme="orange" />
              <span className="text-xs text-muted-foreground">bitcoin</span>
            </div>
          </div>
        </div>

        {/* Misc */}
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Miscellaneous</h5>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="ghost" colorScheme="purple" />
              <span className="text-xs text-muted-foreground">ghost</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="skull" colorScheme="gray" />
              <span className="text-xs text-muted-foreground">skull</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="anchor" colorScheme="blue" />
              <span className="text-xs text-muted-foreground">anchor</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="plane" colorScheme="sky" />
              <span className="text-xs text-muted-foreground">plane</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="home" colorScheme="stone" />
              <span className="text-xs text-muted-foreground">home</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Rating value={4} icon="infinity" colorScheme="indigo" />
              <span className="text-xs text-muted-foreground">infinity</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* CUSTOM LUCIDE ICONS */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Custom Lucide Icons
        </h4>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={PlusCircle}
              color="#34B9BE"
              emptyColor="#E6E6E6"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">PlusCircle</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={Banana}
              color="#fbbf24"
              emptyColor="#fef3c7"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">Banana</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={Carrot}
              color="#f97316"
              emptyColor="#ffedd5"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">Carrot</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={Candy}
              color="#ec4899"
              emptyColor="#fce7f3"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">Candy</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={Swords}
              color="#6b7280"
              emptyColor="#e5e7eb"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">Swords</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating value={4} customIcon={Crown} colorScheme="gold" size="lg" />
            <span className="text-xs text-muted-foreground">Crown</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={Flame}
              colorScheme="orange"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">Flame</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={Sparkles}
              colorScheme="purple"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">Sparkles</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating value={4} customIcon={Zap} colorScheme="yellow" size="lg" />
            <span className="text-xs text-muted-foreground">Zap</span>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* ICONIFY ICONS (UNCOMMENT IF USING) */}
      {/* ============================================ */}
      {/* 
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Iconify Icons
        </h4>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={<Icon icon="mdi:star" />}
              color="#eab308"
              emptyColor="#fef9c3"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">mdi:star</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={<Icon icon="mdi:fire" />}
              color="#ef4444"
              emptyColor="#fee2e2"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">mdi:fire</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Rating
              value={4}
              customIcon={<Icon icon="noto:star" />}
              colorScheme="yellow"
              size="lg"
            />
            <span className="text-xs text-muted-foreground">noto:star</span>
          </div>
        </div>
      </div>
      */}

      {/* ============================================ */}
      {/* ICONS WITH CUSTOM COLORS */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Icons with Custom Colors
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg space-y-4">
            <h5 className="font-medium">Heart Icon Variations</h5>
            <Rating
              value={4}
              icon="heart"
              color="#ff6b6b"
              emptyColor="#ffe3e3"
              size="lg"
            />
            <Rating
              value={4}
              icon="heart"
              color="#845ef7"
              emptyColor="#e5dbff"
              size="lg"
            />
            <Rating
              value={4}
              icon="heart"
              color="#20c997"
              emptyColor="#c3fae8"
              size="lg"
            />
          </div>

          <div className="p-4 border rounded-lg space-y-4">
            <h5 className="font-medium">Crown Icon Variations</h5>
            <Rating
              value={4}
              icon="crown"
              color="#fbbf24"
              emptyColor="#fef3c7"
              size="lg"
            />
            <Rating
              value={4}
              icon="crown"
              color="#c0c0c0"
              emptyColor="#f0f0f0"
              size="lg"
            />
            <Rating
              value={4}
              icon="crown"
              color="#cd7f32"
              emptyColor="#f5deb3"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* HALF PRECISION */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Half Star Precision
        </h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              4.5 stars:
            </span>
            <Rating
              value={4.5}
              precision="half"
              showValue
              size="lg"
              colorScheme="yellow"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              3.5 stars:
            </span>
            <Rating
              value={3.5}
              precision="half"
              showValue
              size="lg"
              colorScheme="orange"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              2.5 stars:
            </span>
            <Rating
              value={2.5}
              precision="half"
              showValue
              size="lg"
              colorScheme="red"
            />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* DIRECTION & GAP */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Direction & Gap
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-4">Horizontal (default)</h5>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">
                  none:
                </span>
                <Rating value={4} direction="horizontal" gap="none" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">xs:</span>
                <Rating value={4} direction="horizontal" gap="xs" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">sm:</span>
                <Rating value={4} direction="horizontal" gap="sm" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">md:</span>
                <Rating value={4} direction="horizontal" gap="md" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">lg:</span>
                <Rating value={4} direction="horizontal" gap="lg" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">xl:</span>
                <Rating value={4} direction="horizontal" gap="xl" />
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-4">Vertical</h5>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <Rating
                  value={3}
                  direction="vertical"
                  colorScheme="blue"
                  size="lg"
                />
                <span className="text-xs text-muted-foreground mt-2">
                  Vertical
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Rating
                  value={4}
                  direction="vertical"
                  gap="lg"
                  colorScheme="rose"
                  icon="heart"
                  size="lg"
                />
                <span className="text-xs text-muted-foreground mt-2">
                  Large Gap
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* INTERACTIVE */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Interactive Rating
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          Click to rate, hover to preview
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Full Stars:
            </span>
            <Rating
              value={interactiveRating}
              precision="full"
              onChange={setInteractiveRating}
              size="lg"
              colorScheme="yellow"
              showValue
              highlightOnHover
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Half Stars:
            </span>
            <Rating
              value={halfRating}
              precision="half"
              onChange={setHalfRating}
              showValue
              size="lg"
              colorScheme="gold"
              highlightOnHover
            />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* READ ONLY */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Read Only</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Product Rating:
            </span>
            <Rating
              value={4.7}
              precision="half"
              readOnly
              showValue
              count={2541}
              colorScheme="yellow"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              User Review:
            </span>
            <Rating
              value={5}
              readOnly
              showValue
              countLabel="votes"
              count={89}
              colorScheme="gold"
            />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* DISABLED */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Disabled State</h4>
        <div className="flex items-center gap-4">
          <Rating value={3} disabled size="lg" colorScheme="gray" />
        </div>
      </div>

      {/* ============================================ */}
      {/* CUSTOM MAX */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">Custom Maximum</h4>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Out of 10:
            </span>
            <Rating value={7} max={10} showValue size="lg" colorScheme="blue" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Out of 3:
            </span>
            <Rating
              value={2}
              max={3}
              showValue
              size="lg"
              icon="heart"
              colorScheme="rose"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-32 text-sm text-muted-foreground">
              Price Level:
            </span>
            <Rating
              value={2}
              max={4}
              icon="dollarSign"
              colorScheme="green"
              size="lg"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* REAL-WORLD EXAMPLES */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Real-World Examples
        </h4>

        {/* Product Card */}
        <div className="bg-background/50 border border-border rounded-lg p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h5 className="font-semibold text-lg mb-1">
                Wireless Headphones
              </h5>
              <p className="text-sm text-muted-foreground mb-2">
                Premium noise-canceling headphones
              </p>
              <Rating
                value={4.6}
                precision="half"
                showValue
                count={1284}
                readOnly
                colorScheme="yellow"
              />
            </div>
            <span className="text-2xl font-bold text-primary">$199</span>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <h5 className="font-semibold text-lg mb-4">Write a Review</h5>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Rating</span>
              <Rating
                value={reviewRatings.overall}
                onChange={(value) =>
                  setReviewRatings((prev) => ({ ...prev, overall: value }))
                }
                size="lg"
                colorScheme="gold"
                highlightOnHover
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Quality</span>
              <Rating
                value={reviewRatings.quality}
                onChange={(value) =>
                  setReviewRatings((prev) => ({ ...prev, quality: value }))
                }
                size="md"
                colorScheme="yellow"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Value for Money</span>
              <Rating
                value={reviewRatings.value}
                onChange={(value) =>
                  setReviewRatings((prev) => ({ ...prev, value: value }))
                }
                size="md"
                colorScheme="green"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Would Recommend</span>
              <Rating
                value={reviewRatings.recommend}
                icon="heart"
                onChange={(value) =>
                  setReviewRatings((prev) => ({ ...prev, recommend: value }))
                }
                size="md"
                colorScheme="rose"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* COMPLETE SHOWCASE */}
      {/* ============================================ */}
      <div className="mb-12">
        <h4 className="text-lg font-semibold mb-4 text-text">
          Complete Showcase
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Rating */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Product Rating</h5>
            <Rating
              value={4.5}
              precision="half"
              colorScheme="yellow"
              showValue
              count={1234}
            />
          </div>

          {/* App Rating */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">App Rating</h5>
            <Rating
              value={4}
              icon="heart"
              colorScheme="rose"
              size="lg"
              showValue
            />
          </div>

          {/* Price Level */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Price Level</h5>
            <Rating
              value={2}
              max={4}
              icon="dollarSign"
              colorScheme="green"
              readOnly
            />
          </div>

          {/* Difficulty */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Difficulty</h5>
            <Rating value={3} icon="flame" colorScheme="orange" size="lg" />
          </div>

          {/* Achievement Stars */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Achievement Stars</h5>
            <Rating
              value={3}
              max={3}
              icon="sparkles"
              colorScheme="gold"
              size="xl"
            />
          </div>

          {/* Satisfaction */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Satisfaction</h5>
            <Rating value={4} icon="smile" colorScheme="green" size="lg" />
          </div>

          {/* Custom Icon Example */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Custom Icon</h5>
            <Rating
              value={4}
              customIcon={PlusCircle}
              color="#34B9BE"
              emptyColor="#E6E6E6"
              size="2xl"
            />
          </div>

          {/* Neon Example */}
          <div className="p-4 border rounded-lg bg-slate-900">
            <h5 className="font-medium mb-2 text-white">Neon Style</h5>
            <Rating
              value={4}
              variant="neon"
              icon="zap"
              colorScheme="cyan"
              size="lg"
            />
          </div>

          {/* Rainbow Example */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-2">Rainbow</h5>
            <Rating
              value={4}
              colorScheme="rainbow"
              variant="gradient"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
