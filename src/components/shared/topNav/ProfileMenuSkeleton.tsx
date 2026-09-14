import { Skeleton } from "../Skeleton";

export const ProfileMenuSkeleton = () => (
  <div className="flex items-center gap-3">
    <div className="hidden sm:flex flex-col items-end gap-1.5">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="h-2.5 w-16" />
    </div>
    <Skeleton className="h-10 w-10 rounded-full" />
  </div>
);
