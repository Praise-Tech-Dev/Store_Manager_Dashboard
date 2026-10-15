const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SOURCE_BYTES = 10 * 1024 * 1024;
const MAX_DIMENSION = 800;
const JPEG_QUALITY = 0.85;

/** Value for the file input's `accept` attribute. */
export const IMAGE_ACCEPT = ACCEPTED_IMAGE_TYPES.join(",");

/** Validates, downsizes and compresses an uploaded image before it is stored. */
export const prepareImageForStorage = async (file: File): Promise<Blob> => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Use a JPEG, PNG or WebP image.");
  }
  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error("Image must be 10 MB or smaller.");
  }

  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Image processing is not supported here.");

    // JPEG has no transparency: paint white first so transparent PNGs don't turn black
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob) throw new Error("Could not process the image.");
    return blob;
  } finally {
    bitmap.close();
  }
};
