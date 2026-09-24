import type { DashboardUser, UserRole } from "@/types/user.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../common/useDebounce";

const PAGE_SIZE = 5;

export const useUserTableFilters = (users: DashboardUser[] = []) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read the single source of truth : URL query params
  const urlSearch = searchParams.get("search") ?? "";
  const urlRole = (searchParams.get("role") as UserRole | "All") ?? "All";
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

  // In-memory data filtering
  const filteredUsers = useMemo(() => {
    const query = urlSearch.trim().toLowerCase();

    return users.filter((user) => {
      const firstName = user.name?.firstname ?? "";
      const lastName = user.name?.lastname ?? "";
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const email = (user.email ?? "").toLowerCase();

      // If query includes '@', user explicitly wants domain search (e.g., '@company.com')
      // Otherwise, only search name and the email local-part before '@'
      const emailTarget = query.includes("@") ? email : email.split("@")[0];

      const matchesSearch =
        query === "" || fullName.includes(query) || emailTarget.includes(query);

      const matchesRole = urlRole === "All" || user.role === urlRole;

      return matchesSearch && matchesRole;
    });
  }, [users, urlSearch, urlRole]);

  const totalItems = filteredUsers.length;
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

  const paginatedUsers = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, safeCurrentPage]);

  // event handlers for dropdown, pagination, and clear
  const setRole = useCallback(
    (role: UserRole | "All") => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (role !== "All") {
          next.set("role", role);
        } else {
          next.delete("role");
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
    setSearchParams({});
  }, [setSearchParams]);

  return {
    searchTerm,
    setSearchTerm,
    selectedRole: urlRole,
    setRole,
    currentPage: safeCurrentPage,
    setPage,
    totalPages,
    totalItems,
    pageSize: PAGE_SIZE,
    paginatedUsers,
    clearFilters,
  };
};