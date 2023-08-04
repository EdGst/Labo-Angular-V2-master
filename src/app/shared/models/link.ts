export interface Link {
  title : string;
  url? : string;
  children? : Link[];
  isVisible? : boolean;
  isAccessible?: boolean
}
