import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { removeCurrentLoggedinUser } from "../redux/slices/authSlice";

function LogoutPage() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const onLoggingOut = () => {
    dispatch(removeCurrentLoggedinUser());
  };

  return (
    <div className="border-4 rounded-md">
      <div className="flex flex-col justify-center items-center">
        {currentUser.name && (
          <p className="text-2xl md:text-6xl font-extrabold text-black mt-5 mb-5">
            `Hi, {currentUser.name}`
          </p>
        )}

        <p className="text-2xl  md:text-6xl font-bold text-black mt-5 mb-5">
          Do You want to log out?
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center border-20 w-full mt-5 mb-5">
          <motion.div
            className="w-1/2 mx-2 my-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1.03 }}
          >
            <Button
              variant="contained"
              size="large"
              className="w-full"
              onClick={onLoggingOut}
            >
              Yes
            </Button>
          </motion.div>
          <motion.div
            className="w-1/2 mx-2 my-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 1.03 }}
          >
            <Button variant="contained" size="large" className="w-full">
              No, Stay
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
