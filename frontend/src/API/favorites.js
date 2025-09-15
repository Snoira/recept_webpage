import apiClient from "../api";
import { refreshToken } from "./auth";

export const addToFavorites = async (id) => {
    try {
        const res = await apiClient.post(`/favorites/add/${id}`)
        return res.data

    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return addToFavorites(id)
            }
        }
        console.error('Error adding to favorites:', error.response?.data.message || error.message);
        throw error;
    }
}

export const getFavorites = async () => {
    try {
        const res = await apiClient.get('/favorites')
        return res.data
    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return getFavorites()
            }
        }
        console.error('Error fetching favorites:', error.response?.data.message || error.message);
        throw error;
    }
}

export const removeFromFavorites = async (id) => {
    try {
        const res = await apiClient.put(`/favorites/remove/${id}`)
        return res.data

    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return removeFromFavorites(id)
            }
        }
        console.error('Error removing from favorites:', error.response?.data.message || error.message);
        throw error;
    }
}

export const getFavoritesPopulated = async () => {
    try {
        const res = await apiClient.get('/favorites/populated')
        return res.data

    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return getFavoritesPopulated()
            }
        }
        console.error('Error fetching populated favorites:', error.response?.data.message || error.message);
        throw error;
    }
}
