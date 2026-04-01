import { useMemo, useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import type { DateRange } from "../components/DatePicker/DatePicker.types";

const makeRange = (
  startOffsetDays: number,
  endOffsetDays: number,
): DateRange => ({
  startDate: new Date(Date.now() + startOffsetDays * 24 * 60 * 60 * 1000),
  endDate: new Date(Date.now() + endOffsetDays * 24 * 60 * 60 * 1000),
});

const formatDate = (date: Date | null) =>
  date ? date.toLocaleDateString() : "Not selected";

const formatRange = (range: DateRange) =>
  `${formatDate(range.startDate)} -> ${formatDate(range.endDate)}`;

const blockedWindows = [
  {
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    startDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
  },
];

export const DateRangePickerExample = () => {
  const [basicRange, setBasicRange] = useState<DateRange>(makeRange(0, 3));
  const [normalRange, setNormalRange] = useState<DateRange>(makeRange(2, 6));
  const [advancedRange, setAdvancedRange] = useState<DateRange>(
    makeRange(7, 12),
  );
  const [reportingRange, setReportingRange] = useState<DateRange>(
    makeRange(-14, -1),
  );
  const [syncMessage, setSyncMessage] = useState("Waiting for changes...");

  const reportingDays = useMemo(() => {
    if (!reportingRange.startDate || !reportingRange.endDate) {
      return "N/A";
    }

    const start = reportingRange.startDate.getTime();
    const end = reportingRange.endDate.getTime();
    const days = Math.max(1, Math.ceil((end - start) / (24 * 60 * 60 * 1000)));
    return `${days} days`;
  }, [reportingRange]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          DateRangePicker Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Range selection for booking, analytics filters, and reporting windows.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Pick a simple start and end range with default behavior.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <DateRangePicker value={basicRange} onChange={setBasicRange} />
            <DateRangePicker
              value={basicRange}
              onChange={setBasicRange}
              placeholder="Quick range"
              startWeekOn={1}
            />
            <p className="text-sm text-muted-foreground">
              Selected range: {formatRange(basicRange)}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with a controlled value so external forms can read and write
              the selected range.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                - Keep the component controlled with `value` and `onChange`.
              </li>
              <li>
                - Show the chosen range near the picker for quick validation.
              </li>
              <li>- Use defaults before enabling optional configuration.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Add form-friendly display options for everyday scheduling screens.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-sm font-medium text-foreground">
              Travel Window
            </p>
            <DateRangePicker
              value={normalRange}
              onChange={setNormalRange}
              placeholder="Choose check-in and check-out"
              showFooter
              showClear
              separator=" to "
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Current travel range: {formatRange(normalRange)}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This setup is ideal for booking forms where users confirm their
              range before submitting.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- `showFooter` helps prevent accidental range changes.</li>
              <li>- `showClear` gives users a fast reset path.</li>
              <li>- A custom separator can align with product language.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Synchronize range updates and enable shortcut-driven selections.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <DateRangePicker
              value={advancedRange}
              onChange={setAdvancedRange}
              onRangeChange={(startDate, endDate) => {
                setSyncMessage(
                  `Updated: ${formatDate(startDate)} -> ${formatDate(endDate)}`,
                );
              }}
              variant="primary"
              showShortcuts
              startWeekOn={1}
              configs={{
                shortcuts: {
                  last7Days: "Past 7 Days",
                  last30Days: "Past 30 Days",
                },
              }}
            />
            <DateRangePicker
              value={advancedRange}
              onChange={setAdvancedRange}
              disabledDates={blockedWindows}
              showFooter
              placeholder="Avoid blocked maintenance windows"
            />
            <p className="text-sm text-muted-foreground">{syncMessage}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced screens often sync range updates into charts, exports, or
              query parameters.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>
                - Use `onRangeChange` when you only need start and end dates.
              </li>
              <li>- Shortcuts speed up common analytics filters.</li>
              <li>- Set `startWeekOn` to align with regional expectations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Common in reporting dashboards where users compare windows over time.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <p className="mb-2 text-sm font-medium text-foreground">
              Reporting Period
            </p>
            <DateRangePicker
              value={reportingRange}
              onChange={setReportingRange}
              minDate={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}
              maxDate={new Date()}
              showFooter
              displayFormat="MM/DD/YYYY"
            />
            <div className="mt-4 rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="text-sm text-foreground">
                Window: {formatRange(reportingRange)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Duration: {reportingDays}
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
              <p className="text-sm font-medium text-foreground">
                Quarter-over-quarter snapshot
              </p>
              <DateRangePicker
                value={makeRange(-90, -1)}
                onChange={() => undefined}
                readOnly
                showClear={false}
              />
            </div>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Production reporting usually enforces boundaries to avoid invalid
              or expensive queries.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>- Constrain ranges with `minDate` and `maxDate`.</li>
              <li>- Echo selected windows so users trust exported data.</li>
              <li>- Pair range changes with chart and table refresh logic.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DateRangePickerExample;
