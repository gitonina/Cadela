import axios from "axios";
import type { CyclistCreate } from "../types/cyclist";

const create = async (newCyclist: CyclistCreate) => {
  const response = await axios.post("/api/cyclists", newCyclist);
  return response.data;
};

export default { create };
