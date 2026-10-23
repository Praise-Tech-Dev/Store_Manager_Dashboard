import type { ParseSelectOptionParams } from "@/types/orders/orderUtils.types";

export const parseSelectOption = <T extends string>({
  value,
  options,
  fallback,
}: ParseSelectOptionParams<T>): T =>
  options.find((option) => option.value === value)?.value ?? fallback;
