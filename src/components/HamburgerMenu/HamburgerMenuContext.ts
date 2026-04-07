import { createContext, useContext } from 'react';

/** Set to true inside a HamburgerMenu panel to prevent SideMenu auto-collapse. */
export const HamburgerMenuContext = createContext(false);

export function useInsideHamburgerMenu(): boolean {
  return useContext(HamburgerMenuContext);
}
