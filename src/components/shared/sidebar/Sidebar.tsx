import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { X } from "lucide-react";
import { navigation } from "../../../constants/navigation";
import { useSidebar } from "../../../context/SidebarContext";
import logo from "../../../assets/icons/logo.svg";
import SidebarNavItem from "./SidebarNavItem";

export default function Sidebar() {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const location = useLocation();
  useEffect(() => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [location.pathname]);
  return (
    <div className="">
      <aside
        className={`
        fixed
        top-0
        left-0
        z-40
        h-screen
        bg-white
        text-text-gray
        flex
        flex-col
        transition-all
        duration-300
        ease-in-out

        ${isOpen ? "w-64" : "w-16"}

        md:w-64
      `}
      >
        <div
          className={`transition-all duration-300 ${isOpen ? "px-4" : "px-2"}`}
        >
          <div className="flex items-center gap-3 px-2  py-4">
            <div className="flex w-8 h-8 items-center justify-center  bg-slate-100  shadow-sm">
              <img
                src={logo}
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div
              className={`
              transition-all
              duration-300
              text-xl
              font-semibold
              tracking-[0.5px]
              leading-[-0.5px]
              text-primary
              ${isOpen ? "opacity-100" : "w-0 opacity-0"}

              md:w-auto md:opacity-100
            `}
            >
              StoreManager
            </div>

            {isOpen && (
              <button
                onClick={closeSidebar}
                className="ml-auto md:hidden text-slate-900"
              >
                <X size={22} />
              </button>
            )}
          </div>

          <div className="flex flex-col pt-10 gap-10">
            <nav className="flex-1 space-y-2 px-2  md:px-4">
              {navigation.map((item) => (
                <SidebarNavItem
                  key={item.name}
                  {...item}
                  isOpen={isOpen}
                  closeSidebar={closeSidebar}
                  toggleSidebar={toggleSidebar}
                />
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
}

