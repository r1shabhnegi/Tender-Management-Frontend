import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

interface TenderState {
  tenderSearchQueryAdmin: string;
  tenderStatusAdmin: string;
  tenderHomeSearchQuery: string;
}

const initialState: TenderState = {
  tenderSearchQueryAdmin: "",
  tenderStatusAdmin: "",
  tenderHomeSearchQuery: "",
};

const tenderSlice = createSlice({
  name: "tenderSlice",
  initialState,
  reducers: {
    setManageTenderSearchQuery: (state, action: PayloadAction<string>) => {
      state.tenderSearchQueryAdmin = action.payload;
    },
    setManageTenderStatus: (state, action: PayloadAction<string>) => {
      state.tenderStatusAdmin = action.payload;
    },

    setTenderHomeSearchQuery: (state, action: PayloadAction<string>) => {
      state.tenderHomeSearchQuery = action.payload;
    },
  },
});

export const {
  setManageTenderSearchQuery,
  setManageTenderStatus,
  setTenderHomeSearchQuery,
} = tenderSlice.actions;

export default tenderSlice;
