import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBikeState, TBike } from "../../types/AllTypes";

const initialState: TBikeState = {
  bikes: [],
};

export const bikes = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    storeAllBikes: (state, action: PayloadAction<TBike[]>) => {
      state.bikes = action.payload;
    },
    addSingleBike: (state, action: PayloadAction<TBike>) => {
      state.bikes.push(action.payload);
    },
    addMoreBikes: (state, action: PayloadAction<TBike[]>) => {
      state.bikes.push(...action.payload);
    },
    updateSingleBike: (state, action: PayloadAction<TBike>) => {
      const index = state.bikes.findIndex(
        // @ts-expect-error
        (bike) => bike._id == action.payload._id
      );
      if (index >= 0) {
        state.bikes[index] = action.payload;
      }
    },
    removeSingleBike: (state, action: PayloadAction<string>) => {
      // @ts-expect-error
      state.bikes = state.bikes.filter((bike) => bike._id != action.payload);
    },
    removeAllBikes: (state) => {
      state.bikes = [];
    },
  },
});

export const {
  storeAllBikes,
  addMoreBikes,
  addSingleBike,
  removeAllBikes,
  removeSingleBike,
  updateSingleBike,
} = bikes.actions;

export const bikesReducer = bikes.reducer;
