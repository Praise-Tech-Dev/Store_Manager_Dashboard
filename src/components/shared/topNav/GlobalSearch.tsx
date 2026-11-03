import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/shared/SearchInput";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import { useGlobalSearch } from "@/hooks/search/useGlobalSearch";

export const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocused, setHasFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { groups, isSearching, isFetching } = useGlobalSearch({
    query,
    enabled: hasFocused,
  });

  useClickOutside({
    ref: containerRef,
    onOutsideClick: () => setIsOpen(false),
  });

  const handleSelect = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery("");
  };

  const showPanel = isOpen && isSearching;

  return (
    <div ref={containerRef} className="relative w-full min-w-0 max-w-md">
      <SearchInput
        value={query}
        placeholder="Search transactions, users, SKU…"
        aria-label="Search transactions, users and products"
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setHasFocused(true);
          setIsOpen(true);
        }}
        onClear={() => setQuery("")}
        rounded="rounded-full"
      />

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-slate-100 bg-white py-2 shadow-lg ring-1 ring-black/5">
          {groups.length === 0 ? (
            <p className="px-4 py-3 text-sm text-text-gray">
              {isFetching ? "Searching…" : `No results for “${query.trim()}”`}
            </p>
          ) : (
            groups.map((group) => (
              <section key={group.key}>
                <h3 className="px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-text-gray">
                  {group.label}
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(item.href)}
                        className="flex w-full flex-col px-4 py-2 text-left hover:bg-slate-50"
                      >
                        <span className="truncate text-sm font-medium text-text-default">
                          {item.title}
                        </span>
                        <span className="truncate text-xs text-text-gray">
                          {item.subtitle}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                {group.totalMatches > group.items.length && (
                  <button
                    type="button"
                    onClick={() => handleSelect(group.viewAllHref)}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-primary hover:bg-slate-50"
                  >
                    View all {group.totalMatches} in {group.label}
                  </button>
                )}
              </section>
            ))
          )}
        </div>
      )}
    </div>
  );
};
