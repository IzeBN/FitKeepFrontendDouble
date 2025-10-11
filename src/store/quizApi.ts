import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum AnswerType {
  TEXT = "text",
  MANY_BUTTONS = "many_buttons",
  ONE_BUTTON = "one_button",
}

export type QuizAnswerDTO = {
  init: string | null;
  question_id: number;
  answer: string | number | boolean;
  answer_type:
    | AnswerType.TEXT
    | AnswerType.ONE_BUTTON
    | AnswerType.MANY_BUTTONS;
};

export interface QuizAnswerResponse {
  success: boolean;
}

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.fitkeep.ru/",
  }),
  endpoints: (builder) => ({
    addAnswer: builder.mutation<QuizAnswerResponse, QuizAnswerDTO>({
      query: (answerData) => ({
        url: "/quiz/answer/add",
        method: "POST",
        body: answerData,
      }),
    }),
  }),
});

export const { useAddAnswerMutation } = quizApi;
