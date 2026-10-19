import { useMemo } from "react";
import { useDuplicateProduct } from "@/hooks/products";
import { useProductStore } from "@/store/useProductStore";
import { DUPLICATE_NAME_SUFFIX } from "@/constants/products/productDuplicate.constants";
import { getNextProductId } from "@/utils/products/getNextProductIId";
import type { DuplicateProductModalProps } from "@/types/products/productModal";
import { Modal } from "../../shared/Modal";
import Copy from "@/assets/icons/copy.svg?react";
import { CopyIcon } from "lucide-react";

export const DuplicateProductModal = ({
  isOpen,
  onClose,
  product,
  existingProducts = [],
}: DuplicateProductModalProps) => {
  const { mutate: duplicate, isPending } = useDuplicateProduct();
  const deletedIds = useProductStore((state) => state.deletedIds);

  const nextId = useMemo(
    () => getNextProductId(existingProducts, deletedIds),
    [existingProducts, deletedIds],
  );

  if (!product) return null;

  // Backdrop click and Escape also route through here: no closing mid-copy
  const handleClose = () => {
    if (!isPending) onClose();
  };

  const handleConfirm = () =>
    // Raw onClose is intentional: isPending is still true when onSuccess fires
    duplicate({ product, nextId }, { onSuccess: onClose });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Duplicate Product"
      icon={Copy}
      headerBorder=""
      headerPadding="px-6 py-4"
      footerBorder=""
      bodyClassName="px-6 py-4"
      cancelVariant="ghost"
      confirmText="Duplicate Product"
      confirmIcon={<CopyIcon className="h-4 w-4" />}
      confirmIconPosition="left"
      confirmLoading={isPending}
      onConfirm={handleConfirm}
    >
      <p className="font-inter text-sm leading-5 text-text-gray tracking-normal align-middle">
        Are you sure you want to create a copy of{" "}
        <span className="text-text-default">"{product.title}"</span>? This will
        create a new product entry with "{DUPLICATE_NAME_SUFFIX}" appended to
        the name.
      </p>
    </Modal>
  );
};
