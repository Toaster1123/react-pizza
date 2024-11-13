import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params, thunkApi) => {
  const { category, sortBy, page, perPage } = params;
  const { data } = await axios.get(
    `https://25f07d3b31d1ec56.mokky.dev/pizzas?sortBy=${sortBy}${category}${page}${perPage}`,
  );
  if ((data.length = 0)) {
    return thunkApi.rejectWithValue('Ошибка запроса');
  }
  return thunkApi.fulfillWithValue(data.items);
});
const initialState = {
  items: [],
  status: 'loading',
};
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    // setItems(state, action) {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});
export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
