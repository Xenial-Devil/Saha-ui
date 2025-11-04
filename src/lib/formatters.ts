export const formatters = {
  number: (value: number) => value.toLocaleString(),
  currency: (value: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
      value
    ),
  percent: (value: number) => `${value}%`,
  date: (value: string | Date) => new Date(value).toLocaleDateString(),
  dateTime: (value: string | Date) => new Date(value).toLocaleString(),
  compact: (value: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact" }).format(value),
  bytes: (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
  },
};
