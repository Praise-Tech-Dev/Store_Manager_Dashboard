export type ProductCategory = "electronics" | "jewelery" | "men's clothing"|"women's clothing"

export interface ProductCategoryOption {
  value: ProductCategory | "Category";
  label: string;
}