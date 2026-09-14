export const AUTH_KEYS = {
  profile_detail: (userId: number) => ["currentUser", userId] as const,
};
