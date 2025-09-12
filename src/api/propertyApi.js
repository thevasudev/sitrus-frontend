import api from "../config/axiosConfig";

export const cerateProeprty = async (data) => { 
    try {
        const response = await api.post("/api/property/createProperty", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const  getAllproperties = async () => {
    try {
        const response = await api.get("/api/property/getProperties");  
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPropertiesById = async (id) => {
    try {
        const response = await api.get(`/api/property/getProperty/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePropertyById = async (id, data) => {
    try {
        const response = await api.put(`/api/property/updateProperty/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deletePropertyById = async (id) => {
    try {
        const response = await api.delete(`/api/property/deleteProperty/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
