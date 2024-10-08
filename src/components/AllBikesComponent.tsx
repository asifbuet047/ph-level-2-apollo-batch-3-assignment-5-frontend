import React, { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import SingleBikeCardComponent from "./SingleBikeCardComponent";
import { TBike, TDiscount } from "../types/AllTypes";
import { useGetAllDiscountsQuery } from "../redux/api/allApiEndpoints";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

function AllBikesComponent() {
  const allBikes = useAppSelector((state) => state.bikes.bikes);
  let temp: TBike[] = [];
  const searchField = useAppSelector((state) => state.search.field);
  const { data, isError } = useGetAllDiscountsQuery([], {});
  const [pageNo, setPageNo] = useState<number>(1);
  const discounts = data?.data as TDiscount[];
  const totalPages = Math.floor(allBikes.length / 8) + 1;
  const remainings = allBikes.length % 8;

  if (isError) {
    toast.warn("All discount information is currently unavailable");
  }

  if (totalPages == 1) {
    temp = allBikes;
  } else {
    if (pageNo < totalPages) {
      temp = allBikes.slice((pageNo - 1) * 8, (pageNo - 1) * 8 + 8);
    } else {
      temp = allBikes.slice((pageNo - 1) * 8, (pageNo - 1) * 8 + remainings);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-6 gap-2 m-2">
        {searchField.length > 0
          ? allBikes
              .filter((bike) => bike.name.match(new RegExp(searchField, "i")))
              .map((bike, index) => (
                <SingleBikeCardComponent
                  bike={bike}
                  discounts={discounts}
                  key={index}
                />
              ))
          : temp.map((bike, index) => (
              <SingleBikeCardComponent
                bike={bike}
                key={index}
                discounts={discounts}
              />
            ))}
      </div>
      <div className="flex flex-row justify-center">
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            shape="circular"
            onChange={(event, page) => setPageNo(page)}
          />
        )}
      </div>
    </div>
  );
}

export default AllBikesComponent;
