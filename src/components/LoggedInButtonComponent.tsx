import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Logout, ShoppingCart, AccountCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function LoggedInButtonComponent() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };
  if (currentUser) {
    return (
      <div>
        <Tooltip title="Account settings" className="border-2">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUser.name.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElement}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          variant="menu"
        >
          <MenuItem onClick={handleClose}>
            <div className="w-full flex flex-row justify-start items-center">
              <div className="w-1/3">
                <AccountCircle fontSize="medium" />
              </div>
              <div className="w-2/3">
                <span>My Profile</span>
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <div className="w-full flex flex-row justify-start items-center">
              <div className="w-1/3">
                <ShoppingCart fontSize="medium" />
              </div>
              <div className="w-2/3">
                <span>My Cart</span>
              </div>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <div className="w-full flex flex-row justify-start items-center">
              <div className="w-1/3">
                <Logout fontSize="medium" />
              </div>
              <div className="w-2/3">
                <span>Logout</span>
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    );
  } else {
    return <div>Log In or Sign Up</div>;
  }
}

export default LoggedInButtonComponent;
