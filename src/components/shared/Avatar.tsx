import { AVATAR_NEUTRAL_STYLE, AVATAR_SIZES } from "@/constants/avatar.constants";
import type { AvatarProps } from "@/types/shared/avatar.types";
import { getAvatarColor, getInitials } from "@/utils/avatar.utils";
import  { useState } from "react";



export const Avatar = ({
  src,
  alt = "User avatar",
  name = "",
  size = "md",
  variant = "coloured",
  className = "",
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  // Validate that src is an actual valid URL
  const isValidSrc = Boolean(
    src &&
    !hasError &&
    (src.startsWith("http://") ||
      src.startsWith("https://") ||
      (src.startsWith("data:image/") && src.includes(";base64,"))),
  );

  const fallbackStyle =
    variant === "neutral" ? AVATAR_NEUTRAL_STYLE : getAvatarColor({ name });

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none ${AVATAR_SIZES[size]} ${
        isValidSrc ? "" : fallbackStyle
      } ${className}`}
    >
      {isValidSrc ? (
        <img
          key={src}
          src={src!}
          alt={alt}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials({name})}</span>
      )}
    </div>
  );
};
