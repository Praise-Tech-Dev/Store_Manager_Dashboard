
/**
 * Returns an avatar image URL if the user has one,
 * or generates a consistent avatar placeholder using their name/seed.
 */
export const getUserAvatarUrl = (
  name: string,
  customSrc?: string | null,
): string => {
  if (customSrc) return customSrc;

  // Uses a free, consistent avatar service based on the person's name
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
};

/**
 * Safely formats full name from an object or string
 */
export const formatFullName = (
  firstname?: string,
  lastname?: string,
): string => {
  if (!firstname && !lastname) return "Unknown User";
  return `${firstname ?? ""} ${lastname ?? ""}`.trim();
};
