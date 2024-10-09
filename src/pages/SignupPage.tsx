import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../redux/api/allApiEndpoints";
import { toast } from "react-toastify";
import { Button, Card, TextField } from "@mui/material";
import { BarLoader } from "react-spinners";
import { TUSer } from "../types/AllTypes";

function SignupPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [signupUser, { data, isSuccess, isLoading, isError }] =
    useSignupUserMutation();
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
    toast.error("User doest not sign up. Try later");
  }
  if (isSuccess) {
    toast.success(
      `${data.data.name} is signed up successfully. Please log in.`
    );
  }

  const submit = () => {
    const user: TUSer = {
      name: getValues("name"),
      email: getValues("email"),
      phone: getValues("phone"),
      address: getValues("address"),
      password: getValues("password"),
      role: "user",
    };
    signupUser(user);
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
                label="Your name"
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
                label="Your name"
                fullWidth
                type="text"
                placeholder="Your name"
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("name", { required: true, minLength: 3 })}
              />
            )}

            {errors.name && <p>Name is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="email"
                label="Your email"
                placeholder="Your email"
                error={errors.description ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("email", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Your email"
                placeholder="Your email"
                error={errors.description ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("email", { required: true })}
              />
            )}
            {errors.email && <p>Email is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="number"
                label="Your phone no"
                placeholder="Your phone no"
                className="mt-2 mb-2"
                error={errors.category ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("phone", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="number"
                label="Your phone no"
                placeholder="Your phone no"
                className="mt-2 mb-2"
                error={errors.category ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("phone", { required: true })}
              />
            )}

            {errors.phone && <p>Phone no is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="text"
                label="Your address"
                placeholder="Your address"
                className="mt-2 mb-2"
                error={errors.brand ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("address", { required: true })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="text"
                label="Your address"
                placeholder="Your address"
                className="mt-2 mb-2"
                error={errors.brand ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("address", { required: true })}
              />
            )}

            {errors.address && <p>Address is required</p>}

            {isLoading ? (
              <TextField
                variant="outlined"
                type="password"
                label="Password"
                placeholder="Password"
                className="mt-2 mb-2"
                error={errors.quantity ? true : false}
                fullWidth
                disabled
                sx={{ marginBottom: 2 }}
                {...register("password", { required: true, min: 1 })}
              />
            ) : (
              <TextField
                variant="outlined"
                type="password"
                label="Password"
                placeholder="Password"
                className="mt-2 mb-2"
                error={errors.quantity ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("password", { required: true, min: 1 })}
              />
            )}

            {errors.password && <p>Password is required</p>}

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
                Adding User...
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="mt-2 mb-2"
                type="submit"
                onClick={() => isSuccess && navigate("/login")}
              >
                {isSuccess ? "Go to login page" : "Sign Up"}
              </Button>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignupPage;
