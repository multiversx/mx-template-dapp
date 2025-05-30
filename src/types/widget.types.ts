export type WidgetType<T = any> = {
  anchor?: string;
  description?: string;
  props?: { receiver?: string };
  reference: string;
  title: string;
  widget: (props: T) => JSX.Element;
};
