import type { CustomerCellProps } from "@/types/shared/tableCellProps.types";
import { Avatar } from "./Avatar";

export const CustomerCell = ({ name }: CustomerCellProps) => (
  <div className="flex items-center gap-3">
    <Avatar name={name} size="sm" variant="neutral" />
    <span className="font-medium text-text-default capitalize">{name}</span>
  </div>
);