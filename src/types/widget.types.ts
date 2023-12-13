export type WidgetProps = {
  callbackRoute: string;
};

export type WidgetType = {
  title: string;
  widget: (props: any) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
  anchor?: string;
  isCallbackUrlRelative?: boolean;
};