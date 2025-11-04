import { useState, useMemo, useCallback } from "react";
import type { ChartConfig } from "../components/Chart/Chart.types";

export function useChartData(config: ChartConfig) {
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const toggleSeries = useCallback((dataKey: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev);
      if (next.has(dataKey)) {
        next.delete(dataKey);
      } else {
        next.add(dataKey);
      }
      return next;
    });
  }, []);

  const visibleSeries = useMemo(
    () => config.series.filter((s) => !hiddenSeries.has(s.dataKey) && !s.hide),
    [config.series, hiddenSeries]
  );

  const resetHidden = useCallback(() => {
    setHiddenSeries(new Set());
  }, []);

  return {
    hiddenSeries,
    visibleSeries,
    toggleSeries,
    resetHidden,
  };
}
