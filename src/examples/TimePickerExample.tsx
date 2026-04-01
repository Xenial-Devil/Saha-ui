import { useState } from "react";
import TimePicker from "../components/TimePicker";
import type {
  TimeRange,
  TimeValue,
} from "../components/TimePicker/TimePicker.types";

export const TimePickerExample = () => {
  const [singleTime, setSingleTime] = useState<TimeValue>({
    hours: 14,
    minutes: 30,
  });
  const [handoverTime, setHandoverTime] = useState<TimeValue>({
    hours: 18,
    minutes: 0,
  });
  const [workShift, setWorkShift] = useState<TimeRange>({
    startTime: { hours: 9, minutes: 0 },
    endTime: { hours: 17, minutes: 0 },
  });
  const [maintenanceWindow, setMaintenanceWindow] = useState<TimeRange>({
    startTime: { hours: 22, minutes: 30 },
    endTime: { hours: 1, minutes: 0 },
  });

  const toTimeValue = (value: TimeValue | TimeRange | null): TimeValue => {
    if (value && "hours" in value) {
      return value;
    }

    return { hours: 0, minutes: 0 };
  };

  const toTimeRange = (value: TimeValue | TimeRange | null): TimeRange => {
    if (value && "startTime" in value && "endTime" in value) {
      return value;
    }

    return { startTime: null, endTime: null };
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Time Picker</h2>
        <p className="text-muted-foreground">
          Capture exact times and ranges for scheduling, shifts, and operations.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Single time selection
            </p>
            <TimePicker
              value={singleTime}
              onChange={(value) => setSingleTime(toTimeValue(value))}
              placeholder="Select meeting time"
              showFooter
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Compact 24h handover slot
            </p>
            <TimePicker
              value={handoverTime}
              onChange={(value) => setHandoverTime(toTimeValue(value))}
              placeholder="Select handover slot"
              format="24h"
              minuteInterval={15}
              closeOnSelect
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Normal Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Standard work shift range
            </p>
            <TimePicker
              value={workShift}
              onChange={(value) => setWorkShift(toTimeRange(value))}
              useRange
              showFooter
              separator="to"
              helperText="Set start and end for team shift coverage."
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Support desk availability
            </p>
            <TimePicker
              value={maintenanceWindow}
              onChange={(value) => setMaintenanceWindow(toTimeRange(value))}
              useRange
              format="12h"
              showNow
              showClear
              showFooter
              label="Maintenance window"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Advanced Usage</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Precision scheduling
            </p>
            <TimePicker
              value={singleTime}
              onChange={(value) => setSingleTime(toTimeValue(value))}
              showSeconds
              showLiveClock
              showFormatToggle
              minuteInterval={5}
              showShortcuts
              showFooter
              configs={{
                footer: {
                  apply: "Save",
                  cancel: "Cancel",
                  now: "Current",
                },
              }}
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Validation and feedback states
            </p>
            <TimePicker
              value={handoverTime}
              onChange={(value) => setHandoverTime(toTimeValue(value))}
              minTime={{ hours: 8, minutes: 0 }}
              maxTime={{ hours: 20, minutes: 0 }}
              success
              helperText="Allowed window: 08:00 to 20:00"
            />
            <TimePicker
              value={singleTime}
              onChange={(value) => setSingleTime(toTimeValue(value))}
              error
              errorMessage="Selected time conflicts with another appointment."
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real-Life Use Cases</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Interview scheduling form
            </p>
            <TimePicker
              value={singleTime}
              onChange={(value) => setSingleTime(toTimeValue(value))}
              label="Interview time"
              inputName="interviewTime"
              required
              showFooter
              showNow
            />
          </div>

          <div className="rounded-lg bg-muted/30 p-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Read-only compliance snapshot
            </p>
            <TimePicker
              value={workShift}
              onChange={(value) => setWorkShift(toTimeRange(value))}
              useRange
              readOnly
              label="Approved shift window"
              helperText="Read-only view used in audit reports."
            />
          </div>
        </div>
      </section>
    </div>
  );
};
