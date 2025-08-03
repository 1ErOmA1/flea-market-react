import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Pizza } from './types';
// import pickBy from 'lodash/pickBy';
// import identity from 'lodash/identity';

// export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
//     const { sortBy, order, category, search, currentPage } = params;
//     const { data } = await axios.get<Pizza[]>(`https://626d16545267c14d5677d9c2.mockapi.io/items`, {
//       params: pickBy(
//         {
//           page: currentPage,
//           limit: 4,
//           category,
//           sortBy,
//           order,
//           search,
//         },
//         identity,
//       ),
//     });

//     return data;
//   },
// );

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>( 'pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category, search, currentPage } = params; 
    const { data } = await axios.get<Pizza[]>(`https://6885cd35f52d34140f6a963d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    return data;
  },
);