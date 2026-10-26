import { PendingCartsTable } from "@/components/carts/PendingCartsTable";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrderFiltersBar } from "@/components/orders/OrderFiltersBar";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderTabs } from "@/components/orders/OrderTabs.";
import { ReturnsTable } from "@/components/returns/ReturnsTable";
import { DEFAULT_ORDER_FILTERS } from "@/constants/orders";
import { usePendingCarts } from "@/hooks/carts/usePendingCarts";
import { useOrderCards } from "@/hooks/orders/useOrderCards";
import { useOrdersView } from "@/hooks/orders/useOrdersView";
import { RETURN_MOCK_DATA } from "@/mock/data/returns.mock.data";

export  const OrderPage = () => {
  const { periodOrders, visibleOrders, pagination, filters, tab, setPage, updateFilters, changeTab, page } = useOrdersView();
  const { data : pendingCarts = [] , isLoading : isCartsLoading, isError: isCartsError, refetch: refetchCarts } = usePendingCarts();

  const cards = useOrderCards({
    orders: periodOrders,
    dateRange: filters.dateRange,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2">
        <h1 className="font-inter text-3xl md:text-[32px] font-bold text-text-default leading-10 tracking-[-0.64px] align-middle">
          Orders & Carts
        </h1>
        <div className="font-inter font-normal text-text-gray text-sm leading-5 tracking-normal align-middle">
          Manage transactions, abandoned carts, and return processing.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <OrderCard key={card.label} {...card} />
        ))}
      </div>

      <section className="rounded-xl bg-white shadow-sm">
        <OrderTabs tab={tab} onChange={changeTab} />

        {tab === "all" && (
          <>
            <OrderFiltersBar filters={filters} onChange={updateFilters} />
            <div className="px-4">
              <OrderTable
                orders={visibleOrders}
                pagination={{ ...pagination, onPageChange: setPage }}
                onClearFilters={() => updateFilters(DEFAULT_ORDER_FILTERS)}
              />
            </div>
          </>
        )}

        {tab === "pending" && (
          <div className="px-4">
            <PendingCartsTable
              carts={pendingCarts}
              page={page}
              loading={isCartsLoading}
              isError={isCartsError}
              onRetry={() => void refetchCarts()}
              onPageChange={setPage}
            />
          </div>
        )}

        {tab === "returns" && (
          <div className="px-4">
            <ReturnsTable
              returns={RETURN_MOCK_DATA}
              page={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}
