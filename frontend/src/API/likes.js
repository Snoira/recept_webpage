import apiClient from "../api";
import { refreshToken } from "./auth";

export const getLikes = async (id) => {
    try {
        const res = await apiClient.get(`/recipes/${id}/likes`)
        return res.data

    } catch (error) {
        console.error('Error fetching recipe likes:', error.response?.data.message || error.message);
        throw error;
    }
}

export const likeRecipe = async (id) => {
    try {
        const res = await apiClient.put(`/recipes/${id}/like`)
        return res.data
    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return likeRecipe(id)
            }
        }
        console.error('Error liking recipe:', error.response?.data.message || error.message);
        throw error;
    }
}

export const unlikeRecipe = async (id) => {
    try {
        const res = await apiClient.put(`/recipes/${id}/unlike`)
        return res.data

    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return unlikeRecipe(id)
            }
        }
        console.error('Error unliking recipe:', error.response?.data.message || error.message);
        throw error;
    }
}


