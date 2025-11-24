import axios from "axios";
import type { CyclingRace, CyclingRaceCreate } from "../types/cyclingRace";

const baseUrl = "/api/cycling-races";

export const getAllRaces = async () => {
  const request = await axios.get<CyclingRace[]>(baseUrl);
  return request.data;
};

export const getUpcomingRaces = async () => {
  const response = await axios.get<CyclingRace[]>(`${baseUrl}/upcoming`);
  return response.data;
}

export const getPastRaces = async () => {
  const response = await axios.get<CyclingRace[]>(`${baseUrl}/past`);
  return response.data;
}

export const getNextRace = async () => {
  const response = await axios.get<CyclingRace[]>(`${baseUrl}/next`);
  return response.data[0] || null;
}

export const getRaceById = async (id: string) => {
  const response = await axios.get<CyclingRace>(`${baseUrl}/${id}`);
  return response.data;
}

export const create = async (newData: CyclingRaceCreate) => {
  const response = await axios.post<CyclingRace>(baseUrl, newData, {withCredentials: true});
  return response.data;
};

export default {
  getAllRaces: getAllRaces,
  getUpcomingRaces: getUpcomingRaces,
  getPastRaces: getPastRaces,
  getNextRace: getNextRace,
  getRaceById: getRaceById,
  create: create,
};