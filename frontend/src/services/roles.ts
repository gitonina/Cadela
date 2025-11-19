import axiosSecure from "../utils/axiosSecure";

export const getRoleById = async (roleId: string) => {
  const response = await axiosSecure.get(`/roles/${roleId}`);
  return response.data; 
};

export default { getRoleById };
