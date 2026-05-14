import axios from "axios";
import { LocationProvider, LocationFilter } from "../models/location.model";
import { Location } from "../types/location";

export class RickMortyLocationProvider implements LocationProvider {
  private baseUrl = "https://rickandmortyapi.com/api";


  async getAll(): Promise<Location[]> {
    const response = await axios.get(`${this.baseUrl}/location`);
    return response.data.results ?? [];
  }


  async search(filter: LocationFilter): Promise<Location[]> {
    const response = await axios.get(
      `${this.baseUrl}/location`,
      { params: filter }
    );
    return response.data.results ?? [];
  }
}