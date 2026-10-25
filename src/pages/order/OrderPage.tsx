import { PendingCartsTable } from "@/components/carts/PendingCartsTable";
import { OrderFiltersBar } from "@/components/orders/OrderFiltersBar";
import { OrderTable } from "@/components/orders/OrderTable";
import { OrderTabs } from "@/components/orders/OrderTabs.";
import { ReturnsTable } from "@/components/returns/ReturnsTable";
import { Card } from "@/components/shared/Card";
import { DEFAULT_ORDER_FILTERS } from "@/constants/orders";
import { usePendingCarts } from "@/hooks/carts/usePendingCarts";
import { useOrdersView } from "@/hooks/orders/useOrdersView";
import { RETURN_MOCK_DATA } from "@/mock/data/returns.mock.data";
import { getOrderCardValues } from "@/utils/orders/getOrdersCardValues.utils";

export  const OrderPage = () => {
  const { orders, visibleOrders, pagination, filters, tab, setPage, updateFilters, changeTab, page } = useOrdersView();
  const { data : pendingCarts = [] , isLoading : isCartsLoading, isError: isCartsError, refetch: refetchCarts } = usePendingCarts();
  const card_data = getOrderCardValues({ orders, returns: RETURN_MOCK_DATA, pendingCarts });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between">
        <h1 className="font-inter text-3xl md:text-[32px] font-bold text-text-default leading-10 tracking-[-0.64px] align-middle">
          Orders & Carts
        </h1>
        <div className="font-inter font-normal text-text-gray text-sm leading-5 tracking-normal align-middle">
          Manage transactions, abandoned carts, and return processing.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>{card_data.totalOrders}</Card>
        <Card>{card_data.revenue}</Card>
        <Card>{card_data.abandonedCarts}</Card>
        <Card>{card_data.pendingReturnsCount}</Card>
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
