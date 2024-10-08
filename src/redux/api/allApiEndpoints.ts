import {
  TBike,
  TDiscount,
  TGenericSuccessfulResponse,
  TPaymentIntentParams,
} from "../../types/AllTypes";
import { baseApi } from "./baseApi";

export const allApiEndPoints = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      createBike: builder.mutation({
        query: ({ details, file }) => {
          const formData = new FormData();
          formData.append("file", file);
          for (const key in details) {
            formData.append(key, details[key]);
          }
          return {
            url: "/bikes",
            method: "POST",
            body: formData,
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TBike>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
      getSingleBike: builder.query({
        query: (bikeId: string) => {
          return {
            url: `/bikes/${bikeId}`,
            method: "GET",
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TBike>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
      getAllBikes: builder.query({
        query: () => {
          return {
            url: `/bikes`,
            method: "GET",
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TBike[]>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
      updateSingleBike: builder.mutation({
        query: ({ bikeId, bike }) => {
          return {
            url: `/bikes/${bikeId}`,
            method: "PUT",
            body: bike,
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TBike>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
      deleteSingleBike: builder.mutation({
        query: (bikeId: string) => {
          return {
            url: `/bikes/${bikeId}`,
            method: "DELETE",
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TBike>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),

      getLatestBikes: builder.query({
        query: () => {
          return {
            url: "/bikes?latest=1",
            method: "GET",
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<TBike[]>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
      getStripePaymentIntent: builder.query({
        query: (paymentIntentParams: Partial<TPaymentIntentParams>) => {
          return {
            url: "/bikes/secret",
            method: "POST",
            timeout: 3000,
            body: paymentIntentParams,
          };
        },
        transformResponse: (response: TGenericSuccessfulResponse<any>) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
      getAllDiscounts: builder.query({
        query: () => {
          return {
            url: "/discount",
            method: "GET",
          };
        },
        transformResponse: (
          response: TGenericSuccessfulResponse<TDiscount[]>
        ) => {
          return {
            data: response.data,
          };
        },
        transformErrorResponse: (response) => {
          return {
            error: response.data,
          };
        },
      }),
    };
  },
});

export const {
  useCreateBikeMutation,
  useGetAllBikesQuery,
  useGetSingleBikeQuery,
  useUpdateSingleBikeMutation,
  useDeleteSingleBikeMutation,
  useGetAllDiscountsQuery,
} = allApiEndPoints;
