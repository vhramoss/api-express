import { LocationFilter, LocationProvider } from "../models/location.model";
import { Location } from "../types/location";

export class LocationsService {
  constructor(private provider: LocationProvider) {}

  async search(filter: LocationFilter): Promise<Location[]> {

    if (!filter || Object.keys(filter).length === 0) {
      return this.provider.getAll();
    }


    return this.provider.search(filter);
  }
}