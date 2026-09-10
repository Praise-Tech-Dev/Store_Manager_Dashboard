interface TableSkeletonProps {
  rows?: number;
  columnsCount?: number;
}

export const TableSkeleton = ({
  rows = 5,
  columnsCount = 6,
}: TableSkeletonProps) => {
  const rowList: number[] = [];
  const colList: number[] = [];

  for (let i = 0; i < rows; i++) rowList.push(i);
  for (let j = 0; j < columnsCount; j++) colList.push(j);

  return (
    <>
      {rowList.map((rIdx) => (
        <tr key={rIdx} className="border-b border-slate-100 last:border-b-0">
          {colList.map((cIdx) => (
            <td key={cIdx} className="whitespace-nowrap px-5 py-4 sm:px-6">
              {cIdx === 0 ? (
                // small avatar / icon pill + title line for  Leading column
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-slate-200" />
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
