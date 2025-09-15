import apiClient from "../api";

export const register = async (inputs) => {
    try {
        const res = await apiClient.post("/auth/register", inputs)
        return res.data

    } catch (error) {
        console.log("Error registering user:", error);
        return null
    }
}

export const logIn = async (inputs) => {
    try {
        const res = await apiClient.post('/auth/login', inputs);
        return res.data;
        
    } catch (error) {
        console.log('Error logging in user:', error);
        return null
    }
}

export const logOut = async () => {
    try {
        const res = await apiClient.post("/auth/logout")
        if(res.status === 204) {
            return null
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
}

export const refreshToken = async () => {
    try {
        console.log("refreshtoken function")
        const res = await apiClient.post("/auth/refresh")
        return res.data
    } catch (error) {
        return null
    }
}

export const getUser = async () => {
    try {
        console.log("running getUser function!! ")
        const res = await apiClient.get("/auth/user")
        return res.data
    } catch (error) {
        if(error.response?.status === 401) {
            const isRefreshed = await refreshToken()
            if(isRefreshed) {
                return getUser()
            }
        }
        return null
    }
}