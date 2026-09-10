import type { ComponentType, SVGProps } from "react";
import { NavLink } from "react-router-dom";

type SidebarNavItemProps = {
  name: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isOpen: boolean;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

export default function SidebarNavItem({
  name,
  path,
  icon: Icon,
  isOpen,
  closeSidebar,
  toggleSidebar,
}: SidebarNavItemProps) {
  return (
    <NavLink
      to={path}
      // end={path === "/" || path === "/dashboard"}
      end={path === "/dashboard"}
      onClick={(e) => {
        if (!isOpen && window.innerWidth < 768) {
          e.preventDefault();
          toggleSidebar();
          return;
        }

        closeSidebar();
      }}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-lg
        py-2.5
        transition-all
        duration-300
        
        ${isOpen ? "px-3.5 gap-3 justify-start" : "px-0 justify-center"}

        ${
          isActive
            ? "bg-[#4F46E5] text-[#DAD7FF]"
            : "text-text-gray hover:bg-[#4F46E5]/10"
        }
        `
      }
    >
      {/* <img src={icon} alt={`${name} icon`} className={`w-4.5 h-4.5 shrink-0 `} /> */}
      <Icon className="w-5 h-5 shrink-0 " />

      <span
        className={`truncate text-sm font-medium tracking-tight ${
          isOpen ? "inline-block" : "hidden md:inline-block"
        }`}
      >
        {name}
      </span>
    </NavLink>
  );
}
