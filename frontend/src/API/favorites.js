import apiClient from "../api";
import { useNavigate } from 'react-router-dom';

export const addToFavorites = async (id) => {
    try {
        const res = await apiClient.post(`/favorites/add/${id}`)
        console.log("addToFavorites res.data", res.data)
        return res.data

    } catch (error) {
        console.error('Error adding to favorites:', error.response?.data.message || error.message);
        throw error;
    }
} 

export const getFavorites = async () => {
    try {
        const res = await apiClient.get('/favorites')
        console.log("getFavorites res.data", res.data)  
        return res.data
    } catch (error) {
        console.error('Error fetching favorites:', error.response?.data.message || error.message);
        throw error;
    }
}

export const removeFromFavorites = async (id) => {
    try {
        const res = await apiClient.put(`/favorites/remove/${id}`)
        console.log("removeFromFavorites res.data", res.data)
        return res.data

    } catch (error) {
        console.error('Error removing from favorites:', error.response?.data.message || error.message);
        throw error;
    }
}

export const getFavoritesPopulated = async () => {
    try {
        const res = await apiClient.get('/favorites/populated')
        return res.data
        
    } catch (error) {
        console.error('Error fetching populated favorites:', error.response?.data.message || error.message);
        throw error;
    }
}
