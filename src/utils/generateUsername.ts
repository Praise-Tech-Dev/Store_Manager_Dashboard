export const generateUsername = (firstname: string): string => {
  const timestamp = Date.now().toString().slice(-4);
  return `${firstname.toLowerCase().replace(/[^a-z0-9]/g, "")}_${timestamp}`;
};
