import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TAuthorizedUserInfo, TUser } from "../types/AllTypes";
import { Button, Card, TextField } from "@mui/material";
import { BarLoader } from "react-spinners";
import { useUpdateUserInfoMutation } from "../redux/api/allApiEndpoints";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateCurrentLoggedinUserInfo } from "../redux/slices/authSlice";

function ProfileEditPage() {
  const location = useLocation();
  const currentUser = location.state.user as TAuthorizedUserInfo;
  console.log(currentUser);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const [updateuserInfo, { data, isSuccess, isLoading, isError, error }] =
    useUpdateUserInfoMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refForWidth = useRef(null);
  const [viewWidth, setViewWidth] = useState(0);
  setValue("name", currentUser.info.name);
  setValue("phone", currentUser.info.phone);
  setValue("address", currentUser.info.address);
  setValue("email", currentUser.info.email);

  useEffect(() => {
    if (refForWidth.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setViewWidth(refForWidth.current.offsetWidth);
    }
  }, []);

  if (isError) {
    toast.error("Try logging again.");
  }
  if (isSuccess) {
    toast.success(`Profile is updated successfully.`);

    const user: TUser = {
      name: data.data.name as string,
      email: data.data.email as string,
      role: data.data.role as string,
      address: data.data.address as string,
      phone: data.data.phone as string,
    };
    const token = currentUser.token;
    const loggedUser: TAuthorizedUserInfo = {
      info: user,
      token,
    };
    setValue("name", user.name);
    setValue("phone", user.phone);
    setValue("address", user.address);
    setValue("email", user.email);
    dispatch(updateCurrentLoggedinUserInfo(loggedUser));
  }

  const submit = () => {
    const user: TAuthorizedUserInfo = {
      info: {
        name: getValues("name"),
        email: getValues("email"),
        phone: getValues("phone"),
        address: getValues("address"),
      },
      token: currentUser.token,
    };
    updateuserInfo(user);
  };

  return (
    <div className="flex flex-col items-center justify-between align-middle w-full bg-[#C0F5FA] py-2">
      <Card title="Profile Edit" variant="elevation" className="md:w-1/2">
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
                placeholder={currentUser.info.name}
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
                placeholder={currentUser.info.email}
                error={errors.email ? true : false}
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
                value={currentUser.info.email}
                error={errors.email ? true : false}
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
                placeholder={currentUser.info.phone}
                className="mt-2 mb-2"
                error={errors.phone ? true : false}
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
                value={currentUser.info.phone}
                className="mt-2 mb-2"
                error={errors.phone ? true : false}
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
                placeholder={currentUser.info.address}
                className="mt-2 mb-2"
                error={errors.address ? true : false}
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
                value={currentUser.info.address}
                className="mt-2 mb-2"
                error={errors.address ? true : false}
                fullWidth
                sx={{ marginBottom: 2 }}
                disabled={isSuccess}
                {...register("address", { required: true })}
              />
            )}

            {errors.address && <p>Address is required</p>}

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
                Updating User Info...
              </Button>
            ) : (
              <Button
                variant="outlined"
                className="mt-2 mb-2"
                type="submit"
                onClick={() => isSuccess && navigate("/profile")}
              >
                {isSuccess ? "Go to profile page" : "Update"}
              </Button>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}

export default ProfileEditPage;
