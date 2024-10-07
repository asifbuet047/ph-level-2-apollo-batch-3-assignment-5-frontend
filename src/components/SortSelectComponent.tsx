import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { TBike } from "../types/AllTypes";
import { useAppDispatch } from "../redux/hooks";
import { addMoreBikes, removeAllBikes } from "../redux/slices/bikesSlice";

function SortSelectComponent({ bikes }: { bikes: TBike[] }) {
  const allBikes = bikes as TBike[];
  const [sort, setSort] = useState<string>("");
  const dispatch = useAppDispatch();

  const onSortHandle = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    dispatch(removeAllBikes());
    if (event.target.value == "10") {
      dispatch(addMoreBikes([...allBikes].sort()));
    }
    if (event.target.value == "11") {
      dispatch(
        addMoreBikes(
          [...allBikes].sort(
            (bikeA, bikeB) => bikeA.pricePerHour - bikeB.pricePerHour
          )
        )
      );
    }
    if (event.target.value == "12") {
      dispatch(
        addMoreBikes(
          [...allBikes].sort(
            (bikeA, bikeB) => bikeB.pricePerHour - bikeA.pricePerHour
          )
        )
      );
    }
  };

  if (allBikes?.length > 0) {
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id="sortId">Sort</InputLabel>
          <Select
            labelId="sortId"
            value={sort}
            label="Sort"
            onChange={onSortHandle}
          >
            <MenuItem value={10}>By Brand</MenuItem>
            <MenuItem value={11}>Low to High (Price per hour)</MenuItem>
            <MenuItem value={12}>High to Low (Price per hour)</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  } else {
    return (
      <div>
        <FormControl disabled fullWidth>
          <InputLabel id="sortId">Sort</InputLabel>
          <Select
            labelId="sortId"
            value={sort}
            label="Sort"
            onChange={onSortHandle}
          >
            <MenuItem value={10}>By Brand</MenuItem>
            <MenuItem value={11}>Low to High (Price per hour)</MenuItem>
            <MenuItem value={12}>High to Low (Price per hour)</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default SortSelectComponent;
