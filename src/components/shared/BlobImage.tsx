import { useLayoutEffect, useRef, type ImgHTMLAttributes } from "react";

type BlobImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  blob: Blob;
};

/** Renders a Blob as an image, creating and revoking the object URL for you. */
export const BlobImage = ({ blob, alt, ...props }: BlobImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    const url = URL.createObjectURL(blob);
    image.src = url;
    return () => URL.revokeObjectURL(url);
  }, [blob]);

  return <img ref={imageRef} alt={alt} {...props} />;
};
