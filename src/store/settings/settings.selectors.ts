import type { RootState } from "@/store/store";
import type { TemperatureUnit } from "@/store/settings/settings.type";

// persisted state may predate the settings slice
export const selectTemperatureUnit = (state: RootState): TemperatureUnit =>
  state.settings?.temperatureUnit === "F" ? "F" : "C";
