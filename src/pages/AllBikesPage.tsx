import React, { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { useGetAllBikesQuery } from "../redux/api/allApiEndpoints";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TBike } from "../types/AllTypes";
import { storeAllBikes } from "../redux/slices/bikesSlice";
import { clearSearch } from "../redux/slices/searchSlice";
import AllBikesComponent from "../components/AllBikesComponent";

function AllBikesPage() {
  const [width, setWidth] = useState(0);
  const [search, setSearch] = useState("");
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
      dispatch(storeAllBikes(allBikes));
    }
  }

  const onSearchCloseIconClick = () => {
    setSearch("");
    dispatch(clearSearch());
  };

  return (
    <div
      className="flex flex-col justify-start items-center p-4 bg-[#C0F5FA]"
      ref={refForWidth}
    >
      <div>{isFetching && <BarLoader width={width}></BarLoader>}</div>
      <div>{isSuccess && <AllBikesComponent />}</div>
    </div>
  );
}

export default AllBikesPage;
