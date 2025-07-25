export interface RouteType {
  path: string;
  component: () => React.ReactNode;
  authenticatedRoute?: boolean;
}
