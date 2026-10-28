import type { DashboardProduct, ProductTableProps } from "@/types/products"
import type { Column } from "@/types/table/Column.types"
import { formatCurrency } from "@/utils/statistics.utils"
import { useMemo } from "react"
import { ProductStatusBadge } from "./ProductStatusBadge"
import { ProductActionMenu } from "./ProductActionMenu"
import { Table } from "../shared/table/Table"
// import PLACEHOLDER_IMAGE from "../../assets/images/placeholder.jpg";
import { ProductImage } from "./ProductImage"
import { PublishStatusBadge } from "./PublishStatusBadge"

export const ProductTable = ({
  products,
  loading = false,
  pagination,
  onEdit,
  onDelete,
  onDuplicate,
  onClearFilters,
}: ProductTableProps) => {
  const columns: Column<DashboardProduct>[] = useMemo(() => {
    return [
      {
        key: "product",
        title: "Product",
        render: (product) => (
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden bg-[#ECEEF0] rounded-md">
              <ProductImage
                src={product.image || product.avatar}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-semibold text-text-default text-sm leading-7 tracking-normal align-middle">
                {product.title}
              </span>
              <span className="text-xs font-normal text-text-gray align-middle font-liberation">
                SKU: {product.sku}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "category",
        title: "Category",
        render: (product) => (
          <span className="font-inter text-sm font-normal text-text-gray capitalize leading-5 tracking-normal align-middle">
            {product.category}
          </span>
        ),
      },
      {
        key: "price",
        title: "Price",
        render: (product) => (
          <span className="text-sm font-normal font-liberation text-text-default leading-5 tracking-normal">
            {formatCurrency(product.price)}
          </span>
        ),
      },
      {
        key: "status",
        title: "Status",
        render: (product) => (
          <ProductStatusBadge
            status={product.status}
            stockCount={product.stockCount}
          />
        ),
      },
      {
        key: "publishStatus",
        title: "Publish Status",
        render: (product) => (
          <PublishStatusBadge status={product.publishStatus} />
        ),
      },
      {
        key: "actions",
        title: "Actions",
        className: "text-right",
        render: (product) => (
          <ProductActionMenu
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        ),
      },
    ];
  }, [onEdit, onDelete, onDuplicate]);
  return (
    <Table
      columns={columns}
      data={products}
      loading={loading}
      pagination={pagination}
      emptyMessage="No products match your criteria"
      onClearFilters={onClearFilters}
      paginationVariant="detailed"
      entityName="products"
      avatarVariant="square"
      activePageColorClass="bg-[#4F46E5] text-[#DAD7FF]"
    />
  );
};