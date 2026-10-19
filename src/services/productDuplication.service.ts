import { productImageStorage } from "@/storage/productImageStorage";
import { isLocalImageRef } from "@/utils/products/imageSource";

export const productDuplicationService = {
  /** Local images are copied as bytes (createProduct saves them under a new id).
   *  Remote URLs aren't ours, so they're shared. */
  async resolveImage(ref: string): Promise<Blob | string | undefined> {
    if (!ref) return undefined;
    if (!isLocalImageRef(ref)) return ref;
    return productImageStorage.load(ref); 
  },
};
