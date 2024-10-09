import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuth, TAuthorizedUserInfo } from "../../types/AllTypes";

const initialState: TAuth = {
  user: {
    name: "",
    email: "",
    role: "",
    token: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCurrentLoggedinUserInfo: (
      state,
      action: PayloadAction<TAuthorizedUserInfo>
    ) => {
      state.user = action.payload;
    },
    updateCurrentLoggedinUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    updateCurrentLoggedinUserToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    updateCurrentLoggedinUserRole: (state, action: PayloadAction<string>) => {
      state.user.role = action.payload;
    },
    updateCurrentLoggedinUserEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    removeCurrentLoggedinUser: (state) => {
      state.user.email = "";
      state.user.token = "";
      state.user.name = "";
      state.user.role = "";
    },
  },
});

export const {
  updateCurrentLoggedinUserName,
  updateCurrentLoggedinUserInfo,
  updateCurrentLoggedinUserEmail,
  updateCurrentLoggedinUserRole,
  updateCurrentLoggedinUserToken,
  removeCurrentLoggedinUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
