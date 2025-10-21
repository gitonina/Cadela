import axios from "axios";

export interface Category {
  id: string;
  name: string;
}

const baseUrl = "/api/categories";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(baseUrl);
  return response.data;
};

export default { getAllCategories };