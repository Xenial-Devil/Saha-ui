import React, { useState } from "react";
import DatePicker from "../components/DatePicker";
import type { DateRange } from "../components/DatePicker/DatePicker.types";
import { Card } from "../components/Card";

export const DatePickerExample: React.FC = () => {
  // Single date examples
  const [singleDate, setSingleDate] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Date range examples
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [rangeWithShortcuts, setRangeWithShortcuts] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [rangeWithFooter, setRangeWithFooter] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  // Date restrictions
  const [restrictedDate, setRestrictedDate] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [disabledDatesExample, setDisabledDatesExample] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  // Booking examples
  const [checkIn, setCheckIn] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [checkOut, setCheckOut] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 30);

  // Disabled date ranges (e.g., holidays)
  const disabledRanges = [
    {
      startDate: new Date(2025, 11, 24),
      endDate: new Date(2025, 11, 26),
    },
    {
      startDate: new Date(2025, 11, 31),
      endDate: new Date(2026, 0, 1),
    },
  ];

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">DatePicker Component</h2>
        <p className="text-base-content/70 mb-8">
          A comprehensive date picker with date range selection, shortcuts,
          disabled dates, and advanced customization options. Based on
          react-tailwindcss-datepicker with Saha UI theme integration.
        </p>
      </div>

      {/* Variants */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Default</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="default"
              placeholder="Select date"
              asSingle
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Primary</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="primary"
              placeholder="Select date"
              asSingle
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Secondary</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="secondary"
              placeholder="Select date"
              asSingle
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Outlined</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="outlined"
              placeholder="Select date"
              asSingle
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Minimal</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="minimal"
              placeholder="Select date"
              asSingle
            />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Small</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              size="sm"
              placeholder="Select date"
              asSingle
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Medium (Default)</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              size="md"
              placeholder="Select date"
              asSingle
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Large</p>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              size="lg"
              placeholder="Select date"
              asSingle
            />
          </div>
        </div>
      </section>

      {/* Single Date vs Range */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Single Date vs Date Range
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Single Date Picker</h4>
            <DatePicker
              variant="primary"
              value={singleDate}
              onChange={setSingleDate}
              placeholder="Pick a date"
              asSingle
            />
            <p className="text-sm text-base-content/70 mt-3">
              Selected:{" "}
              {singleDate.startDate
                ? singleDate.startDate.toLocaleDateString()
                : "None"}
            </p>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Date Range Picker</h4>
            <DatePicker
              variant="secondary"
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
              useRange
            />
            <p className="text-sm text-base-content/70 mt-3">
              Range:{" "}
              {dateRange.startDate
                ? dateRange.startDate.toLocaleDateString()
                : "None"}
              {dateRange.endDate
                ? ` - ${dateRange.endDate.toLocaleDateString()}`
                : ""}
            </p>
          </Card>
        </div>
      </section>

      {/* Shortcuts */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Date Range with Shortcuts
        </h3>
        <Card className="p-6">
          <h4 className="font-semibold mb-3">Quick Date Selection</h4>
          <DatePicker
            variant="primary"
            value={rangeWithShortcuts}
            onChange={setRangeWithShortcuts}
            placeholder="Select date range"
            useRange
            showShortcuts
          />
          <p className="text-sm text-base-content/70 mt-3">
            Range:{" "}
            {rangeWithShortcuts.startDate
              ? rangeWithShortcuts.startDate.toLocaleDateString()
              : "None"}
            {rangeWithShortcuts.endDate
              ? ` - ${rangeWithShortcuts.endDate.toLocaleDateString()}`
              : ""}
          </p>
          <p className="text-xs text-base-content/50 mt-2">
            Try shortcuts: Today, Yesterday, Last 7 days, Last 30 days, This
            Month, Last Month
          </p>
        </Card>
      </section>

      {/* Footer */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Date Range with Footer</h3>
        <Card className="p-6">
          <h4 className="font-semibold mb-3">Apply/Cancel Buttons</h4>
          <DatePicker
            variant="outlined"
            value={rangeWithFooter}
            onChange={setRangeWithFooter}
            placeholder="Select date range"
            useRange
            showFooter
            configs={{
              footer: {
                cancel: "Clear",
                apply: "Confirm",
              },
            }}
          />
          <p className="text-sm text-base-content/70 mt-3">
            Range:{" "}
            {rangeWithFooter.startDate
              ? rangeWithFooter.startDate.toLocaleDateString()
              : "None"}
            {rangeWithFooter.endDate
              ? ` - ${rangeWithFooter.endDate.toLocaleDateString()}`
              : ""}
          </p>
          <p className="text-xs text-base-content/50 mt-2">
            Footer allows reviewing selection before confirming
          </p>
        </Card>
      </section>

      {/* Date Restrictions */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Date Restrictions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Min/Max Dates</h4>
            <DatePicker
              variant="primary"
              value={restrictedDate}
              onChange={setRestrictedDate}
              minDate={today}
              maxDate={futureDate}
              placeholder="Next 30 days only"
              asSingle
            />
            <p className="text-sm text-base-content/70 mt-3">
              Can only select dates within next 30 days
            </p>
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Disabled Date Ranges</h4>
            <DatePicker
              variant="outlined"
              value={disabledDatesExample}
              onChange={setDisabledDatesExample}
              disabledDates={disabledRanges}
              placeholder="Select date"
              asSingle
            />
            <p className="text-sm text-base-content/70 mt-3">
              Christmas and New Year dates are disabled
            </p>
          </Card>
        </div>
      </section>

      {/* Custom Configuration */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Custom Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Custom Date Format</h4>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="secondary"
              displayFormat="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              asSingle
            />
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Custom Separator</h4>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="primary"
              separator=" to "
              placeholder="Select range"
              useRange
            />
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Week Starts Monday</h4>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="outlined"
              startWeekOn={1}
              placeholder="Select date"
              asSingle
            />
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Popover Direction Up</h4>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="primary"
              popoverDirection="up"
              placeholder="Opens upward"
              asSingle
            />
          </Card>
        </div>
      </section>

      {/* Features */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Additional Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Without Clear Button</h4>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="primary"
              showClear={false}
              placeholder="No clear button"
              asSingle
            />
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Without Today Button</h4>
            <DatePicker
              value={{ startDate: null, endDate: null }}
              onChange={() => {}}
              variant="secondary"
              showToday={false}
              placeholder="No today button"
              asSingle
            />
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Read-only State</h4>
            <DatePicker
              value={{ startDate: new Date(), endDate: new Date() }}
              onChange={() => {}}
              variant="outlined"
              readOnly
              placeholder="Read-only"
              asSingle
            />
          </Card>

          <Card className="p-6">
            <h4 className="font-semibold mb-3">Disabled State</h4>
            <DatePicker
              value={{ startDate: new Date(), endDate: new Date() }}
              onChange={() => {}}
              variant="primary"
              disabled
              placeholder="Disabled"
              asSingle
            />
          </Card>
        </div>
      </section>

      {/* Real-world Examples */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Real-world Examples</h3>

        {/* Booking Form */}
        <Card className="p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Hotel Booking Form</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Check-in Date
              </label>
              <DatePicker
                variant="primary"
                value={checkIn}
                onChange={setCheckIn}
                minDate={today}
                placeholder="Select check-in"
                asSingle
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Check-out Date
              </label>
              <DatePicker
                variant="primary"
                value={checkOut}
                onChange={setCheckOut}
                minDate={checkIn.startDate || today}
                placeholder="Select check-out"
                asSingle
              />
            </div>
          </div>
          <p className="text-sm text-base-content/70 mt-4">
            Check-in:{" "}
            {checkIn.startDate
              ? checkIn.startDate.toLocaleDateString()
              : "Not selected"}
            <br />
            Check-out:{" "}
            {checkOut.startDate
              ? checkOut.startDate.toLocaleDateString()
              : "Not selected"}
          </p>
        </Card>

        {/* Project Timeline */}
        <Card className="p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Project Timeline</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Duration
              </label>
              <DatePicker
                variant="outlined"
                value={{ startDate: null, endDate: null }}
                onChange={() => {}}
                minDate={today}
                placeholder="Select project timeline"
                useRange
                showShortcuts
                showFooter
              />
            </div>
          </div>
        </Card>

        {/* Analytics Dashboard */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Analytics Date Range</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <DatePicker
                variant="primary"
                value={{ startDate: null, endDate: null }}
                onChange={() => {}}
                placeholder="Select date range"
                useRange
                showShortcuts
                showFooter
                configs={{
                  shortcuts: {
                    today: "Today",
                    yesterday: "Yesterday",
                    last7Days: "Last 7 Days",
                    last30Days: "Last 30 Days",
                    thisMonth: "This Month",
                    lastMonth: "Last Month",
                  },
                  footer: {
                    cancel: "Reset",
                    apply: "Apply Filter",
                  },
                }}
              />
            </div>
            <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Generate Report
            </button>
          </div>
        </Card>
      </section>

      {/* Code Examples */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
        <Card className="p-6">
          <h4 className="font-semibold mb-3">Basic Usage</h4>
          <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`import DatePicker from "@/components/DatePicker";
import type { DateRange } from "@/components/DatePicker/DatePicker.types";

function MyComponent() {
  const [date, setDate] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      variant="primary"
      placeholder="Select date"
      asSingle
    />
  );
}`}</code>
          </pre>
        </Card>

        <Card className="p-6 mt-4">
          <h4 className="font-semibold mb-3">Date Range with Shortcuts</h4>
          <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`<DatePicker
  value={dateRange}
  onChange={setDateRange}
  variant="primary"
  useRange
  showShortcuts
  showFooter
  minDate={new Date()}
  configs={{
    shortcuts: {
      today: "Today",
      last7Days: "Last 7 Days",
      last30Days: "Last 30 Days",
    },
    footer: {
      cancel: "Clear",
      apply: "Apply",
    },
  }}
/>`}</code>
          </pre>
        </Card>
      </section>
    </div>
  );
};

export default DatePickerExample;
