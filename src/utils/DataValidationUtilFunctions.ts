import { BikeValidationSchema } from "./BikeValidationSchema";

export const parseInputValuesForBikeUpdateSubmit = (data: any) => {
  const temp = { ...data };
  for (const key in temp) {
    if (key === "pricePerHour" || key === "cc" || key === "year") {
      temp[key] = Number.parseInt(temp[key]);
    }
  }
  return temp;
};

export const parseInputValuesForBikeCreationSubmit = (dataObject: any) => {
  const temp = { ...dataObject };
  for (const key in temp) {
    if (key === "pricePerHour" || key === "cc" || key === "year") {
      temp[key] = Number.parseInt(temp[key]);
    } else if (key === "bike_image_url") {
      temp[key] = temp[key][0];
    }
  }
  const { bike_image_url, ...details } = temp;
  return {
    details,
    file: bike_image_url,
  };
};

export const validateWithZodSchema = (data: any) => {
  const result =
    BikeValidationSchema.bikeUpdateValidationSchema.safeParse(data);
  if (result.error) {
    return result.error.issues;
  } else {
    return result.success;
  }
};
