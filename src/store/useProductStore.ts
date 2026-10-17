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
                set((state) => {
                    const remainingEdits = {...state.userEdits };
                    delete remainingEdits[id];
                    return {
                        deletedIds: state.deletedIds.includes(id)
                            ? state.deletedIds
                            : [...state.deletedIds, id],
                        userEdits: remainingEdits,
                        userCreatedProducts: state.userCreatedProducts.filter((p) => p.id !== id),
                    }
                    }
                ),
        }),    
        {
            name: "product-catalog-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)