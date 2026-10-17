import type { EditProductModalProps } from "@/types/products";
import { EditProductForm } from "./EditProductForm";

export const EditProductModal = ({
  product,
  ...rest
}: EditProductModalProps) => {
  if (!product) return null;
  return <EditProductForm key={product.id} product={product} {...rest} />;
};
