import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  cartTotal: 0,
  totalItems: 0,
  changed: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalItems = action.payload.totalItems
      state.items = action.payload.items
    },
    addItem(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find(
        (item) => item.title === newItem.title
      )
      state.changed = true
      if (!existingItem) {
        state.items.push(newItem)
        state.cartTotal += newItem.price
      } else {
        existingItem.quantity++
        existingItem.total += newItem.price
        state.cartTotal += newItem.price
      }
      state.totalItems++
    },
    removeItem(state, action) {
      const title = action.payload.title
      const existingItem = state.items.find((item) => item.title === title)
      state.cartTotal -= existingItem.price
      state.changed = true
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.title !== title)
      } else {
        existingItem.quantity--
        existingItem.total -= existingItem.price
      }
      state.totalItems--
    },
  },
})

export default cartSlice.reducer

export const cartActions = cartSlice.actions
