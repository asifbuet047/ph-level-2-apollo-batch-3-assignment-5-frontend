import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoggingUserMutation } from "../redux/api/allApiEndpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import {
  updateCurrentLoggedinUserInfo,
  updateCurrentLoggedinUserName,
} from "../redux/slices/authSlice";
import { TUserCredentials } from "../types/AllTypes";
import { Button, Card, TextField } from "@mui/material";
import { BarLoader } from "react-spinners";

function LoggingPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [loginUser, { data, isSuccess, isLoading, isError }] =
    useLoggingUserMutation();
  const dispatch = useAppDispatch();
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
    toast.error("User doest not login. Try later");
  }
  if (isSuccess) {
    toast.success(`${data.data.data.name} is logged up successfully.`);
    dispatch(updateCurrentLoggedinUserName(data.data.data.name));
  }

  const submit = () => {
    const user: TUserCredentials = {
      email: getValues("email"),
      password: getValues("password"),
    };
    loginUser(user);
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
                Logging User...
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="mt-2 mb-2"
                type="submit"
                onClick={() => isSuccess && navigate("/profile")}
              >
                {isSuccess ? "Go to Your profile page" : "Log In"}
              </Button>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}

export default LoggingPage;
