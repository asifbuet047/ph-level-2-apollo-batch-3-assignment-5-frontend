import { Badge, Button, Drawer } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { TCartData } from "../types/AllTypes";
import LoggedInButtonComponent from "./LoggedInButtonComponent";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { AccountCircle, Logout } from "@mui/icons-material";

function NavigationBarComponent() {
  const cart = useAppSelector((state) => state.cart.carts) as TCartData[];
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="hidden md:flex bg-[#87F1FF] md:flex-row rounded-md justify-between items-center px-2 py-2">
        <div className="rounded-full overflow-clip xs:w-16 md:w-24 border-2 border-red-500">
          <a href="/">
            <img src="/LOGO.jpg" />
          </a>
        </div>
        <div className="xs:w-full md:w-auto">
          <ul className="menu menu-vertical md:menu-horizontal ">
            <li className="pl-2 pr-2  flex flex-col justify-center">
              <NavLink to={"/"}>Homepage</NavLink>
            </li>
            <li className="pl-2 pr-2 flex flex-col justify-center">
              <NavLink to={"/bikes"}>All Bikes</NavLink>
            </li>
            <li className="pl-2 pr-2 flex flex-col justify-center">
              <NavLink to={"/add"}>Add Bike</NavLink>
            </li>
            <li className="pl-2 pr-2 flex flex-col justify-center">
              {cart?.length > 0 ? (
                <Badge
                  variant="standard"
                  badgeContent={
                    <Button variant="contained">{cart.length}</Button>
                  }
                >
                  <NavLink to={"/cart"}>My Cart</NavLink>
                </Badge>
              ) : (
                <NavLink to={"/cart"}>My Cart</NavLink>
              )}
            </li>
            <li className="pl-2 pr-2">
              <LoggedInButtonComponent />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex md:hidden bg-[#87F1FF]">
        {open ? (
          <div onClick={() => setOpen(false)}>
            <CloseIcon fontSize="large" />
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
              <ul className="menu menu-vertical bg-[#87F1FF] h-full">
                <li className="pl-2 pr-2 flex flex-col justify-center">
                  <NavLink to={"/"}>Homepage</NavLink>
                </li>
                <li className="pl-2 pr-2 flex flex-col justify-center">
                  <NavLink to={"/bikes"}>All Bikes</NavLink>
                </li>
                <li className="pl-2 pr-2 flex flex-col justify-center">
                  <NavLink to={"/add"}>Add Bike</NavLink>
                </li>
                <li className="pl-2 pr-2 flex flex-col justify-center">
                  {cart?.length > 0 ? (
                    <Badge
                      variant="standard"
                      badgeContent={
                        <Button variant="contained">{cart.length}</Button>
                      }
                    >
                      <NavLink to={"/cart"}>My Cart</NavLink>
                    </Badge>
                  ) : (
                    <NavLink to={"/cart"}>My Cart</NavLink>
                  )}
                </li>
                <li className="pl-2 pr-2 flex flex-col justify-center">
                  <NavLink to={"/profile"}>
                    <div className="w-full flex flex-row justify-start items-center">
                      <div className="w-1/3">
                        <AccountCircle fontSize="medium" />
                      </div>
                      <div className="w-2/3">
                        <span>My Profile</span>
                      </div>
                    </div>
                  </NavLink>
                </li>
                <li className="pl-2 pr-2 flex flex-col justify-center">
                  <NavLink to={"/logout"}>
                    <div className="w-full flex flex-row justify-start items-center">
                      <div className="w-1/3">
                        <Logout fontSize="medium" />
                      </div>
                      <div className="w-2/3">
                        <span>Logout</span>
                      </div>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </Drawer>
          </div>
        ) : (
          <div onClick={() => setOpen(true)}>
            <MenuIcon fontSize="large" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationBarComponent;
