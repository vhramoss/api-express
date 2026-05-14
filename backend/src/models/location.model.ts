import { Location } from "../types/location";

export interface LocationProvider {
  getAll(): Promise<Location[]>;
  search(filter: LocationFilter): Promise<Location[]>;
}

export interface LocationFilter {
  name?: string;
  type?: string;
  dimension?: string;
}
