"use client";

import { useState } from "react";
import { ColorPicker } from "../components/ColorPicker";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";

export default function ColorPickerExample() {
  const [color1, setColor1] = useState("#1890ff");
  const [color2, setColor2] = useState("#52c41a");
  const [color3, setColor3] = useState("#f5222d");
  const [color4, setColor4] = useState("#722ed1");
  const [color5, setColor5] = useState("#fa8c16");
  const [themeColor, setThemeColor] = useState("#2563eb");

  const customPresets = [
    { color: "#FF6B6B", label: "Coral Red" },
    { color: "#4ECDC4", label: "Turquoise" },
    { color: "#45B7D1", label: "Sky Blue" },
    { color: "#FFA07A", label: "Light Salmon" },
    { color: "#98D8C8", label: "Mint" },
    { color: "#F7DC6F", label: "Banana" },
    { color: "#BB8FCE", label: "Lavender" },
    { color: "#85C1E2", label: "Baby Blue" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">ColorPicker</h2>
        <p className="text-muted-foreground mb-6">
          A color picker component with preset colors and hex input. Perfect for
          theme customization and design tools.
        </p>
      </div>

      {/* Basic Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Color Picker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Color</label>
              <ColorPicker value={color1} onChange={setColor1} />
              <p className="text-xs text-muted-foreground">
                Selected: {color1}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Success Color</label>
              <ColorPicker value={color2} onChange={setColor2} />
              <p className="text-xs text-muted-foreground">
                Selected: {color2}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Danger Color</label>
              <ColorPicker value={color3} onChange={setColor3} />
              <p className="text-xs text-muted-foreground">
                Selected: {color3}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2">
              <label className="text-sm font-medium">Small</label>
              <ColorPicker value={color1} onChange={setColor1} size="sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Medium (Default)</label>
              <ColorPicker value={color2} onChange={setColor2} size="md" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Large</label>
              <ColorPicker value={color3} onChange={setColor3} size="lg" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* With Custom Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Choose from custom palette
            </label>
            <ColorPicker
              value={color4}
              onChange={setColor4}
              presets={customPresets}
              size="lg"
            />
            <p className="text-xs text-muted-foreground">Selected: {color4}</p>
          </div>
        </CardContent>
      </Card>

      {/* Allow Clear */}
      <Card>
        <CardHeader>
          <CardTitle>With Clear Button</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Clearable Color Picker
            </label>
            <ColorPicker
              value={color5}
              onChange={setColor5}
              allowClear
              size="lg"
            />
            <p className="text-xs text-muted-foreground">
              Selected: {color5 || "None"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disabled State */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <ColorPicker value="#cccccc" onChange={() => {}} disabled />
            <ColorPicker
              value="#999999"
              onChange={() => {}}
              disabled
              size="lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Placement */}
      <Card>
        <CardHeader>
          <CardTitle>Popover Placement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Bottom Start (Default)
              </label>
              <ColorPicker
                value={color1}
                onChange={setColor1}
                placement="bottom-start"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Top Start</label>
              <ColorPicker
                value={color2}
                onChange={setColor2}
                placement="top-start"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bottom End</label>
              <ColorPicker
                value={color3}
                onChange={setColor3}
                placement="bottom-end"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Without Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Without Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Manual Color Input Only
            </label>
            <ColorPicker
              value={color4}
              onChange={setColor4}
              showPresets={false}
              size="lg"
            />
            <p className="text-xs text-muted-foreground">Selected: {color4}</p>
          </div>
        </CardContent>
      </Card>

      {/* Practical Example - Theme Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Example: Theme Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Color</label>
                <ColorPicker value={themeColor} onChange={setThemeColor} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Secondary Color</label>
                <ColorPicker value={color2} onChange={setColor2} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Success Color</label>
                <ColorPicker value="#52c41a" onChange={() => {}} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Warning Color</label>
                <ColorPicker value="#faad14" onChange={() => {}} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Error Color</label>
                <ColorPicker value={color3} onChange={setColor3} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Info Color</label>
                <ColorPicker value={color1} onChange={setColor1} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-3">Preview</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  style={{
                    backgroundColor: themeColor,
                    borderColor: themeColor,
                  }}
                  className="text-white"
                >
                  Primary Button
                </Button>
                <Button
                  style={{ backgroundColor: color2, borderColor: color2 }}
                  className="text-white"
                >
                  Secondary Button
                </Button>
                <Badge
                  style={{
                    backgroundColor: themeColor,
                    borderColor: themeColor,
                  }}
                  className="text-white"
                >
                  Primary Badge
                </Badge>
                <Badge
                  style={{ backgroundColor: color3, borderColor: color3 }}
                  className="text-white"
                >
                  Error Badge
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`import { ColorPicker } from 'saha-ui';

// Basic usage
const [color, setColor] = useState('#1890ff');

<ColorPicker value={color} onChange={setColor} />

// With custom presets
const customPresets = [
  { color: '#FF6B6B', label: 'Coral Red' },
  { color: '#4ECDC4', label: 'Turquoise' },
];

<ColorPicker
  value={color}
  onChange={setColor}
  presets={customPresets}
/>

// With clear button
<ColorPicker
  value={color}
  onChange={setColor}
  allowClear
  size="lg"
/>

// Without presets
<ColorPicker
  value={color}
  onChange={setColor}
  showPresets={false}
/>`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export { ColorPickerExample };
