import { createStore, del, get, set, type UseStore } from "idb-keyval";
import {
  getLocalImageId,
  isLocalImageRef,
  toLocalImageRef,
} from "@/utils/products/imageSource";

// Created lazily so importing this module never touches IndexedDB by itself
let imageStore: UseStore | undefined;
const getImageStore = (): UseStore =>
  (imageStore ??= createStore("store-manager-images", "images"));

export const productImageStorage = {
  /** Saves the image and returns the reference to keep on the product. */
  async save(image: Blob): Promise<string> {
    const id = crypto.randomUUID();
    await set(id, image, getImageStore());
    return toLocalImageRef(id);
  },

  /** Loads a stored image. Failures degrade to "no image" so the UI shows the placeholder. */
  async load(ref: string): Promise<Blob | undefined> {
    if (!isLocalImageRef(ref)) return undefined;
    try {
      return await get<Blob>(getLocalImageId(ref), getImageStore());
    } catch (error) {
      console.error("[productImageStorage] read failed", error);
      return undefined;
    }
  },

  async remove(ref: string): Promise<void> {
    if (!isLocalImageRef(ref)) return;
    try {
      await del(getLocalImageId(ref), getImageStore());
    } catch (error) {
      console.error("[productImageStorage] delete failed", error);
    }
  },
};
