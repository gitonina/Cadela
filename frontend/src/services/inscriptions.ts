import axios from "axios";
import axiosSecure from "../utils/axiosSecure";
import type { Inscription, InscriptionCreate } from "../types/inscription";

const baseUrl = "/inscriptions";

export const getAll = async () => {
  const response = await axios.get<Inscription[]>(baseUrl);
  return response.data;
};

export const create = async (newData: InscriptionCreate) => {
  const response = await axiosSecure.post<Inscription>(baseUrl, newData);
  return response.data as Inscription;
};

export const deleteInscriptionById = async (inscriptionId: string): Promise<void> => {
  await axiosSecure.delete(`${baseUrl}/${inscriptionId}`);
};

export default {
  getAllInscriptions: getAll,
  createInscription: create,
  deleteInscriptionById,
};