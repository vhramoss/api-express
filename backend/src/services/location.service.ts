import { LocationFilter, LocationProvider } from "../models/location.model";
import { Location } from "../types/location";

export class LocationsService {
  constructor(private provider: LocationProvider) {}

  async search(filter: LocationFilter): Promise<Location[]> {
    return this.provider.search(filter);
  }

}
