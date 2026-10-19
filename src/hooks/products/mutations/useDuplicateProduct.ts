import { useMutation } from "@tanstack/react-query";
import { useCreateProduct } from "./useCreateProduct";
import type { DuplicateProductVariables } from "@/types/products/duplicateProductVariables.types";
import { productDuplicationService } from "@/services/productDuplication.service";
import { buildDuplicateInput } from "@/utils/products/productDuplicator";


export const useDuplicateProduct = () => {
  const { mutateAsync: createDuplicateProduct } = useCreateProduct();

  return useMutation({
    networkMode: "always",
    mutationFn: async ({ product, nextId }: DuplicateProductVariables) => {
      const image = await productDuplicationService.resolveImage(product.image);
      return createDuplicateProduct(
        buildDuplicateInput(product, nextId, image),
      );
    },
  });
};
