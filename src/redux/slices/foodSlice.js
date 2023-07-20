import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFood = createAsyncThunk("foodSlice", async () => {
  const res = await axios.get("https://64b50065f3dbab5a95c6792e.mockapi.io/food");
  return res.data;
});

const initialState = {
  items: [],
  status: "loading",
};

const foodSlice = createSlice({
  name: "foodSlice",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchFood.fulfilled]: (state, action) => {
      console.log(action);
      state.items = action.payload;
    },
  },
});

export const { setItems } = foodSlice.actions;

export default foodSlice.reducer;
