import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./slices/foodSlice";
import cartSlice from "./slices/cartSlice";
import adminSlice from "./slices/adminSlice";

export const store = configureStore({
  reducer: { foodSlice, cartSlice, adminSlice },
});
