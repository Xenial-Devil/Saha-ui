export type AlertProps = {
  variant: "solid" | "subtle" | "left-accent" | "top-accent" | "outline";
  message: string;
  title: string;
  status: "success" | "danger" | "warning" | "info";
  direction?: "row" | "column";
  align?: 'left' | 'center' | 'right' | 'justify';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  height?: string | undefined;
  rounded?: boolean | undefined;
  closeable: boolean;
};

export const defaultAlertProps: AlertProps = {
  variant: "solid",
  message: "",
  title: "",
  status: "info",
  direction: "row",
  align: 'left',
  justify:'center',
  textAlign: 'left',
  height:'',
  rounded: false,
  closeable: false,
};