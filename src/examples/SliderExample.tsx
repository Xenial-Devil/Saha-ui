import { useState } from "react";
import Slider from "../components/Slider";

/**
 * Comprehensive Slider Examples
 * 
 * Demonstrates all features:
 * - Basic slider
 * - Range slider
 * - Different variants
 * - Different sizes
 * - Marks and labels
 * - Vertical orientation
 * - Custom formatters
 * - Real-world use cases
 */

export default function SliderExample() {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(75);
  const [rangeValue, setRangeValue] = useState<number[]>([20, 80]);
  const [volumeValue, setVolumeValue] = useState(60);
  const [priceRange, setPriceRange] = useState<number[]>([25, 75]);
  const [brightness, setBrightness] = useState(70);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Slider Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern, accessible slider with range support, marks, tooltips, and smooth animations
          </p>
        </div>

        {/* Basic Sliders */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Sliders
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Simple Slider (Value: {value1})
              </label>
              <Slider value={value1} onChange={(val) => setValue1(val as number)} />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                With Tooltip (Value: {value2})
              </label>
              <Slider
                value={value2}
                onChange={(val) => setValue2(val as number)}
                showTooltip
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                With Value Label
              </label>
              <Slider value={50} showValue />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Disabled Slider
              </label>
              <Slider value={30} disabled />
            </div>
          </div>
        </section>

        {/* Range Sliders */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Range Sliders
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Basic Range ({rangeValue[0]} - {rangeValue[1]})
              </label>
              <Slider
                range
                value={rangeValue}
                onChange={(val) => setRangeValue(val as number[])}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Range with Tooltip
              </label>
              <Slider
                range
                value={[30, 70]}
                showTooltip
                variant="accent"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Range with Value Label
              </label>
              <Slider
                range
                value={[10, 90]}
                showValue
                variant="gradient"
              />
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Color Variants
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Default
              </label>
              <Slider value={50} variant="default" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Primary
              </label>
              <Slider value={60} variant="primary" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Secondary
              </label>
              <Slider value={70} variant="secondary" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Accent
              </label>
              <Slider value={40} variant="accent" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Success
              </label>
              <Slider value={80} variant="success" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Warning
              </label>
              <Slider value={55} variant="warning" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Error
              </label>
              <Slider value={30} variant="error" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Gradient
              </label>
              <Slider value={65} variant="gradient" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Glass
              </label>
              <Slider value={75} variant="glass" />
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Sizes
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Extra Small (xs)
              </label>
              <Slider value={50} size="xs" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Small (sm)
              </label>
              <Slider value={50} size="sm" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Medium (md)
              </label>
              <Slider value={50} size="md" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Large (lg)
              </label>
              <Slider value={50} size="lg" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Extra Large (xl)
              </label>
              <Slider value={50} size="xl" />
            </div>
          </div>
        </section>

        {/* With Marks */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Sliders with Marks
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Simple Marks
              </label>
              <Slider
                value={50}
                marks={[0, 25, 50, 75, 100]}
                showMarks
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Marks with Labels
              </label>
              <Slider
                value={50}
                marks={[
                  { value: 0, label: "0%" },
                  { value: 25, label: "25%" },
                  { value: 50, label: "50%" },
                  { value: 75, label: "75%" },
                  { value: 100, label: "100%" },
                ]}
                showMarks
                variant="accent"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Range with Marks
              </label>
              <Slider
                range
                value={[30, 70]}
                marks={[0, 20, 40, 60, 80, 100]}
                showMarks
                variant="gradient"
              />
            </div>

            <div className="space-y-3 pb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Custom Step with Marks
              </label>
              <Slider
                value={50}
                step={10}
                marks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                showMarks
                variant="success"
              />
            </div>
          </div>
        </section>

        {/* Vertical Sliders */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Vertical Orientation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex gap-12 justify-center">
              <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Basic
                </label>
                <Slider
                  value={60}
                  orientation="vertical"
                  className="h-64"
                />
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  With Marks
                </label>
                <Slider
                  value={40}
                  orientation="vertical"
                  marks={[0, 25, 50, 75, 100]}
                  showMarks
                  variant="accent"
                  className="h-64"
                />
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Range
                </label>
                <Slider
                  range
                  value={[20, 80]}
                  orientation="vertical"
                  variant="gradient"
                  className="h-64"
                />
              </div>

              <div className="space-y-3 flex flex-col items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Large Size
                </label>
                <Slider
                  value={70}
                  orientation="vertical"
                  size="lg"
                  variant="success"
                  className="h-64"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Custom Formatters */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Value Formatters
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Percentage Formatter
              </label>
              <Slider
                value={75}
                showTooltip
                valueFormatter={(val) => `${val}%`}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Currency Formatter
              </label>
              <Slider
                value={500}
                min={0}
                max={1000}
                step={10}
                showTooltip
                valueFormatter={(val) => `$${val}`}
                variant="success"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Temperature Formatter
              </label>
              <Slider
                value={22}
                min={0}
                max={40}
                showTooltip
                valueFormatter={(val) => `${val}°C`}
                variant="warning"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Formatter
              </label>
              <Slider
                value={120}
                min={0}
                max={300}
                step={5}
                showTooltip
                valueFormatter={(val) => {
                  const mins = Math.floor(val / 60);
                  const secs = val % 60;
                  return `${mins}:${secs.toString().padStart(2, '0')}`;
                }}
                variant="accent"
              />
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Real-world Use Cases
          </h2>
          <div className="grid gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            {/* Volume Control */}
            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-700 dark:text-gray-300">
                  🔊 Volume Control
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {volumeValue}%
                </span>
              </div>
              <Slider
                value={volumeValue}
                onChange={(val) => setVolumeValue(val as number)}
                showTooltip
                variant="primary"
                size="lg"
              />
            </div>

            {/* Price Range Filter */}
            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-700 dark:text-gray-300">
                  💰 Price Range Filter
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                range
                value={priceRange}
                onChange={(val) => setPriceRange(val as number[])}
                min={0}
                max={100}
                step={5}
                showTooltip
                valueFormatter={(val) => `$${val}`}
                variant="success"
                size="md"
              />
            </div>

            {/* Brightness Control */}
            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-700 dark:text-gray-300">
                  ☀️ Brightness
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {brightness}%
                </span>
              </div>
              <Slider
                value={brightness}
                onChange={(val) => setBrightness(val as number)}
                showTooltip
                valueFormatter={(val) => `${val}%`}
                variant="warning"
                size="md"
                marks={[0, 25, 50, 75, 100]}
                showMarks
              />
            </div>

            {/* Age Range */}
            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-700 dark:text-gray-300">
                  👥 Age Range
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  18 - 65 years
                </span>
              </div>
              <Slider
                range
                value={[18, 65]}
                min={0}
                max={100}
                showTooltip
                valueFormatter={(val) => `${val} years`}
                variant="accent"
                marks={[
                  { value: 0, label: "0" },
                  { value: 18, label: "18" },
                  { value: 40, label: "40" },
                  { value: 65, label: "65" },
                  { value: 100, label: "100" },
                ]}
                showMarks
              />
            </div>

            {/* Rating */}
            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-700 dark:text-gray-300">
                  ⭐ Minimum Rating
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  3.5 stars
                </span>
              </div>
              <Slider
                value={3.5}
                min={0}
                max={5}
                step={0.5}
                showTooltip
                valueFormatter={(val) => `${val} ⭐`}
                variant="gradient"
                marks={[
                  { value: 0, label: "0" },
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                ]}
                showMarks
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
