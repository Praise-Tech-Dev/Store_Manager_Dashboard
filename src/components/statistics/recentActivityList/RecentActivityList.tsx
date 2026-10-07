import type { RecentActivityListProps } from "@/types/statistics/recentActivity/recentActivityListProps.types";
import { ActivityIcon } from "./ActivityIcon";

export const RecentActivityList = ({
  activities,
  onViewAll,
}: RecentActivityListProps) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-4 sm:p-6 shadow-xs gap-6">
      {/* Card Header */}
      <div className="">
        <h2 className="font-inter text-xl font-semibold tracking-normal text-text-default leading-7 align-middle">
          Recent Activity
        </h2>
      </div>

      {/* Activity Timeline List */}
      <div className="relative flex flex-col gap-4">
        {/* Faint vertical connecting timeline line */}
        <div className="hidden sm:block absolute left-5 top-5 bottom-5 w-px -translate-x-1/2 bg-[#E0E3E5]" />

        {activities.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-surface-light sm:bg-white"
          >
            {/* Left Icon & text details */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className=" relative z-10 bg-white">
                <ActivityIcon type={item.type} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-text-default leading-5 tracking-normal font-inter align-middle">
                  {item.title}
                </p>
                <p className="text-xs font-normal text-text-gray leading-4 tracking-normal font-inter align-middle">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Amount and timestamp */}
            <div className="flex flex-col items-end shrink-0 text-right gap-[5.5px]">
              {item.amount && (
                <p
                  className={`text-[13px] font-medium font-liberation leading-4.5 align-middle tracking-normal text-right ${
                    item.isNegativeAmount ? "text-danger" : "text-text-default"
                  }`}
                >
                  {item.amount}
                </p>
              )}
              <p className="text-xs text-text-gray font-normal font-inter leading-4 align-middle tracking-normal text-right">
                {item.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Activity Footer */}
      <div className="pt-2 leading-4 tracking-[1.1px] align-middle text-center">
        <button
          type="button"
          onClick={onViewAll}
          className="text-[11px] font-semibold font-inter uppercase text-primary hover:text-[#3730A3] transition-colors cursor-pointer "
        >
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivityList;
