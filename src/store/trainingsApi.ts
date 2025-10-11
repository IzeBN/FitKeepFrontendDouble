import { Training } from "@/components/Trains";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type EditTrainingDateRequest = {
  init: string;
  trainig_id: number;
  old_date: string;
  new_date: string;
};

export const trainingsApi = createApi({
  reducerPath: "trainingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.fitkeep.ru/",
  }),
  tagTypes: ["Trainings", "Exercizes"],
  endpoints: (builder) => ({
    createTraining: builder.mutation({
      query: (body) => ({
        url: "/trainings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Trainings"],
    }),
    createExercize: builder.mutation({
      query: (body) => ({
        url: "/trainings/exercizes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Exercizes"],
    }),
    editTrainingDate: builder.mutation<void, EditTrainingDateRequest>({
      query: (body) => ({
        url: "/trainings/edit/date",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Trainings"],
    }),
    getFreeTrainings: builder.query<Training[], void>({
      query: () => "/trainings/free",
      providesTags: ["Trainings"],
    }),
  }),
});

export const {
  useCreateTrainingMutation,
  useCreateExercizeMutation,
  useEditTrainingDateMutation,
  useGetFreeTrainingsQuery,
} = trainingsApi;
