import type { AvatarProps } from "@/types/shared/avatar.types";
import  { useState } from "react";



export const Avatar = ({
  src,
  alt = "User avatar",
  name = "",
  size = "md",
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

  const getInitials = (str: string) => {
    if (!str) return "U";
    const parts = str.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const getColorFromName = (str: string) => {
    const colors = [
      "bg-blue-600 text-white",
      "bg-indigo-600 text-white",
      "bg-purple-600 text-white",
      "bg-amber-600 text-white",
      "bg-emerald-600 text-white",
      "bg-rose-600 text-white",
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const sizes = {
    sm: "h-8 w-8 text-xs",
    xs: "h-9 w-9 text-sm",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none ${sizes[size]} ${
        !isValidSrc ? getColorFromName(name) : ""
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
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
