import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  currentPage: 1,
  sort: {
    name: 'популярности ↓',
    sortProperty: 'rating',
  },
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.activeCategory = Number(action.payload.activeCategory);
      state.sort = action.payload.sort;
    },
  },
});
export const { setActiveCategory, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
