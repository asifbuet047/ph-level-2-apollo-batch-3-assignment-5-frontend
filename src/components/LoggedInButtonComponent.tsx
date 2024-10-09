import React from "react";
import { useAppSelector } from "../redux/hooks";
import { TAuthorizedUserInfo } from "../types/AllTypes";
import { Avatar } from "@mui/material";

function LoggedInButtonComponent() {
  const currentUser = useAppSelector(
    (state) => state.auth
  ) as TAuthorizedUserInfo;
  if (currentUser.email) {
    return (
      <div>
        <Avatar>{currentUser.name.charAt(0)}</Avatar>
      </div>
    );
  } else {
    return <div>Log In or Sign Up</div>;
  }
}

export default LoggedInButtonComponent;
