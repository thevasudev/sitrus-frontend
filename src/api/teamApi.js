import api from "../config/axiosConfig";

export const getTeams = async () => {
  try {
    const response = await api.get("/api/team/getTeams");
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export const updateteamById = async (id, data) => {
  try {
    const response = await api.put(`/api/team/updateTeam/${id}`, data);
    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export const cerateTeam = async(data) =>{
  try{
    const response = api.post(`/api/team/cerateTeam`,data);
    return (await response).data;
  }catch(error)
  {
    throw error;
  }
};