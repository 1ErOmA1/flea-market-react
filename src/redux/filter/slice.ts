import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SortItem, filterState } from './types'
// import type { SortItem } from "../../@types/types";
// import type { SetFiltersPayload, filterState } from './types';

export  const initialState: filterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: { name: 'возрастание популярности', sortProperty: 'rating' }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {

    setCategoryId (state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },

    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setSortType(state, action: PayloadAction<SortItem>) {
      state.sortType = action.payload
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },

    setFilters(state, action: PayloadAction<filterState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortType = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    }
  },
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue  } = filterSlice.actions

export default filterSlice.reducer