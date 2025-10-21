import axios from "axios";
import type { Circuit, CircuitCreate } from "../types/circuit";

const baseUrl = "http://localhost:3001/api/circuits";

export const getAllCircuits = async () => {
  const request = await axios.get<Circuit[]>(baseUrl);
  return request.data;
};

export const createCircuit = async (newData: CircuitCreate) => {
  const response = await axios.post<Circuit>(baseUrl, newData);
  return response.data;
};

export default {
  getAllCircuits,
  createCircuit,
};