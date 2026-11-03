import type { RefObject } from "react";

export interface UseClickOutsideParams {
  ref: RefObject<HTMLElement | null>;
  onOutsideClick: () => void;
}
