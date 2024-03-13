export type WidgetProps = {
  callbackRoute: string;
};

export type WidgetType<T = any> = {
  title: string;
  widget: (props: T) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
  anchor?: string;
};
