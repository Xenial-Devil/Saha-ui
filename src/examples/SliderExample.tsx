import { useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "../components/Slider/index";

export const SliderExample = () => {
  const [simpleValue, setSimpleValue] = useState(50);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [temperatureValue, setTemperatureValue] = useState(22);
  const [volumeValue, setVolumeValue] = useState(75);
  const [brightnessValue, setBrightnessValue] = useState(60);
  const [verticalValue, setVerticalValue] = useState(50);

  return (
    <div className="space-y-12 p-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Slider Component</h1>
        <p className="text-muted-foreground">
          Interactive slider with range support, marks, and composable API
        </p>
      </div>

      {/* Basic Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Basic Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Default</h3>
            <Slider
              defaultValue={30}
              label="Volume"
              helperText="Adjust the volume level"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Value Display</h3>
            <Slider
              value={simpleValue}
              onChange={(val) => setSimpleValue(val as number)}
              label="Brightness"
              showValue
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Tooltip</h3>
            <Slider
              defaultValue={50}
              label="Quality"
              showTooltip
              tooltipFormat={(val) => `${val}%`}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Error</h3>
            <Slider
              defaultValue={90}
              label="Disk Usage"
              error="Storage almost full"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Disabled</h3>
            <Slider
              defaultValue={50}
              label="Locked Setting"
              disabled
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Required</h3>
            <Slider
              defaultValue={0}
              label="Rating"
              required
              helperText="Please provide a rating"
            />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Sizes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Small</h3>
            <Slider size="sm" defaultValue={30} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Medium (Default)</h3>
            <Slider size="md" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Large</h3>
            <Slider size="lg" defaultValue={70} />
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Variants</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Default</h3>
            <Slider variant="default" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Primary</h3>
            <Slider variant="primary" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Secondary</h3>
            <Slider variant="secondary" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Accent</h3>
            <Slider variant="accent" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Success</h3>
            <Slider variant="success" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Warning</h3>
            <Slider variant="warning" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Error</h3>
            <Slider variant="error" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Ghost</h3>
            <Slider variant="ghost" defaultValue={50} />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Glass</h3>
            <Slider variant="glass" defaultValue={50} />
          </div>
        </div>
      </section>

      {/* Range Slider */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Range Slider</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <Slider
              value={rangeValue}
              onChange={(val) => setRangeValue(val as number[])}
              range
              min={0}
              max={100}
              label="Price Range ($)"
              showValue
              tooltipFormat={(val) => `$${val}`}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Time Range</h3>
            <Slider
              defaultValue={[9, 17]}
              range
              min={0}
              max={24}
              label="Working Hours"
              showValue
              showTooltip
              tooltipFormat={(val) => `${val}:00`}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Temperature Range</h3>
            <Slider
              defaultValue={[18, 24]}
              range
              min={10}
              max={30}
              label="Comfortable Temperature (°C)"
              variant="warning"
              showValue
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Age Range</h3>
            <Slider
              defaultValue={[25, 45]}
              range
              min={18}
              max={65}
              step={5}
              label="Target Age Group"
              variant="accent"
              showValue
            />
          </div>
        </div>
      </section>

      {/* Step & Marks */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Step & Marks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-3">With Step (10)</h3>
            <Slider
              defaultValue={50}
              step={10}
              min={0}
              max={100}
              label="Quality Setting"
              showValue
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">With Marks (Auto)</h3>
            <Slider
              defaultValue={50}
              marks
              step={25}
              min={0}
              max={100}
              label="Performance Level"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Custom Marks</h3>
            <Slider
              defaultValue={2}
              min={0}
              max={4}
              step={1}
              marks={[
                { value: 0, label: "Off" },
                { value: 1, label: "Low" },
                { value: 2, label: "Med" },
                { value: 3, label: "High" },
                { value: 4, label: "Max" },
              ]}
              label="Fan Speed"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Custom Marks with Range</h3>
            <Slider
              defaultValue={[1, 3]}
              range
              min={0}
              max={4}
              step={1}
              marks={[
                { value: 0, label: "XS" },
                { value: 1, label: "S" },
                { value: 2, label: "M" },
                { value: 3, label: "L" },
                { value: 4, label: "XL" },
              ]}
              label="Size Range"
              variant="primary"
            />
          </div>
        </div>
      </section>

      {/* Vertical Orientation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Vertical Orientation</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-3">Volume</h3>
            <Slider
              value={verticalValue}
              onChange={(val) => setVerticalValue(val as number)}
              orientation="vertical"
              variant="primary"
              showValue
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-3">Temperature</h3>
            <Slider
              defaultValue={22}
              orientation="vertical"
              min={10}
              max={30}
              variant="warning"
              showTooltip
              tooltipFormat={(val) => `${val}°C`}
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-3">With Marks</h3>
            <Slider
              defaultValue={50}
              orientation="vertical"
              marks
              step={25}
              variant="success"
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-3">Range</h3>
            <Slider
              defaultValue={[20, 80]}
              orientation="vertical"
              range
              variant="accent"
            />
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-world Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Temperature Control</h3>
            <Slider
              value={temperatureValue}
              onChange={(val) => setTemperatureValue(val as number)}
              min={16}
              max={30}
              step={0.5}
              label="Room Temperature"
              variant="warning"
              showValue
              showTooltip
              tooltipFormat={(val) => `${val}°C`}
              helperText="Adjust room temperature for optimal comfort"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              Current: <span className="font-semibold text-foreground">{temperatureValue}°C</span>
            </div>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Volume Control</h3>
            <Slider
              value={volumeValue}
              onChange={(val) => setVolumeValue(val as number)}
              min={0}
              max={100}
              label="Master Volume"
              variant="primary"
              showValue
              showTooltip
              tooltipFormat={(val) => `${val}%`}
              marks={[
                { value: 0, label: "🔇" },
                { value: 50, label: "🔉" },
                { value: 100, label: "🔊" },
              ]}
            />
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl">
                {volumeValue === 0 ? "🔇" : volumeValue < 50 ? "��" : "🔊"}
              </span>
              <span className="text-sm text-muted-foreground">
                {volumeValue}%
              </span>
            </div>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Brightness Control</h3>
            <Slider
              value={brightnessValue}
              onChange={(val) => setBrightnessValue(val as number)}
              min={0}
              max={100}
              label="Screen Brightness"
              variant="accent"
              showValue
              showTooltip
              tooltipFormat={(val) => `${val}%`}
            />
            <div
              className="mt-4 h-20 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${brightnessValue / 100})`,
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <div className="flex items-center justify-center h-full text-sm font-medium text-foreground">
                Preview
              </div>
            </div>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">File Size Filter</h3>
            <Slider
              defaultValue={[1, 50]}
              range
              min={0}
              max={100}
              step={1}
              label="File Size (MB)"
              variant="success"
              showValue
              showTooltip
              tooltipFormat={(val) => `${val} MB`}
              helperText="Filter files by size range"
            />
          </div>
        </div>
      </section>

      {/* Composable API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Composable API</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Basic Composable</h3>
            <Slider defaultValue={50} variant="primary">
              <label className="block mb-2 text-sm font-medium">
                Custom Slider
              </label>
              <SliderTrack>
                <SliderFilledTrack />
                <SliderThumb />
              </SliderTrack>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Built with composable components
              </p>
            </Slider>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Custom Styled</h3>
            <Slider defaultValue={[20, 80]} range variant="glass">
              <label className="block mb-2 text-sm font-medium">
                Glass Range
              </label>
              <SliderTrack className="bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <SliderFilledTrack className="bg-gradient-to-r from-purple-500 to-pink-500" />
                <SliderThumb index={0} />
                <SliderThumb index={1} />
              </SliderTrack>
            </Slider>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Advanced Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Keyboard Navigation</h3>
            <Slider
              defaultValue={50}
              label="Use Arrow Keys"
              variant="primary"
              showValue
              showTooltip
              helperText="Arrow keys: ±1, Page Up/Down: ±10, Home/End: Min/Max"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Custom Step</h3>
            <Slider
              defaultValue={0}
              min={-100}
              max={100}
              step={5}
              label="Balance"
              variant="accent"
              showValue
              showTooltip
              marks={[
                { value: -100, label: "L" },
                { value: 0, label: "C" },
                { value: 100, label: "R" },
              ]}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Decimal Values</h3>
            <Slider
              defaultValue={3.5}
              min={0}
              max={5}
              step={0.5}
              label="Rating"
              variant="warning"
              showValue
              showTooltip
              tooltipFormat={(val) => `⭐ ${val.toFixed(1)}`}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Large Range</h3>
            <Slider
              defaultValue={2024}
              min={1900}
              max={2100}
              step={1}
              label="Year"
              variant="secondary"
              showValue
              showTooltip
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SliderExample;
