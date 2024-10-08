import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthorizedUserInfo } from "../../types/AllTypes";

const initialState: TAuthorizedUserInfo = {
  email: "",
  role: "user",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCurrentLoggedinUserInfo: (
      state,
      action: PayloadAction<TAuthorizedUserInfo>
    ) => {
      state = action.payload;
    },
    updateCurrentLoggedinUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateCurrentLoggedinUserRole: (
      state,
      action: PayloadAction<"user" | "admin">
    ) => {
      state.role = action.payload;
    },
    updateCurrentLoggedinUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const {
  updateCurrentLoggedinUserInfo,
  updateCurrentLoggedinUserEmail,
  updateCurrentLoggedinUserRole,
  updateCurrentLoggedinUserToken,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
