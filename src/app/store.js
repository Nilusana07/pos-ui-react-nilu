// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'; // Import your cart slice reducer

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Assign the cart reducer to the 'cart' key in your state
    // You'll add more reducers here as your application grows (e.g., products, orders)
  },
});