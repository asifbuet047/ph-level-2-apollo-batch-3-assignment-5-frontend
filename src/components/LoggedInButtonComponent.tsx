import React from "react";
import { useAppSelector } from "../redux/hooks";
import { TAuthorizedUserInfo } from "../types/AllTypes";
import { Avatar } from "@mui/material";

function LoggedInButtonComponent() {
  const currentUser = useAppSelector((state) => state.auth.name);
  console.log(currentUser);
  if (currentUser) {
    return (
      <div>
        <Avatar>{currentUser}</Avatar>
      </div>
    );
  } else {
    return <div>Log In or Sign Up</div>;
  }
}

export default LoggedInButtonComponent;
