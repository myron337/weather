import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocationState } from "@/store/location/location.type";
import type { City } from "@/store/geocoding/geocoding.type";

const initialState: LocationState = {
  selectedCity: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
    clearSelectedCity: (state) => {
      state.selectedCity = null;
    },
  },
});

export const locationReducer = locationSlice.reducer;
export const { setSelectedCity, clearSelectedCity } = locationSlice.actions;
