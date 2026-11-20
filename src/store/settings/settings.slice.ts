import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  SettingsState,
  TemperatureUnit,
} from "@/store/settings/settings.type";

const initialState: SettingsState = {
  temperatureUnit: "C",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { setTemperatureUnit } = settingsSlice.actions;
