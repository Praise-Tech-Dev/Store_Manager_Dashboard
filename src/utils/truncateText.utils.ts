import type { TruncateTextParams } from "@/types/truncateTextParams.types";

export const truncateText = ({
  text,
  maxLength,
}: TruncateTextParams): string =>
  text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
