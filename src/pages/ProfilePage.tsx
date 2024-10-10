import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Button, Card } from "@mui/material";
import { motion, useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const currentUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  return (
    <div className="flex flex-col items-center justify-between align-middle w-full bg-[#C0F5FA] py-2 px-2">
      <Card
        title="Profile Page"
        variant="elevation"
        className="w-full md:w-1/2 "
      >
        <div className="flex flex-col bg-[#55E4F1]">
          <motion.p
            ref={scope}
            className="xs:text-xl md:text-4xl text-6xl font-bold text-center text-black mt-5 mb-5"
            onClick={() =>
              animate(
                scope.current,
                { scale: [1.01, 1.1] },
                { ease: "easeIn", repeat: 2, repeatType: "reverse" }
              )
            }
          >
            Your Accout Details
          </motion.p>
          <div className="border-2 rounded-md flex flex-col justify-start items-start my-10 mx-5 p-2">
            <div className="flex flex-row justify-start items-center w-full">
              <p className="px-2 w-1/2 text-right">Your name:</p>
              <motion.p
                className="font-bold w-1/2 text-left"
                whileHover={{ x: 10 }}
              >
                {currentUser.info.name}
              </motion.p>
            </div>
            <div className="flex flex-row justify-start items-center w-full">
              <p className="px-2 w-1/2 text-right">Your email:</p>
              <motion.p
                className="font-bold w-1/2 text-left"
                whileHover={{ x: 10 }}
              >
                {currentUser.info.email}
              </motion.p>
            </div>
            <div className="flex flex-row justify-start items-center w-full">
              <p className="px-2 w-1/2 text-right">Your role:</p>
              <motion.p
                className="font-bold w-1/2 text-left"
                whileHover={{ x: 10 }}
              >
                {currentUser.info.role}
              </motion.p>
            </div>
            <div className="flex flex-row justify-start items-center w-full">
              <p className="px-2 w-1/2 text-right">Your phone:</p>
              <motion.p
                className="font-bold w-1/2 text-left"
                whileHover={{ x: 10 }}
              >
                {currentUser.info.phone}
              </motion.p>
            </div>
            <div className="flex flex-row justify-start items-center w-full">
              <p className="px-2 w-1/2 text-right">Your address:</p>
              <motion.p
                className="font-bold w-1/2 text-left"
                whileHover={{ x: 10 }}
              >
                {currentUser.info.address}
              </motion.p>
            </div>
          </div>
          <div className="mx-10 md:mx-16 my-2 xl:mx-24 flex flex-row justify-center">
            <Button
              variant="contained"
              className="w-full"
              onClick={() =>
                navigate("/edit", { state: { user: currentUser } })
              }
            >
              Edit Info
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
