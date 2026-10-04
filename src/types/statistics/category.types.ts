export interface CategoryDistributionItem {
    id: string;
    name: string;
    value: number;
    percentage: number;
    color: string;
}

export interface TopCategoriesData {
    totalItems: number;
    categories: CategoryDistributionItem[];
}