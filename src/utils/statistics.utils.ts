export const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatPercentage = (
  numerator: number,
  denominator: number,
): number => {
  if (denominator <= 0) return 0;
  return Math.round((numerator / denominator) * 100);
};
