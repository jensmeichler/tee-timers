export interface Page {
  title: string;
  description?: string;
  route: string;
  content?: any;
  children?: Page[];
}
