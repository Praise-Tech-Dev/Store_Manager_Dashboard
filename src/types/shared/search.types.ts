export interface SearchInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "size"
> {
  onClear: () => void;
  containerClassName?: string;
  rounded?: string;
}

export type SearchGroupKey = "orders" | "users" | "products";
export interface SearchResultItem {
  id: string; // unique across groups for aria-activedescendant
  title: string;
  subtitle: string;
  href: string;
}

export interface SearchResultGroup {
  key: SearchGroupKey;
  label: string;
  items: SearchResultItem[];
  totalMatches: number;
  viewAllHref: string;
}

export interface UseGlobalSearchParams {
  query: string;
  enabled: boolean; // becomes true on the first focus of the search box
}

export interface BuildGroupParams<T> {
  key: SearchGroupKey;
  label: string;
  matches: T[];
  toItem: (match: T) => SearchResultItem;
  viewAllHref: string;
}