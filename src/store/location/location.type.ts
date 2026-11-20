import type { City } from "@/store/geocoding/geocoding.type";

export interface LocationState {
  selectedCity: City | null;
}
