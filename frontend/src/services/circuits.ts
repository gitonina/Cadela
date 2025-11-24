import axios from "axios";
import type { Circuit, CircuitCreate } from "../types/circuit";

const baseUrl = "/api/circuits";

export const getAllCircuits = async () => {
  const request = await axios.get<Circuit[]>(baseUrl);
  return request.data;
};

export const createCircuit = async (newData: CircuitCreate) => {
  const response = await axios.post<Circuit>(baseUrl, newData, {withCredentials: true});
  return response.data;
};

export default {
  getAllCircuits,
  createCircuit,
};