/**
 * Sidebar Navigation Type Definitions
 */

export interface MenuSubItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  subItems?: MenuSubItem[];
  badge?: number;
}

export interface SidebarConfig {
  menuItems: MenuItem[];
}
