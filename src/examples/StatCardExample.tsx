"use client";
import { StatCard } from "../components/StatCard";

export default function StatCardExample() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-semibold">Stat Card</h2>
        <p className="text-muted-foreground">
          Display a compact statistic with trend and icon.
        </p>
      </div>

      {/* Basic Use */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Use</h3>
        <div className="bg-muted/30 p-6 rounded-lg grid grid-cols-3 gap-4">
          <StatCard
            title="Revenue"
            value="$24.3k"
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            title="Orders"
            value="1.2k"
            trend="down"
            trendValue="-3%"
            variant="filled"
            color="secondary"
          />
          <StatCard
            title="Visitors"
            value="8.9k"
            trend="up"
            trendValue="+4%"
            color="primary"
          />
        </div>
      </section>

      {/* Real World */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Real World Example</h3>
        <p className="text-sm text-muted-foreground">
          A simple dashboard row showing key metrics.
        </p>
        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              title="Revenue"
              value="$24.3k"
              trend="up"
              trendValue="+12%"
            />
            <StatCard
              title="Orders"
              value="1.2k"
              trend="down"
              trendValue="-3%"
              variant="filled"
              color="secondary"
            />
            <StatCard
              title="Visitors"
              value="8.9k"
              trend="up"
              trendValue="+4%"
              color="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
