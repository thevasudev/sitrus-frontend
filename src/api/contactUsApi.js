import api from "../config/axiosConfig";


export const getAllContacts = async () => {
  try {
    const response = await api.get("/api/contact/getContacts");
    return response.data;
  }
    catch (error) {
    throw error;
    }
};


export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/api/contact/deleteContact/${id}`);

    return response.data;
    } catch (error) {
    throw error;
    }
};

export const createConatctUs = async (data) => {
  try {
    const response = await api.post("/api/contact/createContact", data);
    return response.data;
    } catch (error) {
    throw error;
    }
};

export const getConatctById = async (id) => {
  try {
    const response = await api.get(`/api/contact/getContact/${id}`);
    return response.data;
    }
    catch (error) {
    throw error;
    }
};