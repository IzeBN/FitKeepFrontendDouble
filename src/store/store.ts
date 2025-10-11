import { configureStore } from "@reduxjs/toolkit";

import { equipmentsApi } from "./equipmentsApi";
import { trainingsApi } from "./trainingsApi";
import { usersApi } from "./usersApi";
import { paymentsApi } from "./paymentApi";
import { quizApi } from "./quizApi";

export const store = configureStore({
  reducer: {
    [trainingsApi.reducerPath]: trainingsApi.reducer,
    [equipmentsApi.reducerPath]: equipmentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(trainingsApi.middleware)
      .concat(equipmentsApi.middleware)
      .concat(usersApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(quizApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;