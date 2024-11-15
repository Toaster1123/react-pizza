import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  activeCategory: 0,
  currentPage: 1,
  sort: {
    name: 'популярности ↓',
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
      state.sort = action.payload.sort;
    },
  },
});

export const { setActiveCategory, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
