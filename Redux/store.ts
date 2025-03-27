import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { api } from "./api";
import { authApi } from "./auth/authApi";
import venderRegistrationSlice from "./vendor/venderRegistrationSlice";
import venderDetailsPageSlice from "./vendor/venderDetailsPageSlice";
import tenderSlice from "./tender/tenderSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authSlice: authSlice.reducer,
    venderRegistrationSlice: venderRegistrationSlice.reducer,
    venderDetailsPageSlice: venderDetailsPageSlice.reducer,
    tenderSlice: tenderSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// async function fetch() {
//   const response = authApi.endpoints.refreshToken.initiate({});
//   await store.dispatch(response);
// }

// fetch();
