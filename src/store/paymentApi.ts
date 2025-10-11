import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.fitkeep.ru/",
  }),
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/create",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentsApi;
