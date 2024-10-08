import React from "react";
import { TBike, TDiscount } from "../types/AllTypes";
import { motion } from "framer-motion";
import { TbCurrencyTaka } from "react-icons/tb";
import { Button } from "@mui/material";

function SingleBikeCardComponent({
  bike,
  discounts,
}: {
  bike: TBike;
  discounts: TDiscount[];
}) {
  return (
    <div className="border-2 shadow-md rounded-md flex flex-col justify-between items-center p-2 bg-[#55E4F1] text-black">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 1.05 }}>
        {<div></div>}
      </motion.div>

      <div className="flex flex-col justify-center items-center text-center">
        <motion.h1 animate={{ scale: 1.01 }}>{bike.name}</motion.h1>
        <p className="p-2">{bike.brand}</p>

        <div className="flex flex-row justify-start items-center">
          <span className="pt-1 pb-1 font-bold text-xl">
            {bike.pricePerHour}
          </span>
          <TbCurrencyTaka className="inline" />
        </div>

        {/* eslint-disable @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Button variant="contained">
          <p>ADD TO CART</p>
        </Button>
      </div>
    </div>
  );
}

export default SingleBikeCardComponent;
