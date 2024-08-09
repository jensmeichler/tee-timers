export interface Page {
  title: string;
  description?: any;
  route: string;
  content?: any;
  redirect?: string;
  availableInMenu: boolean;
  menuIndex?: number;
  availableOnHome: boolean;
  homeIndex?: number;
  availableInFooter: boolean;
  footerIndex?: number;
  children?: Page[];
}
