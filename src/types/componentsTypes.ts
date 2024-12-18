export interface WithClassnameType {
  className?: string;
  'data-testid'?: string;
}

export interface WithStylesType {
  'data-testid'?: string;
  styles?: Record<string, string>;
}
