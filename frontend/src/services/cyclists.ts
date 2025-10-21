import axios from "axios";
import type { Cyclist } from "../types/cyclist";

const create = async (newCyclist: Cyclist) => {
  const response = await axios.post("/api/cyclists", newCyclist);
  return response.data;
};

export default { create };
