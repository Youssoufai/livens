import axios from "axios";

import { CitiesType } from "./services.type";

export const getStates = async () => {
  try {
    const response = await axios.get(
      "https://temikeezy.github.io/nigeria-geojson-data/data/states.json",
    );

    return response.data as string[];
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getCities = async (state: string, lga: string) => {
  try {
    const response = await axios.get(
      "https://temikeezy.github.io/nigeria-geojson-data/data/lgas-with-wards.json",
    );

    const cities = response.data[state][lga] as CitiesType[];

    return cities;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getLocalGovernment = async (state: string) => {
  try {
    const response = await axios.get(
      "https://temikeezy.github.io/nigeria-geojson-data/data/lgas.json",
    );

    const lgas = response.data[state] as string[];

    return lgas;
  } catch (error) {
    console.error(error);

    return [];
  }
};
