import React from "react";
import { useAppSelector } from "../redux/hooks";
import SingleBikeCardComponent from "./SingleBikeCardComponent";

function AllBikesComponent() {
  const allBikes = useAppSelector((state) => state.bikes.bikes);

  return (
    <div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 grid-cols-6 gap-2 m-2">
      {allBikes.map((bike) => (
        <SingleBikeCardComponent bike={bike} />
      ))}
    </div>
  );
}

export default AllBikesComponent;
