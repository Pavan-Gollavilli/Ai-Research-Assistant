import axiosInstance from "./axiosInstance";

/**
 * ==========================================
 * Get Profile
 * ==========================================
 */
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

/**
 * ==========================================
 * Update Profile
 * ==========================================
 */
export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/auth/profile", data);
  return response.data;
};

/**
 * ==========================================
 * Delete Account
 * ==========================================
 */
export const deleteAccount = async () => {
  const response = await axiosInstance.delete("/auth/profile");
  return response.data;
};
