export interface RouteType {
  path: string;
  component: React.ComponentType;
  authenticatedRoute?: boolean;
}
