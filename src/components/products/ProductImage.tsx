import { useEffect, useState } from "react";
import placeholder from "@/assets/images/placeholder.jpg";
import { productImageStorage } from "@/storage/productImageStorage";
import { isLocalImageRef } from "@/utils/products/imageSource";
import { BlobImage } from "../shared/BlobImage";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export const ProductImage = ({ src, alt, className }: ProductImageProps) => {
  const localRef = isLocalImageRef(src) ? src : null;
  const [loaded, setLoaded] = useState<{ ref: string; blob?: Blob }>();
  const [failedSrc, setFailedSrc] = useState<string>();

  useEffect(() => {
    if (!localRef) return;
    let cancelled = false;
    productImageStorage.load(localRef).then((blob) => {
      if (!cancelled) setLoaded({ ref: localRef, blob });
    });
    return () => {
      cancelled = true;
    };
  }, [localRef]);

  const blob = localRef && loaded?.ref === localRef ? loaded.blob : undefined;
  const isFailed = !!src && failedSrc === src;
  const handleError = () => setFailedSrc(src ?? undefined);
  const fallback = <img src={placeholder} alt={alt} className={className} />;

  if (localRef) {
    return blob && !isFailed ? (
      <BlobImage
        blob={blob}
        alt={alt}
        className={className}
        onError={handleError}
      />
    ) : (
      fallback
    );
  }

  return src && !isFailed ? (
    <img src={src} alt={alt} className={className} onError={handleError} />
  ) : (
    fallback
  );
};
