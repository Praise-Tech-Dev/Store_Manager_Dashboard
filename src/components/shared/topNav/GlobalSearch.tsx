import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/shared/SearchInput";
import { SEARCH_MIN_LENGTH } from "@/constants/search.constants";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import { useGlobalSearch } from "@/hooks/search/useGlobalSearch";
import {
  buildSearchNavigation,
  clampIndex,
  getOptionId,
  moveIndex,
} from "@/utils/search/searchNavigation.utils";
import { GlobalSearchDropdown } from "./GlobalSearchDropdown";

export const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const navigate = useNavigate();

  const { groups, isSearching, isFetching } = useGlobalSearch({
    query,
    enabled: hasFocused,
  });

  useClickOutside({
    ref: containerRef,
    onOutsideClick: () => setIsOpen(false),
  });

  const { starts, hrefs } = useMemo(
    () => buildSearchNavigation(groups),
    [groups],
  );

  // The dropdown shows as soon as something is typed: a hint for a short
  // query, then results (or a status message) once it is long enough.
  const showDropdown = isOpen && query.trim().length > 0;
  const showResults = showDropdown && isSearching && hrefs.length > 0;
  // Results can shrink while the person is on row 5; keep the highlight valid
  const safeIndex = clampIndex({ index: activeIndex, length: hrefs.length });

  const statusMessage = !isSearching
    ? `Type at least ${SEARCH_MIN_LENGTH} characters to search`
    : isFetching
      ? "Searching…"
      : `No results for “${query.trim()}”`;

  const activeOptionId =
    showResults && safeIndex >= 0
      ? getOptionId(listboxId, safeIndex)
      : undefined;

  // Keep the highlighted row visible when the list scrolls
  useEffect(() => {
    if (activeOptionId) {
      document
        .getElementById(activeOptionId)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeOptionId]);

  const handleSelect = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault(); // stop the text cursor jumping to the start/end
        if (!showDropdown) {
          setIsOpen(true);
          return;
        }
        if (hrefs.length === 0) return;
        setActiveIndex(
          moveIndex({
            current: safeIndex,
            step: e.key === "ArrowDown" ? 1 : -1,
            length: hrefs.length,
          }),
        );
        return;
      }
      case "Enter": {
        if (showResults && safeIndex >= 0) {
          e.preventDefault();
          handleSelect(hrefs[safeIndex]);
        }
        return;
      }
      case "Escape": {
        if (showDropdown) setIsOpen(false);
        else setQuery("");
        return;
      }
      case "Tab": {
        setIsOpen(false);
        return;
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-w-0 max-w-md">
      <SearchInput
        value={query}
        placeholder="Search transactions, users, SKU…"
        aria-label="Search transactions, users and products"
        role="combobox"
        aria-expanded={showResults}
        aria-controls={showResults ? listboxId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={activeOptionId}
        autoComplete="off"
        rounded="rounded-full"
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => {
          setHasFocused(true);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        onClear={() => {
          setQuery("");
          setActiveIndex(0);
        }}
      />

      {showDropdown && (
        <GlobalSearchDropdown
          listboxId={listboxId}
          groups={groups}
          starts={starts}
          activeIndex={safeIndex}
          statusMessage={showResults ? null : statusMessage}
          onSelect={handleSelect}
          onHover={setActiveIndex}
        />
      )}
    </div>
  );
};
