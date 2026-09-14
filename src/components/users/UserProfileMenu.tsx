import { useAuth } from "@/hooks/auth/useAuth"
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../shared/Avatar";
import { getUserAvatarUrl } from "@/utils/user.utils";
import { useNavigate } from "react-router-dom";

export const UserProfileMenu = () => {
    const { user, isLoading, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate("/login", { replace: true});
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (isLoading) {
      return (
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="hidden sm:flex flex-col gap-1.5">
            <div className="w-24 h-3.5 bg-slate-200 rounded" />
            <div className="w-16 h-2.5 bg-slate-200 rounded" />
          </div>
        </div>
      );
    }

    const fullName = user?.name
    ? `${user.name.firstname} ${user.name.lastname}`
    : "Alex Rivera";

    const role = user?.role || "Administrator";
    const avatarUrl = getUserAvatarUrl(fullName, user?.avatar);

    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer flex items-center gap-3 p-1 rounded-lg hover:bg-slate-100 transition-colors text-left"
        >
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-text-default capitalize leading-3.5 tracking-normal">
              {fullName}
            </span>
            <span className="text-xs text-text-gray font-normal leading-3.5 tracking-normal text-center">
              {role}
            </span>
          </div>

          <Avatar name={fullName} size="xs" src={avatarUrl} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1.5 z-50">
            <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
              <p className="text-sm font-semibold text-text-default capitalize leading-3.5 tracking-normal">
                {fullName}
              </p>
              <p className="text-xs text-text-gray font-normal leading-3.5 tracking-normal text-center">
                {role}
              </p>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Profile settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
}