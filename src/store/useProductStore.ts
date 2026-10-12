import { createJSONStorage, persist } from 'zustand/middleware';
import type { ProductStoreState } from '@/types/products/productStore.types'
import { create } from 'zustand'

export const useProductStore = create<ProductStoreState>()(
    persist(
        (set) => ({
            userEdits: {},
            userCreatedProducts: [],
            deletedIds: [],
            recordEdit: (id, payload) =>
                set((state) => ({
                    userEdits: {
                        ...state.userEdits,
                        [id]: { ...(state.userEdits[id] || {}), ...payload },
                    },
                })),

            recordCreation: (newProduct) =>
                set((state) => ({
                    userCreatedProducts: [newProduct, ...state.userCreatedProducts],
                })),
            
            recordDeletion: (id) =>
                set((state) => ({
                    deletedIds: [...state.deletedIds, id],
                })),
        }),    
        {
            name: "product-catalog-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)