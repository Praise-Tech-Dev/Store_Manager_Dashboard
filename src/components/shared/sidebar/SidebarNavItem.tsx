import type { SidebarNavItemProps } from "@/types/shared/sidebar/sidebarNavItemsProps";
import { NavLink } from "react-router-dom";

export default function SidebarNavItem({
  name,
  path,
  icon: Icon,
}: SidebarNavItemProps) {
  return (
    <NavLink
      to={path}
      end={path === "/statistics"}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-xl
        py-3
        px-4
        transition-colors
        duration-300
        
        ${
          isActive
            ? "bg-[#4F46E5] text-[#DAD7FF]"
            : "text-text-gray hover:bg-[#4F46E5]/10"
        }
        `
      }
    >
      <Icon className="w-5 h-5 shrink-0 " />

      <span
        className={`truncate text-sm font-medium tracking-tight"
        }`}
      >
        {name}
      </span>
    </NavLink>
  );
}
