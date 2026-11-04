import type {
  ClampIndexParams,
  MoveIndexParams,
  SearchNavigation,
  SearchResultGroup,
} from "@/types/shared/search.types";

export const hasViewAll = (group: SearchResultGroup): boolean =>
  group.totalMatches > group.items.length;

export const buildSearchNavigation = (
  groups: SearchResultGroup[],
): SearchNavigation => {
  const hrefs: string[] = [];
  const starts: number[] = [];

  groups.forEach((group) => {
    starts.push(hrefs.length);
    group.items.forEach((item) => hrefs.push(item.href));
    if (hasViewAll(group)) hrefs.push(group.viewAllHref);
  });

  return { hrefs, starts };
};

// Keeps the highlight inside the list
export const clampIndex = ({ index, length }: ClampIndexParams): number =>
  length === 0 ? -1 : Math.min(index, length - 1);

// Moves the highlight one row and wraps around at both ends
export const moveIndex = ({ current, step, length }: MoveIndexParams): number =>
  (current + step + length) % length;

export const getOptionId = (listboxId: string, index: number): string =>
  `${listboxId}-option-${index}`;