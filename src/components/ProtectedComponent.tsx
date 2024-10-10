import React, { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

function ProtectedComponent({ children }) {
  const currentUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  });

  if (currentUser.token) {
    return <div>{children}</div>;
  } else {
    return <div></div>;
  }
}

export default ProtectedComponent;
