import axios from "axios";
import type { CyclingRace } from "../types/cyclingRace";

const baseUrl = "http://localhost:3001/cycling-races";

export const getAllRaces = async () => {
  const request = await axios.get<CyclingRace[]>(baseUrl);
  return request.data;
};

export const getRaceById = async (id: number) => {
  const response = await axios.get<CyclingRace>(`${baseUrl}/${id}`);
  return response.data;
}

export const create = async (newData: CyclingRace) => {
  const response = await axios.post<CyclingRace>(baseUrl, newData);
  return response.data;
};

export default {
  getAllRaces: getAllRaces,
  create: create,
};