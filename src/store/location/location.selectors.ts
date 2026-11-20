import type { RootState } from "@/store/store";
import type { City } from "@/store/geocoding/geocoding.type";

const isCity = (value: unknown): value is City =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as City).name === "string" &&
  typeof (value as City).country === "string" &&
  typeof (value as City).timezone === "string" &&
  "coordinates" in value;

// persisted state may hold an older shape (plain string, partial object)
export const selectSelectedCity = (state: RootState): City | null => {
  const city: unknown = state.location?.selectedCity;
  return isCity(city) ? city : null;
};
