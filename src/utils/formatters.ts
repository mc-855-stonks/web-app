export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
