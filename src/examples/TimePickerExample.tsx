import { useState } from "react";
import TimePicker from "../components/TimePicker";
import type {
  TimeValue,
  TimeRange,
} from "../components/TimePicker/TimePicker.types";

export const TimePickerExample=()=> {
  const [single, setSingle] = useState<TimeValue>({ hours: 14, minutes: 30 });
  const [range, setRange] = useState<TimeRange>({
    startTime: { hours: 9, minutes: 0 },
    endTime: { hours: 17, minutes: 0 },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Single time</h3>
        <TimePicker
          value={single}
          onChange={(v) => setSingle(v as TimeValue)}
          placeholder="Select time"
          showFooter
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">Range (start — end)</h3>
        <TimePicker
          value={range}
          onChange={(v) => setRange(v as TimeRange)}
          useRange
          showFooter
          format="12h"
          />
      </div>
    </div>
  );
}
