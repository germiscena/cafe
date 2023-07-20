import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk("adminSlice", async () => {
  const res = await axios.get("https://64b50065f3dbab5a95c6792e.mockapi.io/orders");
  return res.data;
});

const initialState = {
  items: [],
  status: "loading",
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchOrders.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = adminSlice.actions;

export default adminSlice.reducer;
