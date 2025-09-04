import apiClient from "../api";

export const createRecipe = async (inputs) => {
    try {
        const res = await apiClient.post(`/recipes/create`, inputs)
        return res.data


    } catch (error) {
        // bryt ut i en funktion? "error handelers typ."
        // axios nterceptor 
        // if (error instanceof AxiosError) {
        //     if (error.response?.status === 401) {
        //         console.log("401 error, trying to refresh token")
        //         const isRefreshed = await refreshToken()
        //         if (isRefreshed) {
        //             console.log("Token refreshed, retrying recipe creation")
        //             return createRecipe(inputs)
        //         }
        //     }
        // }
        console.error('Error creating recipe:', error.response?.data.message || error.message);
        throw error;
    }
}

export const getRecipes = async () => {
    try {
        const res = await apiClient.get('/recipes')
        return res.data
    } catch (error) {
        console.error('Error fetching recipes:', error.response?.data.message || error.message);
        throw error;
    }
}

export const getRecipeByID = async (id) => {
    try {
        const res = await apiClient.get(`/recipes/${id}`)
        return res.data
    } catch (error) {
        console.error(`Error fetching recipe ${id}:`, error.response?.data.message || error.message);
        throw error;
    }
}