import { Button, Card, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useCreateBikeMutation } from "../redux/api/allApiEndpoints";
import { useNavigate } from "react-router-dom";
import { parseInputValuesForBikeCreationSubmit } from "../utils/DataValidationUtilFunctions";

function AddBikePage() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const [createBike, { isError, isSuccess, isLoading }] =
    useCreateBikeMutation();
  const navigate = useNavigate();
  const refForWidth = useRef(null);
  const [viewWidth, setViewWidth] = useState(0);

  useEffect(() => {
    if (refForWidth.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setViewWidth(refForWidth.current.offsetWidth);
    }
  }, []);

  if (isError) {
    toast.error("Product addition error. Please try later");
  }
  if (isSuccess) {
    toast.success(`${getValues().name} is successfully created`);
  }
  const submit = () => {
    createBike(parseInputValuesForBikeCreationSubmit(getValues()));
  };
  return (
    <div className="flex flex-col items-center justify-between align-middle w-full bg-[#C0F5FA] py-2">
      <Card title="Add Product" variant="elevation" className="md:w-1/2">
        <div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-center align-middle items-center p-5"
            encType="multipart/form-data"
            ref={refForWidth}
          >
            {isLoading ? (
              <TextField
                error={errors.name ? true : false}
                variant="outlined"
                label="Bike name"
                fullWidth
                disabled
                type="text"
                placeholder="Bike name"
                sx={{ marginBottom: 2 }}
                {...register("name", { required: true, minLength: 3 })}
              />
            ) : (
              <TextField
                error={errors.name ? true : false}
                variant="outlined"
                label="Bike name"
                fullWidth
                type="text"
                placeholder="Bike name"
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("name", { required: true, minLength: 3 })}
              />
            )}

            {errors.name && <p>Name is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Bike description"
                placeholder="Bike description"
                error={errors.description ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("description", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Bike description"
                placeholder="Bike description"
                error={errors.description ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("description", { required: true })}
              />
            )}
            {errors.description && <p>Description is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Bike CC"
                placeholder="Bike CC"
                className="mt-2 mb-2"
                error={errors.category ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("cc", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Bike CC"
                placeholder="Bike CC"
                className="mt-2 mb-2"
                error={errors.category ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("cc", { required: true })}
              />
            )}

            {errors.cc && <p>CC is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Bike brand"
                placeholder="Bike brand"
                className="mt-2 mb-2"
                error={errors.brand ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("brand", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Bike brand"
                placeholder="Bike brand"
                className="mt-2 mb-2"
                error={errors.brand ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("brand", { required: true })}
              />
            )}

            {errors.brand && <p>Brand is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="number"
                label="Bike rent price"
                placeholder="Bike rent price"
                className="mt-2 mb-2"
                error={errors.quantity ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("pricePerHour", { required: true, min: 1 })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="number"
                label="Bike rent price"
                placeholder="Bike rent price"
                className="mt-2 mb-2"
                error={errors.quantity ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("pricePerHour", { required: true, min: 1 })}
              />
            )}

            {errors.pricePerHour && <p>Price per hour is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="number"
                label="Bike manufacturing year"
                placeholder="Bike manufacturing year"
                className="mt-2 mb-2"
                error={errors.price ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("year", { required: true, min: 1900 })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="number"
                label="Bike manufacturing year"
                placeholder="Bike manufacturing year"
                className="mt-2 mb-2"
                error={errors.price ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("year", { required: true, min: 1900 })}
              />
            )}

            {errors.year && <p>Bike manufacturing year is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Bike model"
                placeholder="Bike model"
                className="mt-2 mb-2"
                error={errors.price ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("model", { required: true, min: 1900 })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Bike model"
                placeholder="Bike model"
                className="mt-2 mb-2"
                error={errors.price ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("model", { required: true, min: 1900 })}
              />
            )}

            {errors.price && <p>Bike model name is required</p>}

            {isLoading ? (
              <input
                type="file"
                disabled
                className="file-input file-input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("bike_image", {
                  required: true,
                })}
              />
            ) : (
              <input
                type="file"
                disabled={isSuccess}
                className="file-input file-input-bordered w-full max-w-xs mt-2 mb-2"
                {...register("bike_image", {
                  required: true,
                })}
              />
            )}

            {errors.bike_image && <p>File is required</p>}

            {isLoading && (
              <p className="mt-2 mb-2">
                <BarLoader color="#36d7b7" width={viewWidth}></BarLoader>
              </p>
            )}

            {isLoading ? (
              <Button
                variant="contained"
                className="mt-2 mb-2"
                type="submit"
                disabled
              >
                Adding Bike...
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="mt-2 mb-2"
                type="submit"
                onClick={() => isSuccess && navigate("/bikes")}
              >
                {isSuccess ? "Go to all bike page" : "Add Bike"}
              </Button>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}

export default AddBikePage;
