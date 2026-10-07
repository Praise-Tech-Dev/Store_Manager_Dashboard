export const StatisticsLoader = () => {
    return (
      <div className=" space-y-6 animate-pulse">
        <div className="flex justify-between items-center h-10 bg-slate-200 rounded-lg w-full max-w-sm" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-52 rounded-xl bg-slate-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-120 rounded-xl bg-slate-200" />
          <div className="h-120 rounded-xl bg-slate-200" />
        </div>
        <div className="h-72 rounded-xl bg-slate-200" />
      </div>
    );
}