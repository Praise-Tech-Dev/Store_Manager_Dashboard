export type AvatarVariant = "coloured" | "neutral";

export type AvatarSize = "sm" | "xs" | "md" | "lg";

export type AvatarProps = {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  variant?: AvatarVariant;
};
export interface GetInitialsParams {
  name: string;
}

export interface GetAvatarColorParams {
  name: string;
}