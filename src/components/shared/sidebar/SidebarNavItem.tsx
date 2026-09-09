import { NavLink } from "react-router-dom";
// import type { LucideIcon } from "lucide-react";

type SidebarNavItemProps = {
  name: string;
  path: string;
  icon: string;
  isOpen: boolean;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

export default function SidebarNavItem({
  name,
  path,
  icon,
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
        
        ${isOpen ? "px-4 justify-start" : " px-1 justify-center md:justify-center"}

        ${
          isActive
            ? "bg-[#4F46E5] text-[#DAD7FF]"
            : "text-text-gray hover:bg-[#4F46E5]/10"
        }
        `
      }
    >
      <img src={icon} alt={`${name} icon`} className="w-4.5 h-4.5 shrink-0 " />

      <span
        className={`truncate text-xs tracking-tight transition-opacity duration-200 ${
          isOpen ? "inline-block" : "hidden md:inline-block"
        }`}
      >
        {name}
      </span>
    </NavLink>
  );
}
