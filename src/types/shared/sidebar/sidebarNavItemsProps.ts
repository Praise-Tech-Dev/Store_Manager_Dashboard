import type { ComponentType, SVGProps } from "react";

export type SidebarNavItemProps = {
  name: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
