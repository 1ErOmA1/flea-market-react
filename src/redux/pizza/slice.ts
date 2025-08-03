import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Pizza, PizzaSliceState } from './types';
import { Status } from './types';
import { fetchPizzas } from './asyncActions';

export  const initialState: PizzaSliceState  = {
  items: [],
  status: Status.LOADING,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems (state, action: PayloadAction <Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer


// export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>( 'pizza/fetchPizzasStatus', async (params) => {
//     const { sortBy, order, category, search, currentPage } = params; 
//     const { data } = await axios.get<Pizza[]>(`https://6885cd35f52d34140f6a963d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
//     return data;
//   },
// );