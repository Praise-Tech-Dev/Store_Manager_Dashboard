export const sanitizeCsvField = (
  field: string | number | undefined | null,
): string => {
  if (field === null || field === undefined) return '""';
  const stringified = String(field);
  return `"${stringified.replace(/"/g, '""')}"`;
};

export const createCsvRow = (
  fields: readonly (string | number | undefined | null)[],
): string => {
  return fields.map(sanitizeCsvField).join(",");
};

export const triggerCsvDownload = (
  csvContent: string,
  filename: string,
): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
