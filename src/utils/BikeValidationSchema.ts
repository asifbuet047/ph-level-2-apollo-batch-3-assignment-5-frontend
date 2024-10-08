import { z } from "zod";

const bikeCreationValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
    })
    .min(3, {
      message: "product name length must be greater than 3 letter",
    }),
  description: z
    .string({
      invalid_type_error: "Description must ebs tring",
    })
    .min(10, {
      message: "Description must be greater than 10 letter",
    }),
  pricePerHour: z
    .number({
      invalid_type_error: "Price per hour must be number",
    })
    .min(0, {
      message: "Price per hour must be greater than 0",
    }),
  brand: z.string({
    invalid_type_error: "Brand must be string",
  }),
  cc: z
    .number({
      invalid_type_error: "CC must be number",
    })
    .gte(1, {
      message: "CC must be greater than 1",
    }),
  year: z
    .number({
      invalid_type_error: "Year of manufacture must be number",
    })
    .gte(0, {
      message: "Year of manufacture must be greater than 1900",
    }),
  model: z
    .string({
      invalid_type_error: "Model must be string",
    })
    .min(2, {
      message: "Model name must be greater than 2",
    }),
  isAvailable: z
    .boolean({
      invalid_type_error: "Availability must be boolean",
    })
    .default(true),
});

const bikeUpdateValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
    })
    .min(3, {
      message: "product name length must be greater than 3 letter",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must ebs tring",
    })
    .min(10, {
      message: "Description must be greater than 10 letter",
    })
    .optional(),
  pricePerHour: z
    .number({
      invalid_type_error: "Price per hour must be number",
    })
    .min(0, {
      message: "Price per hour must be greater than 0",
    })
    .optional(),
  brand: z
    .string({
      invalid_type_error: "Brand must be string",
    })
    .optional(),
  cc: z
    .number({
      invalid_type_error: "CC must be number",
    })
    .gte(1, {
      message: "CC must be greater than 1",
    })
    .optional(),
  year: z
    .number({
      invalid_type_error: "Year of manufacture must be number",
    })
    .gte(0, {
      message: "Year of manufacture must be greater than 1900",
    })
    .optional(),
  model: z
    .string({
      invalid_type_error: "Model must be string",
    })
    .min(2, {
      message: "Model name must be greater than 2",
    })
    .optional(),
  isAvailable: z
    .boolean({
      invalid_type_error: "Availability must be boolean",
    })
    .optional(),
  bike_image: z
    .string({
      invalid_type_error: "Bike Image URL must be string",
    })
    .optional(),
});

export const BikeValidationSchema = {
  bikeCreationValidationSchema,
  bikeUpdateValidationSchema,
};
