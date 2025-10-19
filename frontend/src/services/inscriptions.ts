import axios from "axios";
import type { InscriptionData } from "../types/inscription";

const baseUrl = "api/inscriptions";

export const getAll = async () => {
  const response = await axios.get<InscriptionData[]>(baseUrl);
  return response.data;
};

export const create = async (newData: InscriptionData) => {
  const response = await axios.post<InscriptionData>(baseUrl, newData);
  return response.data;
};

export default {
  getAllInscriptions: getAll,
  createIncription: create,
};