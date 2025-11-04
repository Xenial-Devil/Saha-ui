// components/ChartContainer.tsx
import { PropsWithChildren } from "react";
import { chartContainerVariants } from "../Chart.styles";
import { cn } from "../../../lib/utils";

type Props = PropsWithChildren<{
  variant?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}>;

export function ChartContainer({ variant, size, className, children }: Props) {
  return (
    <div
      className={cn(
        chartContainerVariants({ variant: variant as any, size }),
        "group hover:shadow-md",className
      )}
    >
      {/* Subtle corner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-foreground/5 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
