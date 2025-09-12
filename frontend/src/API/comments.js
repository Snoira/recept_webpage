import apiClient from "../api";
import { refreshToken } from "./auth";

export const postComment = async (recipeId, content) => {
    try {
        const res = await apiClient.post(`/recipes/${recipeId}/comment`, { content })
        return res.data

    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return postComment(recipeId, content)
            }
        }
        console.error('Error creating comment:', error.response?.data.message || error.message);
        throw error;
    }
}

export const getComments = async (recipeId) => {
    try {
        const res = await apiClient.get(`/recipes/${recipeId}/comments`)
        return res.data
    } catch (error) {
        console.error('Error fetching comments:', error.response?.data.message || error.message);
        throw error;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const res = await apiClient.delete(`/comments/${commentId}`)
        if (res.status === 204) {
            return true
        }
        return false

    } catch (error) {
        if (error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if (isRefreshed) {
                return deleteComment(commentId)
            }
        }
        console.error('Error deleting comment:', error.response?.data.message || error.message);
        throw error;
    }
}