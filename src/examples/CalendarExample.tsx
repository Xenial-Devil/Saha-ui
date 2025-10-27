import { useState } from "react";
import Calendar from "../components/Calendar";

export const CalendarExample = () => {
  const [singleDate, setSingleDate] = useState<Date | undefined>();
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<
    { from: Date; to?: Date } | undefined
  >();

  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
          Calendar Component
        </h2>
        <p className="text-muted-foreground text-lg">
          Beautiful and feature-rich calendar with multiple selection modes
        </p>
      </div>

      {/* Single Selection */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Single Date Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Variant */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Default Variant
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="default"
            />
          </div>

          {/* Bordered Variant */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Bordered Variant
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="bordered"
            />
          </div>

          {/* Glass Variant */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Glass Variant
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
            />
          </div>
        </div>
      </section>

      {/* Visual Variants */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Visual Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Glass Strong */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Glass Strong
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass-strong"
              size="lg"
            />
          </div>

          {/* Gradient */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Gradient Variant
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="gradient"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">Size Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Small */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Small Size
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="bordered"
              size="sm"
            />
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Medium Size (Default)
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="bordered"
              size="md"
            />
          </div>

          {/* Large */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Large Size
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="bordered"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Color Variants */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Color Variants
        </h3>
        <p className="text-muted-foreground mb-4">
          Different theme colors for selection highlighting
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Primary (Default)
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="primary"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Secondary
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="secondary"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Accent</p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="accent"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Success</p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="success"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Warning</p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="warning"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Error</p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="error"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Info</p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              color="info"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Bordered Color Variants */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Bordered with Color Variants
        </h3>
        <p className="text-muted-foreground mb-4">
          Colored borders matching the theme color (no hover effect)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Primary Border
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="default"
              color="primary"
              bordered
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Accent Border
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="default"
              color="accent"
              bordered
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Success Border
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="default"
              color="success"
              bordered
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Error Border
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="default"
              color="error"
              bordered
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Range Selection with Colors */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Range Selection - Color Variants
        </h3>
        <p className="text-muted-foreground mb-4">
          Selected range:{" "}
          {dateRange
            ? `${dateRange.from.toLocaleDateString()} ${
                dateRange.to
                  ? `- ${dateRange.to.toLocaleDateString()}`
                  : "(selecting end date...)"
              }`
            : "None"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Accent Range
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="glass-strong"
              color="accent"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Success Range
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="bordered"
              color="success"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Info Range
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="gradient"
              color="info"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Range Selection */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Range Selection Mode - All Variants
        </h3>
        <p className="text-muted-foreground mb-4">
          Selected range:{" "}
          {dateRange
            ? `${dateRange.from.toLocaleDateString()} ${
                dateRange.to
                  ? `- ${dateRange.to.toLocaleDateString()}`
                  : "(selecting end date...)"
              }`
            : "None"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Default Variant
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="default"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Bordered Variant
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="bordered"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Glass Variant
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="glass"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Glass Strong Variant
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="glass-strong"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Gradient Variant
            </p>
            <Calendar
              mode="range"
              range={dateRange}
              onRangeChange={setDateRange}
              variant="gradient"
              size="md"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Range Info
            </p>
            <div className="bg-card/95 border border-border/30 rounded-lg p-4 h-full flex flex-col justify-center">
              {dateRange ? (
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Start Date
                    </p>
                    <p className="font-semibold text-primary">
                      {dateRange.from.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {dateRange.to && (
                    <>
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          End Date
                        </p>
                        <p className="font-semibold text-accent">
                          {dateRange.to.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="p-3 bg-secondary/10 rounded-lg">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Duration
                        </p>
                        <p className="font-semibold text-secondary">
                          {Math.ceil(
                            (dateRange.to.getTime() -
                              dateRange.from.getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) + 1}{" "}
                          days
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  Click on a start date, then click on an end date to select a
                  range
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Selection */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Multiple Date Selection
        </h3>
        <p className="text-muted-foreground mb-4">
          Selected dates: {multipleDates.length}{" "}
          {multipleDates.length === 1 ? "date" : "dates"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Select Multiple Dates
            </p>
            <Calendar
              mode="multiple"
              values={multipleDates}
              onChange={setMultipleDates}
              variant="glass-strong"
              size="lg"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Selected Dates List
            </p>
            <div className="bg-card/95 border border-border/30 rounded-lg p-4 min-h-[400px]">
              {multipleDates.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No dates selected
                </p>
              ) : (
                <div className="space-y-2">
                  {multipleDates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 py-2 bg-primary/10 rounded-lg"
                    >
                      <span className="text-sm font-medium">
                        {date.toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <button
                        onClick={() =>
                          setMultipleDates(
                            multipleDates.filter((_, i) => i !== index)
                          )
                        }
                        className="text-destructive hover:text-destructive/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Advanced Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Disabled Dates */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Disabled Dates (Weekends)
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              isDateDisabled={(date) => {
                const day = date.getDay();
                return day === 0 || day === 6; // Disable weekends
              }}
            />
          </div>

          {/* Min/Max Dates */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Date Range Limits (Current Month Only)
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              minDate={
                new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              }
              maxDate={
                new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
              }
            />
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Customization Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monday First */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Week Starts on Monday
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="bordered"
              firstDayOfWeek={1}
            />
          </div>

          {/* No Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Without Action Buttons
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="bordered"
              showTodayButton={false}
              showClearButton={false}
            />
          </div>
        </div>
      </section>

      {/* Rounded Variants */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-text mb-6">
          Border Radius Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Small Radius */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Small Radius
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              rounded="sm"
            />
          </div>

          {/* Large Radius */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Large Radius (Default)
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              rounded="lg"
            />
          </div>

          {/* XL Radius */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Extra Large Radius
            </p>
            <Calendar
              mode="single"
              value={singleDate}
              onChange={setSingleDate}
              variant="glass"
              rounded="2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
