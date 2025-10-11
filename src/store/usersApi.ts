import { User } from "@/features/users";
import { User as UserType } from "@/entities/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CreateUserRequest = {
  init: string;
};

type SendMessageRequest = {
  init: string;
  user_id: number;
  msg: string;
};

type SendMessageResponse = {
  status: number;
  environment: string;
};

type GetUserActionsRequest = {
  init: string;
  user_id: number;
};

type GetUserActionsResponse = {
  user: {
    user_id: number;
    username: string;
    fullname: string;
  };
  actions: Record<string, any>[];
};

type GetUserRequest = {
  init: string;
};

type GetUserResponse = UserType;

type SelectSampleRequest = {
  init: string;
  sample_id: number;
};

type SelectSampleResponse = {
  error?: any;
  init: string;
  sample_id: number;
};

type RefreshSamplesRequest = {
  init: string;
  userMsg?: string;
};

type RefreshSamplesResponse = {
  interpretation: string;
};

type StepData = {
  step: string;
  users_count: number;
};

export enum AnalyticPeriod {
  All = "all",
  Week = "week",
  Month = "month",
  ThreeMonths = "threeMonths",
  SixMonths = "sixMonths",
  Year = "year",
}

type GetAnalyticRequest = {
  init: string;
  period: AnalyticPeriod;
  start_date?: string;
  end_date?: string;
};

type GetAnalyticResponse = StepData[];

// Типы для расчета пути к цели
type QuizFindAnswerRequest = {
  init: string;
  data_type: Array<'age' | 'height' | 'weight' | 'gender' | 'additional_questions' | 'current_fat_percentage' | 'desired_fat_percentage' | 'required_reviews'>;
};

type QuizFindAnswerResponse = {
  user_id?: number;
  answers?: Record<string, string | number | boolean>;
};

type CalculateWeightLossDateRequest = {
  init?: string;
  age: number;
  weight: number;
  height: number;
  current_fat_percentage: number;
  desired_fat_percentage: number;
};

type CalculateWeightLossDateResponse = {
  date_to_goal?: string | null;
  muscle_gain?: number | null;
  target_weight?: number | null;
};

type AddUserActionRequest = {
  init: string;
  action: string;
};

type AddUserActionResponse = {
  success: boolean;
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.fitkeep.ru/",
  }),
  tagTypes: ["Users", "Samples"],
  endpoints: (builder) => ({
    getUsers: builder.mutation<{ users: User[] }, CreateUserRequest>({
      query: (body) => ({
        url: "/admin/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (body) => ({
        url: "/admin/users/sendmessage",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    getUserActions: builder.mutation<
      GetUserActionsResponse,
      GetUserActionsRequest
    >({
      query: (body) => ({
        url: "/admin/users/actions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    getUser: builder.mutation<GetUserResponse, GetUserRequest>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    selectSample: builder.mutation<SelectSampleResponse, SelectSampleRequest>({
      query: (body) => ({
        url: "/samples/select",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Samples"],
    }),
    refreshSamples: builder.mutation<
      RefreshSamplesResponse,
      RefreshSamplesRequest
    >({
      query: (body) => ({
        url: "/samples/adaptive?json=1",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Samples"],
    }),
    getAnalytic: builder.mutation<GetAnalyticResponse, GetAnalyticRequest>({
      query: (body) => ({
        url: "/admin/users/analitic",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    quizFindAnswer: builder.mutation<QuizFindAnswerResponse, QuizFindAnswerRequest>({
      query: (body) => ({
        url: "/quiz/answer/find",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    calculateWeightLossDate: builder.mutation<CalculateWeightLossDateResponse, CalculateWeightLossDateRequest>({
      query: (body) => ({
        url: "/calculate/weight_loss_date",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    addUserAction: builder.mutation<AddUserActionResponse, AddUserActionRequest>({
      query: (body) => ({
        url: "/user/actions/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersMutation,
  useSendMessageMutation,
  useGetUserActionsMutation,
  useGetUserMutation,
  useSelectSampleMutation,
  useRefreshSamplesMutation,
  useGetAnalyticMutation,
  useQuizFindAnswerMutation,
  useCalculateWeightLossDateMutation,
  useAddUserActionMutation,
} = usersApi;

