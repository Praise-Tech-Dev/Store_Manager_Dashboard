import type { TableSkeletonProps } from "@/types/table/tableSkeleton.types";

export const TableSkeleton = ({
  rows = 5,
  columnsCount = 6,
  avatarVariant="circle",
}: TableSkeletonProps) => {
  const rowList: number[] = [];
  const colList: number[] = [];

  for (let i = 0; i < rows; i++) rowList.push(i);
  for (let j = 0; j < columnsCount; j++) colList.push(j);

  const avatarStyles =
    avatarVariant === "square"
      ? "h-12 w-12 rounded-md shrink-0" 
      : "h-10 w-10 rounded-full shrink-0"; 

  return (
    <>
      {rowList.map((rIdx) => (
        <tr key={rIdx} className="border-b border-slate-100 last:border-b-0">
          {colList.map((cIdx) => (
            <td key={cIdx} className="whitespace-nowrap px-5 py-4 sm:px-6">
              {cIdx === 0 ? (
                // small avatar / icon pill + title line for  Leading column
                <div className="flex items-center gap-3">
                  <div
                    className={`animate-pulse bg-slate-200 ${avatarStyles}`}
                  />
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                </div>
              ) : cIdx === columnsCount - 1 ? (
                // Trailing actions column
                <div className="flex justify-end">
                  <div className="h-4 w-4 animate-pulse rounded bg-slate-200" />
                </div>
              ) : (
                // Standard data column
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
