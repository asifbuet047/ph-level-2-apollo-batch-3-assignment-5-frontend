import React, { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { useGetAllBikesQuery } from "../redux/api/allApiEndpoints";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TBike } from "../types/AllTypes";
import { storeAllBikes } from "../redux/slices/bikesSlice";
import { clearSearch, updateSearch } from "../redux/slices/searchSlice";
import AllBikesComponent from "../components/AllBikesComponent";
import { InputAdornment, TextField, Typography } from "@mui/material";
import SortSelectComponent from "../components/SortSelectComponent";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ProductFilterPanelComponent from "../components/ProductFilterPanelComponent";
import Lottie from "lottie-react";
import NO_INTERNET from "../../public/NO_INTERNET_ANIMATION.json";

function AllBikesPage() {
  const [width, setWidth] = useState(0);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, -1]);
  const refForWidth = useRef(null);
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching, isError } = useGetAllBikesQuery(
    {},
    { pollingInterval: 10000 }
  );
  const allBikes = data?.data as TBike[];
  const filters = useAppSelector((state) => state.filters.filters);

  const activeFilter = filters.filter((each) => each.filter_checked);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setWidth(refForWidth.current.offsetWidth);
  }, []);

  if (isSuccess) {
    if (activeFilter.length === 0) {
      if (priceRange[1] === -1) {
        dispatch(storeAllBikes(allBikes));
      }
    }
  }

  const onSearchCloseIconClick = () => {
    setSearch("");
    dispatch(clearSearch());
  };

  const handlePriceSlider = (values: [number, number]) => {
    setPriceRange(values);
  };

  return (
    <div
      className="flex flex-col justify-start items-center p-4 bg-[#C0F5FA]"
      ref={refForWidth}
    >
      <div className="flex flex-col md:flex-row justify-between rounded-md w-full border-4 mt-2 mb-2">
        <div className="flex flex-row justify-start items-center p-2 w-full md:w-1/2">
          <Typography className="text-2xl font-bold">All Bikes</Typography>
          {isSuccess ? (
            <Typography className="text-xl text-slate-400">
              ({data.data.length.toString()} bikes found)
            </Typography>
          ) : (
            <Typography className="text-xl text-slate-400">
              (0 products found)
            </Typography>
          )}
        </div>
        <div className="flex flex-row justify-evenly py-2 w-full md:w-1/2">
          <div className="w-1/2 mx-1">
            <SortSelectComponent bikes={allBikes} />
          </div>
          <div className="w-1/2 mx-1">
            <TextField
              disabled={isError}
              className="w-full"
              label="Search Product"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <div onClick={onSearchCloseIconClick}>
                      <CloseRoundedIcon />
                    </div>
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                dispatch(updateSearch(search));
              }}
            ></TextField>
          </div>
        </div>
      </div>
      <div>{isFetching && <BarLoader width={width}></BarLoader>}</div>
      <div className="flex flex-row justify-around">
        {isSuccess && (
          <div className="flex flex-col md:flex-row">
            <div>
              <ProductFilterPanelComponent
                bikes={allBikes}
                onSendData={handlePriceSlider}
              ></ProductFilterPanelComponent>
            </div>
            <div>
              <AllBikesComponent />
            </div>
          </div>
        )}
        {isError && (
          <div>
            <Lottie
              animationData={NO_INTERNET}
              width={width / 2}
              height={width / 3}
            ></Lottie>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBikesPage;
