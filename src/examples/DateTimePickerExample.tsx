import { useMemo, useState } from "react";
import { DateTimePicker } from "../components/DateTimePicker";

const hoursFromNow = (hours: number) =>
  new Date(Date.now() + hours * 60 * 60 * 1000);

export const DateTimePickerExample = () => {
  const [meetingStart, setMeetingStart] = useState<Date | null>(new Date());
  const [dailyStandup, setDailyStandup] = useState<Date | null>(
    hoursFromNow(1),
  );
  const [followUpSlot, setFollowUpSlot] = useState<Date | null>(
    hoursFromNow(4),
  );
  const [deploymentSlot, setDeploymentSlot] = useState<Date | null>(
    hoursFromNow(24),
  );
  const [maintenanceStart, setMaintenanceStart] = useState<Date | null>(
    hoursFromNow(30),
  );
  const [maintenanceEnd, setMaintenanceEnd] = useState<Date | null>(
    hoursFromNow(32),
  );

  const maintenanceWindowText = useMemo(() => {
    if (!maintenanceStart || !maintenanceEnd) {
      return "Maintenance window not configured.";
    }

    return `${maintenanceStart.toLocaleString()} to ${maintenanceEnd.toLocaleString()}`;
  }, [maintenanceStart, maintenanceEnd]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          DateTimePicker Component
        </h2>
        <p className="mt-2 text-muted-foreground">
          Date and time scheduling for meetings, reminders, and operations
          planning.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Select a single date-time value.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <DateTimePicker value={meetingStart} onChange={setMeetingStart} />
            <DateTimePicker
              value={dailyStandup}
              onChange={setDailyStandup}
              timePickerProps={{ minuteInterval: 15 }}
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep setup minimal so teams can adopt the component quickly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Start with defaults and one controlled state value.</li>
              <li>• Use minute intervals for predictable scheduling.</li>
              <li>• Keep timezone assumptions explicit in surrounding UI.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Add labels and helper text in forms.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <DateTimePicker
              value={followUpSlot}
              onChange={setFollowUpSlot}
              label="Schedule follow-up"
              helperText="Times are shown in local timezone"
            />
            <DateTimePicker
              value={deploymentSlot}
              onChange={setDeploymentSlot}
              label="Customer reminder"
              helperText="Use this slot for reminder email delivery."
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This pattern maps to everyday product screens and forms.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Pair labels with helper text for scheduling confidence.</li>
              <li>• Keep value changes controlled for persistence.</li>
              <li>• Use meaningful labels tied to user actions.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Use customized DatePicker and TimePicker props.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <DateTimePicker
              value={followUpSlot}
              onChange={setFollowUpSlot}
              datePickerProps={{ variant: "secondary" }}
              timePickerProps={{
                format: "12h",
                showNow: true,
                showFooter: true,
              }}
            />
            <DateTimePicker
              value={deploymentSlot}
              onChange={setDeploymentSlot}
              variant="accent"
              size="lg"
              error
              helperText="Deployment conflict detected for this slot."
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Advanced mode should compose cleanly with app state and callbacks.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Customize date/time inputs without losing consistency.</li>
              <li>• Surface conflicts early with error states.</li>
              <li>• Keep callbacks simple and traceable.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Useful for release planning, interviews, and customer reminders.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <DateTimePicker
              value={deploymentSlot}
              onChange={setDeploymentSlot}
              label="Deployment slot"
              helperText="Coordinate release timing across product, QA, and support."
            />
            <div className="grid gap-3 md:grid-cols-2">
              <DateTimePicker
                value={maintenanceStart}
                onChange={setMaintenanceStart}
                label="Maintenance start"
                timePickerProps={{ minuteInterval: 30 }}
              />
              <DateTimePicker
                value={maintenanceEnd}
                onChange={setMaintenanceEnd}
                label="Maintenance end"
                timePickerProps={{ minuteInterval: 30 }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Configured window: {maintenanceWindowText}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Show how the component fits real workflows, not isolated UI demos.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Use separate start/end pickers for operational windows.</li>
              <li>• Keep one source of truth in controlled state.</li>
              <li>• Pair scheduling inputs with clear context text.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DateTimePickerExample;
