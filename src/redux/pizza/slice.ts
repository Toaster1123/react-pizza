import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchPizzasPayload, PizzaItem, PizzaSliceState, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
  totalPages: 0,
};
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<FetchPizzasPayload>) => {
      state.items = action.payload.items;
      state.status = Status.SUCCES;
      state.totalPages = action.payload.meta.total_pages;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
