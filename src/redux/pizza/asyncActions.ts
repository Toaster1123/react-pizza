import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizza/fetchPizzaStatus',
  async (params, thunkApi) => {
    const { category, sortBy, page, perPage } = params;
    try {
      const { data } = await axios.get(
        `https://25f07d3b31d1ec56.mokky.dev/pizzas?sortBy=${sortBy}${category}${page}${perPage}`,
      );
      if ((data.length = 0)) {
        return thunkApi.rejectWithValue('Ошибка запроса');
      }
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      console.error(error);
    }
  },
);
