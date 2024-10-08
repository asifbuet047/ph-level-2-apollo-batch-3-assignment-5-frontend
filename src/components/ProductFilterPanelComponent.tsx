import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { clearFilter, updateFilter } from "../redux/slices/filterSlice";
import { TFilterData, TBike } from "../types/AllTypes";
import {
  addMoreBikes,
  removeAllBikes,
  storeAllBikes,
} from "../redux/slices/bikesSlice";

function ProductFilterPanelComponent({
  bikes,
  onSendData,
}: {
  bikes: TBike[];
  onSendData: any;
}) {
  const allBikes = bikes as TBike[];
  const dispatch = useAppDispatch();
  const [priceRange, setPriceRange] = useState<number[]>([
    0,
    allBikes[0].pricePerHour,
  ]);
  const filters = useAppSelector(
    (state) => state.filters.filters
  ) as TFilterData[];
  const activeFilters: TFilterData[] = filters.filter(
    (each) => each.filter_checked
  );

  const brandPanelData = allBikes
    .map((bike) => bike.brand)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((brand_name) => {
      const quantity = allBikes.filter((bike) =>
        bike.brand.includes(brand_name)
      ).length;
      return {
        filter_name: "brand",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: brand_name,
      };
    });

  const ccPanelData = allBikes
    .map((bike) => bike.cc)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((cc) => {
      const quantity = allBikes.filter((bike) => bike.cc === cc).length;
      return {
        filter_name: "cc",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: cc,
      };
    });

  const yearPanelData = allBikes
    .map((bike) => bike.year)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((year) => {
      const quantity = allBikes.filter((bike) => bike.year === year).length;
      return {
        filter_name: "year",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: year,
      };
    })
    .sort((a, b) => b.filter_value - a.filter_value);

  const availablePanelData = allBikes
    .map((bike) => bike.isAvailable)
    .filter((name, index, array) => {
      return array.indexOf(name) === index;
    })
    .map((availability) => {
      const quantity = allBikes.filter(
        (bike) => bike.isAvailable === availability
      ).length;
      return {
        filter_name: "available",
        filter_checked: false,
        filter_quantity: quantity,
        filter_value: availability ? "Available" : "Not available",
      };
    });

  if (activeFilters.length == 0) {
    if (priceRange[0] === 0 && priceRange[1] === allBikes[0].pricePerHour) {
      dispatch(storeAllBikes(allBikes));
    }
  } else {
    dispatch(removeAllBikes());
    activeFilters.map((each) => {
      switch (each.filter_name) {
        case "brand":
          dispatch(
            addMoreBikes(
              allBikes.filter((bike) => {
                if (bike.brand == each.filter_value) {
                  return true;
                } else {
                  return false;
                }
              })
            )
          );
          break;
        case "cc":
          dispatch(
            addMoreBikes(
              allBikes.filter((bike) => {
                if (bike.cc == each.filter_value) {
                  return true;
                } else {
                  return false;
                }
              })
            )
          );
          break;
        case "year":
          dispatch(
            addMoreBikes(
              allBikes.filter((bike) => {
                if (bike.year == Number(each.filter_value)) {
                  return true;
                } else {
                  return false;
                }
              })
            )
          );
          break;
        case "available":
          dispatch(
            addMoreBikes(
              allBikes.filter((product) => {
                if (product.isAvailable == each.filter_value) {
                  return true;
                } else {
                  return false;
                }
              })
            )
          );
          break;

        default:
          break;
      }
    });
  }

  const handlePriceSlider = (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      onSendData([Math.min(newValue[0], priceRange[1] - 10), priceRange[1]]);
      setPriceRange([Math.min(newValue[0], priceRange[1] - 10), priceRange[1]]);
      dispatch(removeAllBikes());
      dispatch(
        addMoreBikes(
          allBikes.filter((bike) => {
            if (bike.pricePerHour >= priceRange[0]) {
              if (bike.pricePerHour <= priceRange[1]) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        )
      );
    } else {
      onSendData([priceRange[0], Math.max(newValue[1], priceRange[0] + 10)]);
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + 10)]);
      dispatch(removeAllBikes());
      dispatch(
        addMoreBikes(
          allBikes.filter((product) => {
            if (product.pricePerHour >= priceRange[0]) {
              if (product.pricePerHour <= priceRange[1]) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
        )
      );
    }
  };

  return (
    <div className="flex flex-col justify-start rounded-md m-2">
      <div className="flex flex-row justify-around items-center bg-[#72BF44] rounded-md py-1">
        <Typography className="text-black" variant="h5" fontSize={20}>
          Filter By
        </Typography>
        <Typography
          onClick={() => {
            dispatch(clearFilter());
            setPriceRange([0, allBikes[0].pricePerHour]);
            onSendData([0, allBikes[0].pricePerHour]);
          }}
          className="text-black"
          variant="h5"
          fontSize={20}
        >
          <button>Reset</button>
        </Typography>
      </div>
      <Divider />
      <div>
        <div>
          <div className="p-2 flex flex-row gap-1">
            <div className="w-1/2">
              <input
                type="text"
                value={priceRange[0]}
                className="border-2 border-black rounded-md text-center"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                value={priceRange[1]}
                className="border-2 border-black rounded-md text-center"
              />
            </div>
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              size="medium"
              max={allBikes[0].pricePerHour}
              onChange={handlePriceSlider}
              valueLabelDisplay="auto"
              disableSwap
              color="primary"
            ></Slider>
          </div>
        </div>

        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              Brand
            </AccordionSummary>
            <div>
              {brandPanelData.map((each, index) => (
                <div key={index} className="flex flex-row justify-between m-2">
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "brand"
                  ) >= 0 ? (
                    <>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={(event) => {
                                each.filter_checked = event.target.checked;
                                dispatch(updateFilter(each));
                              }}
                            />
                          }
                          label={each.filter_value}
                        />
                      ) : (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={false}
                              onChange={(event) => {
                                each.filter_checked = event.target.checked;
                                dispatch(updateFilter(each));
                              }}
                            />
                          }
                          label={each.filter_value}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                    </>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>

        <Divider />
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              CC
            </AccordionSummary>
            <div>
              {ccPanelData.map((each, index) => (
                <div key={index} className="flex flex-row justify-between m-2">
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "cc"
                  ) >= 0 ? (
                    <>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={(event) => {
                                each.filter_checked = event.target.checked;
                                dispatch(updateFilter(each));
                              }}
                            />
                          }
                          label={each.filter_value}
                        ></FormControlLabel>
                      ) : (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(event) => {
                                each.filter_checked = event.target.checked;
                                dispatch(updateFilter(each));
                              }}
                            />
                          }
                          label={each.filter_value}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                    </>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>

        <Divider />
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              Year
            </AccordionSummary>
            <div className="">
              {yearPanelData.map((each, index) => (
                <div key={index} className="flex flex-row justify-between m-2">
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "year"
                  ) >= 0 ? (
                    <div>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <div>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={true}
                                onChange={(event) => {
                                  each.filter_checked = event.target.checked;
                                  dispatch(updateFilter(each));
                                }}
                              />
                            }
                            label={each.filter_value}
                          />
                        </div>
                      ) : (
                        <div className="">
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) => {
                                  each.filter_checked = event.target.checked;
                                  dispatch(updateFilter(each));
                                }}
                              />
                            }
                            label={each.filter_value}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                      {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                    </div>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
        <Divider />
        <div>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              Availability
            </AccordionSummary>
            <div className="">
              {availablePanelData.map((each, index) => (
                <div key={index} className="flex flex-row justify-between m-2">
                  {activeFilters.length > 0 &&
                  activeFilters.findIndex(
                    (filter) => filter.filter_name == "available"
                  ) >= 0 ? (
                    <div>
                      {activeFilters.findIndex(
                        (filter) => filter.filter_value == each.filter_value
                      ) >= 0 ? (
                        <div>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={true}
                                onChange={(event) => {
                                  each.filter_checked = event.target.checked;
                                  dispatch(updateFilter(each));
                                }}
                              />
                            }
                            label={each.filter_value}
                          />
                        </div>
                      ) : (
                        <div className="">
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) => {
                                  each.filter_checked = event.target.checked;
                                  dispatch(updateFilter(each));
                                }}
                              />
                            }
                            label={each.filter_value}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={false}
                            onChange={(event) => {
                              each.filter_checked = event.target.checked;
                              dispatch(updateFilter(each));
                            }}
                          />
                        }
                        label={each.filter_value}
                      />
                      {/* eslint-disable @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                    </div>
                  )}

                  <p className="pl-2 pr-2 border-2 rounded-md text-center">
                    {each.filter_quantity}
                  </p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default ProductFilterPanelComponent;
