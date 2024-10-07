import React from "react";
import { useAppSelector } from "../redux/hooks";
import SingleBikeCardComponent from "./SingleBikeCardComponent";

function AllBikesComponent() {
  const allBikes = useAppSelector((state) => state.bikes.bikes);

  return (
    <div>
      {allBikes.map((bike) => (
        <SingleBikeCardComponent bike={bike} />
      ))}
    </div>
  );
}

export default AllBikesComponent;
