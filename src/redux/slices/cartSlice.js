import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  price: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const findItem = state.items.find((obj) => obj.name == action.payload.name);
      if (findItem) {
        findItem.count++;
        state.price += Number(findItem.price);
      } else {
        state.items.push(action.payload);
        state.price += Number(action.payload.price);
      }
    },
    clearCart(state) {
      state.items = [];
    },
    deleteFromCart(state, action) {
      const findItem = state.items.find((obj) => obj.name == action.payload.name);
      if (findItem.count > 1) {
        findItem.count--;
        state.price -= Number(findItem.price);
      } else if (findItem.count == 1) {
        state.items.splice(
          state.items.findIndex((arrow) => arrow === findItem),
          1,
        );
        state.price -= Number(findItem.price);
      }
    },
  },
});

export const { addToCart, clearCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
