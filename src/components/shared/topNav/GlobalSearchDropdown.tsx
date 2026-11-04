import type { MouseEvent } from "react";
import ordersIcon from "@/assets/icons/sidebar/orders.svg";
import usersIcon from "@/assets/icons/sidebar/users.svg";
import productsIcon from "@/assets/icons/sidebar/products.svg";
import type { GlobalSearchDropdownProps, SearchGroupKey } from "@/types/shared/search.types";
import { getOptionId, hasViewAll } from "@/utils/search/searchNavigation.utils";

const GROUP_ICONS: Record<SearchGroupKey, string> = {
  orders: ordersIcon,
  users: usersIcon,
  products: productsIcon,
};

export const GlobalSearchDropdown = ({
  listboxId,
  groups,
  starts,
  activeIndex,
  statusMessage,
  onSelect,
  onHover,
}: GlobalSearchDropdownProps) => {
  const highlight = (index: number) =>
    index === activeIndex ? "bg-slate-100" : "";

  // Everything an option needs apart from its look: shared by result rows
  // and "View all" rows so the two can't drift apart.
  const getOptionProps = (index: number, href: string) => ({
    id: getOptionId(listboxId, index),
    role: "option" as const,
    "aria-selected": index === activeIndex,
    onMouseDown: (e: MouseEvent) => e.preventDefault(), // keep focus in the input
    onMouseEnter: () => onHover(index),
    onClick: () => onSelect(href),
  });

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-slate-100 bg-white py-2 shadow-lg ring-1 ring-black/5">
      {statusMessage ? (
        <p role="status" className="px-4 py-3 text-sm text-text-gray">
          {statusMessage}
        </p>
      ) : (
        <div id={listboxId} role="listbox" aria-label="Search results">
          {groups.map((group, groupIndex) => {
            const start = starts[groupIndex];
            const headingId = `${listboxId}-group-${group.key}`;
            const viewAllIndex = start + group.items.length;

            return (
              <div key={group.key} role="group" aria-labelledby={headingId}>
                <div
                  id={headingId}
                  className="px-4 pb-1 pt-2 font-inter text-[11px] font-semibold uppercase tracking-wider text-text-gray"
                >
                  {group.label}
                </div>

                {group.items.map((item, itemIndex) => {
                  const index = start + itemIndex;
                  return (
                    <div
                      key={getOptionId(listboxId, index)}
                      {...getOptionProps(index, item.href)}
                      className={`flex cursor-pointer items-center gap-3 px-4 py-2 ${highlight(index)}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200">
                        <img
                          src={GROUP_ICONS[group.key]}
                          alt=""
                          className="h-4 w-4 object-contain"
                        />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-medium text-text-default">
                          {item.title}
                        </span>
                        <span className="truncate text-xs text-text-gray">
                          {item.subtitle}
                        </span>
                      </span>
                    </div>
                  );
                })}

                {hasViewAll(group) && (
                  <div
                    key={getOptionId(listboxId, viewAllIndex)}
                    {...getOptionProps(viewAllIndex, group.viewAllHref)}
                    className={`cursor-pointer py-2 pl-15 pr-4 text-xs font-medium text-primary ${highlight(viewAllIndex)}`}
                  >
                    View all {group.totalMatches} in {group.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
