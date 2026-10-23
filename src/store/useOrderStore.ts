import { ORDERS_MOCK_DATA } from "@/mock/data/orders.mock.data";
import type { OrderStoreState } from "@/types/orders/orderStore.types";
import { getNextOrderIdentifiers } from "@/utils/orders/orderIdentifiers.utils";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useOrderStore = create<OrderStoreState>()(
  persist((set) => ({
    createdOrders: [],
    cancelledIds: [],

    createOrder: (newOrder) =>
      set((state) => ({
        createdOrders: [
            { ...newOrder, 
                ...getNextOrderIdentifiers({
                    orders: [...ORDERS_MOCK_DATA, ...state.createdOrders],
                })
            }, 
            ...state.createdOrders,
        ],
      })
    ),

    cancelOrder: (id) => 
        set((state) => ({
            cancelledIds: state.cancelledIds.includes(id)
            ? state.cancelledIds
            : [...state.cancelledIds, id],
        })),
    
    resetOrders: () => set({ createdOrders: [], cancelledIds: [] }),
  }),
  {
    name: "order-storage",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        createdOrders: state.createdOrders,
        cancelledIds: state.cancelledIds,
    }),
  }
),
    
);