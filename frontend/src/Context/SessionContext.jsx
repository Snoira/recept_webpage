import { createContext, useContext, useEffect, useCallback } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AxiosError } from 'axios'
import apiClient from '../api'

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
    const [state, setState] = useState({
        isLoading: false,
        userDetails: null,
    })

    const navigate = useNavigate()
    const location = useLocation()

    const logIn = useCallback(
        async (inputs, redirectPath = "/") => {
            try {
                const res = await apiClient.post("/auth/login", inputs)
                setState({ isLoading: false, userDetails: res.data })
                console.log("User logged in", res.data)
                navigate(location.state?.from ? location.state.from : redirectPath, { replace: true })

            } catch (error) {
                let message = "Something went wrong";
                if (error instanceof AxiosError) {
                    message = error.response?.data.message ?? message;
                }
                throw new Error(message);
            }
        }, [])

    const register = async (inputs, redirectPath = "/") => {
        try {
            const res = await apiClient.post("/auth/register", inputs)
            setState({ isLoading: false, userDetails: res.data.newUser })
            navigate(location.state?.from ? location.state.from : redirectPath, { replace: true })

        } catch (error) {
            let message = "Something went wrong";
            if (error instanceof AxiosError) {
                message = error.response?.data.message ?? message;
            }
            throw new Error(message);
        }
    }

    const refreshToken = async () => {
        try {
            console.log("refreshtoken function")
            const res = await apiClient.post("/auth/refresh")
            console.log("refreshtoken res.data", res.data)
            setState({ isLoading: false, userDetails: res.data })
            return true
        } catch (error) {
            setState({ isLoading: false, userDetails: null })
            return false
        }
    }

    const logOut = async () => {
        try {
            await apiClient.post("/auth/logout")
            console.log("User logged out")
        } catch (error) {
            console.error("Error logging out:", error)
        }
        setState({ isLoading: false, userDetails: null })
        navigate('/login', { replace: true })
    }

    const values = {
        logIn,
        logOut,
        register,
        refreshToken,  
        user: state.userDetails,
    }

    return (
        <SessionContext.Provider value={values}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    return useContext(SessionContext)
}
