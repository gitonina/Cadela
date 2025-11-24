import axios from "axios";
import axiosSecure from "../utils/axiosSecure";
import type { Inscription, InscriptionCreate } from "../types/inscription";

const baseUrl = "/inscriptions";

export const getAll = async () => {
  const response = await axios.get<Inscription[]>(baseUrl);
  return response.data;
};

export const create = async (newData: InscriptionCreate) => {
  try {
    const response = await axiosSecure.post<Inscription>(baseUrl, newData);
    return response.data as Inscription;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message 
                        || error.response?.data?.error
                        || error.message
                        || 'Error al crear la inscripción';
      
      throw new Error(errorMessage);
    } else {
      throw new Error('Error inesperado al crear la inscripción');
    }
  }
};

export const deleteInscriptionById = async (inscriptionId: string): Promise<void> => {
  await axiosSecure.delete(`${baseUrl}/${inscriptionId}`);
};

export default {
  getAllInscriptions: getAll,
  createInscription: create,
  deleteInscriptionById,
};