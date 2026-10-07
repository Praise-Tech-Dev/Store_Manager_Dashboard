export interface CategoryTooltipPayloadItem {
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
    percentage: number | string;
    color: string;
  };
}

export interface CategoryTooltipProps {
  active?: boolean;
  payload?: CategoryTooltipPayloadItem[];
}
