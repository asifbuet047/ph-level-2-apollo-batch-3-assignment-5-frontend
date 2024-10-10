import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuth, TAuthorizedUserInfo, TUser } from "../../types/AllTypes";

const initialState: TAuth = {
  user: {
    info: {
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "",
    },
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
      state.user.info.name = action.payload;
    },
    updateCurrentLoggedinUserToken: (state, action: PayloadAction<string>) => {
      state.user.token = action.payload;
    },
    updateCurrentLoggedinUserRole: (state, action: PayloadAction<string>) => {
      state.user.info.role = action.payload;
    },
    updateCurrentLoggedinUserEmail: (state, action: PayloadAction<string>) => {
      state.user.info.email = action.payload;
    },
    updateCurrentLoggedinUserAddress: (
      state,
      action: PayloadAction<string>
    ) => {
      state.user.info.address = action.payload;
    },
    updateCurrentLoggedinUserPhone: (state, action: PayloadAction<string>) => {
      state.user.info.phone = action.payload;
    },
    removeCurrentLoggedinUser: (state) => {
      state.user.info.name = "";
      state.user.info.email = "";
      state.user.info.address = "";
      state.user.info.phone = "";
      state.user.info.role = "";
      state.user.token = "";
    },
  },
});

export const {
  updateCurrentLoggedinUserName,
  updateCurrentLoggedinUserInfo,
  updateCurrentLoggedinUserEmail,
  updateCurrentLoggedinUserRole,
  updateCurrentLoggedinUserToken,
  updateCurrentLoggedinUserAddress,
  updateCurrentLoggedinUserPhone,
  removeCurrentLoggedinUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
