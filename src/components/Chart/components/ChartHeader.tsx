// components/ChartHeader.tsx
type Props = {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeToGap: Record<NonNullable<Props["size"]>, string> = {
  sm: "mb-2",
  md: "mb-3",
  lg: "mb-4",
  xl: "mb-5",
};

export function ChartHeader({ title, description, size = "md" }: Props) {
  if (!title && !description) return null;
  return (
    <div className={sizeToGap[size]}>
      {title && (
        <h3 className="text-lg font-semibold tracking-tight leading-tight">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
