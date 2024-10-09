import React from "react";
import { useAppSelector } from "../redux/hooks";
import { TAuthorizedUserInfo } from "../types/AllTypes";
import SignupPage from "./SignupPage";

function AuthenticationPage() {
  const currentUser = useAppSelector(
    (state) => state.auth
  ) as TAuthorizedUserInfo;
  if (currentUser.email) {
    return <div></div>;
  } else {
    return <SignupPage />;
  }
}

export default AuthenticationPage;
