export type WidgetType<T = any> = {
  description?: string;
  props?: { receiver?: string };
  reference: string;
  title: string;
  widget: (props: T) => JSX.Element;
};
