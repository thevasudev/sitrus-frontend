import api from "../config/axiosConfig";

export const login = async (data) => {
  try {
    const response = await api.post("/api/admin/login", data);
    return response.data;
    } catch (error) {
    throw error;
    }
};