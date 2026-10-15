const LOCAL_IMAGE_PREFIX = "idb:";

/** Builds the reference a product stores for an image kept in IndexedDB. */
export const toLocalImageRef = (id: string): string =>
  `${LOCAL_IMAGE_PREFIX}${id}`;

/** True when the value points at an image stored locally rather than a remote URL. */
export const isLocalImageRef = (value?: string | null): value is string =>
  !!value?.startsWith(LOCAL_IMAGE_PREFIX);

export const getLocalImageId = (ref: string): string =>
  ref.slice(LOCAL_IMAGE_PREFIX.length);
