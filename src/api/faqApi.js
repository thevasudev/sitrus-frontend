import api from "../config/axiosConfig";


export const createFaq = async (data) => {
    try {
        const response = await api.post("/api/faq/createfaq", data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export const getAllfaqs = async () => {
    try {
        const response = await api.get("/api/faq/getfaqs");
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export const getfaqById = async (id) => {
    try {
        const response = await api.get(`/api/faq/getfaq/${id}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export const updatefaq = async (id, data) => {
    try {
        const response = api.put(`/api/faq/updatefaq/${id}`, data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};


export const deletefaq = async (id) => {
    try {
        const response = await api.delete(`/api/faq/deletefaq/${id}`);
        return response.data;
    }catch(error)
    {
        return error;
    }
}