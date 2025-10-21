import axios from "axios";
import type { CyclingRaceResults } from "../types/cyclingRaceResults";

const baseUrl = "http://localhost:3001/api/results";

export const getResultsByRaceId = async (raceId: string) => {
  const response = await axios.get<CyclingRaceResults[]>(`${baseUrl}/${raceId}`);
  return response.data;
};

export default {
  getResultsByRaceId: getResultsByRaceId 
};