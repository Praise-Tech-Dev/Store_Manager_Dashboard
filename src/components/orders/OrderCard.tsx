import { CARD_TONE_STYLES, ORDER_CARD_THEMES } from "@/constants/orders/orderCard.constants";
import type { OrderCardProps } from "@/types/orders";

export const OrderCard = ({
  id,
  label,
  value,
  subtext,
  tone,
  loading = false,
}: OrderCardProps) => {
  const { Icon, iconWrapperClass, Watermark, watermarkClass } =
    ORDER_CARD_THEMES[id];

  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-2 shadow-xs sm:p-4">
      <Watermark
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-2.5 -right-4 h-20 sm:h-24 w-20 sm:w-24 opacity-10 ${watermarkClass}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          <span className="font-inter text-xs font-semibold tracking-[0.6px] text-text-gray">
            {label}
          </span>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full ${iconWrapperClass}`}
          >
            <Icon className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-4">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />
          ) : (
            <p className="font-inter text-2xl font-bold text-text-default xl:text-[32px]">
              {value}
            </p>
          )}
        </div>

        <p className={`mt-1 text-xs ${CARD_TONE_STYLES[tone]}`}>{subtext}</p>
      </div>
    </div>
  );
}
