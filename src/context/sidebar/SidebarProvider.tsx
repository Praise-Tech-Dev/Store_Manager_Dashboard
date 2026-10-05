import { useCallback, useState } from "react";
import { SidebarContext } from "./SidebarContext";

type sidebarProviderProps = {
  children: React.ReactNode;
};

export function SidebarProvider({ children }: sidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useCallback(() => setIsOpen(true), []);
  const closeSidebar = useCallback(() => setIsOpen(false), []);
  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}


