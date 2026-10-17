import { CategorySelect } from "@/components/products/CategorySelect";
import { AddProductModal } from "@/components/products/ProductModals/AddProductModal";
import { DeleteProductModal } from "@/components/products/ProductModals/DeleteProductModal";
import { EditProductModal } from "@/components/products/ProductModals/EditProductModal";
import { ProductTable } from "@/components/products/ProductTable";
import { StatusSelect } from "@/components/products/StatusSelect";
import Button from "@/components/shared/Button";
import { SearchInput } from "@/components/shared/SearchInput";
import { useDashboardProducts } from "@/hooks/products";
import { useProductTableFilters } from "@/hooks/products/useProductFilters";
import type { DashboardProduct } from "@/types/products";
import { Plus } from "lucide-react";
import { useState } from "react";

export const ProductPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DashboardProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<DashboardProduct | null>(null);
  const { data: allProducts = [], isLoading, error } = useDashboardProducts();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    selectedStatus,
    setCategory,
    setStatus,
    currentPage,
    totalPages,
    setPage,
    totalItems,
    pageSize,
    paginatedProducts,
    clearFilters,
  } = useProductTableFilters(allProducts);

  // const totalProducts = allProducts.length;
  const isFiltered = Boolean(
    searchTerm.trim() ||
    selectedCategory !== "Category" ||
    selectedStatus !== "Status",
  );

  if (error) return <div>Error loading products</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-xl bg-[#F2F4F6] p-6 shadow-sm gap-4 sm:gap-0">
        <h1 className="font-inter text-3xl md:text-[32px] font-bold text-text-default leading-10 tracking-[-0.64px] align-middle">
          Products
        </h1>
        <Button
          variant="primary"
          iconLeft={<Plus className="w-3.5 h-3.5 text-white" />}
          className="rounded-lg px-6 py-3 gap-[7.99px] w-full sm:w-auto"
          disabled={isLoading}
          onClick={() => setIsAddModalOpen(true)}
        >
          <span className=" font-semibold font-inter text-lg md:text-[20px] leading-7 tracking-normal text-center align-middle">
            Add Product
          </span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
        {/* Search Input */}
        <div className="w-full sm:max-w-[384px]">
          <SearchInput
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>

        {/* Reusable Category Select */}
        <div className="w-full sm:max-w-40.25">
          <CategorySelect value={selectedCategory} onChange={setCategory} />
        </div>

        {/* Reusable Status Select */}
        <div className="w-full sm:max-w-40.25">
          <StatusSelect value={selectedStatus} onChange={setStatus} />
        </div>
      </div>

      <ProductTable
        products={paginatedProducts}
        loading={isLoading}
        pagination={{
          currentPage,
          totalPages: totalPages,
          totalItems: totalItems,
          pageSize,
          onPageChange: setPage,
        }}
        onClearFilters={isFiltered ? clearFilters : undefined}
        onEdit={setEditingProduct}
        onDelete={setDeletingProduct}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        existingProducts={allProducts}
      />

      <EditProductModal
        isOpen={editingProduct !== null}
        product={editingProduct}
        existingProducts={allProducts}
        onClose={() => setEditingProduct(null)}
        onRequestDelete={(p) => {
          setEditingProduct(null);
          setDeletingProduct(p);
        }}
      />

      <DeleteProductModal
        product={deletingProduct}
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
      />
    </div>
  );
};
