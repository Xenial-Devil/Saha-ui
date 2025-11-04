// components/ChartTooltip.tsx
type TooltipConfig = {
  valueFormatter?: (v: unknown) => string;
  nameFormatter?: (v: string) => string;
  labelFormatter?: (v: string) => string;
  show?: boolean;
};

interface Props {
  active?: boolean;
  payload?: Array<{
    color?: string;
    name: any;
    value: any;
    dataKey?: string;
  }>;
  label?: string | number;
  config?: TooltipConfig;
}

export function ChartTooltip({ active, payload, label, config }: Props) {
  if (!active || !payload?.length) return null;

  const labelText = config?.labelFormatter
    ? config.labelFormatter(label as any)
    : (label as any);

  return (
    <div className="min-w-[180px] rounded-xl border border-border/60 bg-background/80 p-3 text-xs shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {labelText && (
        <div className="mb-2 font-medium text-foreground">{labelText}</div>
      )}
      <div className="space-y-1">
        {payload.map(
          (
            p: { color?: string; name: any; value: any },
            i: number
          )=> (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-muted-foreground">
            {config?.nameFormatter ? config.nameFormatter(p.name) : p.name}
          </span>
              </div>
              <span className="tabular-nums font-medium">
          {config?.valueFormatter
            ? config.valueFormatter(p.value)
            : String(p.value)}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
