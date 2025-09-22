import axios from "axios";
import type { InscriptionData } from "../types/inscription";

const baseUrl = "http://localhost:3001/inscriptions";

export const getAll = async () => {
  const response = await axios.get<InscriptionData[]>(baseUrl);
  return response.data;
};

export const create = async (newData: InscriptionData) => {
  const response = await axios.post<InscriptionData>(baseUrl, newData);
  return response.data;
};
