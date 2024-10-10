import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoggingUserMutation } from "../redux/api/allApiEndpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import { updateCurrentLoggedinUserInfo } from "../redux/slices/authSlice";
import {
  TAuthorizedUserInfo,
  TUser,
  TUserCredentials,
} from "../types/AllTypes";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
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
  const [open, setOpen] = useState<boolean>(false);
  const [viewWidth, setViewWidth] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (refForWidth.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setViewWidth(refForWidth.current.offsetWidth);
    }
    if (isSuccess) {
      handleOpen();
    }
  }, [isSuccess]);

  if (isError) {
    toast.error("User doest not login. Try later");
  }
  if (isSuccess) {
    const currentUser: TUser = {
      name: data.data.name as string,
      email: data.data.email as string,
      role: data.data.role as string,
      address: data.data.address as string,
      phone: data.data.phone as string,
    };
    const token = data.token as string;
    const loggedUser: TAuthorizedUserInfo = {
      info: currentUser,
      token,
    };
    dispatch(updateCurrentLoggedinUserInfo(loggedUser));
  }

  const submit = () => {
    const user: TUserCredentials = {
      email: getValues("email"),
      password: getValues("password"),
    };
    loginUser(user);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100%-50%)",
    bgcolor: "background.paper",
    border: "2px solid #C0F5FA",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="flex flex-col items-center justify-between align-middle w-full bg-[#C0F5FA] py-2 px-2">
      <Card title="Log In" variant="elevation" className="w-full md:w-1/2 ">
        <div className="flex flex-col justify-center items-center bg-[#55E4F1]">
          <p className="xs:text-xl md:text-4xl text-6xl font-bold text-center text-black mt-5 mb-5">
            Log In into Your account
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col justify-center align-middle items-center p-5 w-full"
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
              <div className="flex flex-row justify-center w-full">
                <div className="w-1/2 px-2">
                  <Button
                    variant="contained"
                    className="my-2 mx-2 w-full"
                    type="submit"
                    onClick={() => isSuccess && navigate("/profile")}
                  >
                    {isSuccess ? "Go to Your profile page" : "Log In"}
                  </Button>
                </div>

                {!isSuccess && (
                  <div className="w-1/2 px-2" onClick={() => handleOpen()}>
                    <Button variant="contained" className="my-2 mx-2 w-full">
                      Or, Sign Up
                    </Button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <p className="text-6xl">Hi {data?.data.name}, Welcome</p>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default LoggingPage;
