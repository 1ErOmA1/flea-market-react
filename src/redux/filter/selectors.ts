import type { RootState } from "../store"

export const selectFilter = (state: RootState) => state.filter
export const selectFilterCategoryId = (state: RootState) => state.filter.categoryId
export const selectFilterCurrentPage = (state: RootState) => state.filter.currentPage
export const selectFilterSortType = (state: RootState) => state.filter.sortType