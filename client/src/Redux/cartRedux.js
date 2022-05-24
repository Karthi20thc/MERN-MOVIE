import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
 name: "cart",

 initialState: {
  products: [],
  cartQuantity: 0,
  total: 0,
 },

 reducers: {
  addProduct: (state, action) => {
   state.cartQuantity = state.cartQuantity++;
   state.products.push(action.payload);
   state.total = state.total + (action.payload.price * action.payload.quantity)
  },
  cartQuantityValue: (state, action) => {
   state.cartQuantity = action.payload.value
  },
  cartTotalPrice: (state, action) => {
   let total = 0;
   const entireTotal = action.payload.value.map((element) => {
    total = total + (element.price * element.quantity);
   });
   state.total = total;
  }
 }
})

export const { addProduct, cartQuantityValue, cartTotalPrice } = cartSlice.actions;
export default cartSlice.reducer;
// console.log(cartSlice.reducer);