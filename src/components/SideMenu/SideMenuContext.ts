import { createContext, useContext } from 'react';

export interface SideMenuContextValue {
  isCollapsed: boolean;
}

export const SideMenuContext = createContext<SideMenuContextValue>({
  isCollapsed: false,
});

export function useSideMenu(): SideMenuContextValue {
  return useContext(SideMenuContext);
}
