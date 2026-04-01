"use client";
import { useMemo, useState } from "react";
import {
  Activity,
  DollarSign,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react";
import { StatCard } from "../components/StatCard";

export default function StatCardExample() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("7d");
  const [selectedMetric, setSelectedMetric] = useState("Revenue");
  const [isLoading, setIsLoading] = useState(false);

  const trendData = useMemo(() => {
    if (timeRange === "24h") {
      return {
        revenue: "$8.2k",
        orders: "214",
        visitors: "3.1k",
        conversion: "3.8%",
      };
    }
    if (timeRange === "30d") {
      return {
        revenue: "$96.4k",
        orders: "4.9k",
        visitors: "42.2k",
        conversion: "4.1%",
      };
    }

    return {
      revenue: "$24.3k",
      orders: "1.2k",
      visitors: "8.9k",
      conversion: "3.6%",
    };
  }, [timeRange]);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          StatCard Component
        </h2>
        <p className="text-muted-foreground">
          Display a compact statistic with trend and icon.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          Render key metrics with default styling and concise trend indicators.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Revenue"
              value={trendData.revenue}
              icon={<DollarSign className="h-4 w-4" />}
              trend="up"
              trendValue="+12%"
            />
            <StatCard
              title="Orders"
              value={trendData.orders}
              icon={<ShoppingCart className="h-4 w-4" />}
              trend="down"
              trendValue="-3%"
            />
            <StatCard
              title="Visitors"
              value={trendData.visitors}
              icon={<Users className="h-4 w-4" />}
              trend="up"
              trendValue="+4%"
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Keep titles short and domain-specific.</li>
              <li>• Pair numeric values with trend direction.</li>
              <li>• Use consistent icon sizing across cards.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Normal Usage</h3>
        <p className="text-sm text-muted-foreground">
          Apply visual variants and colors to distinguish metric categories.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Conversion"
              value={trendData.conversion}
              description="Checkout completion"
              trend="up"
              trendValue="+0.4%"
              variant="filled"
              color="success"
            />
            <StatCard
              title="Error Rate"
              value="0.8%"
              description="API failures"
              trend="neutral"
              trendValue="0.0%"
              variant="outlined"
              color="warning"
            />
            <StatCard
              title="Auth Health"
              value="99.95%"
              description="7-day uptime"
              icon={<ShieldCheck className="h-4 w-4" />}
              trend="up"
              trendValue="+0.02%"
              variant="glass"
              color="info"
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Reserve strong variants for high-priority metrics.</li>
              <li>• Use trend descriptions for contextual clarity.</li>
              <li>• Keep color semantics consistent across dashboards.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Advanced Usage
        </h3>
        <p className="text-sm text-muted-foreground">
          Add interactivity, loading states, and animated values for live
          metrics.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  timeRange === "24h"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setTimeRange("24h")}
              >
                24h
              </button>
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  timeRange === "7d"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setTimeRange("7d")}
              >
                7d
              </button>
              <button
                type="button"
                className={`rounded px-3 py-1.5 text-sm ${
                  timeRange === "30d"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background"
                }`}
                onClick={() => setTimeRange("30d")}
              >
                30d
              </button>
              <button
                type="button"
                className="rounded border border-border bg-background px-3 py-1.5 text-sm"
                onClick={() => setIsLoading((value) => !value)}
              >
                Toggle Loading
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <StatCard
                title="Active Sessions"
                value={
                  timeRange === "24h"
                    ? "418"
                    : timeRange === "7d"
                      ? "2,640"
                      : "10,232"
                }
                icon={<Activity className="h-4 w-4" />}
                trend="up"
                trendValue="+7%"
                animateValue
                loading={isLoading}
                footer={
                  <span className="text-xs text-muted-foreground">
                    Realtime ingestion
                  </span>
                }
              />
              <StatCard
                title="Revenue"
                value={trendData.revenue}
                trend="up"
                trendValue="+11%"
                clickable
                onClick={() => setSelectedMetric("Revenue")}
                footer={
                  <span className="text-xs text-muted-foreground">
                    Click card to pin
                  </span>
                }
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Pinned metric: {selectedMetric}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Animated values help emphasize live updates.</li>
              <li>• Loading state should preserve card dimensions.</li>
              <li>• Keep card click actions intentional and lightweight.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">
          Real-Life Use Cases
        </h3>
        <p className="text-sm text-muted-foreground">
          Production dashboard row for revenue, platform health, and compliance.
        </p>
        <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
          <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Revenue"
              value={trendData.revenue}
              trend="up"
              trendValue="+12%"
              description="Compared to previous period"
              color="primary"
              variant="gradient"
            />
            <StatCard
              title="Platform Uptime"
              value="99.98%"
              trend="down"
              trendValue="-0.01%"
              description="SLA target 99.95%"
              color="success"
              variant="filled"
            />
            <StatCard
              title="Compliance Alerts"
              value="3"
              trend="up"
              trendValue="+1"
              description="Requires policy review"
              color="warning"
              variant="outlined"
            />
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4">
            <h4 className="text-sm font-semibold text-foreground">
              Implementation Notes
            </h4>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>• Blend business and reliability metrics in one row.</li>
              <li>• Keep descriptions precise for operational triage.</li>
              <li>• Prefer stable, comparable value formatting.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
