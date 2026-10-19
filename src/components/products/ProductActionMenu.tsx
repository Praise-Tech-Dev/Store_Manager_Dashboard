import {  Edit, Trash2 } from "lucide-react";
import type { DashboardProduct } from "@/types/products";
import Copy from "@/assets/icons/copy.svg?react"
interface ProductActionMenuProps {
  product: DashboardProduct;
  onEdit?: (product: DashboardProduct) => void;
  onDelete?: (product: DashboardProduct) => void;
  onDuplicate?: (product: DashboardProduct) => void;
}

export const ProductActionMenu = ({
  product,
  onEdit,
  onDelete,
  onDuplicate,
}: ProductActionMenuProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {onDuplicate && (
        <button
          type="button"
          onClick={() => onDuplicate(product)}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          title="Duplicate product"
        >
          <Copy className="h-4 w-4" />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
          title="Edit product"
        >
          <Edit className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(product)}
          className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 cursor-pointer"
          title="Delete product"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
