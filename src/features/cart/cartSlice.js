// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold the items added to the cart
};

const cartSlice = createSlice({
  name: 'cart', // A unique name for the slice
  initialState,
  reducers: {
    // Action to add a new item to the cart
    addItemToCart: (state, action) => {
      // The payload (action.payload) will be the new item object
      state.items.push(action.payload);
    },
    // You might add more actions here later, e.g., removeItem, updateItemQuantity, clearCart
  },
});

// Export the action creator(s)
export const { addItemToCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;