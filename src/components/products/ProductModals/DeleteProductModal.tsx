import { Modal } from "@/components/shared/Modal";
import { useDeleteProduct } from "@/hooks/products"
import type { DeleteProductModalProps } from "@/types/products"
import { AlertTriangle, Info } from "lucide-react";


export const DeleteProductModal = ({
    product,
    isOpen,
    onClose,
}: DeleteProductModalProps) => {
    const { mutate: deleteProduct, isPending } = useDeleteProduct();

    const handleDelete = () => {
        if (!product) return;
        deleteProduct(product, {
          onSuccess: () => {
            onClose();
          },
        });
    }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="delete"
      title="Delete Product"
      icon={AlertTriangle}
      iconVariant="danger"
      maxWidth="sm"
      bodyClassName=""
      footerBg="bg-[#ECEEF080]/50"
      confirmText="Delete Product"
      confirmVariant="danger"
      confirmLoading={isPending}
      onConfirm={handleDelete}
      cancelText="Cancel"
      showCloseButton={false}
    >
      <div className="space-y-3.5 text-left">
        <p className="text-xs leading-relaxed text-slate-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900">{product?.title}</span>
          ? This action cannot be undone and the product will be permanently
          removed from your catalogue.
        </p>

        <div className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p className="text-[11px] leading-relaxed">
            The product, its uploaded image and any saved edits will be removed
            from your catalogue.
          </p>
        </div>
      </div>
    </Modal>
  );
}
