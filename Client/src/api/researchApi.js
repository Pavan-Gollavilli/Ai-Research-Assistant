import axiosInstance from "./axiosInstance";

/**
 * Create Research
 */
export const createResearch = async (data) => {
  const response = await axiosInstance.post("/research", data);
  return response.data;
};

/**
 * Get Dashboard Stats
 */
export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/research/dashboard");
  return response.data;
};

/**
 * Get Research History
 */
export const getResearchHistory = async () => {
  const response = await axiosInstance.get("/research");
  return response.data;
};

/**
 * Get Single Research
 */
export const getResearchById = async (id) => {
  const response = await axiosInstance.get(`/research/${id}`);
  return response.data;
};

/**
 * Delete Research
 */
export const deleteResearch = async (id) => {
  const response = await axiosInstance.delete(`/research/${id}`);
  return response.data;
};