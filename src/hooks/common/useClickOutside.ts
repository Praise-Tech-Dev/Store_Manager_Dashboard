import type { UseClickOutsideParams } from "@/types/shared/useClickOutside.types";
import { useEffect } from "react";

export const useClickOutside = (
    { ref, onOutsideClick }: UseClickOutsideParams
  ) => {
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref, onOutsideClick]);
};
