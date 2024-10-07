import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSearchData } from "../../types/AllTypes";

const initialState: TSearchData = {
  field: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.field = action.payload;
    },
    clearSearch: (state) => {
      state.field = "";
    },
  },
});

export const { updateSearch, clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
