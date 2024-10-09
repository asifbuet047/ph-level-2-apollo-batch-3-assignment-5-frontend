import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthorizedUserInfo } from "../../types/AllTypes";

const initialState: TAuthorizedUserInfo = {
  name: "",
  email: "",
  role: "",
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
    updateCurrentLoggedinUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateCurrentLoggedinUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateCurrentLoggedinUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    updateCurrentLoggedinUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    removeCurrentLoggedinUser: (state) => {
      state.email = "";
      state.token = "";
      state.name = "";
      state.role = "";
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
