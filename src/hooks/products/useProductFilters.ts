import type { DashboardProduct, ProductStatus } from "@/types/products";
import type { ProductCategory } from "@/types/products/productCategory.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../common/useDebounce";

const PAGE_SIZE = 3;

export const useProductTableFilters = (products: DashboardProduct[] = []) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const urlSearch = searchParams.get("search") ?? "";
    const urlCategory = (searchParams.get("category") as ProductCategory | "Category") ?? "Category";
    const urlStatus = (searchParams.get("status") as ProductStatus | "Status") ?? "Status";
    const urlPage = parseInt(searchParams.get("page") ?? "1", 10);

    const [searchTerm, setSearchTerm] = useState(urlSearch);

    // store previous url value
    const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
    
    if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchTerm(urlSearch);
    }

    const debouncedSearch = useDebounce(searchTerm, 400);
    
      useEffect(() => {
        const trimmed = debouncedSearch.trim();
    
        // Prevent pushing stale debounced text if user or clearFilters cleared the input
        if (searchTerm === "" && urlSearch === "") return;
        // Guard to prevent pushing if it already matches
        if (trimmed === urlSearch) return;
    
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            if (trimmed) {
              next.set("search", trimmed);
            } else {
              next.delete("search");
            }
            next.set("page", "1");
            return next;
          },
          // Prevent cluttering browser on ever keystroke
          { replace: true },
        );
      }, [debouncedSearch, searchTerm, urlSearch, setSearchParams]);


    const filteredProducts = useMemo(() => {
        const query = urlSearch.trim().toLowerCase();

        return products.filter((product) => {
            const title = (product.title).toLowerCase() ?? "";
            const category = (product.category).toLowerCase() ?? "";
            const sku = (product.sku ?? "").toLowerCase();
            // revist
            // const price = product.price ?? ; 

            const matchesSearch = 
                query === "" || title.includes(query) || category.includes(query) || sku.includes(query); 
                
            const matchesCategory = urlCategory === "Category" || !urlCategory || product.category === urlCategory;

            const matchesStatus =
              urlStatus === "Status" ||
              !urlStatus  ||
              product.status === urlStatus;

            return matchesSearch && matchesCategory && matchesStatus;
        })
    }, [products, urlSearch, urlCategory, urlStatus]);


    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    const safeCurrentPage = Math.min(Math.max(urlPage, 1), totalPages);

    useEffect(() => {
    if (urlPage > totalPages && totalPages > 0) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", String(totalPages));
          return next;
        },
        { replace: true },
      );
    }
  }, [urlPage, totalPages, setSearchParams]);

  const paginatedProducts = useMemo(() => {
    const start = (safeCurrentPage -1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, safeCurrentPage]);

//   event handler for category dropdown 
  const setCategory = useCallback(
    (category: ProductCategory | "Category") => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (category !== "Category") {
                next.set("category", category);
            } else {
                next.delete("category");
            }
            next.set("page", "1");
            return next;
        });
    },
    [setSearchParams],
  );

  //  event handler for category dropdown 
  const setStatus = useCallback(
    (status: ProductStatus | "Status") => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (status !== "Status") {
                next.set("status", status);
            } else {
                next.delete("status");
            }
            next.set("page", "1");
            return next;
        });
    },
    [setSearchParams],
  );

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(page));
        return next;
      });
    },
    [setSearchParams],
    );


    const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);


  return {
    searchTerm,
    setSearchTerm,
    selectedCategory: urlCategory,
    selectedStatus: urlStatus,
    setCategory,
    setStatus,
    currentPage: safeCurrentPage,
    setPage,
    totalPages,
    totalItems,
    pageSize: PAGE_SIZE,
    paginatedProducts,
    clearFilters
  }
  
}