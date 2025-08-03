import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import type { cartState, CartItem } from './types';

const { items, totalPrice } = getCartFromLS()

export  const initialState: cartState = {
  totalPrice,
  items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem (state, action: PayloadAction <CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if(findItem)
        findItem.count++
      else
        state.items.push({...action.payload, count: 1})
      state.totalPrice = calcTotalPrice(state.items);
    },
    itemMinus (state, action: PayloadAction <number>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if(findItem && findItem.count > 1)
        findItem.count--
      state.totalPrice = calcTotalPrice(state.items);
    },
    itemPlus (state, action: PayloadAction <number>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if(findItem)
        findItem.count++
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems (state) {
      state.items = []
      state.totalPrice = 0;
    },
    removeItem (state, action: PayloadAction <{ id: number }>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1)
        state.items.splice(index, 1);
      state.totalPrice = calcTotalPrice(state.items);
    }
  },
})

export const { addItem, clearItems, itemMinus, itemPlus, removeItem  } = cartSlice.actions

export default cartSlice.reducer