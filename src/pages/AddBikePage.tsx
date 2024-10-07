import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useCreateBikeMutation } from "../redux/api/allApiEndpoints";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <Button></Button>
    </div>
  );
}

export default AddBikePage;
