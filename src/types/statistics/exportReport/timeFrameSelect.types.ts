import type { TimeRangeOption } from "./timeRangeOption.types";

export interface TimeframeSelectProps {
  value: TimeRangeOption;
  onChange: (range: TimeRangeOption) => void;
}
